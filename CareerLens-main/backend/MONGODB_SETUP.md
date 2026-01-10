# MongoDB Setup Guide

## 🤔 Will the Code Work Without MongoDB?

**Short Answer:** The server will **start and run**, but **database-dependent endpoints will return errors**.

### What Happens:

1. ✅ **Server starts successfully** - Express server runs fine
2. ✅ **Health endpoint works** - `/health` shows database status
3. ✅ **Non-DB endpoints work** - Interview feedback, coach chat (if OpenAI configured)
4. ❌ **DB endpoints return errors** - Companies, roles, skills, questions, assessments will fail

## 📊 Current Behavior

### With MongoDB:
- All endpoints work normally
- Data persists in database
- You can seed initial data

### Without MongoDB:
- Server starts: ✅
- API endpoints return: `503 Service Unavailable` with helpful error message
- Error message: `"Database not connected. Please configure MONGODB_URI in .env file"`

## 🔧 Options

### Option 1: Use Local MongoDB (FREE - Recommended for Development)

**This is completely FREE and works offline!**

**Windows:**
```bash
# Option A: Download installer
# 1. Go to: https://www.mongodb.com/try/download/community
# 2. Download MongoDB Community Edition
# 3. Run installer (default settings are fine)
# 4. MongoDB will start automatically as a service

# Option B: Using Chocolatey (if installed)
choco install mongodb
```

**Mac:**
```bash
# Using Homebrew (easiest)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod  # Auto-start on boot
```

**Verify Installation:**
```bash
mongod --version
# Should show MongoDB version

# Check if running (Windows)
# Check Services app for "MongoDB" service

# Check if running (Mac/Linux)
sudo systemctl status mongod
```

**Connection String (no .env needed for local):**
```
mongodb://localhost:27017/careerlens
```

**Or add to `.env`:**
```env
MONGODB_URI=mongodb://localhost:27017/careerlens
```

**Benefits:**
- ✅ Completely FREE
- ✅ Works offline
- ✅ No internet required
- ✅ Full control
- ✅ Fast (no network latency)
- ✅ Perfect for development

**Default Settings:**
- Host: `localhost`
- Port: `27017`
- Database: `careerlens` (created automatically)

**Start/Stop MongoDB:**

Windows (Service):
- Start: Services app → MongoDB → Start
- Or: `net start MongoDB`
- Stop: `net stop MongoDB`

Mac:
```bash
brew services start mongodb-community  # Start
brew services stop mongodb-community   # Stop
brew services restart mongodb-community # Restart
```

Linux:
```bash
sudo systemctl start mongod    # Start
sudo systemctl stop mongod     # Stop
sudo systemctl restart mongod  # Restart
```

### Option 2: Use MongoDB Atlas (FREE Tier Available)

**Note:** MongoDB Atlas has a **FREE tier** (M0 - 512MB), so it's also free! But local MongoDB is simpler for development.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a free cluster (M0 - 512MB) - **Completely FREE**
4. Get connection string
5. Add to `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerlens
   ```

**Benefits:**
- ✅ Free tier (512MB storage)
- ✅ Cloud-based (no local install)
- ✅ Always available
- ✅ Easy to use

### Option 3: Use Docker (Alternative to Local Install)

If you have Docker installed, this is the quickest way:

### Option 4: Use Docker (Alternative)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then use: `mongodb://localhost:27017/careerlens`

**Benefits:**
- ✅ No installation needed (if you have Docker)
- ✅ Easy cleanup (just remove container)
- ✅ Isolated from system MongoDB

**Commands:**
```bash
# Start MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Stop MongoDB
docker stop mongodb

# Remove container
docker rm mongodb
```

### Option 5: Run Without MongoDB (Limited - Testing Only)

**What works:**
- ✅ Server starts
- ✅ Health check endpoint
- ✅ Interview endpoints (if OpenAI configured)
- ✅ Coach chat endpoint (if OpenAI configured)

**What doesn't work:**
- ❌ Companies API
- ❌ Roles API  
- ❌ Skills API
- ❌ Questions API
- ❌ Assessments API (create/submit/get)

**For development/testing:**
You can still test interview and coach features without MongoDB!

## 🚀 Quick Setup (MongoDB Atlas)

### Step 1: Create Account
1. Visit https://cloud.mongodb.com/
2. Sign up (free)

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "M0 FREE" tier
3. Select cloud provider/region (closest to you)
4. Name your cluster (default is fine)
5. Click "Create"

### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Set privileges to "Atlas admin" (for development)
6. Click "Add User"

### Step 4: Whitelist IP Address
1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with `careerlens`

Example:
```
mongodb+srv://myusername:mypassword@cluster0.xxxxx.mongodb.net/careerlens?retryWrites=true&w=majority
```

### Step 6: Add to .env
```env
MONGODB_URI=mongodb+srv://myusername:mypassword@cluster0.xxxxx.mongodb.net/careerlens?retryWrites=true&w=majority
```

### Step 7: Test Connection
```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
```

## 🧪 Testing Without MongoDB

If you want to test without MongoDB setup:

```bash
# Just start server (without MONGODB_URI in .env)
npm run dev
```

Then test endpoints:
```bash
# This will work (returns 503 but server is up)
curl http://localhost:5000/api/companies

# This will work (if OpenAI configured)
curl http://localhost:5000/api/interview/feedback
```

## 🐛 Troubleshooting

**"Database not connected" error:**
- Verify MONGODB_URI is correct in `.env`
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure username/password are correct
- Try connection string without special characters (URL encode if needed)

**Connection timeout:**
- Check firewall/network settings
- Verify MongoDB Atlas cluster is running
- Try different network/VPN

**Authentication failed:**
- Verify username and password
- Check database user has correct privileges
- Ensure password doesn't contain special characters (or URL encode them)

## 💡 Recommendation

**For development:** 
- ✅ **Local MongoDB** (FREE, offline, fast, recommended)
- ✅ **MongoDB Atlas FREE tier** (if you prefer cloud, also free)

**For production:** 
- Use MongoDB Atlas (free tier or paid)
- Or dedicated MongoDB server

**For quick testing:** 
- Server will run without MongoDB, but DB endpoints won't work
- You can still test AI features (interview, coach chat)

## 🎯 Quick Start with Local MongoDB

**Simplest setup (no .env needed):**

1. Install MongoDB locally (see Option 1 above)
2. Start MongoDB service
3. **That's it!** The server will automatically use `mongodb://localhost:27017/careerlens`

**Or explicitly set in `.env`:**
```env
MONGODB_URI=mongodb://localhost:27017/careerlens
```

**Verify it works:**
```bash
# Start backend
npm run dev

# You should see:
# ✅ Connected to MongoDB
```

**Seed database:**
```bash
npm run seed
```