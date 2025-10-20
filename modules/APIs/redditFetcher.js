import dotenv from "dotenv";
dotenv.config();

const REDDIT_API_KEY = process.env.REDDIT_API_KEY; // If needed
export async function fetchRedditPosts(subreddit) {
  try {
    const url = `https://www.reddit.com/r/${subreddit}/new.json`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.data?.children?.map(post => post.data);
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return [];
  }
}