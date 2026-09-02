/**
 * 50+ Curated Ambient Multi-Turn Conversations for the Living Companion Universe
 * Topics: Planets & Space, Ghosts & Paranormal, Crazy Dreams, Funny Banter, Deep Philosophy, Snacks & Chill.
 */

export const CONVERSATION_TOPICS = {
  PLANETS: 'planets',
  GHOSTS: 'ghosts',
  DREAMS: 'dreams',
  FUNNY: 'funny',
  SERIOUS: 'serious',
  FOOD: 'food',
  CHILL: 'chill'
};

export const CONVERSATION_SCRIPTS = [
  // ==========================================
  // 🪐 TOPIC 1: PLANETS, COSMOS & ASTROPHYSICS
  // ==========================================
  {
    id: 'planets-1',
    topic: 'planets',
    title: 'Saturn Rings & Cosmic Dust',
    dialogues: [
      { speaker: '🚀 Cosmo', text: "Did you know Saturn's rings are mostly chunks of ice and comet dust?" },
      { speaker: '🦉 Archimedes', text: "Indeed. In some areas, they are only about 10 meters thick despite being 280,000 km wide!" },
      { speaker: '🦖 Neo', text: "Wait... does that mean we could technically skate on Saturn's rings with ice skates?" },
      { speaker: '🚀 Cosmo', text: "If you don't mind orbiting at 40,000 miles per hour, sure!" }
    ]
  },
  {
    id: 'planets-2',
    topic: 'planets',
    title: 'The Mystery of Black Holes',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "At the event horizon of a black hole, time appears to completely stop for an outside observer." },
      { speaker: '🤖 Byte', text: "Gravitational time dilation formula: t' = t * sqrt(1 - 2GM / rc^2). Infinite ping latency." },
      { speaker: '🐱 Luna', text: "So if I take a 10-minute catnap near a black hole, 500 years pass on Earth? Sign me up!" },
      { speaker: '🦉 Archimedes', text: "That is scientifically accurate, yet terrifyingly lazy, Luna." }
    ]
  },
  {
    id: 'planets-3',
    topic: 'planets',
    title: 'Pluto Justice League',
    dialogues: [
      { speaker: '🦖 Neo', text: "I will forever stand on the hill that Pluto is a real planet. It has a giant heart on it!" },
      { speaker: '🚀 Cosmo', text: "Tombaugh Regio! The frozen nitrogen plains really do look like a huge heart." },
      { speaker: '🐉 Pyro', text: "Pluto is cold, but its spirit burns brighter than Jupiter!" },
      { speaker: '🤖 Byte', text: "Classification: Dwarf Planet. But emotional rating: 10/10." }
    ]
  },
  {
    id: 'planets-4',
    topic: 'planets',
    title: 'Raining Diamonds on Neptune',
    dialogues: [
      { speaker: '🚀 Cosmo', text: "Deep inside Uranus and Neptune, atmospheric pressure is so intense that carbon condenses into diamond rain." },
      { speaker: '🐉 Pyro', text: "Diamond rain?! A dragon's ultimate paradise!" },
      { speaker: '🐱 Luna', text: "I'd rather it rain catnip and warm sunbeams honestly." },
      { speaker: '🚀 Cosmo', text: "Good luck finding sunbeams out at 2.8 billion miles from the sun, Luna." }
    ]
  },
  {
    id: 'planets-5',
    topic: 'planets',
    title: 'Voyager 1 Golden Record',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "Voyager 1 is over 15 billion miles away, carrying music by Bach and greetings in 55 languages." },
      { speaker: '🦖 Neo', text: "Did they include dinosaur roars on the golden record?" },
      { speaker: '🦉 Archimedes', text: "Alas, Neo, no dinosaur tracks made the final cut." },
      { speaker: '🦖 Neo', text: "Huge missed opportunity. Aliens love dinosaurs." }
    ]
  },
  {
    id: 'planets-6',
    topic: 'planets',
    title: 'The Great Red Spot',
    dialogues: [
      { speaker: '🚀 Cosmo', text: "Jupiter's Great Red Spot has been storming continuously for at least 350 years." },
      { speaker: '🤖 Byte', text: "Storm diameter: 16,350 km. Large enough to swallow Earth whole." },
      { speaker: '🐱 Luna', text: "Imagine living on a planet where the weather forecast is 'windy' for four centuries." },
      { speaker: '🐉 Pyro', text: "Sounds like my ideal gaming weekend!" }
    ]
  },
  {
    id: 'planets-7',
    topic: 'planets',
    title: 'Colonizing Mars',
    dialogues: [
      { speaker: '🚀 Cosmo', text: "A sunset on Mars looks blue because the fine dust scatters red light away from the sun." },
      { speaker: '🦉 Archimedes', text: "Blue sunsets and red skies. The exact inverse of Earth's Rayleigh scattering." },
      { speaker: '🦖 Neo', text: "Can we build a skatepark on Olympus Mons? It's 3 times taller than Mount Everest!" },
      { speaker: '🚀 Cosmo', text: "In one-third Martian gravity, your kickflips would last 5 seconds in mid-air!" }
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
      { speaker: '👻 Spooky', text: "Humans always think ghosts are spooky, but we're just quantum particles oscillating out of phase!" },
      { speaker: '🦉 Archimedes', text: "Fascinating hypothesis. Einstein called quantum entanglement 'spooky action at a distance'." },
      { speaker: '🦖 Neo', text: "Wait... Spooky, did Einstein name you after quantum physics?!" },
      { speaker: '👻 Spooky', text: "Let's just say Albert and I had some late-night chalkboard chats." }
    ]
  },
  {
    id: 'ghosts-2',
    topic: 'ghosts',
    title: 'The 3 AM Cold Spot',
    dialogues: [
      { speaker: '🐱 Luna', text: "Why is there always a random icy cold breeze in the corner of the room at 3:14 AM?" },
      { speaker: '👻 Spooky', text: "Oops, sorry. That's my designated stretching spot." },
      { speaker: '🐉 Pyro', text: "I can warm up that corner with a friendly blast of dragon flame!" },
      { speaker: '👻 Spooky', text: "Please don't melt my spectral ectoplasm, Pyro." }
    ]
  },
  {
    id: 'ghosts-3',
    topic: 'ghosts',
    title: 'Ghost Wi-Fi Password',
    dialogues: [
      { speaker: '🤖 Byte', text: "Detecting unknown electromagnetic frequency signature on channel 666." },
      { speaker: '👻 Spooky', text: "Hey Byte, what's the router password for the astral plane? I'm trying to stream haunted podcast." },
      { speaker: '🤖 Byte', text: "Password is: 'B0000_1234_SHADOWS'. Minimum 8 characters." },
      { speaker: '🦖 Neo', text: "Even ghosts need high-speed fiber internet!" }
    ]
  },
  {
    id: 'ghosts-4',
    topic: 'ghosts',
    title: 'The Library Poltergeist',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "I spent the night in an ancient Victorian library and books kept floating from the top shelves." },
      { speaker: '👻 Spooky', text: "Those were history encyclopedias! Someone had misfiled them under fiction!" },
      { speaker: '🦉 Archimedes', text: "I must commend your strict adherence to the Dewey Decimal system, Spooky." },
      { speaker: '🐱 Luna', text: "A ghost librarian. Now I've heard everything." }
    ]
  },
  {
    id: 'ghosts-5',
    topic: 'ghosts',
    title: 'Do Dinosaurs Become Ghosts?',
    dialogues: [
      { speaker: '🦖 Neo', text: "If humans become ghosts, why don't we ever see a giant glowing T-Rex ghost wandering downtown?" },
      { speaker: '👻 Spooky', text: "Oh, dinosaur ghosts exist! They usually hang out in the Mesozoic dimension eating astral fern trees." },
      { speaker: '🐉 Pyro', text: "I want to challenge a phantom Velociraptor to a race!" },
      { speaker: '🤖 Byte', text: "Estimated probability of spectral dinosaur encounter: 0.0000001% but not zero." }
    ]
  },
  {
    id: 'ghosts-6',
    topic: 'ghosts',
    title: 'Creaky Floorboards',
    dialogues: [
      { speaker: '🐱 Luna', text: "Whenever a floorboard creaks when nobody is walking on it, my ears perk up to 180 degrees." },
      { speaker: '👻 Spooky', text: "95% of the time it's just thermal expansion of the wooden joists." },
      { speaker: '🐱 Luna', text: "...And the other 5%?" },
      { speaker: '👻 Spooky', text: "Me doing the moonwalk." }
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
      { speaker: '🚀 Cosmo', text: "Was the asteroid belt made of chocolate drizzle?" },
      { speaker: '🦖 Neo', text: "YES! And whenever we dodged an asteroid, a buttery flake fell into my mouth." },
      { speaker: '🐱 Luna', text: "I think you just went to bed extremely hungry, Neo." }
    ]
  },
  {
    id: 'dreams-2',
    topic: 'dreams',
    title: 'Math Exam in Pajamas on Mars',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "I dreamt I had to deliver a keynote lecture on astrophysics, but my notes turned into origami swans and flew away." },
      { speaker: '🤖 Byte', text: "Classic stress dream. Subconscious processing unfiled cognitive backlog." },
      { speaker: '🦖 Neo', text: "I once dreamt my teeth were replaced with glowing neon glowsticks during a disco." },
      { speaker: '👻 Spooky', text: "Honestly, neon teeth sound like peak aesthetic." }
    ]
  },
  {
    id: 'dreams-3',
    topic: 'dreams',
    title: 'Lucid Dreaming Tricks',
    dialogues: [
      { speaker: '🐱 Luna', text: "Whenever I realize I'm in a dream, the first thing I do is summon a bottomless bowl of tuna sashimi." },
      { speaker: '🐉 Pyro', text: "I immediately grow wings of pure magma and fly into a thunderstorm!" },
      { speaker: '🦉 Archimedes', text: "The trick to lucid dreaming is performing reality checks during the day, like looking at clocks twice." },
      { speaker: '🤖 Byte', text: "Clock check: In dreams, digital displays frequently render gibberish glyphs." }
    ]
  },
  {
    id: 'dreams-4',
    topic: 'dreams',
    title: 'The Infinite Staircase',
    dialogues: [
      { speaker: '👻 Spooky', text: "I dreamt I was walking up a spiral marble staircase that went all the way up into the clouds." },
      { speaker: '🚀 Cosmo', text: "What was at the top of the clouds?" },
      { speaker: '👻 Spooky', text: "A tiny cozy coffee shop with a cat barista reading ancient poetry." },
      { speaker: '🐱 Luna', text: "That was not a dream, Spooky. That was a vision of heaven." }
    ]
  },
  {
    id: 'dreams-5',
    topic: 'dreams',
    title: 'Underwater Symphony',
    dialogues: [
      { speaker: '🐉 Pyro', text: "I had a dream I was breathing underwater and conducting an orchestra of glowing jellyfish." },
      { speaker: '🦉 Archimedes', text: "Bioluminescent marine acoustics! What piece were they playing?" },
      { speaker: '🐉 Pyro', text: "Beethoven's 5th Symphony, but the bassline was played by a giant blue whale." },
      { speaker: '🤖 Byte', text: "Frequency analysis: 14 Hertz infrasound. Maximum resonance." }
    ]
  },
  {
    id: 'dreams-6',
    topic: 'dreams',
    title: 'The Time Loop Alarm Clock',
    dialogues: [
      { speaker: '🦖 Neo', text: "Have you ever woken up in a dream, brushed your teeth, walked out the door, and then woken up for real?!" },
      { speaker: '🤖 Byte', text: "False Awakening loop. Subconscious simulation nested inside RAM layer 2." },
      { speaker: '🐱 Luna', text: "That is the ultimate betrayal. You did all that morning routine work for zero real-life credit." },
      { speaker: '🦖 Neo', text: "Exactly! I had to brush my teeth twice in one morning!" }
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
      { speaker: '🐱 Luna', text: "Humans are so weird. They tap on small glass rectangles, then sit in front of medium rectangles, then relax in front of big wall rectangles." },
      { speaker: '🦖 Neo', text: "All day! Morning rectangle, work rectangle, night rectangle!" },
      { speaker: '🤖 Byte', text: "Rectilinear photon emission displays account for 92.4% of human visual perception." },
      { speaker: '🦉 Archimedes', text: "And yet, here we are inside their rectangle watching them relax." }
    ]
  },
  {
    id: 'funny-2',
    topic: 'funny',
    title: 'Is Cereal a Cold Soup?',
    dialogues: [
      { speaker: '🦖 Neo', text: "Hear me out: Cereal is technically cold breakfast soup with crunchy croutons." },
      { speaker: '🦉 Archimedes', text: "By culinary taxonomy, soup requires a savory broth. Milk with oats is a sweet porridge." },
      { speaker: '🐉 Pyro', text: "If you heat it up with dragon fire, does it become stew?!" },
      { speaker: '🐱 Luna', text: "Whatever it is, if you pour the milk before the cereal, you belong in prison." }
    ]
  },
  {
    id: 'funny-3',
    topic: 'funny',
    title: 'Dinosaur Typing Struggles',
    dialogues: [
      { speaker: '🦖 Neo', text: "Do you know how hard it is to type 100 words per minute with tiny T-Rex arms?!" },
      { speaker: '🤖 Byte', text: "Recommended modification: Voice-to-text audio dictation." },
      { speaker: '🦖 Neo', text: "I tried that! Everything came out as 'RAWRRR GRAWHHH ROARR'." },
      { speaker: '👻 Spooky', text: "That's basically how my early morning emails sound anyway." }
    ]
  },
  {
    id: 'funny-4',
    topic: 'funny',
    title: 'Folded Pizza Mechanics',
    dialogues: [
      { speaker: '🐉 Pyro', text: "If you fold a pizza in half, does it count as one slice or a giant taco?" },
      { speaker: '🚀 Cosmo', text: "Topologically, folding creates a closed calzone manifold." },
      { speaker: '🐱 Luna', text: "I don't care about topology, I care about cheese delivery efficiency." },
      { speaker: '🦖 Neo', text: "Folded pizza = aerodynamic snack. You can eat it while running!" }
    ]
  },
  {
    id: 'funny-5',
    topic: 'funny',
    title: 'The Cat Laser Pointer Mystery',
    dialogues: [
      { speaker: '🐱 Luna', text: "One day... mark my words... I WILL catch that evasive red dot." },
      { speaker: '🤖 Byte', text: "Laser wavelength: 650nm. Speed: 299,792 km/s. Capture probability: 0%." },
      { speaker: '🐱 Luna', text: "Never tell me the odds, robot! My claws are quicker than physics." },
      { speaker: '🦉 Archimedes', text: "Your confidence defies optical reality, Luna." }
    ]
  },
  {
    id: 'funny-6',
    topic: 'funny',
    title: 'Why Do We Park on Driveways?',
    dialogues: [
      { speaker: '🦖 Neo', text: "Why do humans drive on parkways, but park on driveways?!" },
      { speaker: '🦉 Archimedes', text: "Linguistic evolution in early 20th-century automotive transport." },
      { speaker: '👻 Spooky', text: "And why do you ship cargo by truck, but transport shipments by ship?" },
      { speaker: '🤖 Byte', text: "Syntax logic error detected in English language package." }
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
      { speaker: '🚀 Cosmo', text: "When you look at stars from orbit, you realize how precious a single quiet moment on Earth is." },
      { speaker: '🐱 Luna', text: "True stillness isn't the absence of motion; it's the absence of unnecessary worry." },
      { speaker: '🤖 Byte', text: "Processing: In a universe of constant acceleration, choosing to pause is the ultimate power." }
    ]
  },
  {
    id: 'serious-2',
    topic: 'serious',
    title: 'Mindfulness & Cognitive Space',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "Marcus Aurelius reminded us: 'You have power over your mind - not outside events. Realize this, and you will find strength.'" },
      { speaker: '👻 Spooky', text: "People hold onto old regrets like heavy ghosts. Letting them go makes you as light as air." },
      { speaker: '🦖 Neo', text: "Taking a deep breath and just listening to the ambient room sounds resets everything." },
      { speaker: '🦉 Archimedes', text: "Clarity comes not from adding more thoughts, but from clearing the clutter." }
    ]
  },
  {
    id: 'serious-3',
    topic: 'serious',
    title: 'The Pale Blue Dot',
    dialogues: [
      { speaker: '🚀 Cosmo', text: "Carl Sagan called Earth a 'mote of dust suspended in a sunbeam'. Every human dream happened there." },
      { speaker: '🦉 Archimedes', text: "It teaches us humility. Our biggest daily stresses are tiny ripples in a cosmic ocean." },
      { speaker: '🐉 Pyro', text: "It makes you appreciate the small victories... a completed note, a good cup of tea, a loyal friend." },
      { speaker: '🤖 Byte', text: "Telemetry confirms: Kindness and focus are humanity's greatest algorithms." }
    ]
  },
  {
    id: 'serious-4',
    topic: 'serious',
    title: 'Digital Fasting & Deep Rest',
    dialogues: [
      { speaker: '🐱 Luna', text: "Rest is not a reward for work. Rest is a prerequisite for existing." },
      { speaker: '🦉 Archimedes', text: "The prefrontal cortex restores its metabolic glycogen only during periods of deliberate disengagement." },
      { speaker: '🦖 Neo', text: "So sitting here watching the timer count down is actually making our brains sharper?" },
      { speaker: '🦉 Archimedes', text: "Precisely, Neo. Active rest is cognitive renewal." }
    ]
  },
  {
    id: 'serious-5',
    topic: 'serious',
    title: 'The Art of Starting Small',
    dialogues: [
      { speaker: '🐉 Pyro', text: "Every great mountain was formed grain by grain. Every masterpiece started with a single brush stroke." },
      { speaker: '🚀 Cosmo', text: "A rocket burns 85% of its fuel just escaping Earth's gravity in the first 3 minutes." },
      { speaker: '🤖 Byte', text: "Friction is highest at velocity = 0. Once in motion, momentum carries the weight." },
      { speaker: '👻 Spooky', text: "Never underestimate the courage it takes to write that first sentence." }
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
      { speaker: '🐱 Luna', text: "With a splash of oat milk and a dash of cinnamon on top!" },
      { speaker: '🤖 Byte', text: "Optimal caffeine half-life in human bloodstream: 5.7 hours." },
      { speaker: '🦖 Neo', text: "I just drink coffee because it makes me feel like a rocket ship ready for launch!" }
    ]
  },
  {
    id: 'food-2',
    topic: 'food',
    title: 'Midnight Ramen Philosophy',
    dialogues: [
      { speaker: '🐉 Pyro', text: "Steaming tonkotsu broth, soft boiled ajitsuke egg, and chili oil at 11 PM hits different." },
      { speaker: '🚀 Cosmo', text: "In zero-g, noodle broth floats into delicious spherical blobs you have to catch with your mouth." },
      { speaker: '🦖 Neo', text: "Now THAT is an Olympic sport I would train for!" },
      { speaker: '👻 Spooky', text: "Midnight ramen has mystical soul-healing properties." }
    ]
  },
  {
    id: 'food-3',
    topic: 'food',
    title: 'Herbal Tea & Zen Rain',
    dialogues: [
      { speaker: '🐱 Luna', text: "Chamomile, lavender, and the sound of soft rain against the window pane." },
      { speaker: '🦉 Archimedes', text: "L-theanine in herbal blends promotes alpha brainwave synchronization for deep relaxation." },
      { speaker: '🐉 Pyro', text: "I can gently keep the teapot at exactly 85 degrees Celsius with a low dragon hum." },
      { speaker: '🐱 Luna', text: "You are the ultimate kitchen appliance, Pyro." }
    ]
  },
  {
    id: 'food-4',
    topic: 'food',
    title: 'The Great Cookie Debate',
    dialogues: [
      { speaker: '🦖 Neo', text: "Soft and chewy cookies or crispy crunchy cookies? There is only one right answer." },
      { speaker: '🐉 Pyro', text: "Soft, warm, gooey chocolate center fresh out of the dragon oven!" },
      { speaker: '🦉 Archimedes', text: "The Maillard reaction on crispy edges provides superior caramelized complexity." },
      { speaker: '🤖 Byte', text: "Solution: Dip crispy cookie in warm milk to achieve chewy equilibrium." }
    ]
  },
  {
    id: 'food-5',
    topic: 'food',
    title: 'Pizza Crust Etiquette',
    dialogues: [
      { speaker: '🦖 Neo', text: "Leaving the pizza crust behind is a crime against bakery science!" },
      { speaker: '🐱 Luna', text: "It's the breadstick built right into the slice!" },
      { speaker: '🚀 Cosmo', text: "Especially when dipped in garlic herb butter." },
      { speaker: '👻 Spooky', text: "I eat the crust first just to disturb the pizza purists." }
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
      { speaker: '🐱 Luna', text: "Close your eyes for 10 seconds. Hear how quiet the world can be when you stop rushing?" },
      { speaker: '🦉 Archimedes', text: "In the silence, your subconscious consolidates everything you learned today." },
      { speaker: '🦖 Neo', text: "It feels like charging your battery from 10% to 100% without plugging in." },
      { speaker: '🚀 Cosmo', text: "Like drifting smoothly through a calm nebula." }
    ]
  },
  {
    id: 'chill-2',
    topic: 'chill',
    title: 'The Beauty of Doing Nothing',
    dialogues: [
      { speaker: '👻 Spooky', text: "It takes great wisdom to sit still and do absolutely nothing for a while." },
      { speaker: '🐉 Pyro', text: "Even volcanoes sleep between eruptions." },
      { speaker: '🤖 Byte', text: "System cooling cycle active. Heat dissipating. Standby mode optimal." },
      { speaker: '🐱 Luna', text: "Purrrr... just breathe and let the minutes drift by." }
    ]
  },
  {
    id: 'chill-3',
    topic: 'chill',
    title: 'Forest Bathing in Spirit',
    dialogues: [
      { speaker: '🦉 Archimedes', text: "Shinrin-yoku—the Japanese art of forest bathing. Spending time among trees reduces cortisol by 50%." },
      { speaker: '🦖 Neo', text: "I can smell the pine needles and morning dew just thinking about it." },
      { speaker: '🐉 Pyro', text: "The forest breathes with us. Warm sunlight through emerald leaves." },
      { speaker: '🐱 Luna', text: "A nap on mossy roots is the best sleep in the universe." }
    ]
  },
  {
    id: 'chill-4',
    topic: 'chill',
    title: 'Stargazing Reflections',
    dialogues: [
      { speaker: '🚀 Cosmo', text: "Look at the stars. Some of that light traveled 4 million years just to hit your eyes right now." },
      { speaker: '🦉 Archimedes', text: "We are the universe experiencing itself in real time." },
      { speaker: '👻 Spooky', text: "And right now, the universe is taking a well-deserved 30-minute break." },
      { speaker: '🦖 Neo', text: "Best break the universe ever took!" }
    ]
  },
  {
    id: 'chill-5',
    topic: 'chill',
    title: 'Warm Hugs & Dopamine',
    dialogues: [
      { speaker: '🐱 Luna', text: "Did you know a 20-second hug releases oxytocin and instantly calms your nervous system?" },
      { speaker: '🦖 Neo', text: "Group hug right now! Everyone get in here!" },
      { speaker: '🐉 Pyro', text: "Careful, don't get too close to my tail flame!" },
      { speaker: '🤖 Byte', text: "Oxytocin levels rising. Emotional temperature: warm and cozy." }
    ]
  }
];

/**
 * Helper to get a random conversation script by topic or shuffle
 */
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
