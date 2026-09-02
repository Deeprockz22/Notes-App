/**
 * 30-Minute Continuous 2-Companion Conversations
 * Pure 2-role dialogue (A and B): Perfectly bound to whichever two companions are standing in that cluster.
 * Zero outsider companions will ever interrupt!
 */

export const ANIMAL_CHARACTERS = [
  { id: 'cat', name: 'Luna', icon: '🐱', label: 'Cat' },
  { id: 'dog', name: 'Mochi', icon: '🐶', label: 'Shiba' },
  { id: 'owl', name: 'Archie', icon: '🦉', label: 'Owl' },
  { id: 'fox', name: 'Foxy', icon: '🦊', label: 'Fox' },
  { id: 'panda', name: 'Bao', icon: '🐼', label: 'Panda' },
  { id: 'bunny', name: 'Pip', icon: '🐰', label: 'Bunny' },
  { id: 'penguin', name: 'Pebble', icon: '🐧', label: 'Penguin' },
  { id: 'raccoon', name: 'Bandit', icon: '🦝', label: 'Raccoon' },
  { id: 'otter', name: 'Ollie', icon: '🦦', label: 'Otter' },
  { id: 'koala', name: 'Koa', icon: '🐨', label: 'Koala' },
  { id: 'frog', name: 'Kero', icon: '🐸', label: 'Frog' },
  { id: 'turtle', name: 'Toby', icon: '🐢', label: 'Turtle' },
  { id: 'hedgehog', name: 'Quill', icon: '🦔', label: 'Hedgehog' },
  { id: 'dino', name: 'Neo', icon: '🦖', label: 'Dino' },
  { id: 'bear', name: 'Barnaby', icon: '🐻', label: 'Bear' },
  { id: 'duck', name: 'Ducky', icon: '🦆', label: 'Duck' },
  { id: 'squirrel', name: 'Nutty', icon: '🐿️', label: 'Squirrel' }
];

export const SAGA_TOPICS = {
  planets: {
    id: 'planets',
    title: 'Space & Planets',
    tag: 'Space & Stars',
    dialogues: [
      { role: 'A', text: "Did you know Saturn's rings are mostly made of shiny ice chunks?" },
      { role: 'B', text: "Yep! Some parts are super thin, like a giant sheet of ice floating in space." },
      { role: 'A', text: "Wait... does that mean we could ice skate on Saturn's rings with tiny skates?!" },
      { role: 'B', text: "Haha! Only if we pack super warm jackets and hot cocoa!" },
      { role: 'A', text: "Look at the moon tonight, it looks like a giant glowing pancake." },
      { role: 'B', text: "Mmm, warm pancakes with syrup. Now I am hungry staring at the moon." },
      { role: 'A', text: "Did you know Pluto has a giant heart shape on its belly?" },
      { role: 'B', text: "Yes! It is tiny, but it is super cute and still floats around the sun." },
      { role: 'A', text: "They say it rains shiny diamonds deep inside Neptune!" },
      { role: 'B', text: "Diamonds from the sky?! I would bring a giant bucket to catch them!" },
      { role: 'A', text: "I would rather it rain soft fluffy pillows and warm sunbeams." },
      { role: 'B', text: "Sunsets on Mars are light blue, not orange like on Earth." },
      { role: 'A', text: "Blue sunsets sound so pretty! Like a magical fairy tale sky." },
      { role: 'B', text: "And you can jump three times higher on Mars because gravity is weak." },
      { role: 'A', text: "Imagine the giant hops we could do! Floating in mid-air!" },
      { role: 'B', text: "Look at that star twinkling right above us. It feels so peaceful out here." }
    ]
  },

  ghosts: {
    id: 'ghosts',
    title: 'Ghost Stories & Spooky Fun',
    tag: 'Spooky Vibes',
    dialogues: [
      { role: 'A', text: "Do you believe in friendly ghosts who just want some cookies?" },
      { role: 'B', text: "Definitely! Sometimes I stare at empty corners because a ghost is telling me a joke." },
      { role: 'A', text: "Why is that hallway corner always super cold at night?" },
      { role: 'B', text: "Maybe a little friendly ghost is sleeping there and forgot a blanket!" },
      { role: 'A', text: "We should leave a warm cup of cocoa and a cookie for the corner." },
      { role: 'B', text: "Haha, yes! Best way to make friends with a phantom." },
      { role: 'A', text: "One time, a book fell off my shelf all by itself!" },
      { role: 'B', text: "Ooh! Was it a spooky mystery story?!" },
      { role: 'A', text: "No, it was a cookbook with apple pie recipes!" },
      { role: 'B', text: "The ghost was hungry and dropped a hint for dessert!" },
      { role: 'A', text: "Whenever floorboards creak, what do you think it is?" },
      { role: 'B', text: "Just a happy little ghost doing a silent moonwalk dance." },
      { role: 'A', text: "I like friendly ghosts. They are like invisible sleepover buddies." },
      { role: 'B', text: "No need to fear the dark. The night is just resting time for the world." }
    ]
  },

  dreams: {
    id: 'dreams',
    title: 'Crazy Dreams',
    tag: 'Dreamland',
    dialogues: [
      { role: 'A', text: "I had the funniest dream last night! I was flying on a giant warm croissant!" },
      { role: 'B', text: "Was the sky raining chocolate drizzle?!" },
      { role: 'A', text: "YES! And every time I got hungry, I took a bite out of my croissant wings!" },
      { role: 'B', text: "Haha! You definitely went to bed thinking about breakfast snacks." },
      { role: 'A', text: "What did you dream about last night?" },
      { role: 'B', text: "I dreamt I had a magical lunchbox that never ran out of delicious treats!" },
      { role: 'A', text: "Did you ever have that dream where you fly just by flapping your arms?" },
      { role: 'B', text: "Yes! I floated over the garden and waved hello to all the birds." },
      { role: 'A', text: "I once dreamt I was hopping on pink clouds like a giant bouncy trampoline." },
      { role: 'B', text: "Dreams are like little cartoon movies our brains play while we rest." },
      { role: 'A', text: "I hope tonight we dream of an enchanted picnic under rainbow trees." },
      { role: 'B', text: "Save a spot on the picnic blanket for me!" }
    ]
  },

  funny: {
    id: 'funny',
    title: 'Funny Stuff Humans Do',
    tag: 'Funny Banter',
    dialogues: [
      { role: 'A', text: "Humans are so silly. They tap on tiny glass rectangles all day long." },
      { role: 'B', text: "Pocket rectangle, desk rectangle, TV rectangle! They love rectangles!" },
      { role: 'A', text: "And right now, they are looking at us inside their rectangle!" },
      { role: 'B', text: "Hi human! Remember to relax your shoulders and drink some water!" },
      { role: 'A', text: "Quick question: Is cereal just cold breakfast soup with crunchy bites?" },
      { role: 'B', text: "Haha! Calling cereal 'soup' feels so illegal, please don't!" },
      { role: 'A', text: "If you drop a berry in it, does it become sweet berry soup?" },
      { role: 'B', text: "If it drops on the floor, you know I am eating it in two seconds!" },
      { role: 'A', text: "Why do humans drive on parkways, but park on driveways?!" },
      { role: 'B', text: "Human words are full of funny little upside-down rules." },
      { role: 'A', text: "And why do people enter elevators and stare quietly at the ceiling?!" },
      { role: 'B', text: "They are trying not to make eye contact! It is so funny." },
      { role: 'A', text: "If I was in an elevator with you, I would tell a goofy joke." },
      { role: 'B', text: "And I would giggle until the elevator reached the top floor!" }
    ]
  },

  serious: {
    id: 'serious',
    title: 'Peace of Mind & Calm',
    tag: 'Peace of Mind',
    dialogues: [
      { role: 'A', text: "You know what is nice? Taking your time and not rushing through the day." },
      { role: 'B', text: "The slow turtle walks softly, but always gets to the finish line right on time." },
      { role: 'A', text: "Rest is not something we have to earn. We deserve to rest just to feel peaceful." },
      { role: 'B', text: "When you sit quietly, your mind becomes as calm and clear as pure water." },
      { role: 'A', text: "Holding onto worry is like holding a heavy rock. It feels so good to put it down." },
      { role: 'B', text: "Taking a slow deep breath right now resets your whole mood." },
      { role: 'A', text: "Big strong trees grow slowly, one quiet leaf at a time." },
      { role: 'B', text: "So be patient and gentle with yourself today." },
      { role: 'A', text: "The stars have been shining for millions of years. Today's worries will pass." },
      { role: 'B', text: "Smile, breathe, and enjoy this quiet moment together." }
    ]
  },

  food: {
    id: 'food',
    title: 'Snacks & Yummy Food',
    tag: 'Yummy Snacks',
    dialogues: [
      { role: 'A', text: "The smell of freshly brewed coffee in the morning is pure happiness." },
      { role: 'B', text: "With warm oat milk, a dash of cinnamon, and a crunchy biscuit on the side!" },
      { role: 'A', text: "What about a warm bowl of noodles on a cold rainy afternoon?" },
      { role: 'B', text: "Steaming hot ramen with a soft egg and tasty broth! The best comfort food." },
      { role: 'A', text: "I could eat an entire cheesy pizza in thirty seconds flat." },
      { role: 'B', text: "Make sure you save the pizza crust for me, crust is the best part!" },
      { role: 'A', text: "Warm chocolate chip cookies fresh out of the oven are pure magic." },
      { role: 'B', text: "With warm, gooey melted chocolate in the center!" },
      { role: 'A', text: "And crunchy potato chips by the fireplace while watching the rain." },
      { role: 'B', text: "Food shared with a good friend always tastes ten times better." }
    ]
  },

  space_mysteries: {
    id: 'space_mysteries',
    title: 'Cosmic Riddles & Starlight',
    tag: 'Star Riddles',
    dialogues: [
      { role: 'A', text: "Where does starlight go when it travels across the dark night sky?" },
      { role: 'B', text: "It travels for millions of years until it lands right here in our eyes!" },
      { role: 'A', text: "So when we look at that star, we are seeing light from ancient times?!" },
      { role: 'B', text: "Yes! Looking up at the night sky is like looking through a time machine." },
      { role: 'A', text: "Are there friendly little alien critters on other planets looking back at us?" },
      { role: 'B', text: "I bet there are! Maybe waving their paws at us right now." },
      { role: 'A', text: "Shooting stars are actually tiny space pebbles making wish trails." },
      { role: 'B', text: "Quick, make a wish! I wish for endless sunny days and cozy naps!" },
      { role: 'A', text: "The universe is big and cozy. We are so lucky to share this little world." },
      { role: 'B', text: "Right here with you, looking at the stars." }
    ]
  },

  ancient: {
    id: 'ancient',
    title: 'Dinosaurs & Ancient Earth',
    tag: 'Dino Tales',
    dialogues: [
      { role: 'A', text: "Dinosaurs lived on Earth for millions of years with giant fern forests!" },
      { role: 'B', text: "Did you know birds are actually tiny modern dinosaurs with feathers?" },
      { role: 'A', text: "That means an owl or a duck is technically related to a T-Rex!" },
      { role: 'B', text: "Haha! Imagine a T-Rex trying to quack like a duck!" },
      { role: 'A', text: "Sea turtles have been swimming in the oceans since dinosaur times." },
      { role: 'B', text: "Turtles have been chilling on sunny beaches for millions of years!" },
      { role: 'A', text: "And woolly mammoths had giant fluffy coats of fur to stay warm in the snow." },
      { role: 'B', text: "A giant fluffy elephant! I wish I could give a baby mammoth a warm hug." }
    ]
  },

  ocean: {
    id: 'ocean',
    title: 'Deep Ocean & Glowing Fish',
    tag: 'Deep Ocean',
    dialogues: [
      { role: 'A', text: "The ocean is so deep, there are entire mountain ranges hidden underwater!" },
      { role: 'B', text: "And gentle sea creatures gliding peacefully along warm ocean currents." },
      { role: 'A', text: "Down in the deep dark ocean, the fish actually glow with neon blue lights!" },
      { role: 'B', text: "Like little swimming nightlights in the deep sea abyss." },
      { role: 'A', text: "Whales sing long beautiful songs that travel across entire oceans." },
      { role: 'B', text: "I wonder what whales sing about? Probably about how refreshing the water feels." },
      { role: 'A', text: "The sound of gentle ocean waves rolling on the sand is so calming." },
      { role: 'B', text: "It washes all the busy thoughts away, leaving only peace." }
    ]
  },

  chill: {
    id: 'chill',
    title: 'Relax & Cozy Vibes',
    tag: 'Cozy Relaxation',
    dialogues: [
      { role: 'A', text: "Take a nice deep breath in... and let all the tension melt away." },
      { role: 'B', text: "Right now, you don't have to do anything at all. Just relax." },
      { role: 'A', text: "It feels so good to just sit here with you and watch the clock tick down." },
      { role: 'B', text: "Like sitting on a warm grassy hill watching the fluffy clouds drift past." },
      { role: 'A', text: "Soft pillows, warm blankets, and zero rushing around." },
      { role: 'B', text: "Taking time to rest recharges your heart and brings back your smile." },
      { role: 'A', text: "I am sending a big warm friendly hug to everyone taking a break right now." },
      { role: 'B', text: "Let your mind feel light and peaceful, like a floating feather." },
      { role: 'A', text: "You did great today. Now just enjoy this quiet moment." },
      { role: 'B', text: "Purrrr... resting together is the best." }
    ]
  }
};

export function getSagaForTopic(topicId) {
  return SAGA_TOPICS[topicId] || SAGA_TOPICS.planets;
}
