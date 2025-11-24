# Quick Setup Guide

## Problem: MongoDB Not Running

The login/register features require MongoDB to be installed and running.

## Solution: Install MongoDB

### Option 1: Install MongoDB Community Edition (Recommended)

1. **Download MongoDB**:
   - Visit: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Install with default settings

2. **Start MongoDB**:
   - MongoDB should start automatically after installation
   - Or run: `net start MongoDB` (as Administrator)

### Option 2: Use MongoDB Atlas (Cloud - Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster
3. Get your connection string
4. Update `server/.env`:
   ```
   MONGODB_URI=your_atlas_connection_string
   ```

## Create Admin User

Once MongoDB is running, create an admin user:

```bash
cd server
node createAdmin.js
```

This will create:
- **Username**: `admin`
- **Password**: `admin123`

## Login

1. Navigate to http://localhost:5173/login
2. Enter:
   - Username: `admin`
   - Password: `admin123`
3. You'll be redirected to the Admin Dashboard

## Troubleshooting

### MongoDB Connection Error
If you see "MongoDB Connection Error" in the server terminal:
- Make sure MongoDB is installed and running
- Check if MongoDB service is running: `net start MongoDB`
- Try restarting the server: `npm start`

### Can't Create Admin User
- Make sure MongoDB is running first
- Check the connection string in `server/.env`
