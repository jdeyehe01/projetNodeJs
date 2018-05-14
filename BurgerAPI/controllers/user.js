const ModelIndex = require('../models');
const User = ModelIndex.User;

const UserController = function() {};

UserController.addUser = function(username, password, email){
  return User.create({
    username: username,
    password: password,
    email: email
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

UserController.updateUser = function(idUser, newUsername, newPassword, newEmail) {
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

  user.updateAttributes({
    username: newUsername,
    password: newPassword,
    email: newEmail
  });

  return user;
};

UserController.getUserById = function(userId){
  return User.find({
    where: {
      id: userId
    }
  })
  .then((user) => {
    console.log('Utilisateur trouvé');
    return user;
  })
  .catch((error) => {
    console.error(err);
  });
};

UserController.getAllUser = function(){
  return User.findAll()
  .catch((err) => {
    console.error(err);
  });
};


UserController.login = function(email, password){
  return User.find({
    where : {
      email : email,
      password : password
    }
  })
  .then((user)=>{
    if(user){
      return user;
    }
    else{
      return null;
    }
  })
};

module.exports = UserController;
