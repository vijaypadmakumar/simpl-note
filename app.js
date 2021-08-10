const express = require("express")
const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public/css"))
app.use(express.static("public/js"))

app.get("/", (req, res) => {
    res.render('home')
})


app.get("/compose", (req, res) => {
    res.render('compose')
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})