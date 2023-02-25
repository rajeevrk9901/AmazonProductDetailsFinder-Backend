
const cheerio = require('cheerio');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/product', (req, res) => {
    const productUrl = req.body.productUrl;
    console.log(productUrl)

    const proxyUrl = process.env.PROXY_URL;
    const options = {
        url: productUrl,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        },
        proxy: proxyUrl,
        rejectUnauthorized: false
    };

    request(options, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            // const title = $('span.a-size-large').text().trim();
            // const price = $('span .a-price-whole').text();
            const priceParent = $('span.a-price-whole');
            const price = priceParent.length > 0 ? priceParent.first().text().trim() : null;
            // const image = $('img#landingImage').attr('data-old-hires');
            const rating = $('span.a-icon-alt').text().split(' ')[0];
            const title = $('#productTitle').text().trim();
            // const price = $('#priceblock_ourprice').text().trim();
            const thumbnail = $('#imgTagWrapperId img').attr('data-old-hires');
            // const rating = $('#acrPopover').attr('title').split(' ')[0];
            // const description = $('#feature-bullets ul')
            const descriptionItems = [];

            $('div#feature-bullets ul.a-unordered-list li').each((i, el) => {
                descriptionItems.push($(el).text().trim());
            });
            const productDetails = {
                title: title,
                price: price,
                thumbnail: thumbnail,
                rating: rating,
                description: descriptionItems
            };
            res.json(productDetails);
        } else {
            res.status(500).send('Error fetching product details.');
        }
    });
});


app.listen(9000, () => console.log('Server started on port 9000'));

