import auth from "../../util/auth";

export default async (req, res) => {
  const user = await auth(req.headers.authorization);
  if (!user) return res.status(400).json({ err: "invalidSession" });

  res.json({
    id: user.id,
    username: user.username,
    name: user.name,
    nickname: user.nickname,
    plus: user.plus
  });
};
