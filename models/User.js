import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    imageUrl : { type: String, required: true },
    cartItems: { type: Object, default: {} }

}, { minimize: false })

const User = mongoose.models.user || mongoose.model('user', UserSchema)

export default User
// Compare this snippet from QuickCart/pages/_app.jsx: