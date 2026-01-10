# Environment Variables Setup

## 📍 Location

**The `.env` file MUST be created in the `backend/` folder**, not in the parent directory.

```
CareerLens-main/
├── backend/
│   ├── .env          ✅ CORRECT LOCATION
│   ├── server.js
│   ├── package.json
│   └── ...
├── components/       ❌ NOT HERE
└── ...
```

## 🔧 Why?

- The server runs from the `backend/` directory
- `dotenv.config()` in `server.js` looks for `.env` in the current working directory
- When you run `npm run dev`, Node.js executes from `backend/` folder

## 📝 Steps to Create

### Option 1: Manual Creation
1. Navigate to `backend/` folder
2. Create a new file named `.env`
3. Copy content from `.env.example` (if available) or use the template below

### Option 2: Command Line

**Windows (PowerShell):**
```powershell
cd backend
New-Item -Path .env -ItemType File
```

**Windows (CMD):**
```cmd
cd backend
type nul > .env
```

**Mac/Linux:**
```bash
cd backend
touch .env
```

## 📋 Template

Copy this into your `backend/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
# Get this from: https://cloud.mongodb.com/
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerlens?retryWrites=true&w=majority

# OpenAI API Key (Optional - AI features will use mock data if not provided)
# Get this from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-api-key-here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## ✅ Verification

After creating the `.env` file, verify it's in the correct location:

```bash
# From backend folder
ls -la .env        # Mac/Linux
dir .env           # Windows CMD
Get-ChildItem .env # Windows PowerShell
```

You should see the `.env` file listed.

## 🚨 Common Mistakes

1. **Creating in parent folder** - Server won't find it ❌
2. **Naming it `env` instead of `.env`** - Missing the dot ❌
3. **Adding quotes around values** - Usually not needed ❌
4. **Forgetting to save** - Make sure file is saved ✅

## 🔒 Security

- ✅ `.env` is already in `.gitignore` (won't be committed)
- ✅ Never commit API keys to git
- ✅ Each developer should have their own `.env` file
- ✅ Use different keys for development/production

## 📝 After Setup

Once `.env` is created:
1. Fill in your actual values
2. Save the file
3. Run `npm run dev` from the `backend/` folder
4. Server will automatically load the variables

## 🐛 Troubleshooting

**"Cannot find module" or undefined environment variables:**
- Verify `.env` is in `backend/` folder
- Check file is named exactly `.env` (not `env.txt` or `.env.example`)
- Restart the server after creating/editing `.env`

**"MongoDB connection failed":**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist
- Ensure username/password don't have special characters (URL encode if needed)

**"OpenAI API error":**
- Verify `OPENAI_API_KEY` starts with `sk-`
- Check API key is active in OpenAI dashboard
- Server will continue with mock data if key is missing