import getDoc from "../../../../util/doc";

export default async (req, res) => {
	if (typeof req.query.id !== "string")
		return res.status(400).json({err: "invalidDocument"});
	const doc = await getDoc(req.query.id);
	if (!doc) return res.status(400).json({err: "invalidDocument"});

	res.status(200).send(doc.content);
};
