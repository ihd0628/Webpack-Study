import express from "express";

const app = express();
const PORT = 2000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const homeRender = (req, res) => {
    return res.render('./index.html')
}

app.get("/", homeRender);

app.use("/public", express.static("public"));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  });