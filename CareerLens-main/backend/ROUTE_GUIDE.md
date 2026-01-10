# Backend API Routes Guide

## 📍 Available Routes

### Base URL
```
http://localhost:5000/api
```

## 🔗 Complete Route List

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID

### Roles
- `GET /api/roles` - Get all roles
- `GET /api/roles/:id` - Get role by ID

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get question by ID
- `POST /api/questions/:id/validate` - Validate answer

### Assessments ⚠️ Important
- `POST /api/assessments` - **Create new assessment** (this is the main entry point)
- `POST /api/assessments/:sessionId/submit` - Submit answers and get results
- `GET /api/assessments/:sessionId` - Get assessment results

### Interview
- `POST /api/interview/feedback` - Analyze interview performance
- `POST /api/interview/questions/generate` - Generate interview questions

### AI Career Coach
- `POST /api/coach/chat` - Chat with AI coach

### Health Check
- `GET /health` - Server health status

---

## 🚨 Common Issues

### Issue 1: `/assessment` route doesn't exist

**Problem:** You're trying to access `/assessment` but the route is `/api/assessments` (plural, with `/api` prefix)

**Solution:**
- ✅ Use: `POST http://localhost:5000/api/assessments`
- ❌ Don't use: `/assessment` or `/api/assessment`

### Issue 2: Frontend Route Mismatch

**In the frontend:**
- `SkillSelection.tsx` navigates to `/assessment` (line 54)
- But `App.tsx` has route `/test` (not `/assessment`)

**This is a frontend routing issue**, not backend. The backend route `/api/assessments` is correct.

### Issue 3: "Database not connected" Error

**If you get:**
```json
{
  "success": false,
  "message": "Database not connected..."
}
```

**Solutions:**
1. Make sure MongoDB is running (local or Atlas)
2. Check `MONGODB_URI` in `.env` file
3. Verify connection string is correct
4. Restart server after fixing `.env`

---

## 📝 Testing Routes

### Test Assessment Creation

```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "google",
    "roleId": "software-engineer",
    "selectedSkills": ["algorithms", "system-design"]
  }'
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

### Test Assessment Submission

```bash
curl -X POST http://localhost:5000/api/assessments/YOUR_SESSION_ID/submit \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [
      {
        "questionId": "question_id_here",
        "answer": 1,
        "timeSpent": 120
      }
    ]
  }'
```

### Test Health Check

```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

---

## 🔍 Debugging Routes

### Check if Route is Registered

When server starts, all routes are loaded. Check console for errors.

### Test Route Manually

Use Postman, curl, or browser (for GET requests):
```bash
# Test companies endpoint
curl http://localhost:5000/api/companies

# Test health endpoint
curl http://localhost:5000/health
```

### Check Route Parameters

Make sure you're using correct:
- ✅ HTTP method (GET, POST, etc.)
- ✅ Route path (including `/api` prefix)
- ✅ Request body format (for POST)
- ✅ Headers (`Content-Type: application/json`)

---

## 🎯 Quick Reference

| Frontend Route | Backend API Route | Method | Purpose |
|---------------|-------------------|--------|---------|
| `/test` | `/api/assessments` | POST | Create assessment |
| - | `/api/assessments/:id/submit` | POST | Submit answers |
| - | `/api/assessments/:id` | GET | Get results |
| `/selection` | `/api/companies` | GET | Get companies |
| `/role` | `/api/roles` | GET | Get roles |
| `/skills` | `/api/skills` | GET | Get skills |
| - | `/api/questions` | GET | Get questions |
| `/interview` | `/api/interview/feedback` | POST | Interview analysis |

---

## 💡 Important Notes

1. **All backend routes start with `/api`** (except `/health`)
2. **Assessments route is plural**: `/api/assessments` (not `/api/assessment`)
3. **Database must be connected** for assessment routes to work
4. **Frontend routes are different** from backend API routes
5. **Always use POST for creating/submitting** assessments
6. **Use GET for retrieving** data (companies, roles, skills, questions)

---

## 🐛 Troubleshooting

**"Cannot POST /api/assessments"**
- Check server is running on port 5000
- Verify route is registered (check server.js)
- Check for typos in URL

**"Route not found"**
- Make sure you're using `/api/assessments` (not `/assessment`)
- Check HTTP method matches (POST vs GET)
- Verify route path spelling

**"Database not connected"**
- Check MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Restart server after fixing

**"Invalid request body"**
- Check JSON format is correct
- Verify `Content-Type: application/json` header
- Ensure required fields are present (companyId, roleId)