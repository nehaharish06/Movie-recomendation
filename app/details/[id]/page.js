"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import NavBar from "../../components/page.js";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const movies = [
      {
        id: 1,
        title: "Inception",
        image: "https://www.themoviedb.org/t/p/w1280/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
        releaseDate: "2010-07-16",
        genres: ["Action", "Sci-Fi", "Thriller"],
        description: "A skilled thief uses dream-sharing technology to plant an idea in someone's mind, but his own past haunts him.",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
        rating: "8.8",
        recommendations: ["Interstellar", "Tenet", "The Matrix"]
      },
      {
        id: 2,
        title: "Interstellar",
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        releaseDate: "2014-11-07",
        genres: ["Adventure", "Drama", "Sci-Fi"],
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
        rating: "8.6",
        recommendations: ["Inception", "Gravity", "The Martian"]
      },
      {
        id: 3,
        title: "The Dark Knight",
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        releaseDate: "2008-07-18",
        genres: ["Action", "Crime", "Drama"],
        description: "Batman faces his greatest challenge as the criminal mastermind known as the Joker plunges Gotham into anarchy.",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Gary Oldman"],
        rating: "9.0",
        recommendations: ["Batman Begins", "Joker", "Logan"]
      },
      {
        id: 4,
        title: "Avatar",
        image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        releaseDate: "2009-12-18",
        genres: ["Action", "Adventure", "Fantasy"],
        description: "A paraplegic Marine is dispatched to the moon Pandora on a mission but soon finds himself torn between two worlds.",
        cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
        rating: "7.8",
        recommendations: ["Avatar: The Way of Water", "Guardians of the Galaxy", "Star Wars"]
      },
      {
        id: 5,
        title: "The Call",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Call_poster.jpg/220px-Call_poster.jpg",
        releaseDate: "2020-11-27",
        genres: ["Korean", "Thriller"],
        description: "A woman receives a call from a stranger, only to realize they're living in different times, leading to chilling consequences.",
        cast: ["Park Shin-hye", "Jeon Jong-seo", "Kim Sung-ryung", "Lee El"],
        rating: "7.1",
        recommendations: ["Train to Busan", "The Wailing", "Gonjiam: Haunted Asylum"]
      },
      {
        id: 6,
        title: "American Psycho",
        image: "https://image.tmdb.org/t/p/w500/9uGHEgsiUXjCNq8wdq4r49YL8A1.jpg",
        releaseDate: "2000-04-14",
        genres: ["Psychological Thriller", "Horror"],
        description: "A wealthy New York investment banker hides his psychopathic ego behind a polished façade while indulging in violent fantasies.",
        cast: ["Christian Bale", "Jared Leto", "Willem Dafoe", "Chloë Sevigny"],
        rating: "7.6",
        recommendations: ["Fight Club", "Se7en", "The Machinist"]
      },
      {
        id: 7,
        title: "How to Lose a Guy in 10 Days",
        image: "https://i.scdn.co/image/ab67616d0000b273f7e925f926d490a170475a4e",
        releaseDate: "2003-02-07",
        genres: ["Romance", "Comedy"],
        description: "A journalist and an advertising executive engage in a bet that tests the limits of dating do’s and don’ts.",
        cast: ["Kate Hudson", "Matthew McConaughey", "Kathryn Hahn", "Adam Goldberg"],
        rating: "6.4",
        recommendations: ["10 Things I Hate About You", "The Proposal", "Love Actually"]
      },
      {
        id: 8,
        title: "The Conjuring",
        image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
        releaseDate: "2013-07-19",
        genres: ["Horror", "Supernatural"],
        description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
        cast: ["Patrick Wilson", "Vera Farmiga", "Lili Taylor", "Ron Livingston"],
        rating: "7.5",
        recommendations: ["The Conjuring 2", "Insidious", "The Exorcist"]
      }
    ];
    const selectedMovie = movies.find((m) => m.id === parseInt(id));
    
    if (selectedMovie) {
      setMovie(selectedMovie);
    } else {
      router.push("/home"); // Redirect to home if movie not found
    }
  }, [id, router]);

  if (!movie) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg flex">
          
          {/* Movie Details (Left Side) */}
          <div className="w-2/3 pr-6">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-600">📅 Release Date: {movie.releaseDate}</p>
            <p className="text-gray-600">🎭 Genres: {movie.genres.join(", ")}</p>
            <p className="mt-4">{movie.description}</p>

            <h2 className="mt-6 text-xl font-semibold">Cast</h2>
            <ul className="list-disc list-inside text-gray-700">
              {movie.cast.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>

            <h2 className="mt-6 text-xl font-semibold">User Rating</h2>
            <p className="text-yellow-500 font-semibold">⭐ {movie.rating}/10</p>

            <h2 className="mt-6 text-xl font-semibold">Recommended Movies</h2>
            <ul className="list-disc list-inside text-gray-700">
              {movie.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Movie Poster (Right Side) */}
          <div className="w-1/3 flex justify-end">
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="w-48 h-64 object-cover rounded-md shadow-lg" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
