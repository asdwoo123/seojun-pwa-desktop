const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');


const router = express.Router();

router.get('/isLoggedIn', (req, res) => {
   if (req.isAuthenticated()) {
       res.status(201);
       console.log(true);
   } else {
       res.status(403).send('This is a service that requires login');
       console.log(false);
   }
});

router.post('/join', async (req, res, next) => {
   const { username, email, password } = req.body;
   try {
       const exUser = await User.findOne({ where: { username } });
       console.log(exUser);
       if (exUser) {
           res.status(403).send("Username already exists");
           console.log("Username already exists");
       } else {
           const hash = await bcrypt.hash(password, 12);
           await User.create({
               email,
               username,
               password: hash
           });
           res.status(201).send("Sign up is complete");
       }
   } catch (e) {
       res.status(403).send(e);
       console.log(e);
   }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
       if (authError) {
           console.log(authError);
           return res.status(403).send(authError);
       }
       if (!user) {
           console.log(info.message);
           return res.status(403).send(info.message);
       }
       return req.login(user, (loginError) => {
           if (loginError) {
               console.log(loginError);
               return res.status(403).send(loginError);
           }
           console.log('Signed in successfully');
           return res.status(201).send('Signed in successfully');
       });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
   req.logout();
   req.session.destroy();
   res.status(403).send('You have been successfully logged out');
});

router.get('/user', (req, res) => {

});

module.exports = router;
