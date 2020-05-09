import db from "../../util/db";
import auth from "../../util/auth";
import config from "../../config";
import credentials from "../../credentials";
import { Op } from "sequelize";
import { v4 as uuid } from "uuid";
import { generate as randomString } from "randomstring";
import log from "@alleshq/log";

export default async (req, res) => {
  const user = await auth(req.headers.authorization);
  if (!user) return res.status(400).json({ err: "invalidSession" });

  //Parameters
  if (
    !req.body ||
    typeof req.body.title !== "string" ||
    typeof req.body.content !== "string" ||
    typeof req.body.markdown !== "boolean" ||
    typeof req.body.highlight !== "boolean"
  )
    return res.status(400).json({ err: "invalidBodyParameters" });
  if (
    req.body.title.trim().length < config.inputBounds.title.min ||
    req.body.title.length > config.inputBounds.title.max
  )
    return res.status(400).json({ err: "titleLength" });
  if (
    req.body.content.trim().length < config.inputBounds.content.min ||
    req.body.content.length > config.inputBounds.content.max
  )
    return res.status(400).json({ err: "contentLength" });

  //Ratelimiting
  const since = new Date(new Date().getTime() - 1000 * 60);
  const recentDocs = await db.Document.count({
    where: {
      user: user.id,
      createdAt: {
        [Op.gte]: since
      }
    },
    paranoid: false
  });
  if (recentDocs >= 5) return res.status(429).json({ err: "cooldown" });

  //Create Document
  const doc = await db.Document.create({
    id: uuid(),
    code: randomString({
      length: 10,
      capitalization: "lowercase"
    }),
    user: user.id,
    name: req.body.title,
    content: req.body.content,
    markdown: req.body.markdown,
    highlight: req.body.highlight
  });

  //Log
  log(
    credentials.logarithm,
    "textbox.new",
    {
      id: doc.id,
      code: doc.code
    },
    user.id
  );

  //Response
  res.json({
    code: doc.code
  });
};
