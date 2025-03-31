"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/page.js";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [selectedGenre, setSelectedGenre] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
    }

    // Load wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(new Set(storedWishlist));
  }, [router]);

  useEffect(() => {
    const sampleMovies = [
      { id: 1, title: "Inception", year: 2010, rating: 8.8, genres: ["Sci-Fi", "Action"], image: "https://www.themoviedb.org/t/p/w1280/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg" },
      { id: 2, title: "Interstellar", year: 2014, rating: 8.6, genres: ["Sci-Fi", "Drama"], image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
      { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genres: ["Action", "Thriller"], image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
      { id: 4, title: "Avatar", year: 2009, rating: 7.8, genres: ["Sci-Fi", "Adventure"], image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" },
      { id: 5, title: "The Call", year: 2020, rating: 7.1, genres: ["Korean", "Thriller"], image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Call_poster.jpg/220px-Call_poster.jpg" },
      { id: 6, title: "American Psycho", year: 2000, rating: 7.6, genres: ["Psychological Thriller", "Horror"], image: "https://image.tmdb.org/t/p/w500/9uGHEgsiUXjCNq8wdq4r49YL8A1.jpg" },
      { id: 7, title: "How to Lose a Guy in 10 Days", year: 2003, rating: 6.4, genres: ["Romance", "Comedy"], image: "https://i.scdn.co/image/ab67616d0000b273f7e925f926d490a170475a4e" },
      { id: 8, title: "The Conjuring", year: 2013, rating: 7.5, genres: ["Horror", "Supernatural"], image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/wVYREutTvI2tmxr6ujrHT704wGF.jpg" }
    ];
    setMovies(sampleMovies);
    setFilteredMovies(sampleMovies); // Initialize with all movies
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/genre?q=${encodeURIComponent(search)}`);
    }
  };
  
  

  const toggleWishlist = (movieId) => {
    const updatedWishlist = new Set(wishlist);

    if (updatedWishlist.has(movieId)) {
      updatedWishlist.delete(movieId); // Remove from wishlist
    } else {
      updatedWishlist.add(movieId); // Add to wishlist
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify([...updatedWishlist]));
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    
    if (genre === "") {
      setFilteredMovies(movies); // Show all movies when "All" is selected
    } else {
      setFilteredMovies(movies.filter((movie) => movie.genres.includes(genre)));
    }
  };

  return (
    <div>
      <NavBar search={search} setSearch={setSearch} handleSearch={handleSearch} />

      <div className="relative w-full h-[400px] overflow-hidden">
        <img 
          src="https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-03.jpg" 
          alt="Carousel Banner" 
          className="w-full h-full object-content"
        />
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Choose a Genre</h1>
          <select 
            value={selectedGenre} 
            onChange={handleGenreChange} 
            className="px-3 py-2 border border-gray-400 rounded-md"
          >
            <option value="">All</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Thriller">Thriller</option>
            <option value="Korean">Korean</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Comedy">Comedy</option>
            <option value="Psychological Thriller">Psychological Thriller</option>
            <option value="Supernatural">Supernatural</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
             <img 
  src={movie.image} 
  alt={movie.title} 
  className="w-full h-[300px] object-content rounded-t-lg"
/>
              <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
              <p className="text-gray-600">Year: {movie.year}</p>
              <p className="text-yellow-500">⭐ {movie.rating}</p>
              <p className="text-gray-500">{movie.genres.join(", ")}</p>

              <div className="flex justify-between w-full mt-2">
                <button 
                  onClick={() => router.push(`/details/${movie.id}`)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Details
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${wishlist.has(movie.id) ? "bg-red-500 text-white" : "bg-gray-300"}`}
                  onClick={() => {
                    toggleWishlist(movie.id);
                    router.push("/wishlist");
                  }}>
                  💜
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
