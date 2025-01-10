# Bob Ross Painting Explorer

This project is a web application that allows users to explore and filter Bob Ross's paintings based on **colors used**, **subject matter**, and **the month they were painted**. The data was sourced, cleaned, and organized before being stored in a **MongoDB Atlas** database. The site is built using **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Features
- **Filter Paintings**: Filter paintings by color, subject matter, or month.
- **Responsive Design**: Built with Tailwind CSS for a seamless user experience across devices.
- **API Access**: Public API endpoints to query painting data programmatically.

---

## Technologies Used
- **Next.js**: For the front-end and API routes.
- **TypeScript**: For type-safe development.
- **Tailwind CSS**: For responsive UI design.
- **MongoDB Atlas**: As the database for storing and retrieving painting data.

---

## File Structure
```
app
├── app
│   ├── api
│   │   ├── connect
│   │   │   └── route.ts
│   │   ├── db
│   │   │   ├── filter
│   │   │   │   └── route.ts
│   │   │   ├── upload
│   │   │   │   └── route.ts
│   │   ├── status
│   │   │   └── route.ts
│   ├── components
│   │   ├── FilterSection.tsx
│   │   ├── LandingPage.tsx
│   │   ├── PaintingFilter.tsx
│   │   ├── PaintingGrid.tsx
│   │   ├── PaintingModal.tsx
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── page.tsx
├── lib
│   ├── mongoose.ts
│   ├── scrubber.ts
├── models
│   └── painting.ts
├── node_modules
├── public
│   ├── images
│   ├── user_files
│       ├── Colors Used.csv
│       ├── Episode Dates
│       ├── Subject Matter.csv
├── styles
│   └── globals.css
├── types
│   └── painting.ts
```

API Documentation
POST /api/db/filter
Filters paintings based on the provided criteria (colors, month, and/or subject).

 ---

## Example cURL Requests

```curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"color": ["bright_red", "cadmium_yellow", "titanium_white"]}'```

Filter by month:

```curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"month": "january"}'```

Filter by subject:

```curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"subject": ["bushes", "conifer"]}'``

Filter by color, month, and subject:

```curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"color": ["bright_red", "cadmium_yellow"], "month": "january", "subject": ["bushes"]}'```

More specific filters:

```curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"color": ["bright_red", "cadmium_yellow", "titanium_white"], "month": "january", "subject": ["bushes", "conifer"]}'```

- Filters paintings using query parameters.

Example cURL Request
Get request with query params:
```curl -X GET "http://localhost:3000/api/db/filter?color=bright_red,cadmium_yellow,titanium_white&month=january&subject=bushes,conifer"```

- Setup Instructions

Create a .env file in the root directory.
Add MongoDB connection string:
```MONGODB_URI=mongodb+srv://dfalsabrook:dfAWj1CvKBLc29th@joypainting.fqqbi.mongodb.net/?retryWrites=true&w=majority&appName=joyPainting```


# Run the development server:

npm run dev
Access the app at http://localhost:3000.

# Visit the site live
Visit [HappyLittleArchive.com](https://happylittlearchive.com/) to see it in action!

# Author
[David Alsabrook](https://github.com/DAlsabrook)
