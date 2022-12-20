const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
        userId: req.body.userId,
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
        });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}

exports.modifySauce = (req, res, next) => {
    const sauce = new Sauce({
        _id: req.params.id,
        userId: req.body.userId,
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
    });
    Sauce.updateOne({_id: req.params.id}, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
      (sauce) => {
        if (!sauce) {
          return res.status(404).json({
            error: new Error('Sauce not found!')
          });
        }
        if (sauce.userId !== req.auth.userId) {
          return res.status(401).json({
            error: new Error('Request not authorised!')
          });
        }
        Sauce.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
    );
  };

exports.likeSauce = (req, res, next) => {
    const { id } = req.params;
    const { like } = req.body;
    const sauce = ModelsSauce.findById
    (id);
    if (like === 1) {
        sauce.likes += 1;
        sauce.usersLiked.push(req.body.userId);
    } else if (like === -1) {
        sauce.dislikes += 1;
        sauce.usersDisliked.push(req.body.userId);
    } else {
        if (sauce.usersLiked.includes(req.body.userId)) {
        sauce.likes -= 1;
        sauce.usersLiked = sauce.usersLiked.filter((userId) => userId !== req.body.userId);
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
        sauce.dislikes -= 1;
        sauce.usersDisliked = sauce.usersDisliked.filter((userId) => userId !== req.body.userId);
        }
    }
    sauce.save();
    return res.status(200).json(sauce);
    };

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};