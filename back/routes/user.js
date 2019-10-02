const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const db = require('../models');


router.get('/', (req, res) => {
    const user = req.user && req.user.toJSON();
    if(!user) return res.status(401).send('로그인이 필요합니다.')
    return res.json(user);
});

router.post('/', async (req, res, next) => {
  try {
    const {userId, nickname, password} = req.body;
    const exUser = await db.User.findOne({
      where:{userId}
    })
    if(exUser) return res.status(403).send('이미 가입된 사용자 입니다.');
    const hashedPassword = await bcrypt.hash(password, 11);
    const newUser = await db.User.create({
      nickname,
      userId,
      password:hashedPassword
    })
    res.json(newUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('local',(err, user, info) => {
      if(err){
        console.error(e);
        return next(e);
      }
      if(info) return res.status(401).send(info.reason);
      return req.login(user, (loginErr) => {
        if(loginErr) return next(loginErr);
        return res.json(user);
      });
    })(req, res, next);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
  } catch (e) {
    console.error(e);
    next(e);
  }
});


module.exports = router;
