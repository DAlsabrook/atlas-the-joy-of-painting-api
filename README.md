# Technologies Used
## Next.js
## TypeScript
## Tailwind
## MongoDB
## Papa Parse

# File Structure
/atlas-the-joy-of-painting-api
├── /app
│   ├── /api
|   |   ├── /db
|   |   |   ├── /upload         # POST - takes .csv file, cleans, and uploads to mongo
|   |   |   └── /filter         # GET - Returns query param filtered paintings from mongo
│   │   └── /status             # GET - check if API is available
│   ├── layout.tsx              # Root layout for frontend
│   └── page.tsx                # Router for SPA
├── /lib
│   └── mongoose.ts             # MongoDB connection logic
├── /models
│   └── Painting.ts             # Mongoose model for the paintings data
├── /public
│   └── /images                 # Static images (if used in the frontend)
├── /styles
│   └── globals.css             # Global CSS file (Tailwind or custom styles)
│   └── tailwind.config.js      # Tailwind CSS config
├── /node_modules               # Project dependencies (auto-generated)
├── /.env.local                 # Environment variables (MongoDB URI, etc.)
├── package.json                # Project metadata and dependencies
├── tsconfig.json               # TypeScript configuration
└── next.config.js              # Next.js configuration (if needed for API or front-end routing)


# Next api documentation
## https://nextjs.org/docs/app/building-your-application/routing/route-handlers
