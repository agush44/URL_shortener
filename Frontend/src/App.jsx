import { useState, useEffect } from "react";
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

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (originalUrl && isValidUrl(originalUrl)) {
      const shortenUrl = async () => {
        setLoading(true);
        setError(null);
        setShortUrl("");

        try {
          const response = await fetch(`${backendUrl}/urls/shorten`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ originalUrl }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to shorten URL");
          }

          setShortUrl(data.shortUrl);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      shortenUrl();
    }
  }, [originalUrl]);

  const handleChange = (e) => {
    setOriginalUrl(e.target.value);
    setIsTouched(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidUrl(originalUrl)) {
      setOriginalUrl(originalUrl);
    } else {
      setError("Please enter a valid URL.");
    }
  };

  return (
    <div className="app-container">
      <h1>URL Shortener</h1>
      <div className="card-container">
        <p className="label">Shorten a long URL</p>
        <div className="input-container">
          <input
            type="text"
            className="input-box"
            placeholder="Enter a long link"
            value={originalUrl}
            onChange={handleChange}
          />
          {loading ? (
            <p>Shortening...</p>
          ) : (
            <button
              className="shorten-button"
              onClick={handleSubmit}
              disabled={!originalUrl || loading}
            >
              Shorten URL
            </button>
          )}
        </div>

        {isTouched && error && <p style={{ color: "red" }}>{error}</p>}

        {shortUrl && (
          <div>
            <p>Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
