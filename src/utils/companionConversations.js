/**
 * Hilarious, Laugh-Out-Loud 2-Companion Conversations
 * Light, witty, goofy, and laugh-out-loud funny regardless of the topic!
 * Pure 2-role dialogue (A and B): Strictly bound to whichever two companions are standing in that cluster.
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
    tag: 'Space Comedy',
    dialogues: [
      { role: 'A', text: "If Saturn's rings are made of ice, why hasn't someone opened a cosmic snow-cone stand?!" },
      { role: 'B', text: "Snow-cones in space?! What flavor? Galactic blueberry?!" },
      { role: 'A', text: "Yes! With rainbow comet sprinkles on top!" },
      { role: 'B', text: "Neptune rains diamonds! If one hits you on the head, do you say 'Ouch' or 'Yay, I'm rich'?!" },
      { role: 'A', text: "I'd say 'Ouch!' first, and then immediately buy ten thousand pizzas!" },
      { role: 'B', text: "Sunsets on Mars are blue. Mars is basically using an Instagram moody filter 24/7." },
      { role: 'A', text: "And in Mars gravity, you could jump over a whole school bus!" },
      { role: 'B', text: "I'd probably jump so high I'd accidentally orbit the moon." },
      { role: 'A', text: "Are there alien puppies on Jupiter playing fetch with glowing asteroids?" },
      { role: 'B', text: "Imagine the size of the tennis ball! You'd need a crane to throw it!" },
      { role: 'A', text: "Pluto was kicked out of the planet club, but it still has a giant heart on its belly." },
      { role: 'B', text: "Pluto is like: 'You can't sit with us? Fine, I'm cuter than all of you anyway!'" },
      { role: 'A', text: "If you fell into a black hole, you'd stretch out like a long piece of spaghetti." },
      { role: 'B', text: "Finally! My lifelong dream of becoming delicious pasta would come true!" }
    ]
  },

  ghosts: {
    id: 'ghosts',
    title: 'Ghost Stories & Spooky Fun',
    tag: 'Spooky Goofs',
    dialogues: [
      { role: 'A', text: "If a ghost can walk through walls, why doesn't it fall through the floor?!" },
      { role: 'B', text: "Wait... whoa. Ghost physics makes absolutely zero sense!" },
      { role: 'A', text: "Are ghost socks ethereal too? Where do their phantom shoes go?!" },
      { role: 'B', text: "They probably lose one sock in the ghost dryer like the rest of us." },
      { role: 'A', text: "That 3 AM hallway cold spot is definitely a ghost standing by the open fridge." },
      { role: 'B', text: "Just staring at the leftover pasta wondering if 3 AM is too late for carbs." },
      { role: 'A', text: "If a ghost jumps out and screams 'BOO!', what are you doing?" },
      { role: 'B', text: "I'm offering it a warm chocolate chip cookie and asking for its Wi-Fi password." },
      { role: 'A', text: "Do ghosts ever lose their car keys? 'Darn it, where did I leave my phantom keys?!'" },
      { role: 'B', text: "They don't need cars, they just float and make creepy violin noises." },
      { role: 'A', text: "Whenever floorboards creak at night, it's just a ghost practicing ballet." },
      { role: 'B', text: "A phantom doing clumsy pirouettes in the kitchen. 10 out of 10." }
    ]
  },

  dreams: {
    id: 'dreams',
    title: 'Crazy Dreams',
    tag: 'Dream Goofs',
    dialogues: [
      { role: 'A', text: "I dreamt I was giving a serious presidential speech, but my microphone was a carrot." },
      { role: 'B', text: "Did the audience take you seriously?!" },
      { role: 'A', text: "No! Fifty rabbits stormed the stage and ate my speech notes!" },
      { role: 'B', text: "I dreamt my paws were replaced with warm french baguettes." },
      { role: 'A', text: "Baguette paws?! How did you open doors?!" },
      { role: 'B', text: "I didn't! Every time I got frustrated, I just took a bite out of my thumb!" },
      { role: 'A', text: "Did you ever wake up thinking you won ten million dollars, then checked your pocket and found a pretzel?" },
      { role: 'B', text: "Every single Monday morning. The emotional whiplash is real." },
      { role: 'A', text: "I had a dream I was flying, but only if I sang silly nursery rhymes out loud." },
      { role: 'B', text: "Imagine looking out the airplane window and seeing you sing 'Baby Shark' at 30,000 feet!" },
      { role: 'A', text: "Tonight I'm going to dream about swimming in warm peach iced tea." },
      { role: 'B', text: "Don't forget to pack a giant straw!" }
    ]
  },

  funny: {
    id: 'funny',
    title: 'Human Quirks',
    tag: 'Human Comedy',
    dialogues: [
      { role: 'A', text: "Humans stare at a work rectangle all day, then relax by staring at a tiny phone rectangle!" },
      { role: 'B', text: "Are rectangles secretly their alien overlords?!" },
      { role: 'A', text: "Why do humans push TV remote buttons harder when the batteries die?!" },
      { role: 'B', text: "Like 'Yes, pressing harder will magically summon electricity from my thumb!'" },
      { role: 'A', text: "And why do they turn down the car radio when looking for a parking spot?!" },
      { role: 'B', text: "'Turn the music off, I can't see the yellow parking lines with this bass!'" },
      { role: 'A', text: "Quick debate: If you fold a pizza slice in half, is it an Italian taco?!" },
      { role: 'B', text: "Don't say that in Italy or you will be banned from the country!" },
      { role: 'A', text: "Why do people get into elevators and stare straight up like they're in an art gallery?!" },
      { role: 'B', text: "Anything to avoid having to make three seconds of awkward small talk!" },
      { role: 'A', text: "If cereal isn't breakfast soup, then explain why you eat it from a bowl with a spoon!" },
      { role: 'B', text: "Stop! You are breaking the laws of breakfast culinary science!" }
    ]
  },

  serious: {
    id: 'serious',
    title: 'Goofy Philosophy',
    tag: 'Silly Wisdom',
    dialogues: [
      { role: 'A', text: "I spent an entire hour meditating on the meaning of life today." },
      { role: 'B', text: "And what grand ancient cosmic secret did you unlock?!" },
      { role: 'A', text: "The secret is: Take an afternoon nap and eat a warm cookie." },
      { role: 'B', text: "Socrates and Plato would weep tears of joy at your cookie hypothesis." },
      { role: 'A', text: "The slow turtle walks softly, but always gets to the buffet before the food is gone." },
      { role: 'B', text: "Ancient wisdom: Speed doesn't matter if you're headed toward snacks." },
      { role: 'A', text: "They say worry is like a rocking chair. It gives you something to do, but gets you nowhere!" },
      { role: 'B', text: "Plus rocking chairs are for old grannies. We should just take a nap on the rug." },
      { role: 'A', text: "Life is short. Eat the dessert first, ask questions never." },
      { role: 'B', text: "Now THAT is a philosophy I can get behind 100%." }
    ]
  },

  food: {
    id: 'food',
    title: 'Snack Scandals',
    tag: 'Snack Drama',
    dialogues: [
      { role: 'A', text: "If you eat food standing up in front of the open fridge, calories don't count." },
      { role: 'B', text: "That is completely fake science, but I respect the hustle." },
      { role: 'A', text: "Why does food taste 500% better when you steal it from someone else's plate?!" },
      { role: 'B', text: "Stolen french fries possess mystical flavor enhancements unknown to man." },
      { role: 'A', text: "If someone leaves the pizza crust on their plate, they should be investigated." },
      { role: 'B', text: "Agreed! That's literally the breadstick baked into the slice!" },
      { role: 'A', text: "If you drop a potato chip and pick it up in 4.9 seconds, bacteria are legally not allowed to touch it." },
      { role: 'B', text: "The 5-second rule is recognized by the United Nations of Snacks!" },
      { role: 'A', text: "I could eat an entire cheese pizza in under twenty seconds." },
      { role: 'B', text: "I'll time you with a stopwatch. Ready... set... GO!" }
    ]
  },

  space_mysteries: {
    id: 'space_mysteries',
    title: 'Cosmic Riddles',
    tag: 'Space Laughs',
    dialogues: [
      { role: 'A', text: "If aliens came to Earth right now, what's the first thing you'd show them?" },
      { role: 'B', text: "A warm slice of pepperoni pizza. If they don't like pizza, we send them back!" },
      { role: 'A', text: "What if alien spaceships run entirely on garlic bread propulsion?!" },
      { role: 'B', text: "Then sign me up for their space program immediately!" },
      { role: 'A', text: "When you look at a shooting star, you're supposed to make a wish." },
      { role: 'B', text: "I wish my water bowl would automatically turn into warm chocolate milk!" },
      { role: 'A', text: "The universe is expanding faster every second. It's trying to get away from our silly jokes!" },
      { role: 'B', text: "The galaxies can run, but they can't hide from our top-tier comedy!" }
    ]
  },

  ancient: {
    id: 'ancient',
    title: 'Dino Troubles',
    tag: 'Dino Goofs',
    dialogues: [
      { role: 'A', text: "Imagine a T-Rex trying to make its bed with those tiny little arms!" },
      { role: 'B', text: "'ROARRR! The fitted sheet popped off the corner again!'" },
      { role: 'A', text: "Or a T-Rex trying to put on a hoodie! It would get stuck over its snout forever!" },
      { role: 'B', text: "Running around blind bumping into volcanoes! Hilarious!" },
      { role: 'A', text: "Triceratops had three horns so it could carry three donuts at the same time." },
      { role: 'B', text: "Glazed, chocolate, and strawberry! The ultimate Mesozoic pastry delivery system." },
      { role: 'A', text: "Birds are modern dinosaurs. That means pigeons are tiny angry raptors!" },
      { role: 'B', text: "Next time a pigeon looks at your fries, show some respect to the apex predator!" }
    ]
  },

  ocean: {
    id: 'ocean',
    title: 'Deep Sea Shenanigans',
    tag: 'Ocean Goofs',
    dialogues: [
      { role: 'A', text: "Deep sea fish glow in the dark. It's basically an underwater laser rave down there!" },
      { role: 'B', text: "Do anglerfish ever get tired of having a lamp permanently attached to their forehead?!" },
      { role: 'A', text: "Imagine trying to take a nap with a 100-watt lightbulb swinging in front of your nose!" },
      { role: 'B', text: "They need tiny fish sleep masks!" },
      { role: 'A', text: "Crabs walk sideways because they are always sneakily tiptoeing away from drama." },
      { role: 'B', text: "'Don't look at me, I'm just scuttling to the seaweed buffet!'" },
      { role: 'A', text: "Whales sing songs that travel across entire oceans. What are the lyrics?!" },
      { role: 'B', text: "'Hey Frank... where did you put the krill... over here Frank...'" }
    ]
  },

  chill: {
    id: 'chill',
    title: 'Lazy Masterclass',
    tag: 'Lazy Humor',
    dialogues: [
      { role: 'A', text: "My personal goal for today is to move less than a plastic potted plant." },
      { role: 'B', text: "A real plant turns toward the sun. That sounds like way too much cardio." },
      { role: 'A', text: "If someone asks what I accomplished today, I'll say: 'I kept my skeleton upright.'" },
      { role: 'B', text: "And breathed oxygen without complaining! That deserves a gold medal." },
      { role: 'A', text: "Bears hibernate for six entire months. Who gave them permission to be that lucky?!" },
      { role: 'B', text: "Imagine waking up from a nap and it's suddenly April. Pure luxury." },
      { role: 'A', text: "Relaxing your shoulders right now is scientifically proven to increase happiness by 9000%." },
      { role: 'B', text: "My shoulders are so relaxed I think I might melt into a warm puddle." }
    ]
  },

  cheating_husband: {
    id: 'cheating_husband',
    title: 'Husband Caught Red-Handed',
    tag: 'Cheating Drama',
    dialogues: [
      { role: 'A', text: "Did you hear about Greg down the street?! His wife caught him cheating on his 'business trip'!" },
      { role: 'B', text: "No way! How did she catch him?!" },
      { role: 'A', text: "He said he was at an accounting conference in Chicago, but his location tag was 'Señor Frog's Cabo Beach Party'!" },
      { role: 'B', text: "Cabo Beach Party?! Was he doing corporate audit spreadsheets in a sombrero?!" },
      { role: 'A', text: "And he came home with glitter on his collar claiming it was 'dust from the photocopier'!" },
      { role: 'B', text: "Photocopier glitter with strawberry scent?! Nice try, Greg!" },
      { role: 'A', text: "And remember when Tom told his wife he was working late, but she caught his reflection texting?!" },
      { role: 'B', text: "He was texting his 'personal trainer' with thirty heart emojis at midnight!" },
      { role: 'A', text: "A personal trainer named 'Jessica' who only lifts weights at candlelit Italian restaurants!" },
      { role: 'B', text: "His wife immediately changed the Netflix password and donated all his golf clubs to Goodwill!" },
      { role: 'A', text: "Never lie to a suspicious wife with Wi-Fi and an afternoon to spare!" },
      { role: 'B', text: "She will find your secret credit card and your middle school report card in twelve minutes flat!" }
    ]
  },

  cheating_wife: {
    id: 'cheating_wife',
    title: 'Wife Secret Affairs & Soap Opera',
    tag: 'Spouse Drama',
    dialogues: [
      { role: 'A', text: "Girl, did you hear about Brenda?! She told her husband she was at hot yoga for four hours!" },
      { role: 'B', text: "Four hours of hot yoga?! Did she come home sweating?!" },
      { role: 'A', text: "Zero sweat! She walked through the door with a fresh salon blowout and smelling like expensive French perfume!" },
      { role: 'B', text: "She claimed it was 'spiritual meditation yoga where only your soul sweats, not your body'!" },
      { role: 'A', text: "And then her husband checked the Ring doorbell camera footage!" },
      { role: 'B', text: "What did the Ring camera see?!" },
      { role: 'A', text: "The handsome tennis instructor dropped her off in a red convertible and blew her a kiss!" },
      { role: 'B', text: "The tennis instructor?! Brenda doesn't even know how to hold a tennis racket!" },
      { role: 'A', text: "And what about Linda?! She accidentally texted her husband: 'See you tonight babe, the idiot is watching football'!" },
      { role: 'B', text: "OH NO! What excuse did she come up with?!" },
      { role: 'A', text: "She blamed autocorrect! 'Honey, I meant please buy organic 2% milk from the grocery store!'" },
      { role: 'B', text: "Autocorrect has NEVER turned a grocery list into a scandalous daytime soap opera episode!" }
    ]
  }
};

export function getSagaForTopic(topicId) {
  return SAGA_TOPICS[topicId] || SAGA_TOPICS.planets;
}
