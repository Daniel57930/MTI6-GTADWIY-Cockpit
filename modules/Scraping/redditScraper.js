/**
 * Reddit Scraping Connector
 * 
 * Scrapes cryptocurrency discussions from Reddit
 * API credentials from process.env.REDDIT_CLIENT_ID and process.env.REDDIT_CLIENT_SECRET
 */

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const BASE_URL = "https://www.reddit.com";

/**
 * Scrape hot posts from a subreddit
 * @param {string} subreddit - Subreddit name
 * @param {number} limit - Number of posts to fetch
 * @returns {Promise<object>} Posts data
 */
export async function scrapeHotPosts(subreddit = "cryptocurrency", limit = 25) {
  const url = `${BASE_URL}/r/${subreddit}/hot.json?limit=${limit}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Reddit API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Reddit scraping error:", error.message);
    return null;
  }
}

/**
 * Scrape subreddit sentiment
 * @param {string} subreddit - Subreddit name
 * @returns {Promise<object>} Sentiment analysis data
 */
export async function scrapeSentiment(subreddit = "cryptocurrency") {
  const posts = await scrapeHotPosts(subreddit, 100);
  
  if (!posts?.data?.children) return null;
  
  // Simple sentiment analysis based on upvotes and comments
  const sentimentScore = posts.data.children.reduce((score, post) => {
    const upvoteRatio = post.data.upvote_ratio || 0.5;
    const engagement = post.data.num_comments / (post.data.ups + 1);
    return score + (upvoteRatio * (1 + engagement));
  }, 0) / posts.data.children.length;
  
  return {
    subreddit,
    sentimentScore,
    timestamp: new Date().toISOString()
  };
}

export default {
  scrapeHotPosts,
  scrapeSentiment
};
