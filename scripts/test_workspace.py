import os

# Striktní definice absolutních cest podle pravidla
WORKSPACE_DIR = r"C:\Users\JiriVa\Desktop\DC\projects\snap"
SCRIPTS_DIR = os.path.join(WORKSPACE_DIR, "scripts")
OUTPUT_DIR = os.path.join(WORKSPACE_DIR, "output")

def main():
    print("=== KONTROLA WORKSPACE (Absolutní cesty) ===")
    print(f"Hlavní adresář: {WORKSPACE_DIR}")
    print(f"Složka se skripty: {SCRIPTS_DIR}\n")
    
    # Výpis skriptů
    if os.path.exists(SCRIPTS_DIR):
        print(f"Nalezené skripty v {SCRIPTS_DIR}:")
        for file in sorted(os.listdir(SCRIPTS_DIR)):
            if file.endswith(".py"):
                print(f" - {file}")
    else:
        print("Chyba: Složka se skripty neexistuje!")
        
    print()
    # Kontrola output složky
    if os.path.exists(OUTPUT_DIR):
        print(f"Kontrola výstupní složky (output): OK (složka existuje)")
    else:
        print(f"Kontrola výstupní složky (output): Chybí (vytvářím ji...)")
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        
    print("============================================")

if __name__ == "__main__":
    main()
