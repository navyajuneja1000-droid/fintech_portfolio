# Navya Juneja · Payments Console

A job-application portfolio for payments roles (product, program, payments ops, growth, strategy) at companies such as Pine Labs, Razorpay, CRED, Juspay, PayU and Cashfree. It is built as an original merchant-console: KPI tiles, a transactions table, a lifecycle pipeline, an experience ledger and a "settlement report" contact flow. Light and dark themes.

Static site: `index.html` + `assets/app.css` + `assets/app.js` + `assets/data.js`. Vanilla JS, hash routing, no build step. Serve the folder (`python3 -m http.server`) or open `index.html`.

## Routes

| Route | What it is |
| --- | --- |
| `#/` | Overview: headline, PhonePe impact, fit strip, KPI tiles, lifecycle pipeline, recent transactions |
| `#/phonepe` | The two years at PhonePe: roles and five workstreams |
| `#/cases` | Every case as a transaction with a status; payments first, "Beyond payments" below |
| `#/case/<id>` | One case: event log (problem, what I did, where it landed), line items, detail, media, links |
| `#/lifecycle` | Seven stages from onboarding to card network products, with my work, sourced glossary and proof cases. `#/lifecycle/<stage>` jumps to a stage |
| `#/simulator` | Routing simulator: three invented acquirers, split, success, MDR + GST, merchant contribution, value of +x pp |
| `#/simulator/settlement` | "Follow the money": gross sales to net settlement, variance vs contract, annualised leak |
| `#/fit/<company>` | Company fit: sourced facts, which cases map to which products, and 2–3 hypotheses |
| `#/experience` | Experience ledger, how I work, certifications |
| `#/hire` | Settlement report: contact details and an email-drafting form (opens `mailto:`, sends nothing itself) |

- **Company links.** Send a link like `?for=razorpay` (values: `razorpay`, `pinelabs`, `juspay`, `payu`, `cashfree`, `cred`). Visitors see only that company: no switcher, no list of other companies, and the footer names only PhonePe and that company. A link with no `for=` is the general version and names no company. **Private preview:** add `&edit` (e.g. `?for=juspay&edit`) to see the "Tailored for" switcher and every company's view. Don't send `&edit` links to recruiters.

## Provenance labels

Every figure carries one, shown as a payment status:

| Status | Label | Meaning |
| --- | --- | --- |
| Settled | Result | Achieved |
| Captured | Built | A working product you can open |
| Authorised | Target | A success criterion, not an outcome |
| Pending | Modelled | My own assumption, stated |
| Verified | Sourced | External fact, linked to its source |

PhonePe figures are as stated on the CV; no PhonePe internal data is shown. Company facts come from each company's own public pages (fetched November 2026) and are linked next to the fact. What I would do at a company is labelled a hypothesis. Glossary definitions are checked against RBI, Visa, Mastercard or company pages and linked. Simulator numbers are illustrative (Modelled) and the acquirers are invented.

## Content

All copy and numbers live in `assets/data.js`. Shared assets (portrait, logos, work images, decks, résumé) come from the earlier portfolio builds.

## Disclaimer

Independent job-application portfolio by Navya Juneja. Not affiliated with or endorsed by PhonePe, Pine Labs, Razorpay, CRED, Juspay, PayU, Cashfree, Visa, Mastercard or any company named. Company names appear in text only; no company logos or artwork are used for the target companies. The logo mark is an original drawing.
