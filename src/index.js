'use strict';

//чекбокс

function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach((item) => {
        item.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}

//end чекбокс


//корзина

function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');

    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}

//end корзина


//работа с корзиной

function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const countGoods = document.querySelector('.counter');
    const cartEmpty = document.getElementById('cart-empty');

    cards.forEach((card) => {
        const btn = card.querySelector('button');

        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        const cardTotal = document.querySelector('.cart-total span');
        let sum = 0;
        countGoods.textContent = cardsCart.length;

        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });

        cardTotal.textContent = sum;

        if (cardsCart.length === 0) {
            cartWrapper.appendChild(cartEmpty);
        } else {
            cartEmpty.remove();
        }

    }
}


//end работа с корзиной


//фильтр акция

function actionPage() {
    const goods = document.querySelector('.goods');
    const cards = goods.querySelectorAll('.card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const seatchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', filterPrice);
    min.addEventListener('change',filterPrice);
    max.addEventListener('change',filterPrice);

    function filterPrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentElement.remove();
            } else if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentElement.remove();
                }
            } else {
                goods.appendChild(card.parentElement);
            }
        });
    }
    
    seatchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');

            if (!searchText.test(title.textContent)) {
                card.parentElement.remove();
            } else {
                goods.appendChild(card.parentElement);
            }
        });

        search.value = '';
    });
}

//end фильтр акция


//получение данных с сервера

function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не были получены, ошибка ' + response.status);
            }
        })
        .then(data => data)
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px;">Упс что-то пошло не так</div>'
        });
}

function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach(good => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
            <div class="card" data-category="${good.category}">
                ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" ${good.sale ? 'style="color:red"' : ''}>${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
        `; 
        goodsWrapper.appendChild(card);
    });
}

//end получение данных с сервера

function renderCatalog() {
    const goods = document.querySelector('.goods');
    const cards = goods.querySelectorAll('.card');
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

    catalogBtn.addEventListener('click', (e) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (e.target.tagName === 'LI') {
            cards.forEach((card) => {
                if (card.dataset.category === e.target.textContent) {
                    goods.appendChild(card.parentElement);
                } else {
                    card.parentElement.remove();
                }
            });
        }
    });
}

getData().then(data => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});