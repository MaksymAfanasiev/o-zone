import filterPrice from './filterPrice'; 

export default function actionPage() {
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
 
    seatchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');

            if (!searchText.test(title.textContent)) {
                card.parentNode.remove();
            } else {
                goods.appendChild(card.parentNode);
            }
        });

        search.value = '';
    });
}