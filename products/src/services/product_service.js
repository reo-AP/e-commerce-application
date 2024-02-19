
const {User} = require('../database/connection');
const {Product} = require('../database/connection');
const CONFIG = require('../../../common/config.json');
const responseCreator = require('../util/response_extractor');

async function getProducts(req, res){
    let {limit, offset} = req.query;
    let object = {limit: 10, offset:0}
    if(limit){
        object.limit = Number.parseInt(limit);
    }
    if(offset){
        object.offset = Number.parseInt(offset);
    }

    let result = await Product.findAndCountAll (object);
    result.rows= result.rows.map(item =>{
        delete item.userId;
        return item;
    })
    res.status(200).json(result);
}

async function getOwnProducts(req, res){
    let userId = req.params.userId;
    let products = await Product.findAll({where: {userId: userId}});
    res.status(200).json(products);
}

async function getProductById(req, res){
    let id = req.params.id;
    let product = await Product.findOne({where: {id:id}}); 
    res.status(200).json(responseCreator(product));
}

async function createProduct(req, res){
    let {name, stock, price, catagory} = req.body;
    let userId = req.user.id;

    let queryObject = {
        name,
        stock,
        price,
        catagory,
        userId
    }
    let builtProduct = Product.build(queryObject);
    let createdProduct = await builtProduct.save();
    res.status(201).json(responseCreator(createdProduct));
}

async function updateProduct(req, res){
    let {name, stock, price, catagory} = req.body;
    let id = req.params.id;
    let userId = req.user.id;
    let product = await Product.findOne({where: {
        id: id,
        userId: userId
    }})

    if(product){
        if(name)
        product.name=name;
        if(stock)
        product.stock=stock;
        if(catagory)
        product.catagory=catagory;
        if(price)
        product.price=price;
    let updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
    }else{
        res.status(404).json({status: false, message:"Product not found"})
    }
}

async function deleteProduct(req, res){
    let id = req.params.id;
    let userId = req.user.id;
    let product = await Product.findOne({
        where:{
            id: id,
            userId: userId
        } 
    })
    if(product){
        await Product.destroy({
            where:{
                id:id,
                userId:userId
            }
        });
        res.status(200).json({});
        return;
    }
    res.status(400).json({status: false, message: "Product not found"});
}
module.exports = {
    getProducts,
    getOwnProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}