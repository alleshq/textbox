import auth from "../../../../util/auth";
import getDoc from "../../../../util/doc";
import config from "../../../../config";

export default async (req, res) => {
	const user = await auth(req.headers.authorization);
	if (!user) return res.status(400).json({err: "invalidSession"});
	if (typeof req.query.id !== "string")
		return res.status(400).json({err: "invalidDocument"});

	//Parameters
	if (!req.body || typeof req.body.content !== "string")
		return res.status(400).json({err: "invalidBodyParameters"});

	if (
		req.body.content.trim().length < config.inputBounds.content.min ||
		req.body.content.length > config.inputBounds.content.max
	)
		return res.status(400).json({err: "contentLength"});

	//Get Document
	const doc = await getDoc(req.query.id);
	if (!doc) return res.status(400).json({err: "invalidDocument"});
	if (doc.user !== user.id)
		return res.status(400).json({err: "mustOwnDocument"});

	//Update Document
	doc.update({
		content: req.body.content
	});

	//Response
	res.json({});
};
