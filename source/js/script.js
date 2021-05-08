class Card {
  constructor(id, title, address, type, price, parentSelector) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.type = type;
    this.price = +price;
    this.parent = document.querySelector(parentSelector);

  }

  render() {
    const element = document.createElement('article');
    element.classList.add('card');
    let label = '';

    if (this.type === 'IndependentLiving') {
      element.classList.add('card--independent');
      label = 'Independent living';

    } else if (this.type === 'SupportAvailable') {
      element.classList.add('card--support');
      label = 'Support available';
    }

    let priceWithComa = (this.price).toLocaleString('en');

    element.innerHTML = `
      <a href="/details/[${this.id}]">
        <div class="card__img-wrapper">
          <img src="https://via.placeholder.com/377x227/FF0000/FFFFFF?text=title" alt="House ${this.title} photo" width="377" height="227">
          <span>${label}</span>
        </div>
        <div class="card__info-wrapper">
          <h2>${this.title}</h2>
          <p>${this.address}</p>
          <p>New Properties for Sale from <b>£${priceWithComa}</b></p>
          <small>Shared Ownership Available</small>
        </div>
      </a>
    `;

    this.parent.append(element);
  }
}


const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch data, status: ${res.status}`);
  }

  return await res.json();
};

getResource('https://603e38c548171b0017b2ecf7.mockapi.io/homes')
  .then(data => {
    data.forEach(({ id, title, address, type, price }) => {
      new Card(id, title, address, type, price, '.houses__cards-wrapper').render();
    });
  });


const filterInput = document.querySelector('#search');
filterInput.addEventListener('input', () => {
  const filterElements = document.querySelectorAll('.card');
  if (filterInput.value.length >= 3) {
    const filter = filterInput.value.toLowerCase();
    filterElements.forEach(card => {
      if (!card.querySelector('h2').textContent.toLowerCase().includes(filter)) {
        card.classList.add('js-hide');
      } else {
        card.classList.remove('js-hide');
      }
    });
  }

  if (filterInput.value === '') {
    filterElements.forEach(el => el.classList.remove('js-hide'));
  }
});
