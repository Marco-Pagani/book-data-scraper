let fs = require('fs')
let google_data = require('./books.json')
let lib_data = require('./database.json')

google_data = google_data.books

let site_data = []
google_data.forEach(function (book, i) {
    if (!book.error) {

    } else {
        if (typeof lib_data[i].ISBN == 'string') {
            console.log(lib_data[i].ISBN.split(' ')[1])
        }
    }
})