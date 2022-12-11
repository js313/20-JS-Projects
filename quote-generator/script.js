const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const quoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Get quotes from api

let apiQuotes = []

async function getQuotes() {
    loading()   //for when page loaded
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        showNewQuote()
    } catch (err) {
        alert(err)
    }
}

function showNewQuote() {
    loading()   //for when new quote button pressed press
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    authorText.textContent = quote.author ? quote.author : "Anonymous"
    quoteText.textContent = quote.text
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    completeLoading()
}

function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(tweetUrl, '_blank')
}

function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function completeLoading() {
    loader.hidden = true
    quoteContainer.hidden = false
}

quoteBtn.addEventListener('click', showNewQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()