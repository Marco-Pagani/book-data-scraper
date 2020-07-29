let fs = require('fs')
let google_data = require('./books.json')
let lib_data = require('./database.json')

google_data = google_data.books

let site_data = []
google_data.forEach(function (book, i) {
    if (!book.error) {

    } else {
            console.log(lib_data[i].Title)
            console.log(lib_data[i].Author)
    }
})