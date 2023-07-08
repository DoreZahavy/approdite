
export const googleBookService = {
    query,
}

function query(txt) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var searchRes = []
            for (var i = 0; i < 6; i++) {
                const bookData = data.items[i].volumeInfo
                searchRes.push({
                    id: '',
                    title: bookData.title,
                    subtitle: bookData.subtitle,
                    authors: bookData.authors,
                    publishedDate: bookData.publishedDate.slice(0, 4),
                    description: bookData.description,
                    pageCount: bookData.pageCount,
                    categories: bookData.categories,
                    thumbnail: (bookData.imageLinks)? bookData.imageLinks.thumbnail : '../assets/img/default-book.png',
                    language: bookData.language,
                    reviews: [],
                    listPrice: {
                        amount: 100,
                        currencyCode: 'ILS',
                        isOnSale: true
                    }
                })
            }
            return searchRes
        })
}
