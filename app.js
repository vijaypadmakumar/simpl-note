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

    const message = Object.keys(notes).length === 0 ? "You haven't created any notes yet" : ""

    res.render('home', { all_notes: notes, comment: message })
})


app.get("/compose", (req, res) => {
    res.render('compose')
})

app.post("/", (req, res) => {
    let title = req.body.note_title
    let text = req.body.note_text

    // creating a unique id
    let hash = stringHash(title + text)

    if (title.length && text.length) {
        notes[hash] = [title, text]
    }

    res.redirect("/")
})

app.post("/open", (req, res) => {
    let note_id = req.body.open_button

    res.render('open', { title: notes[note_id][0], body: notes[note_id][1] })
})

app.post("/edit", (req, res) => {
    let note_id = req.body.edit_button

    let title = notes[note_id][0]
    let body = notes[note_id][1]

    console.log(title, body);

    res.render('edit', { prev_title: title, prev_body: body, post_id: note_id })
})

app.post("/update-post", (req, res) => {
    let note_id = req.body.update_button
    let title = req.body.note_title
    let text = req.body.note_text

    // removing the old note
    delete notes[note_id]

    // adding the new note
    let hash = stringHash(title + text)

    if (title.length && text.length) {
        notes[hash] = [title, text]
    }

    res.redirect("/")

})

app.post("/delete", (req, res) => {
    let note_id = req.body.delete_button

    delete notes[note_id]

    res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})