const server = require("./api/server");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

server.get("/", (req, res) => {
  res.json({ spotify_song_suggester: "API IS UP" });
});
