import os
import re
import json

def remove_comments(code):
    # Remove multiline comments /* ... */
    code = re.sub(r'/\*.*?\*/', ' ', code, flags=re.DOTALL)
    # Remove singleline comments // ...
    code = re.sub(r'//.*$', ' ', code, flags=re.MULTILINE)
    return code

def find_files(src_dir):
    files_to_scan = []
    for root, _, files in os.walk(src_dir):
        for f in files:
            if f.endswith(('.ts', '.tsx')):
                files_to_scan.append(os.path.join(root, f))
    return files_to_scan
def parse_imports(code):
    imported_names = set()
    # matches: import { A, B } from "..." or import A, { B } from "..." or import * as A from "..."
    # and import X from "..."
    import_pat = re.compile(r'import\s+(.*?)\s+from\s+[\'"][^\'"]+[\'"]', re.DOTALL)
    for match in import_pat.finditer(code):
        import_body = match.group(1).strip()
        # Handle namespaces * as Name
        ns_match = re.search(r'\*\s+as\s+(\w+)', import_body)
        if ns_match:
            imported_names.add(ns_match.group(1))
            continue
        # Handle curly braces { A, B as C }
        cb_match = re.search(r'\{([^}]+)\}', import_body)
        if cb_match:
            for item in cb_match.group(1).split(','):
                item = item.strip()
                if not item: continue
                if ' as ' in item:
                    imported_names.add(item.split(' as ')[1].strip())
                else:
                    # Strip type if it's "type X"
                    parts = item.split()
                    if len(parts) > 1 and parts[0] == 'type':
                        imported_names.add(parts[1].strip())
                    else:
                        imported_names.add(parts[0].strip())
        # Handle default imports (outside curlies if any)
        def_body = re.sub(r'\{[^}]+\}', '', import_body).strip()
        if def_body:
            # clean commas and types
            for item in def_body.split(','):
                item = item.strip()
                if item and not item.startswith('*') and item != 'type':
                    imported_names.add(item)
    return imported_names
def check_unreachable_code(lines):
    unreachable = []
    return_pat = re.compile(r'^\s*(return|throw)\b')
    closing_pat = re.compile(r'^\s*[}\]]')
    for i, line in enumerate(lines):
        clean_l = line.strip()
        # Find if line is a return or throw
        if return_pat.match(line) and not clean_l.endswith(';'):
            # It might span multiple lines, let's keep it simple
            pass
        if return_pat.match(line):
            # Check if next line is not a closing brace / bracket and not comment or whitespace
            idx = i + 1
            while idx < len(lines):
                next_clean = lines[idx].strip()
                if not next_clean or next_clean.startswith('//') or next_clean.startswith('/*') or next_clean.startswith('*'):
                    idx += 1
                    continue
                if closing_pat.match(lines[idx]):
                    break
                # If there's an actual statement after return/throw and before any closing block
                # Let's count it as unreachable if it's indented the same or more
                indent_curr = len(line) - len(line.lstrip())
                indent_next = len(lines[idx]) - len(lines[idx].lstrip())
                if indent_next >= indent_curr:
                    unreachable.append({
                        "line": idx + 1,
                        "code": next_clean
                    })
                break
    return unreachable

def analyze_file(filepath, src_dir):
    rel_path = os.path.relpath(filepath, src_dir).replace('\\', '/')
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        raw_content = f.read()
        lines = raw_content.splitlines()

    code = remove_comments(raw_content)
    imported = parse_imports(code)
    
    # Check unused imports
    unused_imports = []
    for name in imported:
        # Search for exact word references, excluding the import lines
        # Check that it appears in code more than just in the import line
        pattern = rf'\b{re.escape(name)}\b'
        matches = re.findall(pattern, code)
        # Count imports occurrences
        # In imports, it could appear once or more (e.g. type uses). We check if there's any reference in JSX or function calls.
        # To be safe, look at count. Import statements usually have one match per name. If total match count in cleaned code is 1, it might be unused!
        if len(matches) <= 1:
            unused_imports.append(name)

    # Let's check for unreachable code
    unreachable = check_unreachable_code(lines)

    return {
        "file": rel_path,
        "unused_imports": unused_imports,
        "unreachable_code": unreachable,
        "raw_code": code
    }
def main():
    src_dir = "C:\\Users\\JiriVa\\Desktop\\DC\\projects\\snap\\src"
    files = find_files(src_dir)
    
    results = {}
    all_imports = set()
    all_exports = {} # filename -> list of exported functions
    
    # First pass: analyze individual files
    for f in files:
        res = analyze_file(f, src_dir)
        results[res["file"]] = res
        
        # Extract exported functions/consts
        # Pato matches: export function Name(...) or export const Name = (...)
        export_pats = [
            r'export\s+function\s+(\w+)\b',
            r'export\s+const\s+(\w+)\s*=\s*'
        ]
        exports_in_file = []
        for pat in export_pats:
            for m in re.finditer(pat, res["raw_code"]):
                exports_in_file.append(m.group(1))
        all_exports[res["file"]] = exports_in_file

    # Second pass: cross-reference exports to see if they are imported/used in other files
    unused_components_and_functions = []
    for file, exports in all_exports.items():
        if file in ['app.tsx', 'main.tsx', 'vite-env.d.ts']:
            continue
        for exp in exports:
            # Check if this export name is referenced in ANY OTHER file
            used_externally = False
            for other_file, res in results.items():
                if other_file == file:
                    continue
                if re.search(rf'\b{re.escape(exp)}\b', res["raw_code"]):
                    used_externally = True
                    break
            
            if not used_externally:
                # Also check if it's imported in app.tsx or referenced in its own file?
                # If not used externally and it's an export from a component/hook, it's dead
                unused_components_and_functions.append({
                    "file": file,
                    "exported_name": exp
                })
                
    # Format output report
    report = {
        "dead_components_and_functions": unused_components_and_functions,
        "files_audit": []
    }
    
    for file, data in results.items():
        if data["unused_imports"] or data["unreachable_code"]:
            report["files_audit"].append({
                "file": file,
                "unused_imports": data["unused_imports"],
                "unreachable_code": data["unreachable_code"]
            })
            
    print(json.dumps(report, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
