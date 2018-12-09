'use strict';

import PhoneCatalog from './phone-catalog.js';
import PhoneViewer from './phone-viewer.js';
import ShoppingCart from './shopping-cart.js';
import PhoneService from '../services/phone-service.js';
import SortingMenu from './sorting-service.js';
import SearchingMenu from './searching-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();
    this._initCart();
    this._initCatalog();
    this._initViewer();
    this._initSortingMenu();
    this._initSearchingMenu();

    PhoneService.getPhones((phones) => {
      this._catalog.showPhones(phones);
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]')
    });

    this._catalog.on('phoneSelected', (event) => {
      PhoneService.getPhone(event.detail.phoneId, (phone) => {
        this._catalog.hide();
        this._viewer.showPhone(phone);
      });
    });

    this._catalog.on('add', (event) => {
      let phoneId = event.detail;
      this._cart.addItemToBasket(phoneId);
    })

  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]')
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalog.show();
    });

    this._viewer.on('add', (event) => {
        let phoneId = event.detail;
        this._cart.addItemToBasket(phoneId);
    })


  }

  _initCart() {
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]')
    })
  }

  _initSortingMenu() {
      this._sort = new SortingMenu({
          element: this._element.querySelector('[data-component="sorting"]')
      })

      this._sort.on('changeSort', (event) => {
          this._catalog.sortCatalog(event.detail.valueInfo);
      });
  }

  _initSearchingMenu() {
     this._search = new SearchingMenu({
         element: this._element.querySelector('[data-component="searching"]')
     })
      
     this._search.on('changeSearch', (event) => {
         this._catalog.searchCatalog(event.detail.searchInfo);
     });
  }

    _render() {
    this._element.innerHTML = `
       <div class="row">
        <!--Sidebar-->
        <div class="col-md-2">
            <section>
                <div data-component="searching"></div>

                <div data-component="sorting"></div>
            </section>

            <section>
                <div data-component="shopping-cart"></div>
            </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
           <div data-component="phone-catalog" class="js-hidden"></div>
           <div data-component="phone-viewer" class="js-hidden"></div>
        </div>
    </div>
    `;
  }
}
