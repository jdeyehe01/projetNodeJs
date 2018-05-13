const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UserController = controllers.UserController;

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post('/', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const rank = req.body.rank;

  if(rank === undefined) {
    rank = 0;
  }
const user =  UserController.addUser(username, password, email, rank)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((err) => {
    res.status(500).end();
  });
});


userRouter.get('/allUser', function(req,res){
  UserController.getAllUser()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

userRouter.get('/allAdmin', function(req,res){
  UserController.getAllAdmin()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

userRouter.get('/getUserById/:id' , function(req,res){
  UserController.getUserById(req.params.id)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

userRouter.delete('/deleteUser/:idUser' , function(req,res){

  const idUser = req.params.idUser;

  if(idUser === undefined){
    res.status(500).end();
    return;
  }

  UserController.deleteUser(idUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error(err);
    })
});

userRouter.put('/updateUser' , function(req,res){
  const idUser = req.body.idUser;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const rank = req.body.rank;

  UserController.updateUser(idUser, username, password, email, rank)
  .then(()=>{
    console.log("L'utilisateur à été mis à jour");
  })
  .catch((err) => {
    console.error(err);
  })
});



module.exports = userRouter;
