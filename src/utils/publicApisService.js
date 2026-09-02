/**
 * 🌐 Zencus Public APIs Service
 * 12 curated keyless public APIs — all Auth: No — from public-apis/public-apis:
 *
 * ATMOSPHERE & LIVE FEEDS
 *  1. 🧘 Advice Slip API       — Daily Zen & Mindfulness Wisdom (Zen quote pill)
 *  2. 🐾 MeowFacts              — Live Animal Facts (c-top-drama cluster)
 *  3. 🌌 NASA Open Image API    — Deep Space Cosmic Imagery (Cosmic scene backdrop)
 *  4. 🌧️ Open-Meteo + ipwho.is — Real-time Local Weather (weather capsule)
 *
 * CONVERSATION CLUSTERS
 *  5. 😂 Official Joke API      — Setup + Punchline jokes (c-l1-2 Joke Zone)
 *  6. 🌐 Wikipedia Random       — Random article extract (c-r2-2 Wikipedia)
 *  7. 🤔 Useless Facts          — Bizarre daily facts (c-r1-2 Useless Fact)
 *  8. 😄 icanhazdadjoke         — Dad jokes one-liner (c-l1-1 Dad Joke)
 *  9. 🥋 Chuck Norris API       — Chuck Norris facts (c-l1-4 Chuck Norris)
 * 10. 🧠 Open Trivia DB         — Q&A trivia (c-r1-1 Trivia)
 * 11. 💬 Affirmations.dev       — Daily affirmations (c-l2-1 Affirmation)
 * 12. ☯️ ZenQuotes              — Philosophical quotes (c-r2-4 Zen Quote)
 *
 * Fully resilient with localStorage caching and offline fallbacks.
 */

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ─────────────────────────────────────────────────────────────
// 1. 🧘 ZEN & MINDFULNESS WISDOM (Advice Slip API)
// ─────────────────────────────────────────────────────────────
const FALLBACK_ZEN_QUOTES = [
  "Your mind is for having ideas, not holding them.",
  "Simplicity is the ultimate sophistication.",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
  "Deep breaths. The secret of getting ahead is getting started.",
  "Calm is a superpower in a world of distraction.",
  "Flow happens when challenge meets skill in quiet harmony.",
  "One task, full presence. Excellence is an accumulation of moments."
];

export async function fetchDailyZenAdvice() {
  const cacheKey = `zencus_zen_advice_${getTodayKey()}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {
    // ignore
  }

  try {
    const res = await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data?.slip?.advice) {
        const advice = data.slip.advice;
        try {
          localStorage.setItem(cacheKey, JSON.stringify(advice));
        } catch {}
        return advice;
      }
    }
  } catch (err) {
    console.warn('[Zencus APIs] Advice Slip fetch failed, using curated Zen wisdom:', err);
  }

  const fallback = FALLBACK_ZEN_QUOTES[Math.floor(Math.random() * FALLBACK_ZEN_QUOTES.length)];
  return fallback;
}

// ─────────────────────────────────────────────────────────────
// 2. 🐾 LIVE ANIMAL FACTS ENGINE (MeowFacts + Fauna Multi-species)
// ─────────────────────────────────────────────────────────────
const MULTI_SPECIES_ANIMAL_FACTS = [
  "Sea otters hold hands while sleeping to keep from drifting away!",
  "A group of flamingos is officially called a 'flamboyance'!",
  "Owls have asymmetrical ear canals that allow them to pinpoint sound in 3D!",
  "Capybaras are so naturally chill that other animals frequently use them as chairs.",
  "Octopuses have three hearts, and their blood is cyan-blue!",
  "Red pandas use their bushy ringed tails as blankets during harsh winter nights.",
  "Penguins propose to their lifelong mates with a carefully selected pebble.",
  "Sloths can hold their breath underwater for up to 40 minutes — longer than dolphins!",
  "Crows can remember human faces and pass grudges down to future generations."
];

export async function fetchLiveAnimalFact() {
  const cacheKey = `zencus_animal_fact_${getTodayKey()}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {}

  try {
    const res = await fetch('https://meowfacts.herokuapp.com/?count=1');
    if (res.ok) {
      const json = await res.json();
      if (json?.data?.[0]) {
        const fact = json.data[0];
        try {
          localStorage.setItem(cacheKey, JSON.stringify(fact));
        } catch {}
        return fact;
      }
    }
  } catch (err) {
    console.warn('[Zencus APIs] MeowFacts fetch failed, using multi-species trivia:', err);
  }

  const randomFact = MULTI_SPECIES_ANIMAL_FACTS[Math.floor(Math.random() * MULTI_SPECIES_ANIMAL_FACTS.length)];
  return randomFact;
}

// ─────────────────────────────────────────────────────────────
// 3. 🌌 NASA COSMIC DEEP-SPACE IMAGERY (NASA Open Images API)
// ─────────────────────────────────────────────────────────────
const FALLBACK_NASA_IMAGE = {
  title: "Carina Nebula Cosmic Cliffs",
  url: "https://images-assets.nasa.gov/image/PIA14417/PIA14417~medium.jpg"
};

export async function fetchNasaCosmicBackdrop() {
  const cacheKey = `zencus_nasa_cosmic_${getTodayKey()}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {}

  try {
    const res = await fetch('https://images-api.nasa.gov/search?q=nebula&media_type=image');
    if (res.ok) {
      const json = await res.json();
      const items = json?.collection?.items;
      if (items && items.length > 0) {
        // pick a featured nebula
        const item = items[Math.floor(Math.random() * Math.min(items.length, 10))];
        const title = item?.data?.[0]?.title || "Deep Space Nebula";
        const url = item?.links?.[0]?.href || FALLBACK_NASA_IMAGE.url;
        const result = { title, url };
        try {
          localStorage.setItem(cacheKey, JSON.stringify(result));
        } catch {}
        return result;
      }
    }
  } catch (err) {
    console.warn('[Zencus APIs] NASA Open Image fetch failed, using fallback:', err);
  }

  return FALLBACK_NASA_IMAGE;
}

// ─────────────────────────────────────────────────────────────
// 4. 🌧️ REAL-TIME WEATHER & ATMOSPHERE (Open-Meteo + ipwho.is)
// ─────────────────────────────────────────────────────────────
function getWeatherCondition(code) {
  // WMO Weather interpretation codes
  if (code === 0) return { label: 'Clear Sky', icon: '☀️', isRain: false };
  if (code === 1 || code === 2) return { label: 'Partly Cloudy', icon: '⛅', isRain: false };
  if (code === 3) return { label: 'Overcast', icon: '☁️', isRain: false };
  if (code === 45 || code === 48) return { label: 'Foggy Mist', icon: '🌫️', isRain: false };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { label: 'Gentle Rain', icon: '🌧️', isRain: true };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow Flurries', icon: '❄️', isRain: false };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: '⛈️', isRain: true };
  return { label: 'Balanced Air', icon: '🌤️', isRain: false };
}

export async function fetchLocalWeather() {
  const cacheKey = 'zencus_weather_cache';
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      // Cache valid for 45 minutes
      if (Date.now() - parsed.timestamp < 45 * 60 * 1000) {
        return parsed.data;
      }
    }
  } catch {}

  try {
    // 1. Keyless IP Geolocation
    const geoRes = await fetch('https://ipwho.is/');
    if (!geoRes.ok) throw new Error('IP geolocation error');
    const geo = await geoRes.json();
    if (!geo.success) throw new Error(geo.message || 'Geo failed');

    const lat = geo.latitude;
    const lon = geo.longitude;
    const city = geo.city || geo.region || 'Local';

    // 2. Open-Meteo Weather Forecast (Auth: No)
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
    );
    if (!weatherRes.ok) throw new Error('Weather API error');
    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    const condition = getWeatherCondition(current.weather_code);
    const result = {
      city,
      tempC: Math.round(current.temperature_2m),
      condition: condition.label,
      icon: condition.icon,
      isRain: condition.isRain
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: result }));
    } catch {}

    return result;
  } catch (err) {
    console.warn('[Zencus APIs] Weather fetch failed, using default atmosphere:', err);
    return {
      city: 'Zen Orbit',
      tempC: 21,
      condition: 'Clear Sky',
      icon: '✨',
      isRain: false
    };
  }
}

// ─────────────────────────────────────────────────────────────
// 5. 😂 RANDOM JOKE ENGINE (Official Joke API)
// ─────────────────────────────────────────────────────────────
const FALLBACK_JOKES = [
  { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
  { setup: "What do you call a factory that makes okay products?", punchline: "A satisfactory!" },
  { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field!" },
  { setup: "I told my doctor I heard buzzing…", punchline: "He said it's just a bug going around!" },
  { setup: "Why can't you trust an atom?", punchline: "They make up literally everything — even this joke!" }
];

export async function fetchRandomJoke(forceRefresh = false) {
  const cacheKey = `zencus_joke_${getTodayKey()}`;
  if (!forceRefresh) {
    try { const c = localStorage.getItem(cacheKey); if (c) return JSON.parse(c); } catch {}
  }
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (res.ok) {
      const data = await res.json();
      if (data?.setup && data?.punchline) {
        const joke = { setup: data.setup, punchline: data.punchline };
        try { localStorage.setItem(cacheKey, JSON.stringify(joke)); } catch {}
        return joke;
      }
    }
  } catch (err) { console.warn('[Zencus APIs] Joke API failed:', err); }
  return FALLBACK_JOKES[Math.floor(Math.random() * FALLBACK_JOKES.length)];
}

// ─────────────────────────────────────────────────────────────
// 6. 🌐 WIKIPEDIA RANDOM ARTICLE (Wikipedia REST API)
// ─────────────────────────────────────────────────────────────
const FALLBACK_WIKI = [
  { title: "The Great Wall of China", extract: "The Great Wall of China stretches over 21,000 km and was built to protect Chinese states from nomadic invasions over many centuries." },
  { title: "Octopus", extract: "Octopuses have three hearts, blue blood, and can change colour in milliseconds — each arm has a mind of its own with two-thirds of their neurons!" },
  { title: "Black Holes", extract: "A black hole's gravity is so extreme that even light cannot escape. Time passes more slowly near a black hole than far away from it." }
];

export async function fetchWikipediaFact(forceRefresh = false) {
  const cacheKey = `zencus_wiki_${getTodayKey()}`;
  if (!forceRefresh) {
    try { const c = localStorage.getItem(cacheKey); if (c) return JSON.parse(c); } catch {}
  }
  try {
    const res = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary', { redirect: 'follow' });
    if (res.ok) {
      const data = await res.json();
      if (data?.title && data?.extract) {
        const extract = data.extract.length > 200 ? data.extract.substring(0, 197) + '…' : data.extract;
        const result = { title: data.title, extract };
        try { localStorage.setItem(cacheKey, JSON.stringify(result)); } catch {}
        return result;
      }
    }
  } catch (err) { console.warn('[Zencus APIs] Wikipedia fetch failed:', err); }
  return FALLBACK_WIKI[Math.floor(Math.random() * FALLBACK_WIKI.length)];
}

// ─────────────────────────────────────────────────────────────
// 7. 🤔 USELESS FACTS (uselessfacts.jsph.pl)
// ─────────────────────────────────────────────────────────────
const FALLBACK_USELESS_FACTS = [
  "A group of crows is called a murder. A group of owls is called a parliament.",
  "Bananas are technically berries, but strawberries are not.",
  "The average cloud weighs around 1.1 million pounds.",
  "Honey never spoils. Edible honey was found in Egyptian tombs over 3,000 years old.",
  "There are more possible chess games than atoms in the observable universe."
];

export async function fetchUselessFact(forceRefresh = false) {
  const cacheKey = `zencus_useless_fact_${getTodayKey()}`;
  if (!forceRefresh) {
    try { const c = localStorage.getItem(cacheKey); if (c) return JSON.parse(c); } catch {}
  }
  try {
    const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    if (res.ok) {
      const data = await res.json();
      if (data?.text) {
        const fact = data.text.replace(/`/g, "'");
        try { localStorage.setItem(cacheKey, JSON.stringify(fact)); } catch {}
        return fact;
      }
    }
  } catch (err) { console.warn('[Zencus APIs] Useless Facts fetch failed:', err); }
  return FALLBACK_USELESS_FACTS[Math.floor(Math.random() * FALLBACK_USELESS_FACTS.length)];
}

// ─────────────────────────────────────────────────────────────
// 8. 😄 ICANHAZDADJOKE (icanhazdadjoke.com)
// ─────────────────────────────────────────────────────────────
const FALLBACK_DAD_JOKES = [
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "I used to hate facial hair, but then it grew on me.",
  "Why did the bicycle fall over? Because it was two-tired!",
  "I'm reading a book about anti-gravity. It's impossible to put down."
];

export async function fetchDadJoke(forceRefresh = false) {
  const cacheKey = `zencus_dad_joke_${getTodayKey()}`;
  if (!forceRefresh) {
    try { const c = localStorage.getItem(cacheKey); if (c) return JSON.parse(c); } catch {}
  }
  try {
    const res = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      if (data?.joke) {
        try { localStorage.setItem(cacheKey, JSON.stringify(data.joke)); } catch {}
        return data.joke;
      }
    }
  } catch (err) { console.warn('[Zencus APIs] Dad Joke fetch failed:', err); }
  return FALLBACK_DAD_JOKES[Math.floor(Math.random() * FALLBACK_DAD_JOKES.length)];
}

// ─────────────────────────────────────────────────────────────
// 9. 🥋 CHUCK NORRIS FACTS (api.chucknorris.io)
// ─────────────────────────────────────────────────────────────
const FALLBACK_CHUCK = [
  "Chuck Norris counted to infinity — twice.",
  "Chuck Norris can divide by zero.",
  "Chuck Norris' keyboard has no escape key — nothing escapes Chuck Norris.",
  "When Chuck Norris enters a room, he doesn't turn on the lights — he turns off the dark.",
  "Chuck Norris once parallel parked a train."
];

export async function fetchChuckNorrisFact(forceRefresh = false) {
  const cacheKey = `zencus_chuck_${getTodayKey()}`;
  if (!forceRefresh) {
    try { const c = localStorage.getItem(cacheKey); if (c) return JSON.parse(c); } catch {}
  }
  try {
    const res = await fetch('https://api.chucknorris.io/jokes/random');
    if (res.ok) {
      const data = await res.json();
      if (data?.value) {
        try { localStorage.setItem(cacheKey, JSON.stringify(data.value)); } catch {}
        return data.value;
      }
    }
  } catch (err) { console.warn('[Zencus APIs] Chuck Norris fetch failed:', err); }
  return FALLBACK_CHUCK[Math.floor(Math.random() * FALLBACK_CHUCK.length)];
}

// ─────────────────────────────────────────────────────────────
// 10. 🧠 OPEN TRIVIA DB (opentdb.com)
// ─────────────────────────────────────────────────────────────
const FALLBACK_TRIVIA = [
  { question: "What is the capital of Australia?", answer: "Canberra (not Sydney!)" },
  { question: "How many sides does a dodecahedron have?", answer: "12 faces!" },
  { question: "What is the fastest land animal?", answer: "The cheetah — up to 120 km/h!" },
  { question: "In what year did the Berlin Wall fall?", answer: "1989!" },
  { question: "What element has the chemical symbol Au?", answer: "Gold!" }
];

function decodeHtml(text) {
  return text
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    .replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"');
}

export async function fetchTriviaQuestion(forceRefresh = false) {
  const cacheKey = `zencus_trivia_${getTodayKey()}`;
  if (!forceRefresh) {
    try { const c = localStorage.getItem(cacheKey); if (c) return JSON.parse(c); } catch {}
  }
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    if (res.ok) {
      const data = await res.json();
      const r = data?.results?.[0];
      if (r?.question && r?.correct_answer) {
        const result = { question: decodeHtml(r.question), answer: decodeHtml(r.correct_answer) };
        try { localStorage.setItem(cacheKey, JSON.stringify(result)); } catch {}
        return result;
      }
    }
  } catch (err) { console.warn('[Zencus APIs] Open Trivia fetch failed:', err); }
  return FALLBACK_TRIVIA[Math.floor(Math.random() * FALLBACK_TRIVIA.length)];
}

// ─────────────────────────────────────────────────────────────
// 11. 💬 AFFIRMATIONS.DEV (affirmations.dev)
// ─────────────────────────────────────────────────────────────
const FALLBACK_AFFIRMATIONS = [
  "Small progress is still progress. Keep going!",
  "You are capable of amazing things.",
  "Every expert was once a beginner.",
  "Your focus determines your reality.",
  "Believe in your ability to figure things out."
];

export async function fetchAffirmation(forceRefresh = false) {
  const cacheKey = `zencus_affirmation_${getTodayKey()}`;
  if (!forceRefresh) {
    try { const c = localStorage.getItem(cacheKey); if (c) return JSON.parse(c); } catch {}
  }
  try {
    const res = await fetch('https://www.affirmations.dev/');
    if (res.ok) {
      const data = await res.json();
      if (data?.affirmation) {
        try { localStorage.setItem(cacheKey, JSON.stringify(data.affirmation)); } catch {}
        return data.affirmation;
      }
    }
  } catch (err) { console.warn('[Zencus APIs] Affirmations fetch failed:', err); }
  return FALLBACK_AFFIRMATIONS[Math.floor(Math.random() * FALLBACK_AFFIRMATIONS.length)];
}

// ─────────────────────────────────────────────────────────────
// 12. ☯️ ZENQUOTES (zenquotes.io)
// ─────────────────────────────────────────────────────────────
const FALLBACK_ZENQUOTES = [
  { q: "The present moment always will have been.", a: "Alan Watts" },
  { q: "You have power over your mind, not outside events.", a: "Marcus Aurelius" },
  { q: "Do not seek to have events happen as you want them to, but instead want them to happen as they do.", a: "Epictetus" },
  { q: "The obstacle is the way.", a: "Marcus Aurelius" },
  { q: "Simplicity is the ultimate sophistication.", a: "Leonardo da Vinci" }
];

export async function fetchZenQuote(forceRefresh = false) {
  const cacheKey = `zencus_zenquote_${getTodayKey()}`;
  if (!forceRefresh) {
    try { const c = localStorage.getItem(cacheKey); if (c) return JSON.parse(c); } catch {}
  }
  try {
    const res = await fetch('https://zenquotes.io/api/random');
    if (res.ok) {
      const data = await res.json();
      if (data?.[0]?.q) {
        const result = { q: data[0].q, a: data[0].a };
        try { localStorage.setItem(cacheKey, JSON.stringify(result)); } catch {}
        return result;
      }
    }
  } catch (err) { console.warn('[Zencus APIs] ZenQuotes fetch failed:', err); }
  return FALLBACK_ZENQUOTES[Math.floor(Math.random() * FALLBACK_ZENQUOTES.length)];
}

