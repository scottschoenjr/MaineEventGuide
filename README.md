# Family Field Guide

A small, phone-friendly static web app for wedding guests to learn names, faces, family relationships, and conversation starters.

## Run locally

Open `index.html` in a browser. It will use built-in dummy data by default.

## Connect to Google Sheets

1. Make a Google Sheet with the columns in `data/sample_family.csv`.
2. Fill one row per person. The `id` column should be short and unique, like `ava` or `uncle-john`.
3. Publish the sheet to the web as CSV.
4. Copy the CSV URL.
5. In `app.js`, set:

```js
const SHEET_CSV_URL = "YOUR_PUBLISHED_CSV_URL_HERE";
```

## Suggested columns

- `id`: stable unique id for linking relatives
- `name`: display name
- `family_side`: e.g., Bride side, Groom side, Both, Friends
- `relationship`: human-friendly relationship to the couple
- `role`: wedding role or guest category
- `pronouns`: optional
- `hometown`: optional
- `bio`: 1-sentence summary
- `fun_fact`: optional
- `conversation_starter`: helpful icebreaker
- `tags`: semicolon-separated keywords
- `photo_url`: public image URL, optional
- `partner_id`: another person's id, optional
- `parent_ids`: semicolon-separated ids, optional
- `child_ids`: semicolon-separated ids, optional
- `notes`: optional internal-friendly note

## Immediate-family view

When a guest opens a person, the app now shows an **Immediate family** section with parents, siblings, partner, and children. These cards are tappable and jump directly to the relative's profile.

The app infers family links in both directions when possible:

- If Ava lists `parent_ids` as `nora;george`, Nora and George appear as Ava's parents.
- If Nora lists `child_ids` as `ava;zoe`, Ava and Zoe appear as each other's siblings.
- If only the parent has listed the child, the child can still show that parent.

For best results, fill `parent_ids`, `child_ids`, and `partner_id` consistently, but the app does not require every relationship to be entered twice.

## Hosting options

- GitHub Pages: good for a free static site with simple files.
- Netlify: easiest drag-and-drop style deploy, also has a free tier.
- Google Apps Script: best if you want to keep the app inside Google Workspace and avoid publishing the sheet as a public CSV.

## Privacy note

A published Google Sheet CSV is public to anyone with the URL and may be indexed depending on sharing settings. Do not include phone numbers, addresses, private family notes, or anything guests would not be comfortable seeing.
