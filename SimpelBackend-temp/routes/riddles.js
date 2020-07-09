// Call Router / Schemas ------------------------
const router = require('express').Router();
let Riddle = require('../models/riddles.models');

// ------------------------------------------------

// FIND RIDDLE ROUTE ------------------------
router.get('/', async (req, res) => {
  console.log('Get All');

  try {
    const riddles = await Riddle.find();
    res.json(riddles);
  } catch (error) {
    res.status(500).json({ message: 'Error occured /:' + error.message });
  }
});
// ------------------------------------------------

// FIND RIDDLE BY ID ROTUE -------------------------
router.get('/:id', findRiddle, (req, res) => {
  console.log('Get by id');

  res.json(res.riddle);
});
// ---------------------------------

//ADD riddle   -------------------------
router.post('/admin', async (req, res) => {
  console.log('POST', req.body);

  const riddle = new Riddle(req.body);

  try {
    const newRiddle = await riddle.save();
    res.status(400).json({ message: 'Riddle created', riddle });
  } catch (error) {
    res.status(400).json({ message: 'Error occured', error });
  }
});
// ---------------------------------
//DELETE BY ID  -------------------------
router.delete('/admin/:id', findRiddle, async (req, res) => {
  console.log('Delete');

  try {
    await res.riddle.remove();
    res.status(200).json({ message: 'Riddle was deleted!' });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Riddle could'nt be deleted!" + error.message });
  }
});
// ---------------------------------
//EDIT BY ID  -------------------------
router.put('/admin/:id', findRiddle, async (req, res) => {
  console.log('PUT');

  try {
    res.riddle.riddle = req.body.riddle;
    res.riddle.answer = req.body.answer;

    await res.riddle.save();
    res
      .status(200)
      .json({ message: 'Riddle was updated', updatedRiddle: res.riddle });
  } catch (error) {
    res.status(400).json({ message: 'Error occured' + error.message });
  }
});
// ---------------------------------

async function findRiddle(req, res, next) {
  console.log('Find user by id!', req.params.id);
  let riddle;

  try {
    riddle = await Riddle.findById(req.params.id);

    if (riddle == null) {
      return res
        .status(404)
        .json({ message: 'Riddle with that id doesnt not exsist' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Issues:' + error.message,
    });
  }
  res.riddle = riddle;
  next();
}
module.exports = router;
