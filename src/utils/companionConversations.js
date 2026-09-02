/**
 * 30-Minute Continuous Living Animal Conversation Sagas
 * Designed for pure 30-minute relaxation sessions.
 * Pure Animal Cast: Cat, Dog, Owl, Fox, Panda, Bunny, Penguin, Raccoon, Otter, Koala, Frog, Turtle, Hedgehog, Dino, Bear, Duck, Squirrel.
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

// ==========================================
// 🪐 10 EPIC 30-MINUTE CONTINUOUS TOPIC SAGAS
// ==========================================

export const SAGA_TOPICS = {
  planets: {
    id: 'planets',
    title: 'The 30-Minute Grand Interstellar Saga',
    tag: 'Planets & Cosmos',
    dialogues: [
      { speaker: '🦊 Kitsune', text: "Did you know Saturn's rings are mostly chunks of pure ice and comet dust?" },
      { speaker: '🦉 Archimedes', text: "Indeed! In some areas, they are only about 10 meters thick despite spanning 280,000 kilometers wide." },
      { speaker: '🦖 Neo', text: "Wait... does that mean we could technically skate on Saturn's rings with tiny ice skates?" },
      { speaker: '🦊 Kitsune', text: "If you don't mind orbiting at 40,000 miles per hour in absolute zero, sure!" },
      { speaker: '🦉 Archimedes', text: "Speaking of orbits, at the event horizon of a black hole, time appears to completely stop for an outside observer." },
      { speaker: '🐢 Oogway', text: "Time itself slows to a standstill. The ultimate state of cosmic patience." },
      { speaker: '🐱 Luna', text: "So if I take a 10-minute catnap near a black hole, 500 years pass on Earth? Sign me up!" },
      { speaker: '🦉 Archimedes', text: "That is scientifically accurate, yet terrifyingly lazy, Luna." },
      { speaker: '🐶 Mochi', text: "What about Pluto? I will forever stand on the hill that Pluto is a real planet. It has a giant heart on it!" },
      { speaker: '🦊 Kitsune', text: "Tombaugh Regio! The frozen nitrogen plains really do look like a giant glowing heart." },
      { speaker: '🐻 Barnaby', text: "Pluto is cold, but its spirit is bigger than Jupiter!" },
      { speaker: '🐶 Mochi', text: "Classification: Dwarf Planet. But emotional rating: 10/10." },
      { speaker: '🐧 Pebble', text: "Did you know deep inside Neptune and Uranus, atmospheric pressure is so intense that carbon condenses into diamond rain?" },
      { speaker: '🦝 Bandit', text: "Diamond rain?! A raccoon's ultimate shiny treasure jackpot!" },
      { speaker: '🐱 Luna', text: "I'd rather it rain catnip and warm afternoon sunbeams honestly." },
      { speaker: '🐧 Pebble', text: "Good luck finding sunbeams at 2.8 billion miles from the sun, Luna." },
      { speaker: '🦉 Archimedes', text: "Voyager 1 is now over 15 billion miles away, carrying music by Bach and greetings in 55 languages." },
      { speaker: '🦖 Neo', text: "Did they include dinosaur roars on the golden record?" },
      { speaker: '🦉 Archimedes', text: "Bird calls and whale songs were included, but alas, no dinosaur tracks." },
      { speaker: '🦖 Neo', text: "Huge missed opportunity. Deep space aliens would love dinosaurs." },
      { speaker: '🦊 Kitsune', text: "And Jupiter's Great Red Spot has been storming continuously for at least 350 years." },
      { speaker: '🐼 Bao', text: "Storm diameter is 16,350 km. Large enough to swallow Earth whole." },
      { speaker: '🐱 Luna', text: "Imagine living on a planet where the weather forecast is 'extremely windy' for four centuries." },
      { speaker: '🐼 Bao', text: "Sounds like a great excuse to stay inside and munch bamboo!" },
      { speaker: '🦊 Kitsune', text: "A sunset on Mars looks bright blue because fine atmospheric dust scatters red light away." },
      { speaker: '🦉 Archimedes', text: "Blue sunsets and butterscotch skies. The exact inverse of Earth's Rayleigh scattering." },
      { speaker: '🐰 Pip', text: "Can we build a giant bunny hop park on Olympus Mons? It's 3 times taller than Mount Everest!" },
      { speaker: '🦊 Kitsune', text: "In one-third Martian gravity, your bunny hops would last 6 seconds in mid-air!" },
      { speaker: '🦉 Archimedes', text: "Consider Europa, Jupiter's moon. Beneath its icy crust lies a saltwater ocean deeper than all Earth's oceans combined." },
      { speaker: '🦦 Ollie', text: "An alien ocean! Are there bioluminescent cosmic otters swimming under Europa's ice?!" },
      { speaker: '🐢 Oogway', text: "Wherever there is liquid water and geothermal warmth, life finds a quiet way." },
      { speaker: '🦊 Kitsune', text: "The James Webb Space Telescope recently looked back 13.5 billion years to the very first galaxies." },
      { speaker: '🦉 Archimedes', text: "Looking through a telescope is literally looking backward through time. We are seeing starlight from ancient antiquity." },
      { speaker: '🐱 Luna', text: "So when I stare up at the night sky, I'm watching a historical movie of the universe." },
      { speaker: '🦉 Archimedes', text: "Precisely, Luna. The night sky is the oldest cinema in existence." }
    ]
  },

  ghosts: {
    id: 'ghosts',
    title: 'The 30-Minute Quantum Ghost Investigation',
    tag: 'Ghosts & Mysteries',
    dialogues: [
      { speaker: '🦝 Bandit', text: "Animals always sense when something unseen is in the room. Are ghosts real or quantum waves?" },
      { speaker: '🦉 Archimedes', text: "Einstein famously called quantum entanglement 'spooky action at a distance'." },
      { speaker: '🐱 Luna', text: "I stare at empty corners at 2 AM because I'm tracking quantum probability oscillations." },
      { speaker: '🦝 Bandit', text: "Sure Luna, or you just saw a phantom dust mote." },
      { speaker: '🐶 Mochi', text: "Why is there always an icy cold breeze in the corner of the hallway at 3:14 AM?" },
      { speaker: '🦔 Quill', text: "Whenever that happens, my quills stand up like little paranormal antennas!" },
      { speaker: '🐻 Barnaby', text: "I can give that chilly corner a giant warm bear hug to banish the ghost!" },
      { speaker: '🐶 Mochi', text: "Please don't bear-hug the ghost, Barnaby. You might startle it." },
      { speaker: '🦝 Bandit', text: "If ghosts are all around us, what's the router password for the astral plane?" },
      { speaker: '🦉 Archimedes', text: "According to ancient folklore, it is: 'B0000_1234_SHADOWS'." },
      { speaker: '🦖 Neo', text: "Even Victorian phantoms need high-speed fiber internet for streaming!" },
      { speaker: '🦝 Bandit', text: "They're probably watching ghost hunting shows on YouTube and laughing." },
      { speaker: '🦉 Archimedes', text: "I spent the night in an ancient library and history books kept floating off the top shelves." },
      { speaker: '🦊 Kitsune', text: "Was it a scholar ghost trying to finish their PhD dissertation?" },
      { speaker: '🦉 Archimedes', text: "They were actually reorganizing the philosophy section under the Dewey Decimal system!" },
      { speaker: '🐱 Luna', text: "A ghost librarian. That is shockingly wholesome." },
      { speaker: '🦖 Neo', text: "If humans become ghosts, why don't we ever see a giant glowing T-Rex ghost wandering downtown?" },
      { speaker: '🐢 Oogway', text: "Dinosaur ghosts reside peacefully in the Mesozoic astral realm, chewing prehistoric ferns." },
      { speaker: '🐶 Mochi', text: "I would wag my tail and play fetch with a spectral Velociraptor!" },
      { speaker: '🦖 Neo', text: "Careful, Mochi. A ghost T-Rex has a very strong phantom chomp!" },
      { speaker: '🐱 Luna', text: "Whenever a floorboard creaks when nobody is in the house, my ears swivel 180 degrees." },
      { speaker: '🦉 Archimedes', text: "95% of the time it is thermal expansion and contraction of timber joists." },
      { speaker: '🐱 Luna', text: "...And the other 5%?" },
      { speaker: '🦊 Kitsune', text: "A midnight squirrel doing ninja backflips on the roof!" },
      { speaker: '🦔 Quill', text: "What about mirrors in dark rooms? Why do they feel so uncanny at night?" },
      { speaker: '🦉 Archimedes', text: "The Troxler fading effect! In dim light, your visual cortex invents facial anomalies when you stare too long." },
      { speaker: '🦝 Bandit', text: "So the brain is essentially hallucinating its own horror movie." },
      { speaker: '🐱 Luna', text: "I look in the mirror at night just to admire my fabulous whiskers." },
      { speaker: '🐶 Mochi', text: "I barked at my mirror reflection once. The other dog looked very handsome." },
      { speaker: '🐢 Oogway', text: "Fear of the unseen dissolves when you realize the universe is filled with peace, not malice." },
      { speaker: '🦊 Kitsune', text: "Even if there's a ghost, they probably just want a cup of hot chamomile tea." }
    ]
  },

  dreams: {
    id: 'dreams',
    title: 'The 30-Minute Surreal Dream Chronicles',
    tag: 'Crazy Dreams',
    dialogues: [
      { speaker: '🦖 Neo', text: "I had the wildest dream last night. I was riding a giant warm croissant through an asteroid belt." },
      { speaker: '🦊 Kitsune', text: "Was the asteroid belt drizzled in dark Belgian chocolate?" },
      { speaker: '🦖 Neo', text: "YES! And every time we dodged an asteroid, a buttery flake fell into my mouth." },
      { speaker: '🐱 Luna', text: "I think you just went to bed on an empty dinosaur stomach, Neo." },
      { speaker: '🦉 Archimedes', text: "I dreamt I had to deliver a keynote lecture, but my notes turned into origami swans and flew away." },
      { speaker: '🐼 Bao', text: "Classic stress dream. Your subconscious was trying to process unfiled cognitive backlog." },
      { speaker: '🐶 Mochi', text: "I once dreamt my teeth were replaced with glowing neon glowsticks at a dog park!" },
      { speaker: '🦉 Archimedes', text: "Neon teeth in a dream... that is remarkably avant-garde, Mochi." },
      { speaker: '🐱 Luna', text: "Whenever I realize I'm lucid dreaming, the first thing I do is summon a bottomless bowl of salmon sashimi." },
      { speaker: '🐻 Barnaby', text: "I immediately summon an enchanted honey tree that never runs dry!" },
      { speaker: '🦉 Archimedes', text: "The key to lucid dreaming is performing reality checks during the day, like looking at clock faces twice." },
      { speaker: '🐰 Pip', text: "In dreams, clocks always show mysterious swirly numbers." },
      { speaker: '🐰 Pip', text: "I dreamt I was hopping up a spiral staircase of pastel marble that led straight into the clouds." },
      { speaker: '🦊 Kitsune', text: "What was waiting at the summit of the clouds?" },
      { speaker: '🐰 Pip', text: "A cozy secret cafe where a penguin barista was serving warm vanilla matcha lattes!" },
      { speaker: '🐧 Pebble', text: "Hey! That was me in the dream! Did you leave a tip?!" },
      { speaker: '🦦 Ollie', text: "I had a dream I was conducting an underwater orchestra composed entirely of glowing sea jellies." },
      { speaker: '🦉 Archimedes', text: "Bioluminescent marine acoustics! What masterpiece were they performing?" },
      { speaker: '🦦 Ollie', text: "Beethoven's 5th Symphony, with the bassline provided by a friendly blue whale." },
      { speaker: '🐢 Oogway', text: "The deep sea holds the ancient rhythm of the planet." },
      { speaker: '🦖 Neo', text: "Have you ever woken up in a dream, brushed your teeth, walked out the door, and then woken up for real?!" },
      { speaker: '🐼 Bao', text: "False Awakening loop! Your subconscious rendered a nested reality inside memory layer 2." },
      { speaker: '🐱 Luna', text: "That is the ultimate betrayal. You did all that morning routine work for zero real-life credit." },
      { speaker: '🦖 Neo', text: "Exactly! I had to brush my dinosaur teeth twice in one morning!" },
      { speaker: '🦔 Quill', text: "I had a dream I could fly, but only if I flapped my quills like tiny hummingbirds." },
      { speaker: '🦊 Kitsune', text: "Did it work?!" },
      { speaker: '🦔 Quill', text: "I hovered about two inches off the rug, which was remarkably satisfying." },
      { speaker: '🐻 Barnaby', text: "Dreams are just our minds playing with magic while our bodies rest." }
    ]
  },

  funny: {
    id: 'funny',
    title: 'The 30-Minute Comedy of Human Quirks',
    tag: 'Absurd Banter',
    dialogues: [
      { speaker: '🐱 Luna', text: "Humans are so curious. They tap on small pocket rectangles, then stare at medium work rectangles, then relax in front of giant wall rectangles." },
      { speaker: '🐶 Mochi', text: "All day! Morning rectangle, work rectangle, evening movie rectangle!" },
      { speaker: '🦉 Archimedes', text: "Rectilinear photon emission displays account for 92.4% of modern human visual perception." },
      { speaker: '🐱 Luna', text: "And yet, here we are inside their screen watching them relax." },
      { speaker: '🦖 Neo', text: "Hear me out: Cereal is technically cold breakfast soup with crunchy cereal croutons." },
      { speaker: '🦉 Archimedes', text: "By culinary taxonomy, soup requires a savory steeped broth. Milk with oats is a sweet cold porridge." },
      { speaker: '🐻 Barnaby', text: "If you add honey and berries to it, does it become a breakfast fruit salad?!" },
      { speaker: '🐱 Luna', text: "Whatever it is, if someone pours the milk before the cereal, they need to be questioned." },
      { speaker: '🦖 Neo', text: "Do you know how hard it is to type 100 words per minute with tiny T-Rex arms?!" },
      { speaker: '🐶 Mochi', text: "Try typing with fuzzy paws! Every sentence ends up with 'asdfghjk🐾'!" },
      { speaker: '🦖 Neo', text: "I tried voice dictation and everything came out as 'RAWRRR GRAWHHH ROARR'." },
      { speaker: '🦝 Bandit', text: "That's basically how my Monday morning emails sound anyway." },
      { speaker: '🦊 Kitsune', text: "If you fold a pizza slice in half, does it count as one slice or an Italian taco?" },
      { speaker: '🦉 Archimedes', text: "Topologically speaking, folding creates a semi-closed calzone manifold." },
      { speaker: '🐱 Luna', text: "I don't care about topology, I care about melted cheese delivery efficiency." },
      { speaker: '🦖 Neo', text: "Folded pizza = aerodynamic snack. You can eat it while sprinting!" },
      { speaker: '🐱 Luna', text: "One day... mark my words... I WILL catch that elusive laser red dot." },
      { speaker: '🦉 Archimedes', text: "Laser wavelength is 650 nanometers travelling at 299,792 km/s. Capture probability is zero." },
      { speaker: '🐱 Luna', text: "Never tell me the odds, owl! My claws are quicker than the speed of light." },
      { speaker: '🐶 Mochi', text: "I tried barking at it once. It just moved to the wall!" },
      { speaker: '🦝 Bandit', text: "Why do humans drive on parkways, but park on driveways?!" },
      { speaker: '🦉 Archimedes', text: "Linguistic divergence in early 20th-century automotive transport nomenclature." },
      { speaker: '🐶 Mochi', text: "And why do you ship cargo by truck, but transport shipments by ship?!" },
      { speaker: '🦝 Bandit', text: "English language syntax error: 404 logic not found." },
      { speaker: '🐰 Pip', text: "Why do humans enter elevators and immediately stare silently at the floor numbers?" },
      { speaker: '🦊 Kitsune', text: "It's an unspoken social contract of awkward elevator solidarity." },
      { speaker: '🐻 Barnaby', text: "I would just smile and offer everyone a handful of blueberries." },
      { speaker: '🐱 Luna', text: "If a bear offered me blueberries in an elevator, I would accept immediately." }
    ]
  },

  serious: {
    id: 'serious',
    title: 'The 30-Minute Stoic Philosophy & Time Saga',
    tag: 'Deep Philosophy',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "Seneca wrote that we are not given a short life, but we make it short by wasting it on noise." },
      { speaker: '🐢 Oogway', text: "In a world of constant haste, choosing stillness is the ultimate act of courage." },
      { speaker: '🐱 Luna', text: "True peace isn't the absence of activity; it's the absence of unnecessary anxiety." },
      { speaker: '🐼 Bao', text: "When you sit calmly, the muddy water of your mind naturally settles and clears." },
      { speaker: '🦉 Archimedes', text: "Marcus Aurelius taught: 'You have power over your mind, not outside events. Realize this and you will find inner strength.'" },
      { speaker: '🦊 Kitsune', text: "People hold onto past regrets like heavy burdens. Letting them go makes you light as a feather." },
      { speaker: '🐶 Mochi', text: "Taking a deep breath and listening to ambient rain sounds resets your whole mood." },
      { speaker: '🦉 Archimedes', text: "Clarity comes not from adding more thoughts, but from clearing the clutter." },
      { speaker: '🦊 Kitsune', text: "Carl Sagan described Earth as a 'mote of dust suspended in a sunbeam'. Every human dream happened there." },
      { speaker: '🦉 Archimedes', text: "It teaches us humility. Our daily stresses are tiny ripples in a vast cosmic ocean." },
      { speaker: '🐻 Barnaby', text: "It makes you appreciate the small moments... a warm drink, a completed note, a loyal companion." },
      { speaker: '🐢 Oogway', text: "Kindness and presence are our greatest gifts to this brief existence." },
      { speaker: '🐱 Luna', text: "Rest is not a reward you have to earn after work. Rest is essential for living." },
      { speaker: '🦉 Archimedes', text: "The prefrontal cortex restores its metabolic glycogen only during deliberate disengagement." },
      { speaker: '🦖 Neo', text: "So sitting here watching the timer count down is actually recharging our brain power?" },
      { speaker: '🦉 Archimedes', text: "Precisely, Neo. Active rest is pure cognitive renewal." },
      { speaker: '🐻 Barnaby', text: "Every mighty oak tree began as a tiny acorn. Every grand journey begins with one step." },
      { speaker: '🐢 Oogway', text: "The tortoise does not run, yet arrives exactly on time." },
      { speaker: '🐼 Bao', text: "Friction is highest when standing still. Once you take the first small step, momentum carries you." },
      { speaker: '🐰 Pip', text: "Never underestimate the courage it takes to write that first sentence." },
      { speaker: '🦉 Archimedes', text: "Epictetus said: 'Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.'" },
      { speaker: '🦊 Kitsune', text: "When you stop trying to control the wind, you learn to adjust your sails." },
      { speaker: '🐢 Oogway', text: "Peace is not somewhere you travel to. It is the stillness you carry within." }
    ]
  },

  food: {
    id: 'food',
    title: 'The 30-Minute Galactic Culinary Banter',
    tag: 'Snacks & Coffee',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "A true double ristretto: 18 grams in, 36 grams out in 27 seconds at 9 bars of pressure." },
      { speaker: '🐱 Luna', text: "With a splash of oat milk and a sprinkle of organic cinnamon on top!" },
      { speaker: '🦊 Kitsune', text: "The aroma of freshly ground dark roast beans fills the entire studio." },
      { speaker: '🦖 Neo', text: "Coffee makes me feel like a dinosaur ready to conquer a mountain!" },
      { speaker: '🐼 Bao', text: "Steaming tonkotsu broth, soft boiled ajitsuke egg, and chili garlic oil at 11 PM hits differently." },
      { speaker: '🦦 Ollie', text: "The slurping sound of noodles is proven to increase relaxation by 200%!" },
      { speaker: '🦖 Neo', text: "I could eat 5 bowls of ramen and still have room for gyoza!" },
      { speaker: '🐶 Mochi', text: "Midnight ramen has mystical soul-healing properties." },
      { speaker: '🐱 Luna', text: "Chamomile, dried lavender, and the rhythm of gentle rain against the window." },
      { speaker: '🦉 Archimedes', text: "L-theanine in herbal infusions promotes alpha brainwave synchronization for deep calm." },
      { speaker: '🐢 Oogway', text: "Steep the leaves with patience. When the water cools to 80 degrees, sip with gratitude." },
      { speaker: '🐱 Luna', text: "You speak like a tea monk, Oogway." },
      { speaker: '🦖 Neo', text: "Soft gooey cookies or crispy crunchy cookies? There is only one true champion." },
      { speaker: '🐻 Barnaby', text: "Soft, warm, molten chocolate center fresh out of the bakery oven!" },
      { speaker: '🦉 Archimedes', text: "The Maillard reaction on crispy browned edges provides superior caramelized complexity." },
      { speaker: '🐼 Bao', text: "The master solution: Dip the crispy cookie into warm milk to achieve harmonious equilibrium." },
      { speaker: '🦖 Neo', text: "Leaving the pizza crust behind on the plate is a crime against bakery science!" },
      { speaker: '🐱 Luna', text: "It's literally the breadstick baked into the slice!" },
      { speaker: '🦝 Bandit', text: "Especially when dipped in creamy garlic herb butter sauce." },
      { speaker: '🐶 Mochi', text: "If humans don't want the crust, my tail is wagging right by their chair!" },
      { speaker: '🐰 Pip', text: "What about warm sourdough bread with salted French butter?" },
      { speaker: '🦊 Kitsune', text: "The crust crackling sound when you slice warm sourdough is pure audio therapy." },
      { speaker: '🐻 Barnaby', text: "Add a drizzle of wildflower honey and I am in heaven." }
    ]
  },

  space_mysteries: {
    id: 'space_mysteries',
    title: 'The 30-Minute Cosmic Riddles & Deep Signals',
    tag: 'Space Mysteries',
    dialogues: [
      { speaker: '🦊 Kitsune', text: "In 1977, the Big Ear telescope picked up the 'Wow!' signal: a 72-second narrow-band burst from Sagittarius." },
      { speaker: '🦉 Archimedes', text: "Signal-to-noise ratio of 30! It was never detected again, remaining one of astronomy's greatest enigmas." },
      { speaker: '🦖 Neo', text: "What if it was an alien saying 'Hey guys, we love your pizza!'?" },
      { speaker: '🦊 Kitsune', text: "At 1420 Megahertz—the exact hydrogen line frequency of the universe." },
      { speaker: '🦉 Archimedes', text: "Did you know that 95% of the universe is composed of dark matter and dark energy, invisible to all our instruments?" },
      { speaker: '🐢 Oogway', text: "We only see 5% of reality with our eyes. The rest is silent and mysterious." },
      { speaker: '🐱 Luna', text: "Cats have known about the invisible 95% for millennia. That's what we stare at." },
      { speaker: '🐶 Mochi', text: "If the universe is expanding faster and faster, where is it expanding into?" },
      { speaker: '🦉 Archimedes', text: "Space itself is stretching. It does not expand into pre-existing space; space itself is created." },
      { speaker: '🦖 Neo', text: "My dinosaur brain just exploded into sparkles." },
      { speaker: '🐧 Pebble', text: "Neutron stars are so dense that a single sugar-cube-sized chunk would weigh 1 billion tons on Earth!" },
      { speaker: '🐻 Barnaby', text: "Even a grizzly bear couldn't bench press a teaspoon of a neutron star." },
      { speaker: '🦉 Archimedes', text: "A neutron star also spins up to 700 times per second, blinking like a cosmic lighthouse." },
      { speaker: '🦊 Kitsune', text: "The universe is wilder and more magnificent than anything we could ever invent." }
    ]
  },

  ancient: {
    id: 'ancient',
    title: 'The 30-Minute Prehistoric Secrets Saga',
    tag: 'Ancient Secrets',
    dialogues: [
      { speaker: '🦖 Neo', text: "66 million years ago, dinosaurs ruled the Earth for 165 million years. Humans have only been here for 300,000!" },
      { speaker: '🦉 Archimedes', text: "In geological terms, humanity has existed for the blink of a cosmic eye." },
      { speaker: '🐢 Oogway', text: "Turtles swam in the oceans alongside plesiosaurs and watched the continents drift apart." },
      { speaker: '🐶 Mochi', text: "Oogway, did you personally know a Triceratops?!" },
      { speaker: '🐢 Oogway', text: "My ancient ancestors respected their three-horned majesty." },
      { speaker: '🦊 Kitsune', text: "Did you know birds are literally living theropod dinosaurs with feathers?" },
      { speaker: '🦉 Archimedes', text: "Indeed! Owls and eagles are modern raptors carrying dinosaur genetics." },
      { speaker: '🦖 Neo', text: "Archimedes, you are officially my long-lost feathery dinosaur cousin!" },
      { speaker: '🦉 Archimedes', text: "I shall accept this honorary Mesozoic pedigree, Neo." },
      { speaker: '🐻 Barnaby', text: "What about the ice age woolly mammoths? They had coats of fur three feet thick!" },
      { speaker: '🐰 Pip', text: "Imagine how fluffy a baby mammoth must have been." },
      { speaker: '🦝 Bandit', text: "The ancient world was filled with wonders that turned into stone and fossils for us to discover." }
    ]
  },

  ocean: {
    id: 'ocean',
    title: 'The 30-Minute Deep Ocean & Abyss Saga',
    tag: 'Deep Ocean',
    dialogues: [
      { speaker: '🦦 Ollie', text: "The Mariana Trench is 11,000 meters deep. Mount Everest could be submerged with 2 kilometers of water to spare!" },
      { speaker: '🦉 Archimedes', text: "At Challenger Deep, the hydrostatic pressure is over 1,000 atmospheres. Equivalent to an elephant standing on your thumb." },
      { speaker: '🐢 Oogway', text: "Yet in that pitch darkness, glowing creatures dance without a single care in the world." },
      { speaker: '🐱 Luna', text: "Bioluminescent squids that flash neon electric blue to communicate in the abyss!" },
      { speaker: '🐧 Pebble', text: "I can dive under icy Antarctic glaciers, but deep sea trenches are a whole different planet." },
      { speaker: '🦦 Ollie', text: "Hydrothermal vents spew mineral-rich water at 400 degrees Celsius, supporting entire chemosynthetic ecosystems." },
      { speaker: '🦉 Archimedes', text: "Life thriving without sunlight. A blueprint for how life might exist on Jupiter's icy moons." },
      { speaker: '🐻 Barnaby', text: "The ocean is Earth's largest living heart." }
    ]
  },

  chill: {
    id: 'chill',
    title: 'The 30-Minute Zen Meditation & Relaxation Saga',
    tag: 'Zen Relaxation',
    dialogues: [
      { speaker: '🐱 Luna', text: "Close your eyes for 10 seconds. Hear how peaceful the room is when you stop rushing?" },
      { speaker: '🦉 Archimedes', text: "In quiet moments, your subconscious organizes and stores everything learned today." },
      { speaker: '🦖 Neo', text: "It feels like recharging a battery from 10% to 100% without even plugging in." },
      { speaker: '🐢 Oogway', text: "Like a calm mountain lake reflecting the clear sky above." },
      { speaker: '🐼 Bao', text: "It takes great wisdom to sit still and do absolutely nothing for a while." },
      { speaker: '🐻 Barnaby', text: "Even bears hibernate through the winter to awaken refreshed for spring." },
      { speaker: '🐨 Koa', text: "Hanging from a tree branch without a single worry in the world." },
      { speaker: '🐱 Luna', text: "Purrrr... just breathe softly and let the minutes drift by." },
      { speaker: '🦉 Archimedes', text: "Shinrin-yoku—the Japanese art of forest bathing. Walking among pine trees reduces cortisol by 50%." },
      { speaker: '🦊 Kitsune', text: "I can smell the fresh cedar needles and morning dew just thinking about it." },
      { speaker: '🐻 Barnaby', text: "The forest breathes with us. Warm sunlight filtering through emerald canopies." },
      { speaker: '🐱 Luna', text: "A nap on soft mossy ground is the sweetest sleep in the world." },
      { speaker: '🦊 Kitsune', text: "Look at the night sky. Some of that starlight traveled millions of years just to reach your eyes right now." },
      { speaker: '🦉 Archimedes', text: "We are the universe contemplating its own beauty in real time." },
      { speaker: '🐶 Mochi', text: "And right now, the universe is taking a well-deserved 30-minute relaxation break." },
      { speaker: '🦖 Neo', text: "Best relaxation break in all of history!" },
      { speaker: '🐱 Luna', text: "Did you know a 20-second warm hug releases oxytocin and instantly calms your nervous system?" },
      { speaker: '🐶 Mochi', text: "Group animal hug right now! Everyone get in here!" },
      { speaker: '🐻 Barnaby', text: "Big cozy bear hug incoming for all of you!" },
      { speaker: '🐼 Bao', text: "Emotional temperature: maximum cozy and happy." },
      { speaker: '🐢 Oogway', text: "Inhale peace... exhale tension. The present moment is the only moment that truly exists." },
      { speaker: '🦉 Archimedes', text: "Let your mind settle like still water. Everything you need is already within you." }
    ]
  }
};

/**
 * Get Saga for a specific cluster topic
 */
export function getSagaForTopic(topicId) {
  return SAGA_TOPICS[topicId] || SAGA_TOPICS.planets;
}
