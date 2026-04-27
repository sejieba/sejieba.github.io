# 91吃瓜福利导航 (91cggg.com)

Static HTML/JS navigation site. No build step.

## Files

- `index.html` — Homepage with H1 + nav-grid (static), tag cloud + intro paragraph, recommend section (article/video lists fetched via API), app card
- `tag.html` — Catch-all tag page; reads `?kw=` from URL and JS-injects title/description/keywords/breadcrumb/JSON-LD. `TAG_INTRO` map holds per-tag intro text for top tags; `TAG_LIST` drives random recommended tags
- `go.html` — External link redirect (noindex,follow)
- `tag-chengren-chigua.html`, `tag-heiliao-chigua.html`, `tag-chigua-baoliao.html`, `tag-heiliao-wangzhan.html`, `tag-pei-min-si.html` — Pre-rendered static tag pages for top SEO terms (own meta + JSON-LD + 200字 intro). Crawlers see them without JS execution
- `tag-page.css` — Shared stylesheet for static tag pages
- `announcement.js` — Modal popup (4-hour cooldown via localStorage)
- `sitemap.xml` — Static tag pages priority 0.9, dynamic `tag.html?kw=` priority 0.5–0.7
- `robots.txt` — Disallows `/go.html`

## Conventions

- 91chigua outbound links use format: `https://91chigua.top/index.php/search/{keyword}/`
- Catch-all tag links: `tag.html?kw={encoded_keyword}`
- Top-priority tag links: `tag-{slug}.html` (slug = pinyin)
- APP download link: `https://51yl.top/`
- Primary domain: `91cggg.com`, backups: `91cg1.cyou`, `91cg2.cyou`
- Static nav-grid in `index.html` is the source of truth for outbound site list — there is NO `linkData` JS array (removed; was a duplicate that overwrote static HTML)
- OG image referenced site-wide: `https://91cggg.com/og-cover.jpg` — supply a 1200×630 JPG asset

## Adding a Tag

For a high-priority SEO tag:
1. Create `tag-{slug}.html` (copy structure from existing static tag page)
2. Add entry to `sitemap.xml` with priority 0.9
3. Add `TAG_INTRO[kwText]` entry in `tag.html` (so the catch-all page also renders an intro if someone links to `tag.html?kw=…`)
4. Add `<a class="site-tag">` to tag cloud in `index.html` (link to the new static file)
5. Cross-link from existing static tag pages' "相关热门标签"

For a low-priority tag (catch-all path):
1. Add `<a class="site-tag">` (href=`tag.html?kw=...`) to tag cloud in `index.html`
2. Add the tag string to `TAG_LIST` array in `tag.html`
3. Optionally add `TAG_INTRO[kw]` for a richer auto-generated intro
4. Optionally add an entry to `sitemap.xml` (priority 0.5)
