# TalentForge - Export & Setup Guide

## 📦 Exporting Your Project

### Method 1: Download All Files
Download all the files from this Figma Make environment to your local machine. You'll need the entire project structure.

### Method 2: Copy Files Manually
If you can't download directly, copy each file manually maintaining the exact folder structure shown below.

---

## 📁 Project Structure

```
talentforge/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main app component
│   │   └── components/
│   │       ├── Header.tsx                   # Dashboard header
│   │       ├── Sidebar.tsx                  # Dashboard sidebar
│   │       ├── auth/
│   │       │   ├── LoginPage.tsx           # Login page
│   │       │   └── RegisterPage.tsx        # Registration page
│   │       ├── landing/
│   │       │   ├── LandingPage.tsx         # Main landing page
│   │       │   ├── JobsPage.tsx            # Public jobs listing page
│   │       │   ├── HeroSection.tsx         # Hero section
│   │       │   ├── FeaturesSection.tsx     # Features section
│   │       │   ├── StatsSection.tsx        # Statistics section
│   │       │   ├── HowItWorksSection.tsx   # How it works
│   │       │   ├── TestimonialsSection.tsx # Testimonials
│   │       │   ├── PricingSection.tsx      # Pricing
│   │       │   ├── CTASection.tsx          # Call-to-action
│   │       │   └── Footer.tsx              # Footer
│   │       ├── pages/
│   │       │   ├── Overview.tsx            # Dashboard overview
│   │       │   ├── JobPostings.tsx         # Job postings management
│   │       │   ├── CreateJob.tsx           # Job creation modal
│   │       │   ├── Candidates.tsx          # Candidates page
│   │       │   ├── Interviews.tsx          # Interviews page
│   │       │   ├── AIScreening.tsx         # AI screening page
│   │       │   └── Inbox.tsx               # Inbox page
│   │       ├── ui/                         # Shadcn UI components
│   │       │   └── ... (all UI components)
│   │       └── figma/
│   │           └── ImageWithFallback.tsx   # Image fallback component
│   ├── styles/
│   │   ├── index.css                       # Main styles
│   │   ├── tailwind.css                    # Tailwind imports
│   │   ├── theme.css                       # Theme variables
│   │   └── fonts.css                       # Font imports
│   └── utils/
│       └── supabase-client.ts              # Supabase client config
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx                   # Hono server (Edge Function)
│           └── kv_store.tsx               # Key-value store utilities
├── utils/
│   └── supabase/
│       └── info.tsx                        # Supabase project info
├── package.json                            # Dependencies
├── vite.config.ts                         # Vite configuration
├── postcss.config.mjs                     # PostCSS config
├── tsconfig.json                          # TypeScript config
└── .env.local                             # Environment variables (create this)
```

---

## 🚀 Local Setup Instructions

### Step 1: Create Project Directory
```bash
mkdir talentforge
cd talentforge
```

### Step 2: Copy All Files
Copy all files from this Figma Make environment maintaining the exact folder structure shown above.

### Step 3: Create Missing Files

#### Create `index.html` in the root directory:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TalentForge - AI-Powered Recruitment Platform</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### Create `src/main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### Create `tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

#### Create `.gitignore`:
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production
```

### Step 4: Update package.json Scripts
Update your `package.json` to include all necessary scripts:
```json
{
  "name": "talentforge",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

### Step 5: Install Dependencies
```bash
# Using npm
npm install

# Or using pnpm (recommended)
pnpm install

# Or using yarn
yarn install
```

---

## 🔑 Supabase Setup

### Option 1: Use Your Own Supabase Project

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be fully provisioned

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy your:
     - Project URL
     - Anon/Public Key
     - Service Role Key (keep this secret!)

3. **Update Supabase Info**
   
   Update `/utils/supabase/info.tsx`:
   ```tsx
   export const projectId = "your-project-id"
   export const publicAnonKey = "your-anon-key"
   ```

4. **Create Environment Variables**
   
   Create `.env.local` file in the root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

5. **Update Supabase Client**
   
   Update `src/utils/supabase-client.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co'
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

6. **Set Up Database**
   
   In your Supabase dashboard, go to SQL Editor and run:
   ```sql
   -- Create the key-value store table
   CREATE TABLE IF NOT EXISTS kv_store_eaa8882b (
     key TEXT PRIMARY KEY,
     value JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE kv_store_eaa8882b ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow all operations (adjust for production)
   CREATE POLICY "Allow all operations" ON kv_store_eaa8882b
   FOR ALL USING (true) WITH CHECK (true);
   ```

7. **Deploy Edge Function (Optional but Recommended)**
   
   Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

   Deploy your edge function:
   ```bash
   supabase login
   supabase link --project-ref your-project-id
   supabase functions deploy make-server-eaa8882b
   ```

### Option 2: Mock Backend (For Testing)

If you just want to test locally without Supabase:

1. Update `CreateJob.tsx` and `JobsPage.tsx` to use localStorage instead:
   ```typescript
   // Example mock implementation
   const saveJob = (job) => {
     const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
     jobs.push(job);
     localStorage.setItem('jobs', JSON.stringify(jobs));
   };

   const getJobs = () => {
     return JSON.parse(localStorage.getItem('jobs') || '[]');
   };
   ```

---

## 🎨 Customization

### Update Branding
- **Logo**: Update the Sparkles icon in navigation components
- **Colors**: Modify gradient colors in Tailwind classes
- **Theme**: Edit `src/styles/theme.css`

### Modify Images
The project uses Unsplash for placeholder images. To use your own:
1. Replace Unsplash URLs with your image URLs
2. Or use the ImageWithFallback component with local images

---

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
pnpm build
# or
yarn build
```

The built files will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
# or
pnpm preview
# or
yarn preview
```

---

## 🚢 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Other Platforms
- **AWS Amplify**: Connect your GitHub repo
- **Cloudflare Pages**: Connect your GitHub repo
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

---

## 📝 Environment Variables for Production

When deploying, set these environment variables in your hosting platform:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

⚠️ **NEVER** expose your Service Role Key in the frontend!

---

## 🔧 Troubleshooting

### Import Errors
- Make sure all file paths use absolute paths from root (starting with `/`)
- Check that all components are properly exported

### Supabase Connection Issues
- Verify your Supabase credentials
- Check that your Supabase project is active
- Ensure RLS policies are set correctly

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

---

## 📚 Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.12
- **UI Components**: Radix UI + Shadcn
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Server**: Hono (Edge Function)
- **Icons**: Lucide React

---

## 🆘 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure Supabase is properly configured
4. Check that all dependencies are installed

---

## 📄 License

This project is private and proprietary.

---

**Happy Coding! 🚀**
