function createResponse(modelObject){
    if(!modelObject)
    return null;
    const response = {
        id: modelObject.id,
        name: modelObject.name,
        stock: modelObject.stock,
        price: modelObject.price,
        catagory: modelObject.catagory
    }
    return response;
}

module.exports = createResponse;