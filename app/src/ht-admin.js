/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import './elements/ht-admin/ht-admin-menu.js';

import './elements/ht-admin/ht-admin-management.js';
import './elements/ht-admin/ht-admin-account.js';
import './elements/ht-admin/ht-admin-reports.js';
import './elements/ht-admin/ht-admin-menu.js';
import './styles/shared-styles.js';
import {PolymerElement, html} from '@polymer/polymer';
class HtAdmin extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles">
            :host {
                display: block;
                height: calc(100% - 20px);
                /*padding: 10px;*/
            }

            .container {
                width: 100%;
                height: calc(100% - 20px);
                display:grid;
                grid-template-columns: 20% 80%;
                grid-template-rows: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
            }

            .sub-container {
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: 50% 50%;
                grid-template-rows: 100%;
                background-color: var(--app-background-color);
            }

            ht-admin-detail{
                padding: 16px;
                z-index: 0;
                transform: translateX(100vw);
                opacity: 0;
                transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            }
            ht-admin-detail.selected {
                transform: none;
                opacity: 1;
                z-index: 10; /* else it's impossible to scroll in this box */
                overflow: hidden;
                display: flex;
                flex-direction: column;
                border-left: 1px solid var(--app-background-color-dark);
                background-color: var(--app-background-color-light);
                padding: 0;
            }

            .display-left-menu{
                display:none;
                position:fixed;
                top: 50%;
                left: 0;
                z-index: 120;
                background: var(--app-background-color-dark);
                transform:translateY(-50%) rotate(0);
                border-radius:0 50% 50% 0;
                transition: transform 0.2s ease-in;

            }
            .display-left-menu.open{
                left:50vw;
                border-radius:50% 0 0  50% ;
                transform:translateY(-50%) rotate(180deg);
                transition: transform 0.2s ease-in;
            }

            paper-dialog {
                width:80%;
                height: 80%;
            }

            ht-admin-list.selected {
                width: 152vw;
            }

            @media screen and (max-width:1025px){
                .container{
                    grid-template-columns: 0 100%;

                }
                .container.expanded {
                    grid-template-columns: 20% 80%;
                }
                .sub-container {
                    left: 0%;
                    grid-template-columns: 30% 71%;
                }
                ht-admin-menu{
                    display:none;
                    width: 50vw;
                }
                .container.expanded ht-admin-menu {
                    display: block;
                }
                .display-left-menu{
                    display:inherit;
                }

                #msg-flatrate-invoice,
                #msg-invoice,
                #msg-mycarenet {
                    width: 100vw;
                }

                ht-admin-list {
                    transition: all .5s ease-out;
                }

                ht-admin-list.selected {
                    height: calc(40vh - 24px);
                    width: initial;
                }

                ht-admin-detail {
                    padding: 0 16px;
                    z-index: 2;
                    width: 100vw;
                    height: calc(60vh - 32px);
                    bottom: 0;
                    position: fixed;
                    transform: translateY(100vh);
                    opacity: 0;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                }
                ht-admin-detail.selected {
                    transform: none;
                    opacity: 1;
                }

                ht-admin-account {
                    grid-column: 2 / span 1;
                    grid-row: 1 / span 1;
                }
            }

        </style>
        <div class="container">
            <paper-icon-button class="display-left-menu" icon="chevron-right" on-tap="_expandColumn"></paper-icon-button>
            <ht-admin-menu id="admin-menu" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]" on-selection-change="handleMenuChange"></ht-admin-menu>

            <template is="dom-if" if="[[managementLayout]]">
                <ht-admin-management id="admin-management" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]" selected-sub-menu="[[selectedSubMenu]]"></ht-admin-management>
            </template>

            <template is="dom-if" if="[[accountLayout]]">
                <ht-admin-account id="admin-account" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]" selected-sub-menu="[[selectedSubMenu]]" socket="[[socket]]"></ht-admin-account>
            </template>

            <template is="dom-if" if="[[reportsLayout]]">
                <ht-admin-reports id="admin-reports" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]" selected-sub-menu="[[selectedSubMenu]]" selection="[[selection]]"></ht-admin-reports>
            </template>

        </div>
`;
  }

  static get is() {
      return 'ht-admin'
  }

  static get properties() {
      return {
          api: {
              type: Object,
              noReset: true
          },
          user: {
              type: Object,
              noReset: true
          },
          credentials:{
              type: Object,
              noReset: true
          },
          selection: {
              type: Object,
              value : {}
          },
          managementLayout:{
              type: Boolean,
              value : false
          },
          accountLayout:{
              type: Boolean,
              value : false
          },
          reportsLayout:{
              type: Boolean,
              value: false
          },
          selectedSubMenu:{
              type: String,
              value: null
          },
          socket : {
              type: Object,
              value : {}
          }
      }
  }

  constructor() {
      super()
  }

  reset() {
      const props = HtAdmin.properties
      Object.keys(props).forEach(k => { if (!props[k].noReset) { this.set(k, (typeof props[k].value === 'function' ? props[k].value() : (props[k].value || null))) }})
  }

  ready() {
      super.ready()
  }

  handleMenuChange(e) {
      if (e.detail) {
          this.set('managementLayout', e.detail.selection.item === 'management');
          this.set('accountLayout', e.detail.selection.item === 'account');
          this.set('reportsLayout', e.detail.selection.item === 'reports');
          this.set('selectedSubMenu', e.detail.selection.submenu)
          this.set('selection', e.detail.selection)
      }
      this._closeColumn(e)
  }

  _expandColumn(e) {
      this.root.querySelector('.display-left-menu').classList.toggle('open');
      this.root.querySelector('.container').classList.toggle('expanded');
  }

  _closeColumn(e){
      this.root.querySelector('.display-left-menu').classList.remove('open');
      this.root.querySelector('.container').classList.remove('expanded');
  }
}

customElements.define(HtAdmin.is, HtAdmin)
