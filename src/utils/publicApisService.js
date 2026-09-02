/**
 * 🌐 Zencus Public APIs Service
 * Integrates 4 curated keyless public APIs from public-apis/public-apis:
 * 1. 🧘 Advice Slip API (Daily Zen & Mindfulness Wisdom)
 * 2. 🐾 MeowFacts & Multi-species Trivia (Live Animal Facts)
 * 3. 🌌 NASA Open Image API (Deep Space Cosmic Imagery)
 * 4. 🌧️ Open-Meteo + ipwho.is (Real-time Local Weather & Temperature)
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
