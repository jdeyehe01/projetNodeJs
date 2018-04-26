const ModelIndex = require('../models');
const User = ModelIndex.User;

const UserController = function() {};

UserController.addUser = function(username, password, email, rank){
  return User.create({
    username: username,
    password: password,
    email: email,
    rank: rank
  })
};

UserController.deleteUser = function(idUser){
  return User.destroy({
    where:{
      id: idUser
    }
  })
  .then(() => {
      console.log("L'utilisateur à été supprimé.");
    })
    .catch((err) => {
      console.error(err);
    })
};

UserController.updateUser = function(idUser, newUsername, newPassword, newEmail, newRank) {
  const user = User.find({
    where:{
      id: idUser
    }
  });

  if(user === undefined){
    return;
  }

  if(newUsername === undefined) {
    newUsername = user.username;
  }

  if(newPassword === undefined) {
      newPassword = user.password;
  }

  if(newEmail === undefined) {
      newEmail = user.email;
  }

  if(newRank === undefined) {
      newRank = user.rank;
  }

  user.updateAttributes({
    username: newUsername,
    password: newPassword,
    email: newEmail,
    rank: newRank
  });

  return user;
};


UserController.getAllUser = function(){
  return User.findAll()
  .catch((err) => {
    console.error(err);
  });
};

module.exports = UserController;