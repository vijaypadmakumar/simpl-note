const express = require("express")
const stringHash = require("string-hash")
const PORT = process.env.PORT || 3000
const string = require("string-hash")

const app = express()

let notes = {}

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public/css"))
app.use(express.static("public/js"))

app.get("/", (req, res) => {
    res.render('home', { all_notes: notes })
})


app.get("/compose", (req, res) => {
    res.render('compose')
})

app.post("/", (req, res) => {
    let title = req.body.note_title
    let text = req.body.note_text

    /* needs to be moved to a module */

    let hash = stringHash(title + text)

    if (title.length && text.length) {
        notes[hash] = [title, text]
    }

    console.log(notes);

    /* end */

    res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})