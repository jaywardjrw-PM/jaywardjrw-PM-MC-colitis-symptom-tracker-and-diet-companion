/**
 * data.js
 * Lymphocytic Colitis Companion — Food Reference Data
 *
 * Three-tier system:
 *   "safe"    — confirmed safe in post-flare recovery phase (weeks 1–6)
 *   "caution" — reasonable to try but individual tolerance varies; introduce one at a time
 *   "avoid"   — hard stops during recovery, with clinical reason
 *
 * Every "safe" food that requires specific preparation includes a required `prep` field.
 * Prep notes are not optional guidance — they are part of the safety classification.
 * A food listed as "safe" is only safe when prepared as specified.
 *
 * Sources: Microscopic Colitis Foundation dietary guidelines, Cleveland Clinic,
 * Crohn's & Colitis Dietitians, IBD Anti-Inflammatory Diet (UMass), peer-reviewed
 * case literature on lymphocytic colitis dietary triggers. Verified June 2026.
 *
 * IMPORTANT: This data is a personal dietary reference, not medical advice.
 * The patient should review this list with their gastroenterologist.
 */

export const APP_META = {
  diagnosisLabel: "Lymphocytic colitis",
  diagnosisNote:
    "Lymphocytic colitis is a subtype of microscopic colitis. Your doctor may use either term — both refer to the same condition.",
  recoveryPhases: [
    {
      id: "repair",
      label: "Mucosal repair",
      weeks: "Weeks 1–6",
      description:
        "Stick to safe foods only. No reintroduction of caution foods yet. Focus on soluble fiber, lean protein, and hydration.",
    },
    {
      id: "reintroduction",
      label: "Careful reintroduction",
      weeks: "Week 6+",
      description:
        "Once symptoms have been stable for at least 2 weeks, begin adding caution foods one at a time. Wait 3 days between each new food. Track every addition in your diary.",
    },
  ],
  disclaimer:
    "This app is a personal dietary reference tool, not medical advice. Always consult your gastroenterologist before making changes to your diet or medications.",
  dataAuditDate: "2026-06",
};

/**
 * CATEGORIES
 * Used for filtering in the food guide screen.
 */
export const CATEGORIES = [
  { id: "protein", label: "Proteins" },
  { id: "starch", label: "Starches & grains" },
  { id: "vegetable", label: "Vegetables" },
  { id: "fruit", label: "Fruits" },
  { id: "fat", label: "Fats & oils" },
  { id: "drink", label: "Drinks" },
  { id: "snack", label: "Snacks" },
  { id: "seasoning", label: "Seasonings" },
];

/**
 * FOODS
 * Each entry:
 *   id        — unique string key
 *   name      — display name
 *   tier      — "safe" | "caution" | "avoid"
 *   category  — matches a CATEGORIES id
 *   prep      — (safe/caution only) required or recommended preparation method
 *               REQUIRED for any food where preparation affects safety classification
 *   reason    — plain-language explanation of why this tier applies
 *   cautionNote — (caution only) specific thing to watch for when testing
 *   avoidUntil — (some caution items) approximate timeframe before retesting
 */
export const FOODS = [

  // ─── SAFE — PROTEINS ────────────────────────────────────────────────────────

  {
    id: "chicken-breast",
    name: "Chicken breast",
    tier: "safe",
    category: "protein",
    prep: "Bake, poach, or boil. Remove all skin and visible fat before cooking. No marinades, sauces, or seasoning beyond salt.",
    reason:
      "Lean protein supports mucosal repair after a flare. White meat chicken is low in saturated fat and easy to digest when plainly cooked.",
  },
  {
    id: "turkey-breast",
    name: "Turkey breast",
    tier: "safe",
    category: "protein",
    prep: "Bake, poach, or boil. Remove all skin and visible fat. No processed deli turkey — fresh only, no additives.",
    reason:
      "Same lean protein profile as chicken. Deli/processed versions contain additives, preservatives, and sodium that can irritate the gut lining.",
  },
  {
    id: "eggs-whole",
    name: "Eggs (whole)",
    tier: "safe",
    category: "protein",
    prep: "Scramble in a dry non-stick pan or with a minimal drizzle of olive oil. Poached is also well tolerated. No butter, cream, or milk added.",
    reason:
      "Eggs are one of the most easily digested complete protein sources. The fat content is low and the yolk provides B12 and choline, which support gut lining integrity.",
  },
  {
    id: "egg-whites",
    name: "Egg whites",
    tier: "safe",
    category: "protein",
    prep: "Scramble or poach. Use if whole eggs cause bloating — egg whites have essentially zero fat.",
    reason:
      "Pure protein with no fat. A useful alternative if the fat in whole eggs triggers symptoms during early recovery.",
  },
  {
    id: "canned-tuna",
    name: "Canned tuna (light, in water)",
    tier: "safe",
    category: "protein",
    prep: "Drain thoroughly. Eat plain or with a small drizzle of olive oil and lemon juice. No mayonnaise, no oil-packed versions.",
    reason:
      "Low-fat protein source. Light tuna (skipjack) is lower in mercury than albacore. Oil-packed versions add fat that may worsen symptoms.",
  },
  {
    id: "salmon",
    name: "Salmon",
    tier: "safe",
    category: "protein",
    prep: "Bake at 375°F (190°C) with lemon juice and a drizzle of olive oil. No butter, cream sauces, or heavy seasoning. No pan-frying.",
    reason:
      "Rich in omega-3 fatty acids (EPA and DHA), which have documented anti-inflammatory effects in IBD. The fat in salmon is unsaturated — the type that helps rather than harms colonic inflammation.",
  },
  {
    id: "sardines",
    name: "Sardines (in water)",
    tier: "safe",
    category: "protein",
    prep: "Drain. Eat as-is or mash onto plain white toast. Water-packed only — oil-packed adds excess fat.",
    reason:
      "High omega-3 content comparable to salmon. One of the most anti-inflammatory protein options available. Water-packed keeps fat load low.",
  },
  {
    id: "cod-white-fish",
    name: "White fish (cod, tilapia, haddock)",
    tier: "safe",
    category: "protein",
    prep: "Bake or poach. No breading, no frying, no sauces. Salt and lemon only.",
    reason:
      "Very low fat, mild-flavored, easy to digest. Good protein variety when salmon and tuna feel repetitive.",
  },
  {
    id: "tofu-firm",
    name: "Firm tofu",
    tier: "safe",
    category: "protein",
    prep: "Steam or very lightly pan-cook in a dry non-stick pan. No oil, no soy sauce, no spice-heavy marinades. Start with a small portion (85g / 3oz) to confirm tolerance.",
    reason:
      "Plant-based complete protein. Most people with lymphocytic colitis tolerate tofu well. Introduce in moderate portions initially as soy affects a small subset of people.",
  },

  // ─── SAFE — STARCHES & GRAINS ────────────────────────────────────────────────

  {
    id: "white-rice",
    name: "White rice",
    tier: "safe",
    category: "starch",
    prep: "Cook in water (not broth with additives). For maximum benefit: cook, spread on a tray, cool in the fridge for at least 4 hours or overnight, then reheat before eating. This cooling process increases resistant starch content, which feeds beneficial gut bacteria without accelerating motility.",
    reason:
      "The single most universally tolerated starch for gut conditions. Low fiber, low residue. The resistant starch formed during cooling acts as a prebiotic that supports microbiome recovery.",
  },
  {
    id: "white-rice-cakes",
    name: "Plain white rice cakes",
    tier: "safe",
    category: "snack",
    prep: "Plain only — no flavoring, no seasoning, no chocolate coating. Check label for additives.",
    reason:
      "Convenient low-fiber snack. Useful for small frequent meals. Read labels carefully — flavored varieties often contain artificial flavors or sweeteners.",
  },
  {
    id: "white-bread-toast",
    name: "White bread / plain toast",
    tier: "safe",
    category: "starch",
    prep: "Plain or toasted. No butter. A thin drizzle of olive oil is acceptable. No seeds, grains, or wholemeal varieties — white only during recovery phase.",
    reason:
      "Low insoluble fiber, easy to digest. Whole grain or seeded breads contain insoluble fiber that worsens loose stools during recovery.",
  },
  {
    id: "white-pasta",
    name: "White pasta",
    tier: "safe",
    category: "starch",
    prep: "Boil until soft (not al dente — softer is better for gut transit). Dress with olive oil and salt only. No cream sauces, no tomato-heavy sauces, no cheese.",
    reason:
      "Low-residue, easily digested carbohydrate. Al dente pasta has more resistant starch but also more texture that can be harder to digest during recovery — cook it soft.",
  },
  {
    id: "rolled-oats",
    name: "Rolled oats / instant oats",
    tier: "safe",
    category: "starch",
    prep: "Cook in water, not milk. Use rolled oats or instant oats only — NOT steel-cut oats. Steel-cut oats are less processed, retain more insoluble fiber, and are harder to digest. Cook thoroughly until soft.",
    reason:
      "Rich in beta-glucan, a soluble fiber that forms a gel in the gut, slowing transit and bulking stool. Also supports butyrate production — a key compound for colon wall repair. One of the most clinically recommended foods for microscopic colitis recovery.",
  },
  {
    id: "oat-bran",
    name: "Oat bran",
    tier: "safe",
    category: "starch",
    prep: "Cook in water until fully soft. Start with 2 tablespoons per serving. Can be stirred into oatmeal or eaten alone with water.",
    reason:
      "Higher soluble fiber concentration than rolled oats. Specifically recommended for microscopic colitis by IBD dietitians for its stool-bulking and butyrate-producing properties.",
  },
  {
    id: "potato-boiled",
    name: "Potato (white or yellow)",
    tier: "safe",
    category: "starch",
    prep: "Peel before cooking. Boil or bake (no skin). Mash plain with a small amount of olive oil — no butter, no cream, no milk. Cook, cool in fridge, then reheat to increase resistant starch.",
    reason:
      "Easily digested starch. The skin contains insoluble fiber — peel it. Same cooling principle as rice applies: resistant starch formed during cooling feeds beneficial bacteria.",
  },
  {
    id: "sweet-potato",
    name: "Sweet potato",
    tier: "safe",
    category: "starch",
    prep: "Peel before cooking. Boil until very soft, or bake. No skin. No butter or cream. Mash plain or eat as-is.",
    reason:
      "Nutritionally denser than white potato — good source of beta-carotene and potassium (important for electrolyte balance during recovery). Low insoluble fiber when peeled.",
  },
  {
    id: "saltine-crackers",
    name: "Plain saltine crackers",
    tier: "safe",
    category: "snack",
    prep: "Plain saltines only. Read labels — avoid versions with added seeds, whole grain, or artificial flavors. Check for any artificial sweeteners.",
    reason:
      "Low-fiber, easily digested snack. Useful for small meals when appetite is poor. Classic transitional food from liquid diet back to solids.",
  },

  // ─── SAFE — VEGETABLES ───────────────────────────────────────────────────────

  {
    id: "carrots",
    name: "Carrots",
    tier: "safe",
    category: "vegetable",
    prep: "PEEL first (removes insoluble fiber from skin). Then steam or boil until fork-tender — they should be completely soft, not crunchy at all. Do not eat raw under any circumstances during recovery.",
    reason:
      "Carrots are listed as well-tolerated in microscopic colitis guidelines specifically when peeled and overcooked. Raw carrots are a hard avoid — the insoluble fiber and roughage directly worsen loose stools. Peeling is not optional.",
  },
  {
    id: "zucchini",
    name: "Zucchini / courgette",
    tier: "safe",
    category: "vegetable",
    prep: "Peel or leave skin on (zucchini skin is thin and soft when cooked). Steam or boil until completely soft. No roasting — dry heat concentrates fiber. No raw.",
    reason:
      "One of the most easily tolerated vegetables for inflamed guts. Low fiber, high water content, soft texture when cooked. Well supported in MC dietary guidelines.",
  },
  {
    id: "butternut-squash",
    name: "Butternut squash",
    tier: "safe",
    category: "vegetable",
    prep: "Peel, remove seeds, cube. Steam, boil, or bake until very soft. Mash or eat as soft chunks. No roasting until crispy edges. No skin.",
    reason:
      "Consistently listed as well-tolerated in microscopic colitis guidelines. Soft texture when cooked, low insoluble fiber, nutritionally dense (vitamin A, potassium).",
  },
  {
    id: "green-beans",
    name: "Green beans",
    tier: "safe",
    category: "vegetable",
    prep: "Trim ends. Steam or boil until very soft — well past the point of any snap or crunch. Do not eat raw or lightly steamed (al dente).",
    reason:
      "Specifically named as well-tolerated in the Microscopic Colitis Foundation guidelines when overcooked. The key is removing all firmness — undercooked green beans have significant insoluble fiber.",
  },
  {
    id: "spinach-cooked",
    name: "Spinach (cooked)",
    tier: "safe",
    category: "vegetable",
    prep: "Sauté in a dry pan until fully wilted, or add to soups and cook down completely. Never eat raw spinach — it is high in insoluble fiber in raw form. Blending cooked spinach into soups is ideal.",
    reason:
      "When fully cooked, spinach collapses to a soft, low-residue form. Rich in folate and iron, which are often depleted after a flare. Raw spinach has enough insoluble fiber to worsen symptoms.",
  },

  // ─── SAFE — FRUITS ───────────────────────────────────────────────────────────

  {
    id: "banana-ripe",
    name: "Banana (ripe)",
    tier: "safe",
    category: "fruit",
    prep: "Eat as-is. Ripe bananas (yellow with a few spots) are easiest to digest. Slightly green bananas contain more resistant starch, which is beneficial for stool consistency — either ripeness is acceptable. Limit to 1 per day to stay within personal fiber tolerance.",
    reason:
      "The only raw fruit confirmed safe in microscopic colitis guidelines. Low insoluble fiber, low residue, provides potassium for electrolyte replenishment. The resistant starch in slightly green bananas slows gut transit, which is beneficial for loose stools.",
  },
  {
    id: "applesauce",
    name: "Applesauce (unsweetened)",
    tier: "safe",
    category: "fruit",
    prep: "Unsweetened only — no added sugar, no artificial sweeteners, no cinnamon blends that contain added spices. Check label carefully. Store-bought plain applesauce is fine.",
    reason:
      "Cooked-down fruit with low insoluble fiber and no skin residue. Provides pectin (a soluble fiber) which can help firm loose stools. Do not eat raw apples — the skin and fiber are too high for recovery phase.",
  },

  // ─── SAFE — FATS & OILS ──────────────────────────────────────────────────────

  {
    id: "olive-oil",
    name: "Olive oil (extra virgin)",
    tier: "safe",
    category: "fat",
    prep: "Use as a drizzle only — approximately 1 teaspoon per meal. Do not use for frying or high-heat cooking. Best used as a light dressing over cooked food or added to pasta.",
    reason:
      "Monounsaturated fat with documented anti-inflammatory properties in IBD research. The American Gastroenterological Association specifically recommends olive oil as the preferred fat source. Avoids the saturated fat that triggers gut microbiome disruption.",
  },

  // ─── SAFE — DRINKS ───────────────────────────────────────────────────────────

  {
    id: "water",
    name: "Plain water",
    tier: "safe",
    category: "drink",
    prep: "Primary drink. Aim for 8–10 glasses per day. Room temperature or slightly warm is easier on an inflamed gut than very cold water.",
    reason:
      "Hydration is critical during recovery. Loose stools cause ongoing fluid and electrolyte loss even when not in active flare.",
  },
  {
    id: "bone-broth",
    name: "Bone broth (plain)",
    tier: "safe",
    category: "drink",
    prep: "Low-sodium versions preferred. Plain only — no onion powder, garlic powder (high FODMAP), or spice blends. Sip warm. Homemade or store-bought with a simple ingredient list.",
    reason:
      "Provides electrolytes (sodium, potassium), collagen precursors that support gut lining integrity, and is gentle on digestion. Useful warm drink replacement for coffee.",
  },
  {
    id: "ginger-tea",
    name: "Ginger tea",
    tier: "safe",
    category: "drink",
    prep: "Plain ginger tea — brewed from fresh ginger slices or a pure ginger tea bag. No added sweeteners. Steep fresh ginger in hot water for 5–10 minutes.",
    reason:
      "Has documented anti-nausea and anti-inflammatory properties. Ginger reduces intestinal spasm and calms motility — the opposite of coffee. Widely used in IBD dietary protocols as a safe warm drink replacement.",
  },
  {
    id: "chamomile-tea",
    name: "Chamomile tea",
    tier: "safe",
    category: "drink",
    prep: "Pure chamomile tea bag or loose chamomile flowers. No blends with added ingredients. No sweeteners.",
    reason:
      "Calming to gut motility, mildly anti-inflammatory. Does not stimulate the gastrocolic reflex. Safe warm drink for morning and evening.",
  },
  {
    id: "coconut-water",
    name: "Coconut water (unsweetened)",
    tier: "safe",
    category: "drink",
    prep: "Unsweetened, plain only. No added sugars, no flavored varieties. Check label for any additives. Drink in moderate amounts — not unlimited, due to natural sugar content.",
    reason:
      "Natural source of potassium and electrolytes without the sugar load of sports drinks. Better than plain water for electrolyte replenishment after loose stools.",
  },

  // ─── SAFE — SEASONINGS ───────────────────────────────────────────────────────

  {
    id: "salt",
    name: "Salt (plain)",
    tier: "safe",
    category: "seasoning",
    prep: "Plain sea salt or table salt. Use in normal cooking amounts.",
    reason: "Essential for electrolyte balance, especially during recovery when sodium is lost through loose stools.",
  },
  {
    id: "lemon-juice",
    name: "Lemon juice (fresh or bottled)",
    tier: "safe",
    category: "seasoning",
    prep: "Squeeze of fresh lemon or plain bottled lemon juice. No lemon-flavored products with added ingredients.",
    reason: "Mild acidulant that brightens food without stimulating gut motility. Provides vitamin C.",
  },
  {
    id: "ginger-ground",
    name: "Ground ginger",
    tier: "safe",
    category: "seasoning",
    prep: "Small pinch in cooking. Anti-inflammatory.",
    reason: "Dried ginger retains anti-inflammatory properties. Useful for flavoring oatmeal or cooked dishes.",
  },
  {
    id: "turmeric",
    name: "Turmeric (ground)",
    tier: "safe",
    category: "seasoning",
    prep: "Small amount (¼ tsp) in cooking. Add a tiny pinch of black pepper alongside — it dramatically increases curcumin absorption.",
    reason:
      "Curcumin (the active compound in turmeric) has well-documented anti-inflammatory effects and is specifically recommended in IBD dietary protocols. Combine with black pepper for bioavailability.",
  },

  // ─── CAUTION ─────────────────────────────────────────────────────────────────

  {
    id: "avocado",
    name: "Avocado",
    tier: "caution",
    category: "fat",
    prep: "Start with ¼ of a medium avocado. Eat plain or mashed. No guacamole with raw onion, garlic, or lime in large quantities.",
    reason:
      "A recommended soluble fiber and healthy fat source in IBD guidelines. However, the fat load — even though it is monounsaturated — can be too much for some people in early recovery. Test tolerance with a small portion first.",
    cautionNote: "If you notice increased bloating or loose stools within 4 hours of eating avocado, remove it and retest in 2 weeks.",
    avoidUntil: "Can trial from week 2 of recovery if symptoms are stable.",
  },
  {
    id: "canned-peaches",
    name: "Canned peaches (in juice)",
    tier: "caution",
    category: "fruit",
    prep: "In natural juice only — not syrup. Drain thoroughly. Syrup versions contain excess sugar. Eat a small portion (3–4 slices) and wait.",
    reason:
      "Cooked/canned fruit with skin removed. Lower insoluble fiber than fresh peaches. However, all fruit beyond banana carries individual tolerance risk during recovery.",
    cautionNote: "Try a small portion mid-morning when you can monitor your response before bed.",
    avoidUntil: "Introduce no earlier than week 3 of stable recovery.",
  },
  {
    id: "ripe-melon",
    name: "Melon (cantaloupe, honeydew)",
    tier: "caution",
    category: "fruit",
    prep: "Very ripe only. Remove all rind. Eat a small portion (about ½ cup). Do not eat if the melon is underripe — harder melon has more insoluble fiber.",
    reason:
      "High water content, low fiber when very ripe. Natural source of potassium. Still carries individual tolerance risk as a fruit beyond banana.",
    cautionNote: "Watermelon is higher in fructose and more likely to cause bloating — start with cantaloupe or honeydew.",
    avoidUntil: "Introduce no earlier than week 3 of stable recovery.",
  },
  {
    id: "ripe-pear-peeled",
    name: "Ripe pear (peeled)",
    tier: "caution",
    category: "fruit",
    prep: "Must be fully ripe (soft). Peel completely — the skin contains significant insoluble fiber. Eat a small portion. Cook it (poach in water) for even better tolerance.",
    reason:
      "Pear contains sorbitol, a natural sugar alcohol that can cause loose stools in sensitive individuals. Peeling removes insoluble fiber. Poaching further breaks down the structure.",
    cautionNote: "Sorbitol sensitivity is common in gut conditions. If it causes loose stools, avoid entirely.",
    avoidUntil: "Introduce no earlier than week 4 of stable recovery.",
  },
  {
    id: "broccoli-overcooked",
    name: "Broccoli (overcooked)",
    tier: "caution",
    category: "vegetable",
    prep: "Boil or steam until completely soft — well past al dente. It should be very tender throughout, no resistance at all. Start with a small portion (¼ cup). No raw broccoli.",
    reason:
      "Cruciferous vegetable that produces gas during digestion. Listed as tolerable in MC guidelines when peeled and overcooked, but its gas-producing properties make it a risk given active bloating. Save for later reintroduction.",
    cautionNote: "If current bloating is still present, delay this food until bloating resolves.",
    avoidUntil: "Introduce no earlier than week 6, and only when bloating symptoms have resolved.",
  },
  {
    id: "tofu-silken",
    name: "Silken tofu",
    tier: "caution",
    category: "protein",
    prep: "Eat plain or blended into a smooth soup. Very soft texture is the main advantage. No marinades.",
    reason:
      "Even softer than firm tofu. Generally well tolerated. Listed as caution because soy affects a small subset of people with gut conditions.",
    cautionNote: "If you already eat firm tofu without issues, silken tofu is also likely fine.",
  },
  {
    id: "peppermint-tea",
    name: "Peppermint tea",
    tier: "caution",
    category: "drink",
    prep: "Pure peppermint tea bag only. No added ingredients. Drink between meals, not immediately after.",
    reason:
      "Reduces intestinal spasm and gas through smooth muscle relaxation — beneficial for bloating. However, peppermint relaxes the lower esophageal sphincter, which can worsen acid reflux or heartburn.",
    cautionNote:
      "If you experience heartburn or reflux (this patient was previously on pantoprazole), skip peppermint tea and use ginger or chamomile instead.",
  },
  {
    id: "lactose-free-milk",
    name: "Lactose-free milk",
    tier: "caution",
    category: "drink",
    prep: "Plain lactose-free cow's milk only. No flavored varieties. Start with a small amount (½ cup) added to oatmeal rather than drinking as a glass.",
    reason:
      "Post-flare mucosal inflammation transiently impairs lactase enzyme production, causing temporary lactose intolerance even in people who normally tolerate dairy. Lactose-free milk removes the lactose but retains dairy proteins and fat.",
    cautionNote: "Even lactose-free milk contains dairy proteins and fat, which may be problematic. Introduce very cautiously.",
    avoidUntil: "Do not introduce before week 4. Full dairy reintroduction not before week 6.",
  },
  {
    id: "low-fat-yogurt-plain",
    name: "Plain low-fat yogurt (lactose-free)",
    tier: "caution",
    category: "protein",
    prep: "Lactose-free, plain, low-fat only. No fruit-flavored, no sweetened, no varieties with inulin or chicory root fiber added (check label carefully — these are common additives in yogurt). A small portion (½ cup) as a test.",
    reason:
      "Contains live cultures (Lactobacillus) that support microbiome rebuilding. However, dairy fat and proteins can worsen symptoms. Lactose-free + low-fat + plain is the least-risk version.",
    cautionNote:
      "Many yogurt brands add inulin or chicory root fiber — check every label. These are high-FODMAP additives that will worsen bloating and loose stools.",
    avoidUntil: "Do not introduce before week 6.",
  },
  {
    id: "oat-milk-plain",
    name: "Oat milk (plain, unsweetened)",
    tier: "caution",
    category: "drink",
    prep: "Plain, unsweetened only. Use as a small addition to oatmeal. Check label for additives — many oat milks contain rapeseed oil, gums (xanthan, guar), or other additives that may irritate a sensitive gut.",
    reason:
      "Dairy-free milk alternative made from oats. Lower fat than cow's milk. Useful if dairy is not yet tolerated. However, some formulations contain additives that can cause gut symptoms.",
    cautionNote: "Ingredient list should be short: oats, water, salt. Reject any version with gums or added oils.",
    avoidUntil: "Can trial from week 2 if dairy is being avoided.",
  },
  {
    id: "almond-butter-smooth",
    name: "Smooth almond butter (no additives)",
    tier: "caution",
    category: "fat",
    prep: "One teaspoon only. Smooth only — not chunky. Ingredient list should be almonds and nothing else (no palm oil, no sugar, no salt). Eat with plain rice cakes.",
    reason:
      "Provides protein and healthy fat. However, nuts and nut butters are relatively high in fat and fiber. Even smooth versions carry some fat load risk in early recovery.",
    cautionNote: "Start with ½ teaspoon and increase only if no symptoms within 4 hours.",
    avoidUntil: "Introduce no earlier than week 3.",
  },

  // ─── AVOID ───────────────────────────────────────────────────────────────────

  {
    id: "decaf-coffee",
    name: "Decaf coffee",
    tier: "avoid",
    category: "drink",
    reason:
      "Decaf is not safe for this condition. Both regular and decaf coffee contain chlorogenic acids — compounds that stimulate colon motility and trigger the gastrocolic reflex independent of caffeine. Studies show decaf coffee triggers bowel movements in approximately 50% of people. For a gut with active urgency and loose stools, this is a direct daily driver of symptoms. Switch to herbal tea.",
  },
  {
    id: "regular-coffee",
    name: "Regular coffee (caffeinated)",
    tier: "avoid",
    category: "drink",
    reason:
      "Contains both caffeine AND chlorogenic acids, doubling the motility-stimulating effect. Caffeine alone accelerates colonic transit; chlorogenic acids compound this. A strong avoid for lymphocytic colitis at any stage of recovery.",
  },
  {
    id: "fried-foods",
    name: "Fried foods (all types)",
    tier: "avoid",
    category: "fat",
    reason:
      "High saturated fat disrupts gut microbiome composition and directly irritates inflamed colonic mucosa. Fried food also typically contains breading (gluten), absorbed frying oils, and often spicing. A single fried meal sets back mucosal healing by several days.",
  },
  {
    id: "fast-food",
    name: "Fast food",
    tier: "avoid",
    category: "fat",
    reason:
      "Combines fried cooking, high saturated fat, processed additives, artificial flavors, and often hidden dairy or gluten. No safe options at standard fast-food restaurants during recovery.",
  },
  {
    id: "carbonated-drinks",
    name: "Carbonated drinks (all types — soda, sparkling water)",
    tier: "avoid",
    category: "drink",
    reason:
      "CO2 gas physically distends the colon, directly worsening bloating and urgency. Regular sodas add high sugar; diet sodas add artificial sweeteners — both are additionally harmful. Even plain sparkling water should be avoided during active bloating.",
  },
  {
    id: "artificial-sweeteners",
    name: "Artificial sweeteners (all types)",
    tier: "avoid",
    category: "seasoning",
    reason:
      "Published research has shown that at least six artificial sweeteners — aspartame, sucralose, saccharin, neotame, advantame, and acesulfame potassium-K — are toxic to gut bacteria at very low concentrations. For microscopic colitis patients specifically, artificial sweeteners can trigger flares and prevent remission. Hidden in: diet sodas, sugar-free gum, protein bars, sugar-free yogurt, many 'light' products. Read every label.",
  },
  {
    id: "dairy-regular",
    name: "Regular dairy — milk, cheese, butter, cream, ice cream",
    tier: "avoid",
    category: "fat",
    reason:
      "Post-flare mucosal inflammation transiently impairs lactase enzyme production, causing temporary lactose intolerance even in people who normally tolerate dairy. Dairy fat (myristic acid and saturated fats) is also on the IBD anti-inflammatory diet's list of inflammatory dietary patterns to avoid. Do not reintroduce before week 6.",
  },
  {
    id: "gluten-wheat",
    name: "Gluten and wheat products",
    tier: "avoid",
    category: "starch",
    reason:
      "Celiac has been ruled out for this patient. However, non-celiac gluten sensitivity can maintain background colonic inflammation in lymphocytic colitis by triggering immune responses that keep the gut in a state of heightened alert. Trialing a 4–6 week gluten elimination is recommended to test whether symptoms improve without it. This means avoiding: regular bread, pasta, most crackers, baked goods, flour tortillas, and any processed food with wheat as an ingredient.",
  },
  {
    id: "alcohol",
    name: "Alcohol (all types)",
    tier: "avoid",
    category: "drink",
    reason:
      "Directly inflames the intestinal mucosa. Disrupts the gut microbiome. Impairs the intestinal barrier function that is actively healing during recovery. No amount is safe during the recovery phase.",
  },
  {
    id: "spicy-foods",
    name: "Spicy foods — hot sauce, chili, heavy pepper",
    tier: "avoid",
    category: "seasoning",
    reason:
      "Capsaicin (the active compound in chili) is a direct mucosal irritant. It accelerates gut transit and can trigger cramping and urgency even in healthy guts. In an inflamed post-flare colon, it is a reliable trigger.",
  },
  {
    id: "raw-vegetables",
    name: "Raw vegetables (all — except banana)",
    tier: "avoid",
    category: "vegetable",
    reason:
      "The Microscopic Colitis Foundation guidelines state explicitly: avoid all raw vegetables during recovery. Raw vegetables retain their full insoluble fiber content, which accelerates gut transit, worsens loose stools, and mechanically irritates inflamed tissue. The only exception in the raw category is banana, which is classified separately as safe.",
  },
  {
    id: "salads",
    name: "Salads",
    tier: "avoid",
    category: "vegetable",
    reason:
      "Salads are concentrated raw insoluble fiber. Even 'gentle' salads with soft greens will worsen loose stools and urgency during recovery. All salad greens must be fully cooked (wilted) before eating.",
  },
  {
    id: "cruciferous-vegetables-raw",
    name: "Cruciferous vegetables — raw or lightly cooked (broccoli, cauliflower, Brussels sprouts, cabbage)",
    tier: "avoid",
    category: "vegetable",
    reason:
      "Cruciferous vegetables are gas-producing even in healthy guts, due to raffinose and other fermentable compounds. During active bloating, these will significantly worsen symptoms. Broccoli can eventually be reintroduced when overcooked — see caution tier. Cauliflower, Brussels sprouts, and cabbage should wait until full remission.",
  },
  {
    id: "red-meat",
    name: "Red meat — beef, pork, lamb",
    tier: "avoid",
    category: "protein",
    reason:
      "High saturated fat content (specifically myristic acid) is associated with inflammatory changes in gut microbiome in IBD research. Listed as an inflammatory dietary pattern in IBD guidelines. Avoid during recovery phase; consider limiting long-term.",
  },
  {
    id: "processed-meat",
    name: "Processed meats — bacon, sausage, deli meats, hot dogs",
    tier: "avoid",
    category: "protein",
    reason:
      "Combines high saturated fat with preservatives (nitrates/nitrites), high sodium, and often artificial flavors and fillers. Multiple layers of gut irritation. Avoid entirely.",
  },
  {
    id: "butter-margarine",
    name: "Butter and margarine",
    tier: "avoid",
    category: "fat",
    reason:
      "Butter is a dairy fat (myristic acid) — inflammatory in IBD. Margarine often contains trans fats or highly processed vegetable oils. Replace with a drizzle of olive oil.",
  },
  {
    id: "coconut-oil",
    name: "Coconut oil",
    tier: "avoid",
    category: "fat",
    reason:
      "Despite being marketed as healthy, coconut oil is very high in saturated fat (specifically lauric acid). IBD dietitian guidelines specifically list coconut oil and palm oil as inflammatory fats to avoid.",
  },
  {
    id: "chicory-pero",
    name: "Chicory / Pero coffee substitute",
    tier: "avoid",
    category: "drink",
    reason:
      "Chicory root is approximately 98% inulin by dry weight. Inulin is a high-FODMAP fructan fiber with high osmotic activity — it pulls water into the colon and ferments rapidly, producing gas. For a gut with active loose stools and bloating, this will worsen both symptoms significantly. The long-term prebiotic benefits of chicory are real, but this is the wrong phase. Revisit after full recovery (6+ weeks of stable stools).",
  },
  {
    id: "nsaids",
    name: "NSAIDs — ibuprofen, naproxen, aspirin",
    tier: "avoid",
    category: "seasoning",
    reason:
      "Not a food, but listed here because it is one of the strongest documented pharmacological triggers for microscopic colitis. NSAIDs inhibit cyclooxygenase, disrupting colonic mucosal barriers. Use acetaminophen (paracetamol / Tylenol) for pain instead. If aspirin is prescribed for cardiovascular reasons, discuss alternatives with your doctor — do not stop without medical guidance.",
  },
  {
    id: "high-fiber-foods",
    name: "High-insoluble-fiber foods — whole grains, raw nuts, seeds, dried fruit, legumes",
    tier: "avoid",
    category: "starch",
    reason:
      "Insoluble fiber does not dissolve in water. It passes through the gut largely intact, accelerating transit and worsening loose stools. This includes: whole grain bread, brown rice, whole wheat pasta, raw nuts and seeds, dried fruits (raisins, dates, apricots), and uncooked legumes (lentils, chickpeas, kidney beans). These are excellent long-term foods but are actively harmful during recovery.",
  },
  {
    id: "onions-garlic-raw",
    name: "Raw onion and garlic",
    tier: "avoid",
    category: "seasoning",
    reason:
      "Both are high-FODMAP (fructans) when raw. They ferment in the gut, producing gas and worsening bloating. Cooked garlic and the green part of spring onions are lower FODMAP and can be tested cautiously later. During active bloating, avoid entirely.",
  },
  {
    id: "tomato-products",
    name: "Tomato sauce and tomato-based products",
    tier: "avoid",
    category: "seasoning",
    reason:
      "Concentrated tomato products (sauce, paste, canned tomatoes) are acidic and can irritate inflamed gut lining. Commonly reported trigger among IBD patients. Plain fresh tomato in very small amounts may be testable later — concentrated products should be avoided during recovery.",
  },
  {
    id: "fruit-juice",
    name: "Fruit juice",
    tier: "avoid",
    category: "drink",
    reason:
      "Even 100% natural juice is high in fructose (a FODMAP) with no fiber to slow absorption. This causes rapid osmotic activity in the gut, pulling water into the colon and worsening loose stools. Eat whole fruit (appropriate items only) rather than drinking juice.",
  },
  {
    id: "sugar-sweetened-drinks",
    name: "Sugar-sweetened drinks — regular soda, energy drinks, sweetened tea",
    tier: "avoid",
    category: "drink",
    reason:
      "High sugar loads feed dysbiotic gut bacteria, compounding the microbiome disruption already caused by the flare, liquid diet, and prior PPI use. Energy drinks also contain caffeine and often other stimulants that accelerate gut motility.",
  },
];

/**
 * Helper functions for the app to consume
 */

export function getFoodsByTier(tier) {
  return FOODS.filter((f) => f.tier === tier);
}

export function getFoodsByCategory(category) {
  return FOODS.filter((f) => f.category === category);
}

export function getFoodsByTierAndCategory(tier, category) {
  return FOODS.filter((f) => f.tier === tier && f.category === category);
}

export function searchFoods(query) {
  const q = query.toLowerCase().trim();
  if (!q) return FOODS;
  return FOODS.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.reason.toLowerCase().includes(q) ||
      (f.prep && f.prep.toLowerCase().includes(q))
  );
}

export function getFoodById(id) {
  return FOODS.find((f) => f.id === id) || null;
}

export const TIER_LABELS = {
  safe: "Safe now",
  caution: "Test carefully",
  avoid: "Avoid",
};

export const TIER_DESCRIPTIONS = {
  safe: "These foods are confirmed safe during post-flare recovery (weeks 1–6). Prep instructions are part of the safety classification — follow them exactly.",
  caution:
    "These foods are reasonable to try but carry individual tolerance risk. Introduce one at a time, wait 3 days, and track your response in the diary. Do not introduce caution foods until you have had at least 2 weeks of stable symptoms on safe foods only.",
  avoid:
    "These foods should be avoided during recovery. Each has a documented clinical reason. Some can be reintroduced after full recovery — check the notes.",
};
