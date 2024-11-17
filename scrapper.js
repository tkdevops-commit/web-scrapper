const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the website to scrape
const url = 'https://example.com';

// Function to scrape the data
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Array to store scraped data
    const scrapedData = [];

    // Scraping data from all heading tags (h1 - h6)
    $('h1, h2, h3, h4, h5, h6').each((index, element) => {
      const title = $(element).text().trim();
      scrapedData.push({ type: 'heading', value: title });
    });

    // Scraping data from all paragraph tags
    $('p').each((index, element) => {
      const paragraph = $(element).text().trim();
      scrapedData.push({ type: 'paragraph', value: paragraph });
    });

    // Scraping data from all anchor tags (links)
    $('a').each((index, element) => {
      const linkText = $(element).text().trim();
      const href = $(element).attr('href');
      scrapedData.push({ type: 'link', text: linkText, url: href });
    });

    // Scraping data from all image tags
    $('img').each((index, element) => {
      const altText = $(element).attr('alt');
      const imgSrc = $(element).attr('src');
      scrapedData.push({ type: 'image', alt: altText, url: imgSrc });
    });

    // Scraping data from all ordered lists (ol)
    $('ol').each((index, element) => {
      const listItems = [];
      $(element).find('li').each((i, li) => {
        listItems.push($(li).text().trim());
      });
      scrapedData.push({ type: 'ordered_list', items: listItems });
    });

    // Scraping data from all unordered lists (ul)
    $('ul').each((index, element) => {
      const listItems = [];
      $(element).find('li').each((i, li) => {
        listItems.push($(li).text().trim());
      });
      scrapedData.push({ type: 'unordered_list', items: listItems });
    });

    // Scraping data from all tables
    $('table').each((index, element) => {
      const table = [];
      $(element).find('tr').each((i, row) => {
        const rowData = [];
        $(row).find('th, td').each((j, cell) => {
          rowData.push($(cell).text().trim());
        });
        table.push(rowData);
      });
      scrapedData.push({ type: 'table', rows: table });
    });

    // Scraping metadata (meta tags)
    $('meta').each((index, element) => {
      const name = $(element).attr('name') || $(element).attr('property');
      const content = $(element).attr('content');
      if (name && content) {
        scrapedData.push({ type: 'meta', name: name, content: content });
      }
    });

    // Writing the scraped data to a JSON file
    fs.writeFile('scrapedData.json', JSON.stringify(scrapedData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Scraped data saved to scrapedData.json');
      }
    });

    // Log the data to the console
    console.log(scrapedData);
  })
  .catch(error => {
    console.error(`Error fetching the URL: ${error}`);
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Other errors
      console.error('Error setting up the request:', error.message);
    }
  });
