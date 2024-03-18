const jwt = require("jsonwebtoken");
const { findByEmail, createUser } = require("../interfaces/user");

async function signupHandler(req: any, res: any) {
  const { name, email, password } = req.body;
  // Validate name, email and password
  if (!name || !email || !password) {
    return res
      .code(400)
      .send({ message: "Please provide a name, email and password" });
  }

  const existingUser = await findByEmail(email);
  if (existingUser) {
    return res.code(400).send({ message: "Email ID Already Exists...." });
  }

  try {
    // Create the user in the database
    const user = await createUser(name, email, password);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.header("Authorization", `Bearer ${token}`);
    return res.code(201).send({ message: "Registration successful", token });
  } catch (error) {
    console.error(error);
    return res.code(500).send({ message: "Error in Registeration" });
  }
}

export default signupHandler;
