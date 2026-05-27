require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./src/models/User.model');

const createAdmin = async () => {
  try {

    // CONNECT MONGODB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // CHECK EXISTING ADMIN
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      process.exit();
    }

    // CREATE ADMIN (plain password — model's pre('save') hook will hash it)
    const admin = await User.create({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_SECRET,
      role: 'super_admin',
      isActive: true
    });

    console.log('✅ Admin Created Successfully');
    console.log(admin);

    process.exit();

  } catch (error) {
    console.log('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();