async function fetchPets() {
    const value = document.querySelector("select").value;
    let breedName = document.querySelector('.search input').value;
    let info = document.querySelector('.information');
    let url = '';
    let apiKey = '';
    if (value === 'Dog') {
        url = 'https://api.api-ninjas.com/v1/dogs?name=' + breedName;
        apiKey = '9gcSTCovXQPtAcQYIA8+hA==bwI5151LQ1mNiJMB';
    } else if (value === 'Cat') {
        url = 'https://api.api-ninjas.com/v1/cats?name=' + breedName;
        apiKey = '9gcSTCovXQPtAcQYIA8+hA==bwI5151LQ1mNiJMB';
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json'
        });
        const result = await response.json();
        info.innerHTML = '';
        result.forEach(pet => {
            const card = document.createElement('div');
            card.classList.add('card');
            const image = document.createElement('img');
            image.src = pet.image_link;
            image.alt = pet.breed_name;
            const name = document.createElement('h2');
            name.textContent = pet.breed_name;
            const description = document.createElement('p');
            description.textContent =  `Description: ${pet.description || 'Not available'}`;
            const origin = document.createElement('p');
            origin.textContent = `Origin: ${pet.origin || 'Not available'}`;
            const trainability = document.createElement('p');
            trainability.textContent = `Trainability: ${pet.trainability || 'Not available'}`;
            const lifespan = document.createElement('p');
            lifespan.textContent = `Lifespan: ${pet.lifespan || 'Not available'}`;
            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(origin);
            card.appendChild(trainability);
            card.appendChild(lifespan);
            info.appendChild(card);
        });
    } catch (error) {
        info.innerHTML = 'Error: ' + error.message;
    }
}
function VolunteerOpportunities() {
    window.open('https://forms.gle/Pv2u5iBe4TdoCQtH9', '_self');
}
document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    var darkModeLabel = document.getElementById('darkModeLabel');
    darkModeLabel.textContent = this.checked ? 'Enable Light Mode' : 'Enable Dark Mode';
});

document.querySelector('.search input').addEventListener('change', fetchPets);