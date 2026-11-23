/* =========================================================
   Navya Juneja · payments portfolio · content
   Every figure carries a provenance label:
     result   = achieved                       (status: Settled)
     built    = working product you can open   (status: Captured)
     target   = success criterion               (status: Authorised)
     modelled = my own assumption, stated       (status: Pending)
     sourced  = external, cited with a URL      (status: Verified)
   PhonePe figures are as stated on my CV. No PhonePe internal data.
   ========================================================= */
window.NJ = {
  person: {
    name: "Navya Juneja",
    role: "Payments product, programs and ops",
    location: "Gurgaon, India · open to relocating, Bengaluru included",
    email: "navyajuneja1000@gmail.com",
    phone: "+91 85568 17288",
    phoneHref: "tel:+918556817288",
    linkedin: "https://www.linkedin.com/in/junejanavya/",
    linkedinShort: "linkedin.com/in/junejanavya",
    resume: "Navya_Juneja_Resume.pdf",
    portfolio: "https://personalportfolio-lilac-tau.vercel.app/"
  },

  prov: {
    result:   { label: "Result",   status: "Settled",    tip: "Achieved. The number happened." },
    built:    { label: "Built",    status: "Captured",   tip: "A working product you can open." },
    target:   { label: "Target",   status: "Authorised", tip: "A success criterion I set, not an outcome." },
    modelled: { label: "Modelled", status: "Pending",    tip: "My own assumption, stated so you can argue with it." },
    sourced:  { label: "Sourced",  status: "Verified",   tip: "External fact, with the source linked." }
  },

  /* ---------- headline KPIs (overview tiles) ---------- */
  kpis: [
    { v: "₹8 Cr", l: "saved a year from acquiring-bank allocation and routing", p: "result", c: "pp-routing", spark: [3,4,4,5,6,6,7,8] },
    { v: "+4 pp", l: "travel payment success, from A/B tested routes", p: "result", c: "pp-routing", spark: [2,2,3,3,4,5,5,6] },
    { v: "₹15+ Cr", l: "recovered through historical reconciliation", p: "result", c: "pp-recon", spark: [1,3,4,6,8,10,13,15] },
    { v: "95%", l: "of traffic migrated across acquiring banks in 3 months", p: "result", c: "pp-migration", spark: [5,20,40,58,72,85,92,95] },
    { v: "53% / 40%", l: "faster go-live, Cards / NetBanking", p: "result", c: "pp-golive", spark: [9,8,8,7,6,5,5,4] },
    { v: "360", l: "merchant go-lives in one bulk upload", p: "result", c: "pp-golive", spark: [1,1,1,2,2,3,6,9] }
  ],

  /* ---------- the payment lifecycle ---------- */
  stages: [
    { id: "onboard", n: "01", name: "Onboarding, KYC & MID",
      what: "Before a merchant can take a card payment, it is checked (KYC), priced, and each acquiring bank it will route through issues a MID for its line of business.",
      mine: "I mapped PhonePe's MID-to-live onboarding as a 10-stage workflow and removed the friction points. Later I built the system I wished we'd had: event-sourced MID procurement across six acquirers.",
      terms: ["pa", "acquirer"], cases: ["pp-golive", "mid"] },
    { id: "integrate", n: "02", name: "Integration & go-live",
      what: "A bank or PSP is connected, tested end to end (UAT), and switched on for real traffic, usually in phases.",
      mine: "5+ bank and PSP integrations where I owned requirements, UAT and go-live. A bulk configuration tool I specified put 360 merchants live in one upload.",
      terms: ["pg"], cases: ["pp-launches", "pp-golive"] },
    { id: "route", n: "03", name: "Authorisation & routing",
      what: "Each payment is sent to an acquirer, which asks the issuer to approve it. Which acquirer gets which payment decides both success and cost.",
      mine: "Acquiring-bank allocation and routing across Cards and NetBanking for ₹500+ Cr TPV travel merchants: ₹8 Cr a year saved. RouteIQ is the general version, written as a PRD.",
      terms: ["issuer", "mdr"], cases: ["pp-routing", "routeiq", "pp-migration"] },
    { id: "success", n: "04", name: "Success rate & failures",
      what: "Not every attempt goes through. Declines come from the customer, the bank or the plumbing, and each kind has a different fix.",
      mine: "Weekly routing calls from SQL dashboards of success rates, bank traffic and error codes. A/B tested routes lifted travel payment success by 4 pp.",
      terms: ["sr", "tat"], cases: ["pp-routing", "upi"] },
    { id: "settle", n: "05", name: "Settlement & reconciliation",
      what: "The acquirer or aggregator pays the merchant, net of fees, on an agreed cycle. Reconciliation checks that what was sold is what arrived.",
      mine: "₹15+ Cr recovered by tracing reconciliation mismatches with Finance and Recon. ReconOS does the same check for D2C brands, across gateways and couriers.",
      terms: ["settlement", "tn", "gst"], cases: ["pp-recon", "reconos"] },
    { id: "recover", n: "06", name: "Disputes & recovery",
      what: "Overcharges, unsettled payments, refunds and chargebacks have to be found, proven and claimed back.",
      mine: "ReconOS separates Claim (the brand's own files prove it) from Check (something is off but unproven), and drafts the claim email per partner.",
      terms: ["interchange"], cases: ["reconos", "pp-recon"] },
    { id: "network", n: "07", name: "Card network products",
      what: "Networks keep adding rails on top of the card: tokens instead of card numbers, references that tie tokens together, and push payments into cards.",
      mine: "Launched CVV-less payments, PAR API, Visa Direct and MoneySend at PhonePe by coordinating go-live with the card networks.",
      terms: ["token", "par", "push"], cases: ["pp-launches"] }
  ],

  /* ---------- glossary, each definition checked against the source ---------- */
  glossary: {
    pa: { t: "PA (Payment Aggregator)",
      d: "An entity that collects payments from customers on a merchant's behalf, through one or more channels, and then settles the collected money to that merchant. It handles funds, which is why it is licensed.",
      src: "RBI, Master Direction on Regulation of Payment Aggregators", u: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12896" },
    pg: { t: "PG (Payment Gateway)",
      d: "The technology that routes and processes an online payment, without handling the funds itself. A PA moves money; a PG moves messages.",
      src: "RBI, Guidelines on Regulation of PAs and PGs (Mar 2020)", u: "https://m.rbi.org.in/Scripts/NotificationUser.aspx?Id=11822&Mode=0" },
    acquirer: { t: "Acquirer",
      d: "The bank or non-bank that enables a merchant to accept a payment instrument, and settles funds to the merchant, or to the intermediary that onboarded the merchant.",
      src: "RBI, Discussion Paper on Charges in Payment Systems (Aug 2022)", u: "https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082" },
    issuer: { t: "Issuer",
      d: "The bank or non-bank that issues the customer's payment instrument, such as the card or wallet, and approves or declines the payment.",
      src: "RBI, Discussion Paper on Charges in Payment Systems (Aug 2022)", u: "https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082" },
    mdr: { t: "MDR (Merchant Discount Rate)",
      d: "The charge the acquirer recovers from the merchant, taken as a discount on the transaction amount and usually deducted at settlement. It pays everyone in the chain.",
      src: "RBI, Discussion Paper on Charges in Payment Systems (Aug 2022)", u: "https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082" },
    interchange: { t: "Interchange",
      d: "The share of the MDR carved out and paid to the issuer. It sets a floor under the MDR, since an acquirer cannot charge the merchant less than it owes the issuer.",
      src: "RBI, Discussion Paper on Charges in Payment Systems (Aug 2022)", u: "https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082" },
    settlement: { t: "Settlement",
      d: "Paying the merchant what it is owed, net of fees. Under RBI's Master Direction, the timeline for credit to the merchant follows the PA-merchant agreement, which must state it transparently.",
      src: "RBI, Master Direction on Regulation of Payment Aggregators", u: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12896" },
    tn: { t: "T+1 (T+n)",
      d: "Settlement n days after the transaction day T, so T+1 is the next day. RBI describes card settlement to merchants on a T+n basis, with n set by the merchant's agreement.",
      src: "RBI, Discussion Paper on Charges in Payment Systems (Aug 2022)", u: "https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082" },
    gst: { t: "GST on MDR",
      d: "18% GST is charged on the gateway's fee, not on the transaction value. A ₹10 fee costs the merchant ₹11.80.",
      src: "Razorpay blog, payment gateway pricing", u: "https://razorpay.com/blog/payment-gateway-pricing-by-business-category-india/" },
    sr: { t: "Success rate",
      d: "Successful payments divided by attempted payments, usually read by method, bank and acquirer. Routing and retries move it; so do checkout and bank downtime.",
      src: "Razorpay blog, Transaction Success Rate", u: "https://razorpay.com/blog/transaction-success-rate-what-it-is-and-why-it-matters/" },
    tat: { t: "Failed-transaction TAT",
      d: "RBI sets an outer limit (turnaround time) for reversing failed transactions across authorised payment systems, with compensation to the customer beyond it.",
      src: "RBI, Harmonisation of TAT for failed transactions (Sep 2019)", u: "https://www.rbi.org.in/commonman/English/scripts/Notification.aspx?Id=3074" },
    token: { t: "Tokenisation",
      d: "Replacing the actual card details with a code, the token, unique to the combination of card, token requestor and device (or merchant, for card-on-file). Merchants stop storing card numbers.",
      src: "RBI, FAQs on tokenisation", u: "https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=2917" },
    par: { t: "PAR (Payment Account Reference)",
      d: "An EMVCo standard reference linked to a card number and its tokens, so issuers, merchants or acquirers can recognise the same account without storing the card number.",
      src: "Visa, PAR Inquiry fact sheet", u: "https://usa.visa.com/dam/VCOM/global/products/documents/visa-token-service-payment-account-reference-inquiry-fact-sheet.pdf" },
    push: { t: "Push payments (Visa Direct, Mastercard Send)",
      d: "Money pushed into a card account rather than pulled from it. Visa Direct calls these Original Credit Transactions; Mastercard Send moves funds to and from card and digital accounts in near real time.",
      src: "Visa Developer, Visa Direct · Mastercard Developers, Mastercard Send", u: "https://developer.visa.com/docs/visa_direct", u2: "https://developer.mastercard.com/product/mastercard-send/" }
  },

  sellers: {
    phonepe: { name: "PhonePe", sub: "Product & Payments · Jun 2023 – Jun 2025", logo: "assets/logos/phonepe.svg" },
    navya:   { name: "Independent build", sub: "Designed and built by me", logo: "assets/logos/navya.svg" },
    christ:  { name: "Christ University", sub: "BBA (Hons) Finance", logo: "assets/logos/christ.svg" },
    cogent:  { name: "Cogent Infotech", sub: "Product Development · Aug 2025 – Jun 2026", logo: "assets/logos/cogent.svg" },
    mu:      { name: "Masters' Union", sub: "PGP-TBM · team projects", logo: "assets/logos/masters-union.svg" }
  },

  /* ---------- CASES ("transactions") ---------- */
  cases: [
    /* ---- PhonePe ---- */
    { id: "pp-routing", ref: "PP-01", seller: "phonepe", group: "phonepe", stages: ["route", "success"],
      name: "Acquiring-bank allocation and routing, Cards & NetBanking",
      short: "Routing & allocation", when: "Jul 2024 – Jun 2025",
      amt: { v: "₹8 Cr", u: "saved a year", p: "result" }, sub: "+4 pp travel payment success",
      hook: "Which acquirer gets which payment decides both whether it goes through and what it costs.",
      summary: {
        problem: "Travel merchants including ixigo and MakeMyTrip push ₹500+ Cr of TPV through card and netbanking rails. A poor acquirer allocation costs fees on every payment and conversions on every failed one.",
        did: "Optimised acquiring-bank allocation and payment routing across Cards and NetBanking. A/B tested routes with Growth, Engineering, Success and Testing, and made weekly routing calls from SQL dashboards of success rates, bank traffic and error codes.",
        landed: "₹8 Cr saved a year, and a 4 pp lift in travel payment success."
      },
      metrics: [
        { v: "₹8 Cr", l: "saved annually", p: "result" },
        { v: "+4 pp", l: "travel payment success from A/B tested routes", p: "result" },
        { v: "₹500+ Cr", l: "TPV of the travel merchants I owned, incl. ixigo and MakeMyTrip", p: "result" },
        { v: "Weekly", l: "routing decisions from SQL dashboards", p: "result" }
      ],
      details: [["Role", "Senior Operations Analyst – Product & Payments"], ["Where", "PhonePe · Bengaluru"], ["Partners", "Growth, Engineering, Success, Testing"], ["Data", "As stated on my CV. No internal data shown."]] },

    { id: "pp-recon", ref: "PP-02", seller: "phonepe", group: "phonepe", stages: ["settle", "recover"],
      name: "Historical reconciliation recovery",
      short: "Recon recovery", when: "Jul 2024 – Jun 2025",
      amt: { v: "₹15+ Cr", u: "recovered", p: "result" }, sub: "with Finance and Recon",
      hook: "The expensive failures don't throw errors. They drift.",
      summary: {
        problem: "Mismatches between what was transacted and what settled don't raise an alarm. They sit in the books until someone traces them.",
        did: "Traced historical reconciliation mismatches and coordinated settlement fixes with the Finance and Recon teams.",
        landed: "₹15+ Cr recovered. It is also the reason ReconOS exists."
      },
      metrics: [{ v: "₹15+ Cr", l: "recovered", p: "result" }],
      details: [["Teams", "Finance, Recon"], ["Where", "PhonePe · Bengaluru"], ["Data", "As stated on my CV."]] },

    { id: "pp-migration", ref: "PP-03", seller: "phonepe", group: "phonepe", stages: ["route", "integrate"],
      name: "Traffic migration across acquiring banks",
      short: "Bank migration", when: "Jul 2024 – Jun 2025",
      amt: { v: "95%", u: "of traffic in 3 months", p: "result" }, sub: "across acquiring-bank partners",
      hook: "A migration is won by phasing and monitoring, not by a launch date.",
      summary: {
        problem: "Moving payment traffic between acquiring banks puts merchant success rates at risk at every step.",
        did: "Shifted traffic across acquiring-bank partners in phases, watching success rates as each tranche moved.",
        landed: "95% of payment traffic migrated in three months, which made routing scalable."
      },
      metrics: [{ v: "95%", l: "of payment traffic migrated", p: "result" }, { v: "3 months", l: "end to end", p: "result" }],
      details: [["Where", "PhonePe · Bengaluru"], ["Data", "As stated on my CV."]] },

    { id: "pp-golive", ref: "PP-04", seller: "phonepe", group: "phonepe", stages: ["onboard", "integrate"],
      name: "MID-to-live onboarding workflow and bulk configuration tool",
      short: "Go-live workflow", when: "Jun 2023 – Jun 2024",
      amt: { v: "53%", u: "faster Cards go-live", p: "result" }, sub: "40% NetBanking · 360 go-lives in one upload",
      hook: "Faster go-live is revenue that starts sooner.",
      summary: {
        problem: "Getting a merchant from MID to live involved many teams and slow handoffs, one merchant at a time.",
        did: "Mapped MID-to-live onboarding as a 10-stage workflow with its handoffs across stakeholder teams, removed the friction points, and defined the requirements for a bulk configuration tool.",
        landed: "Go-live turnaround cut by 53% for Cards and 40% for NetBanking, and 360 merchant go-lives in one upload."
      },
      metrics: [
        { v: "53%", l: "cut in Cards go-live turnaround", p: "result" },
        { v: "40%", l: "cut in NetBanking go-live turnaround", p: "result" },
        { v: "10", l: "stages mapped, MID to live", p: "result" },
        { v: "360", l: "merchant go-lives in one upload", p: "result" }
      ],
      details: [["Role", "Operations Analyst – Payments"], ["Where", "PhonePe · Bengaluru"], ["Data", "As stated on my CV."]] },

    { id: "pp-launches", ref: "PP-05", seller: "phonepe", group: "phonepe", stages: ["network", "integrate"],
      name: "Card network launches and bank / PSP integrations",
      short: "Network launches", when: "Jun 2023 – Jun 2025",
      amt: { v: "4", u: "network launches", p: "result" }, sub: "5+ bank and PSP integrations",
      hook: "CVV-less payments, PAR API, Visa Direct and MoneySend.",
      summary: {
        problem: "New card capabilities only work if the network, the banks and the PSPs go live together.",
        did: "Coordinated go-live with the card networks for four launches, and owned requirements, UAT and go-live for 5+ bank and PSP integrations.",
        landed: "CVV-less payments, PAR API, Visa Direct and MoneySend launched; 5+ integrations live."
      },
      metrics: [{ v: "4", l: "launches: CVV-less, PAR API, Visa Direct, MoneySend", p: "result" }, { v: "5+", l: "bank and PSP integrations, requirements to go-live", p: "result" }],
      details: [["Where", "PhonePe · Bengaluru"], ["Data", "As stated on my CV."]] },

    /* ---- own payments builds ---- */
    { id: "reconos", ref: "BLD-01", seller: "navya", group: "builds", stages: ["settle", "recover"],
      name: "ReconOS: gateway and courier leakage audit for D2C brands",
      short: "ReconOS", when: "Oct 2026 – present",
      amt: { v: "17", u: "leakage checks", p: "built" }, sub: "57 engine tests · live",
      hook: "Traces every order from sale to bank, and writes the claim email.",
      media: [{ type: "video", src: "assets/work/reconos-teaser.mp4", poster: "assets/work/reconos-teaser-poster.jpg", alt: "ReconOS, 30-second product teaser" }],
      links: [{ t: "Open reconos.in", u: "https://www.reconos.in" }, { t: "Repository", u: "https://github.com/navyajuneja1000-droid/ReconOs" }],
      summary: {
        problem: "A D2C brand pays a payment gateway and a courier on every order. Both deduct their own fees, and nobody checks either against the agreed rate card. ₹14 over on one shipment is invisible; over a month it is a salary.",
        did: "A browser-based audit. Drop in last month's exports and the rate cards, and every order is traced from sale to partner to bank, with a claim email per partner.",
        landed: "Live at reconos.in in early access. No customers or recovered amounts yet, and the site says so. Plan: one free audit, then ₹999 a month."
      },
      metrics: [
        { v: "17", l: "leakage checks in five families", p: "built" },
        { v: "57", l: "engine tests: one fails if a planted leak is missed or a clean order is flagged", p: "built" },
        { v: "6 + 9", l: "gateways and couriers read by name (beta until real exports are added)", p: "built" }
      ],
      sections: [
        { h: "Where the money goes missing", list: ["Gateway fee above the rate card, priced per method (UPI, debit, credit by network, netbanking, wallets, EMI)", "Wrong GST on the fee", "Paid but never settled", "Refund mismatches", "COD never remitted, or remitted short", "Shipping above the rate card, by zone and weight", "Return charges on delivered orders", "Weight disputes past their deadline"] },
        { h: "Claim vs Check", p: "A tool that tells a founder to argue with a partner is only useful if it is right. Claim means the brand's own files prove the money is owed. Check means something doesn't add up but can't be proven from the files alone. When a gateway file doesn't say credit or debit, the fee is checked against the highest rate it could have been, so nothing is over-claimed." },
        { h: "The adoption problem", p: "The audit can't run without rate cards, and nobody types zone-and-weight pricing for four partners. So ReconOS pre-fills each card from what the brand was charged most often, and reads the real one from a PDF, a screenshot, a sheet or pasted email text. Files never leave the browser." },
        { h: "Why the scope moved", compare: [["Before", "Mid-market merchants, gateway reconciliation only, a finance team as the buyer."], ["Now", "Shopify D2C brands, courier and gateway, the founder as the buyer, a free first audit."]] }
      ],
      details: [["My role", "Problem, scope, the checks, pricing and the build"], ["Gateways read", "Razorpay, PayU, Cashfree, PhonePe, Paytm, CCAvenue"], ["Status", "Live MVP, early access"]] },

    { id: "routeiq", ref: "BLD-02", seller: "navya", group: "builds", stages: ["route", "success"],
      name: "RouteIQ: dynamic payment routing, PRD and prototype",
      short: "RouteIQ", when: "PRD & prototype",
      amt: { v: "≥ 2 pp", u: "success-rate target", p: "target" }, sub: "4 guardrails · 6 non-goals",
      hook: "Static rules can't see a gateway degrade. This is the general fix, with the limits written down.",
      links: [{ t: "Open the prototype", u: "https://route-wise-ai-51.lovable.app" }],
      summary: {
        problem: "A gateway that was right this morning can be wrong this afternoon. Static rules keep sending traffic into a degraded path until a person notices, and by then the payments are lost.",
        did: "A PRD for an MVP routing engine: success and guardrail metrics, six deliberate non-goals, edge cases, and a working prototype.",
        landed: "A specification and prototype, not a shipped product. It generalises the routing work behind the ₹8 Cr a year at PhonePe."
      },
      metrics: [
        { v: "≥ 2 pp", l: "payment success rate improvement", p: "target" },
        { v: "≥ 10%", l: "fall in routing-related failures", p: "target" },
        { v: "≥ 50%", l: "of eligible transactions routed by the engine within 3 months", p: "target" },
        { v: "≥ 30%", l: "fewer manual routing interventions", p: "target" }
      ],
      sections: [
        { h: "Product principle", p: "Optimise for the merchant's business outcome, not the success rate alone. A route that wins a little success at a much higher MDR can still lose the merchant money." },
        { h: "Four guardrails", list: ["Average processing cost per transaction", "Payment latency: a late routing decision is a failed checkout", "Merchant complaints, the signal before the metrics move", "Incorrect routing incidents"] },
        { h: "Six non-goals", list: ["Onboard new gateways automatically", "Negotiate gateway pricing", "Build a payment gateway", "Optimise fraud detection", "Change merchant business rules automatically", "Support every payment method at launch"] },
        { h: "Why the PRD names no algorithm", p: "A product manager should say what and why, and let engineering decide how." }
      ],
      details: [["Users", "Enterprise merchants on several gateways; payment ops and finance"], ["Status", "PRD and prototype. Not launched."]] },

    { id: "mid", ref: "BLD-03", seller: "navya", group: "builds", stages: ["onboard", "integrate"],
      name: "MID Procurement: event-sourced acquirer onboarding",
      short: "MID Procurement", when: "Sep 2026 – present",
      amt: { v: "99.0%", u: "bank replies auto-applied", p: "built" }, sub: "283 tests · synthetic data",
      hook: "Four teams, six banks, and nobody could say where the weeks went.",
      media: [
        { type: "img", src: "assets/work/mid-scorecard.png", alt: "Acquirer scorecard from the MID procurement dashboard" },
        { type: "img", src: "assets/work/mid-timeline.png", alt: "Per-request timeline with overlapping party clocks" }
      ],
      links: [
        { t: "Open the live build", u: "https://workflowmidprocurement.vercel.app/" },
        { t: "Read the PRD", u: "https://github.com/navyajuneja1000-droid/MID-Procurement-Workflow/blob/HEAD/PRD.md" }
      ],
      summary: {
        problem: "A merchant can't go live until an acquiring bank issues a MID. Four parties (BD, onboarding, ops, the bank) touch every request across six or seven banks, and the tracker could show that a request was late but not whose time it was.",
        did: "An event-sourced web app that times each party separately, checks intake data before it costs a bank cycle, builds each bank's file, reads bank replies out of the inbox, and chases only what is actually late.",
        landed: "99.0% of bank replies applied without a person, measured on a seeded synthetic dataset (360 merchants, 1,376 requests, 626 bank emails), not live traffic. No real MID has been procured through it."
      },
      metrics: [
        { v: "99.0%", l: "of bank replies applied automatically, synthetic data", p: "built" },
        { v: "283", l: "tests, each a rule from the PRD", p: "built" },
        { v: "6", l: "acquirers on the synthetic panel, names invented", p: "built" },
        { v: "30–40%", l: "of requests that bounce for missing data in the process it models", p: "modelled" }
      ],
      sections: [
        { h: "Get the unit of work right", p: "The unit is merchant + MCC + acquirer, not merchant + acquirer. One merchant can need several MIDs for several lines of business, so bank replies are matched on legal name plus MCC. A one-row-per-merchant sheet can't hold this." },
        { h: "Turnaround rules", list: ["Working days only, per acquirer holiday calendar", "A 2 pm cut-off: after it, the bank's clock starts the next working day", "Ops time measured per pickup; the pickup count is the rework measure", "Hands-on vs waiting split, so ops efficiency excludes the bank's queue"] },
        { h: "Judging the bank fairly", compare: [["Rejected", "SLA on total time. It bills the bank for days the request sat with us collecting a document."], ["Chosen", "SLA on the slowest single response round, which is the bank's own time."]] },
        { h: "Why there is no share-of-delay pie chart", p: "Clocks overlap: ops runs alongside the bank, onboarding alongside BD. Per-party days add up to more than elapsed time, so a pie would be arithmetically wrong. The honest view is a timeline per request." }
      ],
      details: [["Context", "Generalised from two years running this at PhonePe. Acquirers, merchants and templates are invented."], ["Status", "Built and tested end to end on synthetic data."]] },

    { id: "upi", ref: "RES-01", seller: "christ", group: "builds", stages: ["success"],
      name: "UPI adoption in India: what makes people trust a payment rail",
      short: "UPI dissertation", when: "Mar 2023",
      amt: { v: "211", u: "UPI users surveyed", p: "result" }, sub: "7 constructs · regression in SPSS",
      hook: "Sole-researcher dissertation on why people do or don't adopt UPI.",
      summary: {
        problem: "Why do some people pay by UPI for everything and others not at all? The drivers decide what a payments product should fix first.",
        did: "Primary research with 211 UPI users: a 24-item survey across seven behavioural constructs, analysed in SPSS with reliability, correlation and regression tests.",
        landed: "Trust, usability and perceived usefulness came out as the adoption drivers. Success rate is a trust metric as much as an ops one."
      },
      metrics: [
        { v: "211", l: "UPI users surveyed", p: "result" },
        { v: "24", l: "survey items across 7 behavioural constructs", p: "result" },
        { v: "3", l: "drivers: trust, usability, perceived usefulness", p: "sourced" }
      ],
      details: [["Role", "Sole researcher"], ["Where", "Christ University, BBA (Hons) Finance"], ["Method", "Survey, reliability, correlation, regression (SPSS)"]] },

    /* ---- beyond payments ---- */
    { id: "h2h", ref: "BYD-01", seller: "cogent", group: "beyond", stages: [],
      name: "H2H: 0→1 career-prep product, pricing, growth and launch",
      short: "H2H at Cogent", when: "Aug 2025 – Jun 2026",
      amt: { v: "~$110K", u: "in 2 months at 6x ROAS", p: "result" }, sub: "4.6× sign-ups",
      hook: "A pricing pivot and a launch, grown by fixing the funnel rather than adding budget.",
      summary: {
        problem: "US job seekers bought CV writers, LinkedIn optimisers and coaching separately and still got no callbacks. Pay after placement (an ISA) left revenue waiting on each customer's job search.",
        did: "Pivoted to upfront pricing after 60+ interviews, a payback analysis and 15+ rivals. Built a 5-metric LinkedIn score (0–100), packaged ~30 features into 3 tiers ($499 to $1,300), launched to 2 personas in 5 US states, and cut form drop-off from 72% to 45%.",
        landed: "~$110K in 2 months at 6x ROAS; sign-ups up 4.6×; 8% of 1,500+ sign-ups paid; 22% of $499 buyers upgraded; 90% of 150+ orders on time."
      },
      metrics: [{ v: "~$110K", l: "in 2 months at 6x ROAS", p: "result" }, { v: "4.6×", l: "sign-ups: form drop-off 72% to 45%, 18% of drop-offs recovered via email", p: "result" }, { v: "8%", l: "of 1,500+ sign-ups converted to paid via a free résumé audit", p: "result" }, { v: "22%", l: "of $499 buyers upgraded across 3 tiers", p: "result" }, { v: "90%", l: "on-time delivery across 150+ orders", p: "result" }],
      details: [["Role", "Assistant Project Manager – Product Development"]] },

    { id: "perfora", ref: "BYD-02", seller: "mu", group: "beyond", stages: [],
      name: "Perfora: a plan to double website revenue, pitched to the CEO",
      short: "Perfora growth plan", when: "2026",
      amt: { v: "₹6 Cr", u: "a month target, from ₹3 Cr", p: "target" }, sub: "70% from fixing leaks",
      hook: "Checkout, COD and repeat buying, before more ad spend.",
      media: [
        { type: "img", src: "assets/work/perfora-slide-1.jpg", alt: "Slide 1: funnel diagnosis and root causes" },
        { type: "img", src: "assets/work/perfora-slide-2.jpg", alt: "Slide 2: growth bridge from ₹3 Cr to ₹6 Cr" },
        { type: "img", src: "assets/work/perfora-slide-3.jpg", alt: "Slide 3: six-month roadmap and beta tests" }
      ],
      deck: { u: "assets/decks/Perfora-Growth-Plan-Navya-Juneja.pdf", t: "Perfora growth plan (PDF, 3 pages)" },
      summary: {
        problem: "Ad spend nearly doubled while website revenue stayed near ₹3 Cr a month; 60% of checkouts were abandoned and RTO climbed.",
        did: "A driver-tree bridge from ₹3 Cr to ₹6 Cr, two randomised beta tests (COD confirmation, past-buyer holdout) and a gated six-month roadmap. Pitched to Perfora's CEO.",
        landed: "A plan, not an implementation: ₹2.1 Cr of the extra ₹3 Cr from fixing delivery, checkout, basket and repeat, with ad spend up 15%."
      },
      metrics: [{ v: "60%", l: "of checkouts abandoned (case workbook)", p: "sourced" }, { v: "₹2.1 Cr", l: "of the extra ₹3 Cr from fixing leaks", p: "modelled" }],
      details: [["Context", "Masters' Union × Perfora challenge"]] },

    { id: "wowworld", ref: "BYD-03", seller: "mu", group: "beyond", stages: [],
      name: "WOW! World: WOW! Momo's next FMCG category, priced and sized",
      short: "WOW! World", when: "2026",
      amt: { v: "3rd", u: "place, pitched to the CEO", p: "result" }, sub: "I owned pricing, unit economics, SOM",
      hook: "A ₹10 sachet to try, an ₹89 carton to keep cooking.",
      media: [
        { type: "img", src: "assets/work/wow-pricing.jpg", alt: "Pricing slide: price ladder against the shelf" },
        { type: "img", src: "assets/work/wow-unit-economics.jpg", alt: "Unit economics slide: contribution by SKU" }
      ],
      deck: { u: "assets/decks/WOW-World-Pitch-Deck.pdf", t: "WOW! World pitch deck (PDF)" },
      summary: {
        problem: "Find WOW! Momo's next packaged-food category and prove gap, fit, size, SKUs, pricing and viability.",
        did: "With a five-person team: customer interviews and a Reddit test found the gap. I owned the price ladder, contribution per SKU and a pilot-first SOM.",
        landed: "Three masalas across six SKUs from ₹10 to ₹99 and a gated pilot. Placed 3rd."
      },
      metrics: [{ v: "₹5.2 Cr", l: "SOM a year in 3 pilot cities", p: "modelled" }, { v: "42%", l: "contribution on the ₹99 shaker", p: "modelled" }],
      details: [["Team", "Five, Masters' Union"]] },

    { id: "foundit", ref: "BYD-04", seller: "mu", group: "beyond", stages: [],
      name: "Found It: a retail venture run on a weekly P&L",
      short: "Found It", when: "Jul – Sep 2026",
      amt: { v: "₹6.94 L", u: "revenue in 3 months", p: "result" }, sub: "10.1% EBT",
      hook: "Jaipur sourcing, Gurugram stalls, and a B2B channel nobody planned.",
      summary: {
        problem: "Build an ethnic and lifestyle retail venture from nothing with a Masters' Union team, and make it pay inside three months.",
        did: "Led sourcing, sales and people; ran it on a weekly P&L tracking landed costs; opened corporate gifting through cold outreach and catalogues.",
        landed: "₹6.94 L revenue from real customers at 13.1% gross margin and 10.1% EBT. Gifting brought 62%."
      },
      metrics: [{ v: "62%", l: "of revenue from B2B gifting", p: "result" }, { v: "13.1%", l: "gross margin", p: "result" }],
      details: [["Team", "Masters' Union venture"]] },

    { id: "prolectro", ref: "BYD-05", seller: "mu", group: "beyond", stages: [],
      name: "Prolectro: clear protein sachet, research to GTM",
      short: "Prolectro", when: "Sep 2026",
      amt: { v: "101", u: "people surveyed", p: "result" }, sub: "proposed, not launched",
      hook: "Built for the people who bought protein once and quit.",
      media: [{ type: "img", src: "assets/work/prolectro-pack.jpg", alt: "Prolectro Refresh sachet pack concept" }],
      summary: {
        problem: "41 of 74 surveyed people who had tried protein powder had stopped. Could a product win them back?",
        did: "Created the brand and owned positioning, product definition and pricing; ran the 101-person survey the plan argues from.",
        landed: "A go-to-market plan with launch gates. Proposed, never launched."
      },
      metrics: [{ v: "41 of 74", l: "who tried protein powder had stopped", p: "sourced" }, { v: "₹129", l: "per sachet", p: "target" }],
      details: [["Status", "Proposed, not launched"]] }
  ],

  /* ---------- FIT: company switcher (facts Sourced, ideas = hypotheses) ---------- */
  fits: {
    generic: {
      name: "Any payments team", short: "Generic",
      line: "Two years inside a payment aggregator's rails, then three payments builds of my own.",
      facts: [],
      map: [
        ["Acquirer routing and success rate", ["pp-routing", "routeiq"]],
        ["Merchant onboarding and go-live", ["pp-golive", "mid"]],
        ["Settlement and reconciliation", ["pp-recon", "reconos"]],
        ["Card network products", ["pp-launches"]]
      ],
      hyp: [
        { h: "Read success rate and cost on one screen", w: "Most routing reviews look at success first and cost later. RouteIQ's principle (optimise the merchant's outcome, not success alone) is a reporting change before it is an engine change." },
        { h: "Shorten time to first transaction", w: "At PhonePe, mapping MID-to-live as 10 stages cut go-live by 53% for Cards. The same mapping, per acquirer and per merchant segment, usually finds the slow handoff." },
        { h: "Make settlement variance visible to merchants", w: "ReconOS shows that a merchant can't check a fee it can't see. A per-method expected-vs-actual view is cheap to build and earns trust." }
      ]
    },
    razorpay: {
      name: "Razorpay", short: "Razorpay",
      line: "Razorpay sells routing, settlement and onboarding speed to merchants. Those are the three things I worked on at PhonePe.",
      facts: [
        { t: "The India homepage lists Payment Gateway, Razorpay POS, API & Bulk Payouts and Instant Settlements among its products.", u: "https://razorpay.com/" },
        { t: "The payment gateway offers 100+ payment methods, including UPI, cards and EMI.", u: "https://razorpay.com/payment-gateway/" },
        { t: "Optimizer routes across multiple gateways using ML on over 150 parameters, which Razorpay says can raise success rates by up to 10%.", u: "https://razorpay.com/blog/boost-payments-success-rates-with-optimizers-ai-ml-routing/" },
        { t: "Razorpay publishes an Optimizer performance report comparing method-level success rates across gateways.", u: "https://razorpay.com/blog/how-do-you-know-that-your-payments-router-is-actually-creating-value-for-your-business-introducing-the-optimizer-performance-report/" }
      ],
      map: [
        ["Optimizer (multi-gateway routing)", ["pp-routing", "routeiq", "pp-migration"]],
        ["Payment Gateway onboarding & go-live", ["pp-golive", "mid"]],
        ["Instant Settlements & reconciliation", ["pp-recon", "reconos"]],
        ["Cards: tokenisation and network rails", ["pp-launches"]]
      ],
      hyp: [
        { h: "Put cost next to success in Optimizer reporting", w: "The performance report compares success by method and gateway. Adding effective MDR per route would let a merchant see when a success gain costs more than it earns, the RouteIQ guardrail." },
        { h: "Cut time to live for enterprise merchants on several acquirers", w: "Each acquirer issues its own MID. A per-acquirer readiness check at intake, as in MID Procurement, stops the 30–40% bounce pattern before it costs a bank cycle." },
        { h: "Expected-vs-actual settlement view", w: "ReconOS already reads Razorpay exports (beta). The same per-method fee check, shown inside the dashboard, would answer the question merchants otherwise answer in Excel." }
      ]
    },
    pinelabs: {
      name: "Pine Labs", short: "Pine Labs",
      line: "Pine Labs runs acquiring, issuing and online payments on one stack. I've worked on the acquiring and network side of exactly that.",
      facts: [
        { t: "In-store: payments by contactless, cards, UPI, mobile wallets, EMI and more.", u: "https://www.pinelabs.com/" },
        { t: "Online: collect payments, make payouts, onboard customers and offer affordability solutions through one dashboard and APIs.", u: "https://www.pinelabs.com/" },
        { t: "Credit processing: card issuance, real-time UPI payments and acquirer processing from one platform.", u: "https://www.pinelabs.com/" },
        { t: "Plural (2021 launch) included Plural Gateway (100+ payment modes) and Plural Console, a payment orchestration platform across multiple gateways.", u: "https://www.pinelabs.com/media-analyst/pine-labs-announces-its-foray-in-the-online-payments-space-with-the-launch-of-plural" }
      ],
      map: [
        ["Acquirer processing", ["pp-routing", "pp-migration"]],
        ["Card issuance & network programs", ["pp-launches"]],
        ["Merchant onboarding, online and in-store", ["pp-golive", "mid"]],
        ["Orchestration across gateways", ["routeiq"]]
      ],
      hyp: [
        { h: "Bulk onboarding for multi-outlet merchants", w: "A brand with hundreds of outlets is one contract and hundreds of configurations. The bulk configuration tool I specified put 360 merchants live in one upload." },
        { h: "A migration playbook for acquirer processing", w: "Moving 95% of traffic across acquiring banks in three months came down to tranches and guardrails. The same discipline applies when a merchant's volume moves onto a new processing stack." },
        { h: "Network product launches as programs", w: "CVV-less, PAR, Visa Direct and MoneySend each needed the network, banks and PSPs live together. Issuing products add the issuer side to that same checklist." }
      ]
    },
    juspay: {
      name: "Juspay", short: "Juspay",
      line: "Juspay's core is routing across processors. My best numbers at PhonePe came from routing.",
      facts: [
        { t: "Payment orchestration: maximise acceptance rates by optimising transactions in real time.", u: "https://juspay.io/in" },
        { t: "Routing options listed: custom rules, cascading, fallback, predictive, risk-based and least-cost routing, plus outage alerts.", u: "https://juspay.io/in/payment-orchestration" },
        { t: "Juspay cites 300+ integrations and a 30% average recovery of otherwise lost revenue, with automated reconciliation.", u: "https://juspay.io/in/payment-orchestration" },
        { t: "Products include network tokenisation and UPI 360, a suite of UPI solutions for merchants.", u: "https://juspay.io/in" }
      ],
      map: [
        ["Orchestration & least-cost routing", ["pp-routing", "routeiq"]],
        ["Cascading / fallback and success rate", ["pp-routing", "pp-migration"]],
        ["Tokenisation", ["pp-launches"]],
        ["Automated reconciliation", ["pp-recon", "reconos"]],
        ["UPI", ["upi"]]
      ],
      hyp: [
        { h: "Guardrails as a product surface", w: "Least-cost and predictive routing can each break something the other optimises. RouteIQ's four guardrails (cost, latency, complaints, wrong-route incidents) are a merchant-facing contract for what the router won't trade away." },
        { h: "Integration programs that hit their go-live date", w: "300+ integrations means a constant queue of bank and PSP launches. I owned requirements, UAT and go-live for 5+ of them, and the 10-stage go-live map is a reusable template." },
        { h: "Recovered revenue, proven", w: "A 30% recovery claim gets stronger with a per-merchant ledger of which retries recovered what. That is the Claim vs Check discipline from ReconOS applied to routing." }
      ]
    },
    payu: {
      name: "PayU", short: "PayU",
      line: "PayU sells settlement speed, tokens and checkout. I've launched tokens, recovered settlements and run routing for high-ticket travel merchants.",
      facts: [
        { t: "PayU India cites 5 lakh+ businesses, 150+ payment methods and 10M daily transactions.", u: "https://payu.in/" },
        { t: "Settlement products: Split Settlements on each order, and Priority Settlements, same-day or T+0.", u: "https://payu.in/" },
        { t: "Token Hub tokenises customer payment details for faster repeat transactions; Native OTP and FlashPay keep card authentication inside checkout.", u: "https://payu.in/" },
        { t: "Instant Refund processes customer refunds within 5 minutes.", u: "https://payu.in/" }
      ],
      map: [
        ["Token Hub", ["pp-launches"]],
        ["Split & Priority Settlements", ["pp-recon", "reconos"]],
        ["Payment gateway for enterprise merchants", ["pp-routing", "pp-golive"]],
        ["Onboarding at scale", ["mid"]]
      ],
      hyp: [
        { h: "Reconciliation for split settlements", w: "Every split adds a party whose share can drift. The ₹15+ Cr recovery at PhonePe came from tracing exactly that kind of mismatch, and ReconOS already reads PayU exports (beta)." },
        { h: "Token adoption on repeat checkout", w: "Having launched PAR API and CVV-less payments, I'd look at where tokenised repeat customers still fall back to full card entry, by issuer and network." },
        { h: "Success rate for high-ticket travel", w: "Travel merchants are where a 4 pp lift was worth most at PhonePe. Route-level A/B tests with Growth and Engineering are a method, not a one-off." }
      ]
    },
    cashfree: {
      name: "Cashfree Payments", short: "Cashfree",
      line: "Cashfree is building AI agents for reconciliation, disputes and COD checks. I built one of those for D2C brands.",
      facts: [
        { t: "Cashfree Relay: AI agents that run back-office payment work, including reconciliation, refunds, disputes and COD checks, with approval for anything that moves money.", u: "https://www.cashfree.com/" },
        { t: "Instant Settlements put sales money in the merchant's account in minutes, not T+2 days.", u: "https://www.cashfree.com/" },
        { t: "The payment gateway offers 180+ ways to pay across UPI, cards, EMI, netbanking and wallets.", u: "https://www.cashfree.com/" },
        { t: "SecureID verifies KYC, bank accounts, GST, documents and faces; Payouts pay out 24x7 to bank accounts, UPI IDs, cards and wallets.", u: "https://www.cashfree.com/" }
      ],
      map: [
        ["Relay: reconciliation, disputes, COD checks", ["reconos", "pp-recon"]],
        ["Onboarding & SecureID", ["pp-golive", "mid"]],
        ["Payouts & push to cards", ["pp-launches"]],
        ["Gateway success rate", ["pp-routing", "routeiq"]]
      ],
      hyp: [
        { h: "Claim vs Check for Relay agents", w: "An agent that disputes money needs to know when it is sure. ReconOS's split (proven by the merchant's own files vs needs a look) maps cleanly onto Relay's 'you approve anything that moves money'." },
        { h: "COD remittance checks", w: "ReconOS's first check family is COD never remitted or remitted short, across 9 couriers. That is the COD-check problem, already broken into testable rules." },
        { h: "Onboarding to first transaction", w: "SecureID speeds verification; the slow part is often the handoffs after it. The 10-stage map that cut go-live by 53% for Cards is the method." }
      ]
    },
    cred: {
      name: "CRED", short: "CRED",
      line: "CRED sits on credit cards and UPI, and on trust. My UPI research found trust and usability drive adoption, and I've launched card network products.",
      facts: [
        { t: "CRED lets members manage credit cards: payment reminders, hidden fees, spending insights.", u: "https://cred.club/" },
        { t: "Payments: scan and pay any UPI QR, UPI payments on credit, and tap to pay on credit.", u: "https://cred.club/" },
        { t: "CRED pay for merchants: customers get personalised offers and pay by credit card or CRED UPI, using their cashback.", u: "https://cred.club/cred-pay/onboarding" },
        { t: "CRED pay merchant terms describe a direct integration of the merchant with CRED and a payment aggregator.", u: "https://cred.club/partner-pay-tnc" }
      ],
      map: [
        ["Credit card rails & tokens", ["pp-launches"]],
        ["UPI on credit", ["upi", "pp-routing"]],
        ["CRED pay merchant go-live", ["pp-golive", "mid"]],
        ["Checkout success rate", ["pp-routing", "routeiq"]]
      ],
      hyp: [
        { h: "Merchant go-live for CRED pay", w: "Each CRED pay merchant is an integration with CRED and an aggregator. Owning requirements, UAT and go-live for 5+ bank and PSP integrations is that job." },
        { h: "Success rate on UPI-on-credit by issuer", w: "A new rail fails in new ways. Weekly reads of success rate and error codes by bank, as I ran at PhonePe, find the issuer-specific breaks early." },
        { h: "Trust as a product metric", w: "My UPI study (211 users) found trust and usability drive adoption. For a members' product, a failed payment costs trust, not just a transaction." }
      ]
    }
  },
  fitOrder: ["generic", "razorpay", "pinelabs", "juspay", "payu", "cashfree", "cred"],

  /* ---------- experience ledger ---------- */
  ledger: [
    { id: "mu", type: "Education", org: "Masters' Union", logo: "assets/logos/masters-union.svg",
      title: "PGP in Technology & Business Management", when: "2026 – present", where: "Gurgaon", status: "Open",
      body: "Co-launched 2 revenue-generating ventures (₹7.3 L combined) and a live AI product.", cases: ["foundit", "wowworld", "perfora", "prolectro"] },
    { id: "cogent", type: "Work", org: "Cogent Infotech", logo: "assets/logos/cogent.svg",
      title: "Assistant Project Manager – Product Development", when: "Aug 2025 – Jun 2026", where: "Remote", status: "Closed",
      body: "Took H2H, an expert-led US career-prep program, from pay-after-placement to upfront pricing and launched it: ~$110K in 2 months at 6x ROAS, sign-ups up 4.6×, 90% of 150+ orders delivered on time.", cases: ["h2h"] },
    { id: "phonepe-sr", type: "Work", org: "PhonePe", logo: "assets/logos/phonepe.svg",
      title: "Senior Operations Analyst – Product & Payments", when: "Jul 2024 – Jun 2025", where: "Bengaluru", status: "Closed",
      body: "Owned integrations, routing and onboarding for ₹500+ Cr TPV travel merchants, including ixigo and MakeMyTrip.",
      lines: [["₹8 Cr", "saved a year: acquiring-bank allocation and routing, Cards and NetBanking"], ["+4 pp", "travel payment success from A/B tested routes"], ["₹15+ Cr", "recovered through historical reconciliation"], ["95%", "of traffic migrated across acquiring banks in 3 months"], ["4", "launches: CVV-less, PAR API, Visa Direct, MoneySend"]],
      cases: ["pp-routing", "pp-recon", "pp-migration", "pp-launches"] },
    { id: "phonepe", type: "Work", org: "PhonePe", logo: "assets/logos/phonepe.svg",
      title: "Operations Analyst – Payments", when: "Jun 2023 – Jun 2024", where: "Bengaluru", status: "Closed",
      body: "Merchant onboarding, bank integrations and the go-live process.",
      lines: [["53% / 40%", "faster go-live, Cards / NetBanking, from a 10-stage MID-to-live map"], ["360", "go-lives in one upload via a bulk configuration tool"], ["5+", "bank and PSP integrations: requirements, UAT, go-live"], ["Weekly", "routing decisions from SQL dashboards"]],
      cases: ["pp-golive", "pp-launches"] },
    { id: "christ", type: "Education", org: "Christ University", logo: "assets/logos/christ.svg",
      title: "BBA (Hons), Finance · GPA 9.07/10", when: "2020 – 2023", where: "Bengaluru", status: "Closed",
      body: "Dissertation on UPI adoption (211 users). Head of the theatre club; Student Council, Cultural Society and HR Club.", cases: ["upi"] },
    { id: "school", type: "Education", org: "Saint Kabir Public School", logo: "assets/logos/school.svg",
      title: "CBSE Class XII (Commerce) · 94.8%", when: "2018", where: "Chandigarh", status: "Closed",
      body: "Outclass Team President." }
  ],

  certs: [
    ["Financial Modelling & Valuation", "Udemy · three-statement models, DCF, unit economics"],
    ["Project Management", "Google · scoping, stakeholder alignment, risk planning, Agile delivery"]
  ],

  habits: [
    ["The expensive failures are quiet", "Money that drifts rather than disappears: reconciliation gaps, overcharged fees, a degraded route nobody noticed."],
    ["Metrics you can argue with", "A number with its source attached. Every figure here says whether it happened, was built, or is my assumption."],
    ["Say what not to build", "Non-goals and guardrails are part of the spec, not a footnote."],
    ["Phase it, watch it", "95% of traffic moved in three months by moving it in tranches and watching success rates at each step."]
  ],

  roles: ["Payments product manager", "Program manager, payments / partnerships", "Payments operations (routing, onboarding, recon)", "Growth or strategy in payments"],

  faq: [
    ["Is any PhonePe data shown here?", "No. PhonePe figures are as stated on my CV. Transaction data and internal documents belong to PhonePe and are not reproduced."],
    ["What do Settled, Captured, Authorised, Pending and Verified mean?", "They are the provenance of each number, written as payment statuses. Settled = Result (it happened). Captured = Built (a working product). Authorised = Target (a success criterion). Pending = Modelled (my assumption). Verified = Sourced (external, linked)."],
    ["Where do the company facts come from?", "Each company's own website or press pages, fetched in November 2026 and linked next to the fact. What I would do there is written as a hypothesis, not a finding."],
    ["Where are you based?", "Gurgaon. Open to relocating, Bengaluru included."]
  ]
};
