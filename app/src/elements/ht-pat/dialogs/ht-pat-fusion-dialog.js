import '../../../styles/dialog-style.js';
import _ from 'lodash/lodash';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtPatFusionDialog extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="dialog-style">
            #fusion-dialog{
                height: calc(100% - 40px);
                width: calc(100% - 40px);
                z-index: 1100;
                position: fixed;
                left: 0;
                bottom: 0;
                right: 0;
            }

            .content {
                display: grid;
                grid-template-columns: 20% 40% 40%;
                grid-template-rows: 100%;
            }

            paper-listbox {
                outline: 0;
                --paper-listbox-selected-item: {
                    color: var(--app-text-color-light);
                    background: var(--app-primary-color);
                };
                --paper-listbox-readonly-color: {
                    color: red;
                };

                background: transparent;
                padding: 0;
            }

            #patient-listbox {
                padding: 0;
            }

            .patient-item {
                height: 90px;
                width: auto;
                box-shadow: var(--shadow-elevation-3dp_-_box-shadow);
                margin-top: 12px;
                background: var(--app-light-color);
                color: var(--app-text-color);
                outline: 0;
                padding: 0;
                align-items: flex-start !important;
                @apply --shadow-elevation-2dp;
                position: relative;
            }

            .patient-item:first-child{
                margin-top: 0;
            }
            .patient--big {
                min-height: 96px;
            }

            .layout.vertical {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                height: auto;
                max-height: none !important;
            }

            .patient-text {
                background: transparent;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                width: 100%;
                height: 100%;
                padding: 0;
                color: var(--app-text-color-dark);
                background: var(--app-background-color-dark);
            }

            #patient-list-left-pannel {
                height: 100%;
                background: var(--app-background-color-dark);
                box-shadow: var(--shadow-elevation-3dp_-_box-shadow);
                grid-column: 1/1;
                grid-row: 1/1;
                z-index: 3;
                overflow-y: auto;
                margin-top: 0px;
                padding: 24px;
                box-sizing: border-box;
            }

            #grey-selected-patient-pannel{
                height: 100%;
                grid-column: 3/3;
                grid-row: 1/1;
                z-index: 3;
                overflow-y: auto;
                margin-top: 0px;
                padding: 24px;
                box-sizing: border-box;
                margin-right: 1%;
            }

            #orange-selected-patient-pannel{
                height: 100%;
                grid-column: 2/2;
                grid-row: 1/1;
                z-index: 3;
                overflow-y: auto;
                margin-top: 0px;
                padding: 24px;
                box-sizing: border-box;
                margin-left: 1%;
            }

            .row{
                width: calc(100% - 32px);
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                padding-right: var(--padding-right-left-16_-_padding-right);
                padding-left: var(--padding-right-left-16_-_padding-left);
                background-color: var(--app-background-color-light);
            }

            .header{
                justify-content: space-between!important;
                position: relative;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(0,0,0,.1);
                padding-right: var(--padding-right-left-16_-_padding-right);
                padding-left: var(--padding-right-left-16_-_padding-left);
                color: var(--app-text-color-readonly);
                height: 24px;
            }

            .orange > paper-item > .header{
                color: var(--app-text-color);
                background-color: var(--app-secondary-color-dark);
            }

            .grey > paper-item > .header{
                color: var(--app-text-color-light);
                background-color: var(--app-primary-color);
            }

            .patient-picture-container {
                height: 52px;
                width: 52px;
                border-radius:50%;
                overflow: hidden;
            }

            .patient-picture-container img{
                width:100%;
                margin:50%;
                transform: translate(-50%,-50%);
            }

            .patient-info-container{
                height: 72px;
                padding: 12px;
                box-sizing: border-box;
            }

            .patient-info-container.grey{
                background-color: var(--app-primary-color);
                color: var(--app-text-color-light);
                @apply --transition;
            }

            .patient-info-container.orange{
                background-color: var(--app-secondary-color-dark);
                color: var(--app-text-color);
                @apply --transition;
            }

            .patient-info{
                padding-left: 12px;
                display:flex;
                flex-direction:column;
                align-items: flex-start;
                justify-content: center;
            }

            .layout.horizontal {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                flex-wrap:nowrap;
            }

            .content-patient{
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex-wrap:nowrap;
            }

            .header-content{
                margin-top: 5px;
                padding: 2px;
                background-color: var(--app-background-color-darker);
            }

            .large{
                width:33%;
            }

            .medium{
                width:25%;
            }

            .hyper-large{
                width:66%;
            }

            .hyper-small{
                width:9%;
            }

            .small{
                width:19%;
            }

            .hyper-with-small{
                width:80%;
            }

            .line{
                display : flex;
                flex-direction: row;
            }

            .line > paper-checkbox{
                width:33%;
                margin-top: 35px;
                text-align: center;
                --paper-checkbox-unchecked-color: var(--app-text-color);
                --paper-checkbox-label-color: var(--app-text-color);
                --paper-checkbox-checked-color: var(--app-secondary-color);
                --paper-checkbox-checked-ink-color: var(--app-secondary-color-dark);
                --paper-checkbox-vertical-align: bottom;
                --paper-checkbox-size: 16px;
            }

            #orange-selected-patient-pannel.selected{
                border: 3px solid var(--app-secondary-color-dark);;
            }

            #grey-selected-patient-pannel.selected{
                border: 3px solid var(--app-primary-color);;
            }

            .transparent{
                height: 96%;
                width: 38%;
                /* background-color: red; */
                z-index: 1000;
                position: absolute;
            }
        </style>

        <paper-dialog id="fusion-dialog" opened="{{opened}}">
            <h2 class="modal-title">[[localize('fus_pat','Fusion patients',language)]]</h2>
            <div class="content">
                <div id="patient-list-left-pannel">
                    <paper-listbox id="patient-listbox" focused="" selectable="paper-material" selected="{{selected}}">
                        <template is="dom-repeat" items="[[patients]]">
                            <paper-material role="option" id="[[item.patient.id]]" class="layout vertical patient-item patient--big">
                                <paper-item class="patient-text">
                                    <div class="row header">
                                        <label>[[_patientNameDescrip(item.patient)]]</label>
                                        <template is="dom-if" if="[[selectionMode]]">
                                            <paper-checkbox role="check" patient="[[item.patient.id]]" checked="[[_isMaster(item.patient.id,masterSelect)]]" on-checked-changed="changeMaster"></paper-checkbox>
                                        </template>
                                    </div>
                                    <div class="row">
                                        <label>[[_formatDate(item.patient.dateOfBirth)]] - [[_formatDate(item.patient.dateDeath)]] ([[_getAge(item.patient)]])</label>
                                    </div>
                                    <div class="row">
                                        <label>[[localize("ssin","SSIN",language)]]: [[item.patient.ssin]]</label>
                                    </div>
                                    <div class="row">
                                        <label>[[localize("qte_contact","Nombre de contacts",language)]]: [[item.contacts.length]]</label>
                                    </div>
                                </paper-item>
                            </paper-material>
                        </template>
                    </paper-listbox>
                </div>
                <div id="orange-selected-patient-pannel">
                    <template is="dom-if" if="[[patientLeft]]">
                        <div class="transparent" patient="[[patientLeft.patient.id]]" on-tap="changeMaster"></div>
                        <div class="layout horizontal patient-info-container orange">
                            <div class="patient-picture-container"><img src\$="[[_picture(patientLeft.patient,patientLeft)]]"></div>
                            <div class="patient-info">
                                <div>[[_patientNameDescrip(patientLeft.patient,patientLeft)]]</div>
                                <div>[[_formatDate(patientLeft.patient.dateOfBirth,patientLeft)]] - [[_formatDate(patientLeft.patient.dateDeath,patientLeft)]] ([[_getAge(patientLeft.patient,patientLeft)]])</div>
                                <div>[[patientLeft.patient.profession]]</div>
                            </div>
                        </div>
                        <div class="content-patient">
                            <div class="header-content">[[localize('info_pat','info du patient',language)]]</div>
                            <div class="line">
                                <paper-input class="large" label="[[localize('reference_hcp','reference hcp',language)]]" value="[[patientLeft.loadedData.preferredUser]]" readonly=""></paper-input>
                                <paper-checkbox checked="[[patientLeft.patient.active]]">[[localize('act','Actif',language)]]</paper-checkbox>
                                <paper-input class="large" label="[[localize('ssin','Ssin',language)]]" value="[[patientLeft.patient.ssin]]" readonly=""></paper-input>
                            </div>
                            <div class="line">
                                <paper-input class="large" label="[[localize('place_of_bir','Lieu de naissance',language)]]" value="[[patientLeft.patient.placeOfBirth]]" readonly=""></paper-input>
                                <paper-input class="large" label="[[localize('status','Statut',language)]]" value="[[localize(patientLeft.patient.personalStatus,patientLeft.patient.personalStatus,language,patientLeft)]]" readonly=""></paper-input>
                                <paper-input label="[[localize('education','education',language)]]" value="[[localize(patientLeft.patient.education,patientLeft.patient.education,language,patientLeft)]]" readonly=""></paper-input>
                            </div>
                            <div class="line">
                                <paper-input class="large" label="[[localize('alias','alias',language)]]" value="[[patientLeft.patient.alias]]" readonly=""></paper-input>
                                <paper-input class="large" label="[[localize('ext_id','external id',language)]]" value="[[patientLeft.patient.externalId]]" readonly=""></paper-input>
                                <paper-input label="[[localize('partner_name','partner name',language)]]" value="[[patientLeft.patient.partnerName]]" readonly=""></paper-input>
                            </div>
                            <div class="line">
                                <paper-input class="large" label="[[localize('nationality','nationality',language)]]" value="[[patientLeft.patient.nationality]]" readonly=""></paper-input>
                                <paper-input class="hyper-large" label="[[localize('languages','languages',language)]]" value="[[patientLeft.loadedData.languages]]" readonly=""></paper-input>
                            </div>

                            <div class="content-patient">
                                <div class="header-content">[[localize('adds','Addresses',language)]]</div>
                                <template is="dom-repeat" items="[[patientLeft.patient.addresses]]" as="add">
                                    <div class="line">
                                        <paper-input class="small" label="[[localize('type','address type',language)]]" value="[[localize(add.addressType,add.addressType,language,patientLeft)]]" readonly=""></paper-input>
                                        <paper-input class="hyper-with-small" label="[[localize('address','address',language)]]" value="[[_getAddress(add,patientLeft)]]" readonly=""></paper-input>
                                    </div>
                                    <div class="line">
                                        <template is="dom-repeat" items="[[add.telecoms]]" as="tel">
                                            <div class="content-patient">
                                                <div class="line">
                                                    <paper-input class="large" label="[[localize('type','telecom type',language)]]" value="[[localize(tel.telecomType,tel.telecomType,language,patientLeft)]]" readonly=""></paper-input>
                                                    <paper-input class="hyper-large" label="[[localize('number_address','number address',language)]]" value="[[tel.telecomNumber]]" readonly=""></paper-input>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>

                            <div class="content-patient">
                                <div class="header-content">[[localize('insurances','Insurances',language)]]</div>
                                <template is="dom-repeat" items="[[patientLeft.patient.insurabilities]]" as="ins">
                                    <div class="line">
                                        <paper-input class="hyper-large" label="[[localize('adm_in','adm_in',language)]]" value="[[ins.insuranceId]]" readonly=""></paper-input>
                                        <paper-input class="large" label="[[localize('membership','membership',language)]]" value="[[ins.identificationNumber]]" readonly=""></paper-input>
                                    </div>
                                    <div class="line">
                                        <paper-checkbox checked="[[ins.parameters.paymentapproval]]">[[localize('pay_ok','pay_ok',language)]]</paper-checkbox>
                                        <paper-input class="hyper-small" label="[[localize('tc1','tc1',language)]]" value="[[ins.parameters.tc1]]" readonly=""></paper-input>
                                        <paper-input class="hyper-small" label="[[localize('tc2','tc2',language)]]" value="[[ins.parameters.tc2]]" readonly=""></paper-input>
                                        <paper-input class="medium" label="[[localize('ins_start_date','startDate',language)]]" value="[[_formatDate(ins.startDate,patientLeft)]]" readonly=""></paper-input>
                                        <paper-input class="medium" label="[[localize('ins_end_date','endDate',language)]]" value="[[_formatDate(ins.endDate,patientLeft)]]" readonly=""></paper-input>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <div id="grey-selected-patient-pannel">
                    <template is="dom-if" if="[[patientRight]]">
                        <div class="transparent" patient="[[patientRight.patient.id]]" on-tap="changeMaster"></div>
                        <div class="layout horizontal patient-info-container grey">
                            <div class="patient-picture-container"><img src\$="[[_picture(patientRight.patient,patientRight)]]"></div>
                            <div class="patient-info">
                                <div>[[_patientNameDescrip(patientRight.patient,patientRight)]]</div>
                                <div>[[_formatDate(patientRight.patient.dateOfBirth,patientRight)]] - [[_formatDate(patientRight.patient.dateDeath,patientRight)]] ([[_getAge(patientRight.patient,patientRight)]])</div>
                                <div>[[patientRight.patient.profession]]</div>
                            </div>
                        </div>
                        <div class="content-patient">
                            <div class="header-content">[[localize('info_pat','info du patient',language)]]</div>
                            <div class="line">
                                <paper-input class="large" label="[[localize('reference_hcp','reference hcp',language)]]" value="[[patientRight.loadedData.preferredUser]]" readonly=""></paper-input>
                                <paper-checkbox checked="[[patientRight.patient.active]]">[[localize('act','Actif',language)]]</paper-checkbox>
                                <paper-input class="large" label="[[localize('ssin','Ssin',language)]]" value="[[patientRight.patient.ssin]]" readonly=""></paper-input>
                            </div>
                            <div class="line">
                                <paper-input class="large" label="[[localize('place_of_bir','Lieu de naissance',language)]]" value="[[patientRight.patient.placeOfBirth]]" readonly=""></paper-input>
                                <paper-input class="large" label="[[localize('status','Statut',language)]]" value="[[localize(patientRight.patient.personalStatus,patientRight.patient.personalStatus,language,patientRight)]]" readonly=""></paper-input>
                                <paper-input label="[[localize('education','education',language)]]" value="[[localize(patientRight.patient.education,patientRight.patient.education,language,patientRight)]]" readonly=""></paper-input>
                            </div>
                            <div class="line">
                                <paper-input class="large" label="[[localize('alias','alias',language)]]" value="[[patientRight.patient.alias]]" readonly=""></paper-input>
                                <paper-input class="large" label="[[localize('ext_id','external id',language)]]" value="[[patientRight.patient.externalId]]" readonly=""></paper-input>
                                <paper-input label="[[localize('partner_name','partner name',language)]]" value="[[patientRight.patient.partnerName]]" readonly=""></paper-input>
                            </div>
                            <div class="line">
                                <paper-input class="large" label="[[localize('nationality','nationality',language)]]" value="[[patientRight.patient.nationality]]" readonly=""></paper-input>
                                <paper-input class="hyper-large" label="[[localize('languages','languages',language)]]" value="[[patientRight.loadedData.languages]]" readonly=""></paper-input>
                            </div>

                            <div class="content-patient">
                                <div class="header-content">[[localize('adds','Addresses',language)]]</div>
                                <template is="dom-repeat" items="[[patientRight.patient.addresses]]" as="add">
                                    <div class="line">
                                        <paper-input class="small" label="[[localize('type','address type',language)]]" value="[[localize(add.addressType,add.addressType,language,patientRight)]]" readonly=""></paper-input>
                                        <paper-input class="hyper-with-small" label="[[localize('address','address',language)]]" value="[[_getAddress(add,patientRight)]]" readonly=""></paper-input>
                                    </div>
                                    <div class="line">
                                        <template is="dom-repeat" items="[[add.telecoms]]" as="tel">
                                            <div class="content-patient">
                                                <div class="line">
                                                    <paper-input class="large" label="[[localize('type','telecom type',language)]]" value="[[localize(tel.telecomType,tel.telecomType,language,patientRight)]]" readonly=""></paper-input>
                                                    <paper-input class="hyper-large" label="[[localize('number_address','number address',language)]]" value="[[tel.telecomNumber]]" readonly=""></paper-input>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>

                            <div class="content-patient">
                                <div class="header-content">[[localize('insurances','Insurances',language)]]</div>
                                <template is="dom-repeat" items="[[patientRight.patient.insurabilities]]" as="ins">
                                    <div class="line">
                                        <paper-input class="hyper-large" label="[[localize('adm_in','adm_in',language)]]" value="[[ins.insuranceId]]" readonly=""></paper-input>
                                        <paper-input class="large" label="[[localize('membership','membership',language)]]" value="[[ins.identificationNumber]]" readonly=""></paper-input>
                                    </div>
                                    <div class="line">
                                        <paper-checkbox checked="[[ins.parameters.paymentapproval]]">[[localize('pay_ok','pay_ok',language)]]</paper-checkbox>
                                        <paper-input class="hyper-small" label="[[localize('tc1','tc1',language)]]" value="[[ins.parameters.tc1]]" readonly=""></paper-input>
                                        <paper-input class="hyper-small" label="[[localize('tc2','tc2',language)]]" value="[[ins.parameters.tc2]]" readonly=""></paper-input>
                                        <paper-input class="medium" label="[[localize('ins_start_date','startDate',language)]]" value="[[_formatDate(ins.startDate,patientRight)]]" readonly=""></paper-input>
                                        <paper-input class="medium" label="[[localize('ins_end_date','endDate',language)]]" value="[[_formatDate(ins.endDate,patientRight)]]" readonly=""></paper-input>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="buttons">
                <paper-button on-tap="close" class="button">[[localize("clo","Close",language)]]</paper-button>
                <template is="dom-if" if="[[!selectionMode]]">
                    <paper-button on-tap="swapSelectionMode" class="button button--save">Select master patient</paper-button>
                </template>
                <template is="dom-if" if="[[selectionMode]]">
                    <paper-button on-tap="swapSelectionMode" class="button button--other">retour</paper-button>
                    <paper-button on-tap="merge" class="button button--save" disabled="[[_isDisabled(masterSelect)]]">Fusionner</paper-button>
                </template>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-fusion-dialog';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          language: {
              type: String
          },
          i18n:{
              type: Object
          },
          opened:{
              type: Boolean,
              value:false
          },
          patients:{
              type: Array,
              value:{}
          },
          selected:{
              type: Object,
              value:{},
              observer:"_onSelectedChanged"
          },
          patientLeft:{
              type: Object,
              value:null,
              observer:"_patientLeftChanged"
          },
          patientRight:{
              type: Object,
              value:null,
              observer:"_patientRightChanged"
          },
          selectionMode:{
              type:Boolean,
              value: false
          },
          masterSelect:{
              type: Object,
              value: null
          },
          isCheckingEvent: {
              type:Boolean,
              value:false
          }
      }
  }

  static get observers() {
      return []
  }

  constructor() {
      super();
  }

  ready() {
      super.ready();
  }

  open(patients){
      this.set("patientLeft",null)
      this.set("patientRight",null)
      if(patients && patients.length>=2){
          return Promise.all(patients.map(pat =>{
              return this.api.contact().findBy(this.user.healthcarePartyId,pat).then(ctcs =>{ return {patient : pat,contacts: ctcs || [],loadedData:{user:"",languages:""}}})
          })).then(patAndCtc =>{
              this.set("patients",patAndCtc)
              this.set("selectionMode",false)
              this.set("masterSelect",null)
              this.set("opened",true)
          })
      }
  }

  close(){
      this.set("patientLeft",null)
      this.set("patientRight",null)
      this.set("patients",null)
      this.set("selectionMode",false)
      this.set("masterSelect",null)
      this.set("opened",false)
  }

  select(indexes){
      indexes && indexes.length && indexes.forEach(index => {
          this.set("selected",index)
      })
  }

  _onSelected(e){
      this.set("selected",e.detail.value)
  }

  _onSelectedChanged(select) {
      if(typeof select !=="number" || select<0)return;
      if(this.isCheckingEvent){
          this.set("isCheckingEvent",false);
          this.set("selected",-1)
          return;
      }
      if(this.patientLeft===this.patients[select]){
          this.set("patientLeft",null)
          this.$["patient-listbox"].children[select].classList.remove("orange")
      }else if(this.patientRight===this.patients[select]){
          this.set("patientRight",null)
          this.$["patient-listbox"].children[select].classList.remove("grey")
      }else if(!this.patientLeft || _.isEmpty(this.patientLeft)){
          this.set("patientLeft",this.patients[select])
          this.$["patient-listbox"].children[select].classList.add("orange")
      }else if(!this.patientRight || _.isEmpty(this.patientRight)){
          this.set("patientRight",this.patients[select])
          this.$["patient-listbox"].children[select].classList.add("grey")
      }else{
          this.shadowRoot.querySelectorAll("paper-material").forEach(value => value.classList.remove("orange"))
          this.set("patientLeft",this.patients[select])
          this.$["patient-listbox"].children[select].classList.add("orange")
      }

      if(this.patientLeft && this.masterSelect===this.patientLeft.patient.id){
          this.$["orange-selected-patient-pannel"].classList.add("selected")
      }else if(this.$["orange-selected-patient-pannel"].classList.contains("selected")){
          this.$["orange-selected-patient-pannel"].classList.remove("selected")
      }
      if(this.patientRight && this.masterSelect===this.patientRight.patient.id){
          this.$["grey-selected-patient-pannel"].classList.add("selected")
      }else if(this.$["grey-selected-patient-pannel"].classList.contains("selected")){
          this.$["grey-selected-patient-pannel"].classList.remove("selected")
      }

      this.set("selected",-1)
  }

  _patientNameDescrip(pat){
      return (pat.gender==="male" ? "M " : pat.gender==="female" ? "Mme " : "")+pat.firstName+" "+pat.lastName;
  }

  _formatDate(date){
      return date ? this.api.moment(date).format("DD/MM/YYYY") : ""
  }

  _getAge(patient){
      return  patient.dateOfBirth ? this.api.getCurrentAgeFromBirthDate(patient.dateOfBirth,( e , s ) => this.localize(e, s, this.language)) : '';
  }

  _picture(pat) {
      if (!pat) {
          return require('../../../../images/male-placeholder.png');
      }
      return pat.picture ? 'data:image/png;base64,' + pat.picture : (pat.gender && pat.gender.substr(0,1).toLowerCase() === 'f') ? require('../../../../images/female-placeholder.png') : require('../../../../images/male-placeholder.png');
  }

  _patientLeftChanged(){
      if(_.isEmpty(this.patientLeft)){
          return;
      }
      if(this.patientLeft.loadedData.languages===""){
          this.set("patientLeft.loadedData.languages",(this.patientLeft.patient.languages && this.patientLeft.patient.languages.length) ? this.patientLeft.patient.languages.reduce((acc,lang) => acc+" "+lang) : "")
      }
      if(this.patientLeft.loadedData.user==="" && !!this.patientLeft.patient.preferredUserId && this.patientLeft.patient.preferredUserId!==""){
          this.api.user().getUser(this.patientLeft.patient.preferredUserId)
              .then(user => this.set("patientLeft.loadedData.user",user.name))
      }
  }

  _patientRightChanged(){
      if(_.isEmpty(this.patientRight)){
          return;
      }
      if(this.patientRight.loadedData.languages===""){
          this.set("patientRight.loadedData.languages",(this.patientRight.patient.languages && this.patientRight.patient.languages.length) ? this.patientRight.patient.languages.reduce((acc,lang) => acc+" "+lang) : "")
      }
      if(this.patientRight.loadedData.user==="" && !!this.patientRight.patient.preferredUserId && this.patientRight.patient.preferredUserId!==""){
          this.api.user().getUser(this.patientRight.patient.preferredUserId)
              .then(user => this.set("patientRight.loadedData.user",user.name))
      }
  }

  _getAddress(address){
      return address.country+", "+address.postalCode+" "+address.city+": "+address.street+" n°"+address.houseNumber+address.postboxNumber
  }

  merge(patient){
      if(this.masterSelect)patient=this.patients.find(pat=> pat.patient.id===this.masterSelect).patient;
      let listIds = this.patients.filter(pat => pat.patient.id!==patient.id).map(pat => pat.patient.id).join()
      if (patient) {
          this.close()
          this.api.patient().mergeIntoWithUser(this.user, patient.id, listIds).then(response => {
              this.dispatchEvent(new CustomEvent('patient-merged', {
                  detail: {ok: true, patientId: patient.id},
                  bubbles: true,
                  composed: true
              }))
          }).catch(err=>{
              this.dispatchEvent(new CustomEvent('patient-merged', {
                  detail: {ok:false,patientId:null},
                  bubbles: true,
                  composed: true
              }))
          })
      }else {
          this.close()
          this.dispatchEvent(new CustomEvent('patient-merged', {
              detail: {ok:false,patientId:null},
              bubbles: true,
              composed: true
          }))
      }
  }

  swapSelectionMode(){
      this.set("masterSelect",null)
      if(this.$["orange-selected-patient-pannel"].classList.contains("selected")){
          this.$["orange-selected-patient-pannel"].classList.remove("selected")
      }
      if(this.$["grey-selected-patient-pannel"].classList.contains("selected")){
          this.$["grey-selected-patient-pannel"].classList.remove("selected")
      }
      this.set("selectionMode",!this.selectionMode)
  }

  changeMaster(e){
      e.stopPropagation()
      e.preventDefault();
      if(!this.selectionMode)return;
      this.set("isCheckingEvent",e.type==="checked-changed" ? true : false)
      this.set("masterSelect",(e.type==="checked-changed" && !e.detail.value)? null : (this.masterSelect===e.target.patient) ? null : e.target.patient)

      if(this.patientLeft && this.masterSelect===this.patientLeft.patient.id){
          this.$["orange-selected-patient-pannel"].classList.add("selected")
      }else if(this.$["orange-selected-patient-pannel"].classList.contains("selected")){
          this.$["orange-selected-patient-pannel"].classList.remove("selected")
      }
      if(this.patientRight && this.masterSelect===this.patientRight.patient.id){
          this.$["grey-selected-patient-pannel"].classList.add("selected")
      }else if(this.$["grey-selected-patient-pannel"].classList.contains("selected")){
          this.$["grey-selected-patient-pannel"].classList.remove("selected")
      }
  }

  _isMaster(id){
      return id===this.masterSelect;
  }

  _isDisabled(){
      return !(this.masterSelect!==null && this.masterSelect!=="")
  }
}

customElements.define(HtPatFusionDialog.is, HtPatFusionDialog);
