"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/genre?q=${search.trim().toLowerCase()}`);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
          alt="Logo" 
          className="w-10 h-10"
        />
        <div className="text-xl font-bold">Movie Recommender</div>
      </div>

      {/* Search Bar with Button */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search for genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-[500px] bg-[#808080] border shadow rounded p-2 text-white"
        />
        <button 
          onClick={handleSearch}
          className="bg-white text-blue-700 rounded px-4 py-2 flex items-center justify-center"
        >
          Search
        </button>
      </div>

      {/* Profile & Logout Buttons */}
      <div className="flex gap-4">
      <button 
  onClick={() => router.push("/home")} 
  className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-800"
>
  Home
</button>
<button 
  onClick={() => {
    localStorage.removeItem("user"); // Clear user session
    localStorage.removeItem("wishlist"); // Clear wishlist (optional)
    router.push("/"); // Redirect to login page
  }} 
  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
>
  Logout
</button>

      </div>
    </nav>
  );
}
