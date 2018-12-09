import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click','[data-element="button-back"]', (event) => {
      let backButton = event.delegateTarget;
      this._trigger('back')
    })

    this.on('click','[data-element="button-basket"]', (event) => {
        let basketButton = event.delegateTarget;
        this._trigger('add',this._phone.id);
    });

    this.on('click','[data-element="thumbs"]', event => {
        let thumbsClick = event.delegateTarget;
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
