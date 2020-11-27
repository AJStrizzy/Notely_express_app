'use strict';
var forms = require('forms');
var fields = forms.fields;
var widgets = forms.widgets;

var noteForm = forms.create({
    subject: fields.string({
        widget: widgets.text({
            classes: ['form-control note-editor__subject-input'],
            required: true
        }),
        cssClasses: {
            label: ['note-editor__input-label']
        }
    }),
    detail: fields.string({
        widget: widgets.textarea({
            classes: ['form-control note-editor__detail-input'],
            rows: 12,
            cols: 20
        }),
        cssClasses: {
            label: ['note-editor__input-label']
        },
        name: 'Your Note',
    })
})

module.exports = noteForm;
