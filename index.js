const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2000 })

const results = [];
/*
axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' +'9781785002274')
    .then(function (response) {
        console.log(response.data.items[0].volumeInfo.categories)
    })*/
let output = {
    books: []
}
let promises = []

fs.createReadStream('database_short.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data.ISBN))
    .on('end', () => {
        results.forEach(book => {
            let ISBN = book.split(' ')[0]
            let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + ISBN + '&key=' //Get your own!
            console.log(url)
            promises.push(http.get(url)
                .then(function (response) {
                    if (response.data.totalItems > 0) {

                        console.log('got ' + ISBN)
                        output.books.push(response.data.items[0].volumeInfo)
                    }
                    else {
                        console.log('not found ' + ISBN)
                        output.books.push({
                            error: ISBN
                        })
                    }
                }).catch(
                    function (error) {
                        console.log('failed ' + ISBN)
                        output.books.push({ error: 'api request failed' })
                        return Promise.resolve()
                    }
                )
            )
        })

        Promise.all(promises).then(result => {
            fs.writeFile('books.json', JSON.stringify(output), 'utf8', results => {
                console.log('done')
            });
        })

    });





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