let fs = require('fs')
let google_data = require('./formatted_data/google_books.json')
let lib_data = require('./formatted_data/database_books.json')

let site_data = []
google_data.forEach(function (gbook, i) {
    let lbook = lib_data[i]

    let title = gbook.title
    if (gbook.subtitle) { title = title + ': ' + gbook.subtitle }

    let description = ''
    if (lbook.Annotation && lbook.Annotation.length > 40)
        description = lbook.Annotation
    else if (gbook.description)
        description = gbook.description

    let subjects = []
    if(lbook.Subjects)
        subjects = lbook.Subjects.split(',')
    if(gbook.categories)
        subjects = subjects.concat(gbook.categories)
    
    let audience = []
    if (lbook["Target Users"])
        audience = lbook["Target Users"].split(',')
        
    let expertise = []
    if (lbook["Expertise Level"])
        expertise = lbook["Expertise Level"].split(',')

    let imageLink = ''
    if (gbook.imageLinks)
        imageLink = gbook.imageLinks.thumbnail
    
    site_data.push({
        'title': title,
        'authors': gbook.authors,
        'isbn': gbook.industryIdentifiers[0].identifier,
        'published': gbook.publishedDate,

        'description': description,

        'subjects': subjects,
        'audience': audience,
        'expertise': expertise ,
        'lessons': Boolean(lbook["Lesson Plans or Projects"]),

        'image': imageLink,
        'amazon': lbook['Amazon Link'],
        'worldcat': lbook['Worldcat Link'],
        'google': gbook.canonicalVolumeLink

    })

})

site_data = site_data.sort(function (a, b) {
    return a.title.localeCompare(b.title)
})
fs.writeFile('formatted_data/complete_books.json', JSON.stringify(site_data), 'utf8', results => {
    console.log('done')
})