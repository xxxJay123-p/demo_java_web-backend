import { createToken, verifyToken } from "../utils/auth-utils.js";
import bcrypt from "bcrypt";
import { User } from "../model/models.js";

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (username == null || email == null) {
    res.status(400).json({ error: "Missing username/email or password." });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ error: "Email already exists." });
      return;
    }

    const securePassword = await bcrypt.hash(password, 10);

    console.log(`inside signup backend:`, { securePassword });

    const user = await User.create({
      username,
      email,
      password: securePassword,
    });

    const token = createToken(user);

    const userResponse = {
      username: user.username,
      email: user.email,
      role: user.role,
      _id: user._id,
    };

    res.status(201).json({
      message: "User successfully created",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);
    if (error.code === 11000) {
      res.status(409).json({
        error: {
          ...error,
          message: "Email already exists.",
        },
      });
    } else {
      res.status(500).json({ error });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Missing email or password." });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "Authentication failed. User not found." });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res
        .status(401)
        .json({ error: "Authentication failed. Incorrect password." });
      return;
    }

    const userToTokenize = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = createToken(userToTokenize);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();

  let payload = null;

  try {
    payload = await verifyToken(token);
  } catch (error) {
    console.error({ error });
    return res.status(401).end();
  }

  console.log("Inside protect: ", { bearer, payload });

  const user = await User.findUnique({
    where: {
      id: payload.id,
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (!user) {
    return res.status(401).end();
  }
  req.user = user;
  console.log("user passing from protect", user);
  next();
};

const adminRoute = async (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(401).end();
  } else {
    next();
  }
};

export { signup, login, protect, adminRoute };
