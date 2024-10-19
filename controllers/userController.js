import User from '../models/userModel.js';

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send({ message: 'User already registered' });
    }

    await User.create({
      userName,
      email,
      password,
    });
    res.status(201).json({ message: 'user created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }

  try {
    const token = await User.matchPassword(email, password);
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
      })
      .status(200)
      .json({ message: 'Login Successful', token });
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

export { register, login, logout };
