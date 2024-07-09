const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const validator = require('validator');

exports.signup = async (req, res) => {
  try{
    const { id, password } = req.body;

    if (!validator.isEmail(id) && !validator.isMobilePhone(id)) {
      return res.status(400).json({ message: 'Email or phone number is needed!' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password should contain at least 8 symbols!' });
    }

    const existingUser = await User.findByPk(id);
    if (existingUser) {
      return res.status(400).json({ message: 'The User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ id, password: hashedPassword });
    return res.status(200).send("You have successfully registered!");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!validator.isEmail(id) && !validator.isMobilePhone(id)) {
      return res.status(400).json({ message: 'Email or phone number is needed!' });
    }

    const user = await User.findByPk(id);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }
    const accessToken = generateAccessToken({ id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });
    const refreshToken = generateRefreshToken({ id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
    return res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.newToken = async (req, res) => {
  try{
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).send({ message: 'Refresh token is required!' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).send({ message: 'Invalid refresh token!' });
    }
    const newAccessToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.status(200).send({ accessToken: newAccessToken});
  } catch (error) {
    res.status(500).send(error);
  }
};
