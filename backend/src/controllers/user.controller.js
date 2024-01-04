const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const secretKey = 'SecretKey';
const tokenBlacklist = new Set();

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, classGrade, language,allowedDoubtSubjectTypes } = req.body;

    if (!name || !email || !password || !role || !language || (role === 'student' && !classGrade)|| (role === 'tutor' && !allowedDoubtSubjectTypes)) {
        res.status(400).send('Please fill all required fields');
    } else {
        const isAlreadyExist = await Users.findOne({ email });
        if (isAlreadyExist) {
            res.status(400).send('User already exists');
        } else {
            const newUser = new Users({ name,email, password, role, classGrade, language,allowedDoubtSubjectTypes });
            bcryptjs.hash(password, 10, (err, hashedPassword) => {
                newUser.set('password', hashedPassword);
                newUser.save();
              
            })
            return res.status(200).send('User registered successfully');
        }
    }

} catch (error) {
    console.log(error, 'Error')
}
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Please fill all required fields');
    } else {
        const user = await Users.findOne({ email });
        if (!user) {
            res.status(400).send('User email or password is incorrect');
        } else {
            const validateUser = await bcryptjs.compare(password, user.password);
            if (!validateUser) {
                res.status(400).send('User email or password is incorrect');
            } else {
                const payload = {
                    userId: user._id,
                    email: user.email
                }
                const JWT_SECRET_KEY =  'THIS_IS_A_JWT_SECRET_KEY';

                jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
                    await Users.updateOne({ _id: user._id }, {
                        $set: { token }
                    })
                    user.save();
                    return res.status(200).json({ user: { id: user._id, email: user.email, name: user.name }, token: token })
                })
            }
        }
    }

} catch (error) {
    console.log(error, 'Error')
}
};

exports.logoutUser = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    tokenBlacklist.add(token);
    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(400).json({ message: "Invalid token" });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token && !tokenBlacklist.has(token)) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
};

