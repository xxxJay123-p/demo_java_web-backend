import { User } from "../model/models.js";

const getAll = async (req, res) => {
  try {
    const users = await User.findMany({});
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findUnique({
      where: {
        id,
      },
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { getAll, getOneById };
