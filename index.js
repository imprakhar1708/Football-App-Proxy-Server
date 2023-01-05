const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));
var requestOptions = {
	method: "GET",
	headers: {
		"x-rapidapi-key": "8ea474ed8d5e143a9b74941ea336b09e",
		"x-rapidapi-host": "v3.football.api-sports.io",
	},
	redirect: "follow",
};
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
app.get("standings/39", async (req, res) => {
	res.json(dataSDPL);
});
app.get("standings/140", async (req, res) => {
	res.json(dataSDLL);
});
app.get("standings/78", async (req, res) => {
	res.json(dataSDBL);
});

/***********************LIVESCORE*************************/
let dataL;
const fetchDataL = async () => {
	const apiUrl1 = `https://v3.football.api-sports.io/fixtures?league=39&season=2022&last=5`;
	const apiUrl2 = `https://v3.football.api-sports.io/fixtures?league=2&season=2022&last=5`;
	const res1 = await fetch(apiUrl1, requestOptions);
	const res2 = await fetch(apiUrl2, requestOptions);
	const r1 = await res1.json().response;
	const r2 = await res2.json().response;
	dataL = [r1, r2];
};
fetchDataL();

router.get("/livescores", async (req, res) => {
	res.json(dataL);
});

/********************************TOPSCORERS******************************/
let dataTSPL;
let dataTSBL;
let dataTSCL;
let dataTSLL;
const fetchDataTSPL = async () => {
	const r = await fetch(
		`https://v3.football.api-sports.io/players/topscorers?league=39&season=2022`,
		requestOptions
	);
	dataTSPL = await r.json();
};
const fetchDataTSCL = async () => {
	const r = await fetch(
		`https://v3.football.api-sports.io/players/topscorers?league=2&season=2022`,
		requestOptions
	);
	dataTSCL = await r.json();
};
const fetchDataTSBL = async () => {
	const r = await fetch(
		`https://v3.football.api-sports.io/players/topscorers?league=78&season=2022`,
		requestOptions
	);
	dataTSBL = await r.json();
};
const fetchDataTSLL = async () => {
	const r = await fetch(
		`https://v3.football.api-sports.io/players/topscorers?league=140&season=2022`,
		requestOptions
	);
	dataTSLL = await r.json();
};
fetchDataTSPL();
fetchDataTSCL();
fetchDataTSBL();
fetchDataTSLL();
app.get("topsc/39", async (req, res) => {
	res.json(dataTSPL);
});
app.get("topsc/2", async (req, res) => {
	res.json(dataTSCL);
});
app.get("topsc/140", async (req, res) => {
	res.json(dataTSLL);
});
app.get("topsc/78", async (req, res) => {
	res.json(dataTSBL);
});
