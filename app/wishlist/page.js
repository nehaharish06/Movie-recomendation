"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/page.js";

export default function Wishlist() {
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
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
    setWishlistMovies(sampleMovies.filter(movie => storedWishlist.includes(movie.id)));
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-bold my-4 text-center">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistMovies.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-200"
            onClick={() => router.push(`/details/${movie.id}`)} // Navigate to details page
          >
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            <p className="text-gray-500">{movie.genres.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
