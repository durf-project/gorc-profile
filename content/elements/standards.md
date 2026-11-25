---
element: Standards & Conventions
id: standards
title: Standards and conventions
priority: 2
ostrom: 2
summary: Existing standards for exchanging metadata, full texts, identifiers and usage data between all services.
---

Standards and conventions are the agreed formats, vocabularies, identifiers and protocols that make the commons work. We want to use existing standards rather than invent new ones, and write down per handover which ones apply (Ostrom 2: rules that fit local conditions).

:::ist
### Now: one old profile, many local choices

- **Metadata:** NL-DIDL-MODS is the Dutch standard; theme 2 has started on a new application profile.
- **Identifiers:** DOI in about half of the records, Handle in about a third, no ORCID or ROR in what is harvested. The KB assigns URN:NBNs, but they are not recorded back in the repositories.
- **Vocabularies and licences** are used differently by each institution.
- **Exchange:** OAI-PMH for harvesting; delivery of full texts from publishers to repositories is arranged per institution, if at all.
:::

:::soll
### Target: one Dutch application profile

| Handover | Standard |
| --- | --- |
| Repository and CRIS to the Graph | Dutch application profile of the OpenAIRE Guidelines for Literature Repositories and for CRIS Managers (CERIF) |
| Publisher to repository | SWORD, preferably through a national router |
| Repository to e-Depot | Agreed delivery format, with URN:NBN back to the source |
| Usage data | COUNTER-compliant statistics |
| Identifiers | DOI, ORCID, ROR, URN:NBN, project and grant IDs where they apply |
| Vocabularies and licences | COAR resource types, access rights and versions; Creative Commons and CC0 URIs |

The profile is stewarded by the **NL Research Information Content Board** (formerly WISH) through EduStandaard. Each handover is written down as a data contract.
:::
