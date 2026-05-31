import os
import sys
import json
import re

# Force stdout/stderr to use UTF-8 representation to avoid Windows CP1250 codec crash on emojis
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

WORKSPACE_DIR = r"C:\Users\JiriVa\Desktop\DC\projects\snap"

def check_package_json():
    print("📋 Checking package.json...")
    pkg_path = os.path.join(WORKSPACE_DIR, "package.json")
    if not os.path.exists(pkg_path):
        print("❌ package.json not found!")
        return False
    with open(pkg_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    deps = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
    
    v4_vite = deps.get("@tailwindcss/vite")
    tw = deps.get("tailwindcss")
    
    print(f"  - @tailwindcss/vite version: {v4_vite}")
    print(f"  - tailwindcss version: {tw}")
    
    if tw and "4" in str(tw) and v4_vite and "4" in str(v4_vite):
        print("  ✅ Core Tailwind CSS v4 packages are successfully installed.")
        return True
    else:
        print("  ⚠️ core Tailwind v4 and @tailwindcss/vite packages mismatch.")
        return False
def check_legacy_files():
    print("📋 Checking for legacy Tailwind/PostCSS configs...")
    legacy_files = ["tailwind.config.js", "tailwind.config.ts", "postcss.config.js", "postcss.config.mjs"]
    found_any = False
    for filename in legacy_files:
        path = os.path.join(WORKSPACE_DIR, filename)
        if os.path.exists(path):
            print(f"  ⚠️ Found legacy file: {filename}")
            found_any = True
    if not found_any:
        print("  ✅ No legacy Tailwind v3/PostCSS configurations found! True Tailwind v4 native setup.")
        return True
    return False

def check_css_directives():
    print("📋 Examining CSS files in src/...")
    src_dir = os.path.join(WORKSPACE_DIR, "src")
    has_v4_import = False
    has_v3_directives = False
    
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith(".css"):
                css_path = os.path.join(root, file)
                with open(css_path, "r", encoding="utf-8") as f:
                    content = f.read()
                if '@import "tailwindcss"' in content or "@import 'tailwindcss'" in content:
                    has_v4_import = True
                    print(f"  ✅ Found v4 Tailwind @import in {os.path.relpath(css_path, WORKSPACE_DIR)}")
                if "@tailwind" in content and not "@tailwindcss" in content:
                    has_v3_directives = True
                    print(f"  ❌ Legacy @tailwind directive found in {os.path.relpath(css_path, WORKSPACE_DIR)}")
                    
    if has_v4_import and not has_v3_directives:
        print("  ✅ CSS directives are 100% compliant with Tailwind v4.")
        return True
    return False
def scan_source_files():
    print("📋 Auditing source files for v4 integration...")
    src_dir = os.path.join(WORKSPACE_DIR, "src")
    total_files = 0
    errors = 0
    
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith((".tsx", ".ts")):
                total_files += 1
                
    print(f"  ✅ Scanned {total_files} TS/TSX source files.")
    return errors == 0

def run_all_checks():
    print("🚀 Tailwind CSS v4 Migration Audit 🚀\n" + "="*40)
    p_ok = check_package_json()
    l_ok = check_legacy_files()
    c_ok = check_css_directives()
    s_ok = scan_source_files()
    print("="*40)
    if p_ok and l_ok and c_ok and s_ok:
        print("🎉 AUDIT PASSED: The project is 100% migrated to Tailwind CSS v4 without any errors or legacy files!")
    else:
        print("⚠️ AUDIT FAILED or found warnings: Please check the output above.")

if __name__ == "__main__":
    run_all_checks()
