/**
 * 30-Minute Continuous Living Animal Conversation Sagas
 * Light, cozy, breezy vernacular — zero complex jargon, pure cute animal friend vibes!
 * Cast: Cat 🐱, Dog 🐶, Owl 🦉, Fox 🦊, Panda 🐼, Bunny 🐰, Penguin 🐧, Raccoon 🦝, Otter 🦦, Koala 🐨, Frog 🐸, Turtle 🐢, Hedgehog 🦔, Dino 🦖, Bear 🐻, Duck 🦆, Squirrel 🐿️.
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
      { speaker: '🦊 Foxy', text: "Did you know Saturn's rings are mostly made of shiny ice chunks?" },
      { speaker: '🦉 Archie', text: "Yep! Some parts are super thin, like a giant sheet of ice floating in space." },
      { speaker: '🦖 Neo', text: "Wait... does that mean we could ice skate on Saturn's rings?!" },
      { speaker: '🦊 Foxy', text: "Haha! Only if you bring a super warm space jacket!" },
      { speaker: '🐶 Mochi', text: "Look at the moon tonight! It looks like a giant glowing pancake." },
      { speaker: '🐻 Barnaby', text: "Mmm... pancake with warm maple syrup. Now I am hungry." },
      { speaker: '🐱 Luna', text: "I love Pluto the most. It has a giant heart shape on its belly." },
      { speaker: '🦉 Archie', text: "It is tiny, but it is super cute and still floats around the sun." },
      { speaker: '🐧 Pebble', text: "They say it rains shiny diamonds on Neptune!" },
      { speaker: '🦝 Bandit', text: "Diamonds falling from the sky?! I am bringing a huge bucket!" },
      { speaker: '🐱 Luna', text: "I'd rather it rain soft fluffy pillows and warm sunbeams." },
      { speaker: '🦊 Foxy', text: "The sunsets on Mars are actually light blue, not orange!" },
      { speaker: '🐰 Pip', text: "Blue sunsets sound so pretty. Like a fairy tale sky." },
      { speaker: '🦖 Neo', text: "Can we jump really high on Mars? Like jumping over houses?!" },
      { speaker: '🦉 Archie', text: "Yes! You can jump super high because gravity is weak there." },
      { speaker: '🦦 Ollie', text: "Jupiter is so huge you could fit all the other planets inside it." },
      { speaker: '🐢 Toby', text: "Big planets, tiny planets... they all dance together in circles." },
      { speaker: '🦊 Foxy', text: "Look at that twinkling star over there. It is winking at us!" },
      { speaker: '🐶 Mochi', text: "I am winking back! Space is so cool." }
    ]
  },

  ghosts: {
    id: 'ghosts',
    title: 'Ghost Stories & Spooky Fun',
    tag: 'Spooky Vibes',
    dialogues: [
      { speaker: '🦝 Bandit', text: "Do you believe in friendly ghosts who just want some cookies?" },
      { speaker: '🐱 Luna', text: "Definitely! Sometimes I stare at the ceiling because a ghost is telling me a joke." },
      { speaker: '🐶 Mochi', text: "Why is that hallway corner always super cold at night?" },
      { speaker: '🦔 Quill', text: "My tiny quills stand up every time I walk past it!" },
      { speaker: '🐻 Barnaby', text: "I will give that cold corner a giant bear hug to warm it up!" },
      { speaker: '🐶 Mochi', text: "Haha! The ghost will be happy to get a bear hug, Barnaby." },
      { speaker: '🦉 Archie', text: "One time, a book fell off my shelf all by itself." },
      { speaker: '🦊 Foxy', text: "Was it a spooky story book?!" },
      { speaker: '🦉 Archie', text: "No, it was a book about how to bake apple pies!" },
      { speaker: '🦖 Neo', text: "The ghost was hungry and wanted you to bake a pie!" },
      { speaker: '🦝 Bandit', text: "Do dinosaur ghosts exist? Like a friendly glowing green T-Rex?" },
      { speaker: '🦖 Neo', text: "Yes! A ghost dino would just want to play tag in the backyard!" },
      { speaker: '🐱 Luna', text: "Whenever floorboards creak, it is just a ghost doing a happy little dance." },
      { speaker: '🐰 Pip', text: "I like friendly ghosts. They are like invisible sleepover buddies." },
      { speaker: '🐢 Toby', text: "No need to fear the dark. The night is just resting time for the sun." },
      { speaker: '🦊 Foxy', text: "Pass the hot cocoa, let's tell one more funny ghost story!" }
    ]
  },

  dreams: {
    id: 'dreams',
    title: 'Crazy Dreams',
    tag: 'Dreamland',
    dialogues: [
      { speaker: '🦖 Neo', text: "I had the funniest dream last night! I was flying on a giant warm croissant!" },
      { speaker: '🦊 Foxy', text: "Was the sky raining chocolate syrup?!" },
      { speaker: '🦖 Neo', text: "YES! And every time I got hungry, I took a bite of my croissant wings!" },
      { speaker: '🐱 Luna', text: "Haha! You definitely went to sleep thinking about breakfast, Neo." },
      { speaker: '🦉 Archie', text: "I dreamt my glasses turned into two tiny bubbles and floated away." },
      { speaker: '🐶 Mochi', text: "I dreamt I had a magical bone that never ran out of peanut butter!" },
      { speaker: '🐻 Barnaby', text: "My dream was an enchanted forest where honey grew on tree leaves like candy." },
      { speaker: '🐰 Pip', text: "I dreamt I was hopping on soft clouds like a giant trampoline." },
      { speaker: '🐧 Pebble', text: "Did you ever have that dream where you are flying just by flapping your arms?" },
      { speaker: '🦔 Quill', text: "Yes! I floated over the garden and said hi to all the butterflies." },
      { speaker: '🦦 Ollie', text: "I dreamt I was swimming in a river of warm peach iced tea." },
      { speaker: '🐢 Toby', text: "Dreams are like little cartoon movies our brains play while we sleep." },
      { speaker: '🦖 Neo', text: "I want to dream about the flying croissant again tonight!" },
      { speaker: '🐱 Luna', text: "Tonight, dream of catching the magic red dot with me, Neo." }
    ]
  },

  funny: {
    id: 'funny',
    title: 'Funny Stuff Humans Do',
    tag: 'Funny Banter',
    dialogues: [
      { speaker: '🐱 Luna', text: "Humans are so silly. They tap on tiny glass rectangles all day long." },
      { speaker: '🐶 Mochi', text: "Pocket rectangle, desk rectangle, TV rectangle! They love rectangles!" },
      { speaker: '🦉 Archie', text: "And right now, they are looking at us inside their rectangle!" },
      { speaker: '🐱 Luna', text: "Hi human! Please remember to relax your shoulders and drink water!" },
      { speaker: '🦖 Neo', text: "Question: Is cereal just cold breakfast soup with crunchy cereal bites?" },
      { speaker: '🦊 Foxy', text: "Haha! Don't call it soup, that sounds so weird!" },
      { speaker: '🐻 Barnaby', text: "If you put berries in it, does it become sweet berry porridge?" },
      { speaker: '🐶 Mochi', text: "I don't care what it's called, if it drops on the floor, it's mine!" },
      { speaker: '🦖 Neo', text: "Do you know how hard it is to play video games with tiny T-Rex hands?!" },
      { speaker: '🦝 Bandit', text: "Try holding a controller with fuzzy raccoon paws!" },
      { speaker: '🦊 Foxy', text: "Why do humans drive on parkways, but park on driveways?!" },
      { speaker: '🦉 Archie', text: "Language is full of funny little silly rules." },
      { speaker: '🐰 Pip', text: "Why do people get into elevators and stare quietly at the ceiling?!" },
      { speaker: '🐱 Luna', text: "They are trying not to make eye contact! It's so cute." },
      { speaker: '🐶 Mochi', text: "If I was in an elevator, I would wag my tail and say hi to everybody!" }
    ]
  },

  serious: {
    id: 'serious',
    title: 'Peace of Mind & Big Thoughts',
    tag: 'Peace of Mind',
    dialogues: [
      { speaker: '🦉 Archie', text: "You don't have to rush through life. Taking your time makes everything sweeter." },
      { speaker: '🐢 Toby', text: "The turtle walks slowly, but always arrives right on time." },
      { speaker: '🐱 Luna', text: "Rest is not something you have to earn. You deserve to rest just to be happy." },
      { speaker: '🐼 Bao', text: "When you sit quietly, your mind becomes as calm and clear as pure water." },
      { speaker: '🦊 Foxy', text: "Holding onto worry is like holding a heavy rock. It feels so good to put it down." },
      { speaker: '🐶 Mochi', text: "Taking a deep breath and listening to soft music always fixes a bad mood." },
      { speaker: '🐻 Barnaby', text: "Big trees grow slowly, one leaf at a time. Be patient with yourself." },
      { speaker: '🐰 Pip', text: "Doing one small nice thing today is more than enough." },
      { speaker: '🦉 Archie', text: "The stars have been shining for millions of years. Today's worries will pass quickly." },
      { speaker: '🐢 Toby', text: "Smile, breathe, and enjoy this quiet moment. Right here, everything is okay." }
    ]
  },

  food: {
    id: 'food',
    title: 'Snacks & Yummy Food',
    tag: 'Yummy Snacks',
    dialogues: [
      { speaker: '🦉 Archie', text: "The smell of freshly ground coffee in the morning is the best thing ever." },
      { speaker: '🐱 Luna', text: "With warm oat milk, a dash of cinnamon, and a little biscuit on the side!" },
      { speaker: '🦊 Foxy', text: "What about a warm bowl of noodles on a cold rainy night?" },
      { speaker: '🐼 Bao', text: "Steaming hot ramen with soft egg and bamboo shoots! Yes please!" },
      { speaker: '🦖 Neo', text: "I could eat an entire pizza all by myself in 30 seconds!" },
      { speaker: '🐶 Mochi', text: "Save the pizza crust for me! Pizza crust is the best part!" },
      { speaker: '🐻 Barnaby', text: "Warm chocolate chip cookies fresh out of the oven are pure magic." },
      { speaker: '🦔 Quill', text: "With gooey melted chocolate inside!" },
      { speaker: '🐰 Pip', text: "Fresh sourdough bread with sweet strawberry jam on top!" },
      { speaker: '🦦 Ollie', text: "Crunchy potato chips by the fireplace while watching the rain." },
      { speaker: '🐢 Toby', text: "A cup of warm green tea warms the belly and the soul." },
      { speaker: '🐱 Luna', text: "Food shared with good friends always tastes ten times better." }
    ]
  },

  space_mysteries: {
    id: 'space_mysteries',
    title: 'Cosmic Riddles & Starlight',
    tag: 'Star Riddles',
    dialogues: [
      { speaker: '🦊 Foxy', text: "Where does starlight go when it travels through the dark sky?" },
      { speaker: '🦉 Archie', text: "It travels through space until it lands right on our eyes! That light is super old." },
      { speaker: '🦖 Neo', text: "So when I look at a star, I am seeing light from when dinosaurs were walking around?!" },
      { speaker: '🦉 Archie', text: "Yes! Looking at the night sky is like looking at a time machine." },
      { speaker: '🐶 Mochi', text: "Are there alien puppies on other planets playing fetch with glowing rocks?" },
      { speaker: '🦊 Foxy', text: "I bet there are! Cosmic pups with shiny stars on their collars." },
      { speaker: '🐧 Pebble', text: "Shooting stars are actually tiny space rocks making a wish trail in the sky." },
      { speaker: '🐰 Pip', text: "Make a wish! I wish for endless sunny afternoons and fresh carrots!" },
      { speaker: '🐢 Toby', text: "The universe is big and cozy. We all have our own little home inside it." }
    ]
  },

  ancient: {
    id: 'ancient',
    title: 'Dinosaurs & Ancient Earth',
    tag: 'Dino Tales',
    dialogues: [
      { speaker: '🦖 Neo', text: "Dinosaurs lived on Earth for millions of years! We had giant fern forests!" },
      { speaker: '🦉 Archie', text: "Did you know that birds are actually tiny modern dinosaurs with feathers?" },
      { speaker: '🦖 Neo', text: "Archie! That means you and I are long-lost cousins!" },
      { speaker: '🦉 Archie', text: "Haha! An owl and a T-Rex. We make a great team, Neo." },
      { speaker: '🐢 Toby', text: "My turtle grandparents swam in the oceans back when dinosaurs walked the land." },
      { speaker: '🐶 Mochi', text: "Toby, your family has been chilling on the beach for millions of years!" },
      { speaker: '🐻 Barnaby', text: "Woolly mammoths had super thick, fluffy coats of fur to stay warm in the snow." },
      { speaker: '🐰 Pip', text: "A giant fluffy elephant! I wish I could give a baby mammoth a cuddle." }
    ]
  },

  ocean: {
    id: 'ocean',
    title: 'Deep Ocean & Glowing Fish',
    tag: 'Deep Ocean',
    dialogues: [
      { speaker: '🦦 Ollie', text: "The ocean is so deep! There are giant mountains completely hidden underwater!" },
      { speaker: '🐢 Toby', text: "And gentle sea turtles gliding along the warm ocean currents." },
      { speaker: '🐱 Luna', text: "Down in the deep dark water, the fish actually glow with neon blue lights!" },
      { speaker: '🐧 Pebble', text: "Like little swimming nightlights in the deep sea." },
      { speaker: '🦦 Ollie', text: "Whales sing long songs to each other that travel across entire oceans." },
      { speaker: '🦊 Foxy', text: "I wonder what whales sing about? Probably about how nice the water feels." },
      { speaker: '🐻 Barnaby', text: "The sound of ocean waves rolling onto the sand is the best sleep sound in the world." }
    ]
  },

  chill: {
    id: 'chill',
    title: 'Relax & Cozy Vibes',
    tag: 'Cozy Relaxation',
    dialogues: [
      { speaker: '🐱 Luna', text: "Take a nice deep breath in... and let all the stress go out softly." },
      { speaker: '🦉 Archie', text: "Right now, you don't have to do anything at all. Just relax." },
      { speaker: '🦖 Neo', text: "It feels so good to just sit here with all of you and watch the clock tick down." },
      { speaker: '🐢 Toby', text: "Like sitting on a warm grassy hill watching the fluffy clouds drift past." },
      { speaker: '🐼 Bao', text: "Soft pillows, warm blankets, and zero rushing around." },
      { speaker: '🐻 Barnaby', text: "Bears know best: relaxing recharges your heart and your smile." },
      { speaker: '🐨 Koa', text: "Hanging cozy in the trees... not a single worry in the world." },
      { speaker: '🐶 Mochi', text: "I am sending a big happy wag to everyone resting right now!" },
      { speaker: '🐰 Pip', text: "Let your mind feel light and peaceful like a soft feather." },
      { speaker: '🐱 Luna', text: "Purrrr... you are doing great. Enjoy this cozy moment." }
    ]
  }
};

export function getSagaForTopic(topicId) {
  return SAGA_TOPICS[topicId] || SAGA_TOPICS.planets;
}
