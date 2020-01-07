/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import moment from 'moment/src/moment';
import _ from 'lodash/lodash';

class HtAdminManagementGroups extends Polymer.TkLocalizerMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
        <style include="shared-styles">
            :host {
                display: block;
            }

            :host *:focus{
                outline:0!important;
            }

            .groups-panel{
                height: 100%;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                position:relative;
            }

        </style>

        <div class="groups-panel">
            <h4>[[localize('man_groups', 'Management - Groups of users', language)]]</h4>
        </div>
`;
  }

  static get is() {
      return 'ht-admin-management-groups'
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
          }
      }
  }

  static get observers() {
      return [];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }
}

customElements.define(HtAdminManagementGroups.is, HtAdminManagementGroups)