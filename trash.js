// const express = require('express');
// const bodyParser = require('body-parser');
// const request = require('request');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true }));

// // app.get('/', (req, res) => {
// //     res.sendFile(__dirname + '/public/index.html');
// // });

// app.post('/get_product_details', (req, res) => {
//     const productUrl = req.body.productUrl;

//     request(productUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (error, response, html) => {
//         if (!error && response.statusCode == 200) {
//             const $ = cheerio.load(html);

//             const title = $('span.a-size-large.product-title-word-break').text().trim();

//             let price = null;
//             const priceParent = $('span.a-price-whole');
//             if (priceParent.length > 0) {
//                 price = priceParent.first().text().trim();
//             }

//             let image = null;
//             const imageParent = $('div.imgTagWrapper');
//             if (imageParent.length > 0) {
//                 image = imageParent.first().find('img').attr('src');
//             }

//             let rating = null;
//             const ratingParent = $('span.a-icon-alt');
//             if (ratingParent.length > 0) {
//                 rating = ratingParent.first().text().split(' ')[0];
//             }

//             const aboutItems = [];
//             const about = $('#feature-bullets');
//             if (about.length > 0) {
//                 const aboutList = about.find('ul.a-unordered-list');
//                 if (aboutList.length > 0) {
//                     aboutList.find('li').each(function () {
//                         aboutItems.push($(this).text().trim());
//                     });
//                 }
//             }

//             const productJson = {
//                 title: title,
//                 price: price,
//                 thumbnail: image,
//                 rating: rating,
//                 description: aboutItems,
//             };

//             res.send(JSON.stringify(productJson));
//         } else {
//             res.send('Error retrieving product details.');
//         }
//     });
// });

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}.`);
// });
