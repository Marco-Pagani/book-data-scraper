const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios');
const rateLimit = require('axios-rate-limit');


const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2000 })

const results = require('./titles.json')
let output = {
    books: []
}
let promises = []

results.forEach(book => {
            let title = book.title.replace(/[^a-zA-Z ]/g, "").replace(/\s/g , "+").toLowerCase()
            let url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title //+ '&key=' //Get your own!
            console.log(url)
            promises.push(http.get(url)
                .then(function (response) {
                    if (response.data.totalItems > 0) {

                        console.log('got ' )
                        output.books.push(response.data.items[0].volumeInfo)
                    }
                    else {
                        console.log('not found ' )
                        output.books.push({
                            error: ISBN
                        })
                    }
                }).catch(
                    function (error) {
                        console.log('failed ')
                        output.books.push({ error: 'api request failed' })
                        return Promise.resolve()
                    }
                )
            )
        })

        Promise.all(promises).then(result => {
            fs.writeFile('more_books.json', JSON.stringify(output), 'utf8', results => {
                console.log('done')
            });
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