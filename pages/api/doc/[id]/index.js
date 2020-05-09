import getDoc from "../../../../util/doc";

export default async (req, res) => {
	if (typeof req.query.id !== "string")
		return res.status(400).json({err: "invalidDocument"});
	const doc = await getDoc(req.query.id);
	if (!doc) return res.status(400).json({err: "invalidDocument"});

	res.json({
		id: doc.code,
		name: doc.name,
		content: doc.content,
		author: {
			id: doc.author.id,
			username: doc.author.username,
			plus: doc.author.plus
		},
		createdAt: doc.createdAt,
		editedAt:
			doc.updatedAt.getTime() !== doc.createdAt.getTime()
				? doc.updatedAt
				: null,
		highlight: doc.highlight,
		markdown: doc.markdown
	});
};
