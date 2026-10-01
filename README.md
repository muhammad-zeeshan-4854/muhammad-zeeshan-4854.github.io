# Muhammad Zeeshan, Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript, no build step. Hosted on GitHub Pages.

## Edit karne ka tareeqa (VS Code)

1. Is folder ko VS Code mein kholo: **File → Open Folder**.
2. Extension install karo: **Live Server** (by Ritwick Dey). Phir `index.html` par right click → **Open with Live Server**. Ab jo bhi save karoge, browser mein foran update hoga.
3. `index.html` mein `Ctrl + F` dabao aur `EDIT` search karo. Jahan comment laga hai wahan check ya change karna hai.
4. Upload se pehle ye zaroor karo:
   - `muhammad-zeeshan-4854` ko apne GitHub username se replace karo (`Ctrl + H`)
   - Hero mein "Open to new opportunities" line apni situation ke hisaab se rakho ya hata do
   - Agar dissertation ka GitHub ya report link share kar sakte ho to wahan add karo

## Files

| File | Kya hai |
|---|---|
| `index.html` | Saara text aur content |
| `style.css` | Design. Sab se upar `:root` mein colors aur fonts hain; `--iris` aur `--mint` badlo to poori theme ka rang badal jayega |
| `script.js` | Hero ka integration hub (upar `SERVICES` list mein services badal sakte ho), scroll timeline, counters aur "Copy email" |
| `assets/` | Images, favicon aur tumhari CV |

## Naya project add karna

Projects section mein koi bhi `<article class="project">` block copy karo, `To add a project` wale comment ki jagah paste karo, aur text badal do. Screenshot `assets/` folder mein rakho (jaise `assets/my-app.png`) aur `<img src="...">` mein uska naam likho. Screenshot ka size lagbhag 1200 × 750 rakho.

## Theme (dark / light)

Header mein chand/suraj wala button visitors ko theme badalne deta hai, aur unki choice unke device par yaad rehti hai.

Pehli dafa kaunsi theme dikhe, ye `index.html` ke `<head>` mein is line se set hota hai:

```js
window.DEFAULT_THEME = "dark";
```

Isko `"light"` kar do, ya `"system"` jisse visitor ke phone/computer ki setting follow hogi.

Note: agar tumne khud toggle dabaya hai to tumhare browser mein woh choice save hai, isliye default badalne ke baad farq dekhne ke liye Incognito window mein kholna.

Light theme ke colors `style.css` mein `:root[data-theme="light"]` ke andar hain.

## Apni photo

Apni photo ko `assets` folder mein **`profile.jpg`** naam se rakh do. Woh hero ke beech wale circle mein khud aa jayegi. Square photo (kam az kam 400 × 400 px) best rehti hai, jismein chehra beech mein ho. Photo `.png` hai to `script.js` mein sab se upar `PROFILE_PHOTO` ka naam badal dena. Photo na ho to circle mein "MZ" dikhta hai.

## CV

Tumhari CV `assets/cv.pdf` mein already rakhi hai. CV update karo to isi naam se file replace kar dena.

## GitHub Pages par free host karna

1. GitHub par naya repository banao. Naam rakho `muhammad-zeeshan-4854.github.io` (apna asli username). Is naam se website seedha `https://muhammad-zeeshan-4854.github.io` par khulegi.
2. VS Code ke terminal mein (`Ctrl + backtick`):
   ```bash
   git init
   git add .
   git commit -m "Add portfolio site"
   git branch -M main
   git remote add origin https://github.com/muhammad-zeeshan-4854/muhammad-zeeshan-4854.github.io.git
   git push -u origin main
   ```
3. Repo mein **Settings → Pages** mein jao. *Source* mein **Deploy from a branch** select karo, branch `main` aur folder `/ (root)`, phir **Save**.
4. 1-2 minute baad website live ho jayegi.

Baad mein koi bhi change karo to bas:
```bash
git add .
git commit -m "Update projects"
git push
```

## Apna domain (optional)

Domain khareedne ke baad **Settings → Pages → Custom domain** mein likho, aur domain provider par GitHub ke bataye DNS records add karo.
