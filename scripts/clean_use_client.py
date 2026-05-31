import os
import re

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Match 'use client' at the top, optionally with single or double quotes, and subsequent newlines
    # This regex matches 'use client' at start of file, ignoring potential leading spaces/newlines, and clean up to the first import or exports
    pattern = r'^\s*[\'"]use client[\'"]\s*\r?\n+'
    
    if re.search(pattern, content):
        new_content = re.sub(pattern, '', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Cleaned 'use client' from: {filepath}")
    else:
        print(f"No 'use client' found in: {filepath}")

def main():
    components_dir = "C:\\Users\\JiriVa\\Desktop\\DC\\projects\snap\\src\\components"
    for root, dirs, files in os.walk(components_dir):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                filepath = os.path.join(root, file)
                clean_file(filepath)

if __name__ == "__main__":
    main()