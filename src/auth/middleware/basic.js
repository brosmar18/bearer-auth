'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { userModel } = require('../models');

module.exports = async (req, res, next) => {



  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ')[1];
  let [username, pass] = base64.decode(basic).split(':');

  try {
    req.user = await userModel.authenticateBasic(username, pass)
    next();
  } catch (e) {
    // console.error(e);
    res.status(403).send('Invalid Login');
  }

}

