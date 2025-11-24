// Simple in-memory storage for development (no MongoDB needed)
const users = [
    {
        _id: '1',
        username: 'admin',
        password: '$2a$10$rKvVJKn5YhGXjJ5QYqYqYeHxGxGxGxGxGxGxGxGxGxGxGxGxGxGx', // hashed 'admin123'
        role: 'admin'
    }
];

const posts = [];
const subscribers = [];

module.exports = {
    users,
    posts,
    subscribers
};
