"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const fetchCalledRef = useRef(false);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error(`Error fetching the data ${error}`);
    }
  };

  useEffect(() => {
    if (!fetchCalledRef.current) {
      fetchQuote();
      fetchCalledRef.current = true;
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-10 bg-slate-900 p-10 rounded-xl">
      <div className="h-52">
        <h1 className="text-3xl font-semibold mb-4">
          Random Quote Generator App
        </h1>
        <p className="text-lg">{quote}</p>
        <p className="italic mt-4">~ {author}</p>
      </div>
      <div className="flex">
        <button
          onClick={fetchQuote}
          className="ml-auto bg-indigo-600 p-2 px-5 rounded-lg hover:bg-indigo-700 transition-all"
        >
          New Quote
        </button>
      </div>
    </main>
  );
}
