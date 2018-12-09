import Component from '../../shared/component.js';

export default class SearchingMenu extends Component {
    constructor({ element }) {
        super({ element });

        this._element = element;

        this._render();

        this.on('input'/*'change'*/,'[data-element="searching-input"]', (event) => {
            let searchingInfo = event.delegateTarget;
            debounceSearching(this._trigger('changeSearch',{searchInfo: searchingInfo.value}),200);
        })

    }

    _render() {
        this._element.innerHTML = `
            <p>        
                Search:
                <input data-element="searching-input">
            </p>       
    `;
    }

}

function debounceSearching(f, ms) {
    let timerId = null;
    return function(...args) {

        let context = this;
        clearTimeout(timerId);
        timerId = setTimeout(function() {
            f.apply(context, args);
        }, ms);

    }
}