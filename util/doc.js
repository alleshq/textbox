import config from "../config";
import credentials from "../credentials";
import axios from "axios";
import db from "./db";

export default async code => {
	//Get Document
	const doc = await db.Document.findOne({
		where: {
			code
		}
	});
	if (!doc) return;

	//Get Author
	var author;
	try {
		author = (
			await axios.get(`${config.fpApiUrl}/user?id=${doc.user}`, {
				auth: {
					username: credentials.allesOAuth.id,
					password: credentials.allesOAuth.secret
				}
			})
		).data;
	} catch (err) {
		return;
	}
	doc.author = author;

	return doc;
};
