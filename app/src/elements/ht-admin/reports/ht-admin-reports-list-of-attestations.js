/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../../styles/dialog-style.js';

import moment from 'moment/src/moment';
import _ from 'lodash/lodash';
import * as models from 'icc-api/dist/icc-api/model/models'

import XLSX from 'xlsx'
import 'xlsx/dist/shim.min'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminReportsListOfAttestations extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles dialog-style">
            :host {
                display: block;
            }

            :host *:focus{
                outline:0!important;
            }

            .list-of-attestations{
                height: calc(100% - 84px);
                width: 100%;
                padding: 0 20px 24px 20px;
                box-sizing: border-box;
                position: relative;
            }

           .form, .form-boxes{
                display:flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            }

            .form vaadin-date-picker{
                flex-grow: 1;
            }

            .form vaadin-date-picker:first-child{
                margin-right: 8px;
            }

            .form vaadin-combo-box{
                flex-grow: 2;
                padding: 0 0px 0 0;
                box-sizing: border-box;
            }

            .form-boxes{
                justify-content: flex-start;
                overflow-x: auto;
                overflow-y: auto;
                padding: 16px;
                border-radius: 3px;
                background: var(--app-background-color-dark);
                margin-left: 24px;
            }

            .form-boxes paper-checkbox{
                margin-right: 24px;
            }

            vaadin-grid{
                margin-bottom: 24px;
                border-radius: 3px;
                min-height: 0 !important;
            }

            paper-checkbox{
                --paper-checkbox-unchecked-color: var(--app-text-color);
				--paper-checkbox-label-color: var(--app-text-color);
				--paper-checkbox-checked-color: var(--app-secondary-color);
				--paper-checkbox-checked-ink-color: var(--app-secondary-color-dark);
            }

            .full-height {
                height: 100%;
            }
            .half-width {
                width: 50%;
            }
            .full-width {
                width: 100%;
            }

            .flex.resp {
                min-height: 144px;
            }

            .flex {
                display: flex;
            }

            .align-items-center{
                align-items: center;
            }

            .grow-1 {
                flex-grow: 1;
            }
            .col {
                flex-direction: column;
            }
            .space-between {
                justify-content: space-between;
            }

            .export-btn {
                margin-right: 0;
            }

            .spinnerbox {
                position: absolute;
                width: 100%;
                height: calc(100% - 86px);
                display: flex;
                justify-content: space-around;
            }
            ht-spinner {
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                width: 42px;
                height: 42px;
            }

            @media screen and (max-width: 1304px) {
                .form-boxes{
                    flex-direction: column;
                }
            }

            @media screen and (max-width: 1024px) {
                .list-of-attestations{
                    width: 100vw;
                }

                .flex.resp {
                    display: block;
                }

                .date-combo-form {
                    width: 100%;
                    margin-bottom: 12px;
                    display: flex;
                }

                .form vaadin-combo-box{
                    padding-top: 8px;
                    padding-right: 0;
                }

                .form-boxes {
                    margin-left: 0;
                    height: 144px;
                }

                .spinnerbox {
                    top: 184px;
                }

                @media screen and (max-height: 920px) {
                    .flex.resp {
                        min-height: 256px;
                    }
                    .form-boxes {
                        height: 80px;
                    }
                }
            }


        </style>

        <div class="list-of-attestations flex col">
            <h4>[[localize('rap_att_list', 'Rapports - List of attestations', language)]]</h4>
            <div class="flex">
                <div class="form flex col">
                    <div class="flex full-width">
                        <vaadin-date-picker id="date-picker" label="[[localize('from2', 'Du', language)]]" value="{{dateFrom}}" i18n="[[i18n]]" on-value-changed="_checkIsDeadline"></vaadin-date-picker>
                        <vaadin-date-picker id="date-picker" label="[[localize('to2', 'Au', language)]]" value="{{dateTo}}" i18n="[[i18n]]" on-value-changed="_checkIsDeadline"></vaadin-date-picker>
                    </div>
                    <vaadin-combo-box class="full-width" filtered-items="[[hcpListItem]]" id="hcp-list" item-label-path="name" item-value-path="id" on-filter-changed="_hcpFilterChanged" on-value-changed="filterInvoiceList" selected-item="{{selectedHcpItem}}" label="Prestataire" readonly="[[readonly]]"></vaadin-combo-box>
                    <vaadin-combo-box class="full-width" filtered-items="[[patientListItem]]" id="pat-list" item-label-path="name" item-value-path="id" on-filter-changed="_patientFilterChanged" on-value-changed="filterInvoiceList" selected-item="{{selectedPatientItem}}" label="Patient" readonly="[[readonly]]"></vaadin-combo-box>
                </div>

                <div class="form-boxes flex grow-1 space-between">
                    <div class="flex col space-between full-height">
                        <paper-checkbox checked="{{invoiceIsSent}}">[[localize('sent','Envoyé',language)]]</paper-checkbox>

                        <paper-checkbox checked="{{invoiceType_mutualfund}}">[[localize('inv_mut','Mutual',language)]]</paper-checkbox>
                        <paper-checkbox checked="{{invoiceType_patient}}">[[localize('inv_pat','Patient',language)]]</paper-checkbox>
                        <paper-checkbox checked="{{invoiceType_others}}">[[localize('oth_orgs','Other organisms',language)]]</paper-checkbox>
                    </div>
                    <div class="flex col space-between full-height">
                        <paper-checkbox checked="{{sentMediumType_eattest}}">e-Attest</paper-checkbox>
                        <paper-checkbox checked="{{sentMediumType_efact}}">e-Fact</paper-checkbox>
                        <paper-checkbox checked="{{sentMediumType_mediprima}}">Mediprima</paper-checkbox>
                        <paper-checkbox checked="{{sentMediumType_paper}}">[[localize('paper','Papier',language)]]</paper-checkbox>
                    </div>
                    <div class="flex col space-between full-height">
                        <paper-checkbox checked="{{paymentType_cash}}">[[localize('cash','Cash',language)]]</paper-checkbox>
                        <paper-checkbox checked="{{paymentType_debitcard}}">[[localize('card_flow','Card flow',language)]]</paper-checkbox>
                        <paper-checkbox checked="{{paymentType_creditcard}}">[[localize('card_credit','Credit card',language)]]</paper-checkbox>
                        <paper-checkbox checked="{{paymentType_wired}}">[[localize('transfer','Transfert',language)]]</paper-checkbox>
                    </div>
                </div>
            </div>

            <vaadin-grid id="invoiceGrid" class="material grow-1" items="[[filteredInvoiceItems]]" active-item="{{selectedInvoice}}">
                <vaadin-grid-column flex-grow="0" width="48px">
                    <template class="header">
                        <vaadin-checkbox checked\$="[[allSelected]]" on-tap="_toggleSelectAll"></vaadin-checkbox>
                    </template>
                    <template>
                            <vaadin-checkbox data-item\$="[[item]]" on-checked-changed="_itemSelected" class="list-checkbox"></vaadin-checkbox>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        <vaadin-grid-sorter path="authorToSort">
                        [[localize('persphysicianRole','Persphysician',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.author]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        <vaadin-grid-sorter path="responsibleToSort">
                            [[localize('responsible','Responsable',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.responsible]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">

                        <vaadin-grid-sorter path="dateToSort" direction="desc">
                            [[localize('dat','Date',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.date]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">

                        <vaadin-grid-sorter path="sentDateToSort" direction="desc">
                            [[localize('sent_date','Date d\\'envoi',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.sentDate]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column flex-grow="1" width="200px">
                    <template class="header">
                        <vaadin-grid-sorter path="patientToSort">
                        [[localize('inv_pat','Patient',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.patient]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        <vaadin-grid-sorter path="invoiceReference">
                        [[localize('cert_num','Certificate n°',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.invoiceReference]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column flex-grow="1" width="200px">
                    <template class="header">
                        <vaadin-grid-sorter path="paymentReference">
                            [[localize('paymentReference','Ref payment',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.paymentReference]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column flex-grow="0" width="48px">
                    <template class="header">
                        <vaadin-grid-sorter path="oa">
                        O.A.
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.oa]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column flex-grow="1" width="200px">
                    <template class="header">
                        <vaadin-grid-sorter path="insurance">
                        [[localize('inv_mut','Mutual',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.insurance]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        <vaadin-grid-sorter path="sentMediumType">
                        [[localize('inv_smt','Sent medium type',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.sentMediumType]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        <vaadin-grid-sorter path="invoiceType">
                        [[localize('fac_type','Billing type',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.invoiceType]]</div>
                    </template>
                </vaadin-grid-column>
                <!--
                <vaadin-grid-column>
                    <template class="header">
                        Convention liée
                    </template>
                    <template>
                        <div>[[item.linkedConvention]]</div>
                    </template>
                </vaadin-grid-column>
                -->
                <vaadin-grid-column>
                    <template class="header">
                        <vaadin-grid-sorter path="paymentType">
                        [[localize('fac_mode','Billing mode',language)]]
                        </vaadin-grid-sorter>
                    </template>
                    <template>
                        <div>[[item.paymentType]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('cash','Cash',language)]]
                    </template>
                    <template>
                        <div>[[item.cash]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('card_flow','Flow card',language)]]
                    </template>
                    <template>
                        <div>[[item.debitCard]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('card_credit','Credit card',language)]]
                    </template>
                    <template>
                        <div>[[item.creditCard]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('transfer','Transfert',language)]]
                    </template>
                    <template>
                        <div>[[item.wired]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('inv_oa','Remboursement par l\\'OA',language)]]
                    </template>
                    <template>
                        <div>[[item.reimbursementAmount]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('convention','Convention',language)]]
                    </template>
                    <template>
                        <div>[[item.conventionAmount]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('inv_sup','Supplément',language)]]
                    </template>
                    <template>
                        <div>[[item.doctorSupplement]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('tot_pat','Ticket modérateur',language)]]
                    </template>
                    <template>
                        <div>[[item.ticketAmount]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('total_patient','Total patient',language)]]
                    </template>
                    <template>
                        <div>[[item.totalPatientAmount]]</div>
                    </template>
                </vaadin-grid-column>
                <vaadin-grid-column>
                    <template class="header">
                        [[localize('inv_tot','Total amount',language)]]
                    </template>
                    <template>
                        <div>[[item.totalAmount]]</div>
                    </template>
                </vaadin-grid-column>
            </vaadin-grid>

            <div class="flex space-between align-items-center">
                <paper-checkbox checked="{{isExportAnonyme}}">[[localize('anon_export','Anonymous export',language)]]</paper-checkbox>
                <div>[[localize("nr_of_rows","Nombre de lignes", language)]] : [[filteredInvoiceItems.length]]/[[invoiceItems.length]]</div>
                <paper-button on-tap="exportToCsv" class="button button--save export-btn">[[localize('export','Export',language)]]</paper-button>
            </div>

            <template is="dom-if" if="[[_isLoadingList]]">
                <div class="spinnerbox">
                    <ht-spinner active=""></ht-spinner>
                </div>
            </template>

        </div>
`;
  }

  static get is() {
      return 'ht-admin-reports-list-of-attestations'
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
          invoiceItems: {
              type: Array,
              value: function () {
                  return [];
              }
          },

          checkedInvoices: {
              type: Array,
              value: function () {
                  return [];
              }
          },

          isExportAnonyme: {
              type: Boolean,
              value: false
          },

          dateFrom: {
              type: String,
              value: ""
          },

          dateTo: {
              type: String,
              value: ""
          },

          paymentTypes: {
              type: Array,
              value: () => [
                  {
                      id: "wired",
                      label: {"fr": "Virement", "nl": "Overschrijving", "en": "Wired"}
                  },
                  {
                      id: "cash",
                      label: {"fr": "En espèces", "nl": "Cash", "en": "Cash"}
                  },
                  {
                      id: "debitcard",
                      label: {"fr": "Carte de débit", "nl": "Debit kaart", "en": "Debit card"}
                  },
                  {
                      id: "creditcard",
                      label: {"fr": "Carte de crédit", "nl": "Credit kaart", "en": "Credit card"}
                  }
              ]
          },
          invoiceTypes: {
              type: Array,
              value: () => [
                  {
                      id: "mutualfund",
                      label: {"fr": "Mutuelle", "nl": "Mutual", "en": "Mutual"}
                  },
                  {
                      id: "patient",
                      label: {"fr": "Patient", "nl": "Patient", "en": "Patient"}
                  },
                  {
                      id: "payingagency",
                      label: {"fr": "Autre organisme", "nl": "Anders", "en": "Paying agency"}
                  },
                  {
                      id: "other",
                      label: {"fr": "Autre", "nl": "Anders", "en": "Other"}
                  }
              ]
          },

          sentMediumTypes: {
              type: Array,
              value: () => [
                  {
                      id: "paper",
                      label: {"fr": "Papier", "nl": "Papier", "en": "Paper"}
                  },
                  {
                      id: "efact",
                      label: {"fr": "e-Fact", "nl": "e-Fact", "en": "e-Fact"}
                  },
                  {
                      id: "eattest",
                      label: {"fr": "e-Attest", "nl": "e-Attest", "en": "e-Attest"}
                  },
                  {
                      id: "mediprima",
                      label: {"fr": "Mediprima", "nl": "Mediprima", "en": "Mediprima"}
                  }
              ]
          },


          _isLoadingList: {
              type: Boolean,
              value: false
          },

          invoiceIsSent: {
              type: Boolean,
              value: true
          },

          invoiceType_patient: {
              type: Boolean,
              value: false
          },
          invoiceType_mutualfund: {
              type: Boolean,
              value: false
          },
          invoiceType_others: {
              type: Boolean,
              value: false
          },

          sentMediumType_eattest: {
              type: Boolean,
              value: false
          },
          sentMediumType_efact: {
              type: Boolean,
              value: false
          },
          sentMediumType_mediprima: {
              type: Boolean,
              value: false
          },
          sentMediumType_paper: {
              type: Boolean,
              value: false
          },

          paymentType_cash: {
              type: Boolean,
              value: false
          },
          paymentType_debitcard: {
              type: Boolean,
              value: false
          },
          paymentType_creditcard: {
              type: Boolean,
              value: false
          },
          paymentType_wired: {
              type: Boolean,
              value: false
          },

          userCache: {
              type: Object,
              noReset: true,
              value: function () {
                  return {};
              }
          },
          hcpCache: {
              type: Object,
              noReset: true,
              value: function () {
                  return {};
              }
          },
          messagesByInvoiceId: {
              type: Object,
              noReset: true,
              value: function () {
                  return {};
              }
          }
      }
  }

  static get observers() {
      return [
          'filterInvoiceList(selectedHcpItem, selectedPatientItem)',
          'filterInvoiceList(invoiceIsSent)',
          'filterInvoiceList(invoiceType_mutualfund, invoiceType_patient, invoiceType_others)',
          'filterInvoiceList(sentMediumType_eattest, sentMediumType_efact, sentMediumType_mediprima, sentMediumType_paper)',
          'filterInvoiceList(paymentType_cash, paymentType_debitcard, paymentType_creditcard, paymentType_wired)',
          'refreshInvoiceList(dateFrom, dateTo)',
          'filterInvoiceList(invoiceItems)',
      ];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
      this.set("dateFrom", moment().startOf('month').format("YYYY-MM-DD"))
      this.set("dateTo", moment().endOf('month').format("YYYY-MM-DD"))
  }

  _hcpFilterChanged(e){
      let latestSearchValue = e && e.detail.value;
      this.latestSearchValue = latestSearchValue;
      if (!latestSearchValue || latestSearchValue.length < 2) {
          //console.log("Cancelling empty search");
          this.set('hcpListItem', []);
          return;
      }
      this._hcpDataProvider() && this._hcpDataProvider().filter(latestSearchValue).then(res => {
          if (latestSearchValue !== this.latestSearchValue) {
              //console.log("Cancelling obsolete search");
              return;
          }
          this.set('hcpListItem', res.rows);
      });
  }

  _hcpDataProvider() {
      return {
          filter: function (filterValue) {
              const desc = 'asc';
              let count = 50;
              return Promise.all([this.api.hcparty().findByName(filterValue, null,  null, count, desc)]).then(results => {
                  const hcpList = results[0];
                  const filtered = _.flatten(
                      hcpList.rows
                          .filter(hcp => hcp.lastName && hcp.lastName !== "" || hcp.firstName && hcp.firstName !== "")
                          .map(hcp => ({id: hcp.id , name : hcp.lastName + ' ' +hcp.firstName}) )
                  );
                  const filteredHcp = filtered.filter(hcp => !!this.hcpCache[hcp.id]);
                  if(filteredHcp.length > 0) {
                      console.log("filteredHcp", filteredHcp, filtered)
                      return { totalSize: filtered.length, rows: filteredHcp };
                  } else {
                      console.log("filtered", filteredHcp, filtered)
                      return { totalSize: filtered.length, rows: filtered };
                  }
              });

          }.bind(this)
      };
  }

  _patientFilterChanged(e){
      let latestSearchValue = e && e.detail.value;
      this.latestSearchValue = latestSearchValue;
      if (!latestSearchValue || latestSearchValue.length < 2) {
          //console.log("Cancelling empty search");
          this.set('patientListItem', []);
          return;
      }
      this._patientDataProvider() && this._patientDataProvider().filter(latestSearchValue).then(res => {
          if (latestSearchValue !== this.latestSearchValue) {
              //console.log("Cancelling obsolete search");
              return;
          }
          this.set('patientListItem', res.rows);
      });
  }

  _patientDataProvider() {
      return {
          filter: function (filterValue) {
              const desc = 'asc';
              let count = 15;
              return Promise.all([this.api.patient().findByNameBirthSsinAutoWithUser(this.user, this.user.healthcarePartyId, filterValue, null, null, 100, "asc")]).then(results => {
                  const patList = results[0];
                  const filtered = _.flatten(patList.rows.filter(pat => pat.lastName && pat.lastName !== "" || pat.firstName && pat.firstName !== "").map(pat => ({id: pat.id , name : pat.lastName + ' ' +pat.firstName}) ));
                  return { totalSize: filtered.length, rows: filtered };
              });

          }.bind(this)
      };
  }

  getCachedHcpByUserId(userId) {
      return Promise.resolve().then(() => {
          if(this.userCache[userId] != null) {
              return this.userCache[userId]
          } else {
              return this.api.user().getUser(userId).then(user => {
                  return this.api.hcparty().getHealthcareParty(user.healthcarePartyId).then(hcp => {
                      this.userCache[userId] = hcp
                      this.hcpCache[hcp.id] = hcp
                      return hcp
                  })
              })
          }
      })
  }

  getCachedHcpByHcpId(hcpId) {
      return Promise.resolve().then(() => {
          if(this.hcpCache[hcpId] != null) {
              return this.hcpCache[hcpId]
          } else {
              return this.api.hcparty().getHealthcareParty(hcpId).then(hcp => {
                  this.hcpCache[hcpId] = hcp
                  return hcp
              })
          }
      })
  }

  getRawInvoiceList_old() {
      return this.api.user().getCurrentUser().then(user  => {
          return this.api.hcparty().getCurrentHealthcareParty().then(currentHcp => {
              const dateFrom = this.dateFrom !== "" ? parseInt(this.dateFrom.replace("-", "").replace("-", ""), 10) : null
              let dateTo = this.dateTo !== "" ? parseInt(this.dateTo.replace("-", "").replace("-", ""), 10) : null
              if(dateTo && dateFrom && dateTo < dateFrom) {
                  dateTo = dateFrom // prevent error in API
              }
              //console.log("from to", dateFrom, dateTo)

              return this.api.getRowsUsingPagination(
                  (key,docId) =>
                      this.api.invoice().findByAuthor(currentHcp.parentId || currentHcp.id, dateFrom, dateTo, key, docId, 2000)
                          .then(pl => { return {
                              rows:  pl.rows,
                              nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                              nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                              done: !pl.nextKeyPair,
                          }})
              ) .catch(e=>{ console.log(e); return Promise.resolve([]); })
          })
      })
  }

  getRawInvoiceList() {
      return this.api.user().getCurrentUser().then(user  => {
          return this.api.hcparty().getCurrentHealthcareParty().then(currentHcp => {
              const dateFrom = this.dateFrom !== "" ? parseInt(this.dateFrom.replace("-", "").replace("-", ""), 10) : null
              let dateTo = this.dateTo !== "" ? parseInt(this.dateTo.replace("-", "").replace("-", ""), 10) : null
              if(dateTo && dateFrom && dateTo < dateFrom) {
                  dateTo = dateFrom // prevent error in API
              }
              //console.log("from to", dateFrom, dateTo)
              this.messagesByInvoiceId = {}

              return this.api.getRowsUsingPagination( (key,docId) =>
                  this.api.invoice().findByAuthor(currentHcp.parentId || currentHcp.id, dateFrom, dateTo, key, docId, 2000)
                      .then(pl => {
                          return this.api.message().listMessagesByInvoiceIds(new models.ListOfIdsDto({ids: pl.rows.map(inv => inv.id)})).then(messages => {
                              messages.map(msg => {
                                  msg.invoiceIds.map(invid => {
                                      this.messagesByInvoiceId[invid]= msg
                                  })
                              })
                              //console.log("messages", messages)
                          }).then(() => {
                              return {
                                  rows:  pl.rows.map(inv=> {
                                      if(
                                          this.messagesByInvoiceId[inv.id]
                                          && this.messagesByInvoiceId[inv.id].metas
                                          && this.messagesByInvoiceId[inv.id].metas.paymentReferenceAccount1
                                      ) {
                                          inv.paymentReference = this.messagesByInvoiceId[inv.id].metas.paymentReferenceAccount1
                                          if(inv.invoicingCodes && inv.invoicingCodes.some(c => c.canceled === true)) {
                                              inv.paymentReference = "Canceled"
                                          }
                                          if(inv.invoicingCodes && inv.invoicingCodes.some(c => c.resent === true)) {
                                              inv.paymentReference = "Resent"
                                          }
                                          console.log("ref: ", inv.id, inv.paymentReference)
                                      }
                                      return inv
                                  }),
                                  nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                                  nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                                  done: !pl.nextKeyPair,
                              }
                          })
                      })
              )
                  .catch(e=>{ console.log(e); return Promise.resolve([]); })
          })
      })
  }

  refreshInvoiceList() {
      this.set('_isLoadingList', true)
      return this.getRawInvoiceList().then(invoices => {
          return Promise.all(invoices.map(inv => this.api.crypto().extractCryptedFKs(inv, this.user.healthcarePartyId).then(ids => [inv, ids.extractedKeys[0]])))
              .then(invAndIdsPat =>
                  this.api.patient().getPatientsWithUser(this.user, new models.ListOfIdsDto({ids: _.uniq(invAndIdsPat.map(x => x[1]))}))
                      .then(pats => invAndIdsPat.map(it => [it[0], pats.find(p => p.id === it[1])]))
                      .catch(err => {
                          console.log("error when getting patients", err);
                          return invAndIdsPat.map(it => [it[0], null])
                      })
              ).then(invAndPats => {
                  console.log("invAndPats", invAndPats)
                  return invAndPats.filter(iap => iap[1] !== undefined && iap[1] !== null)
              }).then(invAndPats =>
                  this.api.insurance().getInsurances(new models.ListOfIdsDto({ids: _.uniq(_.flatten(invAndPats).filter(i => i.insurabilities).map(i => i && i.insurabilities && i.insurabilities[0] && i.insurabilities[0].insuranceId))})).then(ins => invAndPats.map(it => [it[0], it[1], ins.find(i => it && (it[0] && it[0].insurabilities && it[0].insurabilities[0] && i.id === it[1].insurabilities[0].insuranceId) || (it[1] && it[1].insurabilities && it[1].insurabilities.find(patIns => (it[0] && it[0].invoiceDate && patIns.startDate && patIns.endDate && it[0].invoiceDate >= patIns.startDate && it[0].invoiceDate <= patIns.endDate && patIns.insuranceId === i.id) || (!(it[0] && it[0].invoiceDate && patIns.startDate && patIns.endDate) && patIns.insuranceId === i.id))))]))
              )
              .then(invAndPats => {
                  // cache author
                  return Promise.all(_.uniq(invAndPats.map(iap => iap[0].author)).map(userId => this.getCachedHcpByUserId(userId))).then(() => invAndPats)
              })
              .then(invAndPats => {
                  // cache responsible
                  return Promise.all(_.uniq(invAndPats.map(iap => iap[0].responsible)).map(hcpId => this.getCachedHcpByHcpId(hcpId))).then(() => invAndPats)
              })
              .then(invAndPats => {
                  return Promise.all(invAndPats.map(([invoice, pat, ins]) => {

                      //console.log("invoice:", invoice)
                      let invdate = ""
                      let sentdate = ""
                      let dateToSort = 0
                      let sentDateToSort = 0
                      if(invoice.invoiceDate !== null && invoice.invoiceDate !== undefined && invoice.invoiceDate !== "" ) {
                          invdate = this.api.moment(invoice.invoiceDate).format("DD-MM-YYYY")
                          dateToSort = parseInt(this.api.moment(invoice.invoiceDate).format("YYYYMMDD"))
                      }
                      if(invoice.sentDate !== null && invoice.sentDate !== undefined && invoice.sentDate !== "" ) {
                          sentdate = this.api.moment(invoice.sentDate).format("DD-MM-YYYY")
                          sentDateToSort = parseInt(this.api.moment(invoice.sentDate).format("YYYYMMDD"))
                      }
                      const item = {
                          //author: after,
                          date: invdate,
                          sentDate: sentdate,
                          dateToSort: dateToSort,
                          sentDateToSort: sentDateToSort,
                          //patient: after
                          invoiceReference: invoice.invoiceReference,
                          paymentReference: invoice.paymentReference,
                          //oa: after
                          //insurance: after
                          invoiceType: this.getInvoiceTypeLabel(invoice.invoiceType),
                          sentMediumType: this.getSentMediumTypeLabel(invoice.sentMediumType),
                          //linkedConvention: for future use
                          paymentType: this.getPaymentTypeLabel(invoice.paymentType),
                          cash: 0,
                          debitCard: 0,
                          creditCard: 0,
                          wired: 0,
                          totalAmount: 0,

                          invoice: invoice
                      }

                      const computeSum = function (paytype) {
                          if(invoice.paymentType == paytype) {
                              return item.totalPatientAmount
                          } else {
                              return 0
                          }
                      }
                      const computeCodeSum = function(propName) {
                          return invoice.invoicingCodes.reduce((acc, code) => {
                              return acc + code[propName]
                          }, 0) || 0
                      }
                      item.totalAmount = computeCodeSum('totalAmount')
                      item.reimbursementAmount = computeCodeSum('reimbursement')
                      item.conventionAmount = computeCodeSum('conventionAmount')
                      item.doctorSupplement = computeCodeSum('doctorSupplement')
                      item.ticketAmount = computeCodeSum('patientIntervention')
                      if(invoice.sentMediumType == "eattest" || invoice.invoiceType == "eattest") {
                          item.totalPatientAmount = item.totalAmount
                      } else {
                          item.totalPatientAmount = item.ticketAmount + item.doctorSupplement
                      }

                      item.cash = computeSum('cash')
                      item.debitCard = computeSum('debitcard')
                      item.creditCard = computeSum('creditcard')
                      item.wired = computeSum('wired')

                      item.insurance = ins ? ins.code + ' ' + (ins.name["fr"] || ins.name["nl"]) : null
                      item.oa = item.insurance ? item.insurance[0] + '00' : null
                      item.patient = pat ? (pat.firstName + ' ' + pat.lastName) : null
                      item.patientId = pat ? pat.id : null
                      item.patientToSort = item.patient.toLowerCase()

                      return this.getCachedHcpByUserId(invoice.author).then(hcp => {
                          item.author = hcp.lastName + ' ' + hcp.firstName
                          item.authorToSort = item.author.toLowerCase()
                          item.authorHcpId = hcp.id
                      }).then(() => {
                          return this.getCachedHcpByHcpId(invoice.responsible).then(hcp => {
                              item.responsible = hcp.lastName + ' ' + hcp.firstName
                              item.responsibleToSort = item.responsible.toLowerCase()
                              item.responsibleHcpId = hcp.id
                              return item
                          })
                      })
                  }))
              }).then(invlist => {
                  this.set('invoiceItems', invlist)
                  this.set('_isLoadingList', false)
              })
      })
  }

  filterInvoiceList() {
      const invoiceTypeFilter = []


      if(this.invoiceType_mutualfund === true) {
          invoiceTypeFilter.push("mutualfund")
      }
      if(this.invoiceType_patient === true) {
          invoiceTypeFilter.push("patient")
      }
      if(this.invoiceType_others === true) {
          invoiceTypeFilter.push("payingagency")
          invoiceTypeFilter.push("other")
          invoiceTypeFilter.push("")
      }

      const sentMediumTypeFilter = []
      const icure_invoiceTypeFilter = [] // NOTE: icure use invoiceType instead of sentMediumType which is unused
      if(this.sentMediumType_eattest === true) {
          sentMediumTypeFilter.push("eattest")
          icure_invoiceTypeFilter.push("eattest")
      }
      if(this.sentMediumType_efact === true) {
          sentMediumTypeFilter.push("efact")
          icure_invoiceTypeFilter.push("efact")
      }
      if(this.sentMediumType_mediprima === true) {
          sentMediumTypeFilter.push("mediprima")
          icure_invoiceTypeFilter.push("mediprima")
      }
      if(this.sentMediumType_paper === true) {
          sentMediumTypeFilter.push("paper")
          icure_invoiceTypeFilter.push("paper")
      }

      const paymentTypeFilter = []
      if(this.paymentType_cash === true) {
          paymentTypeFilter.push("cash")
      }
      if(this.paymentType_debitcard === true) {
          paymentTypeFilter.push("debitcard")
      }
      if(this.paymentType_creditcard === true) {
          paymentTypeFilter.push("creditcard")
      }
      if(this.paymentType_wired === true) {
          paymentTypeFilter.push("wired")
      }

      this.set('filteredInvoiceItems', this.invoiceItems.filter(inv => {
          let res = true

          if(this.invoiceIsSent === true) {
              res = res && (inv.sentDate != "" && inv.sentDate != null && inv.sentDate != 0)
          }

          if(invoiceTypeFilter.length === 0) {
              //res = true
              // no checkbox checked, show all
          } else {
              res = res && invoiceTypeFilter.includes(inv.invoice.invoiceType)
          }

          if(sentMediumTypeFilter.length === 0) {
              //res = true
              // no checkbox checked, show all
          } else {
              res = res && (sentMediumTypeFilter.includes(inv.invoice.sentMediumType) || icure_invoiceTypeFilter.includes(inv.invoice.invoiceType))
          }

          if(paymentTypeFilter.length === 0) {
              //res = true
              // no checkbox checked, show all
          } else {
              res = res && paymentTypeFilter.includes(inv.invoice.paymentType)
          }


          if(this.selectedHcpItem != null) {
              res = res && inv.authorHcpId === this.selectedHcpItem.id
          }

          if(this.selectedPatientItem != null) {
              res = res && inv.patientId === this.selectedPatientItem.id
          }

          return res
      }))
  }

  exportToCsv() {
      let items = null
      if(this.checkedInvoices.length > 0) {
          items = this.checkedInvoices
      } else {
          items = this.filteredInvoiceItems
      }
      this.generateXlsFile(items.map(inv => {
          const xlinv = JSON.parse(JSON.stringify(inv));
          if(this.isExportAnonyme) {
              delete xlinv.patient
          }
          xlinv.date = xlinv.date.replace("-", "/").replace("-", "/")
          xlinv.invoiceId = xlinv.invoice.id
          delete xlinv.patientId
          delete xlinv.invoice
          delete xlinv.authorHcpId
          delete xlinv.responsibleHcpId
          delete xlinv.responsibleToSort
          delete xlinv.patientToSort
          delete xlinv.authorToSort
          delete xlinv.dateToSort
          delete xlinv.sentDateToSort
          return xlinv
      }))
  }

  generateXlsFile(data) {

      // Create xls work book and assign properties
      const xlsWorkBook = {SheetNames: [], Sheets: {}}
      xlsWorkBook.Props = {Title: "Attest list", Author: "Topaz"}

      // Create sheet based on json data collection
      var xlsWorkSheet = XLSX.utils.json_to_sheet(data)

      // Link sheet to workbook
      XLSX.utils.book_append_sheet(xlsWorkBook, xlsWorkSheet, 'Attest list')

      // Virtual data output
      var xlsWorkBookOutput = new Buffer(XLSX.write(xlsWorkBook, {bookType: 'xls', type: 'buffer'}))

      // Put output to virtual "file"
      var fileBlob = new Blob([xlsWorkBookOutput], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})

      // Create download link and append to page's body
      var downloadLink = document.createElement("a")
      document.body.appendChild(downloadLink)
      downloadLink.style = "display: none"

      // Create url
      var urlObject = window.URL.createObjectURL(fileBlob)

      // Link to url
      downloadLink.href = urlObject
      downloadLink.download = "attest-list_" + moment().format("YYYYMMDD-HHmmss") + ".xls"

      // Trigger download and drop object
      downloadLink.click()
      window.URL.revokeObjectURL(urlObject)

      // Free mem
      fileBlob = false
      xlsWorkBookOutput = false

      return
  }

  getSentMediumTypeLabel(aType){
      if(!aType) return;
      const type = this.sentMediumTypes.find(type => type.id === aType)
      return type && type.label && type.label[this.language.toLowerCase()]
  }

  getInvoiceTypeLabel(aType){
      if(!aType) return "";
      const type = this.invoiceTypes.find(type => type.id === aType)
      return type && type.label && type.label[this.language.toLowerCase()] || this.getSentMediumTypeLabel(aType)
  }

  getPaymentTypeLabel(aType){
      if(!aType) return "";
      const type = this.paymentTypes.find(type => type.id === aType)
      return type && type.label && type.label[this.language.toLowerCase()]
  }

  _itemSelected(e) {
      if ((e.path || e.composedPath())[0].checked) {
          const checked = JSON.parse(e.target.dataset.item)
          if (this.checkedInvoices.length !== this.invoiceItems.length) this.push('checkedInvoices', checked)
      } else {
          this.splice('checkedInvoices', this.checkedInvoices.indexOf(e.target.dataset.item))
          this.set('allSelected',false)
      }
      console.log(this.checkedInvoices.length+' checked',this.checkedInvoices)
  }


  _toggleSelectAll() {
      this.set('allSelected',this.allSelected != null ? !this.allSelected : true)
      this.set('checkedInvoices',this.allSelected ? this.filteredInvoiceItems : [])
      let invList = this.shadowRoot.querySelector('#invoiceGrid');
      let allCheckboxes = invList? invList.querySelectorAll('.list-checkbox') : []
      const selectedState = this.allSelected
      allCheckboxes.forEach(box=>{
          box.checked = selectedState;
      })
  }
}

customElements.define(HtAdminReportsListOfAttestations.is, HtAdminReportsListOfAttestations)
