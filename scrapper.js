const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://example.com';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    
    // Scrapes data (titles) from all heading tags (h1, h2, h3, h4, h5, h6)
    $('h1, h2, h3, h4, h5, h6').each((index, element) => {
      const title = $(element).text();
      console.log(title);
    });
  })
  .catch(error => {
    console.error(`Error fetching the URL: ${error}`);
  });
