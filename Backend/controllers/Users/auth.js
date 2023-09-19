import bcrypt from "bcrypt";
import { UserModel } from "../../models/Users/user.js";
import { sendCookie } from "../../utils/features.js";

export const register = async (req, res) => {
  try {
    // Destructure user data from the request body
    const { userName, emailAddress, password } = req.body;
    // Check if the email address already exists in the database
    let existingUser = await UserModel.findOne({ emailAddress });
    // If an existing user is found, respond with a "User already exists" message
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Validate user data (you can add more validation here)
    if (!userName || !emailAddress || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create a new user document and store it in the database
    const newUser = await UserModel.create({
      userName,
      emailAddress,
      password: hashedPassword,
    });
    // Send a cookie after user is created
    sendCookie(newUser, res, "Registered Successfuly", 201);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    // Get user data from the request body
    const { emailAddress, password } = req.body;

    // Validate user data (you can add more validation here)
    if (!emailAddress || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email address in the database
    const user = await UserModel.findOne({ emailAddress });
    // Create a session for the authenticated user
    req.session.userId = user._id;
    // Check if a user with the provided email exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Send a cookie if the login is successful...
      sendCookie(user, res, `Welcome Back, ${user.userName}`, 200);
    } else {
      // Password is incorrect, send an error response
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//logout controller
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      user: req.user,
    });
};
