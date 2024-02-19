class CuastomErrors extends Error{
    message;
    code;
    constructor(message,code){
        super();
        this.message = message;
        this.code = code;
    }
}
module.exports = CuastomErrors;