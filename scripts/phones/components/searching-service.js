import Component from '../../shared/component.js';

export default class SearchingMenu extends Component {
    constructor({ element }) {
        super({ element });

        this._element = element;

        this._render();

    }

    _render() {
        this._element.innerHTML = `
            <p>        
                Search:
                <input>
            </p>       
    `;
    }
}