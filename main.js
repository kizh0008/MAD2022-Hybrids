let search = document.getElementById("search");

async function fetchAndCacheImage() {
    let url = `https://picsum.photos/v2/list`; 
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        
        if (!data || data.length === 0) {
            displayErrorMessage("No results found. Please try a different search term.");
        } else {
            displayResults(data);
        }

        let cacheName = 'myCache-v1';
        
        
        let firstImage = data[0];
        if (firstImage && firstImage.download_url) {
            let imageResponse = await fetch(firstImage.download_url);
            const cache = await caches.open(cacheName);
            await cache.put(new Request(firstImage.download_url), imageResponse.clone());
            alert('Image saved to cache successfully');
        }
    } catch (error) {
        displayErrorMessage("An error occurred while fetching data. Please try again later.");
        console.error('Error:', error);
    }
}

function displayErrorMessage(message) {
    console.error(message);
}

function displayResults(data) {
    console.log(data);
}


fetchAndCacheImage();



async function getImage(url) {
    let cacheName = 'myCache-v1';

    try {
        const cache = await caches.open(cacheName);
        let cachedResponse = await cache.match(url);

        if (cachedResponse) {
            console.log('Image retrieved from cache');
            return cachedResponse.blob();
        } else {
            console.log('Image not found in cache, fetching and caching');
            return await fetchAndCacheImage(url);
        }
    } catch (error) {
        console.error('Error in getImage:', error);
        throw error;
    }

} 






