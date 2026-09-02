/**
 * 50+ Curated Ambient Multi-Turn Conversations for the Living Animal Universe
 * Pure Animal Cast: Cat, Dog, Owl, Fox, Panda, Bunny, Penguin, Raccoon, Otter, Koala, Frog, Turtle, Hedgehog, Dino, Bear, Duck, Squirrel.
 * Topics: Planets & Space, Ghosts & Paranormal, Crazy Dreams, Funny Banter, Deep Philosophy, Snacks & Chill.
 */

export const ANIMAL_CHARACTERS = [
  { id: 'cat', name: 'Luna', icon: '🐱', label: 'Cat' },
  { id: 'dog', name: 'Mochi', icon: '🐶', label: 'Shiba' },
  { id: 'owl', name: 'Archimedes', icon: '🦉', label: 'Owl' },
  { id: 'fox', name: 'Kitsune', icon: '🦊', label: 'Fox' },
  { id: 'panda', name: 'Bao', icon: '🐼', label: 'Panda' },
  { id: 'bunny', name: 'Pip', icon: '🐰', label: 'Bunny' },
  { id: 'penguin', name: 'Pebble', icon: '🐧', label: 'Penguin' },
  { id: 'raccoon', name: 'Bandit', icon: '🦝', label: 'Raccoon' },
  { id: 'otter', name: 'Ollie', icon: '🦦', label: 'Otter' },
  { id: 'koala', name: 'Koa', icon: '🐨', label: 'Koala' },
  { id: 'frog', name: 'Kero', icon: '🐸', label: 'Frog' },
  { id: 'turtle', name: 'Oogway', icon: '🐢', label: 'Turtle' },
  { id: 'hedgehog', name: 'Quill', icon: '🦔', label: 'Hedgehog' },
  { id: 'dino', name: 'Neo', icon: '🦖', label: 'Dino' },
  { id: 'bear', name: 'Barnaby', icon: '🐻', label: 'Bear' },
  { id: 'duck', name: 'Ducky', icon: '🦆', label: 'Duck' },
  { id: 'squirrel', name: 'Nutty', icon: '🐿️', label: 'Squirrel' }
];

export const CONVERSATION_SCRIPTS = [
  // ==========================================
  // 🪐 TOPIC 1: PLANETS, COSMOS & ASTROPHYSICS
  // ==========================================
  {
    id: 'planets-1',
    topic: 'planets',
    title: 'Saturn Rings & Cosmic Dust',
    dialogues: [
      { speaker: '🦊 Kitsune', text: "Did you know Saturn's rings are mostly chunks of ice and comet dust?" },
      { speaker: '🦉 Archimedes', text: "Indeed! In some areas, they are only about 10 meters thick despite spanning 280,000 kilometers wide." },
      { speaker: '🦖 Neo', text: "Wait... does that mean we could technically skate on Saturn's rings with tiny ice skates?" },
      { speaker: '🦊 Kitsune', text: "If you don't mind orbiting at 40,000 miles per hour in absolute zero, sure!" }
    ]
  },
  {
    id: 'planets-2',
    topic: 'planets',
    title: 'The Mystery of Black Holes',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "At the event horizon of a black hole, time appears to completely stop for an outside observer." },
      { speaker: '🐢 Oogway', text: "Time itself slows to a standstill. The ultimate state of cosmic patience." },
      { speaker: '🐱 Luna', text: "So if I take a 10-minute catnap near a black hole, 500 years pass on Earth? Sign me up!" },
      { speaker: '🦉 Archimedes', text: "That is scientifically accurate, yet terrifyingly lazy, Luna." }
    ]
  },
  {
    id: 'planets-3',
    topic: 'planets',
    title: 'Pluto Justice League',
    dialogues: [
      { speaker: '🐶 Mochi', text: "I will forever stand on the hill that Pluto is a real planet. It has a giant heart on it!" },
      { speaker: '🦊 Kitsune', text: "Tombaugh Regio! The frozen nitrogen plains really do look like a giant glowing heart." },
      { speaker: '🐻 Barnaby', text: "Pluto is cold, but its spirit is bigger than Jupiter!" },
      { speaker: '🐶 Mochi', text: "Classification: Dwarf Planet. But emotional rating: 10/10." }
    ]
  },
  {
    id: 'planets-4',
    topic: 'planets',
    title: 'Raining Diamonds on Neptune',
    dialogues: [
      { speaker: '🐧 Pebble', text: "Deep inside Neptune and Uranus, atmospheric pressure is so intense that carbon condenses into diamond rain." },
      { speaker: '🦝 Bandit', text: "Diamond rain?! A raccoon's ultimate shiny treasure jackpot!" },
      { speaker: '🐱 Luna', text: "I'd rather it rain catnip and warm afternoon sunbeams honestly." },
      { speaker: '🐧 Pebble', text: "Good luck finding sunbeams at 2.8 billion miles from the sun, Luna." }
    ]
  },
  {
    id: 'planets-5',
    topic: 'planets',
    title: 'Voyager Golden Record',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "Voyager 1 is over 15 billion miles away, carrying music by Bach and greetings in 55 languages." },
      { speaker: '🦖 Neo', text: "Did they include dinosaur and animal roars on the golden record?" },
      { speaker: '🦉 Archimedes', text: "Alas, Neo, bird calls and whale songs were included, but no dinosaur tracks." },
      { speaker: '🦖 Neo', text: "Huge missed opportunity. Deep space aliens would love dinosaurs." }
    ]
  },
  {
    id: 'planets-6',
    topic: 'planets',
    title: 'The Great Red Spot',
    dialogues: [
      { speaker: '🦊 Kitsune', text: "Jupiter's Great Red Spot has been storming continuously for at least 350 years." },
      { speaker: '🐼 Bao', text: "Storm diameter is 16,350 km. Large enough to swallow Earth whole." },
      { speaker: '🐱 Luna', text: "Imagine living on a planet where the weather forecast is 'extremely windy' for four centuries." },
      { speaker: '🐼 Bao', text: "Sounds like a great excuse to stay inside and munch bamboo!" }
    ]
  },
  {
    id: 'planets-7',
    topic: 'planets',
    title: 'Blue Sunsets on Mars',
    dialogues: [
      { speaker: '🦊 Kitsune', text: "A sunset on Mars looks bright blue because fine atmospheric dust scatters red light away." },
      { speaker: '🦉 Archimedes', text: "Blue sunsets and butterscotch skies. The exact inverse of Earth's Rayleigh scattering." },
      { speaker: '🐰 Pip', text: "Can we build a giant bunny hop park on Olympus Mons? It's 3 times taller than Mount Everest!" },
      { speaker: '🦊 Kitsune', text: "In one-third Martian gravity, your bunny hops would last 6 seconds in mid-air!" }
    ]
  },

  // ==========================================
  // 👻 TOPIC 2: GHOSTS & PARANORMAL MYSTERIES
  // ==========================================
  {
    id: 'ghosts-1',
    topic: 'ghosts',
    title: 'Quantum Entanglement vs Ghosts',
    dialogues: [
      { speaker: '🦝 Bandit', text: "Animals always sense when something unseen is in the room. Are ghosts real or quantum waves?" },
      { speaker: '🦉 Archimedes', text: "Einstein famously called quantum entanglement 'spooky action at a distance'." },
      { speaker: '🐱 Luna', text: "I stare at empty corners at 2 AM because I'm tracking quantum probability oscillations." },
      { speaker: '🦝 Bandit', text: "Sure Luna, or you just saw a phantom dust mote." }
    ]
  },
  {
    id: 'ghosts-2',
    topic: 'ghosts',
    title: 'The 3 AM Cold Spot',
    dialogues: [
      { speaker: '🐶 Mochi', text: "Why is there always an icy cold breeze in the corner of the hallway at 3:14 AM?" },
      { speaker: '🦔 Quill', text: "Whenever that happens, my quills stand up like little paranormal antennas!" },
      { speaker: '🐻 Barnaby', text: "I can give that chilly corner a giant warm bear hug to banish the ghost!" },
      { speaker: '🐶 Mochi', text: "Please don't bear-hug the ghost, Barnaby. You might startle it." }
    ]
  },
  {
    id: 'ghosts-3',
    topic: 'ghosts',
    title: 'Ghost Wi-Fi Password',
    dialogues: [
      { speaker: '🦝 Bandit', text: "If ghosts are all around us, what's the router password for the astral plane?" },
      { speaker: '🦉 Archimedes', text: "According to ancient folklore, it is: 'B0000_1234_SHADOWS'." },
      { speaker: '🦖 Neo', text: "Even Victorian phantoms need high-speed fiber internet for streaming!" },
      { speaker: '🦝 Bandit', text: "They're probably watching ghost hunting shows on YouTube and laughing." }
    ]
  },
  {
    id: 'ghosts-4',
    topic: 'ghosts',
    title: 'The Library Poltergeist',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "I spent the night in an ancient library and history books kept floating off the top shelves." },
      { speaker: '🦊 Kitsune', text: "Was it a scholar ghost trying to finish their PhD dissertation?" },
      { speaker: '🦉 Archimedes', text: "They were actually reorganizing the philosophy section under the Dewey Decimal system!" },
      { speaker: '🐱 Luna', text: "A ghost librarian. That is shockingly wholesome." }
    ]
  },
  {
    id: 'ghosts-5',
    topic: 'ghosts',
    title: 'Do Dinosaurs Become Ghosts?',
    dialogues: [
      { speaker: '🦖 Neo', text: "If humans become ghosts, why don't we ever see a giant glowing T-Rex ghost wandering downtown?" },
      { speaker: '🐢 Oogway', text: "Dinosaur ghosts reside peacefully in the Mesozoic astral realm, chewing prehistoric ferns." },
      { speaker: '🐶 Mochi', text: "I would wag my tail and play fetch with a spectral Velociraptor!" },
      { speaker: '🦖 Neo', text: "Careful, Mochi. A ghost T-Rex has a very strong phantom chomp!" }
    ]
  },
  {
    id: 'ghosts-6',
    topic: 'ghosts',
    title: 'Creaky Floorboards',
    dialogues: [
      { speaker: '🐱 Luna', text: "Whenever a floorboard creaks when nobody is in the house, my ears swivel 180 degrees." },
      { speaker: '🦉 Archimedes', text: "95% of the time it is thermal expansion and contraction of timber joists." },
      { speaker: '🐱 Luna', text: "...And the other 5%?" },
      { speaker: '🦊 Kitsune', text: "A midnight squirrel doing ninja backflips on the roof!" }
    ]
  },

  // ==========================================
  // 💭 TOPIC 3: CRAZY BIZARRE DREAMS
  // ==========================================
  {
    id: 'dreams-1',
    topic: 'dreams',
    title: 'The Flying Croissant Dream',
    dialogues: [
      { speaker: '🦖 Neo', text: "I had the wildest dream last night. I was riding a giant warm croissant through an asteroid belt." },
      { speaker: '🦊 Kitsune', text: "Was the asteroid belt drizzled in dark Belgian chocolate?" },
      { speaker: '🦖 Neo', text: "YES! And every time we dodged an asteroid, a buttery flake fell into my mouth." },
      { speaker: '🐱 Luna', text: "I think you just went to bed on an empty dinosaur stomach, Neo." }
    ]
  },
  {
    id: 'dreams-2',
    topic: 'dreams',
    title: 'Keynote Lecture with Origami Notes',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "I dreamt I had to deliver a keynote lecture, but my notes turned into origami swans and flew away." },
      { speaker: '🐼 Bao', text: "Classic stress dream. Your subconscious was trying to process unfiled cognitive backlog." },
      { speaker: '🐶 Mochi', text: "I once dreamt my teeth were replaced with glowing neon glowsticks at a dog park!" },
      { speaker: '🦉 Archimedes', text: "Neon teeth in a dream... that is remarkably avant-garde, Mochi." }
    ]
  },
  {
    id: 'dreams-3',
    topic: 'dreams',
    title: 'Lucid Dreaming Tricks',
    dialogues: [
      { speaker: '🐱 Luna', text: "Whenever I realize I'm lucid dreaming, the first thing I do is summon a bottomless bowl of salmon sashimi." },
      { speaker: '🐻 Barnaby', text: "I immediately summon an enchanted honey tree that never runs dry!" },
      { speaker: '🦉 Archimedes', text: "The key to lucid dreaming is performing reality checks during the day, like looking at clock faces twice." },
      { speaker: '🐰 Pip', text: "In dreams, clocks always show mysterious swirly numbers." }
    ]
  },
  {
    id: 'dreams-4',
    topic: 'dreams',
    title: 'The Infinite Cloud Cafe',
    dialogues: [
      { speaker: '🐰 Pip', text: "I dreamt I was hopping up a spiral staircase of pastel marble that led straight into the clouds." },
      { speaker: '🦊 Kitsune', text: "What was waiting at the summit of the clouds?" },
      { speaker: '🐰 Pip', text: "A cozy secret cafe where a penguin barista was serving warm vanilla matcha lattes!" },
      { speaker: '🐧 Pebble', text: "Hey! That was me in the dream! Did you leave a tip?!" }
    ]
  },
  {
    id: 'dreams-5',
    topic: 'dreams',
    title: 'Underwater Symphony',
    dialogues: [
      { speaker: '🦦 Ollie', text: "I had a dream I was conducting an underwater orchestra composed entirely of glowing sea jellies." },
      { speaker: '🦉 Archimedes', text: "Bioluminescent marine acoustics! What masterpiece were they performing?" },
      { speaker: '🦦 Ollie', text: "Beethoven's 5th Symphony, with the bassline provided by a friendly blue whale." },
      { speaker: '🐢 Oogway', text: "The deep sea holds the ancient rhythm of the planet." }
    ]
  },
  {
    id: 'dreams-6',
    topic: 'dreams',
    title: 'The False Awakening Loop',
    dialogues: [
      { speaker: '🦖 Neo', text: "Have you ever woken up in a dream, brushed your teeth, walked out the door, and then woken up for real?!" },
      { speaker: '🐼 Bao', text: "False Awakening loop! Your subconscious rendered a nested reality inside memory layer 2." },
      { speaker: '🐱 Luna', text: "That is the ultimate betrayal. You did all that morning routine work for zero real-life credit." },
      { speaker: '🦖 Neo', text: "Exactly! I had to brush my dinosaur teeth twice in one morning!" }
    ]
  },

  // ==========================================
  // 😂 TOPIC 4: FUNNY & ABSURD BANTER
  // ==========================================
  {
    id: 'funny-1',
    topic: 'funny',
    title: 'Why Humans Stare at Rectangles',
    dialogues: [
      { speaker: '🐱 Luna', text: "Humans are so curious. They tap on small pocket rectangles, then stare at medium work rectangles, then relax in front of giant wall rectangles." },
      { speaker: '🐶 Mochi', text: "All day! Morning rectangle, work rectangle, evening movie rectangle!" },
      { speaker: '🦉 Archimedes', text: "Rectilinear photon emission displays account for 92.4% of modern human visual perception." },
      { speaker: '🐱 Luna', text: "And yet, here we are inside their screen watching them relax." }
    ]
  },
  {
    id: 'funny-2',
    topic: 'funny',
    title: 'Is Cereal a Cold Soup?',
    dialogues: [
      { speaker: '🦖 Neo', text: "Hear me out: Cereal is technically cold breakfast soup with crunchy cereal croutons." },
      { speaker: '🦉 Archimedes', text: "By culinary taxonomy, soup requires a savory steeped broth. Milk with oats is a sweet cold porridge." },
      { speaker: '🐻 Barnaby', text: "If you add honey and berries to it, does it become a breakfast fruit salad?!" },
      { speaker: '🐱 Luna', text: "Whatever it is, if someone pours the milk before the cereal, they need to be questioned." }
    ]
  },
  {
    id: 'funny-3',
    topic: 'funny',
    title: 'Dinosaur Typing Struggles',
    dialogues: [
      { speaker: '🦖 Neo', text: "Do you know how hard it is to type 100 words per minute with tiny T-Rex arms?!" },
      { speaker: '🐶 Mochi', text: "Try typing with fuzzy paws! Every sentence ends up with 'asdfghjk🐾'!" },
      { speaker: '🦖 Neo', text: "I tried voice dictation and everything came out as 'RAWRRR GRAWHHH ROARR'." },
      { speaker: '🦝 Bandit', text: "That's basically how my Monday morning emails sound anyway." }
    ]
  },
  {
    id: 'funny-4',
    topic: 'funny',
    title: 'Folded Pizza Mechanics',
    dialogues: [
      { speaker: '🦊 Kitsune', text: "If you fold a pizza slice in half, does it count as one slice or an Italian taco?" },
      { speaker: '🦉 Archimedes', text: "Topologically speaking, folding creates a semi-closed calzone manifold." },
      { speaker: '🐱 Luna', text: "I don't care about topology, I care about melted cheese delivery efficiency." },
      { speaker: '🦖 Neo', text: "Folded pizza = aerodynamic snack. You can eat it while sprinting!" }
    ]
  },
  {
    id: 'funny-5',
    topic: 'funny',
    title: 'The Unattainable Red Dot',
    dialogues: [
      { speaker: '🐱 Luna', text: "One day... mark my words... I WILL catch that elusive laser red dot." },
      { speaker: '🦉 Archimedes', text: "Laser wavelength is 650 nanometers travelling at 299,792 km/s. Capture probability is zero." },
      { speaker: '🐱 Luna', text: "Never tell me the odds, owl! My claws are quicker than the speed of light." },
      { speaker: '🐶 Mochi', text: "I tried barking at it once. It just moved to the wall!" }
    ]
  },
  {
    id: 'funny-6',
    topic: 'funny',
    title: 'Why Do We Park on Driveways?',
    dialogues: [
      { speaker: '🦝 Bandit', text: "Why do humans drive on parkways, but park on driveways?!" },
      { speaker: '🦉 Archimedes', text: "Linguistic divergence in early 20th-century automotive transport nomenclature." },
      { speaker: '🐶 Mochi', text: "And why do you ship cargo by truck, but transport shipments by ship?!" },
      { speaker: '🦝 Bandit', text: "English language syntax error: 404 logic not found." }
    ]
  },

  // ==========================================
  // 🧐 TOPIC 5: SERIOUS & PHILOSOPHICAL MUSINGS
  // ==========================================
  {
    id: 'serious-1',
    topic: 'serious',
    title: 'The Nature of Time & Stillness',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "Seneca wrote that we are not given a short life, but we make it short by wasting it on noise." },
      { speaker: '🐢 Oogway', text: "In a world of constant haste, choosing stillness is the ultimate act of courage." },
      { speaker: '🐱 Luna', text: "True peace isn't the absence of activity; it's the absence of unnecessary anxiety." },
      { speaker: '🐼 Bao', text: "When you sit calmly, the muddy water of your mind naturally settles and clears." }
    ]
  },
  {
    id: 'serious-2',
    topic: 'serious',
    title: 'Mindfulness & Cognitive Space',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "Marcus Aurelius taught: 'You have power over your mind, not outside events. Realize this and you will find inner strength.'" },
      { speaker: '🦊 Kitsune', text: "People hold onto past regrets like heavy burdens. Letting them go makes you light as a feather." },
      { speaker: '🐶 Mochi', text: "Taking a deep breath and listening to ambient rain sounds resets your whole mood." },
      { speaker: '🦉 Archimedes', text: "Clarity comes not from adding more thoughts, but from clearing the clutter." }
    ]
  },
  {
    id: 'serious-3',
    topic: 'serious',
    title: 'The Pale Blue Dot',
    dialogues: [
      { speaker: '🦊 Kitsune', text: "Carl Sagan described Earth as a 'mote of dust suspended in a sunbeam'. Every human dream happened there." },
      { speaker: '🦉 Archimedes', text: "It teaches us humility. Our daily stresses are tiny ripples in a vast cosmic ocean." },
      { speaker: '🐻 Barnaby', text: "It makes you appreciate the small moments... a warm drink, a completed note, a loyal companion." },
      { speaker: '🐢 Oogway', text: "Kindness and presence are our greatest gifts to this brief existence." }
    ]
  },
  {
    id: 'serious-4',
    topic: 'serious',
    title: 'Digital Fasting & Deep Rest',
    dialogues: [
      { speaker: '🐱 Luna', text: "Rest is not a reward you have to earn after work. Rest is essential for living." },
      { speaker: '🦉 Archimedes', text: "The prefrontal cortex restores its metabolic glycogen only during deliberate disengagement." },
      { speaker: '🦖 Neo', text: "So sitting here watching the timer count down is actually recharging our brain power?" },
      { speaker: '🦉 Archimedes', text: "Precisely, Neo. Active rest is pure cognitive renewal." }
    ]
  },
  {
    id: 'serious-5',
    topic: 'serious',
    title: 'The Art of Starting Small',
    dialogues: [
      { speaker: '🐻 Barnaby', text: "Every mighty oak tree began as a tiny acorn. Every grand journey begins with one step." },
      { speaker: '🐢 Oogway', text: "The tortoise does not run, yet arrives exactly on time." },
      { speaker: '🐼 Bao', text: "Friction is highest when standing still. Once you take the first small step, momentum carries you." },
      { speaker: '🐰 Pip', text: "Never underestimate the courage it takes to write that first sentence." }
    ]
  },

  // ==========================================
  // 🍕 TOPIC 6: SNACKS, COFFEE & CHILL VIBES
  // ==========================================
  {
    id: 'food-1',
    topic: 'food',
    title: 'The Perfect Espresso Ratio',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "A true double ristretto: 18 grams in, 36 grams out in 27 seconds at 9 bars of pressure." },
      { speaker: '🐱 Luna', text: "With a splash of oat milk and a sprinkle of organic cinnamon on top!" },
      { speaker: '🦊 Kitsune', text: "The aroma of freshly ground dark roast beans fills the entire studio." },
      { speaker: '🦖 Neo', text: "Coffee makes me feel like a dinosaur ready to conquer a mountain!" }
    ]
  },
  {
    id: 'food-2',
    topic: 'food',
    title: 'Midnight Ramen Philosophy',
    dialogues: [
      { speaker: '🐼 Bao', text: "Steaming tonkotsu broth, soft boiled ajitsuke egg, and chili garlic oil at 11 PM hits differently." },
      { speaker: '🦦 Ollie', text: "The slurping sound of noodles is proven to increase relaxation by 200%!" },
      { speaker: '🦖 Neo', text: "I could eat 5 bowls of ramen and still have room for gyoza!" },
      { speaker: '🐶 Mochi', text: "Midnight ramen has mystical soul-healing properties." }
    ]
  },
  {
    id: 'food-3',
    topic: 'food',
    title: 'Herbal Tea & Zen Rain',
    dialogues: [
      { speaker: '🐱 Luna', text: "Chamomile, dried lavender, and the rhythm of gentle rain against the window." },
      { speaker: '🦉 Archimedes', text: "L-theanine in herbal infusions promotes alpha brainwave synchronization for deep calm." },
      { speaker: '🐢 Oogway', text: "Steep the leaves with patience. When the water cools to 80 degrees, sip with gratitude." },
      { speaker: '🐱 Luna', text: "You speak like a tea monk, Oogway." }
    ]
  },
  {
    id: 'food-4',
    topic: 'food',
    title: 'The Cookie Texture Debate',
    dialogues: [
      { speaker: '🦖 Neo', text: "Soft gooey cookies or crispy crunchy cookies? There is only one true champion." },
      { speaker: '🐻 Barnaby', text: "Soft, warm, molten chocolate center fresh out of the bakery oven!" },
      { speaker: '🦉 Archimedes', text: "The Maillard reaction on crispy browned edges provides superior caramelized complexity." },
      { speaker: '🐼 Bao', text: "The master solution: Dip the crispy cookie into warm milk to achieve harmonious equilibrium." }
    ]
  },
  {
    id: 'food-5',
    topic: 'food',
    title: 'Pizza Crust Etiquette',
    dialogues: [
      { speaker: '🦖 Neo', text: "Leaving the pizza crust behind on the plate is a crime against bakery science!" },
      { speaker: '🐱 Luna', text: "It's literally the breadstick baked into the slice!" },
      { speaker: '🦝 Bandit', text: "Especially when dipped in creamy garlic herb butter sauce." },
      { speaker: '🐶 Mochi', text: "If humans don't want the crust, my tail is wagging right by their chair!" }
    ]
  },

  // ==========================================
  // 🌿 TOPIC 7: DEEP CHILL & RECHARGING
  // ==========================================
  {
    id: 'chill-1',
    topic: 'chill',
    title: 'Listening to the Silence',
    dialogues: [
      { speaker: '🐱 Luna', text: "Close your eyes for 10 seconds. Hear how peaceful the room is when you stop rushing?" },
      { speaker: '🦉 Archimedes', text: "In quiet moments, your subconscious organizes and stores everything learned today." },
      { speaker: '🦖 Neo', text: "It feels like recharging a battery from 10% to 100% without even plugging in." },
      { speaker: '🐢 Oogway', text: "Like a calm lake reflecting the clear sky above." }
    ]
  },
  {
    id: 'chill-2',
    topic: 'chill',
    title: 'The Beauty of Doing Nothing',
    dialogues: [
      { speaker: '🐼 Bao', text: "It takes great wisdom to sit still and do absolutely nothing for a while." },
      { speaker: '🐻 Barnaby', text: "Even bears hibernate through the winter to awaken refreshed for spring." },
      { speaker: '🦥 Koa', text: "Hanging from a tree branch without a single worry in the world." },
      { speaker: '🐱 Luna', text: "Purrrr... just breathe softly and let the minutes drift by." }
    ]
  },
  {
    id: 'chill-3',
    topic: 'chill',
    title: 'Forest Bathing in Spirit',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "Shinrin-yoku—the Japanese art of forest bathing. Walking among pine trees reduces cortisol by 50%." },
      { speaker: '🦊 Kitsune', text: "I can smell the fresh cedar needles and morning dew just thinking about it." },
      { speaker: '🐻 Barnaby', text: "The forest breathes with us. Warm sunlight filtering through emerald canopies." },
      { speaker: '🐱 Luna', text: "A nap on soft mossy ground is the sweetest sleep in the world." }
    ]
  },
  {
    id: 'chill-4',
    topic: 'chill',
    title: 'Stargazing Reflections',
    dialogues: [
      { speaker: '🦊 Kitsune', text: "Look at the night sky. Some of that starlight traveled millions of years just to reach your eyes right now." },
      { speaker: '🦉 Archimedes', text: "We are the universe contemplating its own beauty in real time." },
      { speaker: '🐶 Mochi', text: "And right now, the universe is taking a well-deserved 30-minute relaxation break." },
      { speaker: '🦖 Neo', text: "Best relaxation break in all of history!" }
    ]
  },
  {
    id: 'chill-5',
    topic: 'chill',
    title: 'Warm Hugs & Dopamine',
    dialogues: [
      { speaker: '🐱 Luna', text: "Did you know a 20-second warm hug releases oxytocin and instantly calms your nervous system?" },
      { speaker: '🐶 Mochi', text: "Group animal hug right now! Everyone get in here!" },
      { speaker: '🐻 Barnaby', text: "Big cozy bear hug incoming for all of you!" },
      { speaker: '🐼 Bao', text: "Emotional temperature: maximum cozy and happy." }
    ]
  }
];

export function getRandomScript(excludeId = null, preferredTopic = null) {
  let pool = CONVERSATION_SCRIPTS;
  if (preferredTopic) {
    const filtered = pool.filter((s) => s.topic === preferredTopic);
    if (filtered.length > 0) pool = filtered;
  }
  if (excludeId) {
    const filtered = pool.filter((s) => s.id !== excludeId);
    if (filtered.length > 0) pool = filtered;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}
