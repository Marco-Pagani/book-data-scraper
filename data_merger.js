let fs = require('fs')
let google_data = require('./formatted_data/google_books.json')
let lib_data = require('./formatted_data/database_books.json')

let site_data = []
google_data.forEach(function (gbook, i) {
    let lbook = lib_data[i]
    let title = gbook.title
    if (gbook.subtitle) { title = title + ': ' + gbook.subtitle }
    /*
    site_data.push({
        'title': title,
        'authors': gbook.authors
    })*/
    console.log(title)
    console.log(lbook.Title)
    console.log()
    
})