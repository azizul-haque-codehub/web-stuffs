// Importing required modules
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
// Sample data to simulate indexed web pages (static data that's why we don't needed crawler)
const indexedData = [
	{
		id: 1,
		title: "Learn JavaScript",
		content: "JavaScript is a versatile language used for web development.",
		hyperlink: "/#",
	},
	{
		id: 2,
		title: "Learn Node.js",
		content: "Node.js allows you to run JavaScript on the server-side.",
		hyperlink: "/#",
	},
	{
		id: 3,
		title: "Frontend Development",
		content: "Frontend involves HTML, CSS, and JavaScript.",
		hyperlink: "/#",
	},
	{
		id: 4,
		title: "Backend Development",
		content:
			"Backend involves server-side languages like Node.js, Python, and Ruby.",
		hyperlink: "/#",
	},
];

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// API endpoint to handle search queries

app.get("/", (req, res) => {
	res.send({ message: `Search Engine server run port on ${PORT}` });
});
app.get("/search", (req, res) => {
	const query = req.query.q?.toLowerCase();
	if (!query) {
		return res.status(400).json({ message: "Query parameter is required" });
	}

	// Filter indexed data based on query
	const results = indexedData.filter(
		(item) =>
			item.title.toLowerCase().includes(query) ||
			item.content.toLowerCase().includes(query),
	);

	res.json({ results });
});

// Start the server
app.listen(PORT, () => {
	console.log(
		`Server is running on http://localhost:${PORT} at ${new Date().getSeconds()}`,
	);
});
