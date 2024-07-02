const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.models.Users || mongoose.model('Users', usersSchema);
