import { fetchUser } from "../interfaces/user";

async function usersHandler(req: any, res: any) {
  try {
    const users: unknown = await fetchUser();
    res.code(200).send({ users });
  } catch (error) {
    res.code(500).send({ error: "An error occurred while fetching users" });
  }
}

export default usersHandler;
