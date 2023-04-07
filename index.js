const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// to create a text file in a particular folder where the file name is current date-time.txt & its content is current timestamp
app.post("/createFile/:folderName", (req, res) => {
  // to create a folder
  fs.mkdir(`./${req.params.folderName}`, function () {
    console.log("Folder created");
  });

  // new Date object
  let timestamp = new Date();
  // current date
  // adjust 0 before single digit date
  let date = `${timestamp.getDate()}`;
  // current month
  let month = `${timestamp.getMonth() + 1}`;
  // current year
  let year = timestamp.getFullYear();
  // current hours
  let hours = `${timestamp.getHours()}`;
  // current minutes
  let minutes = `${timestamp.getMinutes()}`;
  // current seconds
  let seconds = `${timestamp.getSeconds()}`;

  let fileName = `${year}-${month}-${date} ${hours}H${minutes}M${seconds}S`;

  // to create a text file in a particular folder where the file name is current date-time.txt & its content is current timestamp
  fs.writeFile(`./${req.params.folderName}/${fileName}.txt`, `${timestamp}`, (err) => {
    if (err) throw err;
    res.json({ message: `${fileName}.txt file created in ${req.params.folderName} folder` });
  });
});

// to retrieve all the text files in that particular folder
app.get("/readFolder/:folderName", (req, res) => {
  fs.readdir(`./${req.params.folderName}`, (err, files) => {
    if (err) throw err;
    const txtFiles = [];
    // to get only the text files
    files.forEach((file) => {
      if (path.extname(file) == ".txt") {
        txtFiles.push(file);
      }
    });
    res.json({ text_files: txtFiles });
  });
});

app.listen(process.env.PORT || 3000);