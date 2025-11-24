const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory database
let users = [
    {
        _id: '1',
        username: 'prasannaramu2004@gmail.com',
        password: bcrypt.hashSync('5504', 10),
        role: 'admin'
    }
];

let posts = [
    {
        _id: '1',
        title: 'Welcome to the Blog',
        content: 'This is your first blog post. You can edit or delete this post from the admin dashboard.',
        author: 'prasannaramu2004@gmail.com',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

let subscribers = [];
let contactMessages = [];
let postIdCounter = 2;
let userIdCounter = 2;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            _id: String(userIdCounter++),
            username,
            password: hashedPassword,
            role: role || 'user'
        };

        users.push(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key_here',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Post Routes
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p._id === req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
});

app.post('/api/posts', upload.single('image'), (req, res) => {
    try {
        const { title, content, author } = req.body;
        let image = '';

        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        const newPost = {
            _id: String(postIdCounter++),
            title,
            content,
            author,
            image,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        posts.push(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/posts/:id', upload.single('image'), (req, res) => {
    try {
        const { title, content, author } = req.body;
        const postIndex = posts.findIndex(p => p._id === req.params.id);

        if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

        const post = posts[postIndex];
        post.title = title || post.title;
        post.content = content || post.content;
        post.author = author || post.author;
        post.updatedAt = new Date();

        if (req.file) {
            if (post.image) {
                const oldImagePath = path.join(__dirname, post.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            post.image = `/uploads/${req.file.filename}`;
        }

        posts[postIndex] = post;
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/posts/:id', (req, res) => {
    try {
        const postIndex = posts.findIndex(p => p._id === req.params.id);
        if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

        const post = posts[postIndex];
        if (post.image) {
            const imagePath = path.join(__dirname, post.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        posts.splice(postIndex, 1);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Contact Form Route
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        contactMessages.push({
            name,
            email,
            subject,
            message,
            createdAt: new Date()
        });

        console.log(`📧 New contact message from ${name} (${email}): ${subject}`);
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Subscriber Routes
app.post('/api/subscribe', (req, res) => {
    try {
        const { email } = req.body;

        const existingSubscriber = subscribers.find(s => s.email === email);
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        subscribers.push({ email, createdAt: new Date() });
        res.status(201).json({ message: 'Successfully subscribed!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Blog API is running (In-Memory Mode - No MongoDB Required)');
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📝 In-Memory Mode (No MongoDB required)`);
    console.log(`👤 Admin: username='prasannaramu2004@gmail.com', password='5504'`);
});
