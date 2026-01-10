# Local MongoDB Setup Guide - FREE & Easy!

## ✅ Yes, You Can Use Local MongoDB (Completely FREE!)

Local MongoDB is **FREE**, works **offline**, and is **perfect for development**. This guide will help you set it up in minutes.

## 🚀 Quick Installation

### Windows

**Method 1: Download Installer (Recommended)**
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or newer)
   - Platform: Windows
   - Package: MSI
3. Download and run installer
4. Choose "Complete" installation
5. ✅ **Important:** Check "Install MongoDB as a Service"
6. Click "Install"
7. MongoDB will start automatically!

**Method 2: Using Chocolatey**
```powershell
choco install mongodb
```

**Verify Installation:**
```powershell
mongod --version
# Should show: db version v7.0.x
```

**Start/Stop MongoDB:**
```powershell
# Check status in Services app (services.msc)
# Or use command:
net start MongoDB    # Start
net stop MongoDB     # Stop
```

### Mac

**Using Homebrew (Easiest):**
```bash
# Install Homebrew if you don't have it: https://brew.sh

# Add MongoDB tap
brew tap mongodb/brew

# Install MongoDB
brew install mongodb-community

# Start MongoDB (starts automatically, but you can control it)
brew services start mongodb-community

# Verify
mongod --version
```

**Start/Stop MongoDB:**
```bash
brew services start mongodb-community   # Start
brew services stop mongodb-community    # Stop
brew services restart mongodb-community # Restart
brew services list                      # Check status
```

### Linux (Ubuntu/Debian)

```bash
# 1. Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# 2. Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 3. Update package list
sudo apt-get update

# 4. Install MongoDB
sudo apt-get install -y mongodb-org

# 5. Start MongoDB
sudo systemctl start mongod

# 6. Enable auto-start on boot
sudo systemctl enable mongod

# 7. Verify
sudo systemctl status mongod
mongod --version
```

**Start/Stop MongoDB:**
```bash
sudo systemctl start mongod      # Start
sudo systemctl stop mongod       # Stop
sudo systemctl restart mongod    # Restart
sudo systemctl status mongod     # Check status
```

## 🔧 Configuration

### Default Settings (No Configuration Needed!)

Local MongoDB uses these defaults:
- **Host:** `localhost`
- **Port:** `27017`
- **Database:** Will be created automatically when you use it

### Option 1: Use Default (No .env needed!)

The server already has a fallback:
```javascript
mongodb://localhost:27017/careerlens
```

Just install MongoDB and start it - **that's it!**

### Option 2: Explicitly Set in .env

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/careerlens
```

## ✅ Verify Installation

### 1. Check MongoDB is Running

**Windows:**
- Open Services app (press `Win + R`, type `services.msc`)
- Look for "MongoDB" service
- Status should be "Running"

**Mac/Linux:**
```bash
# Mac
brew services list | grep mongodb

# Linux
sudo systemctl status mongod
```

### 2. Test Connection

**Using MongoDB Shell (if installed):**
```bash
mongosh
# or older versions: mongo
```

If it connects, you'll see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
✅ Connected to MongoDB!
```

### 3. Test with Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
📚 Database status: Connected
```

## 📊 Seed Database (Optional)

Once MongoDB is running, populate it with sample data:

```bash
cd backend
npm run seed
```

You should see:
```
✅ Connected to MongoDB
✅ Inserted 6 companies
✅ Inserted 6 roles
✅ Inserted 15 skills
✅ Inserted 4 questions
🎉 Database seeded successfully!
```

## 🔍 Troubleshooting

### MongoDB Won't Start

**Windows:**
```powershell
# Check if service exists
Get-Service MongoDB

# Try starting manually
net start MongoDB

# Check logs (default location)
# C:\Program Files\MongoDB\Server\7.0\log\mongod.log
```

**Mac:**
```bash
# Check logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Check if port is in use
lsof -i :27017
```

**Linux:**
```bash
# Check logs
sudo tail -f /var/log/mongodb/mongod.log

# Check if port is in use
sudo lsof -i :27017

# Check if MongoDB is running
sudo systemctl status mongod
```

### Port 27017 Already in Use

**Find what's using the port:**
```bash
# Windows
netstat -ano | findstr :27017

# Mac/Linux
lsof -i :27017
```

**Solutions:**
1. Stop the conflicting service
2. Or change MongoDB port in config (advanced)

### Permission Denied Errors

**Linux/Mac:**
```bash
# Make sure MongoDB has write permissions
sudo chown -R mongod:mongod /var/lib/mongodb
sudo chown -R mongod:mongod /var/log/mongodb
```

### Connection Refused

**Check if MongoDB is running:**
- Windows: Services app
- Mac: `brew services list`
- Linux: `sudo systemctl status mongod`

**Try connecting manually:**
```bash
mongosh mongodb://localhost:27017
```

## 📁 Default Directories

**Windows:**
- Data: `C:\Program Files\MongoDB\Server\7.0\data\db`
- Logs: `C:\Program Files\MongoDB\Server\7.0\log\mongod.log`

**Mac:**
- Data: `/usr/local/var/mongodb`
- Logs: `/usr/local/var/log/mongodb/mongo.log`

**Linux:**
- Data: `/var/lib/mongodb`
- Logs: `/var/log/mongodb/mongod.log`

## 🎯 Quick Reference

| Action | Windows | Mac | Linux |
|--------|---------|-----|-------|
| **Start** | `net start MongoDB` | `brew services start mongodb-community` | `sudo systemctl start mongod` |
| **Stop** | `net stop MongoDB` | `brew services stop mongodb-community` | `sudo systemctl stop mongod` |
| **Status** | Services app | `brew services list` | `sudo systemctl status mongod` |
| **Connect** | `mongosh` | `mongosh` | `mongosh` |
| **Connection String** | `mongodb://localhost:27017/careerlens` | Same | Same |

## ✅ Checklist

- [ ] MongoDB installed
- [ ] MongoDB service/daemon is running
- [ ] Test connection with `mongosh`
- [ ] Backend connects (run `npm run dev`)
- [ ] Database seeded (run `npm run seed`)
- [ ] API endpoints work (test `/api/companies`)

## 🎉 You're Done!

Local MongoDB is now set up and ready to use. It's:
- ✅ **FREE** - No costs ever
- ✅ **Fast** - No network latency
- ✅ **Offline** - Works without internet
- ✅ **Simple** - Default settings work perfectly
- ✅ **Secure** - Only accessible on your machine

**No MongoDB Atlas needed!** 🚀