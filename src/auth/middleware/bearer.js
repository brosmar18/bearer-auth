'use strict';

const { userModel } = require('../models');

module.exports = async (req, res, next) => {
  console.log("Bearer Middleware");
  try {

    if (!req.headers.authorization) { 
      next('Invalid Login') ;
      return;
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await userModel.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}
