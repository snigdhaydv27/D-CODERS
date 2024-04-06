function openGoogleForm() {
    window.open('https://forms.gle/Pv2u5iBe4TdoCQtH9', '_self');
}
function Contact() {
    window.open('https://forms.gle/2kArxfPGhvNoEBKF7', '_self');
}

async function fetchPets() {
    const type = document.getElementById('type').value;
    let url = '';
    let apiKey = '';
    if (type === 'Dog') {
        url = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=8';
        apiKey = 'live_A5SIEPIXNmuautO0UvMTCzQlusFS2tfwE3PpIlidfFgffIUwuDDAXhfiGxYhLj9W';
    } else if (type === 'Cat') {
        url = 'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=8';
        apiKey = 'live_k2aoKRpjDHNOolUhGLUab88lPWvjawhi5BDJuktdOmcNvRxA4JXcDJtQ2mGRpaK1';
    }

    if (url) {
        try {
            const response = await fetch(url, {
                headers: {
                    'x-api-key': apiKey
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch pets: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            renderPets(data);
        } catch (error) {
            console.error('Error fetching pets:', error);
            alert('Failed to fetch pets. Please Check Your Internet Connection.');
        }
    } else {
        document.getElementById('petList').innerHTML = '';
    }
}

function renderPets(pets) {
    const petList = document.getElementById('petList');
    petList.innerHTML = '';
    pets.forEach((pet) => {
        const card = document.createElement('div');
        card.classList.add('col-md-3', 'mb-4');
        card.innerHTML = `
        <div class="card">
            <img src="${pet.url}" class="cardImg" alt="Pet">
            <div class="card-body">
                <p class="card-text">Breed: ${pet.breeds.length > 0 && pet.breeds[0]
                ? pet.breeds[0].name
                : 'Unknown'
            }</p>
                <p class="card-text">Location: ${pet.location || 'Unknown'
            }</p>
                <button class="btn btn-primary" onclick="Contact()">Contact for Adoption</button>
            </div>
        </div>
    `;
        petList.appendChild(card);
    });
}




document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('type').addEventListener('change', fetchPets);
    fetchPets();
});