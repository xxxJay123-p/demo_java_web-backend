import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, phone, address } = req.body;

    // Check if username already exists
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already exists", status: false });
    }

    // Check if email already exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already exists", status: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // Delete password from the response
    delete user.password;

    // Return success response
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If user doesn't exist, return error
    if (!user) {
      return res.json({ msg: "Invalid username or password", status: false });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!isPasswordValid) {
      return res.json({ msg: "Invalid username or password", status: false });
    }

    // Delete password from response
    delete user.password;

    // Return success response with logged-in user
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id, username, email, phone } = req.params;

    const filter = {};
    if (id) {
      filter['_id'] = id;
    } else if (username) {
      filter['username'] = username;
    } else if (email) {
      filter['email'] = email;
    } else if (phone) {
      filter['phone'] = phone;
    }

    if (!filter) {
      return res.status(400).json({
        msg: "Provide either ID, username, email, or phone",
      });
    }

    const user = await User.findOne(filter).select([
      'email',
      'username',
      'phone',
      '_id',
    ]);

    if (!user) {
      return res.status(404).json({
        msg: `User not found with ID, username, email, or phone`,
      });
    }

    delete user.password;

    return res.json({
      status: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "phone",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
