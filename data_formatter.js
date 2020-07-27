let fs = require('fs')
let data = require('./books.json')

let books = data.books
books.forEach(book => {
    if (!book.error) {
        let fulltitle = book.title
        if (book.subtitle) fulltitle = fulltitle + ' ' + book.subtitle
        let grub = fulltitle.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
        if (grub.length > 15) {
            grub = grub.substr(0, 35)
            grub = grub.substr(0, grub.lastIndexOf("-"))
        }
        let page =
            '---\n' +
            'title: ' + fulltitle + '\n' +
            'taxonomy:\n' +
            '\tauthor: ' + book.authors.join(', ') + '\n' +
            '\tpubdate: ' + book.publishedDate + '\n' +
            '---\n' + book.description



        if (!fs.existsSync('out/' + grub)) {
            fs.mkdirSync('out/' + grub);
        }
        fs.writeFile('out/' + grub + '/item.md', page, function (err) {
            console.log("writing " + grub)
        })

    }
})
/*
fs.createReadStream('database_short.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(book => {
            //console.log(book)

            axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + book.ISBN
              )
                .then(function (response) {
                  console.log(response)
              })

            let grub = book.Title.replace(/[^A-Z0-9]+/ig, "_");
            if (grub.length > 15) {
                grub = grub.substr(0,35)
                grub = grub.substr(0, grub.lastIndexOf("_")).toLowerCase()
            }
            if (!fs.existsSync('out/' + grub)){
                fs.mkdirSync('out/' + grub);
            }


        })

  });*/