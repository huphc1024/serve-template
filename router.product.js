const express = require('express');
const app = express();
const productRouter = express.Router();
const flectData = require('./service/flectdata-amz');
const flectData2 = require('./service/fetchwalmart');


productRouter.route('/find').post(function (req, res) {
    let link_amz = req.body.link_product;
    let asinList = link_amz.match(/\/dp\/(.*?)\//s);
    let asin;
    if (!asinList || asinList.length < 2) {
      asin = 'Nothing';
    } else {
      asin = asinList[1];
    }
    let product = {
      link_product: link_amz,
      asin_product: asin
    }
    flectData(link_amz).then(rs => {
      product.name_amz = rs.title;
      product.image_list = rs.image_list;
      product.description = rs.description;
      if (rs.asin) {
        product.asin_product = rs.asin;
      }
      res.status(200).json(product);
  });
})
module.exports = productRouter;

productRouter.route('/find-wm').post(function (req, res) {
    let link_amz = req.body.link_product;
    let asinList = link_amz.match(/\/dp\/(.*?)\//s);
    let asin;
    if (!asinList || asinList.length < 2) {
        asin = 'Nothing';
    } else {
        asin = asinList[1];
    }
    let product = {
        link_product: link_amz,
        asin_product: asin
    }
    flectData2(link_amz).then(rs => {
        product.name_amz = rs.title;
        product.image_list = rs.image_list;
        product.description = rs.description;
        if (rs.asin) {
            product.asin_product = rs.asin;
        }
        res.status(200).json(product);
    });
})
module.exports = productRouter;
