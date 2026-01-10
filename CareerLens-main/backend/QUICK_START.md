# Quick Start Guide - CareerLens Backend

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Set Up MongoDB (FREE Local Option)

**Option A: Use Local MongoDB (Recommended - FREE & Easy!)**

1. **Install MongoDB locally:**
   - **Windows:** Download from https://www.mongodb.com/try/download/community
   - **Mac:** `brew install mongodb-community` (after `brew tap mongodb/brew`)
   - **Linux:** See installation guide below
   
2. **Start MongoDB:**
   - **Windows:** Service starts automatically, or use Services app
   - **Mac:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`

3. **That's it!** Server will use `mongodb://localhost:27017/careerlens` automatically

📚 **Full guide:** See `LOCAL_MONGODB_GUIDE.md` for detailed installation steps

**Option B: Use MongoDB Atlas (Also FREE, but requires internet)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account (M0 tier is FREE)
3. Get connection string and add to `.env`

### Step 3: Set Up Environment Variables (Optional)

**If using local MongoDB:** No `.env` needed! Server uses defaults.

**If using MongoDB Atlas or custom settings:** Create `.env` file in `backend/` folder:

```bash
# From backend directory
touch .env        # Mac/Linux
type nul > .env   # Windows CMD
```

Then edit `.env`:
```env
PORT=5000
# Only needed if using MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerlens
# Optional - for AI features:
OPENAI_API_KEY=your_openai_api_key
FRONTEND_URL=http://localhost:3000
```

**For OpenAI (Optional):**
- Get API key from https://platform.openai.com/api-keys
- Without this, AI features use mock data

### Step 4: Seed Database (Optional)

**Make sure MongoDB is running first!** Then populate with sample data:
```bash
npm run seed
```

### Step 5: Start Server

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

### Step 6: Test API

Open browser or use curl:
```bash
# Health check
curl http://localhost:5000/health

# Get companies
curl http://localhost:5000/api/companies

# Get roles
curl http://localhost:5000/api/roles
```

## 🎯 Integration with Frontend

Update your frontend `.env` or `vite.config.ts`:

```typescript
// In vite.config.ts or frontend .env
VITE_API_URL=http://localhost:5000
```

Then in your frontend components:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fetch companies
const companies = await fetch(`${API_URL}/api/companies`).then(r => r.json());
```

## 🔧 Troubleshooting

**"Cannot connect to MongoDB"**
- **For local MongoDB:** Make sure MongoDB service is running
  - Windows: Check Services app for "MongoDB"
  - Mac: `brew services list | grep mongodb`
  - Linux: `sudo systemctl status mongod`
- **For MongoDB Atlas:** Check connection string and IP whitelist
- Try default local: `mongodb://localhost:27017/careerlens` (no .env needed)

**"OpenAI API Error"**
- Verify API key is correct
- Check account has credits
- Server will continue with mock data if OpenAI fails

**"Port 5000 already in use"**
- Change `PORT=5001` in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

## 📚 Next Steps

- See [README.md](./README.md) for full API documentation
- Check API endpoints at `http://localhost:5000/api/companies`
- Test AI features with assessment submission

## 💡 Tips

- Server runs without MongoDB (but data won't persist)
- Server runs without OpenAI (but AI features use mock data)
- All endpoints return JSON with `{ success: true, data: ... }` format