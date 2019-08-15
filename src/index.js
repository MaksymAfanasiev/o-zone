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
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const seatchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', filterPrice);

    function filterPrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);

            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentElement.remove();
                }
            } else if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentElement.remove();
            } else {
                goods.appendChild(card.parentElement);
            }
        });
    }

    min.addEventListener('change',filterPrice);
    max.addEventListener('change',filterPrice);
    
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

toggleCheckbox();
toggleCart();
addCart();
actionPage();