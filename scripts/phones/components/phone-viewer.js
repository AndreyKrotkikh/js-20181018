import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', event => {
      let backButton = event.target.closest('[data-element="button-back"]')
      if (!backButton) return;

      let customEvent = new CustomEvent('back');
      this._element.dispatchEvent(customEvent);
    })

    this.on('click', event => {
        let basketButton = event.target.closest('[data-element="button-basket"]')
        if (!basketButton) return;
        console.log(this._phone.id);
        /*this._trigger('add', this._phone.dataset.phoneId);*/
        this._trigger('add',this._phone.id);
    })

    this.on('click', event => {
        let thumbsClick = event.target.closest('[data-element="thumbs"]')
        if (!thumbsClick) return;
        // console.log(thumbsClick.getAttribute('src'));
        /*this._trigger('add', this._phone.dataset.phoneId);*/
        // this._trigger('add',this._phone.id);
        this._imgSrc = thumbsClick.getAttribute('src');
        this._render();
    })
  }

  showPhone(phone) {
    this._phone = phone;
    this._imgSrc = null;
    this._render();

    super.show();
  }

  _render() {
    const { _phone: phone } = this;
    if (!this._imgSrc) {
      this._imgSrc = phone.images[0];
    }

    this._element.innerHTML = `
      <img class="phone" src="${this._imgSrc}">

    <button data-element="button-back">Back</button>
    <button data-element="button-basket">Add to basket</button>


    <h1>${phone.name}</h1>

    <p>${phone.description}</p>

    <ul class="phone-thumbs">
        ${phone.images.map(imageSrc => `
          <li>
            <img data-element="thumbs" src="${imageSrc}">
          </li>
         `).join('')}
    </ul>
    `;
  }
}
