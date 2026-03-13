# 🚀 TalentForge - Quick Start Guide

## Step-by-Step Setup (5 Minutes)

### 1️⃣ Download Your Project

**Option A: Download from Figma Make**
- Use the download/export feature in Figma Make to get all files
- Extract the zip file to your desired location

**Option B: Copy Files Manually**
- Copy all files maintaining the folder structure
- See `EXPORT_GUIDE.md` for complete file list

### 2️⃣ Open Terminal & Navigate to Project
```bash
cd path/to/talentforge
```

### 3️⃣ Install Dependencies
```bash
# Using npm
npm install

# OR using pnpm (faster, recommended)
npm install -g pnpm
pnpm install

# OR using yarn
npm install -g yarn
yarn install
```

### 4️⃣ Set Up Supabase (2 options)

#### Option A: Quick Test (No Backend Setup)
Just want to see the UI? Skip Supabase for now!
```bash
npm run dev
```
Note: Job creation and authentication won't work without Supabase.

#### Option B: Full Setup with Supabase (Recommended)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up (it's free!)
   - Create a new project
   - Choose a region and database password
   - Wait 2-3 minutes for setup

2. **Get Your Credentials**
   - In Supabase dashboard, go to: **Project Settings → API**
   - Copy these values:
     - Project URL (looks like: `https://xxxxx.supabase.co`)
     - `anon public` key (long string starting with `eyJ...`)

3. **Configure Your Project**
   
   Create `.env.local` file in project root:
   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...YOUR-KEY-HERE
   ```

4. **Update Supabase Info**
   
   Edit `/utils/supabase/info.tsx`:
   ```tsx
   export const projectId = "YOUR-PROJECT-ID"
   export const publicAnonKey = "eyJhbGc...YOUR-KEY-HERE"
   ```

5. **Create Database Table**
   
   In Supabase dashboard:
   - Go to **SQL Editor**
   - Click **New Query**
   - Paste this SQL:
   
   ```sql
   CREATE TABLE IF NOT EXISTS kv_store_eaa8882b (
     key TEXT PRIMARY KEY,
     value JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   ALTER TABLE kv_store_eaa8882b ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow all operations" ON kv_store_eaa8882b
   FOR ALL USING (true) WITH CHECK (true);
   ```
   
   - Click **Run** (bottom right)
   - You should see "Success. No rows returned"

6. **Enable Email Authentication**
   
   In Supabase dashboard:
   - Go to **Authentication → Providers**
   - Make sure **Email** is enabled (it should be by default)

### 5️⃣ Start the Development Server
```bash
npm run dev
```

### 6️⃣ Open in Browser
Open your browser and go to: **http://localhost:5173**

🎉 **You're all set!**

---

## 🧪 Test Your Setup

### Test the Landing Page
1. You should see the TalentForge landing page
2. Click "Jobs" in the header
3. You should see the jobs page (may be empty initially)

### Test Authentication
1. Click "Get Started" or "Login"
2. Create a new account
3. Check your email for confirmation (if required)
4. Log in to see the dashboard

### Test Job Creation
1. After logging in, go to "Job Postings" in the sidebar
2. Click "Post New Job"
3. Fill out the form
4. Submit
5. Check the public "Jobs" page - your job should appear!

---

## 📝 Common Issues & Solutions

### Issue: "Cannot find module 'react'"
**Solution:**
```bash
npm install react@18.3.1 react-dom@18.3.1
```

### Issue: Port 5173 already in use
**Solution:**
```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

### Issue: Supabase connection errors
**Solution:**
- Check that your `.env.local` file exists
- Verify the credentials are correct
- Make sure you ran the SQL script
- Check your Supabase project is active

### Issue: "Module not found" errors
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm pnpm-lock.yaml  # or package-lock.json or yarn.lock
pnpm install
```

### Issue: TypeScript errors
**Solution:**
```bash
# Make sure tsconfig files exist
# They should have been created automatically
# If not, check EXPORT_GUIDE.md
```

---

## 🎨 Customize Your App

### Change App Name
Edit `/index.html`:
```html
<title>Your App Name</title>
```

### Change Colors
The app uses Tailwind's color system:
- Indigo (primary): `indigo-600`, `indigo-700`, etc.
- Purple (secondary): `purple-600`, `purple-700`, etc.
- Pink (accent): `pink-600`, `pink-700`, etc.

Find and replace these class names to change the color scheme!

### Add Your Logo
Replace the `<Sparkles />` icon in:
- `/src/app/components/landing/LandingPage.tsx`
- `/src/app/components/landing/JobsPage.tsx`

---

## 🚀 Deploy Your App

### Deploy to Vercel (Easiest)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts
# Add environment variables when prompted
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the app
npm run build

# Deploy
netlify deploy
```

---

## 📚 Next Steps

1. ✅ **Customize Content**
   - Update landing page text
   - Add your company info
   - Modify job categories

2. ✅ **Set Up Production Database**
   - Create production Supabase project
   - Configure proper RLS policies
   - Set up email templates

3. ✅ **Add More Features**
   - Email notifications
   - Resume parsing
   - Video interviews
   - Applicant tracking

4. ✅ **Deploy to Production**
   - Choose hosting provider
   - Set up custom domain
   - Configure SSL

---

## 💡 Tips

- Use **pnpm** instead of npm for faster installs
- Keep your Supabase keys secure - never commit them!
- Test locally before deploying
- Read the full `EXPORT_GUIDE.md` for detailed info

---

## 🆘 Need Help?

1. Check `EXPORT_GUIDE.md` for detailed documentation
2. Check `README.md` for project overview
3. Review console errors in browser DevTools
4. Check Supabase logs in dashboard

---

**Happy Building! 🎉**
