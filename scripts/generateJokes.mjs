// scripts/generateJokes.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORIES = [
  'planets',
  'ghosts',
  'dreams',
  'funny',
  'serious',
  'food',
  'space_mysteries',
  'ancient',
  'ocean',
  'chill',
  'cheating_husband',
  'cheating_wife'
];

function buildCategoryBank(category) {
  const dialogues = [];
  const seen = new Set();

  function addPair(aText, bText) {
    const key = `${aText}:::${bText}`;
    if (!seen.has(key)) {
      seen.add(key);
      dialogues.push({ role: 'A', text: aText });
      dialogues.push({ role: 'B', text: bText });
    }
  }

  // Combinatorial generator utility
  function generateCombinations(prefixes, subjects, predicates, reactions, punchlines, targetCount = 500) {
    let count = 0;
    for (const p of prefixes) {
      for (const s of subjects) {
        for (const pr of predicates) {
          for (const r of reactions) {
            for (const pu of punchlines) {
              const a = `${p} ${s} ${pr}?`;
              const b = `${r} ${pu}`;
              addPair(a, b);
              count++;
              if (count >= targetCount) return;
            }
          }
        }
      }
    }
  }

  if (category === 'planets') {
    const prefixes = ["Did you know that", "Can you believe", "Is it true that", "What if", "Scientists just confirmed that", "Astronomers claim that", "Picture this:", "Wild space fact:"];
    const subjects = ["Saturn's shiny rings", "the Red Spot on Jupiter", "Neptune's icy atmosphere", "Pluto's little frozen heart", "Mars' blue sunset", "Venus' boiling surface", "Mercury's speedy orbit", "the Andromeda galaxy", "a spinning neutron star", "Uranus' sideways rotation", "the Moon's cratered surface", "a roaming asteroid belt"];
    const predicates = [
      "rains solid diamond crystals 24/7", "smells faintly like burnt metal and sulfur", "could float in a giant cosmic bathtub", "has winds three times faster than sound", "is cold enough to freeze nitrogen into slush", "has active volcanoes that shoot frozen methane", "spins so fast a day lasts only four hours", "is slowly tiptoeing away from the sun", "has 80 moons competing for attention", "looks like a gigantic cosmic disco ball"
    ];
    const reactions = ["Wait, seriously?!", "No way, that is unbelievable!", "Mind officially blown!", "That sounds like sci-fi!", "Whoa, hold on...", "Astronomers really said that?!", "That is both scary and awesome!"];
    const punchlines = [
      "Imagine the interstellar real estate prices there!", "I'm packing three extra pairs of space socks!", "Can we open a cosmic food truck nearby?", "Nature in space has zero chill and I love it.", "I would probably accidentally launch my snack into orbit.", "Pluto will always be a planet in my heart!", "Don't tell NASA, but I'm moving there next week!"
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'ghosts') {
    const prefixes = ["What if", "Did you know that", "Imagine if", "I just realized that", "Spooky theory:", "Have you ever thought:", "Why is it that", "Ghost science question:"];
    const subjects = ["a Victorian ghost", "a spooky phantom", "a clumsy poltergeist", "a 3 AM house apparition", "a ghost in an old castle", "an ethereal spirit", "a friendly phantom roommate", "a ghost wearing an antique bedsheet", "a spectral cat", "a phantom chef"];
    const predicates = [
      "tries to fold a fitted bedsheet but floats right through it", "haunts the kitchen toaster just to smell phantom toast", "complains about slow castle Wi-Fi speed", "misplaces its phantom car keys and can't leave", "only reorganizes the spice rack alphabetically", "gets scared whenever someone sneezes loudly", "tries to pet a dog but passes straight through", "practises clumsy tap dancing on attic floorboards", "stares at midnight fridge leftovers wondering about carbs", "refuses to haunt anyone before morning coffee"
    ];
    const reactions = ["Ghost physics makes zero sense!", "Haha, that is classic!", "If that happened to me,", "I'm not even scared,", "That is oddly wholesome!", "Honestly, relatable!", "That explains so much!"];
    const punchlines = [
      "I'd just offer them a warm cookie and the Netflix password.", "They're not haunting us, they're just looking for midnight snacks!", "Imagine spending eternity unable to find your matching sock.", "Haunting people sounds like way too much cardio anyway.", "I'd invite them to be Player 2 in my video game!", "Even the paranormal world struggles with basic chores.", "10 out of 10 for spectral effort though!"
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'dreams') {
    const prefixes = ["Last night I dreamt that", "In my crazy dream,", "Can you decode a dream where", "My brain generated a dream where", "Wildest dream ever:", "I woke up laughing because I dreamt", "Did you ever dream that", "In last night's dream drama,"];
    const subjects = ["I was giving a presidential speech", "I was piloting a giant racecar", "I was attending a royal gala", "I was flying over candy mountains", "I was taking a final calculus exam", "my hands turned into freshly baked baguettes", "I won ten million dollars in a lottery", "I was swimming in an Olympic pool", "I was being interviewed on live television", "I was being chased in slow motion"];
    const predicates = [
      "with a microphone made of a crunchy carrot", "where the steering wheel was a glazed donut", "dressed entirely in squeaky bubble wrap", "but only while singing nursery rhymes out loud", "surrounded by fifty golden retrievers taking notes", "and every time I got angry I ate my thumb", "only to wake up with a pretzel in my pocket", "filled entirely with warm peach iced tea", "about the secret emotional thoughts of houseplants", "by a very polite marshmallow monster"
    ];
    const reactions = ["Dream logic is completely unhinged!", "Your brain deserves an Emmy award!", "The emotional whiplash is real!", "That sounds like a five-star adventure!", "Haha, classic 3 AM brain activity!", "I can totally visualize that!", "Subconscious screenwriters have no budget limits!"];
    const punchlines = [
      "Did the audience take you seriously or start snacking?", "Next time you visit the tea pool, bring a giant straw!", "My brain: 'Let us make the weirdest scenario with zero context!'", "I usually just dream about forgetting my homework from 2012.", "Honestly, baguette hands sound pretty convenient at lunch.", "That is the ultimate definition of creative sleeping.", "Please write a screenplay about this immediately!"
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'funny') {
    const prefixes = ["Why do humans always", "Have you noticed how people", "Explain why humans love", "It's so funny when people", "Human quirk of the day:", "Why is everyone obsessed with", "Did you ever wonder why humans", "The funniest human habit is"];
    const subjects = ["stare at a big work computer rectangle all day", "turn down the car radio volume", "push TV remote buttons with extreme force", "get into an elevator and stare at the ceiling", "fold a pizza slice in half", "eat cold cereal with a spoon", "check the refrigerator ten times in one hour", "say 'You too!' when the movie ticket guy says enjoy the show", "pat all four pockets in public", "pretend to text on their phone"];
    const predicates = [
      "and then relax by staring at a tiny phone rectangle", "when they are trying to parallel park in a tight spot", "as if thumb pressure magically generates battery life", "to avoid three seconds of awkward eye contact", "and accidentally create an Italian taco", "and pretend it isn't cold morning breakfast soup", "hoping new magical snacks have spawned", "and then suffer five years of emotional trauma", "like they are performing an ancient ritual dance", "just to dodge walking past an acquaintance"
    ];
    const reactions = ["Humans are gloriously weird creatures!", "I feel personally called out by this!", "Haha, that is 100% accurate!", "That is pure observational comedy gold!", "Guilty as charged!", "Every single person on Earth does this!", "It's an unspoken law of humanity!"];
    const punchlines = [
      "Are rectangles secretly the supreme overlords of Earth?", "'Turn down the bass, I can't see the parking lines!'", "Every fridge check just lowers your culinary standards.", "The four-pocket tap: phone, keys, wallet, sanity.", "Do not say 'pizza taco' in Italy or they'll revoke your visa!", "The emotional damage of 'You too' never truly heals.", "We are all just improvised comedy characters."
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'serious') {
    const prefixes = ["Contemplate this profound truth:", "Ancient wisdom teaches that", "Consider this grand life secret:", "A deep philosophical realization:", "Ponder this timeless doctrine:", "Enlightenment thought of the day:", "The sages of ancient times said:", "A wise companion once noted:"];
    const subjects = ["life is too short,", "worrying is like a rocking chair,", "the slow turtle walks gently,", "true inner peace is discovered when", "if you never make mistakes,", "silence is pure gold,", "knowledge is knowing a tomato is a fruit,", "the best time to plant a tree was decades ago,", "do not take life too seriously,", "a truly enlightened mind understands that"];
    const predicates = [
      "so eat dessert first and ask philosophical questions never", "it gives you something to do but gets you nowhere", "yet always reaches the snack buffet before anyone else", "a warm cookie and a 20-minute nap fix 99% of dilemmas", "you also never get the chance to eat surprise tacos", "unless there's a puppy in the room, in which case it's suspicious", "wisdom is knowing not to include it in a fruit salad", "the second best time is after a nice cup of coffee", "because nobody makes it out alive anyway", "taking a nap is the highest form of self-care"
    ];
    const reactions = ["Socrates and Plato would weep tears of joy!", "Now that is a philosophy I can get behind!", "Pure, unfiltered cosmic wisdom.", "That hit so deep I need to sit down.", "I am writing this in my book of life rules.", "High-tier wisdom right there!", "Ten out of ten stars for life philosophy."];
    const punchlines = [
      "Speed doesn't matter if you're headed toward delicious food.", "Enlightenment is just inner peace plus a very soft pillow.", "Let that sink in. Actually, let the whole kitchen sink in.", "Philosophy is truly just professional daydreaming.", "I am adopting this doctrine effective immediately.", "Deep thoughts like this deserve a golden monument.", "Simplicity is the ultimate sophistication."
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'food') {
    const prefixes = ["Let's debate the scandal of", "Culinary crisis:", "Why is nobody talking about", "The biggest food crime is", "Snack law question:", "Is it legally permitted to enjoy", "Food science mystery:", "The unwritten rule of snacks:"];
    const subjects = ["stolen french fries from someone else's plate", "eating cold pizza standing in front of an open fridge at 2 AM", "leaving the pizza crust on the plate like packaging", "picking up a dropped potato chip within 4.9 seconds", "eating an entire carton of ice cream with a tiny spoon", "ordering a triple cheeseburger with a Diet Coke", "putting pineapple and jalapeños on a cheese pizza", "licking the savory seasoning powder off potato chips first", "putting hot sauce on literally every meal", "eating cake for breakfast because it has eggs and milk"];
    const predicates = [
      "which possess mystical flavor enhancements unknown to science", "where calories are scientifically proven to not count", "and ignoring the fact that it is a built-in breadstick", "because bacteria are legally not allowed to touch it yet", "and claiming it is a single serving because there's only one lid", "for absolute mathematical and nutritional balance", "and sparking an international diplomatic food war", "as an advanced culinary optimization ritual", "to demonstrate supreme bravery to the breakfast chef", "to achieve peak morning energy and happiness"
    ];
    const reactions = ["The United Nations of Snacks must investigate!", "That is fake science, but I respect the hustle!", "Culinary laws were broken today!", "Haha, absolutely guilty of this!", "That is a certified classic snack move!", "International food treaties support this!", "I will defend this food choice with my honor!"];
    const punchlines = [
      "Stolen fries will always taste 500% better than ordered ones.", "The 5-second rule is recognized worldwide by snack lovers.", "Leaving crust behind is like unwrapping a gift and throwing it out!", "The diet soda cancels out all 2,000 calories instantly.", "Flavor dust optimization is a prestigious art form.", "If you eat cake quickly enough, the calories can't catch up.", "I will gladly help investigate by eating the remaining evidence!"
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'space_mysteries') {
    const prefixes = ["Cosmic riddle:", "What if extraterrestrials", "Astronomers are baffled because", "Imagine an alien civilization that", "In another dimension,", "Space exploration mystery:", "What if a rogue alien spaceship", "A bizarre universe theory:"];
    const subjects = ["space probes discover that alien ships", "extraterrestrial diplomats visit Earth and", "a giant cosmic cloud in the Milky Way", "a high-tech Dyson sphere around a star", "astronauts accidentally drop a single glove that", "alien observers watch our reality television and", "a comet made entirely of frozen mozzarella cheese", "time dilation on a faraway exoplanet", "interstellar signals received from deep space", "a black hole at the center of the galaxy"];
    const predicates = [
      "run entirely on garlic bread propulsion engines", "only want to meet our domestic golden retrievers", "smells like raspberries and rum according to spectroscopy", "is powering a giant galaxy-wide video game console", "becomes the most famous fashion accessory in orbit", "think it is a serious documentary about human society", "creates the ultimate cosmic pizza when entering the atmosphere", "makes a five-minute space walk feel like ten years of laundry", "turn out to be cosmic beings asking for our pizza recipe", "acts as the ultimate vacuum cleaner of lost space junk"
    ];
    const reactions = ["Sign me up for the interstellar expedition immediately!", "Aliens have their priorities completely straight!", "The galaxies can run, but they can't hide from our comedy!", "Imagine the cable bill for streaming the whole galaxy.", "Haha, that would be the best discovery in history!", "Cosmic physics is wildly entertaining!", "I knew the universe had a sense of humor!"];
    const punchlines = [
      "Garlic bread propulsion is the clean energy the galaxy needs.", "Dogs would be elected supreme rulers in under ten minutes.", "One small step for an astronaut, one giant leap for space snacks.", "Alien diplomats would lock their doors and fly away immediately.", "I'm packing extra space burritos just in case.", "The Milky Way really is the galaxy's best dessert spot.", "Intergalactic travel with snacks sounds like heaven."
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'ancient') {
    const prefixes = ["Imagine the historical comedy of", "Prehistoric dilemma:", "Did you know that in the Jurassic era,", "Picture a giant dinosaur that", "Ancient history mystery:", "How did dinosaurs survive when", "Fossil record comedy:", "Archaeologists just discovered that"];
    const subjects = ["a mighty T-Rex with tiny two-foot arms", "a heavy Stegosaurus with spiked tail plates", "a Triceratops with three giant horns", "a pack of clever Velociraptors", "a tall Brachiosaurus with a forty-foot neck", "a Pterodactyl delivering prehistoric takeout", "an ancient saber-toothed cat with enormous fangs", "an Archaeopteryx trying to act scary", "a caveman painting murals on stone walls", "a modern pigeon strutting down the city sidewalk"];
    const predicates = [
      "tries to put on a cozy winter hoodie and gets stuck", "tries to parallel park without scratching nearby boulders", "uses its horns to carry three glazed donuts at once", "tries to open a pickle jar without smashing the glass", "orders lunch from a drive-thru window on the third floor", "delivers hot pizzas directly through bedroom windows", "tries to eat ice cream without giving itself brain freeze", "insists it is a fierce dragon and not a fancy chicken", "while art critics complain the stone resolution is only 480p", "remembering it used to be a 40-foot apex predator"
    ];
    const reactions = ["'ROARRR! The fitted sheet popped off the bed again!'", "Prehistoric problems required prehistoric solutions!", "Haha, Mesozoic struggles were so real!", "Next time a pigeon stares at your fries, show some respect!", "Glazed, chocolate, and strawberry! The ultimate trio!", "Imagine having banana-sized teeth and you can't scratch your back.", "Dinosaurs had 150 million years and zero email meetings!"];
    const punchlines = [
      "The T-Rex bed-making struggle was the real extinction event.", "A three-story drive-thru is a multi-million dollar business idea.", "Pigeons definitely walk around like they still own the continent.", "Paleontologists keep finding bones, but where are ancient donut recipes?", "Apex predator energy over a dropped bagel in the park.", "Prehistoric life with modern amenities would be unbeatable.", "Tiny arms, huge appetite—the ultimate struggle."
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'ocean') {
    const prefixes = ["Deep sea oddity:", "Did you know that underwater,", "Ocean comedy spotlight:", "Marine biologists revealed that", "In the dark ocean depths,", "Imagine being a sea creature where", "Undersea mystery:", "Have you ever considered how"];
    const subjects = ["a glowing anglerfish with a forehead lantern", "a little crab scuttling sideways along the reef", "a giant blue whale singing 40Hz ocean songs", "an octopus trying to get dressed in the morning", "a goofy clownfish telling marine knock-knock jokes", "a brainless jellyfish floating through ocean currents", "a mantis shrimp with bullet-speed punching claws", "a pair of sea otters holding paws while napping", "a great white shark swimming near the coastline", "a playful dolphin doing backflips in the waves"];
    const predicates = [
      "wears a permanent 100-watt lightbulb while trying to nap", "is always sneakily side-stepping away from coral drama", "sends songs 3,000 miles just to ask where the krill buffet is", "has to put on eight individual socks without tangling tentacles", "inside a sea anemone where nobody can escape the punchline", "with zero brain, zero bones, and zero morning alarms", "punching clams at 50 mph just because they looked funny", "so they do not drift away into the open Atlantic ocean", "wondering why dramatic cello music plays whenever it arrives", "purely to show off and confuse all the seagulls"
    ];
    const reactions = ["Anglerfish genuinely need tiny underwater sleep masks!", "'Don't look at me, I'm just scuttling to the seaweed buffet!'", "Otters holding paws while napping is mathematically pure perfection!", "Jellyfish living without a mortgage or brain is true triumph!", "The ocean abyss is basically a 24/7 bioluminescent laser rave!", "Whale songs are just hemisphere-wide group chats!", "Mantis shrimp have zero patience and maximum horsepower!"];
    const punchlines = [
      "Imagine having eight arms and dropping your phone with all of them.", "Deep sea life is 50% majestic awe and 50% pure comedy.", "If dolphins had social media, their reels would break the internet.", "Side-stepping away from drama: the crab way of life.", "Oceanic group chats with zero spam filters.", "Bioluminescent parties with no entry fees down in the trench.", "Nature's design team had so much fun under the sea."
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'chill') {
    const prefixes = ["Cozy rule #1:", "The decree of the Lazy Guild:", "My life motto for today:", "Procrastination truth:", "The highest form of comfort:", "Advanced leisure masterclass:", "Today's horizontal agenda:", "Supreme relaxation decree:"];
    const subjects = ["my primary goal for the entire afternoon", "if anyone asks what I accomplished today", "bears hibernating for six uninterrupted months", "relaxing your shoulders and unclenching your jaw", "taking a 30-minute afternoon nap", "a decorative plastic houseplant sitting in the corner", "my favorite outdoor activity of the week", "the gravitational pull of a warm fleece blanket", "following my heart when it strikes 3 PM", "achieving world-class Olympic cozy status"];
    const predicates = [
      "is to move significantly less than a potted plastic fern", "I will proudly state: I kept my skeleton upright and breathing", "proves that sleeping through winter is the greatest luxury", "is scientifically proven to increase happiness by 9000%", "is not laziness, but a high-performance battery recalibration", "which doesn't need to do cardio or turn toward the sun", "which consists of walking back inside to the air-conditioned snacks", "which is mathematically stronger than the gravity of Jupiter", "and letting it lead me straight to the fridge and then the couch", "by mastering the art of horizontal leisure and zero guilt"
    ];
    const reactions = ["Keeping your skeleton upright deserves a gold medal!", "Battery recalibration ritual! That is going on my calendar.", "Imagine waking up from a nap and it's suddenly April. Luxury!", "Relaxing my shoulders felt like melting into warm butter.", "The couch and blanket combo is an unstoppable force of nature.", "A masterclass in peaceful, stress-free existence.", "Doing nothing without feeling guilty is a true superpower."];
    const punchlines = [
      "Why run a marathon when you can binge three episodes in bed?", "Inner peace is achieved the second your head hits a cold pillow.", "I am professionally committed to cozy downtime today.", "Comfort levels have officially reached maximum capacity.", "Let the world hustle while we master the art of the nap.", "Horizontal rest is the ultimate productivity secret.", "Stay cozy, stay relaxed, and enjoy the peace."
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'cheating_husband') {
    const prefixes = ["Did you hear the street gossip?!", "Neighbourhood soap opera update:", "You will not believe what Greg did:", "The drama at the cul-de-sac just exploded:", "Spouse scandal alert:", "The most ridiculous alibi of the year:", "Busted red-handed:", "Listen to this unbelievable excuse:"];
    const subjects = ["Greg claimed his business trip was a Chicago accounting audit", "Tom said he was working late at the office on spreadsheets", "Mark swore he spent two hours at the fitness gym", "Dave hid his secret second cell phone inside a high-fiber bran box", "Brian claimed his personal trainer 'Jessica'", "Kevin told his wife his car smelled like expensive French perfume", "Richard claimed he played 18 holes of golf in a thunderstorm", "Gary accidentally liked his ex's holiday photo from seven years ago", "Steve swore the penthouse suite receipt in Miami", "Brad claimed the lipstick stain on his crisp white shirt collar"];
    const predicates = [
      "but his location tag was Señor Frog's Cabo Beach Party", "yet came home covered in strawberry glitter claiming it was copier dust", "while his smart watch logged zero heart rate increase at a dessert cafe", "knowing his wife would never open a box with zero sugar", "only lifts weights at candlelit Italian restaurants after 10 PM", "because the local car wash used an exotic lavender wax formula", "yet came home completely dry with spotless clean golf clubs", "at 3:14 AM while pretending to be fast asleep in bed", "was just a promotional marketing flyer sent by mistake", "was caused by a rogue ketchup bottle explosion at the diner"
    ];
    const reactions = ["Photocopier dust with strawberry glitter scent?! Nice try!", "His wife immediately changed the Wi-Fi and donated his golf clubs!", "Hiding a phone in bran flakes is devious, but wives have flashlights!", "A suspicious spouse with Wi-Fi can find bank records from 1999.", "Ketchup explosion in the exact shape of human lips?! Unbelievable!", "Spreadsheets in a sombrero at midnight?! Busted in 4K!", "The Ring doorbell camera recorded the whole thing in ultra-HD!"];
    const punchlines = [
      "She cancelled the credit cards before he even parked the car.", "Never lie to someone who knows all your passwords and childhood pets.", "The street soap opera is better than prime-time television!", "Daytime drama writers are taking notes from this neighborhood.", "Rule number one of excuses: Make sure they obey the laws of physics!", "Busted by the GPS tracker in under three minutes flat.", "The cul-de-sac group chat is on fire tonight!"
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  else if (category === 'cheating_wife') {
    const prefixes = ["Girl, you will not believe what Brenda did:", "The suburban scandal of the week:", "Neighbourhood soap opera part two:", "Did you hear what happened with Linda?!", "Listen to this scandalous alibi:", "The drama on our street reached level 100:", "Spouse drama alert:", "The most brazen excuse in history:"];
    const subjects = ["Brenda told her husband she was at hot yoga for four hours", "Linda accidentally texted her husband: 'See you tonight babe, the idiot is watching football'", "Ashley said she was visiting her sick aunt in snowy Vermont", "Karen claimed the handsome tennis instructor in the convertible", "Sarah said she was at a silent meditation retreat where talking is banned", "Melissa claimed the luxury charge for diamonds at Tiffany & Co", "Rachel claimed she was stuck in bumper-to-bumper traffic for six hours", "Jessica said her sudden interest in marathon running was for cardio", "Chloe swore the two first-class flight tickets to Paris", "Samantha claimed the handsome man hugging her at the grocery store"];
    const predicates = [
      "but came home with a salon blowout and smelling like Chanel No. 5", "and tried to blame it on aggressive smartphone autocorrect", "but was tagged in a sunny Las Vegas VIP pool selfie by her nail stylist", "was just a luxury Uber driver who happened to blow a goodbye kiss", "yet her phone bill revealed 900 outgoing text messages that weekend", "was a routine annual software subscription renewal fee", "while her GPS showed her parked at a luxury vineyard resort", "but she only jogged toward the handsome new neighbor's lawn", "were an online sweepstakes prize that she forgot to mention", "was her high school algebra tutor helping her with geometry"
    ];
    const reactions = ["Spiritual yoga where only your soul sweats, not your hair blowout?!", "Autocorrect has never turned groceries into a daytime soap opera!", "A luxury Uber driver blowing kisses?! That is peak drama!", "The Ring camera footage saw everything in crystal-clear 4K!", "Tiffany diamonds disguised as cloud backup storage?! The audacity!", "Geometry tutoring behind the bakery in a convertible?! Iconic!", "Screenshots were forwarded to the whole family group chat immediately!"];
    const punchlines = [
      "Rule number one: Always check who is tagging you on social media!", "Daytime TV writers couldn't script a plot twist this dramatic.", "Every neighbor is watching from their windows with binoculars.", "The neighborhood grapevine operates at supersonic speeds.", "Busted by the nail stylist's Instagram story in ten minutes flat!", "The soap opera continues and we definitely need more popcorn.", "Never underestimate a spouse with access to doorbell camera archives!"
    ];
    generateCombinations(prefixes, subjects, predicates, reactions, punchlines, 520);
  }

  return dialogues;
}

const output = {};
let totalJokesAll = 0;

for (const cat of CATEGORIES) {
  const dialogues = buildCategoryBank(cat);
  output[cat] = {
    id: cat,
    totalDialogues: dialogues.length,
    totalPairs: dialogues.length / 2,
    dialogues
  };
  totalJokesAll += (dialogues.length / 2);
  console.log(`[Category: ${cat}] Generated ${dialogues.length} dialogues (${dialogues.length / 2} unique joke pairs)`);
}

console.log(`\n Total unique joke pairs across all categories: ${totalJokesAll}`);

const jsContent = `/**
 * Expanded Offline Joke & Comedy Banks
 * Contains 500+ unique dialogue pairs (1,000+ dialogue lines) per category.
 * Generated automatically to provide endless offline companion entertainment.
 */

export const EXPANDED_JOKE_BANKS = ${JSON.stringify(output, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/expandedJokeBanks.js'), jsContent, 'utf-8');
console.log('Successfully written src/data/expandedJokeBanks.js!');
