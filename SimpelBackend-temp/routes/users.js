// Call Router / Schemas ------------------------
const router = require('express').Router();
let User = require('../models/users.models');

// ------------------------------------------------
// FIND USERS ROUTE ------------------------
router.get('/admin', async (req, res) => {
  console.log('Get all users!');
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Der var en fejl i / :' + err.message });
  }
});
// ------------------------------------------------

// FIND USER BY ID ROTUE -------------------------
router.get('/admin/:id', findUser, async (req, res) => {
  console.log('Get user by id!');

  res.json(res.user);
});
// ---------------------------------

// ADD USER ROUTE ------------------------
router.post('/admin/register', async (req, res) => {
  console.log('POST', req.body);

  try {
    let user = await User.findOne({ userEmail: req.body.userEmail });
    console.log('User', user);
    if (user) {
      console.log('User exsists');
      return res.status(401).json({ message: 'User exsists ' });
    } else {
      console.log('User doesnt exsists');
      user = new User(req.body);
      const newUser = await user.save();
      res.status(201).json({ message: 'New user created', newUser });
    }
  } catch (error) {
    res.status(400).json({ message: 'A error occured', error: error.message });
  }
});

// ------------------------------------------------

// DELETE USER ROUTE ------------------------
router.delete('/admin/:id', findUser, async (req, res) => {
  console.log('User Deleted!');

  try {
    await res.user.remove();
    res.status(200).json({ message: 'User is deleted' });
  } catch (error) {
    res.json(500).json({
      message: "User can't be deleted! Error occured" + error.message,
    });
  }
});
// ------------------------------------------------

// EDIT USER ROUTE ------------------------
router.put('/admin/:id', findUser, async (req, res) => {
  console.log('PUT');

  try {
    res.user.userName = req.body.userName;
    res.user.userEmail = req.body.userEmail;
    res.user.userPassword = req.body.userPassword;

    await res.user.save();
    res.status(200).json({ message: 'User was updated!', editUser: res.user });
  } catch (error) {
    res.json(500).json({
      message: 'User cannot be updated! Error occured' + error.message,
    });
  }
});
// ------------------------------------------------
// async function admin(req, res, next) {
//   let admin;

//   try {
//     admin = await User.findOne({ admin: req.body.adminPassword });
//     if (!admin) {
//       console.log('User is not a admin');
//       res.redirect('/');
//     } else {
//       next();
//     }
//   } catch (error) {}
// }
async function findUser(req, res, next) {
  console.log('Find user by id!', req.params.id);
  let user;

  try {
    user = await User.findById(req.params.id);

    if (user == null) {
      return res
        .status(404)
        .json({ message: 'User with that id doesnt not exsist' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Issues:' + error.message,
    });
  }
  res.user = user;
  next();
}

module.exports = router;
