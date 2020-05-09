const dev = process.env.NODE_ENV === "development";

export default {
	dev,
	apiUrl: `${dev ? "http://localhost:3000" : "https://textbox.alles.cx"}/api`,
	fpApiUrl: "https://1api.alles.cx/v1",
	inputBounds: {
		title: {
			min: 3,
			max: 100
		},
		content: {
			min: 1,
			max: 25000
		}
	}
};
