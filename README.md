# ClientForge - Website Builder for Client Work

A production-ready SaaS website builder for freelancers, agencies, and service businesses.

## Features

- **Multi-project management** - Create and manage multiple website projects
- **Multi-page support** - Each project can have multiple pages
- **Visual builder** - Drag-and-drop section-based editor
- **Pre-built sections** - Header, Hero, About, Services, Testimonials, FAQ, Contact, Footer
- **Template system** - 5 starter templates (Agency, Salon, Restaurant, Coach, Local Service)
- **Responsive preview** - Desktop, tablet, and mobile preview modes
- **Publishing** - One-click publish to public routes
- **Form submissions** - Contact form with database storage
- **Authentication** - Secure user authentication with sessions
- **Plan gating** - Free (3 projects) and Pro (unlimited) plans

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT-based auth with bcrypt

## Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Navigate to the project directory:
```bash
cd C:\Users\linkin\Desktop\clientforge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
copy .env.example .env
```

Edit `.env` and add your PostgreSQL connection string:
```
DATABASE_URL="postgresql://user:password@localhost:5432/clientforge"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Seed the database with demo data:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

7. Open http://localhost:3000 in your browser

### Demo Account

- Email: demo@clientforge.com
- Password: demo123

## Project Structure

```
clientforge/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── projects/     # Project CRUD
│   │   └── forms/        # Form submissions
│   ├── auth/             # Auth pages (login, signup)
│   ├── dashboard/        # Dashboard and editor
│   └── site/             # Public site rendering
├── components/
│   ├── Editor.tsx        # Main editor component
│   ├── SectionEditor.tsx # Section content editor
│   └── Preview.tsx       # Site preview renderer
├── lib/
│   ├── auth.ts           # Authentication utilities
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
└── package.json
```

## Usage

1. **Create an account** or login with demo credentials
2. **Create a new project** from the dashboard
3. **Choose a template** or start from scratch
4. **Edit sections** using the visual editor
5. **Preview** your site in different screen sizes
6. **Publish** your site to make it public
7. **Share** the public URL with your clients

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create project
- `PATCH /api/projects/[projectId]/pages/[pageId]` - Update page
- `POST /api/projects/[projectId]/publish` - Publish project

### Forms
- `POST /api/forms` - Submit form
- `GET /api/forms?projectId=xxx` - Get submissions

## License

MIT
