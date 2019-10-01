const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const db = require('../models');


router.get('/:id', async (req, res, next) => {
  try {
    if(!req.user) res.status(403).send('로그인이 필요합니다.');
    const memos = await db.Memo.findAll({
      include:{
        model:db.User,
        where:{
          id:req.params.id
        }
      }
    })
    res.json(memos);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if(!req.user) return res.status(403).send('로그인이 필요합니다.');
    const {content} = req.body;
    const newMemo = await db.Memo.create({
      content,
      UserId:req.user.id
    });
    res.json(newMemo);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if(!req.user) return res.status(403).send('로그인이 필요합니다.');
    const memo = await db.Memo.findOne({where:{id:parseInt(req.params.id)}})
    if(!memo) return res.status(404).send('메모가 존재하지 않습니다.');
    await db.Memo.destroy({
      where:{id:parseInt(req.params.id)}
    });
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});


module.exports = router;
