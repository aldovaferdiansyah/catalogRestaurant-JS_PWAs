import 'regenerator-runtime';
import '../styles/main.css';
import swRegister from './utils/sw-register';

const hamburgerButtonElement = document.querySelector('#hamburger');
const navElement = document.querySelector('#navList');
const mainElement = document.querySelector('main');

hamburgerButtonElement.addEventListener('click', event => {
    navElement.classList.toggle('open');
    event.stopPropagation();
});

mainElement.addEventListener('click', event => {
    navElement.classList.remove('open');
    event.stopPropagation();
})

async function fetchData() {
    try {
        const respons = await fetch('https://restaurant-api.dicoding.dev/list');
        const data = await respons.json();
        return data.restaurants;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
        return [];
    }
}

const drafRestaurant = document.querySelector('.listRestaurant');

function cardDrafRestaurant(restaurant) {
    const cardDraf = document.createElement('div');
    cardDraf.classList.add('card');
    cardDraf.setAttribute('tabindex', 0);

    const name = document.createElement('h2');
    name.innerText = restaurant.name;

    const img = document.createElement('img');
    img.src = restaurant.pictureId;
    img.alt = restaurant.name;

    const city = document.createElement('p');
    city.innerText = `City : ${restaurant.city}`;

    const rating = document.createElement('p');
    rating.innerText = `Rating : ${restaurant.rating}`;

    const desc = document.createElement('p');
    desc.innerText = restaurant.description;

    const detail = document.createElement('a');
    detail.textContent = 'Detail Restaurant';
    detail.href = `/#/detail/${restaurant.id}`;
    detail.classList.add('detailRestaurant');

    cardDraf.appendChild(name);
    cardDraf.appendChild(img);
    cardDraf.appendChild(city);
    cardDraf.appendChild(rating);
    cardDraf.appendChild(desc);
    cardDraf.appendChild(detail);

    return cardDraf;
}

async function render() {
    const restaurants = await fetchData();
    drafRestaurant.innerHTML = '';
    restaurants.forEach((restaurant) => {
        const update = {
            ...restaurant,
            pictureId: `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`,
        };

        const card = cardDrafRestaurant(update);
        drafRestaurant.appendChild(card);
    });
}

window.addEventListener('load', () => {
    swRegister();
});

window.addEventListener('DOMContentLoaded', render);