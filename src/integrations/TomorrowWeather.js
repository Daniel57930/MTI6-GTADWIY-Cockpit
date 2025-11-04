// Simple TomorrowWeather integration: returns basic forecast object
export async function fetchTomorrowWeather(location = 'auto') {
  try {
    // placeholder: use a real weather provider key/URL here
    // Keeping this non-JSX avoids parser issues in .js files
    const sample = {
      location,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      summary: 'Partly cloudy',
      high: 22,
      low: 14
    };
    return sample;
  } catch (err) {
    console.warn('TomorrowWeather.fetchTomorrowWeather error', err);
    return null;
  }
}

export default fetchTomorrowWeather;