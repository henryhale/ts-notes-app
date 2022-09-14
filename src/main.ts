import "./style.css";

import { getElemId } from "./helpers";
import { Notes } from "./models";

/**
 * DOM element references
 */
const [
    switchView, 
    notesView, 
    entryView
] = ["switchView", "notesView", "entryView"].map(el => getElemId(el))
// Input, TextArea element
const 
    noteTitle = <HTMLInputElement>getElemId("noteTitle"),
    noteContent = <HTMLTextAreaElement><unknown>getElemId("noteContent"),
    searchNote = <HTMLInputElement>getElemId("searchNote")


/**
 * Sample -> Task Manager
 */
const tasks = new Notes()
// Initial Guide
tasks.add("Task 3", "Double tap to delete")
tasks.add("Task 2", "Tap *New Note* to add a new note")
tasks.add("Task 1", "Hello, Wolrd!")
// Render guide
tasks.render(notesView)

// Keep track of views -> notes and form
let viewNotes = true

// SwitchView button
switchView?.addEventListener('click', () => {
    // toggle value
    viewNotes = !viewNotes
    // need for a re-render -> update dom if new note was added
    viewNotes && tasks.render(notesView)
    // Toggle between displays of notes, searchbar and entry form
    notesView.style.display = viewNotes ? 'block' : 'none'
    searchNote.style.display = viewNotes ? 'block' : 'none'
    entryView.style.display = viewNotes ? 'none' : 'block'
    // Switch text the user see :)
    switchView.textContent = viewNotes ? '+ New Note' : 'View Notes'
})

// New Note Form Entry
entryView?.addEventListener('submit', e => {
    // No reloads or any other default behaviour
    e.preventDefault()
    // Confirm that we have a title and some content
    if (noteTitle?.value && noteContent?.value) {
        // Add the note
        tasks.add(noteTitle.value, noteContent.value)
        // Clear fields for more 
        noteTitle.value = ""
        noteContent.value = ""
    }
})

// Search Form
searchNote?.addEventListener('input', e => {
    // prevent any default behaviour -> just in case
    e.preventDefault()
    // prepare search keyword
    let search = searchNote?.value.toLocaleLowerCase()
    // track search behind the scenes
    console.log("Searching for: ", search)
    // Locate which item-element's text content includes the search keyword
    for (let i = 0; i < notesView.children.length; i++) {
        // the element
        const elem = notesView.children[i]
        // prepare and the check
        if (elem.textContent?.toLocaleLowerCase()?.includes(search)) {
            // Show element if found
            elem.setAttribute("style", "display: block")
        } else {
            // Otherwise hide
            elem.setAttribute("style", "display: none")
        }
    }
})

