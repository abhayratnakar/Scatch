const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config")
const productModel = require("../models/product-model")


router.post('/create', upload.single('image'), async function (req, res) {
    // res.send(req.file);
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let procuct = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (err){
        res.send(err.message);
    }
});

module.exports = router;