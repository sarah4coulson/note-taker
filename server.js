const path = require("path");
const fs = require("fs");
const express = require("express");
const noteDatabase = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);


app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);


app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
     res.json(data)
    });
 
});


app.post("/api/notes", (req, res) => {
  noteDatabase.push(req.body);
  noteDatabase.forEach((obj, i) => {
    obj.id = i + 1;
  });

  fs.writeFile("./db/db.json", JSON.stringify(noteDatabase), () => {
    res.json(noteDatabase);
  });
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
