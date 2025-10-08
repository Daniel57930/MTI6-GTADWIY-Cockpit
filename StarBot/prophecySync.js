/**
 * Prophecy Sync - Scripture Sync and Timestamp Logging
 * Synchronizes spiritual insights with scripture references
 * Part of MTI6-GTADWIY-Cockpit StarBot Module
 */

class ProphecySync {
  constructor() {
    this.scriptures = {
      peace: [
        { ref: 'Philippians 4:7', text: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.' },
        { ref: 'John 14:27', text: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives.' },
        { ref: 'Isaiah 26:3', text: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.' }
      ],
      strength: [
        { ref: 'Philippians 4:13', text: 'I can do all this through him who gives me strength.' },
        { ref: 'Isaiah 40:31', text: 'But those who hope in the LORD will renew their strength.' },
        { ref: '2 Corinthians 12:9', text: 'My grace is sufficient for you, for my power is made perfect in weakness.' }
      ],
      clarity: [
        { ref: 'James 1:5', text: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.' },
        { ref: 'Proverbs 3:5-6', text: 'Trust in the LORD with all your heart and lean not on your own understanding.' },
        { ref: 'Psalm 119:105', text: 'Your word is a lamp for my feet, a light on my path.' }
      ],
      sovereignty: [
        { ref: 'Ephesians 2:6', text: 'And God raised us up with Christ and seated us with him in the heavenly realms.' },
        { ref: 'Romans 8:37', text: 'No, in all these things we are more than conquerors through him who loved us.' },
        { ref: 'Luke 10:19', text: 'I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy.' }
      ],
      gratitude: [
        { ref: '1 Thessalonians 5:18', text: 'Give thanks in all circumstances; for this is God's will for you in Christ Jesus.' },
        { ref: 'Psalm 100:4', text: 'Enter his gates with thanksgiving and his courts with praise.' },
        { ref: 'Colossians 3:17', text: 'And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.' }
      ],
      healing: [
        { ref: 'Jeremiah 30:17', text: 'But I will restore you to health and heal your wounds, declares the LORD.' },
        { ref: 'Psalm 147:3', text: 'He heals the brokenhearted and binds up their wounds.' },
        { ref: '1 Peter 2:24', text: 'He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed.' }
      ],
      protection: [
        { ref: 'Psalm 91:11', text: 'For he will command his angels concerning you to guard you in all your ways.' },
        { ref: 'Isaiah 54:17', text: 'No weapon forged against you will prevail.' },
        { ref: 'Psalm 91:1-2', text: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.' }
      ]
    };

    this.syncLog = [];
    this.dailyScripture = null;
  }

  /**
   * Get scripture for specific theme
   * @param {string} theme - Scripture theme
   * @returns {object} - Scripture reference and text
   */
  getScripture(theme = 'peace') {
    const themeScriptures = this.scriptures[theme] || this.scriptures.peace;
    const scripture = themeScriptures[
      Math.floor(Math.random() * themeScriptures.length)
    ];

    this.logSync(theme, scripture);
    return scripture;
  }

  /**
   * Get daily scripture (changes each day)
   * @returns {object} - Daily scripture
   */
  getDailyScripture() {
    const today = new Date().toDateString();
    
    if (this.dailyScripture && this.dailyScripture.date === today) {
      return this.dailyScripture.scripture;
    }

    // Select theme based on day of week
    const themes = Object.keys(this.scriptures);
    const dayIndex = new Date().getDay();
    const theme = themes[dayIndex % themes.length];
    
    const scripture = this.getScripture(theme);
    
    this.dailyScripture = {
      date: today,
      scripture,
      theme
    };

    this.persistDailyScripture();
    return scripture;
  }

  /**
   * Log scripture sync event
   * @param {string} theme - Scripture theme
   * @param {object} scripture - Scripture object
   */
  logSync(theme, scripture) {
    const entry = {
      timestamp: new Date().toISOString(),
      theme,
      reference: scripture.ref,
      text: scripture.text
    };

    this.syncLog.push(entry);

    // Keep only last 50 entries
    if (this.syncLog.length > 50) {
      this.syncLog.shift();
    }

    console.log(`[Prophecy Sync] ${scripture.ref} - ${theme}`);
    this.persistLog();
  }

  /**
   * Persist sync log to storage
   */
  persistLog() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'starbot_prophecy_log',
          JSON.stringify(this.syncLog)
        );
      }
    } catch (error) {
      console.error('[Prophecy Sync] Storage error:', error);
    }
  }

  /**
   * Persist daily scripture to storage
   */
  persistDailyScripture() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'starbot_daily_scripture',
          JSON.stringify(this.dailyScripture)
        );
      }
    } catch (error) {
      console.error('[Prophecy Sync] Daily scripture storage error:', error);
    }
  }

  /**
   * Load sync log from storage
   */
  loadLog() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('starbot_prophecy_log');
        if (stored) {
          this.syncLog = JSON.parse(stored);
        }

        const dailyStored = localStorage.getItem('starbot_daily_scripture');
        if (dailyStored) {
          this.dailyScripture = JSON.parse(dailyStored);
        }
      }
    } catch (error) {
      console.error('[Prophecy Sync] Load error:', error);
    }
  }

  /**
   * Get sync log history
   * @param {number} limit - Number of entries to return
   * @returns {Array} - Sync log history
   */
  getHistory(limit = 10) {
    return this.syncLog.slice(-limit);
  }

  /**
   * Get scriptures by theme
   * @param {string} theme - Theme to filter by
   * @returns {Array} - All scriptures for theme
   */
  getScripturesByTheme(theme) {
    return this.scriptures[theme] || [];
  }

  /**
   * Get all themes
   * @returns {Array} - Available themes
   */
  getThemes() {
    return Object.keys(this.scriptures);
  }

  /**
   * Search scriptures by keyword
   * @param {string} keyword - Search keyword
   * @returns {Array} - Matching scriptures
   */
  searchScriptures(keyword) {
    const results = [];
    const lowerKeyword = keyword.toLowerCase();

    Object.entries(this.scriptures).forEach(([theme, scriptures]) => {
      scriptures.forEach(scripture => {
        if (
          scripture.text.toLowerCase().includes(lowerKeyword) ||
          scripture.ref.toLowerCase().includes(lowerKeyword)
        ) {
          results.push({ ...scripture, theme });
        }
      });
    });

    return results;
  }

  /**
   * Get meditation scriptures (multiple verses on a theme)
   * @param {string} theme - Theme for meditation
   * @param {number} count - Number of verses
   * @returns {Array} - Array of scriptures
   */
  getMeditationScriptures(theme, count = 3) {
    const themeScriptures = this.scriptures[theme] || this.scriptures.peace;
    return themeScriptures.slice(0, Math.min(count, themeScriptures.length));
  }

  /**
   * Clear sync log
   */
  clearLog() {
    this.syncLog = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('starbot_prophecy_log');
    }
    console.log('[Prophecy Sync] Log cleared');
  }
}

// Export singleton instance
const prophecySync = new ProphecySync();

// Initialize by loading log
prophecySync.loadLog();

export { prophecySync, ProphecySync };
export default prophecySync;
