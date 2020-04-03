import '../../ht-spinner/ht-spinner.js';
import '../../dynamic-form/dynamic-doc.js';
import '../../collapse-button/collapse-button.js';
import '../../../styles/dialog-style.js';
import '../../../styles/scrollbar-style.js';
import '../../../styles/buttons-style.js';
import '../../../styles/notification-style.js';
import '../../../styles/spinner-style.js';
import '../../../styles/shared-styles.js';
import '../../../styles/paper-tabs-style.js';
import '../../../styles/dialog-style.js';



import _ from 'lodash/lodash';
import moment from 'moment/src/moment';
import { Base64 } from 'js-base64';
import jsZip from "jszip/dist/jszip.js";

import XLSX from 'xlsx'
import 'xlsx/dist/shim.min'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";

class HtPatDocumentsDirectoryDialog extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="dialog-style scrollbar-style buttons-style notification-style spinner-style shared-styles paper-tabs-style">

            #document-directory-dialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .content{
                height: 100%;
            }

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
            }

            .btn-dropdown-container {
                text-align: right;
                position: absolute;
                margin-top: 8px;
                top: -40px;
                right: 4px;
                background-color: var(--app-background-color);
                opacity: 1;
                border-radius: 2px;
                z-index: 200;
                height: auto !important;
                box-shadow: var(--app-shadow-elevation-2);
                display: flex;
                flex-flow: column nowrap;
                align-items: stretch;
                border-radius: 3px;
                overflow: hidden;
                padding: 0;
                color: var(--app-text-color);
            }

            .btn-dropdown-container paper-button{
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                text-transform: capitalize;
                height: 28px;
                padding: 0 12px 0 8px;
                font-weight: 400;
                font-size: var(--font-size-normal);
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                flex-grow: 1;
                border-radius: 0;
                margin: 0;
            }

            .btn-dropdown-container paper-icon-button:hover{
                background: var(--app-background-color-dark);
            }

            .btn-dropdown-container paper-button iron-icon{
                color: var(--app-secondary-color);
                height: 20px;
                width: 20px;
                margin-right: 4px;
                box-sizing: border-box;
            }

            .information-block{
                height: auto;
                width: 98%;
                border: 1px solid var(--app-background-color-dark);
                margin: 1%;
            }

            .information-block-title{
                background-color: var(--app-background-color-dark);
                height: 16px;
                font-size: var(--font-size-small);
                padding: 4px;
            }

            .ko{
                color: var(--app-status-color-nok)
            }

            .ok{
                color: var(--app-status-color-ok)
            }

            .tab-page-title{
                height: 20px;
                padding: 4px;
                width: 98%;
            }

            .close-view-btn{
                right: 0;
                position: absolute;
                margin: 2px;
            }

            .horizontal {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                flex-basis: 100%;
                align-items: center;
            }

            .contact-year-container{
                width: 98%;
                margin: 1%;
                height: auto;
                border: 1px solid var(--app-background-color-dark);
            }

            .contact-year-title{
                height: 20px;
                padding: 5px;
                width: auto;
                background: var(--app-background-color-dark);
            }

            .ctc-nbr{
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: var(--app-secondary-color);
                color: white;
                text-align: center;
                float: left;
                margin-left: 15px;
            }

            .year{
                float: left;
            }

            .contact-year-ctc-container{
                height: auto;
            }

            .contact-year-ctc-container-ctc{
                height: 20px;
                width: 98%;
                padding: 4px;
            }

            .menu-item {
                @apply --padding-menu-item;
                height: 24px;
                min-height: 24px;
                font-size: var(--font-size-normal);
                text-transform: inherit;
                justify-content: space-between;
                cursor: pointer;
                @apply --transition;
            }

            .sublist .menu-item {
                font-size: var(--font-size-normal);
                min-height:20px;
                height:20px;
            }

            .menu-item:hover{
                background: var(--app-dark-color-faded);
                @apply --transition;
            }

            .menu-item .iron-selected{
                background:var(--app-primary-color);

            }

            .one-line-menu {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
                padding-left:0;
            }

            .list-title {
                flex-basis: calc(100% - 72px);
                font-weight: bold;
            }

            .menu-item-icon{
                height: 20px;
                width: 20px;
                padding: 0px;
            }

            collapse-button[opened] .menu-item-icon{
                transform: scaleY(-1);
            }

            .sublist{
                background:var(--app-light-color);
                margin:0 0 0 -30px;
                padding:0;
            }

            .sublist-document{
                background:var(--app-light-color);
                margin:0 0 0 0px;
                padding:0;
            }

            .table-line-menu {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                width: 100%;
            }

            .table-line-menu-top{
                padding-left: var(--padding-menu-item_-_padding-left);
                padding-right: var(--padding-menu-item_-_padding-right);
                box-sizing: border-box;
            }

            .table-line-menu div:not(:last-child){
                border-right: 1px solid var(--app-background-color-dark);
                height: 20px;
                line-height: 20px;
            }

            .items-number {
                font-size: var(--font-size-small);
                padding: 2px;
                border-radius: 50%;
                height: 14px;
                width: 14px;
                background: var(--app-background-color-light);
                color: var(--app-text-color);
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin-right: 4px;
            }

            .items-number span{
                display: block;
            }

            .list-title {
                flex-basis: calc(100% - 72px);
                font-weight: bold;
            }

            .one-line-menu {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
                padding-left:0;
            }

            .menu-item paper-icon-button.menu-item-icon--add, .list-info paper-icon-button.menu-item-icon {
                padding: 0px;
                height: 18px;
                width: 18px;
                border-radius: 3px;
                background: var(--app-secondary-color);
                color: var(--app-text-color-light);
                margin-right: 8px;
            }

            .overlaySpinnerContainer {
                position:absolute;
                width:100%;
                height:100%;
                z-index:10;
                background:rgba(255, 255, 255, .8);
                top:0;
                left:0;
                margin:0;
                padding:0;
            }

            .overlaySpinner {
                max-width:80px;
                margin:100px auto
            }

            .docDetailDialog{
                display: flex;
                height: calc(100% - 85px);
                width: auto;
                margin: 0;
                padding: 0;
            }

            .doc-menu-list{
                height: 100%;
                width: 50%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                overflow: auto;
                position: relative;
            }

            .doc-menu-view{
                height: 100%;
                width: 50%;
                position: relative;
                background: white;
            }

            .doc-preview{
                height: calc(100% - 50px);
                width: auto;
                margin: 1%;
                overflow: auto;
            }

            .doc-preview-description {
                text-align: center;
                margin: 10px 1% 1% 1%;
                height: auto;
                border: 2px dashed #ddd;
                padding: 10px;
                text-transform: uppercase;
            }

            .doc-container{
                height: 100%;
            }

            .doc-container-list{
                height: 100%;
                overflow: auto;
                background-color: white;
            }

            .doc-submenu-container{
                height: 100%;
            }

            #vaadinGrid {
                padding:0;
                margin:0;
                height:calc(100% - 2px);
            }

            #notConnctedToeHealthBox {

                padding:0;

            }

            #notConnctedToeHealthBox .content {
                height:180px;
                padding:0 24px
            }

            #filterResults {
                display: flex;
                align-items: flex-start;
                flex-wrap: nowrap;
                align-content: stretch;
                height:85px;
                max-width:50%;
            }

            @media screen and (max-width:1400px){
                #filterResults {
                    max-width:100%;
                }
            }

            .filterContainer {
                margin:10px;
                flex-grow: 1;
            }

            .filterContainer label {
                font-weight: 700;
                display: inline-block;
                margin-right:10px;
            }

            .filtersDropDown {
                width:100%;
            }

            paper-dropdown-menu{ --paper-dropdown-menu-icon: { height: 24px; width: 24px; }}

            paper-listbox {
                width:220px;
            }

            paper-listbox:focus {
                outline: 0;
            }

            paper-item {
                outline: 0;
                cursor: pointer;
                --paper-item: { margin: 0; };
                font-size:.9em;
                padding:5px;
            }

            paper-item:hover {
                background: rgba(0, 0, 0, 0.1);
                color:var(--dark-primary-color)
            }

        </style>



        <paper-dialog id="document-directory-dialog" always-on-top="true" no-cancel-on-outside-click="true" no-cancel-on-esc-key="true">



            <h2 class="modal-title pl10">[[localize('documentsDirectory','Documents directory',language)]] ([[_data.currentPatient.firstName]] [[_data.currentPatient.lastName]] - [[_data.currentPatient.dateOfBirthHr]] - [[_data.currentPatient.age]])</h2>



            <div class="content">

                <div id="filterResults">
                    <div class="filterContainer"><label>[[localize('document','Document',language)]] [[localize('inComingOutGoing','Incoming / outgoing',language)]]:</label> <paper-dropdown-menu class="filtersDropDown" label="[[localize('choose','Choose',language)]]" no-label-float="" selected-item="{{_filterInComingOutGoingHr}}"><paper-listbox slot="dropdown-content"><paper-item data-filter="">[[localize('any','Tous',language)]]</paper-item><template is="dom-repeat" items="[[_data.searchEngineValues.inComingOutGoingHr]]" as="item"><paper-item data-filter="[[item]]">[[item]]</paper-item></template></paper-listbox></paper-dropdown-menu></div>
                    <div class="filterContainer"><label>[[localize('type','Type',language)]] [[localize('ofDocument','of document',language)]]:</label> <paper-dropdown-menu class="filtersDropDown" label="[[localize('choose','Choose',language)]]" no-label-float="" selected-item="{{_filterTypeHr}}"><paper-listbox slot="dropdown-content"><paper-item data-filter="">[[localize('any','Tous',language)]]</paper-item><template is="dom-repeat" items="[[_data.searchEngineValues.typeHr]]" as="item"><paper-item data-filter="[[item]]">[[item]]</paper-item></template></paper-listbox></paper-dropdown-menu></div>
                    <div class="filterContainer"><label>[[localize('origin','Origin',language)]] [[localize('ofDocument','of document',language)]]:</label> <paper-dropdown-menu class="filtersDropDown" label="[[localize('choose','Choose',language)]]" no-label-float="" selected-item="{{_filterOriginHr}}"><paper-listbox slot="dropdown-content"><paper-item data-filter="">[[localize('any','Tous',language)]]</paper-item><template is="dom-repeat" items="[[_data.searchEngineValues.originHr]]" as="item"><paper-item data-filter="[[item]]">[[item]]</paper-item></template></paper-listbox></paper-dropdown-menu></div>
                    <div class="filterContainer"><label>[[localize('aut','Author',language)]] [[localize('ofDocument','of document',language)]]:</label> <paper-dropdown-menu class="filtersDropDown" label="[[localize('choose','Choose',language)]]" no-label-float="" selected-item="{{_filterAuthorHr}}"><paper-listbox slot="dropdown-content"><paper-item data-filter="">[[localize('any','Tous',language)]]</paper-item><template is="dom-repeat" items="[[_data.searchEngineValues.authorHr]]" as="item"><paper-item data-filter="[[item]]">[[item]]</paper-item></template></paper-listbox></paper-dropdown-menu></div>
                </div>

                <div class="docDetailDialog">

                    <div class="doc-menu-list">
                        <div class="doc-submenu-container">
                            <div class="doc-container">
                                <div class="doc-container-list">

                                    <vaadin-grid id="vaadinGrid" class="material" width="100%" items="[[_data.vaadinGridData]]" active-item="{{_vaadinGridActiveItem}}">

                                        <vaadin-grid-column width="100px" flex-grow="0">
                                            <template class="header"><vaadin-grid-sorter path="date">[[localize('date','Date',language)]]</vaadin-grid-sorter></template>
                                            <template>[[item.dateHr]]</template>
                                        </vaadin-grid-column>

                                        <vaadin-grid-column width="90px" flex-grow="0">
                                            <template class="header"><vaadin-grid-sorter path="inComingOutGoingHr">[[localize('document','Document',language)]]</vaadin-grid-sorter></template>
                                            <template>[[item.inComingOutGoingHr]]</template>
                                        </vaadin-grid-column>

                                        <vaadin-grid-column>
                                            <template class="header"><vaadin-grid-sorter path="typeHr">[[localize('type','Type',language)]]</vaadin-grid-sorter></template>
                                            <template>[[item.typeHr]]</template>
                                        </vaadin-grid-column>

                                        <vaadin-grid-column>
                                            <template class="header"><vaadin-grid-sorter path="originHr">[[localize('origin','Origin',language)]]</vaadin-grid-sorter></template>
                                            <template>[[item.originHr]]</template>
                                        </vaadin-grid-column>

                                        <vaadin-grid-column>
                                            <template class="header"><vaadin-grid-sorter path="authorHr">[[localize('aut','Author',language)]]</vaadin-grid-sorter></template>
                                            <template>[[item.authorHr]] - [[item.authorSpecialitiesHr]]</template>
                                        </vaadin-grid-column>

                                        <!--
                                        <vaadin-grid-column>
                                            <template class="header"><vaadin-grid-sorter path="recipientHr">[[localize('rec','Recipient',language)]]</vaadin-grid-sorter></template>
                                            <template>[[item.recipientHr]]</template>
                                        </vaadin-grid-column>
                                        -->

                                        <vaadin-grid-column>
                                            <template class="header"><vaadin-grid-sorter path="description">[[localize('des','Description',language)]]</vaadin-grid-sorter></template>
                                            <template>[[item.description]]</template>
                                        </vaadin-grid-column>

                                    </vaadin-grid>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-menu-view">
                        <template is="dom-if" if="[[!_hasSelectedDocument]]">
                            <div class="doc-preview-description">
                                <iron-icon icon="image:remove-red-eye" class="mw20 mh20"></iron-icon> [[localize('documentsDirectory_annotation1','Select a document to preview it',language)]]
                            </div>
                        </template>
                        <template is="dom-if" if="[[_hasSelectedDocument]]">
                            <div class="doc-preview">
                                <dynamic-doc id="document-preview-[[_selectedDocument.documentId]]" api="[[api]]" i18n="[[i18n]]" user="[[user]]" document-id="[[_selectedDocument.documentId]]" title="[[_selectedDocument.documentName]]" resources="[[resources]]" language="[[language]]" preview="true" downloadable="true" fullwidth="true" force-no-assignation="true" force-no-document-header="true" forwardable="true" printable="true" is-pat-detail="true" show-extended-title="true" contacts="[[_asArray(_selectedDocument.contact)]]" on-print-document="_printDocument" forward-document-event="forward-document-for-doc-directory" on-forward-document-for-doc-directory="_forwardDocument"></dynamic-doc>
                            </div>
                        </template>
                    </div>

                </div>

            </div>



            <div class="buttons">
                <paper-button class="button button--other" dialog-dismiss=""><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--other" on-tap="_downloadListAndFiles"><iron-icon icon="icons:file-download"></iron-icon> [[localize('downloadListAndFiles','Download list &amp; files',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_downloadList"><iron-icon icon="icons:file-download"></iron-icon> [[localize('downloadList','Download list',language)]]</paper-button>
            </div>



            <template is="dom-if" if="[[_isBusy]]"><div class="overlaySpinnerContainer"><div class="overlaySpinner"><ht-spinner active=""></ht-spinner></div></div></template>



            <paper-dialog id="notConnctedToeHealthBox" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
                <h2 class="modal-title">[[localize('warning','Warning',language)]]</h2>
                <div class="content">
                    <p class="textaligncenter mt30"><b>[[localize('notConnctedToeHealthBox','You are not connected to your eHealthBox yet',language)]]</b></p>
                    <p class="textaligncenter mt20">[[localize('pleaseConnecteHealthBoxFirst','Please connect your eHealthBox first',language)]].</p>
                </div>
                <div class="buttons"><paper-button class="button" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button></div>
            </paper-dialog>



        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-documents-directory-dialog';
  }

  static get properties() {
      return {
          api: {
              type: Object,
              noReset: true,
              value: () => {}
          },
          user: {
              type: Object,
              noReset: true,
              value: () => {}
          },
          i18n: {
              type: Object,
              noReset: true,
              value: () => {}
          },
          resources: {
              type: Object,
              noReset: true,
              value: () => {}
          },
          language: {
              type: String,
              noReset: true,
              value: "fr"
          },
          patient: {
              type: Object,
              noReset: true,
              value: () => {}
          },
          _isBusy: {
              type: Boolean,
              value: false,
              noReset: true
          },
          _isLocked: {
              type: Boolean,
              value: false,
              noReset: true
          },
          _vaadinGridActiveItem: {
              type: Object,
              value: null
          },
          _hasSelectedDocument: {
              type: Boolean,
              value: false
          },
          _selectedDocument: {
              type: Object,
              value: null
          },
          _data: {
              type: Object,
              value: () => {return{
                  currentHcp: {
                      type: Object,
                      value: () => {}
                  },
                  currentPatient: {
                      type: Object,
                      value: () => {}
                  },
                  codes: {
                      type: Object,
                      value: ()=>{}
                  },
                  directoryDocuments: {
                      type: Array,
                      value: ()=>[]
                  },
                  vaadinGridData: {
                      type: Array,
                      value: ()=>[]
                  },
                  searchEngineValues: {
                      type: Object,
                      value: () => {}
                  },
              }}
          },
          _filterInComingOutGoingHr: {
              type: String,
              value: ""
          },
          _filterTypeHr: {
              type: String,
              value: ""
          },
          _filterOriginHr: {
              type: String,
              value: ""
          },
          _filterAuthorHr: {
              type: String,
              value: ""
          },
      };
  }

  static get observers() {
      return [
          '_vaadinGridActiveItemChanged(_vaadinGridActiveItem)',
          '_filterResults(_filterInComingOutGoingHr, _filterTypeHr, _filterOriginHr, _filterAuthorHr)',
      ];
  }

  constructor() {
      super();
  }

  ready() {
      super.ready();
  }

  _asArray(input) {
      return [input];
  }

  _resetComponentProperties() {
      const promResolve = Promise.resolve();
      return promResolve
          .then(() => {
              const componentProperties = HtPatDocumentsDirectoryDialog.properties
              Object.keys(componentProperties).forEach(k => { if (!_.get(componentProperties[k],"noReset", false)) { this.set(k, (typeof componentProperties[k].value === 'function' ? componentProperties[k].value() : (componentProperties[k].value || null))) }})
              return promResolve
          })
  }

  _msTstampToDDMMYYYY(msTstamp) {
      return parseInt(msTstamp) ? this.api.moment(parseInt(msTstamp)).format('DD/MM/YYYY') : ""
  }

  _msTstampToYYYYMMDD(msTstamp) {
      return parseInt(msTstamp) ? this.api.moment(parseInt(msTstamp)).format('YYYYMMDD') : ""
  }

  _YYYYMMDDToDDMMYYYY(inputValue) {
      return parseInt(inputValue) ? this.api.moment(_.trim(parseInt(inputValue)),"YYYYMMDD").format('DD/MM/YYYY') : ""
  }

  _YYYYMMDDHHmmssToDDMMYYYYHHmmss(inputValue) {
      return parseInt(inputValue) ? this.api.moment(_.trim(parseInt(inputValue)),"YYYYMMDDHHmmss").format('DD/MM/YYYY HH:mm:ss') : ""
  }

  _YYYYMMDDHHmmssToDDMMYYYY(inputValue) {
      return parseInt(inputValue) ? this.api.moment(_.trim(parseInt(inputValue)),"YYYYMMDDHHmmss").format('DD/MM/YYYY') : ""
  }

  _upperFirstAll(inputValue){
      return _.trim(_.map(_.trim(inputValue).toLowerCase().split(" "),i=>_.upperFirst(_.trim(i))).join(" "))
  }

  _dobToAge(inputValue) {
      return inputValue ? this.api.getCurrentAgeFromBirthDate(inputValue,( e , s ) => this.localize(e, s, this.language)) : ''
  }

  _getServiceAuthor(svc) {
      return this.api.getAuthor(svc.author);
  }

  _getServiceShortDescription(svc) {
      return this.api.contact().shortServiceDescription(svc, this.language);
  }

  _getInsuranceData(insuranceId) {

      const promResolve = Promise.resolve()

      return !_.trim(insuranceId) ? promResolve : this.api.insurance().getInsurance(insuranceId)
          .then(insuranceData => _.merge({}, {
              code: _.trim(_.get(insuranceData, "code", "")),
              name: this._upperFirstAll(!!_.trim(_.get(insuranceData, "name." + this.language, "")) ? _.trim(_.get(insuranceData, "name." + this.language, "")) : _.trim(_.find(_.get(insuranceData, "name", {}), _.trim)))
          }))
          .catch(()=>promResolve)

  }

  _getPrettifiedPatient(user, patientId, patientObject=null) {

      const promResolve = Promise.resolve()

      return !_.size(patientObject) && (!_.trim(_.get(user, "id")) || !_.trim(patientId)) ? promResolve : (!!_.size(patientObject) ? Promise.resolve(patientObject) : this.api.patient().getPatientWithUser(user, patientId))
          .then(patient => {
              const addressData = _.find(_.get(patient,"addresses",[]), {addressType:"home"}) || _.find(_.get(patient,"addresses",[]), {addressType:"work"}) || _.get(patient,"addresses[0]",[])
              return _.merge({}, patient, _.mapValues({
                  address: [ _.trim(_.get(addressData,"street","")), _.trim(_.get(addressData,"houseNumber","")) + (!!_.trim(_.get(addressData,"postboxNumber","")) ? "/" + _.trim(_.get(addressData,"postboxNumber","")) : "") ].join(", "),
                  postalCode: _.trim(_.get(addressData,"postalCode","")),
                  city: this._upperFirstAll(_.trim(_.get(addressData,"city",""))),
                  country: this._upperFirstAll(_.trim(_.get(addressData,"country",""))),
                  phone: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"phone"}), "telecomNumber", "")),
                  mobile: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"mobile"}), "telecomNumber", "")),
                  email: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"email"}), "telecomNumber", "")),
                  firstName: this._upperFirstAll(_.get(patient,"firstName","")),
                  lastName: this._upperFirstAll(_.get(patient,"lastName","")),
                  ssinHr: this.api.formatSsinNumber(_.trim(_.get(patient, "ssin", ""))),
                  gender: _.trim(_.get(patient, "gender", "male")),
                  genderHr: this._upperFirstAll(this.localize(_.trim(_.get(patient, "gender", "male")) + "GenderLong", "masculin")),
                  civilityHr: ( _.trim(_.get(patient, "gender", "")) === "female" ? this._upperFirstAll(this.localize("abrv_female", "Mrs.", this.language)) : this._upperFirstAll(this.localize("abrv_male", "Mr.", this.language))),
                  dateOfBirthHr: this._YYYYMMDDToDDMMYYYY(_.trim(_.get(patient, "dateOfBirth"))),
                  age: this._dobToAge(_.trim(_.get(patient, "dateOfBirth"))),
                  insuranceData: _
                      .chain(_.get(patient, "insurabilities",{}))
                      .filter((i)=>{
                          return i &&
                              !!moment( _.trim(_.get(i, "startDate", "0") ), "YYYYMMDD" ).isBefore(moment()) &&
                              (!!moment( _.trim(_.get(i, "endDate", "0") ), "YYYYMMDD" ).isAfter(moment()) || !_.trim(_.get(i, "endDate", "") ) ) &&
                              !!_.trim( _.get( i, "insuranceId", "" ) )
                      })
                      .map(i => {return _.mapValues({
                          insuranceId: _.trim(_.get(i,"insuranceId","")),
                          identificationNumber: _.trim(_.get(i,"identificationNumber","")),
                          tc1: _.trim(_.get(i,"parameters.tc1","")),
                          tc2: _.trim(_.get(i,"parameters.tc2","")),
                          tc1tc2: [_.trim(_.get(i,"parameters.tc1","")), _.trim(_.get(i,"parameters.tc2",""))].join(" - "),
                          preferentialstatus: typeof _.get(i,"parameters.preferentialstatus") === "boolean" ? !!_.get(i,"parameters.preferentialstatus",false) : _.trim(_.get(i,"parameters.preferentialstatus")) === "true"
                      }, i => typeof i === "string" ? !!_.trim(i) ? _.trim(i) : '-' : i)})
                      .head()
                      .value(),
              }, i => typeof i === "string" ? !!_.trim(i) ? _.trim(i) : '-' : i))
          })
          .then(patient => this._getInsuranceData(_.trim(_.get(patient,"insuranceData.insuranceId"))).then(insuranceData => _.merge({},patient,{insuranceData:insuranceData})))
          .catch(()=>promResolve)

  }

  _getPrettifiedHcps(hcpIds=null) {

      const promResolve = Promise.resolve()

      return this.api.hcparty().getHealthcareParties((Array.isArray(hcpIds) && !!_.size(hcpIds)) ? hcpIds.join(",") : (typeof hcpIds === "string" && !!_.size(hcpIds)) ? hcpIds : _.get(this,"user.healthcarePartyId",""))
          .then(hcps => _.map(hcps, hcp => {
              const addressData = _.find(_.get(hcp,"addresses",[]), {addressType:"work"}) || _.find(_.get(hcp,"addresses",[]), {addressType:"home"}) || _.get(hcp,"addresses[0]",[])
              return _.merge({}, hcp, _.mapValues({
                  address: [ _.trim(_.get(addressData,"street","")), _.trim(_.get(addressData,"houseNumber","")) + (!!_.trim(_.get(addressData,"postboxNumber","")) ? "/" + _.trim(_.get(addressData,"postboxNumber","")) : "") ].join(", "),
                  postalCode: _.trim(_.get(addressData,"postalCode","")),
                  city: this._upperFirstAll(_.trim(_.get(addressData,"city",""))),
                  country: this._upperFirstAll(_.trim(_.get(addressData,"country",""))),
                  phone: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"phone"}), "telecomNumber", "")),
                  mobile: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"mobile"}), "telecomNumber", "")),
                  email: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"email"}), "telecomNumber", "")),
                  firstName: this._upperFirstAll(_.get(hcp,"firstName","")),
                  lastName: this._upperFirstAll(_.get(hcp,"lastName","")),
                  nihiiHr: this.api.formatInamiNumber(_.trim(_.get(hcp,"nihii",""))),
                  ssinHr: this.api.formatSsinNumber(_.trim(_.get(hcp,"ssin",""))),
              }, i => typeof i === "string" ? !!_.trim(i) ? _.trim(i) : '-' : i))
          }))
          .then(hcps => {
              const specialityIds = _.compact(_.uniq(_.flatten(_.map(hcps, i => _.map(_.get(i, "specialityCodes", []), sc => _.trim(_.get(sc, "id", "")))))))
              return !_.size(specialityIds) ? hcps : this.api.code().getCodes(specialityIds.join(",")).then(specialityCodes => _.map(hcps, hcp => _.merge(hcp, {specialitiesHr: _.compact(_.map(_.get(hcp, "specialityCodes", []), sc => _.trim(_.get(_.find(specialityCodes, {id: _.trim(_.get(sc, "id", ""))}), "label." + this.language, "")))).join(", ")})))
          }).catch(()=>promResolve)

  }

  _getCodesByType(codeType) {

      const promResolve = Promise.resolve()

      return !_.trim(codeType) ?
          promResolve :
          // 35 valid CD-TRANSACTION codes exist in Thesaurus on 20191023 - While 48 do in language.json - get hard coded data from language / more rich
          codeType === "CD-TRANSACTION" ? Promise.resolve(_.fromPairs([[codeType, _.compact(_.map(this.resources[this.language], (v,k) => {
              return !_.startsWith(_.trim(k).toLowerCase(),'cd-transaction-') ? false : {
                  code:_.trim(k).toLowerCase().replace('cd-transaction-',''),
                  disabled:false,
                  id:"CD-TRANSACTION|" + _.trim(k).toLowerCase().replace('cd-transaction-','') + "|1",
                  labelHr:v,
                  type:"CD-TRANSACTION"
              }
          }))]])) :
          this.api.code().findPaginatedCodes("be", codeType)
              .then(({rows}) => _
                  .chain(rows)
                  .filter(i=> !_.get(i,"disabled",false))
                  .map(i => _.merge({},i,{
                      labelHr: codeType === "CD-TRANSACTION" ?
                          _.upperFirst(_.trim(this.localize("cd-transaction-" + _.trim(_.get(i,"code")), _.trim(_.get(i,"code")), this.language)).toLowerCase()) :
                          _.trim(_.get(i,"label." + this.language,"")) ?
                              _.upperFirst(_.trim(_.get(i,"label." + this.language,"")).toLowerCase()) :
                              _.upperFirst(_.trim(_.head(_.flatMap(_.get(i,"label","")))).toLowerCase())
                  }))
                  .orderBy(["labelHr"],["asc"])
                  .value()
              )
              .then(codes => _.fromPairs([[codeType,codes]]))
              .catch(()=>promResolve)

  }

  _vaadinGridActiveItemChanged(_vaadinGridActiveItem) {

      return (!_.size(_vaadinGridActiveItem) || _.trim(_.get(_vaadinGridActiveItem,"documentId","something")) === _.trim(_.get(this,"_selectedDocument.documentId","else")) ) ? null : (this.set('_hasSelectedDocument', true)||true) && (this.set('_selectedDocument', _vaadinGridActiveItem)||true)

  }

  _printDocument(e) {
      if(!!_.get(this,"_isBusy",false)) return;
      this.set("_isBusy", true);
  }

  _donePrintingDocument(e) {
      this.set("_isBusy", false);
  }

  _forwardDocument(e) {

      return !this.api.tokenId ? this.$["notConnctedToeHealthBox"].open() : this.dispatchEvent(new CustomEvent("forward-document", {composed: true, bubbles: true, detail:{documentId:_.trim(_.get(e,"detail.documentId", false))}})) && this.shadowRoot.querySelector('#document-directory-dialog').close()

  }

  _getDocumentsAndMessagesWithMetaPatientId(patientId) {

      // transportGuid of messages
      //
      // WITH encrypted PAT IDS:
      //     "DOC:SCAN:IN",
      //     "DOC:IMPORT:IN"
      //     "HUB:IN:IMPORTED-DOCUMENT",              (*) ==> We already have everything we need here, from contact data ==> do NOT get message
      //     "PRESCRIPTION:ITT:ARCHIVE",              (*) ==> We already have everything we need here, from contact data ==> do NOT get message
      //     "PRESCRIPTION:KINE:ARCHIVE",             (*) ==> We already have everything we need here, from contact data ==> do NOT get message
      //     "PRESCRIPTION:NURSE:ARCHIVE",            (*) ==> We already have everything we need here, from contact data ==> do NOT get message
      //     "LINKING-LETTER:PATIENT:ARCHIVE",        (*) ==> We already have everything we need here, from contact data ==> do NOT get message
      //     "PRESCRIPTION:IMAGING:ARCHIVE",
      //
      // WITHOUT encrypted PAT IDS -> get from contact / services
      //     "INBOX:*"
      //     "OUTGOING-DOCUMENT:PATIENT:ARCHIVE"
      //     "PRESCRIPTION:PHARMACEUTICALS:ARCHIVE",
      //     "DOC:REPORT:ARCHIVE"

      const promResolve = Promise.resolve()

      return Promise.all(_.map([
              "DOC:SCAN:IN",
              "DOC:IMPORT:IN",
              // "HUB:IN:IMPORTED-DOCUMENT",          (*) ==> We already have everything we need here, from contact data ==> do NOT get message
              // "PRESCRIPTION:ITT:ARCHIVE",          (*) ==> We already have everything we need here, from contact data ==> do NOT get message
              // "PRESCRIPTION:KINE:ARCHIVE",         (*) ==> We already have everything we need here, from contact data ==> do NOT get message
              // "PRESCRIPTION:NURSE:ARCHIVE",        (*) ==> We already have everything we need here, from contact data ==> do NOT get message
              // "LINKING-LETTER:PATIENT:ARCHIVE",    (*) ==> We already have everything we need here, from contact data ==> do NOT get message
              // "PRESCRIPTION:IMAGING:ARCHIVE"       (*) ==> We already have everything we need here, from contact data ==> do NOT get message
          ], singleTransportGuid => this.api.message().findMessagesByTransportGuid(_.trim(singleTransportGuid), null, null, null, 10000).then(messages=>messages.rows).catch(()=>Promise.resolve())))
          .then(promisesResults => _
              .chain(promisesResults)
              .flatMap()
              .uniqBy('id')
              .orderBy(['created','received'],['desc','desc'])
              .value()
          )
          .then(foundMessages => Promise.all(_.map(foundMessages, msg => {

              const cryptedInfo = _.trim(_.get(msg,"metas.cryptedInfo",""));
              const dataToDecrypt = ( ["DOC:IMPORT:IN", "DOC:SCAN:IN"].indexOf( _.trim(_.get(msg,"transportGuid",""))) > -1 ) && !!cryptedInfo ? new Uint8Array(this.api.crypto().utils.base64toArrayBuffer(cryptedInfo)) :
                  ( ["HUB:IN:IMPORTED-DOCUMENT"].indexOf( _.trim(_.get(msg,"transportGuid",""))) > -1 ) && !!cryptedInfo ? this.api.crypto().utils.text2ua(Base64.decode(cryptedInfo)) :
                  ( _.trim(_.get(msg,"transportGuid","")).indexOf("INBOX") > -1 ) && !!_.trim(_.get(msg,"metas.annexesInfos","")) ? this.api.crypto().utils.text2ua(Base64.decode(_.trim(_.get(msg,"metas.annexesInfos","")))) :
                  false;
              let documentList = []; try{ documentList = JSON.parse(_.trim(_.get(msg,"metas.documentListJson",{}))); } catch(e) {}

              return !dataToDecrypt ? msg : this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, msg, dataToDecrypt)
                  .then(uaDecryptedContent => JSON.parse(this.api.crypto().utils.ua2text(uaDecryptedContent)))
                  .then(decryptedContent => _.merge(msg,{metas:{
                      decryptedInfo: !!Array.isArray(decryptedContent) ? _.head(decryptedContent) : decryptedContent,
                      documentList: documentList,
                      isScanned:(((msg.status & (1 << 24)) !== 0)||msg.transportGuid === "DOC:SCAN:IN"),
                      isImported:((msg.status & (1 << 25)) !== 0)
                  }}))
                  .catch(()=>msg)
          })))
          .then(messagesWithDecryptedInfos => _.filter(messagesWithDecryptedInfos, msg => _.trim(_.get(msg,"metas.decryptedInfo.patientId","")) === patientId || _.trim(_.get(msg,"metas.patientId","")) === patientId ))
          .then(messages => Promise.all(_.map(messages, msg => this.api.document().findByMessage(_.get(this,"user.healthcarePartyId",""), msg).then(foundDocuments => _.map(foundDocuments, doc => _.merge(doc, {message:msg}))).catch(e=>{console.log("ERROR with findByMessage: ", msg, e); return promResolve;}))).then(documentsAndMessages => _.flatMap(documentsAndMessages)))
          .then(documentsAndMessages => Promise.all(_.map(documentsAndMessages, docAndMsg => {
              const targetDocumentList = _.find(_.get(docAndMsg,"message.metas.documentList",[]), {id:_.trim(_.get(docAndMsg,"id",""))})
              return (!_.size(targetDocumentList) || !_.trim(_.get(targetDocumentList,"comment",""))) ?
                  Promise.resolve(docAndMsg) :
                  this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, docAndMsg, this.api.crypto().utils.text2ua(Base64.decode(_.trim(_.get(targetDocumentList,"comment","")))))
                      .then(uaDecryptedContent => docAndMsg.message.metas.documentList = _.merge(targetDocumentList, {decryptedComment: this.api.crypto().utils.ua2text(uaDecryptedContent)}))
                      .then(()=>docAndMsg)
                      .catch(()=>docAndMsg)

          })))
          .catch(e=>{ console.log("ERROR _getMessages", e); return promResolve; })

  }

  _getSearchEngineValue() {

      const searchEngineValues = {
          inComingOutGoingHr: [],
          typeHr: [],
          originHr: [],
          authorHr: []
      }

      _.map(_.get(this,"_data.vaadinGridData",[]), it => {
          searchEngineValues.inComingOutGoingHr.push(_.trim(_.get(it,"inComingOutGoingHr","")))
          searchEngineValues.typeHr.push(_.trim(_.get(it,"typeHr","")))
          searchEngineValues.originHr.push(_.trim(_.get(it,"originHr","")))
          searchEngineValues.authorHr.push(_.trim(_.get(it,"authorHr","")))
      })

      searchEngineValues.inComingOutGoingHr = _.uniq(_.compact(searchEngineValues.inComingOutGoingHr)).sort()
      searchEngineValues.typeHr = _.uniq(_.compact(searchEngineValues.typeHr)).sort()
      searchEngineValues.originHr = _.uniq(_.compact(searchEngineValues.originHr)).sort()
      searchEngineValues.authorHr = _.uniq(_.compact(searchEngineValues.authorHr)).sort()

      return Promise.resolve(searchEngineValues)

  }

  _filterResults(inComingOutGoingHr, typeHr, originHr, authorHr) {

      if(!!_.get(this,"_isLocked",false)) return;

      let finalResults = _.cloneDeep(_.get(this,"_data.directoryDocuments", []));
      const inComingOutGoingHrValue = _.trim(_.get(inComingOutGoingHr,"dataFilter",""))
      const typeHrValue = _.trim(_.get(typeHr,"dataFilter",""))
      const originHrValue = _.trim(_.get(originHr,"dataFilter",""))
      const authorHrValue = _.trim(_.get(authorHr,"dataFilter",""))

      finalResults = !_.trim(inComingOutGoingHrValue) ? finalResults : _.filter(finalResults, i => _.trim(_.get(i,"inComingOutGoingHr","")).indexOf(inComingOutGoingHrValue) > -1)
      finalResults = !_.trim(typeHrValue) ? finalResults : _.filter(finalResults, i => _.trim(_.get(i,"typeHr","")).indexOf(typeHrValue) > -1)
      finalResults = !_.trim(originHrValue) ? finalResults : _.filter(finalResults, i => _.trim(_.get(i,"originHr","")).indexOf(originHrValue) > -1)
      finalResults = !_.trim(authorHrValue) ? finalResults : _.filter(finalResults, i => _.trim(_.get(i,"authorHr","")).indexOf(authorHrValue) > -1)

      this.set("_data.vaadinGridData",finalResults)

      // When updating filters, by pass observer (avoid infinite loop)
      this.set("_isLocked", true); this._getSearchEngineValue().then(searchEngineValues => { this.set("_data.searchEngineValues", searchEngineValues); this.set("_isLocked", false); })

  }

  _getDirectoryDocuments(patientObject) {

      const promResolve = Promise.resolve();

      return this.api.contact().findBy( _.trim(_.get(this,"user.healthcarePartyId","")), patientObject )
          .then(patientContacts => _.compact(_.flatten(_.map(patientContacts, singleContact => _.concat(
              // Target documentId in svc
              _.map(singleContact.services, singleService => !( _.trim(_.get(this.api.contact().preferredContent(singleService, this.language),"documentId")) )? false : {
                  contact: singleContact,
                  service: singleService,
                  serviceTitle: _.trim(_.get(singleService,"content." + this.language + ".stringValue")),
                  date: parseInt(_.get(singleContact,"openingDate"))||+new Date(),
                  dateHr: this._YYYYMMDDHHmmssToDDMMYYYY(parseInt(_.get(singleContact,"openingDate",""))||+new Date()),
                  documentId: _.trim(_.get(this.api.contact().preferredContent(singleService, this.language),"documentId")),
              }),
              // Target ehealthbox message
              (!_.size(_.find(_.get(singleContact,"tags",[]), {type:"originalEhBoxMessageId"})) || !!_.trim(_.get(this.api.contact().preferredContent(_.get(singleContact,"services[0]",{}), this.language),"documentId")) ? false : {
                  contact: singleContact,
                  services: singleContact.services,
                  serviceTitle: _.trim(_.get(singleContact,"descr")),
                  date: parseInt(_.get(singleContact,"openingDate"))||+new Date(),
                  dateHr: this._YYYYMMDDHHmmssToDDMMYYYY(parseInt(_.get(singleContact,"openingDate",""))||+new Date()),
                  documentId: _.get(_.find(_.get(singleContact,"tags",[]), {type:"originalEhBoxDocumentId"}), "id",""),
                  isLabResultOrProtocol: true,
              }),
              // Target migrations - imported documents from epicure / medispring (docs don't exist as such, rather a services list)
              (!_.size(_.find(_.get(singleContact,"tags",[]), {type:"CD-TRANSACTION"})) || !!_.size(_.find(_.get(singleContact,"tags",[]), {type:"originalEhBoxMessageId"})) || !!_.trim(_.get(this.api.contact().preferredContent(_.get(singleContact,"services[0]",{}), this.language),"documentId")) ? false : {
                  contact: singleContact,
                  services: singleContact.services,
                  serviceTitle: _.trim(_.get(singleContact,"descr")),
                  date: parseInt(_.get(singleContact,"openingDate"))||+new Date(),
                  dateHr: this._YYYYMMDDHHmmssToDDMMYYYY(parseInt(_.get(singleContact,"openingDate",""))||+new Date()),
                  documentId:null,
                  isFromMigration: true,
              })
          )))))
          .then(foundServicesWithDocumentId => !_.size(foundServicesWithDocumentId) ? Promise.resolve([foundServicesWithDocumentId, []]) : this.api.document().getDocuments({ids:_.uniq(_.compact(_.map(foundServicesWithDocumentId,s=>_.trim(_.get(s,"documentId","")))))}).then(foundDocuments=>[foundServicesWithDocumentId,foundDocuments]))
          .then(([foundServicesWithDocumentId,foundDocuments]) => _.compact(_.map(foundServicesWithDocumentId, fswd => {
              const serviceDocument = _.find(foundDocuments, {id: _.trim(_.get(fswd, "documentId"))})
              return !!_.get(fswd,"isFromMigration",false) ? fswd : (!_.trim(_.get(serviceDocument,"id","")) || !_.trim(_.get(serviceDocument,"attachmentId","")) ) ? false : _.merge({}, fswd, {document: serviceDocument})
          })))
          .then(contactsAndDocuments => _.chain(contactsAndDocuments).filter(i => !!_.get(i,"isFromMigration",false) || !!_.trim(_.get(i,"document.id"))).orderBy(['date'], ['desc']).value())
          .then(contactsAndDocuments => Promise.all(_.compact(_.map(contactsAndDocuments, cad => !_.trim(_.get(cad,"document.id")) ? false : this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.get(this,"_data.currentHcp.id",""), _.get(cad,"document.id"), _.get(cad,"document.cryptedForeignKeys")).then(x=>({documentId:_.get(cad,"document.id"), messageId:_.trim(_.head(_.get(x, "extractedKeys")))})).catch(()=>null)))).then(documentsIdsAndMessagesIds => ([contactsAndDocuments,documentsIdsAndMessagesIds])))
          .then(([contactsAndDocuments,documentsIdsAndMessagesIds]) => !_.size(documentsIdsAndMessagesIds) ? contactsAndDocuments : Promise.all(_.map(documentsIdsAndMessagesIds, it => this.api.message().getMessage(_.get(it,"messageId")).then(msg => _.merge({}, it,{message:msg})).catch(()=>it)))
              .then(messagesLinkedToDocuments => Promise.all(_.map(messagesLinkedToDocuments, msgLinkedToDoc => {

                  const msg = _.merge({}, _.get(msgLinkedToDoc,"message",{}), {linkedDocumentId: _.get(msgLinkedToDoc,"documentId")})
                  const cryptedInfo = _.trim(_.get(msg,"metas.cryptedInfo",""));
                  const dataToDecrypt = ( ["DOC:IMPORT:IN", "DOC:SCAN:IN"].indexOf( _.trim(_.get(msg,"transportGuid",""))) > -1 ) && !!cryptedInfo ? new Uint8Array(this.api.crypto().utils.base64toArrayBuffer(cryptedInfo)) :
                      ( ["HUB:IN:IMPORTED-DOCUMENT"].indexOf( _.trim(_.get(msg,"transportGuid",""))) > -1 ) && !!cryptedInfo ? this.api.crypto().utils.text2ua(Base64.decode(cryptedInfo)) :
                      ( _.trim(_.get(msg,"transportGuid","")).indexOf("INBOX") > -1 ) && !!_.trim(_.get(msg,"metas.annexesInfos","")) ? this.api.crypto().utils.text2ua(Base64.decode(_.trim(_.get(msg,"metas.annexesInfos","")))) :
                      false;
                  let documentList = []; try{ documentList = JSON.parse(_.trim(_.get(msg,"metas.documentListJson",{}))); } catch(e) {}

                  return !dataToDecrypt ? msg : this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, msg, dataToDecrypt)
                      .then(uaDecryptedContent => JSON.parse(this.api.crypto().utils.ua2text(uaDecryptedContent)))
                      .then(decryptedContent => _.merge(msg,{metas:{
                          decryptedInfo: !!Array.isArray(decryptedContent) ? _.head(decryptedContent) : decryptedContent,
                          documentList: documentList,
                          isScanned:(((msg.status & (1 << 24)) !== 0)||msg.transportGuid === "DOC:SCAN:IN"),
                          isImported:((msg.status & (1 << 25)) !== 0)
                      }}))
                      .catch(()=>msg)

              }))
              .then(messagesLinkedToDocuments => Promise.all(_.map(messagesLinkedToDocuments, msg => {
                  const targetDocument = _.get(_.find(contactsAndDocuments, {documentId:_.get(msg,"linkedDocumentId","")}),"document", {})
                  const targetMessageDocumentList = _.find(_.get(msg,"metas.documentList",[]), {id:_.get(msg,"linkedDocumentId","")})
                  return !_.trim(_.get(targetMessageDocumentList,"comment","")) ? Promise.resolve(msg) : this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, targetDocument, this.api.crypto().utils.text2ua(Base64.decode(_.trim(_.get(targetMessageDocumentList,"comment",""))))).then(uaDecryptedContent => msg.metas.documentList = _.merge(targetMessageDocumentList, {decryptedComment: this.api.crypto().utils.ua2text(uaDecryptedContent)})).then(()=>msg).catch(()=>msg)
              })))
              .then(decryptedMessages => _.map(contactsAndDocuments, it => _.merge({}, it, {message:_.find(decryptedMessages,{linkedDocumentId:_.get(it,"documentId")})})))
              .catch(e=>{ console.log("ERROR _getMessages", e); return promResolve; })

          ))
          .then(datas => this._getPrettifiedHcps(_.uniq(_.compact(_.map(datas, data => _.trim(_.get(data,"contact.responsible","")))))).then(hcps=>([datas,hcps])))
          .then(([datas,hcps]) => _.map(datas, data => {

                const documentTypeFromSubContactsStatus = !_.get(data,"isFromMigration",false) ? null :
                    ((_.get(data,"contact.subContacts[0].status",0) & (1 << 0)) !== 0 ) ? this.localize("cd-transaction-labresult", "Laboratory result", this.language) :
                    ((_.get(data,"contact.subContacts[0].status",0) & (1 << 5)) !== 0 ) ? this.localize("prot", "Protocol", this.language) :
                    null

                const transactionCodeLabelHr = !!_.get(data,"isFromMigration",false) && !!_.trim(documentTypeFromSubContactsStatus) ? _.trim(documentTypeFromSubContactsStatus) :
                    !!_.get(data,"isLabResultOrProtocol",false) || !!_.get(data,"isFromMigration",false) ?
                    _.trim(_.get(_.find(_.get(this,"_data.codes['CD-TRANSACTION']",[]), {code:_.get(_.find(_.get(data,"contact.tags",[]), {type:"CD-TRANSACTION"}),"code","")}), "labelHr","")) :
                    _.trim(_.get(data,"message.transportGuid")) === "PRESCRIPTION:ITT:ARCHIVE" ? this.localize("medicalCertificate","Medical certificate",this.language) :
                    _.trim(_.get(data,"message.transportGuid")) === "PRESCRIPTION:KINE:ARCHIVE" ? this.localize("requestForKineCare_header1","Kinesitherapy prescription",this.language) :
                    _.trim(_.get(data,"message.transportGuid")) === "PRESCRIPTION:NURSE:ARCHIVE" ? this.localize("requestForNurseCare_header1","Nursing prescription",this.language) :
                    _.trim(_.get(data,"message.transportGuid")) === "PRESCRIPTION:IMAGING:ARCHIVE" ? this.localize("requestForImagingExam","Medical imaging exam",this.language) :
                    _.trim(_.get(data,"message.transportGuid")) === "MEDEX:OUT:PDF" ? this.localize("medicalCertificate","Medical certificate",this.language) + " Medex" :
                    _.trim(_.get(data,"message.transportGuid")) === "MEDEX:OUT:KHMER" ? "KHMER - " + this.localize("medicalCertificate","Medical certificate",this.language) + " Medex" :
                    !!_.size(_.get(data,"service.tags",[])) ? _.trim(_.get(_.find(_.get(this,"_data.codes['CD-TRANSACTION']",[]), {code:_.get(_.find(_.get(data,"service.tags",[]), {type:"CD-TRANSACTION"}),"code","")}), "labelHr","")) :
                    !!_.size(_.get(data,"contact.tags",[])) ? _.trim(_.get(_.find(_.get(this,"_data.codes['BE-CONTACT-TYPE']",[]), {code:_.get(_.find(_.get(data,"contact.tags",[]), {type:"BE-CONTACT-TYPE"}),"code","")}), "labelHr","")) :
                    ""

                const inComingOrOutGoing = !!_.get(data,"isFromMigration",false) ? "inComing" :
                    ( _.trim(_.get(_.find(_.get(data,"service.tags",[]),{type:"HUB-TRANSACTION"}),"code","")).toLowerCase() === "download" || _.trim(_.get(data,"message.transportGuid","")).indexOf("HUB:IN:") > -1 ) ? 'inComing' :
                    (_.trim(_.get(_.find(_.get(data,"service.tags",[]),{type:"HUB-TRANSACTION"}),"code","")).toLowerCase() === "upload" || _.trim(_.get(data,"message.transportGuid","")).indexOf("HUB:OUT:") > -1 )? 'outGoing' :
                    _.trim(_.get(data, "service.label")).toLowerCase().indexOf("imported document") > -1 ? 'inComing' :
                    !!_.size(_.find(_.get(data,"service.tags",[]), {type:"originalEhBoxMessageId"})) ? 'inComing' :
                    !!_.size(_.find(_.get(data,"service.tags",[]), {type:"outgoingDocument"})) ? 'outGoing' :
                        (!!_.get(data,"isLabResultOrProtocol",false) || !!_.trim(_.get(data,"message.fromAddress","")) || !!_.get(data,"isFromMigration",false)) ? 'inComing' :
                    'outGoing'

                const documentOrigin = (!!_.size(_.find(_.get(data,"service.tags",[]),{type:"HUB-TRANSACTION"})) || _.trim(_.get(data,"message.transportGuid","")).indexOf("HUB:") > -1 ) ? 'hub' :
                    (!!parseInt(_.get(data,"message.metas.documentList.scanned",0)) || !!_.get(data,"message.metas.isScanned",false) || _.trim(_.get(data,"message.transportGuid","")) === "DOC:SCAN:IN") ? 'scannedDoc' :
                    _.trim(_.get(data, "service.label")).toLowerCase().indexOf("imported document") > -1 ? 'importedDoc' :
                    !!_.size(_.find(_.get(data,"service.tags",[]), {type:"originalEhBoxMessageId"})) ? 'eHealthbox' :
                    (!!_.get(data,"isLabResultOrProtocol",false) || !!_.trim(_.get(data,"message.fromAddress",""))) ? 'eHealthbox' :
                    !!_.size(_.find(_.get(data,"service.tags",[]), {type:"outgoingDocument"})) ? 'patientFile' :
                    'patientFile'

                return _.merge({},data, {
                    description: (!!_.get(data,"isLabResultOrProtocol",false) || !!_.get(data,"isFromMigration",false)) && !!_.trim(_.get(data,"contact.descr","")) ? _.trim(_.get(data,"contact.descr","")) :
                        (!!_.get(data,"isFromMigration",false) && !_.trim(_.get(data,"contact.descr","")) && !!_.trim(_.get(data,"contact.subContacts[0].descr",""))) ? _.trim(_.get(data,"contact.subContacts[0].descr","")) :
                        (!!_.get(data,"isFromMigration",false) && !_.trim(_.get(data,"contact.descr","")) && !!_.trim(_.get(data,"contact.subContacts[0].protocol",""))) ? this.localize("prot", "Protocol", this.language) + " " + _.trim(_.get(data,"contact.subContacts[0].protocol","")) :
                        !!_.trim(_.get(data,"message.metas.documentList.decryptedComment","")) ? _.trim(_.get(data,"message.metas.documentList.decryptedComment","")) :
                        !!_.trim(_.get(data,"document.name","")) ? _.trim(_.get(data,"document.name","")) :
                        _.trim(_.get(data,"documentId","")),
                    typeHr: !!_.trim(transactionCodeLabelHr) ? _.trim(transactionCodeLabelHr) : _.trim(_.get(data, "serviceTitle")),
                    inComingOutGoingHr: this.localize(inComingOrOutGoing, inComingOrOutGoing, this.language),
                    originHr: this.localize("documentsDirectoryOrigin_" + documentOrigin, documentOrigin, this.language) + (!!_.trim(_.get(data,"message.fromAddress","")) ? " - " + _.trim(_.get(data,"message.fromAddress","")) : ""),
                    authorHr: _.get(_.find(hcps, {id:_.trim(_.get(data,"contact.responsible",""))}),"lastName","") + " " + _.get(_.find(hcps, {id:_.trim(_.get(data,"contact.responsible",""))}),"firstName",""),
                    authorSpecialitiesHr: _.get(_.find(hcps, {id:_.trim(_.get(data,"contact.responsible",""))}),"specialitiesHr",""),
                    // recipientHr: "Dr. Maxime Mennechet", /* Only available in eHealthbox while sent item is not deleted yet */
                })
            }))
          .catch(e=>{ console.log("ERROR _getDirectoryDocuments", e); return promResolve; })

  }

  open(){

      if(!!_.get(this,"_isBusy",false)) return;

      return this._resetComponentProperties()
          .then(() => _.map(this._data, (propValue,propKey) => typeof _.get(propValue,"value",null) !== "function" ? null : this.set("_data." + propKey, propValue.value())) )
          .then(() => { this.set("_isBusy", true); this.shadowRoot.querySelector('#document-directory-dialog').open(); })
          .then(() => this._getPrettifiedHcps().then(hcps => this.set("_data.currentHcp",_.head(hcps))))
          .then(() => this._getPrettifiedPatient(_.get(this,"user",{}), _.trim(_.get(this,"patient.id",""))).then(pat => this.set("_data.currentPatient", pat)))
          .then(() => this._getCodesByType("CD-TRANSACTION").then(codes => _.merge(this._data,{codes:codes})))
          .then(() => this._getCodesByType("BE-CONTACT-TYPE").then(codes => _.merge(this._data,{codes:codes})))
          .then(() => this.api.setPreventLogging())
          .then(() => this._getDirectoryDocuments(_.get(this,"_data.currentPatient",{})).then(datas => this.set("_data.directoryDocuments", datas)))
          .then(() => this.set("_data.vaadinGridData",_.get(this,"_data.directoryDocuments", [])))
          .then(() => this._getSearchEngineValue().then(searchEngineValues => this.set("_data.searchEngineValues",searchEngineValues)))
          .finally(() => (this.set("_isBusy", false)||true) && (console.log("--- this._data ---",this._data)||true) && (this.api.setPreventLogging(false)||true))
          .catch(e=>console.log("ERROR", e));

  }

  _downloadList(config=false) {

      if(!!_.get(this,"_isBusy",false)) return;

      this.set("_isBusy", true)

      const title = this.localize("documentsDirectory","Document directory",this.language)
      const fileName = _.kebabCase(_.compact([ moment().format("YYYY-MM-DD"), title, _.trim(_.get(this,"patient.lastName")), _.trim(_.get(this,"patient.firstName")), +new Date()]).join(" ")) + ".xls"
      const xlsWorkBook = {SheetNames: [], Sheets: {}, Props:{Title: title, Author: "TOPAZ"}}
      const fieldsAndLabels = [
          ["dateHr", this.localize("date","Date",this.language)],
          ["inComingOutGoingHr", this.localize("document","Document",this.language)],
          ["typeHr", this.localize("type","Type",this.language)],
          ["originHr", this.localize("origin","Origin",this.language)],
          ["authorHr", this.localize("aut","Author",this.language)],
          ["description", this.localize("des","Description",this.language)],
      ]
      const exportData = _.map(_.get(this,"_data.vaadinGridData",[]), i => _.fromPairs(_.map(fieldsAndLabels, fal => [fal[1], _.get(i, fal[0], "")])))

      XLSX.utils.book_append_sheet(xlsWorkBook, XLSX.utils.json_to_sheet(exportData), title)
      const xlsWorkBookOutput = new Buffer(XLSX.write(xlsWorkBook, {bookType: 'xls', type: 'buffer'}))
      const fileBlob = new Blob([xlsWorkBookOutput], {type: "application/vnd.ms-excel"}) /* "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" */

      this.set("_isBusy", false)

      return !!_.get(config,"returnFileBlob",false) ? Promise.resolve({fileName:fileName,fileBlob:fileBlob}) : this.api.triggerFileDownload(fileBlob, "application/vnd.ms-excel", fileName, this.shadowRoot.querySelector('#document-directory-dialog'))

  }

  _downloadListAndFiles() {

      if(!!_.get(this,"_isBusy",false)) return;

      const data = {}
      const promResolve = Promise.resolve()
      const zipArchive = new jsZip()
      const fileName = _.kebabCase(_.compact([ moment().format("YYYY-MM-DD"), this.localize("documentsDirectory","Document directory",this.language), _.trim(_.get(this,"patient.lastName")), _.trim(_.get(this,"patient.firstName")), +new Date()]).join(" ")) + ".zip"

      return promResolve
          .then(() => this._downloadList({returnFileBlob:true}))
          .then(xlsListBlob => _.merge(data,{xlsListBlob:xlsListBlob}))
          .then(() => this.set("_isBusy", true))
          .then(() => this.api.setPreventLogging())
          .then(() => Promise.all(_.map(_.get(this,"_data.vaadinGridData",[]), i => this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.get(this,"user.healthcarePartyId", null), _.get(i,"document.id",""), _.size(_.get(i,"document.encryptionKeys",[])) ? _.get(i,"document.encryptionKeys",[]) : _.get(i,"document.delegations",[])).then(({extractedKeys: enckeys}) => !!_.trim(_.get(i,"document.attachmentId","")) ? this.api.document().getAttachment(_.trim(_.get(i,"document.id","")), _.trim(_.get(i,"document.attachmentId","")), enckeys.join(',')).then(decryptedContent=>_.merge(i,{document:{content:decryptedContent}})).catch(()=>i) : i))))
          .then(itemsWithAttachments => _.map(itemsWithAttachments, i => !_.get(i,"document.content",false) ? false : zipArchive.folder(!!_.trim(_.get(i,"typeHr","")) ? _.kebabCase(_.get(i,"typeHr","")) : "unclassified").file(_.trim(_.get(i,"document.name")), _.get(i,"document.content",false) instanceof ArrayBuffer ? _.get(i,"document.content") : this.api.crypto().utils.text2ua(_.get(i,"document.content")))))
          .then(() => zipArchive.file(_.trim(_.get(data,"xlsListBlob.fileName")), _.get(data,"xlsListBlob.fileBlob")))
          .then(() => zipArchive.generateAsync({type:"arraybuffer", mimeType: "application/zip", compression: "DEFLATE", compressionOptions: { level: 9 }}))
          .then(zipBlob =>  this.api.triggerFileDownload(zipBlob, "application/zip", fileName, this.shadowRoot.querySelector('#document-directory-dialog')))
          .finally(()=>(this.set("_isBusy", false)||true)&&(this.api.setPreventLogging(false)||true))

  }
}

customElements.define(HtPatDocumentsDirectoryDialog.is, HtPatDocumentsDirectoryDialog);
