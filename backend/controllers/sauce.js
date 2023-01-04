const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      imageUrl: url + "/images/" + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      usersLiked: [],
      usersDisliked: [],
      userId: req.body.sauce.userId,
    });
    await sauce.save();
    res.status(201).json({
      message: "Sauce saved successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || error,
    });
  }
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + "/images/" + req.file.filename,
      heat: req.body.sauce.heat,
      likes: req.body.sauce.likes,
      dislikes: req.body.sauce.dislikes,
      usersLiked: req.body.sauce.usersLiked,
      usersDisliked: req.body.sauce.usersDisliked,
      userId: req.body.sauce.userId,
    };
  } else {
    sauce = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      usersLiked: req.body.usersLiked,
      usersDisliked: req.body.usersDisliked,
      userId: req.body.userId,
    };
  }
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};

exports.likeSauce = (req, res, next) => {
  const liker = req.body.userId;
  let likeStatus = req.body.like;
  Sauce.findOne({ _id: req.params.id })
    .then((votedSauce) => {
      if (likeStatus === 1) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $push: { usersLiked: liker }, $inc: { likes: 1 } }
        )
          .then(() => res.status(201).json({ message: "you liked this sauce" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (likeStatus === -1) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: 1 }, $push: { usersDisliked: liker } }
        )
          .then(() =>
            res.status(201).json({ message: "you disliked this sauce" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else if (likeStatus === 0) {
        if (votedSauce.usersLiked.includes(liker)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: liker }, $inc: { likes: -1 } }
          )
            .then(() =>
              res.status(201).json({ message: "you unliked this sauce" })
            )
            .catch((error) => res.status(400).json({ error }));
        } else if (votedSauce.usersDisliked.includes(liker)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersDisliked: liker }, $inc: { dislikes: -1 } }
          )
            .then(() =>
              res.status(201).json({ message: "you undisliked this sauce" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
