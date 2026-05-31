import os
import re
import json

def get_all_code_content():
    """Reads all customized application files to find references."""
    root_dir = "C:\\Users\\JiriVa\\Desktop\\DC\\projects\\snap\\src"
    contents = {}
    for root, dirs, files in os.walk(root_dir):
        # Exclude ui folder when scanning what utilizes the UI
        for file in files:
            if file.endswith(('.ts', '.tsx', '.css', '.html')):
                filepath = os.path.join(root, file)
                rel_path = os.path.relpath(filepath, root_dir).replace('\\', '/')
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        contents[rel_path] = f.read()
                except Exception:
                    pass
    return contents

def analyze():
    src_dir = "C:\\Users\\JiriVa\\Desktop\\DC\\projects\\snap\\src"
    ui_dir = os.path.join(src_dir, "components", "ui")
    assets_dir = os.path.join(src_dir, "assets")

    # 1. Gather all codebase contents
    all_code = get_all_code_content()
    
    # Combined codebase as single text for simple grep checks
    full_text = "\n".join(all_code.values())

    # 2. Audit components/ui files
    ui_files = []
    if os.path.exists(ui_dir):
        ui_files = [f for f in os.listdir(ui_dir) if f.endswith(('.ts', '.tsx'))]
    
    ui_audit = []
    for ui_file in ui_files:
        name_no_ext = os.path.splitext(ui_file)[0]
        # Look for imports of this component, e.g. "@/components/ui/button" or "from './ui/button'" or "from '../ui/button'" or "/button"
        # Since it is a Shadcn UI component, search for key suffix references or standard import structures
        pattern = rf'components/ui/{name_no_ext}\b|\./ui/{name_no_ext}\b|\.\./ui/{name_no_ext}\b|/ui/{name_no_ext}\b'
        
        # Count references inside custom code (exclude references with itself or ui files check to isolate custom logic usage)
        usages = 0
        using_files = []
        for file_path, code in all_code.items():
            if "components/ui/" in file_path:
                continue # skip internal shadcn cross-referencing for now
            if re.search(pattern, code) or re.search(rf'\b{name_no_ext}\b', code):
                # Also check component JSX usage like <Button or <Accordion
                # Converting snake/kebab to PascalCase for component check if needed, but a word match is a safe heuristic
                usages += 1
                using_files.append(file_path)

        ui_audit.append({
            "component": ui_file,
            "usages": usages,
            "used_by": list(set(using_files)),
            "status": "Active" if usages > 0 else "Unused"
        })

    # 3. Audit assets folder
    asset_files = []
    if os.path.exists(assets_dir):
        asset_files = [f for f in os.listdir(assets_dir)]

    asset_audit = []
    for asset in asset_files:
        asset_esc = re.escape(asset)
        asset_raw_name = os.path.splitext(asset)[0]
        # Match literal string or imports of this asset variable (e.g. import marcusPhoto from '../assets/team-member-1.png')
        use_count = 0
        used_by = []
        for file_path, code in all_code.items():
            if asset in code or asset_raw_name in code:
                use_count += 1
                used_by.append(file_path)
        
        asset_audit.append({
            "asset": asset,
            "usages": use_count,
            "used_by": list(set(used_by)),
            "status": "Used" if use_count > 0 else "Orphaned"
        })

    # Output report
    output = {
        "ui_components": ui_audit,
        "assets": asset_audit
    }
    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    analyze()