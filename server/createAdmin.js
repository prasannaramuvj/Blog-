const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_db');
        console.log('MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Username: admin');
            process.exit(0);
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('\nYou can now login at http://localhost:5173/login');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        console.error('\n⚠️  Make sure MongoDB is installed and running!');
        console.error('Install MongoDB: https://www.mongodb.com/try/download/community');
        process.exit(1);
    }
}

createAdmin();
