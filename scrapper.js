const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://example.com';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    
    // scraps data (titles) that sit in h2 tags
    $('h2').each((index, element) => {
      const title = $(element).text();
      console.log(title);
    });
  })
  .catch(error => {
    console.error(`Error fetching the URL: ${error}`);
  });