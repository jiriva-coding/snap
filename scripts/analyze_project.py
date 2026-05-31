import os
import json
import re

def analyze_file(filepath, rel_path):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        lines = content.splitlines()

    total_lines = len(lines)
    empty_lines = sum(1 for line in lines if not line.strip())
    comment_lines = sum(1 for line in lines if line.strip().startswith('//') or line.strip().startswith('/*') or line.strip().startswith('*'))
    code_lines = total_lines - empty_lines - comment_lines

    # File classification
    if 'components\\ui\\' in rel_path or 'components/ui/' in rel_path:
        category = 'UI Component (Shadcn)'
    elif 'components\\' in rel_path or 'components/' in rel_path:
        category = 'Custom Component'
    elif 'hooks\\' in rel_path or 'hooks/' in rel_path:
        category = 'Hook'
    elif 'lib\\' in rel_path or 'lib/' in rel_path:
        category = 'Utility / Lib'
    elif rel_path in ['app.tsx', 'main.tsx', 'index.css', 'App.css', 'vite-env.d.ts']:
        category = 'App Entry / Root'
    else:
        category = 'Other'

    # Pattern scans
    console_logs = len(re.findall(r'console\.log\(', content))
    todos = len(re.findall(r'TODO|FIXME', content, re.IGNORECASE))
    use_client = 1 if 'use client' in content or "use client" in content else 0
    
    # Typescript 'any' scan (strict checks)
    # Avoid picking up 'company', 'many', etc. Match ': any' or ':any' or '<any>'
    any_types = len(re.findall(r'(:\s*any\b|<\s*any\s*>)', content))

    # Hardcoded text analysis (heuristic for translations or hardcoded content)
    # Check if there is Czech text (simple check for accented characters)
    cz_chars = len(re.findall(r'[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]', content))

    return {
        "file": rel_path.replace('\\', '/'),
        "category": category,
        "size_bytes": os.path.getsize(filepath),
        "total_lines": total_lines,
        "code_lines": code_lines,
        "comment_lines": comment_lines,
        "empty_lines": empty_lines,
        "metrics": {
            "console_logs": console_logs,
            "todos": todos,
            "use_client": use_client,
            "any_types": any_types,
            "accented_cz_chars": cz_chars
        }
    }

def main():
    src_dir = "C:\\Users\\JiriVa\\Desktop\\DC\\projects\\snap\\src"
    results = []

    for root, dirs, files in os.walk(src_dir):
        for file in files:
            # Analyze TS, TSX, JS, JSX, CSS files
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
                filepath = os.path.join(root, file)
                rel_path = os.path.relpath(filepath, src_dir)
                results.append(analyze_file(filepath, rel_path))

    # Aggregate statistics
    summary = {
        "total_files": len(results),
        "categories": {},
        "lines_of_code": 0,
        "metrics": {
            "console_logs": 0,
            "todos": 0,
            "any_types": 0
        }
    }

    for res in results:
        cat = res["category"]
        summary["categories"][cat] = summary["categories"].get(cat, 0) + 1
        summary["lines_of_code"] += res["code_lines"]
        summary["metrics"]["console_logs"] += res["metrics"]["console_logs"]
        summary["metrics"]["todos"] += res["metrics"]["todos"]
        summary["metrics"]["any_types"] += res["metrics"]["any_types"]

    output = {
        "summary": summary,
        "files": results
    }

    print(json.dumps(output, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()