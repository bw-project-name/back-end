const router = require("express").Router();

const Favorites = require("./favorites-model");

const { validateId } = require("../middleware/index");

router.get("/:id/", validateId, (req, res) => {
  const { id } = req.params;

  Favorites.getFavorites(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

router.post("/:id/add/:song", validateId, (req, res) => {
  const { id } = req.params;
  const { song } = req.params;

  Favorites.addFavorite(id, song)
    .then(([response]) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

router.delete("/:id/remove/:song_id", (req, res) => {
  const { id } = req.params;
  const { song_id } = req.params;

  Favorites.removeFavorite(id, song_id)
    .then((response) => {
      res
        .status(200)
        .json({
          message: "The song was successfully removed from your favorites",
        });
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

module.exports = router;
