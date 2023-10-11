import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items.js';

let currentInstance = null;

function createGalleryItems() {
    return galleryItems
        .map(item => `
            <li class="gallery__item">
                <a class="gallery__link" href="${item.original}">
                    <img
                        class="gallery__image"
                        src="${item.preview}"
                        data-source="${item.original}"
                        alt="${item.description}"
                    />
                </a>
            </li>
        `)
        .join('');
}

const galleryContainer = document.querySelector('.gallery');
galleryContainer.innerHTML = createGalleryItems();

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

galleryContainer.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (event.target.nodeName === 'IMG') {
        const imageUrl = event.target.getAttribute('data-source');
        openModal(imageUrl);
    }
});

function openModal(imageUrl) {
    currentInstance = lightbox;
    currentInstance.load(imageUrl);
    
    document.addEventListener('keydown', onEscapePress);
}

function onEscapePress(event) {
    if (event.key === 'Escape' && currentInstance) {
        currentInstance.close();
        document.removeEventListener('keydown', onEscapePress);
    }
}

console.log(galleryItems);
