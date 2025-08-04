# Weathrly

A clean, modern weather application built with Next.js and Tailwind CSS. This project allows users to search for a city and view its current weather conditions, focusing on a great user experience and robust code quality.

## Features

- **City Search**: Real-time weather data for any city.
- **Dynamic UI**: Displays temperature, conditions, and a relevant weather icon.
- **Responsive Design**: Looks great on both desktop and mobile devices.
- **Clear Feedback**: Implements loading and error states for a smooth user experience.
- **API Key Security**: Leverages Next.js API Routes to protect the OpenWeatherMap API key.

### Temperature Unit

The application displays temperature in **Celsius (°C)**.

## Tech Stack & Design Decisions

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Framer motion
- **UI/UX**: `clsx` for conditional class management.
- **Data Fetching**: TanStack Query (React Query)
- **Language**: TypeScript

---

## Getting Started Locally

### 1. Prerequisites

- Node.js (v18+)
- An API key from [OpenWeatherMap](https://openweathermap.org/appid) (free tier is sufficient).

### 2. Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-link>
    cd weathrly
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a file named `.env.local` in the project root. Add your API key like so:
    ```
    # .env.local
    OPENWEATHER_API_KEY="PASTE_YOUR_API_KEY_HERE"
    ```

### 3. Run the App

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Key Architectural Decisions

### Secure API Calls via Next.js Routes

To prevent exposing the API key to the client, all calls to the OpenWeatherMap API are proxied through a Next.js API Route (`/api/weather`). The frontend calls our own secure endpoint, and the server-side route attaches the API key before fetching the data. This is a crucial security practice.

### Autocomplete Search

The city input field features an autocomplete dropdown that suggests cities as you type. This list is populated from a local JSON file containing major cities in South Africa. Users can navigate the suggestions with arrow keys and select a city with the Enter key or a mouse click.

### (Bonus) Why TanStack Query?

While `useState` and `useEffect` could handle the data fetching, I chose **TanStack Query** for its significant benefits in building robust applications:

- **Simplified State Management**: It automatically handles `isPending`, `isError`, `error`, and `data` states, eliminating boilerplate and making the component logic much cleaner.
- **Declarative & Idiomatic**: The `useQuery` hook is a declarative way to manage server state. The query is automatically re-fetched when its `queryKey` changes (e.g., when a new city is submitted), leading to more predictable and maintainable code.
- **Caching & Performance**: TanStack Query offers intelligent caching, which prevents redundant API calls for the same data, improving performance and user experience.

### Why `clsx`?

I've included the `clsx` utility for managing conditional CSS classes. Instead of messy ternary operators within the `className` prop, `clsx` provides a clean and highly readable way to build class strings, which is a common and recommended practice in the Tailwind CSS community.
