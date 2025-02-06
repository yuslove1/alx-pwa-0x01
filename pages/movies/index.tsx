import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

// Interface for props passed to the Movies component
interface MProps {
  movies: MoviesProps[];
}

// Movies component - displays a list of movies
const Movies: React.FC<MProps> = () => {
  const [page, setPage] = useState<number>(1); // State for current page number
  const [year, setYear] = useState<number | null>(null); // State for selected year filter
  const [genre, setGenre] = useState<string>("All"); // State for selected genre filter
  const [movies, setMovies] = useState<MoviesProps[]>([]); // State for fetched movie data
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  // Callback function to fetch movies from the API
  const fetchMovies = useCallback(async () => {
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch("/api/fetch-movies", {
        // Fetch movies from the API
        method: "POST",
        body: JSON.stringify({
          page,
          year,
          // Send genre only if it's not "All"
          genre: genre === "All" ? "" : genre,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      // Check if the API request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const results = data.movies;
      setMovies(results); // Update movies state with fetched data
    } catch (error) {
      console.error("Error fetching movies:", error); // Log the error for debugging
      // Consider displaying an error message to the user here
    } finally {
      setLoading(false); // Set loading state to false after fetch completes
    }
  }, [page, year, genre]); // Include dependencies for useCallback

  // Use effect to fetch movies when component mounts and dependencies change
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          {/* Year Filter Dropdown */}
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setYear(Number(event.target.value))
            }
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="">Select Year</option>
            {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Section Title */}
        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>

        {/* Movie List Title and Genre Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {year} {genre} Movie List
          </h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {/* Genre Filter Buttons */}
            {["All", "Animation", "Comedy", "Fantasy"].map((genre, key) => (
              <Button title={genre} key={key} action={() => setGenre(genre)} />
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {movies?.map((movie, key) => (
            <MovieCard
              title={movie?.titleText.text}
              posterImage={movie?.primaryImage?.url}
              releaseYear={movie?.releaseYear.year}
              key={key}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            title="Previous"
            action={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
          />
          <Button title="Next" action={() => setPage(page + 1)} />
        </div>
      </div>
      {/* Loading Indicator */}
      {loading && <Loading />}
    </div>
  );
};

export default Movies;
