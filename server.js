const express = require("express");

const PORT = 3001;

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/favorite", (req, res) => {
  res.sendFile(__dirname + "/public/favorite.html");
});

app.get("/api/countries/:country", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.restcountries.com/countries/v5?q=${req.params.country}`,
      {
        headers: {
          Authorization: "Bearer rc_live_4c89131ab8b04ae4be246e27f10177aa",
        },
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Request failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
