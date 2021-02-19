const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length !== 0) {
        console.log(chalk.red.inverse('Note title taken!'))
        return
    }

    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New node added!'))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note removed!'))
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote
};
