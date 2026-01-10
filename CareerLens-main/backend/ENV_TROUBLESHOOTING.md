# Environment Variables Troubleshooting

## 🔍 Issue: OpenAI API Key Not Loading

If you're getting this error:
```
OpenAIError: The OPENAI_API_KEY environment variable is missing or empty
```

## ✅ Quick Fix Checklist

### 1. Verify .env File Location
**The `.env` file MUST be in the `backend/` folder (same directory as `server.js`)**

```
backend/
├── .env          ← Should be HERE ✅
├── server.js
├── package.json
└── ...
```

**NOT in:**
- ❌ Parent folder (CareerLens-main/)
- ❌ A folder named ".env" (that would be wrong!)
- ❌ Any subfolder

### 2. Verify .env File Name
**File must be named exactly `.env` (with the dot!)**

- ✅ `.env` (correct)
- ❌ `env` (missing dot)
- ❌ `.env.txt` (has extension)
- ❌ `env.txt` (wrong name)

**To check on Windows:**
```powershell
# In backend folder
Get-ChildItem -Force | Select-Object Name
# Should see .env in the list
```

### 3. Verify .env File Format

**Correct format:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerlens
OPENAI_API_KEY=sk-proj-abc123xyz...
FRONTEND_URL=http://localhost:3000
```

**Common mistakes:**
- ❌ No spaces around `=`
- ❌ Quotes around values (usually not needed)
- ❌ Missing line breaks
- ❌ Extra spaces before variable names

**Example of WRONG format:**
```env
OPENAI_API_KEY = "sk-proj-abc123xyz"  ❌ (has spaces and quotes)
OPENAI_API_KEY=sk-proj-abc123xyz      ✅ (correct)
```

### 4. Verify API Key Value

**OpenAI API Key should:**
- ✅ Start with `sk-`
- ✅ Be 51+ characters long
- ✅ Have no spaces
- ✅ Be on a single line

**Example:**
```env
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### 5. Restart Server After Changes

**After editing `.env` file, you MUST restart the server:**

```bash
# Stop server (Ctrl+C)
# Then restart:
npm run dev
```

**Why?** Environment variables are loaded when the server starts, not dynamically.

### 6. Verify File is Saved

- Make sure you **saved** the `.env` file (Ctrl+S)
- Check file was actually created (see it in file explorer)
- Verify file has content (open it and see your keys)

## 🔧 Debugging Steps

### Step 1: Check if .env is being read

When you start the server, you should now see:
```
📝 Environment variables check:
   MONGODB_URI: ✅ Set
   OPENAI_API_KEY: ✅ Set (sk-proj-ab...)
   PORT: Using default (5000)
   FRONTEND_URL: Using default (http://localhost:3000)
```

If you see `❌ Not set`, the `.env` file is not being read.

### Step 2: Test .env Loading Manually

Create a test file `backend/test-env.js`:
```javascript
import dotenv from 'dotenv';
dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Found' : 'Not found');
```

Run it:
```bash
node test-env.js
```

If it shows "Not found", your `.env` file is not being read.

### Step 3: Verify File Location

**On Windows (PowerShell):**
```powershell
cd backend
Get-ChildItem -Force .env
```

**On Mac/Linux:**
```bash
cd backend
ls -la .env
```

Should show the file exists.

### Step 4: Check File Encoding

- Make sure `.env` file is saved as **UTF-8** encoding
- Not UTF-16 or other encodings
- No BOM (Byte Order Mark)

### Step 5: Verify No Syntax Errors

**Common syntax errors:**
```env
# ❌ Wrong - has trailing space
OPENAI_API_KEY=sk-proj-abc123 

# ❌ Wrong - quoted (sometimes causes issues)
OPENAI_API_KEY="sk-proj-abc123"

# ✅ Correct
OPENAI_API_KEY=sk-proj-abc123
```

## 🐛 Common Issues

### Issue 1: "File not found" or variables not loading

**Solution:**
1. Verify file is named `.env` (with dot, no extension)
2. Verify file is in `backend/` folder
3. Make sure you're running `npm run dev` from `backend/` folder
4. Restart the server after creating/editing `.env`

### Issue 2: "API key is empty" even though it's set

**Solution:**
1. Check for spaces: `OPENAI_API_KEY = value` (wrong) vs `OPENAI_API_KEY=value` (correct)
2. Check for quotes: Remove quotes if you added them
3. Check for special characters: Some keys might need to be URL-encoded
4. Copy-paste the key again (might have invisible characters)

### Issue 3: "Cannot find module" error

**Solution:**
This means `dotenv` package is missing:
```bash
cd backend
npm install
```

### Issue 4: Changes not taking effect

**Solution:**
- **ALWAYS restart the server** after editing `.env`
- Environment variables are loaded at startup, not dynamically
- Stop server (Ctrl+C) and run `npm run dev` again

## ✅ Verification Script

Create `backend/verify-env.js`:
```javascript
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '.env');

console.log('🔍 Checking .env file...\n');
console.log(`Expected location: ${envPath}`);
console.log(`File exists: ${existsSync(envPath) ? '✅ YES' : '❌ NO'}\n`);

if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('📝 Environment variables loaded:');
  console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set (' + process.env.MONGODB_URI.substring(0, 30) + '...)' : '❌ Not set'}`);
  console.log(`   OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✅ Set (' + process.env.OPENAI_API_KEY.substring(0, 10) + '...)' : '❌ Not set'}`);
  console.log(`   PORT: ${process.env.PORT || 'Not set (will use default 5000)'}`);
  console.log(`   FRONTEND_URL: ${process.env.FRONTEND_URL || 'Not set (will use default)'}`);
} else {
  console.log('❌ .env file not found at expected location!');
  console.log('💡 Create .env file in the backend/ folder');
}
```

Run it:
```bash
node verify-env.js
```

## 🎯 Quick Test

**Minimal .env file to test:**
```env
OPENAI_API_KEY=sk-test-key-123456789
```

Save this, restart server, and check if error is gone.

## 📞 Still Not Working?

1. **Check terminal output** - Server now shows environment variable status
2. **Run verification script** - Use `verify-env.js` above
3. **Check file permissions** - Make sure file is readable
4. **Try absolute path** - As last resort, use full path in `dotenv.config({ path: '/full/path/to/.env' })`

## 💡 Pro Tip

**Always verify .env is working before starting development:**
```bash
cd backend
node -e "require('dotenv').config(); console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Found' : 'Missing')"
```

This quickly tests if your .env is being read!