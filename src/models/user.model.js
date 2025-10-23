import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username already exists']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'User already exists'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
},{timestamps:true})

export const User = mongoose.model('User', UserSchema);

