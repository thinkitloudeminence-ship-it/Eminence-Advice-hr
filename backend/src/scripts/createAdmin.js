const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('Connected to DB');
  
  // Hash password properly
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Admin@123456', salt);
  
  console.log('Hashed password:', hashedPassword);
  
  // Delete existing admin
  await mongoose.connection.db.collection('users').deleteMany({ email: 'admin@eminanceadvice.com' });
  console.log('Deleted existing admin');
  
  // Create new admin
  const result = await mongoose.connection.db.collection('users').insertOne({
    name: 'Super Admin',
    email: 'admin@eminanceadvice.com',
    password: hashedPassword,
    role: 'super_admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  console.log('✅ Admin user created successfully!');
  console.log('📧 Email: admin@eminanceadvice.com');
  console.log('🔑 Password: Admin@123456');
  console.log('Hashed password starts with:', hashedPassword.substring(0, 10));
  
  // Verify
  const user = await mongoose.connection.db.collection('users').findOne({ email: 'admin@eminanceadvice.com' });
  console.log('Password in DB starts with:', user.password.substring(0, 10));
  
  process.exit();
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});