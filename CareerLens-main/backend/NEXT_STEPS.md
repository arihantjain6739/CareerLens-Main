# ✅ Next Steps - What You Need to Do

## 🎯 Quick Checklist

Follow these steps in order:

### Step 1: Verify .env File ✅

**Location:** `backend/.env` (same folder as `server.js`)

**Check if file exists and has correct format:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
OPENAI_API_KEY=sk-your-openai-api-key-here
FRONTEND_URL=http://localhost:3000
```

**Verify:**
- [ ] File is named exactly `.env` (with the dot)
- [ ] File is in `backend/` folder
- [ ] MongoDB connection string is set (or leave empty for local MongoDB)
- [ ] OpenAI API key is set (or leave empty for mock data)
- [ ] No spaces around `=` sign
- [ ] No quotes around values (unless needed)

---

### Step 2: Start/Restart Server 🔄

**Stop current server** (if running):
- Press `Ctrl + C` in terminal

**Start server:**
```bash
cd backend
npm run dev
```

**Check output - you should see:**
```
📝 Environment variables check:
   MONGODB_URI: ✅ Set (or ❌ Not set if using local)
   OPENAI_API_KEY: ✅ Set (or ❌ Not set if using mock data)
🚀 Server running on port 5000
💾 MongoDB: Atlas configured (or Using local fallback)
✅ Connected to MongoDB
```

**If you see errors:**
- Check `.env` file location and format
- Make sure MongoDB is running (if using local)
- See `ENV_TROUBLESHOOTING.md` for help

---

### Step 3: Seed Database (Optional but Recommended) 🌱

**Only if you want sample data:**
```bash
cd backend
npm run seed
```

**This will add:**
- 6 companies (Google, Amazon, Meta, etc.)
- 6 roles (Software Engineer, Frontend Developer, etc.)
- 15 skills (Technical, Languages, Soft Skills)
- 4 sample questions (MCQ and coding)

**Expected output:**
```
✅ Connected to MongoDB
✅ Inserted 6 companies
✅ Inserted 6 roles
✅ Inserted 15 skills
✅ Inserted 4 questions
🎉 Database seeded successfully!
```

---

### Step 4: Test Backend API 🧪

**Open new terminal** and test endpoints:

**1. Health Check:**
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"ok",...}`

**2. Get Companies:**
```bash
curl http://localhost:5000/api/companies
```
Should return: `{"success":true,"data":[...]}`

**3. Create Assessment:**
```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -d "{\"companyId\":\"google\",\"roleId\":\"software-engineer\",\"selectedSkills\":[\"algorithms\"]}"
```

**Or use Postman/Browser:**
- Install Postman or use browser DevTools
- Test: `GET http://localhost:5000/api/companies`

---

### Step 5: Test Assessment Route Specifically 🎯

**Create Assessment:**
```bash
POST http://localhost:5000/api/assessments
Content-Type: application/json

{
  "companyId": "google",
  "roleId": "software-engineer",
  "selectedSkills": ["algorithms", "system-design"]
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "uuid-string-here",
    "assessment": { ... }
  }
}
```

**Save the `sessionId` for next step!**

**Submit Assessment:**
```bash
POST http://localhost:5000/api/assessments/YOUR_SESSION_ID/submit
Content-Type: application/json

{
  "answers": [
    {
      "questionId": "question_object_id",
      "answer": 1,
      "timeSpent": 120
    }
  ]
}
```

---

## 🔧 Troubleshooting Common Issues

### Issue: "Database not connected"
**Solution:**
- If using MongoDB Atlas: Check connection string in `.env`
- If using local MongoDB: Make sure MongoDB service is running
- Check `MONGODB_URI` in `.env` file
- Restart server after fixing

### Issue: "OpenAI API key not configured"
**Solution:**
- Add `OPENAI_API_KEY` to `.env` file (optional)
- Server will work with mock data if not set
- AI features will degrade gracefully

### Issue: "Cannot find .env file"
**Solution:**
- Create `.env` file in `backend/` folder
- Make sure it's named `.env` (not `env` or `.env.txt`)
- See `ENV_SETUP.md` for detailed instructions

### Issue: "Route not found" or "Cannot POST /api/assessments"
**Solution:**
- Make sure server is running on port 5000
- Use exact route: `/api/assessments` (plural, with `/api` prefix)
- Check HTTP method: POST for create, GET for retrieve
- See `ROUTE_GUIDE.md` for all available routes

---

## 📋 Minimum Requirements

**To get server running:**
- [x] Node.js installed
- [x] Dependencies installed (`npm install`)
- [x] `.env` file created (even if empty)
- [x] Server starts without errors

**To get database working:**
- [ ] MongoDB running (local or Atlas)
- [ ] `MONGODB_URI` in `.env` (or leave empty for local)
- [ ] Database seeded (optional)

**To get AI features working:**
- [ ] `OPENAI_API_KEY` in `.env` (optional, uses mock data if not set)

---

## 🚀 Quick Start Commands

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies (if not done)
npm install

# 3. Start server
npm run dev

# 4. In another terminal - Seed database (optional)
npm run seed

# 5. Test API
curl http://localhost:5000/health
curl http://localhost:5000/api/companies
```

---

## ✅ Verification Checklist

Before moving forward, verify:

- [ ] Server starts without errors
- [ ] Health endpoint returns `{"status":"ok"}`
- [ ] Companies endpoint returns data (or empty array if not seeded)
- [ ] Assessment creation endpoint works (`POST /api/assessments`)
- [ ] Database is connected (check console output)
- [ ] No deprecation warnings in console

---

## 📚 Reference Documents

- **`QUICK_START.md`** - Quick setup guide
- **`ENV_SETUP.md`** - Environment variables setup
- **`ENV_TROUBLESHOOTING.md`** - Fix environment issues
- **`ROUTE_GUIDE.md`** - All API routes and how to use them
- **`MONGODB_SETUP.md`** - MongoDB installation and setup
- **`LOCAL_MONGODB_GUIDE.md`** - Local MongoDB installation

---

## 🎯 What You've Already Done ✅

- [x] Backend code is fixed (server.js, routes, services)
- [x] MongoDB deprecation warnings removed
- [x] Database connection checks added
- [x] OpenAI lazy loading implemented
- [x] Environment variable loading fixed

---

## 🎯 What's Left to Do

1. **Verify `.env` file** exists and is correct
2. **Restart server** to apply changes
3. **Test endpoints** to make sure they work
4. **Seed database** (optional) for sample data
5. **Integrate with frontend** (next phase)

---

## 💡 Quick Test Script

Save this as `backend/test-api.js`:
```javascript
const API_URL = 'http://localhost:5000';

async function testAPI() {
  try {
    // Test health
    const health = await fetch(`${API_URL}/health`).then(r => r.json());
    console.log('✅ Health:', health.status);

    // Test companies
    const companies = await fetch(`${API_URL}/api/companies`).then(r => r.json());
    console.log('✅ Companies:', companies.success ? `${companies.data.length} found` : 'Failed');

    // Test assessment creation
    const assessment = await fetch(`${API_URL}/api/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId: 'google',
        roleId: 'software-engineer',
        selectedSkills: ['algorithms']
      })
    }).then(r => r.json());
    console.log('✅ Assessment:', assessment.success ? 'Created' : assessment.message);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
```

Run: `node test-api.js`

---

## 🎉 You're Ready!

Once all checks pass, your backend is ready to use. The main thing is:
1. ✅ `.env` file is correct
2. ✅ Server starts without errors
3. ✅ Routes respond correctly

Everything else is optional or can be done later!