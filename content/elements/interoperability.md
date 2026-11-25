---
element: Interoperability
id: interoperability
title: Interoperability
priority: 3
ostrom: 4
summary: Services that work together technically, organisationally and legally, monitored in the open.
---

Interoperability is the ability of the services in the commons to work together: technically (formats, protocols, meaning), organisationally (processes between parties) and legally (licences and agreements). To create it, the services must comply with the standards and conventions, and that has to be monitored (Ostrom 4).

<figure class="gp-embed">
<iframe src="https://durf-project.github.io/dashboards/02-metadata-quality.html?embed=publications-kpis&mode=relative" title="DURF Metadata Monitor" loading="lazy" style="height:520px"></iframe>
<figcaption>The <a href="https://durf-project.github.io/dashboards/">DURF dashboards</a> measure in the open how complete the records of each institution are.</figcaption>
</figure>

:::ist
### Now: harvested, but not connected

Records are harvested over OAI-PMH, but in the Dutch NL-DIDL-MODS profile, and the OpenAIRE validation and enrichment results do not flow back to the repositories. ORCID iDs and ROR IDs do not reach the harvested records at all; a valid DOI is present in about half of them. Handing over data between parties rests on personal contacts. Most metadata has no licence, and publisher agreements limit what may be shared.
:::

:::soll
### Target: data contracts on every arrow

Every arrow in the information chain becomes a **data contract**: a machine-readable agreement on what is delivered, in which form, at which quality and how often, and who to call when it fails (see the [DURF data mesh architecture](https://durf-project.github.io/durf-data-mesh-architecture/)). The dashboards check the contracts. Metadata is shared under **CC0**, and a model clause in publisher agreements secures metadata and a copy of the full text.
:::
