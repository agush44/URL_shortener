import { useState } from "react";
import "./App.css";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  const handleChange = (e) => {
    setOriginalUrl(e.target.value);
    setIsTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(originalUrl)) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setError(null);
    setShortUrl("");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to shorten URL");
      }

      setShortUrl(`${backendUrl}/${data.shortUrl}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>URL Shortener</h1>
      <div className="card-container">
        <img
          src="/icon.png"
          alt="Icon"
          width="30"
          height="30"
          className="icon"
        />
        <p className="label">Shorten a long URL</p>
        <div className="input-container">
          <input
            type="text"
            className="input-box"
            placeholder="Enter a long link"
            value={originalUrl}
            onChange={handleChange}
          />
          <button
            className="shorten-button"
            onClick={handleSubmit}
            disabled={!originalUrl || loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>

        {isTouched && error && <p style={{ color: "red" }}>{error}</p>}

        {shortUrl && (
          <div className="shortened-url-container">
            <p className="shortened-url">Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
