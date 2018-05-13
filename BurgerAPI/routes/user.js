const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UserController = controllers.UserController;
const jwt = require('jsonwebtoken');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post('/', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

const user =  UserController.addUser(username, password, email)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((err) => {
    res.status(500).end();
  });
});


userRouter.post('/login', function(req, res){
  const email = req.body.email;
  const password = req.body.password;

  const user = UserController.login(email, password)
  .then((user) => {

    if(user === null ){
      res.send("L'email et/ou le mot de passe sont incorrecte ! ").end();
      return;
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '1h'}, (err, token) =>{
        res.send(token);
    });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

userRouter.get('/allUser', function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Acces refusé');
      return;
    }
    else{
        UserController.getAllUser()
        .then((users) => {
          res.status(201).json(users);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        })
      }
  });
});

userRouter.get('/getUserById/:id' , function(req,res){

  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end();
      return;
    }
    else{
        UserController.getUserById(req.params.id)
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        })
      }
  });
});

userRouter.delete('/deleteUser/:idUser' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end();
      return;
    }
    else{
      const idUser = req.params.idUser;

      if(idUser === undefined){
        res.status(403).end('Acces refusé');
        return;
      }
      UserController.deleteUser(idUser)
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => {
          console.error(err);
        })
      }
  });
});

userRouter.put('/updateUser' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
  if(err){
    res.status(403).end('Acces refusé');
    return;
  }
  else{
    const idUser = req.body.idUser;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    UserController.updateUser(idUser, username, password, email)
    .then(()=>{
      console.log("L'utilisateur à été mis à jour");
    })
    .catch((err) => {
      console.error(err);
    })
  }});
});



module.exports = userRouter;
