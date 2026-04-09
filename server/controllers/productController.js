const Product = require("../models/productSchema.js");
const {
  productSchemaValidator,
} = require("../utils/productSchemaValidator.js");

async function addProduct(req, res) {
  if (typeof req.body.sizes === "string") {
    req.body.sizes = req.body.sizes.split(",");
  }

  const { error, value } = productSchemaValidator.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { name, category, description, sizes, price, stock } = value;
  const { filename, path } = req.file;

  const cratedProduct = await Product.create({
    name, category, description, sizes, price, stock, 
    productImage: { url: path, filename: filename },
  });


  return res.status(201).json({
    success: true,
    message: "Product added successfully",
  });
}

async function getAllProducts(req,res){
   const allProducts = await Product.find({}).select({name:1, category:1, productImage:1, price:1, stock:1});
   console.log(allProducts);
   res.status(200).json({
      success: true,
      data: allProducts
   })
}

module.exports = { addProduct, getAllProducts };
