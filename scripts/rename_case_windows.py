import os

components_to_rename = [
    "cenik.tsx",
    "faq.tsx",
    "footer.tsx",
    "hero.tsx",
    "kontakt.tsx",
    "postup.tsx",
    "recenze.tsx",
    "sluzby.tsx"
]

def main():
    root_dir = "C:\\Users\\JiriVa\\Desktop\\DC\\projects\\snap\\src\\components"
    
    print("--- OPRAVA KAPITALIZACE SOUBORU NA WINDOWS ---")
    for file in components_to_rename:
        original_path = os.path.join(root_dir, file)
        if os.path.exists(original_path):
            temp_name = file + ".tmp"
            temp_path = os.path.join(root_dir, temp_name)
            
            # Cilovy PascalCase soubor
            capitalized_name = file[0].upper() + file[1:]
            final_path = os.path.join(root_dir, capitalized_name)
            
            try:
                # Krok 1: Prejmenovat na docasny soubor
                os.rename(original_path, temp_path)
                # Krok 2: Prejmenovat z docasneho na finalni PascalCase soubor
                os.rename(temp_path, final_path)
                print(f"Uspesne prejmenovano: {file} -> {capitalized_name}")
            except Exception as e:
                print(f"Chyba pri prejmenovani {file}: {str(e)}")
        else:
            print(f"Soubor neexistuje v lowercase: {file} (muze jiz byt opraven)")

if __name__ == "__main__":
    main()