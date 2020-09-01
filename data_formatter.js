let fs = require('fs')
let data = require('./formatted_data/complete_books.json')
let http = require('http')

function check_nil(item) {
    if (item)
        return item
    else
        return 'nil'
}

let image_name = ['smallThumbnail', 'thumbnail', 'small', 'medium', 'large', 'extraLarge']

function select_images(images) {
    let thumb = 'nil', cover = 'nil'
    let values = Object.values(images)

    if (values.length >= 1) {
        thumb = image_name[Math.min(values.length - 1, 2)] + '.jpeg'
        cover = image_name[values.length - 1] + '.jpeg'
    }

    return {
        "thumb": thumb,
        "cover": cover
    }
}

function filterSubjects(list) {
    return list.filter(x => x.indexOf('/') == -1)
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

        let images = select_images(book.images)
        // add data to page
        let page =
            '---\n' +
            'title: ' + book.title + '\n' +
            'taxonomy:\n' +
            '\tauthor: [' + book.authors.join(', ') + ']\n' +
            '\tpubdate: ' + book.published.substr(0, 4) + '\n' +
            '\tisbn: ' + book.isbn + '\n' +
            '\tsubjects: [' + filterSubjects(book.subjects).join(', ') + ']\n' +
            '\taudience: [' + book.audience.join(', ') + ']\n' +
            '\texpertise: [' + book.expertise.join(', ') + ']\n' + tag +
            'publisher: ' + book.publisher + '\n' +
            'pagecount: ' + book.pagecount + '\n' +
            'thumb: ' + images.thumb + '\n' +
            'cover: ' + images.cover + '\n' +
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

        // download images
        /*
        Object.keys(book.images).forEach(size => {
            let fullUrl = book.images[size];
            let file = fs.createWriteStream(`out/${grub}/${size}.jpeg`);
            let request = http.get(fullUrl, function (response) {
                response.pipe(file);
            });
        });*/

    }
})