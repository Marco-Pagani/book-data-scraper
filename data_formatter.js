let fs = require('fs')
let data = require('./formatted_data/complete_books.json')

function check_nil(item) {
    if (item)
        return item
    else
        return 'nil'
}

data.forEach(book => {
    if (!book.error) {
        // define grub for url
        let grub = book.title.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
        if (grub.length > 30) {
            grub = grub.substr(0, 30)
            grub = grub.substr(0, grub.lastIndexOf("-"))
        }
        let tag = ''
        if (book.lessons)
            tag = '\ttag: [lesson plans]\n'

        // add data to page
        let page =
            '---\n' +
            'title: ' + book.title + '\n' +
            'taxonomy:\n' +
            '\tauthor: [' + book.authors.join(', ') + ']\n' +
            '\tpubdate: ' + book.published.substr(0,4) + '\n' +
            '\tisbn: ' + book.isbn + '\n' +
            '\tsubjects: [' + book.subjects.join(', ') + ']\n' +
            '\taudience: [' + book.audience.join(', ') + ']\n' +
            '\texpertise: [' + book.expertise.join(', ') + ']\n' + tag +
            'cover: ' + check_nil(book.image) + '\n' +
            'amazon: ' + check_nil(book.amazon) + '\n' +
            'worldcat: ' + check_nil(book.worldcat) + '\n' +
            'google: ' + check_nil(book.google) + '\n' +
            '---\n' + book.description


        // create folder for page
        if (!fs.existsSync('out/' + grub)) {
            fs.mkdirSync('out/' + grub);
        }

        // write file
        fs.writeFile('out/' + grub + '/item.md', page, function (err) {
            console.log("writing " + grub)
        })

    }
})