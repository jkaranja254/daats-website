import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const careersUrl = "https://intelliapp.driverapponline.com/c/daatsco?uri_b=ia_daatsco_596246394";
const quoteUrl = "mailto:dispatch@daatscompanies.com?subject=Freight%20Quote%20Request";

const nav = [
  ["About", "about.html"],
  ["Services", "services.html"],
  ["Industries", "industries.html"],
  ["Coverage", "coverage.html"],
  ["Safety", "safety.html"],
  ["Apply", careersUrl, true],
  ["Blog", "blog.html"],
];

const services = [
  ["calendar", "Scheduled Delivery", "Tell us when your goods need to arrive and we build the schedule around it. Predictable, planned freight for shippers who run on tight windows."],
  ["pin", "Regional Services", "Scheduled or on-demand regional hauls across Texas and the surrounding region, tailored to your lanes and volume."],
  ["truck", "Nationwide OTR", "Long-haul over-the-road freight to all 48 contiguous states, moved by professional drivers and tracked the whole way."],
  ["box", "Local Delivery", "Straightforward local delivery with custom-tailored solutions to get your goods where they need to be, on time."],
  ["bolt", "Rush Services", "When a load cannot wait, our rush service prioritizes pickup and delivery so it gets there quickly and intact."],
  ["clock", "Same-Day Delivery", "Reliable same-day service for urgent shipments, with delivery guaranteed to arrive on schedule."],
];

const features = [
  ["shield", "Service with Integrity", "Not a slogan - the standard we hold every load and every driver to, on every mile."],
  ["snow", "Dry-van & refrigerated", "A modern fleet built to move both dry and temperature-controlled freight with care."],
  ["pin", "Local to nationwide", "One carrier for local, regional, and over-the-road lanes across the continental U.S."],
  ["box", "Authority you can verify", "Active interstate operating authority - USDOT 1724142, MC-631896 - with a satisfactory safety rating."],
];

const coverage = [
  ["box", "Local", "Dallas-Fort Worth metroplex and same-day metro moves."],
  ["pin", "Regional", "Texas and surrounding states, scheduled or on-demand."],
  ["boxes", "Nationwide", "Over-the-road service to all 48 contiguous states."],
];

const industries = [
  ["cart", "Retail & consumer goods", "Reliable replenishment freight that keeps shelves and distribution centers stocked."],
  ["snow", "Food & refrigerated", "Temperature-controlled hauling for fresh produce and perishable goods."],
  ["car", "Auto parts", "On-time parts movement that keeps assembly and service operations running."],
  ["doc", "Paper & packaging", "High-volume dry-van freight for paper products and packaging materials."],
  ["factory", "Building materials", "Dependable transport for construction and building-supply shipments."],
  ["pill", "Healthcare & general freight", "Careful handling for medical and mixed general-freight loads."],
];

const credentials = [
  ["badge", "Operating Authority", "Active interstate authority - USDOT 1724142, MC-631896."],
  ["shield", "Safety Rating", "Satisfactory safety rating on record with the FMCSA."],
  ["doc", "Authorized for Property", "Authorized for-hire interstate transportation of property."],
  ["clock", "Track Record", "In business since 2007 - over 17 years moving freight."],
];

const dieselTable = {
  releaseDate: "August 25, 2026",
  nextReleaseDate: "September 1, 2026",
  columns: ["Region", "08/10/26", "08/17/26", "08/24/26", "Week Ago", "Year Ago"],
  rows: [
    ["U.S.", "5.257", "5.454", "5.652", "0.198", "1.944"],
    ["East Coast (PADD1)", "5.193", "5.340", "5.498", "0.158", "1.772"],
    ["New England (PADD1A)", "5.514", "5.545", "5.716", "0.171", "1.748"],
    ["Central Atlantic (PADD1B)", "5.535", "5.652", "5.840", "0.188", "1.924"],
    ["Lower Atlantic (PADD1C)", "5.034", "5.204", "5.350", "0.146", "1.719"],
    ["Midwest (PADD2)", "5.181", "5.435", "5.636", "0.201", "1.938"],
    ["Gulf Coast (PADD3)", "5.044", "5.237", "5.481", "0.244", "2.153"],
    ["Rocky Mountain (PADD4)", "5.271", "5.427", "5.537", "0.110", "1.789"],
    ["West Coast (PADD5)", "6.033", "6.203", "6.407", "0.204", "1.946"],
    ["West Coast less California", "5.526", "5.699", "5.859", "0.160", "1.756"],
    ["California", "6.618", "6.785", "7.040", "0.255", "2.167"],
  ],
  sourceUrl: "https://www.eia.gov/petroleum/gasdiesel/",
};

const articles = [
  {
    slug: "fall-freight-prep-before-peak-season",
    title: "How Shippers Should Prepare for Fall Freight Before Peak Season Hits",
    category: "Industry News",
    date: "Aug 30, 2026",
    image: "assets/images/blog-fall-freight-prep.png",
    deck: "Late August is when disciplined freight teams tighten forecasts, lock in capacity, and fix the small communication gaps that become expensive once fall shipping pressure starts building.",
    sections: [
      ["Late August is the planning window", [
        "A lot of freight problems that show up in October are actually created in late August and early September. That is the window when volumes start to tighten in parts of the network, facilities begin shifting toward fall product movement, and transportation teams find out whether their lane plans are built on assumptions or on current operating facts. If a shipper waits until a lane is already under pressure, every conversation becomes more expensive. Capacity gets priced with more caution, appointment flexibility starts disappearing, and avoidable mistakes take longer to recover from.",
        "That is why late August matters. It gives shippers a clean opportunity to prepare before the market starts asking harder questions. Which lanes are likely to pick up? Which customers will need tighter service windows? Which facilities created repeat delays in the spring and summer? Which loads need refrigerated equipment, trailer pools, drop capacity, or faster exception handling? Those answers should be clear before peak-season behavior begins to squeeze margin out of routine freight.",
        "Preparation does not mean guessing at a national market headline and overreacting to it. It means looking at your own operation with discipline. The best freight teams head into fall with a current lane view, realistic dock expectations, and a carrier group that understands what is likely to change. That work is not dramatic, but it is usually the difference between controlled execution and expensive scrambling."
      ]],
      ["Clean up the forecast before the load tenders change", [
        "The first job is to tighten the forecast. Many shipping teams carry broad assumptions about weekly volume that are accurate enough in calm periods but too loose once fall activity starts rising. A lane that usually moves three loads a week may turn into five. A customer that accepts broad appointment windows may shift toward more exact receiving times. A product mix that has been mostly dry-van may start pulling in more temperature-sensitive or time-sensitive freight. If those changes are not surfaced early, the freight itself will expose them later under worse conditions.",
        "A useful forecast is not a spreadsheet that looks polished. It is a working document that separates steady freight from volatile freight. Which lanes are committed and predictable? Which ones spike at month-end, quarter-end, or around promotions? Which shipments are strategic enough that a missed appointment creates costs well beyond the linehaul? If your transportation team and your carrier are both looking at the same practical lane picture, capacity conversations get simpler because they are built on operating reality instead of hopeful averages.",
        "This is also the right time to identify freight that should not be treated the same way. Rush loads, store resets, seasonal replenishment, refrigerated shipments, and customer-facing critical moves all deserve their own handling assumptions. When everything is labeled urgent, nothing is prioritized properly. Fall preparation gets better when the operation defines what truly needs premium attention and what can stay in a normal planning rhythm."
      ]],
      ["Fix dock communication before it turns into detention", [
        "A surprising amount of fall freight waste comes from facility communication that looked manageable in slower periods. Pickup numbers are incomplete. Receiving contacts have changed. Driver instructions live in an email thread nobody checked before dispatch. A warehouse closes one dock early, a consignee changes unloading rules, or a site starts enforcing tighter appointment discipline after a seasonal surge. None of those issues are exotic, but they become expensive fast when there is less room in the schedule.",
        "The preventive move is straightforward. Reconfirm the basics on the lanes that matter most: addresses, dock hours, appointment rules, commodity notes, reference numbers, pallet counts, temperature requirements, and the actual person to call when something changes at the facility. If a consignee is known for long unload times, treat that as an input to planning rather than an irritation discovered after the truck arrives. If a site requires a particular check-in routine or trailer configuration, get that information in front of the dispatcher and the driver before the pickup begins.",
        "That level of detail sounds small until you price the alternative. Detention, missed reloads, rescheduled delivery windows, after-hours calls, and frustrated customers are often rooted in information that should have been cleaned up days earlier. Good carriers can solve a lot on the road, but they solve it faster and more cheaply when the shipper has already removed preventable confusion from the handoff."
      ]],
      ["Use fall planning to secure the right kind of capacity", [
        "Capacity planning gets weaker when shippers think only in terms of how many trucks they might need. The better question is what kind of capacity the operation will actually require. Some lanes need a carrier that knows a strict appointment pattern. Some need reefer availability with disciplined temperature communication. Some need flexible regional coverage for last-minute shifts. Others need dependable long-haul execution where consistency matters more than the absolute lowest bid on a single shipment.",
        "That is why late August is a better time than October to talk with carriers about fall freight. A carrier can give a more honest answer when the conversation happens before the operation is under stress. It can say which lanes fit well, where it needs more notice, what trailer types are easiest to protect, and which service expectations deserve tighter planning. Those discussions help both sides avoid a common failure mode: saying yes to freight that nobody has defined well enough to execute cleanly.",
        "Committed capacity does not require a complex contract to be useful. Sometimes it is as simple as agreeing which lanes are recurring, what volume band is realistic, what lead times produce the best service, and how both sides will escalate exceptions. If those basics are settled early, the fall market has fewer chances to turn ordinary freight into emergency freight."
      ]],
      ["Protect margin by removing avoidable surprises", [
        "When fall pressure builds, the cheapest mistakes are the ones you prevented before a load was tendered. A shipper that clarifies lane demand, confirms facility rules, and aligns with carriers on service expectations usually spends less money on premium recovery. It also gets better communication because the carrier is not trying to decode the shipment while the clock is already running. Clearer freight is easier freight to price and easier freight to move.",
        "That matters for budget control as much as service. Transportation costs rise for obvious reasons when markets tighten, but they also rise for quieter reasons: extra empty miles, wasted driver time, rework, repeated check calls, and preventable accessorials. Those costs are harder to explain internally because they do not always show up as one dramatic line item. They leak into the operation one avoidable exception at a time. Fall planning is valuable because it reduces those leaks before they start compounding.",
        "A practical late-August review should leave a shipper with a short list of actions, not a slide deck. Confirm the lanes that are likely to tighten. Separate truly critical freight from ordinary volume. Clean up dock instructions and appointment rules. Tell your carrier where volume or service expectations are likely to move. Identify the shipments that need refrigerated protection, tighter scheduling, or faster escalation. Then make sure the people tendering freight are working from that same operating picture.",
        "The strongest fall freight programs are rarely the ones with the most complicated systems. They are the ones that do the basics early and keep them current. When a carrier knows the lane, the facility, the freight profile, and the real service priority, it can plan with confidence instead of padding for uncertainty. For shippers, that is the payoff of preparing before peak season hits: fewer surprises, better control, and a freight network that behaves more like a plan than a reaction."
      ]]
    ],
  },
  {
    slug: "ai-in-trucking",
    title: "AI in Trucking Moves From Hype to Everyday Operations",
    category: "Technology",
    date: "Jun 20, 2026",
    image: "assets/images/blog-ai-trucking.png",
    deck: "Artificial intelligence has crossed from promise to proof in freight. Here's where it is actually delivering value in 2026 - and where the human behind the wheel still matters most.",
    sections: [
      ["The useful version is quieter than the hype", [
        "For years, artificial intelligence in trucking was sold with giant claims: autonomous trucks everywhere, dispatchers replaced by algorithms, and perfect predictions for every lane. The useful version that shippers are seeing in 2026 is less dramatic and more practical. AI is showing up as a set of tools that help people make better decisions faster. It is not replacing the fundamentals of trucking. Freight still has to be picked up, secured, monitored, delivered, and communicated by people who understand the work.",
        "That distinction matters for shippers. The best carriers are not using technology as a curtain. They are using it to tighten the basics: route planning, load visibility, maintenance timing, appointment discipline, and faster exception handling. When those tools are connected to experienced dispatchers and professional drivers, they can reduce waste and improve communication. When they are treated as magic, they create blind spots."
      ]],
      ["Where AI helps freight teams today", [
        "The strongest use case is pattern recognition. Dispatch and operations teams already collect a lot of signals: pickup times, traffic patterns, weather, dwell time, fuel use, trailer availability, driver hours, and service history. AI can sift through those signals quickly and point out what deserves attention. A dispatcher might see that a lane normally runs clean on Tuesday mornings but has started seeing repeated dock delays after a facility changed its receiving process. A maintenance manager might see a pattern that suggests a unit should be inspected before a failure creates a roadside delay.",
        "That kind of help is not glamorous, but it is valuable. Better planning means fewer surprises. Better exception detection means a shipper hears about a problem while there is still time to solve it. Better maintenance forecasting means equipment is more likely to be road-ready when a load needs to move. The technology earns its place when it helps a carrier keep promises."
      ]],
      ["What shippers should ask carriers", [
        "A shipper does not need to buy the most advanced technology story in the room. A shipper needs to know whether a carrier can explain how technology improves the shipment. Good questions are simple. How do you track a load once it is picked up? Who watches exceptions? How quickly will my team be notified if a delivery window is at risk? What information do you use to plan capacity? How do you keep drivers and dispatch aligned when a route changes?",
        "The answers should connect back to operations. If a carrier says it uses AI for dispatch, ask what that means in plain language. Does it recommend route adjustments? Does it help match equipment to load requirements? Does it flag potential delays? Does a person review the decision before it affects your freight? Practical carriers can answer without hiding behind buzzwords."
      ]],
      ["The driver is still central", [
        "The biggest mistake in the AI conversation is treating the driver as a secondary detail. The driver is still the person who inspects the equipment, communicates at the dock, handles the road, secures the load, and notices details that a dashboard cannot. Technology can support that work, but it cannot replace judgment on the ground.",
        "For shippers, that means the carrier's driver standards remain a core buying factor. Ask about hiring, training, safety expectations, communication habits, and equipment checks. A carrier with good software and weak field execution will still miss appointments. A carrier with disciplined drivers, honest dispatch, and useful technology has a much better chance of delivering consistently."
      ]],
      ["A practical way to evaluate the promise", [
        "AI should make a carrier easier to work with, not harder. You should see clearer ETAs, faster updates, better lane planning, fewer repeated problems, and cleaner communication when something changes. You should not have to chase five people for the status of a shipment. You should not get vague answers because a system said one thing and the driver saw another.",
        "The right standard is simple: does the technology help the carrier do what it said it would do? If the answer is yes, the tool has value. If the answer is no, it is decoration. Freight is still a trust business. The carriers that win with AI will be the ones that combine modern tools with the old disciplines that have always mattered: reliable equipment, trained drivers, direct communication, and accountability from pickup to delivery.",
        "For a shipper, the next step is not to demand a futuristic platform. It is to ask for a measurable service habit. Pick the lanes that matter most, agree on the updates you expect, review the problems that repeat, and see whether the carrier uses its tools to improve the next load. The useful carriers will welcome that conversation because it turns technology into performance instead of presentation. That is the point where AI stops sounding like a sales pitch and starts acting like a freight tool."
      ]]
    ],
  },
  {
    slug: "diesel-record-highs-2026",
    title: "Diesel Hit Record Highs in 2026 - How Shippers Can Protect Their Freight Budgets",
    category: "Industry News",
    date: "Jun 16, 2026",
    image: "assets/images/blog-diesel-prices.png",
    deck: "A geopolitics-driven fuel spike pushed U.S. diesel to record levels in 2026 and rippled straight into freight rates. Here's what's happening and how to keep your transportation budget under control.",
    sections: [
      ["Fuel is not a side issue", [
        "Diesel is one of the most direct cost inputs in trucking. When it moves quickly, transportation budgets feel it quickly. A shipper may not buy fuel directly, but every dry-van, refrigerated, regional, and over-the-road move depends on it. Fuel affects carrier operating cost, driver routing, surcharge tables, lane pricing, and the willingness of carriers to absorb last-minute changes.",
        "The mistake is treating a fuel spike as a temporary accounting problem. It is an operating problem too. A carrier facing volatile fuel costs has to make decisions about route discipline, empty miles, wait time, equipment utilization, and the loads it can accept profitably. Shippers who plan around those realities protect their budgets better than shippers who only negotiate harder after the invoice arrives."
      ]],
      ["Start with clean surcharge language", [
        "The first protection is clarity. Fuel surcharge language should be easy to understand before a load moves. Which index is used? How often is it updated? What baseline is assumed? Is the surcharge tied to loaded miles, all miles, or a flat lane structure? Are refrigerated loads handled differently because the unit has additional fuel requirements? When the rules are unclear, every market move creates friction.",
        "Clean surcharge language does not mean the lowest possible charge. It means both sides know how the charge is calculated. That matters because fuel swings can turn a good relationship into a dispute if the invoice feels surprising. A transparent structure lets shippers compare costs, forecast more accurately, and focus on the actual freight instead of arguing over math."
      ]],
      ["Reduce the miles that do not pay you back", [
        "The fastest way to waste money during a fuel spike is to create avoidable miles. Short-notice reroutes, unclear pickup instructions, missed appointment windows, incomplete delivery details, and poor dock coordination all add cost. Sometimes the extra miles are obvious. Other times the waste shows up as idle time, re-dispatching, or a driver sitting while a facility tries to locate the right paperwork.",
        "Shippers can lower exposure by tightening the handoff. Confirm addresses, appointment times, contact numbers, load requirements, temperature settings, reference numbers, and receiving instructions before the driver is dispatched. If a shipment has a narrow delivery window, communicate it early. If a facility has known delays, say so. A carrier can plan around hard information. It cannot plan around surprises."
      ]],
      ["Use committed lanes where volume supports it", [
        "Spot freight has a place, especially when demand is uneven. But when a shipper has recurring lanes, committed capacity can be more stable during fuel volatility. A carrier that understands the lane, the dock, the timing, and the freight profile can price the work with fewer unknowns. That can reduce the premium that comes from uncertainty.",
        "Committed does not have to mean complicated. It can start with a small set of reliable lanes, a clear weekly rhythm, and a carrier that is willing to review performance with you. The goal is not to lock yourself into a bad rate. The goal is to replace repeated emergency buying with predictable planning where the carrier can allocate equipment and drivers efficiently."
      ]],
      ["Look beyond the linehaul number", [
        "When fuel is high, the cheapest linehaul rate can become expensive if service failures create chargebacks, production delays, missed appointments, or emergency recoveries. A low number is not a complete budget strategy. Shippers should evaluate the total cost of the move: accessorial exposure, communication quality, equipment fit, delivery reliability, and the carrier's ability to handle exceptions.",
        "This is especially important for refrigerated freight. Temperature-controlled loads carry extra risk because a delay can threaten the product, not just the schedule. If the shipment requires a reefer unit, appointment precision and equipment condition matter as much as the rate. A carrier that prices responsibly and protects the load may cost less over the life of the relationship than a carrier that wins the quote and misses the execution."
      ]],
      ["Make the budget conversation ongoing", [
        "Fuel markets will keep moving. The shippers who handle that best make freight planning a regular conversation, not a crisis meeting. Review the lanes that are most exposed. Identify facilities where wait time is adding cost. Ask carriers where instructions are unclear. Compare planned miles against actual miles. Look for repeat problems rather than one-off explanations.",
        "A good carrier should be willing to talk through the operation in practical terms. The point is not to make fuel painless. The point is to make it manageable. Clear surcharge rules, better load information, committed lanes where they fit, and disciplined carrier selection give shippers more control when diesel prices are moving against them.",
        "The strongest transportation budgets are built before the market gets noisy. Keep lane history current, separate urgent freight from planned freight, and know which shipments need refrigerated equipment, team coordination, or tighter appointment control. That preparation gives your carrier fewer unknowns to price around. It also gives your internal team a clearer explanation when leadership asks why freight cost changed and what is being done to control it."
      ]]
    ],
  },
  {
    slug: "broker-liability-carrier-vetting",
    title: "The Supreme Court's Broker-Liability Ruling and the New Math of Carrier Vetting",
    category: "Safety & Compliance",
    date: "Jun 9, 2026",
    image: "assets/images/blog-broker-vetting.png",
    deck: "A 2026 Supreme Court decision reshaped how freight brokers and the shippers behind them vet carriers. Here's what changed and why a verifiable safety record now matters more than ever.",
    sections: [
      ["Carrier selection is now a boardroom issue", [
        "Carrier vetting used to feel like a back-office compliance task. In 2026, it belongs in the main freight conversation. Shippers, brokers, and logistics teams are looking harder at who actually moves the load, what authority that carrier holds, how safety performance is documented, and how quickly those facts can be verified. The legal details may be handled by counsel, but the operational lesson is clear: carrier selection cannot be casual.",
        "A shipment does not become safer because a name appears on a rate confirmation. Safety depends on the carrier's authority, equipment, drivers, operating habits, and communication discipline. The more complex the supply chain becomes, the more important it is to know which company is physically responsible for the freight and whether that company can show a real operating record."
      ]],
      ["What changed for shippers and brokers", [
        "The ruling sharpened attention on the steps taken before a load is tendered. Brokers and shippers are asking whether the carrier was properly authorized, whether safety data was checked, whether the carrier's insurance and operating profile matched the freight, and whether red flags were ignored. Even when legal responsibility is disputed, the business risk of weak vetting is obvious.",
        "That does not mean every shipper needs to become a federal safety analyst. It does mean the process should be documented, repeatable, and connected to reliable sources. If your team cannot explain how a carrier is approved, who checks authority, how often the information is refreshed, and what disqualifies a carrier, the process is too loose."
      ]],
      ["What a practical vetting process includes", [
        "A sound process starts with authority. Confirm the carrier's legal operating authority, USDOT number, MC number, and authorization type. Check that the company is authorized for the freight you are moving. Confirm insurance and make sure the coverage matches your cargo and lane requirements. Review safety status and look for patterns that would require deeper review.",
        "Then move from paperwork to operations. Does the carrier run the equipment needed for the load? Can it handle dry-van or refrigerated freight as required? Does it have drivers available for the lane, or is it accepting freight outside its real operating reach? How does dispatch communicate? Who handles exceptions after hours? The best vetting looks at both compliance and actual execution."
      ]],
      ["Why verifiable carriers matter", [
        "Verifiability is not just a defensive legal habit. It is a service habit. A carrier that can provide clear authority, safety information, contact details, equipment fit, and operating history is easier to trust because the facts are not hidden. That transparency gives shippers confidence before the load is on the road.",
        "It also helps when something goes wrong. Freight rarely moves in perfect conditions. Weather changes, facilities run late, traffic backs up, and urgent loads appear with little warning. When a carrier is legitimate, reachable, and operationally disciplined, those problems are easier to solve. When a carrier was selected only because a rate was cheap and a truck was available, small problems can become expensive ones."
      ]],
      ["Do not confuse speed with control", [
        "Modern freight often rewards speed. A broker or shipper may need capacity fast, especially for same-day, rush, or recovery freight. But fast does not have to mean careless. A good process should let a team move quickly while still checking the basics. That is the value of having standards before the emergency starts.",
        "A simple checklist can help: active authority, matching equipment, appropriate insurance, satisfactory safety posture, verified contacts, clear pickup and delivery instructions, and a documented decision when an exception is approved. The checklist will not eliminate every risk, but it raises the floor. It prevents the most avoidable mistake: handing a load to a carrier nobody has truly reviewed."
      ]],
      ["The Daats standard", [
        "Daats Companies was built around a straightforward promise: Service with Integrity. For shippers, that means working with a carrier whose authority can be checked, whose safety posture is part of the conversation, and whose team understands that freight decisions carry real consequences. USDOT 1724142 and MC-631896 are not decoration on a website. They are part of the public record shippers can use to verify who they are trusting.",
        "This article is not legal advice, and every company should work with its counsel on liability and compliance questions. But the operational direction is hard to miss. Treat carrier vetting as a core part of freight quality. Ask for facts. Keep records. Favor carriers that are transparent about their authority, equipment, safety, and communication. In the new math of carrier selection, the cheapest option is not always the least costly one.",
        "Shippers can make that standard practical by deciding what proof must be collected before a load is tendered. Keep the process simple enough that it can be followed under pressure, but serious enough that a rushed shipment does not bypass the basics. A strong carrier will not object to verification. It will understand that clear authority, clear contacts, and clear expectations protect everyone involved in the move."
      ]]
    ],
  },
];

const pageData = {
  about: {
    key: "about",
    file: "about.html",
    title: "About Daats Companies",
    headline: "Service with Integrity since 2007",
    image: "assets/images/home-fleet-row.png",
    copy: "Daats Companies is a full-service trucking carrier based in Dallas, Texas. We run dry-van and refrigerated freight with the same practical standard on every load: keep the equipment ready, communicate clearly, and deliver on schedule.",
    cards: [
      ["shield", "Built on accountability", "Our team treats freight promises as operating commitments, from dispatch through delivery."],
      ["truck", "Right-sized fleet", "Around 30 power units and professional drivers support local, regional, and over-the-road lanes."],
      ["pin", "Dallas-based reach", "Headquartered in Dallas with service across the lower 48 states."],
    ],
  },
  services: {
    key: "services",
    file: "services.html",
    title: "Trucking Services",
    headline: "Every kind of haul, one carrier",
    image: "assets/images/services-hero.png",
    copy: "From a single local run to coast-to-coast over-the-road freight, Daats covers it - dry-van and refrigerated, on your schedule.",
    cards: services,
  },
  industries: {
    key: "industries",
    file: "industries.html",
    title: "Industries Served",
    headline: "Built for the freight you move",
    image: "assets/images/industries-hero.png",
    heroMode: "contained",
    copy: "We haul across a range of industries, with equipment and handling matched to the load.",
    cards: industries,
  },
  coverage: {
    key: "coverage",
    file: "coverage.html",
    title: "Coverage",
    headline: "From the dock to the lower 48",
    image: "assets/images/coverage-hero.png",
    heroMode: "contained",
    copy: "One carrier across every distance - pickup down the street or a load that crosses the country. Headquartered in Dallas, Texas, running coast to coast.",
    cards: coverage,
  },
  safety: {
    key: "safety",
    file: "safety.html",
    title: "Safety",
    headline: "Credentials you can check yourself",
    image: "assets/images/safety-hero.png",
    heroMode: "contained",
    copy: "We back Service with Integrity with authority and a safety record that's a matter of public record - not marketing claims.",
    cards: credentials,
  },
};

function icon(name) {
  const paths = {
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 2v4M16 2v4M3 10h18"></path><circle cx="12" cy="15" r="2"></circle>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle>',
    truck: '<path d="M10 17h4V5H2v12h3"></path><path d="M14 8h4l4 4v5h-3"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle>',
    box: '<path d="m21 8-9-5-9 5 9 5 9-5Z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path>',
    bolt: '<path d="m13 2-9 13h7l-1 7 9-13h-7l1-7Z"></path>',
    clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><path d="m9 12 2 2 4-5"></path>',
    snow: '<path d="M12 2v20M4 6l16 12M20 6 4 18"></path>',
    boxes: '<path d="M7 7h10v10H7z"></path><path d="M3 11h4v8H3zM17 11h4v8h-4z"></path>',
    cart: '<circle cx="9" cy="20" r="1"></circle><circle cx="17" cy="20" r="1"></circle><path d="M3 4h2l3 12h10l3-8H7"></path>',
    car: '<path d="M5 17h14l-1-5-3-4H9l-3 4-1 5Z"></path><circle cx="8" cy="17" r="2"></circle><circle cx="16" cy="17" r="2"></circle>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"></path>',
    factory: '<path d="M3 21h18V9l-6 4V9l-6 4V5H3v16Z"></path>',
    pill: '<path d="M10 21a7 7 0 0 1-5-12l4-4a7 7 0 0 1 10 10l-4 4a7 7 0 0 1-5 2Z"></path><path d="m8 8 8 8"></path>',
    badge: '<path d="M12 3 4 7v6c0 5 8 8 8 8s8-3 8-8V7l-8-4Z"></path><path d="m9 12 2 2 4-4"></path>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"></path>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path>',
    printer: '<path d="M6 9V3h12v6"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 14h12v8H6z"></path>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.box}</svg>`;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pathTo(file, depth) {
  if (file.startsWith("http") || file.startsWith("mailto:") || file.startsWith("tel:")) return file;
  return `${"../".repeat(depth)}${file}`;
}

function brand(depth = 0) {
  return `<a class="brand" href="${pathTo("index.html", depth)}" aria-label="Daats Companies home"><img class="brand-mark" src="${pathTo("assets/images/daats-logo-mark-transparent.png", depth)}" alt="" aria-hidden="true"><span class="brand-text"><strong>DAATS</strong><small>COMPANIES</small></span></a>`;
}

function header(current, depth = 0) {
  const links = nav.map(([label, href, external]) => {
    const isCurrent = href === current;
    const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${pathTo(href, depth)}"${target}${isCurrent ? ' aria-current="page"' : ""}>${label}</a>`;
  }).join("");
  return `<header class="site-header"><div class="container header-inner">${brand(depth)}<button class="nav-toggle" type="button" data-nav-toggle aria-label="Open navigation" aria-expanded="false"><span></span></button><nav class="site-nav" data-nav>${links}</nav><div class="header-actions"><a class="phone-link" href="tel:+19725604040">${icon("phone")} 972-560-4040</a><a class="button primary compact" href="${quoteUrl}">Request a Quote</a></div></div></header>`;
}

function siteLoader(depth = 0) {
  return `<div class="site-loader" data-site-loader hidden><div class="site-loader-inner" aria-hidden="true"><p class="site-loader-lockup" data-loader-lockup>DAATS<span>COMPANIES</span></p><div class="site-loader-orbit"><div class="site-loader-ring site-loader-ring-outer"></div><div class="site-loader-ring site-loader-ring-mid"></div><div class="site-loader-mark" data-loader-mark><img src="${pathTo("assets/images/daats-logo-mark-transparent.png", depth)}" alt="" aria-hidden="true"></div></div><p class="site-loader-percent" data-loader-percent>0%</p></div></div>`;
}

function footer(depth = 0) {
  return `<footer class="site-footer" id="contact"><div class="container footer-grid"><div class="footer-brand">${brand(depth)}<p>Full-service trucking out of Dallas, Texas. Dry-van and refrigerated freight, delivered with Service with Integrity.</p><div class="authority">USDOT <strong>1724142</strong><br>MC <strong>631896</strong></div></div><nav class="footer-col" aria-label="Services"><h3>Services</h3><ul>${services.map(([, title]) => `<li><a href="${pathTo("services.html", depth)}#${slug(title)}">${title}</a></li>`).join("")}</ul></nav><nav class="footer-col" aria-label="Company"><h3>Company</h3><ul><li><a href="${pathTo("about.html", depth)}">About</a></li><li><a href="${pathTo("services.html", depth)}">Services</a></li><li><a href="${pathTo("industries.html", depth)}">Industries</a></li><li><a href="${pathTo("coverage.html", depth)}">Coverage</a></li><li><a href="${pathTo("safety.html", depth)}">Safety</a></li><li><a href="${careersUrl}" target="_blank" rel="noopener noreferrer">Apply</a></li><li><a href="${pathTo("blog.html", depth)}">Blog</a></li><li><a href="${careersUrl}" target="_blank" rel="noopener noreferrer">Driver Application</a></li></ul></nav><div class="footer-col"><h3>Contact</h3><ul><li class="contact-row">${icon("pin")}<span>2665 Villa Creek Dr., Suite 115<br>Dallas, TX 75234</span></li><li class="contact-row">${icon("phone")}<span><a href="tel:+19725604040">972-560-4040</a> (main)<br><a href="tel:+19725604041">972-560-4041</a> (dispatch)</span></li><li class="contact-row">${icon("printer")}<span>972-560-4045 (fax)</span></li><li class="contact-row">${icon("mail")}<span><a href="mailto:info@daatscompanies.com">info@daatscompanies.com</a><br><a href="mailto:dispatch@daatscompanies.com">dispatch@daatscompanies.com</a></span></li></ul></div></div><div class="container footer-bottom"><p>&copy; 2026 Daats Companies, Inc. All rights reserved.</p><p class="footer-tagline">SERVICE WITH INTEGRITY</p></div></footer>`;
}

function layout({ title, current, body, depth = 0, description = "Daats Companies is a full-service trucking and logistics carrier based in Dallas, TX." }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | Daats Companies</title>
  <meta name="description" content="${esc(description)}">
  <link rel="stylesheet" href="${pathTo("assets/site.css", depth)}">
  <script defer src="${pathTo("assets/site.js", depth)}"></script>
</head>
<body>
  <div class="site-shell">
    ${siteLoader(depth)}
    ${header(current, depth)}
    ${body}
    ${footer(depth)}
  </div>
</body>
</html>`;
}

function slug(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function cards(items, extra = "") {
  return `<div class="card-grid ${extra}">${items.map(([ic, title, text]) => `<article class="service-card" id="${slug(title)}"><span class="card-icon">${icon(ic)}</span><h3>${esc(title)}</h3><p>${esc(text)}</p><a class="card-link" href="#contact">Learn more -></a></article>`).join("")}</div>`;
}

function dieselSection() {
  const headings = dieselTable.columns.map((column) => `<th>${esc(column)}</th>`).join("");
  const rows = dieselTable.rows.map((row, index) => {
    const cells = row.map((cell, cellIndex) => {
      const tag = cellIndex === 0 ? "th" : "td";
      const scope = cellIndex === 0 ? ' scope="row"' : "";
      const cls = cellIndex > 0 && cell.startsWith("+") ? ' class="is-up"' : "";
      return `<${tag}${scope}${cls}>${esc(cell)}</${tag}>`;
    }).join("");
    const extraClass = index === 0 ? " diesel-row-highlight" : "";
    return `<tr class="${extraClass.trim()}">${cells}</tr>`;
  }).join("");

  return `<section class="section diesel-section" id="diesel-prices"><div class="container"><div class="section-head diesel-head"><div class="section-copy"><h2>Weekly diesel prices</h2><p>Current U.S. on-highway diesel pricing from the latest EIA release.</p></div><a class="button compact" href="${dieselTable.sourceUrl}" target="_blank" rel="noopener noreferrer">View EIA source -></a></div><div class="diesel-shell"><div class="diesel-topbar"><h3>Diesel Fuel Price</h3><p class="diesel-release-line">Diesel Fuel Release Date: ${dieselTable.releaseDate} | Next Release Date: ${dieselTable.nextReleaseDate}</p></div><div class="diesel-table-wrap"><table class="diesel-table"><thead><tr>${headings}</tr></thead><tbody>${rows}</tbody></table></div><p class="diesel-source">Source: <a href="${dieselTable.sourceUrl}" target="_blank" rel="noopener noreferrer">U.S. Energy Information Administration</a> (${dieselTable.releaseDate})</p></div></div></section>`;
}

function pageHero(page) {
  const heroClasses = ["page-hero", `page-hero-${page.key}`];
  if (page.heroMode === "contained") heroClasses.push("page-hero-contained");

  const media = page.heroMode === "contained"
    ? `<img class="page-hero-art" src="${page.image}" alt="">`
    : `<div class="hero-bg" style="background-image:url('${page.image}')"></div>`;

  return `<section class="${heroClasses.join(" ")}">${media}<div class="container hero-content"><p class="eyebrow">Service with Integrity</p><h1>${esc(page.headline)}</h1><p class="lead">${esc(page.copy)}</p><div class="hero-actions"><a class="button primary" href="${quoteUrl}">Request a Quote -></a><a class="button" href="#contact">Contact Us</a></div></div></section>`;
}

function categoryPage(key) {
  const page = pageData[key];
  const body = `${pageHero(page)}<main><section class="section"><div class="container"><div class="section-head"><div class="section-copy"><h2>${esc(page.headline)}</h2><p>${esc(page.copy)}</p></div></div>${cards(page.cards, page.cards.length === 4 ? "two" : "")}</div></section>${cta()}</main>`;
  write(page.file, layout({ title: page.title, current: page.file, body }));
}

function homePage() {
  const blogCards = articles.map((article) => blogCard(article, 0)).join("");
  const body = `<main><section class="hero"><div class="hero-media"><img class="hero-art flip-horizontal" src="assets/images/home-hero-dock.png" alt="Daats truck at a loading dock"></div><div class="container hero-content"><p class="eyebrow">Service with Integrity - Since 2007</p><h1>Freight that moves <span class="accent">on your schedule.</span></h1><p class="lead">Daats Companies is a full-service trucking carrier out of Dallas, Texas - dry-van and refrigerated freight delivered safely and on time, from local runs to nationwide over-the-road.</p><div class="hero-actions"><a class="button primary" href="${quoteUrl}">Request a Quote -></a><a class="button" href="#contact">Contact Us</a></div><div class="hero-meta"><span>USDOT 1724142</span><span>/</span><span>MC-631896</span><span>/</span><span>Dry-van & refrigerated</span><span>/</span><span>Lower 48 states</span></div></div></section><section class="stats container"><div><div class="stat-value">2007</div><p class="stat-label">Operating since</p></div><div><div class="stat-value">3.8M+</div><p class="stat-label">Miles driven in 2024</p></div><div><div class="stat-value">48</div><p class="stat-label">States served (lower 48)</p></div><div><div class="stat-value">99%</div><p class="stat-label">On-time delivery rate</p></div></section><section class="section"><div class="container"><div class="section-head"><div class="section-copy"><h2>Every kind of<br>haul, one carrier</h2><p>From a single local run to coast-to-coast over-the-road freight, Daats covers it - dry-van and refrigerated, on your schedule.</p></div><a class="button compact" href="services.html">All services -></a></div>${cards(services)}</div></section><section class="section"><div class="container"><div class="section-copy"><h2>Why shippers<br>stay with Daats</h2><p>Over 17 years of moving freight has taught us what shippers actually need: equipment that fits the load, drivers who show up, and a team that does what it says.</p></div><div class="feature-grid">${features.map(([ic, title, text]) => `<article class="feature-item" tabindex="0"><span class="card-icon">${icon(ic)}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></article>`).join("")}</div></div></section><section class="section"><div class="container split"><div class="section-copy"><h2>A modern fleet,<br>matched to the load</h2><p>Whether your freight rides dry or cold, Daats runs the right equipment and the drivers to handle it - kept road-ready and compliant so your shipment arrives the way it left.</p><ul class="check-list"><li><span class="check-icon">${icon("shield")}</span>Dry-van trailers for general and palletized freight</li><li><span class="check-icon">${icon("shield")}</span>Refrigerated (reefer) units for temperature-controlled loads</li><li><span class="check-icon">${icon("shield")}</span>Around 30 power units and 30 professional drivers</li><li><span class="check-icon">${icon("shield")}</span>Regularly maintained, DOT-compliant equipment</li></ul></div><div class="media-frame"><img src="assets/images/home-fleet-row.png" alt="Daats fleet lined up outside a freight facility"></div></div></section><section class="section"><div class="container"><div class="section-copy"><h2>From the dock<br>to the lower 48</h2><p>One carrier across every distance - pickup down the street or a load that crosses the country. Headquartered in Dallas, Texas, running coast to coast.</p></div>${cards(coverage)}</div></section><section class="section"><div class="container"><div class="section-copy"><h2>Built for the<br>freight you move</h2><p>We haul across a range of industries, with equipment and handling matched to the load.</p></div>${cards(industries)}</div></section><section class="section"><div class="container"><div class="section-copy"><h2>Credentials you<br>can check yourself</h2><p>We back Service with Integrity with authority and a safety record that's a matter of public record - not marketing claims.</p></div>${cards(credentials, "two")}</div></section>${dieselSection()}<section class="section"><div class="container"><div class="section-head"><div class="section-copy"><h2>Insights from the road</h2><p>Practical freight and logistics guidance for shippers - from choosing equipment to planning lanes across the lower 48.</p></div><a class="button compact" href="blog.html">All posts -></a></div><div class="blog-grid">${blogCards}</div></div></section>${cta()}</main>`;
  write("index.html", layout({ title: "Full-Service Trucking Carrier", current: "index.html", body }));
}

function blogCard(article, depth) {
  return `<a class="blog-card" href="${pathTo(`blog/${article.slug}.html`, depth)}"><img src="${pathTo(article.image, depth)}" alt="${esc(article.title)}"><div class="blog-card-body"><p class="meta category">${esc(article.category)}</p><h3>${esc(article.title)}</h3><p>${esc(article.deck)}</p><p class="meta">${article.date.toUpperCase()} - 4 MIN READ</p></div></a>`;
}

function blogIndex() {
  const body = `<main><section class="section"><div class="container"><div class="section-head"><div class="section-copy"><h1>Insights from the road</h1><p>Practical freight and logistics guidance for shippers - from choosing equipment to planning lanes across the lower 48.</p></div></div><div class="blog-grid">${articles.map((article) => blogCard(article, 0)).join("")}</div></div></section>${cta()}</main>`;
  write("blog.html", layout({ title: "Blog", current: "blog.html", body }));
}

function articleBreadcrumbs(article) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="../blog.html">Blog</a><span>/</span><span aria-current="page">${esc(article.title)}</span></nav>`;
}

function articlePagination(index) {
  const previous = articles[index - 1];
  const next = articles[index + 1];
  const previousHref = previous ? `../blog/${previous.slug}.html` : "../blog.html";
  const nextHref = next ? `../blog/${next.slug}.html` : "../blog.html";
  const previousLabel = previous ? previous.title : "Back to blog";
  const nextLabel = next ? next.title : "Back to blog";

  return `<div class="article-pagination"><a class="button article-nav article-nav-prev" href="${previousHref}"><span>Previous</span><strong>${esc(previousLabel)}</strong></a><a class="button primary article-nav article-nav-next" href="${nextHref}"><span>Next</span><strong>${esc(nextLabel)}</strong></a></div>`;
}

function articlePage(article, index) {
  const body = `<main><section class="article-header"><div class="container">${articleBreadcrumbs(article)}<p class="meta category">${esc(article.category)}</p><h1>${esc(article.title)}</h1><p class="article-deck">${esc(article.deck)}</p><p class="meta">${article.date.toUpperCase()} - 4 MIN READ</p></div></section><div class="container article-hero-image"><img src="${pathTo(article.image, 1)}" alt="${esc(article.title)}"></div><article class="article-body">${article.sections.map(([heading, paragraphs]) => `<h2>${esc(heading)}</h2>${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}`).join("")}</article><div class="container">${articlePagination(index)}</div>${cta(1)}</main>`;
  write(`blog/${article.slug}.html`, layout({ title: article.title, current: "blog.html", body, depth: 1, description: article.deck }));
}

function cta(depth = 0) {
  return `<section class="cta-band"><div class="cta-bg" style="background-image:url('${pathTo("assets/images/home-cta-road.png", depth)}')"></div><div class="container cta-content"><div><h2>Ready to move<br>your freight?</h2><p>Tell us your lanes, your timing, and what you're shipping. We'll get you a straight answer fast.</p><div class="cta-actions"><a class="button primary" href="${quoteUrl}">Request a Quote -></a><a class="button" href="tel:+19725604040">${icon("phone")} 972-560-4040</a></div></div></div></section>`;
}

function write(file, html) {
  const target = join(root, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

homePage();
for (const key of Object.keys(pageData)) categoryPage(key);
blogIndex();
for (const [index, article] of articles.entries()) articlePage(article, index);
