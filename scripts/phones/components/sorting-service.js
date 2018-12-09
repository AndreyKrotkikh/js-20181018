import Component from '../../shared/component.js';

export default class SortingMenu extends Component {
    constructor({ element }) {
        super({ element });

        this._element = element;

        this._render();

    }

    _render() {
        this._element.innerHTML = `
        <p>
           Sort by:
           <select>
             <option value="name">Alphabetical</option>
             <option value="age">Newest</option>
           </select>
        </p>
    `;
    }
}