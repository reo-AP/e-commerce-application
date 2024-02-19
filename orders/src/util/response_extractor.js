function createResponse(user){
    const response = {
        name: user.name,
        email: user.email,
        role: user.roles
    }
    return response;
}

module.exports = createResponse;