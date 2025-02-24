import "./App.css";
import axios from "axios";
import Axios from "axios";
import { useState } from "react";

function App() {

  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function searchLyrics() {
    if (!artist || !song) {
      setError("Please enter both artist and song name.");
      return;
    }
    setLoading(true);
    setLyrics("");
    setError("");

    axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then((res) => {
        setLyrics(res.data.lyrics);
        setError("")
      })
      .catch(() => {
        setLyrics("");
        setError("Lyrics not found. Please check the song and artist name.");
      })
      .finally(() => {
        setLoading(false);
      })


  }

  return (
    <div className="App">
      <h1>🎵 Lyrics Finder 🎶</h1>

      <input
        className="inp"
        type="text"
        placeholder="Artist name"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        className="inp"
        type="text"
        placeholder="Song name"
        value={song}
        onChange={(e) => setSong(e.target.value)}
      />

      <button className="btn" onClick={searchLyrics}>
        🔍 Search
      </button>

      <hr />

      {loading && <p>⏳ Loading...</p>}
      {error && <p className="error">{error}</p>}
      {lyrics && <pre>{lyrics}</pre>}
    </div>
  );

}

export default App;
