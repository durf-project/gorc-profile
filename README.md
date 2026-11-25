# GORC profile of the Dutch Repository Federation Commons

A [Global Open Research Commons (GORC)](https://doi.org/10.15497/RDA00119) profile of the Dutch Repository
Federation Commons, the federation that takes care of the Dutch Scholarly Communication Corpus. It describes the
situation now (**IST**, November 2026) and where we want to go (**SOLL**, May 2030, a draft for the community to
shape). The profile is the basis of the **Federation Rule Book**, a deliverable of DURF theme 1 (Governance).

Page: https://durf-project.github.io/gorc-profile/ (GitHub Pages, branch `main`, root). Built with the
[DURF design system](https://durf-project.github.io/durf-design-system/); no build step.

## What is where

| Path | What |
| --- | --- |
| `content/` | The texts, one Markdown file per section; see [`content/README.md`](content/README.md) |
| `content/elements/` | One file per GORC essential element, with an IST and a SOLL part |
| `data/assessments/ist.json`, `soll.json` | The self-assessments that colour the honeycomb, in the export format of the [SPII Principles Alignment Tool](https://surf-ori.github.io/spii-1b-principles-alignment-tool/#gorc) |
| `data/gorc-v1.1.json` | The GORC v1.1 framework of the SPII tool (55 categories in 10 elements), copied from `surf-ori/spii-1b-principles-alignment-tool` (`data/frameworks/gorc-v1.1.json`) |
| `index.html`, `profile.css`, `profile.js` | The page: scenario switch, honeycomb, sections, contents |

## Changing the assessment

1. On the page, choose IST or SOLL and click **Open this assessment in the SPII tool** (or import the JSON there).
2. Change the answers and notes, then **Save assessment to a file (JSON)**.
3. Replace `data/assessments/ist.json` or `soll.json` with that file and propose the change.

The colour of an element: each GORC category counts 1 (compliant), 0.5 (making progress) or 0 (not compliant);
not applicable is left out. An average of at least 0.67 is green (largely in place), at least 0.34 orange (in
progress), lower red (not yet in place), and grey when nothing applies. The percentage is the SPII tool's own
score: compliant categories out of the answered ones.

## Preview locally

`python3 -m http.server 8000` in this folder, then open http://localhost:8000.

## Credits

Texts CC BY 4.0, DURF theme 1. The first draft of most sections was written with AI assistance from the DURF
position paper, the GORC model and Maurice Vanderfeesten's GORC narrative profile, for review by the theme 1 team.
The GORC International Model v1.1 and the GORC-IG essential elements figure are CC BY 4.0 (Research Data Alliance).
