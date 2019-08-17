import filterPrice from './filterPrice'; 

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const categories = new Set();

    cards.forEach(card => {
        categories.add(card.dataset.category);
    });

    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category;
        catalogList.appendChild(li);
    });

    const allLi = catalogList.querySelectorAll('li');

    catalogBtn.addEventListener('click', (e) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (e.target.tagName === 'LI') {
            allLi.forEach((item) => {
                if (item === e.target) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            filterPrice();
        }
    });
}