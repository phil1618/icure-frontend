/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtHcpMemberList extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="iron-flex iron-flex-alignment"></style>
        <style>
            :host {
                height: 100%;
                padding-top:32px;
            }

            .container {
                width: 100%;
                height: 100%;
            }

            paper-material.card {
                background-color: #fff;
                padding: 10px;
                margin-left: 5px;
                margin-right: 5px;
                margin-bottom: 10px;
            }

            paper-input {
                padding-left: 5px;
                padding-right: 5px;
            }

            paper-dropdown-menu {
                padding-left: 5px;
                padding-right: 5px;
            }

            .member-photo {
                background: rgba(0, 0, 0, 0.1);
                height: 26px;
                width: 26px;
                min-width: 26px;
                border-radius: 50%;
                margin-right: 8px;
                overflow: hidden !important;
                padding-right: 0 !important;
            }

            .member-photo img {
                width: 100%;
                margin: 50%;
                transform: translate(-50%, -50%);
            }

            .container {
                width: 80%;
                height: calc(100vh - 84px);
                position: fixed;
                top: 64px;
                left: 20%;
                bottom: 0;
                right: 0;
            }


            vaadin-grid.material {

                font-family: Roboto, sans-serif;
                --divider-color: rgba(0, 0, 0, var(--dark-divider-opacity));

                --vaadin-grid-cell: {
                    padding: 8px;
                };

                --vaadin-grid-header-cell: {
                    height: 64px;
                    color: rgba(0, 0, 0, var(--dark-secondary-opacity));
                    font-size: 12px;
                };

                --vaadin-grid-body-cell: {
                    height: 48px;
                    color: rgba(0, 0, 0, var(--dark-primary-opacity));
                    font-size: 13px;
                };

                --vaadin-grid-body-row-hover-cell: {
                    background-color: var(--paper-grey-200);
                };

                --vaadin-grid-body-row-selected-cell: {
                    background-color: var(--paper-grey-100);
                };

                --vaadin-grid-focused-cell: {
                    box-shadow: none;
                    font-weight: bold;
                };
            }

            vaadin-grid.material .cell {
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 0;
            }

            vaadin-grid.material .cell.last {
                padding-right: 24px;
            }

            vaadin-grid.material paper-checkbox {
                --primary-color: var(--paper-indigo-500);
                margin: 0 24px;
            }

            vaadin-grid.material vaadin-grid-sorter .cell {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            vaadin-grid.material vaadin-grid-sorter iron-icon {
                transform: scale(0.8);
            }

            vaadin-grid.material vaadin-grid-sorter:not([direction]) iron-icon {
                color: rgba(0, 0, 0, var(--dark-disabled-opacity));
            }

            vaadin-grid.material vaadin-grid-sorter[direction] {
                color: rgba(0, 0, 0, var(--dark-primary-opacity));
            }

            vaadin-grid.material vaadin-grid-sorter[direction=desc] iron-icon {
                transform: scale(0.8) rotate(180deg);
            }

            #members-list{
                height: 100%;
            }

        </style>
        <div class="container">
            <template is="dom-if" if="[[hasHcpMembers]]">
                <vaadin-grid id="members-list" class="grid" items="[[membersList]]">
                    <vaadin-grid-column width="5%">
                        <template class="header">
                            <div class="cell frozen">[[localize('pic','Picture',language)]]</div>
                        </template>
                        <template>
                            <div class="cell frozen member-photo"><img src\$="[[picture(item)]]"></div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="100px">
                        <template class="header">
                            <vaadin-grid-sorter path="lastName">[[localize('las_nam','Last name',language)]]</vaadin-grid-sorter>
                        </template>
                        <template>
                            <div class="cell frozen">[[item.lastName]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="100px">
                        <template class="header">
                            <vaadin-grid-sorter path="firstName">[[localize('fir_nam','First name',language)]]</vaadin-grid-sorter>
                        </template>
                        <template>
                            <div class="cell frozen">[[item.firstName]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="100px">
                        <template class="header">
                            <vaadin-grid-sorter path="speciality">[[localize('spe','Speciality',language)]]
                        </vaadin-grid-sorter></template>
                        <template>
                            <div class="cell frozen">[[item.speciality]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="100px">
                        <template class="header">
                            <div class="cell frozen">[[localize('ema','Email',language)]]</div>
                        </template>
                        <template>
                            <div class="cell frozen">[[_getEmail(item)]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            <div class="cell numeric">[[localize('pho','Phone',language)]]</div>
                        </template>
                        <template>
                            <div class="cell numeric">[[_getPhone(item)]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            <div class="cell numeric">[[localize('mob','Mobile',language)]]</div>
                        </template>
                        <template>
                            <div class="cell numeric">[[_getMobile(item)]]</div>
                        </template>
                    </vaadin-grid-column>
                </vaadin-grid>
            </template>
        </div>
`;
  }

  static get is() {
      return 'ht-hcp-member-list';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          hcp: {
              type: Object,
              notify: true
          },
          membersList:{
              type: Array,
              value: ()=>[],
              notify:true
          },
          hasHcpMembers:{
              type: Boolean,
              value: false
          }
      };
  }

  static get observers() {
      return [];
  }

  constructor() {
      super();
  }

  ready(){
      super.ready()

      if(!this.hcp || !this.hcp.id) {
          this.set('membersList',[])
          return;
      }


      this.api.hcparty().listHealthcareParties( null,null, 1000,"asc").then(hcps =>{
          this.set('membersList',hcps && hcps.rows && _.uniqBy(hcps.rows,"id"))
          this.set("hasHcpMembers", this.membersList.length > 0)
      })
  }

  _formatDate(date){
      return date ? this.api.moment(date).format("DD/MM/YYYY") : ""
  }

  _getEmail(item){
      return _.flatten(item.addresses.map(adr=>_.compact(adr.telecoms.map(tel=>tel.telecomType === "email" ? tel.telecomNumber : ""))))[0] || "";
  }
  _getMobile(item){
      return _.flatten(item.addresses.map(adr=>_.compact(adr.telecoms.map(tel=>tel.telecomType === "mobile" ? tel.telecomNumber : ""))))[0] || "";
  }
  _getPhone(item){
      return _.flatten(item.addresses.map(adr=>_.compact(adr.telecoms.map(tel=>tel.telecomType === "phone" ? tel.telecomNumber : ""))))[0] || "";
  }

  picture(hcp) {
      if (!hcp) {
          return require('../../../images/male-placeholder.png')
      }
      return hcp.picture ? 'data:image/jpeg;base64,' + hcp.picture : hcp.gender === 'female' ? require('../../../images/female-placeholder.png') : require('../../../images/male-placeholder.png')
  }
}

customElements.define(HtHcpMemberList.is, HtHcpMemberList);
