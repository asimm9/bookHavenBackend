class CustomError extends Error {
    constructor(code,message,description) {
        super(`{"code": "${code}", "message": "${message}", "description":"${description}"}`);
        this.message = message;
        this.code = code;
        this.description = description;
    }
}

module.exports = CustomError;