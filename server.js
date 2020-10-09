//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//set up the express app
const app = express();
const PORT = 9891;

//allow data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serve static resources
app.use(express.static('public'));

//get route for html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//will need to add an api get route for getting the various wavetables

//post route for creating new wavetable files
app.post("/api/addwave", (req, res) => {
    const { body } = req;
    const data = { body };
    const filename = { body };
    //save the file to the wavetables folder
    fs.writeFile(path.join(__dirname, `/wavetables/${filename}.js`), data, (err) => {
        //if there is an error send a 500 code
        if (err) {
            res.sendStatus(500);
        }
        else { //if writing the file is successful, send a 200 status code
            res.sendStatus(200);
        }
    });
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});