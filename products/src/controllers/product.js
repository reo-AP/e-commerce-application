const productService = require('../services/product_service');

async function getProducts(req, res){
    return productService.getProducts(req, res);
}

async function getOwnProducts(req, res){
    return productService.getOwnProducts(req, res);
}

async function getProductById(req, res){
    return productService.getProductById(req, res);
}

async function createProduct(req, res){
    return productService.createProduct(req, res);
}

async function updateProduct(req, res){
    return productService.updateProduct(req, res);
}

async function deleteProduct(req, res){
    return productService.deleteProduct(req, res);
}


module.exports = {
    getProducts,
    getOwnProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct
}