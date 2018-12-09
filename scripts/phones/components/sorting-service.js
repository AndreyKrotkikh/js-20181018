import Component from '../../shared/component.js';

export default class SortingMenu extends Component {
    constructor({ element }) {
        super({ element });

        this._element = element;

        this._render();

        this.on('change','[data-element="sorting-menu"]', (event) => {
            let sortingInfo = event.delegateTarget;
            this._trigger('changeSort',{valueInfo: sortingInfo.value});
        })

    }

    _render() {
        this._element.innerHTML = `
        <p>
           Sort by:
           <select data-element="sorting-menu">
             <option value="name">Alphabetical</option>
             <option value="age">Newest</option>
           </select>
        </p>
    `;
    }
}