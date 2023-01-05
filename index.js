const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));
var requestOptions = {
	method: "GET",
	headers: {
		"x-rapidapi-key": "2eeafea8379edba2af77907f4010b282",
		"x-rapidapi-host": "v3.football.api-sports.io",
	},
	redirect: "follow",
};
app.use(
	cors({
		Credentials: true,
		origin: ["http://localhost:3000"],
	})
);
app.listen(port);

/****************************STANDINGS***************************/
let dataSDPL;
let dataSDBL;
let dataSDLL;
const fetchDataSDPL = async () => {
	const r = await fetch(
		`https://v3.football.api-sports.io/standings?league=39&season=2022`,
		requestOptions
	);
	dataSDPL = await r.json();
};
const fetchDataSDBL = async () => {
	const r = await fetch(
		`https://v3.football.api-sports.io/standings?league=78&season=2022`,
		requestOptions
	);
	dataSDBL = await r.json();
};
const fetchDataSDLL = async () => {
	const r = await fetch(
		`https://v3.football.api-sports.io/standings?league=140&season=2022`,
		requestOptions
	);
	dataSDLL = await r.json();
};
fetchDataSDPL();
fetchDataSDLL();
fetchDataSDBL();
app.get("/standings/39", async (req, res) => {
	res.json(dataSDPL);
});
app.get("/standings/140", async (req, res) => {
	res.json(dataSDLL);
});
app.get("/standings/78", async (req, res) => {
	res.json(dataSDBL);
});
