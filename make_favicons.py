from PIL import Image, ImageOps

source_path = "assets/logo_stl.png"
bg_color = (10, 10, 10, 255) # #0A0A0A

def create_favicon(size, padding_ratio=0.15):
    logo = Image.open(source_path).convert("RGBA")
    
    # Create canvas
    canvas = Image.new("RGBA", (size, size), bg_color)
    
    # Calculate scaled logo size with padding so icon elements aren't edge-to-edge
    usable_size = int(size * (1.0 - 2 * padding_ratio))
    logo.thumbnail((usable_size, usable_size), Image.Resampling.LANCZOS)
    
    # Center logo on canvas
    x = (size - logo.width) // 2
    y = (size - logo.height) // 2
    
    canvas.paste(logo, (x, y), logo)
    return canvas.convert("RGB")

# Generate sizes
icon_16 = create_favicon(16, padding_ratio=0.1)
icon_32 = create_favicon(32, padding_ratio=0.1)
icon_48 = create_favicon(48, padding_ratio=0.1)
icon_180 = create_favicon(180, padding_ratio=0.15)
icon_512 = create_favicon(512, padding_ratio=0.15)

# Save PNGs
icon_16.save("favicon-16x16.png")
icon_32.save("favicon-32x32.png")
icon_180.save("apple-touch-icon.png")
icon_512.save("android-chrome-512x512.png")

# Save ICO
icon_32.save("favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

print("Successfully generated all favicons!")
