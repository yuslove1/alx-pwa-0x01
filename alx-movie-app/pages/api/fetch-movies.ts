// import { MoviesProps } from "@/interfaces";
// import { NextApiRequest, NextApiResponse } from "next";

// // API route handler for fetching movies
// export default async function handler(request: NextApiRequest, response: NextApiResponse) {
//   // Only allow POST requests
//   if (request.method === "POST") {
//     // Extract request parameters
//     const { page, year, genre } = request.body;

//     // Get the current year if no year is provided
//     const date = new Date();


//     // Fetch movies from the external API
//     const resp = await fetch(
//       `https://moviesdatabase.p.rapidapi.com/titles?year=${
//         year || date.getFullYear()
//       }&sort=year.decr&limit=12&page=${page}&${genre && `genre=${genre}`}`, // Construct the API URL with optional genre
//       {
//         headers: {
//           "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
//           "x-rapidapi-key": `${process.env.MOVIE_API_KEY}`, // Use the API key from environment variables
//         },
//       }
//     );
//     // Check if the API request was successful
//     if (!resp.ok) throw new Error("Failed to fetch movies");


//     // Parse the JSON response
//     const moviesResponse = await resp.json();

//     // Extract the movies array from the response
//     const movies: MoviesProps[] = moviesResponse.results;


//     // Return the movies data with a 200 OK status
//     return response.status(200).json({ movies });




//   } else {
//     // Handle unsupported HTTP methods
//     response.setHeader("Allow", ["POST"]); // Set allowed methods header
//     // Return 405 Method Not Allowed error
//     response.status(405).end(`Method ${request.method} Not Allowed in here`); 
//   }
// }


import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

// API route handler for fetching movies
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  // Only allow POST requests
  if (request.method === "POST") {
    // Extract request parameters
    const { page, year, genre } = request.body;

    // Get the current year if no year is provided
    const date = new Date();


    // Fetch movies from the external API
    const resp = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles?year=${
        year || date.getFullYear()
      }&sort=year.decr&limit=12&page=${page}&${genre && `genre=${genre}`}`, // Construct the API URL with optional genre
      {
        headers: {
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.MOVIE_API_KEY}`, // Use the API key from environment variables
        },
      }
    );

    // Check if the API request was successful
    if (!resp.ok) throw new Error("Failed to fetch movies");


    // Parse the JSON response
    const moviesResponse = await resp.json();

    // Extract the movies array from the response
    const movies: MoviesProps[] = moviesResponse.results;


    // Return the movies data with a 200 OK status
    return response.status(200).json({ movies });




  } else {
    // Handle unsupported HTTP methods
    response.setHeader("Allow", ["POST"]); // Set allowed methods header
    // Return 405 Method Not Allowed error
    response.status(405).end(`Method ${request.method} Not Allowed in here`); 
  }
}