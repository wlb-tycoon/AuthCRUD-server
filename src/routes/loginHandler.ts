const { findByEmail } = require("../interfaces/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginHandler(req: any, res: any) {
  try {
    const { email, password } = req.body;
    // Validate email and password
    if (!email || !password) {
      return res
        .code(400)
        .send({ message: "Please provide an email and password" });
    }

    // Retrieve user from the database
    const user = await findByEmail(email);

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.code(401).send({ message: "Invalid email or password" });
    }

    // Check if the user exists
    if (!user) {
      return res.code(401).send({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.code(401).send({ message: "Invalid email or password" });
    }

    // Create session for the user
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.header("Authorization", `Bearer ${token}`).code(200).send({ token });
  } catch (error) {
    console.error(error);
    return res.code(500).send({ message: "Error in Login..." });
  }
}

export default loginHandler;
