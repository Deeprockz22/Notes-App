/**
 * Dynamic Daily Trending Topics Service for phocus
 * Automatically fetches and updates today's real-world trending topics every day!
 * Sources: Free, CORS-friendly public feeds (Hacker News Live, Wikipedia Featured/Current Events).
 * Caches daily in localStorage and dynamically generates hilarious 2-companion banter.
 */

// Fallback witty topics if network is temporarily unavailable
const DAILY_FALLBACKS = [
  "New breakthrough in robotic pizza delivery drones",
  "World record for the longest afternoon catnap",
  "Scientists discover that dogs really understand human gossip",
  "Viral internet debate: Is water actually wet?",
  "Astronomers detect mysterious disco signals from deep space",
  "New smartphone announced with 14 camera lenses and zero headphone jacks",
  "Penguins spotted using pebble diplomacy to resolve neighborhood disputes",
  "Artificial Intelligence invents a new flavor of ice cream: Salty Marshmallow Cloud"
];

/**
 * Format today's date as YYYY-MM-DD
 */
export function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Convert raw headlines into funny 2-companion dialogue lines
 */
function createFunnyBanterFromHeadlines(headlines) {
  const dialogues = [];

  headlines.slice(0, 6).forEach((headline, index) => {
    // Clean up headline
    const cleanTitle = headline.replace(/\s+/g, ' ').trim();

    if (index % 3 === 0) {
      dialogues.push({
        role: 'A',
        text: `Did you see today's top trending headline?! "${cleanTitle}"!`
      });
      dialogues.push({
        role: 'B',
        text: `Wait, seriously?! That is actually trending everywhere right now!`
      });
      dialogues.push({
        role: 'A',
        text: `Yes! Everyone on the internet is losing their minds over it today!`
      });
      dialogues.push({
        role: 'B',
        text: `I'm going to post a viral tweet about this immediately... wait, I don't have thumbs!`
      });
    } else if (index % 3 === 1) {
      dialogues.push({
        role: 'A',
        text: `Breaking news today: "${cleanTitle}"!`
      });
      dialogues.push({
        role: 'B',
        text: `No way! What a wild day to be an animal watching the news!`
      });
      dialogues.push({
        role: 'A',
        text: `I know right?! Humans have the craziest headlines every single morning!`
      });
      dialogues.push({
        role: 'B',
        text: `If you need me, I will be pretending I understood the stock market implications!`
      });
    } else {
      dialogues.push({
        role: 'A',
        text: `Look at this trending topic right now: "${cleanTitle}"!`
      });
      dialogues.push({
        role: 'B',
        text: `Haha! That sounds like something out of a sci-fi comedy movie!`
      });
      dialogues.push({
        role: 'A',
        text: `And yet it's real life! We are truly living in the future!`
      });
      dialogues.push({
        role: 'B',
        text: `Pass the popcorn, today's news cycle is better than Netflix!`
      });
    }
  });

  return dialogues;
}

/**
 * Fetch Today's Trending Topics (Auto-updates every day)
 */
export async function fetchDailyTrendingSaga() {
  const todayKey = `phocus_trending_${getTodayDateString()}`;

  // 1. Check if we already have today's cached trending saga in localStorage
  try {
    const cached = localStorage.getItem(todayKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed?.dialogues && parsed.dialogues.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read trending cache:', e);
  }

  const collectedHeadlines = [];

  // 2. Fetch live top stories from Hacker News (free, CORS-enabled, real-time)
  try {
    const topIdsRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    if (topIdsRes.ok) {
      const topIds = await topIdsRes.json();
      const firstFew = topIds.slice(0, 5);

      const items = await Promise.allSettled(
        firstFew.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json())
        )
      );

      items.forEach((res) => {
        if (res.status === 'fulfilled' && res.value?.title) {
          collectedHeadlines.push(res.value.title);
        }
      });
    }
  } catch (e) {
    console.log('Hacker News fetch fallback:', e);
  }

  // 3. Fetch from Wikipedia Featured feed (free, CORS-enabled)
  if (collectedHeadlines.length < 4) {
    try {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/featured/${y}/${m}/${d}`);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        if (wikiData?.tfa?.title) {
          collectedHeadlines.push(wikiData.tfa.title);
        }
        if (Array.isArray(wikiData?.news)) {
          wikiData.news.slice(0, 3).forEach((item) => {
            if (item.story) {
              // Strip HTML tags
              const cleanStory = item.story.replace(/<[^>]*>?/gm, '');
              collectedHeadlines.push(cleanStory.slice(0, 80));
            }
          });
        }
      }
    } catch (e) {
      console.log('Wiki fetch fallback:', e);
    }
  }

  // 4. If offline, use daily-seeded rotation
  if (collectedHeadlines.length === 0) {
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    const fallback1 = DAILY_FALLBACKS[dayOfYear % DAILY_FALLBACKS.length];
    const fallback2 = DAILY_FALLBACKS[(dayOfYear + 1) % DAILY_FALLBACKS.length];
    const fallback3 = DAILY_FALLBACKS[(dayOfYear + 2) % DAILY_FALLBACKS.length];
    collectedHeadlines.push(fallback1, fallback2, fallback3);
  }

  // Generate hilarious 2-companion dialogue from today's real headlines
  const generatedDialogues = createFunnyBanterFromHeadlines(collectedHeadlines);

  const trendingSaga = {
    id: `trending-${getTodayDateString()}`,
    title: `Today's Viral Trends (${getTodayDateString()})`,
    tag: "🔥 Today's Trending",
    isLiveTrending: true,
    dialogues: generatedDialogues
  };

  // Cache in localStorage for today
  try {
    localStorage.setItem(todayKey, JSON.stringify(trendingSaga));
  } catch (e) {
    console.warn('Could not save trending cache:', e);
  }

  return trendingSaga;
}
