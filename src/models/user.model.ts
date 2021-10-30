import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
});

const UserModel = model('user', userSchema);

export default UserModel;
