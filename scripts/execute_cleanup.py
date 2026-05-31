import os

# Seznam 19 sirotčích obrázků k bezpečnému smazání
ORPHANED_ASSETS = [
    "beyond-border-award.png",
    "creative-vision-award.png",
    "digital-arts-award.png",
    "future-media-award.png",
    "global-cinema-award.png",
    "minimal-audience-choice.png",
    "minimal-best-film.png",
    "minimal-directors-choice.png",
    "minimal-excellence.png",
    "minimal-innovation.png",
    "minimal-rising-talent.png",
    "new-laurel-award.png",
    "next-gen-award.png",
    "nyifa-award.png",
    "oniros-award.png",
    "revolutionary-cinema-award.png",
    "storyboard-image.avif",
    "top-shorts-award.png",
    "venice-ai-award.png"
]

# Seznam 36 nepoužívaných Shadcn UI souborů k smazání
UNUSED_UI_COMPONENTS = [
    "alert-dialog.tsx",
    "alert.tsx",
    "aspect-ratio.tsx",
    "badge.tsx",
    "breadcrumb.tsx",
    "calendar.tsx",
    "carousel.tsx",
    "chart.tsx",
    "checkbox.tsx",
    "command.tsx",
    "context-menu.tsx",
    "dialog.tsx",
    "drawer.tsx",
    "dropdown-menu.tsx",
    "hover-card.tsx",
    "input-otp.tsx",
    "menubar.tsx",
    "navigation-menu.tsx",
    "pagination.tsx",
    "progress.tsx",
    "radio-group.tsx",
    "resizable.tsx",
    "scroll-area.tsx",
    "select.tsx",
    "separator.tsx",
    "sheet.tsx",
    "sidebar.tsx",
    "skeleton.tsx",
    "slider.tsx",
    "sonner.tsx",
    "table.tsx",
    "tabs.tsx",
    "toaster.tsx",
    "toggle-group.tsx",
    "toggle.tsx",
    "tooltip.tsx"
]

def main():
    root_dir = "C:\\Users\\JiriVa\\Desktop\\DC\\projects\\snap"
    assets_dir = os.path.join(root_dir, "src", "assets")
    ui_dir = os.path.join(root_dir, "src", "components", "ui")

    deleted_assets_count = 0
    deleted_ui_count = 0

    print("--- ZAHÁJENÍ PROČIŠTĚNÍ PROJEKTU ---")

    # 1. Odstranění assetů
    for asset in ORPHANED_ASSETS:
        filepath = os.path.join(assets_dir, asset)
        if os.path.exists(filepath):
            try:
                os.remove(filepath)
                print(f"Odebrán přebytečný asset: {asset}")
                deleted_assets_count += 1
            except Exception as e:
                print(f"Chyba při mazání {asset}: {e}")
        else:
            print(f"Asset již neexistuje: {asset}")

    # 2. Odstranění UI komponent
    for comp in UNUSED_UI_COMPONENTS:
        filepath = os.path.join(ui_dir, comp)
        if os.path.exists(filepath):
            try:
                os.remove(filepath)
                print(f"Odebrána nepoužitá UI komponenta: {comp}")
                deleted_ui_count += 1
            except Exception as e:
                print(f"Chyba při mazání {comp}: {e}")
        else:
            print(f"Komponenta již neexistuje: {comp}")

    print("\n--- SHRNUTÍ OPERACE ---")
    print(f"Smazaných přebytečných obrázků: {deleted_assets_count} / {len(ORPHANED_ASSETS)}")
    print(f"Smazaných nepoužitých Shadcn UI komponent: {deleted_ui_count} / {len(UNUSED_UI_COMPONENTS)}")
    print("Projekt byl úspěšně pročištěn!")

if __name__ == "__main__":
    main()