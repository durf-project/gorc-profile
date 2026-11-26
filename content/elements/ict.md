---
element: ICT Infrastructure
id: ict
title: ICT infrastructure
priority: 10
summary: The systems, software and hosting the corpus depends on. In scope for the federation commons, because digital autonomy decides whether the corpus stays in public hands.
---

ICT infrastructure covers the software, hosting, network, compute, storage and log-in that the repositories, CRIS systems and shared services run on. The federation commons does not run this infrastructure itself: each party chooses and runs its own systems. But it is **in scope for the commons**, because the corpus can only stay in public hands if the infrastructure it lives on does not lock it in. A public resource, made with public money, should not depend on systems the public sector cannot control.

This matters for three reasons:

- **Not every component is open infrastructure.** The reviewers of the DURF project pointed out that not all components of the ecosystem comply with the [Principles of Open Scholarly Infrastructure (POSI)](https://openscholarlyinfrastructure.org/). Proprietary CRIS platforms such as Pure, used by many institutions, are an example: the software, its roadmap and often its hosting are in the hands of a commercial vendor.
- **Digital sovereignty.** Dependence on a few, mostly non-European, vendors and cloud providers makes the corpus vulnerable to changes in price, terms, ownership or geopolitics. The Dutch government addresses this in its [letter to parliament on digital strategic autonomy](https://www.rijksoverheid.nl/documenten/2025/08/21/kamerbrief-reactie-op-factsheets-digitale-strategische-autonomie) (21 August 2025). Universities and libraries face the same question for the systems that hold their scholarly output.
- **Resilience.** If a system, vendor or service disappears, the federation must be able to get the missing parts running again (see the [context](#context)). That is only possible if data and configurations can be moved.

Each institution that runs systems or services for the commons can map its dependencies with the [Digital Autonomy Assessment Framework](https://utrechtuniversity.github.io/digital-autonomy-assessment-tool/) of Utrecht University: list the applications, score them, and get a report for management.

:::ist
### Now: dependencies not mapped

Each party runs its own infrastructure: repositories and CRIS systems at the institutions or with their vendors, the Graph at OpenAIRE, the e-Depot at the KB. Several institutions depend on proprietary CRIS platforms and on commercial hosting. Some components follow POSI, such as OpenAIRE as a non-profit, others do not. Nobody has an overview of these dependencies across the federation, and it is not known how easily an institution could move its data and workflows to another system. Storage is distributed, which helps resilience, but nobody monitors whether a record exists in all places.
:::

:::soll
### Target: mapped, discussed and moving towards more autonomy

- **The current situation is mapped.** Every institution that runs systems or services for the commons does a digital autonomy assessment, for example with the Utrecht University tool, and shares the outcome with the federation.
- **Ambitions are discussed in the federation.** Based on these assessments, the members agree on ambitions towards more digital autonomy, discuss them each year at the Federation Day, and record them in the rule book. Examples: exit strategies and data portability for each system, a preference for open source and POSI-compliant services, and joint requirements in tenders and contracts with vendors.
- **Storage redundancy is monitored**: for each record, whether it exists at the source, in the Graph and in the e-Depot.

**Help shape this:** which systems does your institution depend on, and which ambitions should the federation set?
:::
