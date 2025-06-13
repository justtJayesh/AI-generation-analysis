# AI Generation Analysis

A full-stack web application that generates and analyzes social media content using AI. The application uses the Groq API to generate creative content ideas for social media posts, including reel ideas, captions, hashtags, and hooks.

## Project Structure

The project is divided into two main parts:

### Backend (server/)

-   Built with Node.js and Express
-   Integrates with Groq API for AI content generation
-   Provides RESTful API endpoints for content generation

### Frontend (client/)

-   Built with React and Vite
-   Uses Tailwind CSS for styling
-   Includes Chart.js for data visualization
-   Features a modern, responsive UI

## Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   Groq API key

## Setup Instructions

1. Clone the repository
2. Set up the backend:

    ```bash
    cd server
    npm install
    # Create a .env file with your GROQ_API_KEY
    echo "GROQ_API_KEY=your_api_key_here" > .env
    npm run dev
    ```

3. Set up the frontend:
    ```bash
    cd client
    npm install
    npm run dev
    ```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
GROQ_API_KEY=your_groq_api_key_here
PORT=3000 (optional, defaults to 3000)
```

## Features

-   Generate social media content ideas based on topic and niche
-   Get AI-generated:
    -   Reel ideas
    -   Engaging captions
    -   Relevant hashtags
    -   Attention-grabbing hooks
-   Modern, responsive user interface
-   Real-time content generation

## API Endpoints

### POST /api/generate

Generates social media content based on the provided topic and niche.

Request body:

```json
{
    "topic": "string",
    "niche": "string"
}
```

Response:

```json
{
    "success": true,
    "data": {
        "reelIdea": "string",
        "caption": "string",
        "hashtags": ["string"],
        "hook": "string"
    }
}
```

## Analytics Data Structure

The application includes analytics tracking with the following data structure:

```json
{
  "followers": [number],  // Array of follower counts over time
  "engagement": [
    {
      "post": number,     // Post identifier
      "likes": number,    // Number of likes
      "comments": number, // Number of comments
      "title": "string",  // Post title
      "date": "string"    // Post date in YYYY-MM-DD format
    }
  ],
  "bestPostTime": "string", // Recommended posting time
  "dates": ["string"]       // Array of dates in YYYY-MM-DD format
}
```

Example analytics data:

```json
{
    "followers": [980, 1020, 1055, 1100, 1125, 1170, 1210],
    "engagement": [
        {
            "post": 1,
            "likes": 280,
            "comments": 22,
            "title": "City Lights at Night",
            "date": "2024-01-20"
        },
        {
            "post": 2,
            "likes": 360,
            "comments": 35,
            "title": "Morning Coffee Routine",
            "date": "2024-01-19"
        }
    ],
    "bestPostTime": "Friday 6 PM",
    "dates": [
        "2024-01-14",
        "2024-01-15",
        "2024-01-16",
        "2024-01-17",
        "2024-01-18",
        "2024-01-19",
        "2024-01-20"
    ]
}
```

## Technologies Used

### Backend

-   Node.js
-   Express
-   Groq SDK
-   CORS
-   dotenv

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   Chart.js
-   Axios
-   React Router DOM

## Development

-   Backend development server: `npm run dev` (in server directory)
-   Frontend development server: `npm run dev` (in client directory)
-   Build frontend: `npm run build` (in client directory)

## License

ISC
