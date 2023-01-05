const bcrypt = require("bcryptjs");

const saltRounds = 10;

const createHash = (input) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      if (error) rej(error);
      bcrypt.hash(input, salt, (error, hash) => {
        if (error) rej(error);
        res(hash);
      });
    });
  });
};

const compareHash = (input, hash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(input, hash, (error, isMatch) => {
      if (error) rej(error);
      else res(isMatch);
    });
  });
};

module.exports = { createHash, compareHash };
