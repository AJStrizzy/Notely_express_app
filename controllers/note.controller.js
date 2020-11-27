'use strict';
var noteForm = require('../forms/note.form.js');
var db = require('../models/index.js');
var note = require('../models/notes.js');
var noteModel = note(db.sequelize, db.Sequelize.DataTypes);
var date = new Date();

// Get all notes
var getAllNotes = function(req,res) {
    noteModel.findAll({
        where: { isDeleted: false }
    }).then(notes => {
        res.render(
            'index',
            {
                title: 'Note List',
                year: date.getFullYear(),
                notes: notes
            }) 
        })
    }

// Create a new note

var createNote = function (req, res) {
    if(req.method === 'POST') {
        noteForm.handle(req, {
            success: function (form) {
                noteModel.create({
                    subject: form.data.subject,
                    detail: form.data.detail
                })
            }
        })
        res.redirect('/')
    } else {
        res.render('create_note', {
            title: 'Create Note',
            year: date.getFullYear(),
            form: noteForm
        })
    }
}

// Get Note

var getNote = function (req, res) {
    noteModel.findByPk(req.params.id)
    .then((note) => {
        res.render(
            'note_detail',
            {
                title: 'Note Detail',
                year: date.getFullYear(),
                note: note
            }
        )
    })
}

// Update note
var editNote = function (req, res) {
    if (req.method === 'POST') {

        noteForm.handle(req, {
            sucess: function (form) {
                noteModel.update({
                    subject: form.data.subject,
                    detail: form.data.detail 
                },
                    {
                        where: { id: req.params.id }
                    })
                }
        })
        res.redirect('/')
    } else {
        noteModel.findByPk(req.params.id) 
        .then(note => {
            res.render(
                'edit_note',
                {
                    title: 'Edit Note',
                    year: date.getFullYear(),
                    form: noteForm.bind(note),
                    noteId: note.id
                }
            )
        })
    }
}

// Delete note
var deleteNote = function(req, res) {
    noteModel.update({
        isDeleted: true
    }, 
    {
        where: { id: req.oarams.id }
    }).then(() => {
        res.redirect('/')
    })
}

//export all methods

module.exports = {
    getAllNotes: getAllNotes,
    createNote: createNote,
    getNote: getNote,
    editNote: editNote,
    deleteNote: deleteNote
};