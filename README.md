# TalentForge - AI-Powered Recruitment Platform

A modern, full-featured recruitment and talent management platform built with React, TypeScript, Tailwind CSS, and Supabase.

![TalentForge](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8) ![Vite](https://img.shields.io/badge/Vite-6.3-646cff)

## ✨ Features

### 🏠 Landing Page
- **Modern Hero Section** with professional imagery and animated elements
- **Feature Highlights** showcasing platform capabilities
- **Statistics Section** with real-time metrics
- **How It Works** step-by-step guide
- **Testimonials** from satisfied clients
- **Pricing Plans** with multiple tiers
- **Public Jobs Board** for job seekers

### 🔐 Authentication
- Email/Password authentication via Supabase
- Secure login and registration
- Session management
- Protected routes

### 📊 Dashboard
- **Overview** - Recruitment pipeline with drag-and-drop candidates
- **Job Postings** - Manage and create job listings
- **Candidates** - Track and filter applicants
- **Interviews** - Schedule and manage interviews
- **AI Screening** - Automated candidate assessment
- **Inbox** - Communication hub

### 💼 Job Management
- Comprehensive job creation form
- Job categories (Technology, Business, IT, Agriculture, Healthcare, etc.)
- Work type options (Remote, Hybrid, On-site)
- Salary range configuration
- Experience level filtering
- Public-facing jobs page with advanced filtering

### 🎨 Design
- Gradient-based color scheme (Indigo → Purple → Pink)
- Fully responsive design
- Smooth animations with Motion (Framer Motion)
- Professional UI components from Radix UI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or higher
- npm, pnpm, or yarn
- A Supabase account (free tier works!)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <your-repo-url>
   cd talentforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Update Supabase configuration**
   
   Edit `/utils/supabase/info.tsx` with your project details.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🗄️ Supabase Setup

### 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create a new project
- Wait for provisioning to complete

### 2. Set Up Database
Run this SQL in your Supabase SQL Editor:

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

-- Create policy (adjust for production)
CREATE POLICY "Allow all operations" ON kv_store_eaa8882b
FOR ALL USING (true) WITH CHECK (true);
```

### 3. Deploy Edge Function (Optional)
```bash
# Install Supabase CLI
npm install -g supabase

# Login and link project
supabase login
supabase link --project-ref your-project-id

# Deploy edge function
supabase functions deploy make-server-eaa8882b
```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.12
- **UI Components**: Radix UI + Shadcn
- **Animations**: Motion (Framer Motion)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Backend**: Supabase
  - Authentication
  - Database (PostgreSQL)
  - Edge Functions (Deno runtime)
- **Server**: Hono (for Edge Functions)
- **Charts**: Recharts
- **Notifications**: Sonner

## 📁 Project Structure

```
talentforge/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app component & routing
│   │   └── components/
│   │       ├── auth/                  # Login & Register pages
│   │       ├── landing/               # Landing page sections
│   │       ├── pages/                 # Dashboard pages
│   │       ├── ui/                    # Reusable UI components
│   │       ├── Header.tsx            # Dashboard header
│   │       └── Sidebar.tsx           # Dashboard navigation
│   ├── styles/                        # CSS files
│   └── utils/                         # Utility functions
├── supabase/
│   └── functions/server/             # Edge function code
├── utils/supabase/                   # Supabase config
└── [config files]
```

## 🎯 Key Features Breakdown

### Job Creation
- Title, Department, Category
- Full job description
- Duration and work type
- Salary range
- Experience level
- Auto-save to Supabase

### Public Jobs Page
- Search functionality
- Category filtering
- Work type filtering
- Real-time job listings
- Apply button (requires registration)

### Dashboard
- Role-based access
- Real-time candidate pipeline
- Interview scheduling
- AI-powered screening metrics

## 🔒 Security Notes

⚠️ **Important Security Considerations:**

1. Never commit `.env.local` to version control
2. Keep your Service Role Key secret (never expose in frontend)
3. Configure proper Row Level Security (RLS) policies in production
4. Use environment variables for all sensitive data
5. Review Supabase security settings before going live

## 📝 Customization

### Branding
- Update logo in navigation components
- Modify color gradients in Tailwind classes
- Edit theme variables in `src/styles/theme.css`

### Content
- Update landing page copy in respective section components
- Modify job categories in `CreateJob.tsx`
- Customize dashboard metrics

## 🐛 Troubleshooting

### Common Issues

**Build errors:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Supabase connection issues:**
- Verify credentials in `.env.local`
- Check Supabase project status
- Review RLS policies

**Vite cache issues:**
```bash
rm -rf node_modules/.vite
pnpm dev
```

## 📄 License

Private and Proprietary

## 🤝 Contributing

This is a private project. For questions or support, contact the project maintainer.

---

**Built with ❤️ using React, TypeScript, and Supabase**
