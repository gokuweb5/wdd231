const url = 'https://byu-cse.github.io/cse-ww-program/data/latter-day-prophets.json';


// container DIV
const cards = document.querySelector('#cards');

// async function to get the data from the API
async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
    
// try temporary in console that data is in the table
        console.table(data.prophets); 
        
        
// we send the prophets array to the function 
        displayProphets(data.prophets);
    } catch (error) {
        console.error("Error al traer los datos:", error);
    }
}

// Arrow function
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Crear elementos HTML dinámicamente
        let card = document.createElement('section');
        let fullName = document.createElement('h2'); // Blanc space 1: 'h2'
        let portrait = document.createElement('img');

        
// build the complete name using template strings

        fullName.textContent = `${prophet.name} ${prophet.lastname}`; //Blanc space 2 and 3


// set the attributes to the image
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // Blanc space 4 and 5
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // add child elements (h2 e img) to the section (card)
        card.appendChild(fullName); // blanc space: fullName
        card.appendChild(portrait);

        // inject the card
        cards.appendChild(card);
    });
};

// initial call to run the process
getProphetData();