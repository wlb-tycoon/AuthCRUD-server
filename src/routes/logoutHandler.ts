async function logoutHandler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
  } else {
    // Respond with a success message
    res.send({ message: "Logout successful" });
  }
}

export default logoutHandler;
