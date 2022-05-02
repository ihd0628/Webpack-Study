import express from "express";

const app = express();
const PORT = 2000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const indexRender = (req, res) => {
    return res.render('./index.html')
}
const aboutRender = (req, res) => {
    return res.render('./about.html')
}

app.get("/index", indexRender);
app.get("/about", aboutRender);

app.use("/public", express.static("public"));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  });