const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
   email: {
        type: String,
        required: true,
        unique: true,
       lowercase: true
   },
   password: {
      type: String,
      required: true
   }
});

userSchema.pre('save', async function(next) {

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next()
    } catch (e) {
        next(error)
    }

});

userSchema.methods.isValidPassword = async function (newPassWord) {
    try {
        return await bcrypt.compare(newPassWord, this.password)
    } catch (e) {
        throw new Error(error)
    }
};

const User = mongoose.model('user', userSchema);

module.exports = User;