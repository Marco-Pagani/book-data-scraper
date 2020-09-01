let book = {
    "title": "10 Great Makerspace Projects Using Social Studies",
    "authors": [
        "Kerry Hinton"
    ],
    "isbn": "1499438508",
    "published": "2017-07-15",
    "publisher": "The Rosen Publishing Group Inc",
    "pagecount": 64,
    "description": "This book beings with explaining what social studies is and how it connects to the Maker Revolution.  It includes 10 projects that use making to teach about humans and history.  All of the projects include detailed instructions, estimated time commitment, materials and skill level.  Some projects include making Egyptian papyrus, laser cutting a jigsaw puzzle, photo editing yourself into history.",
    "subjects": [
        "General Crafts/ Making",
        "Makerspaces (General)",
        "Juvenile Nonfiction / History / Other",
        "Juvenile Nonfiction / Technology / How Things Work-Are Made"
    ],
    "audience": [
        "K-12",
        "Libraries",
        "General"
    ],
    "expertise": [
        "Beginner"
    ],
    "lessons": true,
    "images": {
        "smallThumbnail": "http://books.google.com/books/content?id=y8xhDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71VEaE8D3JWdppw2bKHNKmT8eIKem8SoctRiU7F5z36zKnHFCwPJtcav9hcJslGkk__0-sjc873Rygsp5iONE8SejeyYsUyBog1lxGDxCyQHddsOVyDAV1-TDNzmreOvJ32Aa_0&source=gbs_api",
        "thumbnail": "http://books.google.com/books/content?id=y8xhDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE731oKvSU0lv6soxizOW6FLehPbg7XMkDEOMaHWkQOP8Yk6f1S3GXFQjHhOwUdRYX-M_2OB2f3kq8J2N5Qg2ECHeUtEbZ33c38UDDnQicHwA5wiRjJvt4DiY5Jt8MRNshCJPJw-V&source=gbs_api",
        "small": "http://books.google.com/books/content?id=y8xhDwAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE72X1pl9h__W35lV7WRAotIfKKRgFcCuuAXQC4Z64gznSdhp1lgGTYRzhUqxi2wDArL7zqOEZewerGBu0S_RT8ryNz_NBdy9HiUXJwmXFf_ysblrEGvhtBEspY8THzpQexT7lfU-&source=gbs_api",
        "medium": "http://books.google.com/books/content?id=y8xhDwAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE717AvA8m1MgBwvjqGJoJ4xym05AYlXPvFqEpYEhU16TgHJMUaU4R0NIf1GynF0COm3ekxQ2w4DyVnna5Wgu16PZ0MOmfMpsemzOCcQ4Z6ESyf0V-kojfKW0DuDQMiSZA9-5XQVV&source=gbs_api",
        "large": "http://books.google.com/books/content?id=y8xhDwAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE71MnuGsBGqqZC73b3QxR3nKvK1pLRd-C870vAtDO8n7_-duSEOcLZiqR2NqshV6u-8-6ul622UyHLVWgXPc1bmYgk1jUxFmxwvu2olEP0v9igcJCJk4O3CRZwgvzJIrFPvAXQaP&source=gbs_api",
        "extraLarge": "http://books.google.com/books/content?id=y8xhDwAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE70RjvXtXpvQFuDHcASaUzk_jkoJyjc1j23xFc3sq-76wFlUtCg8y5Ea4XeWhm26lixdEqwbCkn71HKeSKcH0WYKRqd3EarkSOCGtIiuraYOdSq05oRMSpE2eRTmfHRHMWUVE91D&source=gbs_api"
    },
    "amazon": "https://www.amazon.com/Makerspace-Projects-Social-Studies-Makerspaces/dp/1499438508/ref=sr_1_1?keywords=10+great+makerspace+projects+using+social+studies+Hinton+Kerry&qid=1572276323&sr=8-1",
    "worldcat": "https://www.worldcat.org/title/10-great-makerspace-projects-using-social-studies/oclc/972092904&referer=brief_results",
    "google": "https://play.google.com/store/books/details?id=y8xhDwAAQBAJ",
    "google_id": "y8xhDwAAQBAJ"
}

let fs = require('fs');
let http = require('http');
//Node.js Function to save image from External URL.
Object.keys(book.images).forEach(size => {
    let fullUrl = book.images[size];
    let file = fs.createWriteStream(`test/${size}.jpeg`);
    let request = http.get(fullUrl, function (response) {
        response.pipe(file);
    });
});
function saveImageToDisk(url, localPath) {
    let fullUrl = url;
    let file = fs.createWriteStream(localPath);
    let request = https.get(url, function (response) {
        response.pipe(file);
    });
}