const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const database = require('./formatted_data/database_books.json')
const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2000 })

let promises = []
let output = {
    books: []
}

function searchISBN() {
    database.forEach(function (book, i) {
        let ISBN = book.ISBN.toString().split(' ')[0]
        let title = book.Title.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "+").toLowerCase()
        let url = 'https://www.googleapis.com/books/v1/volumes?q=ibsn:' + ISBN
        promises.push(http.get(url)
            .then(function (response) {
                if (response.data.totalItems > 0) {
                    console.log('got')
                    output.books.push(response.data.items[0].volumeInfo)
                }
                else {
                    console.log('not found, retrying')
                    output.books.push({
                        error: title
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
    }
    )
};

function searchTitle() {
    database.forEach(function (book, i) {
        if (book.error) {
            let title = book.error
            let url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title
            promises.push(http.get(url)
                .then(function (response) {
                    if (response.data.totalItems > 0) {
                        console.log('got')
                        output.books.push(response.data.items[0].volumeInfo)
                    }
                    else {
                        console.log('not found')
                        output.books.push({
                            error: title
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
        }
    }
    )
};

searchISBN();
Promise.all(promises)
    .then(result => {
        searchTitle();
        Promise.all(promises)
            .then(result => {
                fs.writeFile('results.json', JSON.stringify(output), 'utf8', results => {
                    console.log('done')
                })
            })
    })
