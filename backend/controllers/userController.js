// controllers/userController.js
const User = require('../models/User');

const signup = async (req, res) => {
  const { name, email, password, gender, age } = req.body;
  
  try {
    const newUser = await User.create({ name, email, password, gender, age });
    res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
  } catch (error) {
    res.status(400).json({ error: '사용자 생성 중 오류 발생', details: error.message });
  }
};

module.exports = { signup };
