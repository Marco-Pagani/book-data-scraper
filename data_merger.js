let fs = require('fs')
let google_data = require('./formatted_data/google_books.json')
let lib_data = require('./formatted_data/database_books.json')

let site_data = []
google_data.books.forEach(function (gbook, i) {
    let lbook = lib_data[i]

    let title = gbook.data.title
    if (gbook.data.subtitle) { title = title + ': ' + gbook.data.subtitle }

    let publisher = gbook.data.publisher
    publisher = publisher.replace(',', '')

    let description = ''
    if (lbook.Annotation && lbook.Annotation.length > 40)
        description = lbook.Annotation
    else if (gbook.data.description)
        description = gbook.data.description

    let subjects = []
    if (lbook.Subjects)
        subjects = lbook.Subjects.split(',')
    if (gbook.data.categories)
        subjects = subjects.concat(gbook.data.categories)

    let audience = []
    if (lbook["Target Users"])
        audience = lbook["Target Users"].split(',')

    let expertise = []
    if (lbook["Expertise Level"])
        expertise = lbook["Expertise Level"].split(',')

    let imageLink = ''
    if (gbook.data.imageLinks)
        imageLink = gbook.data.imageLinks

    let pagecount = 0
    if (gbook.data.pageCount)
        pagecount = gbook.data.pageCount

    site_data.push({
        'title': title,
        'authors': gbook.data.authors,
        'isbn': gbook.data.industryIdentifiers[0].identifier,
        'published': gbook.data.publishedDate,
        'publisher': publisher,
        'pagecount': pagecount,

        'description': description,

        'subjects': subjects,
        'audience': audience,
        'expertise': expertise,
        'lessons': Boolean(lbook["Lesson Plans or Projects"]),

        'images': imageLink,
        'amazon': lbook['Amazon Link'],
        'worldcat': lbook['Worldcat Link'],
        'google': gbook.data.canonicalVolumeLink,
        'google_id': gbook.id

    })

})

site_data = site_data.sort(function (a, b) {
    return a.title.localeCompare(b.title)
})
fs.writeFile('formatted_data/complete_books.json', JSON.stringify(site_data), 'utf8', results => {
    console.log('done')
})