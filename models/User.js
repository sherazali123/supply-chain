const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
  
userSchema.methods.matchPassword = function (password) {
    return this.password === password;
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.filter = function(properties) {
    let user = this.toObject();
    if(Array.isArray(properties)){
        properties.forEach(function(property){
            delete user[property];
        });
    } else {
        delete user[properties];
    }
    return user;
};

mongoose.model('users', userSchema);