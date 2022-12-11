const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photos = []
let imagesLoaded = 0
let ready = false

//Unsplash API
const count = 10
const apiKey = 'BqB7i9r4J5_DTSZK-PvIdZ-224DzX1SAun9jJ_VJgHE'

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

function imageLoaded() {
    ++imagesLoaded
    if (imagesLoaded === photos.length) {
        ready = true
        loader.hidden = true
        imagesLoaded = 0
    }
}

function displayPhotos() {
    photos.forEach((photo) => {
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank')

        const image = document.createElement('img')
        image.setAttribute('src', photo.urls.regular)
        image.setAttribute('alt', photo.alt_description)
        image.setAttribute('title', photo.alt_description)

        imageLoaded()

        item.appendChild(image)
        imageContainer.appendChild(item)
    })
}

//Get photos from Unsplash
async function getPhotos() {
    try {
        console.log("Got new photos");
        ready = false
        const response = await fetch(apiUrl)
        photos = await response.json()
        displayPhotos();
    } catch (err) {
        console.log(err)
    }
}

//Check to see if scrolling to the bottom of page
window.addEventListener('scroll', async () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 500 && ready) { //-100 for px before end of content
        await getPhotos()
    }
})

getPhotos()