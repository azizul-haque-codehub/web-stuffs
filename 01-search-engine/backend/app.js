// ==========================
// Backend: Node.js + Express + Simple Crawler
// ==========================

// Importing required modules
const express = require('express');
const axios = require('axios');
const cors  = require('cors')
const cheerio = require('cheerio'); // For parsing HTML
const app = express();
const PORT = 3000;

// Sample data to simulate indexed web pages
let indexedData = [];

// Middleware to parse JSON
app.use(express.json());
app.use(cors())

// Crawler function to fetch and index data from URLs
async function crawlAndIndex(urls) {
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // Extract title and main content
      const title = $('title').text();
      const content = $('body').text().replace(/\s+/g, ' ').trim();

      // Index the extracted data
      indexedData.push({ url, title, content });
      console.log(`Indexed: ${url}`);
    } catch (error) {
      console.error(`Failed to crawl ${url}:`, error.message);
    }
  }
}

// Initial URLs to crawl
const initialUrls = [
  'https://example.com',
  'https://example.org',
  'https://developer.chrome.com/docs/css-ui/scroll-driven-animations',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions'
];

// Start crawling when the server starts
crawlAndIndex(initialUrls);

// API endpoint to handle search queries
app.get('/search', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  // Filter indexed data based on query
  const results = indexedData.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.content.toLowerCase().includes(query)
  );

  res.json({ results });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});