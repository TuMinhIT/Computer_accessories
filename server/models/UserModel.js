// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['admin', 'sales'],
//     default: 'sales',
//   },
//   avatar: {
//     type: String,
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//   },
//   isLocked: {
//     type: Boolean,
//     default: false,
//   },
//   resetToken: {
//     type: String,
//   },
//   resetTokenExpiry: {
//     type: Date,
//   },
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  avatar: { type: String, default: '' },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
  isLocked: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  firstLogin: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
