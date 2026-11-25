# Page content

Every section of the GORC profile is a Markdown file in this folder. Edit the text here: `index.html`
renders it in the browser, so there is no build step. Save, push, and the published page picks it up.

- `sections.json` sets which files appear, and in which order.
- `elements/` has one file per GORC essential element.
- HTML comments (`<!-- ... -->`) are notes for editors; they do not appear on the page.

## IST and SOLL

Text that belongs to one scenario goes between markers on their own lines:

```
:::ist
What is true now (November 2026).
:::

:::soll
Where we want to go (May 2030). This is a draft for the community.
:::
```

Text outside the markers is shown in both scenarios.

## Front matter

Each file starts with a short block between `---` lines:

```
---
id: governance                      # anchor, so you can link to #governance
nav: Governance                     # label in the contents (for elements the title is used)
---
```

Element files have more fields:

```
---
element: Governance & Leadership    # the section name in data/gorc-v1.1.json: links the assessment
id: governance                      # anchor; also used by the honeycomb
title: Governance and leadership    # heading and label in the honeycomb
priority: 1                         # 1 = most important (step 2 of the GORC template)
ostrom: 3, 5, 6, 7, 8               # Ostrom's design principles that apply
summary: One sentence, shown when you point at the element in the honeycomb.
---
```

Under every element the page adds the assessment of that element (from `data/assessments/ist.json`
or `soll.json`), so the narrative does not need to repeat it.

## Writing conventions

English, sentence case headings, plain and cooperative ("we", "together"), no em dashes.
Images and pictures from other DURF sites are linked by their full address.

## Preview locally

The page loads these files with `fetch`, so open it through a small web server:
`python3 -m http.server 8000` in the repository folder, then go to http://localhost:8000.
