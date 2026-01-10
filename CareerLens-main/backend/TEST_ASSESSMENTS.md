# Testing /api/assessments Route

## 🚨 Common Issue: "Route not found"

**If you see "Route not found" for `/api/assessments`, check:**

### Issue 1: Using Wrong HTTP Method
- ✅ **POST** `/api/assessments` - Creates assessment (CORRECT)
- ❌ **GET** `/api/assessments` - Now works (lists assessments)

### Issue 2: Route Path Typo
- ✅ `/api/assessments` (plural, with `/api` prefix)
- ❌ `/assessment` (singular, wrong)
- ❌ `/assessments` (missing `/api` prefix)
- ❌ `/api/assessment` (singular, wrong)

---

## ✅ Correct Usage

### 1. Create Assessment (POST)
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
    "sessionId": "uuid-here",
    "assessment": { ... }
  }
}
```

### 2. List All Assessments (GET) - NEW!
```bash
GET http://localhost:5000/api/assessments
```

**Expected Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "Use POST /api/assessments to create a new assessment"
}
```

### 3. Get Assessment by Session ID
```bash
GET http://localhost:5000/api/assessments/YOUR_SESSION_ID
```

### 4. Submit Assessment Answers
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

## 🧪 Testing Methods

### Method 1: Using Browser
- Open: `http://localhost:5000/api/assessments`
- This does a **GET** request
- Should now work (shows list of assessments)

### Method 2: Using curl (Command Line)
```bash
# Test GET (list)
curl http://localhost:5000/api/assessments

# Test POST (create)
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -d "{\"companyId\":\"google\",\"roleId\":\"software-engineer\",\"selectedSkills\":[\"algorithms\"]}"
```

### Method 3: Using Postman
1. Set method to **POST**
2. URL: `http://localhost:5000/api/assessments`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "companyId": "google",
  "roleId": "software-engineer",
  "selectedSkills": ["algorithms"]
}
```

### Method 4: Using JavaScript/Fetch
```javascript
// Create assessment
const response = await fetch('http://localhost:5000/api/assessments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    companyId: 'google',
    roleId: 'software-engineer',
    selectedSkills: ['algorithms']
  })
});

const data = await response.json();
console.log(data);
```

---

## 🔍 Debugging Steps

### Step 1: Check Server is Running
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"ok"}`

### Step 2: Check Route is Registered
When server starts, you should see:
```
📋 Registered API Routes:
   GET  /api/assessments (list all)
   POST /api/assessments (create new)
   ...
```

### Step 3: Test with Correct Method
Make sure you're using **POST** to create:
```bash
# This will fail (wrong method)
GET http://localhost:5000/api/assessments

# This will work (correct method)
POST http://localhost:5000/api/assessments
```

### Step 4: Check Request Format
**Required fields:**
- `companyId` (string, required)
- `roleId` (string, required)
- `selectedSkills` (array, optional)

**Example correct request:**
```json
{
  "companyId": "google",
  "roleId": "software-engineer",
  "selectedSkills": ["algorithms"]
}
```

---

## 🐛 Common Errors

### Error: "Route not found"
**Causes:**
- Wrong URL path
- Server not running
- Route not registered

**Solutions:**
- Check server is running on port 5000
- Verify URL: `http://localhost:5000/api/assessments`
- Check console for route registration messages
- Restart server

### Error: "Database not connected"
**Cause:** MongoDB not running or connection string wrong

**Solution:**
- Check MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Restart server after fixing

### Error: "Company ID and Role ID are required"
**Cause:** Missing required fields in request body

**Solution:**
- Include `companyId` and `roleId` in JSON body
- Check JSON format is correct
- Verify `Content-Type: application/json` header

---

## ✅ Quick Test Checklist

- [ ] Server is running (`npm run dev`)
- [ ] Health check works (`GET /health`)
- [ ] Using correct URL (`http://localhost:5000/api/assessments`)
- [ ] Using correct HTTP method (POST to create)
- [ ] Request body includes `companyId` and `roleId`
- [ ] `Content-Type: application/json` header is set
- [ ] MongoDB is connected (check console)

---

## 💡 Pro Tips

1. **Always use POST** to create assessments (GET now works for listing)
2. **Check server console** for route registration messages
3. **Use Postman** for easier testing (better than browser)
4. **Save the sessionId** from create response (needed for submit)
5. **Check database** is connected before testing

---

## 📞 Still Not Working?

1. **Restart server** completely (Ctrl+C, then `npm run dev`)
2. **Check console output** for errors
3. **Verify route registration** message appears on startup
4. **Test health endpoint first** to verify server is working
5. **Check database connection** status in console

If still having issues, share:
- The exact error message
- The HTTP method you're using
- The full URL you're calling
- Server console output