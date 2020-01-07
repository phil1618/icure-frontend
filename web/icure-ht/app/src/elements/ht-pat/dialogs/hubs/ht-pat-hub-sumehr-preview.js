import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import './ht-pat-hub-transaction-preview.js';
import './ht-pat-hub-utils.js';
import * as models from 'icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

class HtPatHubSumehrPreview extends Polymer.TkLocalizerMixin(Polymer.mixinBehaviors([Polymer.IronResizableBehavior], Polymer.Element)) {
  static get template() {
    return Polymer.html`
        <style include="dialog-style scrollbar-style">

            #sumehrPreviewDialog{
                height: calc(95% - 12vh);
                width: 95%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            #historyViewer{
                height: calc(92% - 12vh);
                width: 92%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .title{
                height: 30px;
                width: auto;
                font-size: 20px;
            }

            .content{
                display: flex;
                height: calc(98% - 140px);
                width: auto;
                margin: 1%;
            }

            .hubDocumentsList{
                display: flex;
                height: 100%;
                width: 50%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
            }

            .hubDocumentsList2{
                height: 100%;
                width: 30%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
                overflow: auto;
            }

            .hubDocumentViewer{
                display: flex;
                height: 100%;
                width: 70%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
            }

            #transaction-list{
                height: 100%;
                width: 100%;
                max-height: 100%;
                overflow: auto;
            }

            #htPatHubTransactionPreViewer{
                height: 98%;
                width: 100%;
                max-height: 100%;
            }

            .sublist{
                background:var(--app-light-color);
                padding:0;
                border-radius:0 0 2px 2px;
            }

            collapse-buton{
                --iron-collapse: {
                    padding-left: 0px !important;
                };

            }

            ht-spinner {
                height: 42px;
                width: 42px;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }

            .documentListContent{
                margin: 1%;
                width: auto;
            }

            .modal-title {
                background: var(--app-background-color-dark);
                margin-top: 0;
                padding: 16px 24px;
            }

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
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

            .sumehrPreviewDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .historyViewer{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .hub-menu-list{
                height: 100%;
                width: 30%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                overflow: auto;
                position: relative;
            }

            .hub-menu-view{
                height: 100%;
                width: 70%;
            }

            .hub-menu-list-header{
                height: 48px;
                width: 100%;
                border-bottom: 1px solid var(--app-background-color-darker);
                background-color: var(--app-background-color-dark);
                padding: 0 12px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;
            }

            .hub-menu-list-header-img{
                height: 40px;
                width: 40px;
                background-color: transparent;
                margin: 4px;
                float: left;
            }

            .hub-menu-list-header-info{
                margin-left: 12px;
                display: flex;
                align-items: center;
            }

            .hub-menu-list-header-img img{
                width: 100%;
                height: 100%;
            }

            .hub-name{
                font-size: var(--font-size-large);
                font-weight: 700;
            }

            .menu-item-icon{
                height: 20px;
                width: 20px;
                padding: 0px;
            }

            collapse-button[opened] .menu-item-icon{
                transform: scaleY(-1);
            }

            .bold {
                font-weight: bold;
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

            .table-line-menu .date{
               width: 100%;
                padding-right: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .table-line-menu .type{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 35%;
            }

            .table-line-menu .auth{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 45%
            }

            .table-line-menu .pat{
                width: 4%;
                padding-right: 4px;
                padding-left: 4px;
            }

            .table-line-menu .dateTit{
                width: 14%;
                padding-right: 10px;
            }

            .table-line-menu .typeTit{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 35%;
                white-space: nowrap;
            }

            .table-line-menu .authTit{
                padding-left:4px;
                padding-right:4px;
                width: 45%;
            }

            .table-line-menu .patTit{
                width: 4%;
                padding-left: 4px;
                padding-right: 4px;
                text-align: center;
                padding-left: var(--padding-menu-item_-_padding-left);
            }

            .never::after{
                background-color: var(--app-status-color-nok)
            }

            .yes::after{
                background-color: var(--app-status-color-ok)
            }

            .no::after{
                background-color: var(--app-status-color-pending)
            }

            .pat-access{
                height: 16px;
                width: 16px;
                position: relative;
                color: var(--app-text-color);
            }

            .pat-access::after{
                position: absolute;
                display: block;
                content: '';
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                height: 6px;
                width: 6px;
                border-radius: 50%;
            }

            .hub{
                text-transform: uppercase;
            }
            
            .tab-selector {
                height: 48px;
                background: var(--app-secondary-color-light);
            }

            .content{
                max-height: calc(100% - 45px);
            }

            .pageContent{
                padding: 12px;
                width: auto;
                box-sizing: border-box;
            }

            .modalDialog {
                height: 500px;
                width: 800px;
            }

            /*Local style mods*/
            iron-pages{
                height: calc(100% - 48px);
                width: auto;
                overflow: auto;
            }

            .hub-submenu-title {
                padding-left: 12px;
            }

            .hub-menu-view {
                width: 85%;
            }

            .hub-menu-list{
                width: 15%;
            }

            #commentDialog .content {
                padding: 0 12px;
                display: block;
                height: calc(100% - 120px);
                margin: 0%;
            }

        </style>

        <paper-dialog id="sumehrPreviewDialog">
            <div class="content sumehrPreviewDialog">
                <div class="hub-menu-list">
                    <div class="hub-menu-list-header">
                        <div class="hub-menu-list-header-img">
                            <template is="dom-if" if="[[_isEqual(curHub,'rsw')]]">
                                <img src="../../../../../images/rsw-icn.png">
                            </template>
                            <template is="dom-if" if="[[_isEqual(curHub,'vitalink')]]">
                                <img src="../../../../../images/vitalink-icn.png">
                            </template>
                            <template is="dom-if" if="[[_isEqual(curHub,'rsb')]]">
                                <img src="../../../../../images/rsb-icn.png">
                            </template>
                        </div>
                        <div class="hub-menu-list-header-info">
                            <div class="hub-name">
                                [[localize('hub','Hubs',language)]] <span class="hub">[[curHub]]</span>
                            </div>
                        </div>

                    </div>
                    <div class="hub-submenu-container">
                        <div class="hub-submenu-title">
                        </div>
                    </div>
                </div>
                <div class="hub-menu-view">
                    <ht-pat-hub-transaction-preview id="htPatHubTransactionPreViewer" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload"></ht-pat-hub-transaction-preview>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeDialogs">[[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_openCommentDialogTest" disabled="[[isLoading]]"><iron-icon icon="icons:cloud-download"></iron-icon> [[localize('export_sumehr','Export Sumehr',language)]]</paper-button>
                <template is="dom-if" if="[[_allowUpload(hubSumehrReady, noHubUpload)]]">
                    <paper-button class="button button--save" on-tap="_openCommentDialog" disabled="[[isLoading]]"><iron-icon icon="icons:cloud-upload"></iron-icon> [[localize('upload_sumehr','Upload sumehr',language)]]</paper-button>
                </template>
            </div>
        </paper-dialog>

        <paper-dialog class="modalDialog" id="commentDialog" no-cancel-on-outside-click="">
            <h2 class="modal-title">
                <iron-icon icon="vaadin:comment-o"></iron-icon>
                [[localize('des','Description',language)]]
            </h2>
            <div class="content">
                <ht-spinner active="[[uploading]]"></ht-spinner>
                <template is="dom-if" if="[[!uploading]]">
                    <p><dynamic-text-area value="{{myComment}}" label="[[localize('des','Description',language)]]"></dynamic-text-area></p>
                    <template is="dom-if" if="[[putError]]">
                            <vaadin-grid id="he-list" class="vaadinStyle" items="[[putError.errors]]">
                                <vaadin-grid-column>
                                    <template class="header">
                                        [[localize('code','code',language)]]
                                    </template>
                                    <template>
                                        [[item.code]]
                                    </template>
                                </vaadin-grid-column>
                                <vaadin-grid-column>
                                    <template class="header">
                                        [[localize('desc','Description',language)]]
                                    </template>
                                    <template>
                                        [[getPutErrorDesc(item)]]
                                    </template>
                                </vaadin-grid-column>
                            </vaadin-grid>
                    </template>
                </template>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeCommentDialog">[[localize('clo','Close',language)]]</paper-button>
                <template is="dom-if" if="[[isTest]]">
                    <paper-button class="button button--save" on-tap="_generateSumehrV2"><iron-icon icon="icons:cloud-download"></iron-icon> [[localize('export_sumehr','Export Sumehr',language)]]</paper-button>
                </template>
                <template is="dom-if" if="[[!isTest]]">
                    <paper-button class="button button--save" on-tap="_runPutSumehrV2WithGetTransaction" disabled="[[uploading]]"><iron-icon icon="icons:backup"></iron-icon> [[localize('upload_sumehr','Upload sumehr',language)]]</paper-button>
                </template>
            </div>
        </paper-dialog>
        <ht-pat-hub-utils id="htPatHubUtils" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload" on-close-hub-dialog="_closeOverlay"></ht-pat-hub-utils>
`;
  }

  static get is() {
      return 'ht-pat-hub-sumehr-preview';
  }

  static get properties() {
      return {
          api: {
              type: Object,
              value: null
          },
          user: {
              type: Object,
              value: null
          },
          language: {
              type: String
          },
          opened: {
              type: Boolean,
              value: false
          },
          patient:{
            type: Object
          },
          currentContact:{
              type: Object
          },
          tabs: {
              type:  Number,
              value: 0
          },
          isLoading:{
              type: Boolean,
              value: false
          },
          activeItem: {
              type: Object,
              observer: '_activeItemChanged'
          },
          eidCardNumber:{
              type: String,
              value : '',
          },
          isiCardNumber:{
              type: String,
              value : '',
          },
          curHub:{
              type: String,
              value: null,
              observer: '_curHubChanged'
          },
          curEnv:{
              type: String,
              value: null
          },
          hubId:{
              type: Number,
              value : 0
          }
          ,
          hubEndPoint:{
              type: String,
              value:'https://acchub.reseausantewallon.be/HubServices/IntraHub/V3/IntraHub.asmx'
          },
          hubPackageId:{
              type: String,
              value:null
          },
          hubApplication : {
              type: String,
              value:null
          },
          hubSupportsConsent:{
              type: Boolean,
              value: false
          },
          hcpHubConsent:{
              type: Object
          },
          patientHubConsent:{
              type: Object
          },
          patientHubTherLinks:{
              type: Object
          },
          patientHubInfo:{
              type: Object
          },
          hcpZip:{
              type:String,
              value:'1000'
          },
          hubTransactionList:{
              type: Array,
              value: function(){
                  return [];
              }
          },
          selectedTransaction:{
              type: Object
          },
          revokeTransactionResp:{
              type: String,
              value: ""
          },
          supportBreakTheGlass:{
              type: Boolean,
              value: false
          },
          breakTheGlassReason:{
              type: String,
              value: null
          },
          newSumehr:{
              type: Object,
              value: null
          },
          hubSumehr:{
              type: Object,
              value: null
          },
          hubSumehrReady:{
              type: Boolean,
              value: false
          },
          hubSumehrXml:{
              type: String,
              value: null
          },
          itemsToExclude:{
              type:Array,
              value: function(){
                  return [];
              }
          },
          newSumehrToLog:{
              type: Object,
              value: null
          },
          updateList:{
              type:Array,
              value: function(){
                  return [];
              }
          },
          parentDialog:{
              type: Object,
              value: null
          },
          viewHistory:{
              type: Boolean,
              value: false
          },
          messageBefore:{
              type: Object,
              value: null
          },
          messageAfter:{
              type: Object,
              value: null
          },
          myComment:{
              type: String,
              value: ""
          },
          isTest:{
              type: Boolean,
              value: false
          },
          uploading:{
              type: Boolean,
              value: false
          },
          putError:{
              type: Object,
              value: null
          },
          noHubUpload:{
              type: Boolean,
              value: false
          },
          backendVersion:{
              type: String,
              value: null
          }
      };
  }

  static get observers() {
      return ['apiReady(api,user,opened)','sumehrChanged(newSumehr)'];
  }

  ready() {
      super.ready();
      document.addEventListener('xmlHubUpdated', () => this.xmlHubListener() );
  }

  _dateFormat(date) {
      return date ? this.api.moment(date).format('DD/MM/YYYY') : '';
  }

  apiReady() {
      if (!this.api || !this.user || !this.user.id || !this.opened) return;

      try {
      } catch (e) {
          console.log(e);
      }
  }

  attached() {
      super.attached();
      this.async(this.notifyResize, 1);
  }

  open(hubSumehrPromise, parentDialog, hubSumehrXmlPromise, noHubUpload) {
      this.set('hubSumehrReady', false);
      this.set('isLoading',true);
      this.set('parentDialog', parentDialog);
      this.$['sumehrPreviewDialog'].open();
      this.$['htPatHubTransactionPreViewer'].open(this,  null);
      this.set('message', null);
      this.set("uploading", false);
      this.set('updateList', []);
      this.set('selectedTransaction', null);
      this.set('hubSumehr', null);
      this.set('newSumehr', null);
      this.set('hubSumehrXml', null)
      this.set('noHubUpload', noHubUpload ? true : false);
      this.set('putTransactionResponse', null);
      this.set("itemsToExclude", []);
      if(hubSumehrPromise){
          hubSumehrPromise.then(tranResp => {
              this.set('hubSumehr', tranResp);
              this._refresh();
              this._runPreviewSumehr();
              this.set('isLoading',false);
              this.set('hubSumehrReady', true);
          }).catch( error=> {
              this.set('message', null);
              console.log('getTransaction failed : ' + error);
              this.set('isLoading',false);
          })
      }
      else{
          this._refresh();
          this.set('hubSumehrReady', true);
          this.set('hubSumehr', null);
          this._runPreviewSumehr();
          this.set('isLoading',false);
      }
      if(hubSumehrXmlPromise){
          hubSumehrXmlPromise.then(resp => this.set('hubSumehrXml', resp));
      }else{
          this.set('hubSumehrXml', null);
      }
  }

  _refresh(){
      const propHub = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.preferredhub') ||
          (this.user.properties[this.user.properties.length] = {
              type: {identifier: 'org.taktik.icure.user.preferredhub'},
              typedValue: {type: 'STRING', stringValue: 'rsw'}
          })

      const propEnv = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.eHealthEnv') ||
          (this.user.properties[this.user.properties.length] = {
              type: {identifier: 'org.taktik.icure.user.eHealthEnv'},
              typedValue: {type: 'STRING', stringValue: 'prd'}
          })
      this.set("curHub", propHub.typedValue.stringValue);
      this.set("curEnv", propEnv.typedValue.stringValue);
      this.set("supportBreakTheGlass", false);
      this._setHub();
  }

  _enableBreakTheGlass(btg){
      return btg;
  }

  _enableTransactionList(hubconsent, supportConsent){
      return this._patientHasHubConsent(hubconsent)|| !supportConsent;
  }

  _enableRegisterConsent(hubconsent, supportConsent){
      return !this._patientHasHubConsent(hubconsent) && supportConsent;
  }

  _enableRevokeConsent(hubconsent, supportConsent){
      return this._patientHasHubConsent(hubconsent) && supportConsent;
  }

  _allowUpload(){
      return this.hubSumehrReady && !this.noHubUpload
  }
  _curHubChanged(){
      this._setHub();
  }

  _setHub(){
      const hubConfig = this.$["htPatHubUtils"].getHubConfig(this.curHub, this.curEnv);
      //this.set('isLoading',true);
      this.set('hcpHubConsent', null);
      this.set('patientHubConsent', null);
      this.set('patientHubTherLinks', null);
      this.set('hubTransactionList', null);
      this.set('patientHubInfo', null);
      this.set('breakTheGlassReason', null);

      this.hubId = hubConfig.hubId;
      this.hubEndPoint = hubConfig.hubEndPoint;
      this.set("hubSupportsConsent", hubConfig.hubSupportsConsent);
      this.hubPackageId = hubConfig.hubPackageId;
      this.hubApplication = hubConfig.hubApplication;
      this.set("supportBreakTheGlass", hubConfig.supportBreakTheGlass);

      //this.set('isLoading', false);
  }

  close() {
      this.$.dialog.close();
  }

  _activeItemChanged(item){

  }

  _sumehrInfo(sumehr){
      return sumehr && sumehr.header && sumehr.header.ids ? "ID_KMEHR=" + sumehr.header.ids.find(id => id.s === "ID_KMEHR").value : "";
  }

  _openTransactionViewer(e){
      e.stopPropagation();
      if(e && e.target && e.target.item) {
          this.set("selectedTransaction", e.target.item)
          if(this.$['htPatHubTransactionPreViewer']) this.$['htPatHubTransactionPreViewer'].open( e.target.item, this._getHubTransactionMessage( e.target.item));
      }
  }

  _openCommentDialog(e){
      e.stopPropagation();
      this.set("putError", null);
      this.set("isTest", false);
      if(this.$['commentDialog']) this.$['commentDialog'].open();
  }

  _openCommentDialogTest(e){
      e.stopPropagation();
      this.set("putError", null);
      this.set("isTest", true);
      if(this.$['commentDialog']) this.$['commentDialog'].open();
  }

  _closeCommentDialog(e){
      e.stopPropagation();
      this.set("uploading", false);
      if(this.$['commentDialog']) this.$['commentDialog'].close();
  }

  _runPutSumehrV2WithGetTransaction(){
      this.set("uploading", true);
      this.set("putError", null);
      this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp => {
          if(hcp.speciality && hcp.speciality.startsWith("pers")){
          }  else {
              console.log("hcp type changed, was ", hcp.type);
              hcp.speciality = "persphysician";
          }
          if(hcp.specialityCodes &&  hcp.specialityCodes.filter(spec => !spec.code.startsWith("pers")).length > 0){
              console.log("hcp specialityCodes changed, was ", hcp.specialityCodes);
              hcp.specialityCodes = [{
                      "code": "persphysician",
                      "type": "CD-HCPARTY",
                      "version": "1",
                      "id": "CD-HCPARTY|persphysician|1"}]
          }
          return this.api.hcparty().modifyHealthcareParty(hcp);
      }).then(hcp =>
      {
          console.log("hcp", hcp)
          this.generateAndPutSumehrV2().then(putResp => {
              this.set('putTransactionResponse', putResp);
              console.log("putTransactionResponse = ", putResp);
              if (putResp && putResp.id && putResp.id.length && putResp.id[0].value) {
                  console.log("putNRevoke: new transaction id", putResp.id[0].value);
                  let transaction = {ids: putResp.id, cds: [{value: "sumehr"}]};
                  this.parentDialog._getHubTransactionMessage(transaction).then(getResp => {
                      console.log("new transaction on hub", getResp);
                      const updateReference = this.api.crypto().randomUuid();
                      this._logUpdateMessage(JSON.stringify(getResp), "new", updateReference, "text/xml").then(() => this._logUpdateMessage(JSON.stringify(this.hubSumehr), "old", updateReference, "text/xml")).then(() => {
                          if (this.hubSumehr) {
                              if (this.hubSumehr.folders[0].transactions[0].ids && this.hubSumehr.folders[0].transactions[0].ids.find(id => id.value === putResp.id[0].value)) {
                                  console.log("putNRevoke: id to revoke is same as new id, don't revoke", this.hubSumehr.folders[0].transactions[0].ids);
                                  this.parentDialog._runGetTransactionList();
                                  this.set("uploading", false);
                                  if (this.$['commentDialog']) this.$['commentDialog'].close();
                                  this.$["sumehrPreviewDialog"].close();
                              } else {
                                  console.log("putNRevoke: id to revoke", this.hubSumehr.folders[0].transactions[0].ids);
                                  if (this.hubSumehr && this.hubSumehr.folders) this.parentDialog._revokeHubTransaction(this.hubSumehr.folders[0].transactions[0]).then(r => {
                                      console.log(r)
                                      this.parentDialog._runGetTransactionList();
                                      this.set("uploading", false);
                                      if (this.$['commentDialog']) this.$['commentDialog'].close();
                                      this.$["sumehrPreviewDialog"].close();
                                  });
                              }
                          } else {
                              console.log("there was no sumehr on the hub yet");
                              this.parentDialog._runGetTransactionList();
                              this.set("uploading", false);
                              if (this.$['commentDialog']) this.$['commentDialog'].close();
                              this.$["sumehrPreviewDialog"].close();
                          }
                      });
                  });
              } else {
                  console.log("a put transaction error occured", putResp);
                  this.set("putError", putResp);
                  this.set("uploading", false);
              }
              ;
          }).catch(error => {
              console.log(error);
              this.set("uploading", false);
          });
      });
  }

  getPutErrorDesc(error){
      return error.descr.includes("_||_") ? error.descr.split("_||_")[1] : error.descr;
  }

  generateAndPutSumehrV2(){
      if (this.patient && this.patient.ssin && this.api.tokenId) {
          const excludedIds = this._getItemsToExclude();
          return this.api.icure().getVersion().then(v => {
              this.set("backendVersion", v)
          return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
              this.api.patient().getPatientWithUser(this.user,this.patient.id)
                  .then(patientDto =>
                      this.api.crypto().extractDelegationsSFKs(patientDto, this.user.healthcarePartyId)
                          .then(secretForeignKeys =>
                              this.api.bekmehr().generateSumehrV2ExportWithEncryptionSupport(patientDto.id, this.user.healthcarePartyId, "fr", {
                                  secretForeignKeys: secretForeignKeys.extractedKeys,
                                  recipient: hcp,
                                  comment: this.myComment,
                                  excludedIds : excludedIds,
                                  softwareName : "TOPAZ",
                                  softwareVersion : this.backendVersion
                              }).then(output =>
                                  this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
                                      .then(hcp =>{
                                          let reader = new FileReader();
                                          let me = this;
                                          reader.onload = function() {
                                              //console.log("sumehr = ", reader.result);
                                              me.set("newSumehrToLog", reader.result);
                                          }
                                          reader.readAsText(output);

                                          return this.api.fhc().Hubcontroller().putTransactionUsingPOST(this.hubEndPoint,
                                              this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword,
                                              hcp.lastName, hcp.firstName, hcp.nihii, hcp.ssin, this.hcpZip,
                                              this.hubId,
                                              this.patient.ssin,
                                              output,
                                              this.hubPackageId, this.hubApplication
                                          )}
                                      ).then(putResp => {
                                          if (putResp) {
                                              return putResp;
                                          } else {
                                              return null;
                                          }
                                      }
                                  )
                              )
                          )
                  ))
      })}else{
          return Promise.resolve(null)
      }
  }

  _isEqual(a,b) {
      return (a === b)
  }

  sumehrChanged(sumehr){
      if(this.$['htPatHubTransactionPreViewer']) this.$['htPatHubTransactionPreViewer'].open(this,  sumehr, this.hubSumehr, this.hubSumehrXml);
  }

  _logUpdateMessage(message, messageName, updateReference, mime){
      //updateRerence --> uuid to link old and new sumehr
      if(message){
          return this.api.message().newInstance(this.user)
              .then(nmi => this.api.message().createMessage(_.merge(nmi, { //creation of container message
                      transportGuid: "HUB:OUT:UPDATE-SUMEHR",
                      recipients: [this.user && this.user.healthcarePartyId],
                      metas: {filename: messageName,
                          mediaType: "hub",
                          updateReference: updateReference}, //-->"hub",
                      toAddresses: [_.get(this.user, 'email', this.user && this.user.healthcarePartyId)], //email needed ?
                      subject: "Hub Sumehr Update",
                      status : 0 | 1<<25 | (this.patient.id ? 1<<26 : 0)
                  }))
                      .then(createdMessage => Promise.all([createdMessage,
                          this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("encrypt",
                              this.user, createdMessage,
                              this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(JSON.stringify({patientId : this.patient.id, isAssigned: true}))))]))
                      .then(([createdMessage, cryptedMeta]) => {
                          createdMessage.metas.cryptedInfo = Base64.encode(String.fromCharCode.apply(null, new Uint8Array(cryptedMeta)))
                          return this.api.message().modifyMessage(createdMessage)
                      })
                      .then(createdMessage => this.api.document().newInstance(this.user, createdMessage, { //creation of first document (before)
                          documentType: 'sumehr',
                          mainUti: this.api.document().uti(mime),
                          name: "sumehrUpdate_" + messageName + "_" +moment().format("YYYYMMDDhhmmss")
                      }))
                      .then(newDocInstance => this.api.document().createDocument(newDocInstance))
                      .then(createdDocument => this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("encrypt", this.user, createdDocument, this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(message)))
                          .then(encryptedFileContent => ({createdDocument, encryptedFileContent })))
                      .then(({createdDocument, encryptedFileContent}) => this.api.document().setAttachment(createdDocument.id, null, encryptedFileContent))
                      .then(resourcesObject => {
                          //Import into currentContact
                          let sc = this.currentContact.subContacts.find(sbc => (sbc.status || 0) & 64);
                          if (!sc) {
                              sc = { status: 64, services: [] };
                              this.currentContact.subContacts.push(sc);
                          }
                          const svc = this.api.contact().service().newInstance(this.user, {
                              content: _.fromPairs([[this.language, { documentId: resourcesObject.id, stringValue: resourcesObject.name }]]),
                              label: 'document',
                              tags: [{type: 'CD-TRANSACTION', code: 'sumehr'}]
                          });
                          this.currentContact.services.push(svc);
                          sc.services.push({ serviceId: svc.id });

                          this.saveCurrentContact().then(c => {
                              this.dispatchEvent(new CustomEvent('hub-download', {}))
                          }).then(res => res);
                          
                      }).finally(() => {
                          console.log("finally of _logUpdateMessage")
                      }).catch(e => {
                          console.log("---error upload attachment---", e)
                      })
              )
      }else{
          return Promise.resolve(null);
      }
  }

  saveCurrentContact() {
      if(!this.currentContact.id ) {
          this.currentContact.id = this.api.crypto().randomUuid()
      }
      return (this.currentContact.rev ? this.api.contact().modifyContactWithUser(this.user, this.currentContact) : this.api.contact().createContactWithUser(this.user, this.currentContact)).then(c=>this.api.register(c,'contact')).then(c => (this.currentContact.rev = c.rev) && c);
  }

  getAttachment(doc) {
      return this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, doc.id, _.size(doc.encryptionKeys) ? doc.encryptionKeys : doc.delegations).then(
          ({extractedKeys: enckeys}) => this.api.document().getAttachment(_.trim(_.get(doc,"id","")), _.trim(_.get(doc,"attachmentId","")), enckeys.join(','))
      ).catch(err => {
          return err;
      })
  }

  _runPreviewSumehr(){
      this.set("itemsToExclude", []);
      console.log("Getting sumehr preview data");

      this._getSumehrV2Preview().then(resp => this.api.patient().getPatientsWithUser(this.user, new models.ListOfIdsDto({ids: resp.partnerships.map(ps => ps.partnerId)})).then(pats => {
          resp.partnerships.forEach(ps => ps.patient = pats.find(pat => pat.id === ps.partnerId));
          return resp
      }).then(resp => {
          if(resp.patientHealthcareParties && resp.patientHealthcareParties.length > 0){
              return this.api.hcparty().getHealthcareParties(resp.patientHealthcareParties.map(ph => ph.healthcarePartyId).join());
          }else{
              return [];
          }
      }).then(hcps => {
          resp.patientHealthcareParties.forEach(ph => ph.healthcareParty = hcps.find(hcp => hcp && hcp.id && (hcp.id === ph.healthcarePartyId)));
          return resp
      }).then(resp => {
          resp.patientHealthcareParties.forEach(ph => {
              ph.referralPeriods.forEach(rp => {
                  rp.formattedStartDate = rp.startDate ? this.api.moment(rp.startDate).format('DD/MM/YYYY') : "";
                  rp.formattedEndDate = rp.endDate ? this.api.moment(rp.endDate).format('DD/MM/YYYY') : "";
                  if (rp.endDate) ph.ended = true;
              })
          })
          resp.patientHealthcareParties = resp.patientHealthcareParties.filter(ph => !ph.ended);
          console.log(resp);
          this.set('newSumehr', resp);
          })
      );
  }

  _getItemsToExclude(){
      const items =  this.$['htPatHubTransactionPreViewer'].getIdsToExclude();
      console.log("exclude = " + items);
      this.set("itemsToExclude", items);
      return items;
  }

  _getSumehrV2Preview(){
      if (this.patient) {
          return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
              this.api.patient().getPatientWithUser(this.user,this.patient.id)
                  .then(patientDto =>
                      this.api.crypto()
                          .extractDelegationsSFKs(patientDto, this.user.healthcarePartyId)
                          .then(secretForeignKeys =>
                      this.api.bekmehricc.getSumehrV2Content(patientDto.id, {
                          secretForeignKeys: secretForeignKeys.extractedKeys,
                          recipient: hcp
                      }).then(resp =>
                          this.api.contacticc.decryptServices(hcp.id, resp.services).then(
                              svcs => {
                                  return resp;
                              }
                          )
                      )
                  ))
          )
      }
  }

  _generateSumehrV2(){
      if (this.patient) {
          const excludedIds = this._getItemsToExclude();
          this.api.icure().getVersion().then(v => {
              this.set("backendVersion", v)
          this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
              this.api.patient().getPatientWithUser(this.user,this.patient.id)
                  .then(patientDto =>
                      this.api.crypto()
                          .extractDelegationsSFKs(patientDto, this.user.healthcarePartyId)
                          .then(secretForeignKeys => {
                              return this.api.bekmehr().generateSumehrV2ExportWithEncryptionSupport(patientDto.id, this.user.healthcarePartyId, "fr", {
                                  secretForeignKeys: secretForeignKeys.extractedKeys,
                                  recipient: hcp,
                                  comment: this.myComment,
                                  excludedIds : excludedIds,
                                  softwareName : "TOPAZ",
                                  softwareVersion : this.backendVersion
                              }).then(output => {
                                  let reader = new FileReader();
                                  const myself = this;
                                  reader.onload = function() {
                                      // console.log("sumehr = ", reader.result);
                                  }
                                  reader.readAsText(output);


                                  //creation of the xml file
                                  let file = typeof output === "string" ? new Blob([output] ,{type: "application/xml"}) : output

                                  //creation the downloading link
                                  let a = document.createElement("a");
                                  document.body.appendChild(a);
                                  a.style = "display: none";

                                  //download the new file
                                  let url = window.URL.createObjectURL(file);
                                  a.href = url;
                                  a.download = (patientDto.lastName || "Doe").replace(" ","_") + "_" + (patientDto.firstName || "John").replace(" ","_") + "_" + (moment().format("x"))+"_sumehr.xml";
                                  a.click();
                                  window.URL.revokeObjectURL(url);

                                  document.body.removeChild(a);

                                  if(this.$['commentDialog']) this.$['commentDialog'].close();
                                  this.$["sumehrPreviewDialog"].close();
                              }).catch( error=> console.log(error))
                          })
                  ))
      })}
  }

  _transactionId(tr){
      this.set('selectedTransaction', tr); //is this needed ?
      if(tr) {
          const idLocal = tr.ids.find(id => id.s === "LOCAL");
          if (idLocal) {
              return idLocal.value;
          }
          else {
              return "--";
          }
      }
      else
      {
          return "";
      }
  }

  _transactionType(tr){
      const cdTransType = tr.cds.find(cd => cd.s === "CD-TRANSACTION");
      if(cdTransType){
          return this.localize("cd-transaction-"+cdTransType.value, cdTransType.value, this.language);
      }
      else {
          return "--";
      }
  }

  _transactionDate(tr){
      if(tr.date) {
          let d = new Date(0);
          d.setUTCMilliseconds(tr.date + (tr.time ? tr.time : 0) );
          return this.api.moment(d).format("DD/MM/YY");
      } else {
          return "";
      }
  }

  _transactionAuthor(tr){
      return _.flatMap(tr.author || [], it => it).filter(it => it.familyname).map(it => it.familyname + " " + it.firstname).join("/");
  }

  _transactionCDHcParties(trn, ignore){
      let a = _.flatMap(trn.author || [], it => it);
      let b = _.flatMap(a || [], it => it.cds.find(cd => cd.s === "CD-HCPARTY"));
      return _.flatMap(b.filter(it  => it !== undefined) || [], it => it.value).filter(it => it !== ignore)
      //return "--"
  }

  _patientAccessCD(tr, sl){
      const cdres = tr && tr.cds && tr.cds.length ? tr.cds.find(cd => cd.sl && cd.sl === sl) : undefined;
      return cdres
  }

  _patientAccessDate(tr){
      const cd1 = this._patientAccessCD(tr, "PatientAccess");
      let d = "";
      if(cd1){
          const cd2 = cd1.value && cd1.value === "yes" ?  this._patientAccessCD(tr, "PatientAccessDate") : undefined;
          d = (cd1.value === "never" ? this.localize(cd1.value, cd1.value, this.language) : "") + " " + (cd2 && cd2.value ? "" + cd2.value + "" : "") + "";
      }

      return d;
  }

  _patientAccessIcon(tr){
      const cd1 = this._patientAccessCD(tr, "PatientAccess");
      let d = "";
      if(cd1){
          const cd2 = cd1.value && cd1.value === "yes" ?  this._patientAccessCD(tr, "PatientAccessDate") : undefined;
          d = (cd1.value === "never" ? this.localize(cd1.value, cd1.value, this.language) : "") + " " + (cd2 && cd2.value ? "" + cd2.value + "" : "") + "";
      }

      return moment().isBefore(moment(_.trim(d), "DD/MM/YYYY")) ? "no" : moment().isSameOrAfter(moment(_.trim(d), "DD/MM/YYYY"))  ? "yes" : "never"

  }

  _getHcPartyTypes(trns, ignore){
      if(trns){
          let a = _.uniq(_.flatMap(trns.map(trn => this._transactionCDHcParties(trn, ignore))))
          return a
      }
      else {
          return "";
      }
  }

  _filterList(list, hcptype){
      //console.log("filterlist")
      return  list && hcptype ? list.filter(itm => itm.author && itm.author.hcparties && itm.author.hcparties.length > 0 && itm.author.hcparties.filter(hcp => hcp.cds && hcp.cds.length > 0 && hcp.cds.find(cd => cd.s && cd.s === "CD-HCPARTY" && cd.value && cd.value === hcptype)).length > 0) : []
  }

  _patientHasHubConsent(cs){
      if((cs && cs.author && cs.author.hcparties && cs.author.hcparties[0]) || !this.hubSupportsConsent){
          return true;
      }
      else{
          return false;
      }
  }

  getHubEndPoint(){
      return this.hubEndPoint;
  }

  _isTransactionSet(tr){
      let cd = tr.cds.find(cd => cd.value.toLowerCase()==='gettransactionset');
      if(cd){
          return true;
      } else {
          return false;
      }
  }

  _getHubTransaction(transaction){
      //getTransactionUsingGET(
      // endpoint: string,
      // xFHCKeystoreId: string, xFHCTokenId: string, xFHCPassPhrase: string,
      // hcpLastName: string, hcpFirstName: string, hcpNihii: string, hcpSsin: string, hcpZip: string,
      // ssin: string, sv: string, sl: string, id: string,
      // hubPackageId?: string, breakTheGlassReason?: string): Promise<string | any>;
      if(transaction && this._isTransactionSet(transaction)) {
          return this._getHubTransactionSet(transaction);
      } else {
          if (this.patient.ssin && this.api.tokenId && transaction) {
              return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
                  .then(hcp =>
                      this.api.fhc().Hubcontroller().getTransactionUsingGET(this.hubEndPoint, this.api.keystoreId,
                          this.api.tokenId, this.api.credentials.ehpassword,
                          hcp.lastName, hcp.firstName, hcp.nihii, hcp.ssin, this.hcpZip,
                          this.patient.ssin,
                          transaction.ids.find(id => id.s === 'LOCAL').sv, transaction.ids.find(id => id.s === 'LOCAL').sl, transaction.ids.find(id => id.s === 'LOCAL').value,
                          this.hubPackageId, this.breakTheGlassReason
                      )
                  ).then(tranResp => {
                          if (tranResp) {
                              return tranResp;
                          } else {
                              return null;
                          }
                      }
                  )
          } else {
              return Promise.resolve(null)
          }
      }
  }

  _putHubTransactionSet(tsXML){
      console.log('---_putHubTransactionSet---');
      console.log(tsXML);
      console.log(this.patient);
      console.log(this.patient.ssin);
      console.log(this.api.tokenId);
      //putTransactionSetUsingPOST(
      // endpoint: string,
      // xFHCKeystoreId: string, xFHCTokenId: string, xFHCPassPhrase: string,
      // hcpLastName: string, hcpFirstName: string, hcpNihii: string, hcpSsin: string, hcpZip: string,
      // hubId: number,
      // patientSsin: string,
      // essage: string,
      // hubPackageId?: string, hubApplication?: string): Promise<models.PutTransactionSetResponse | any>;
      const myblob = new Blob([tsXML]);
      if (this.patient && this.patient.ssin && this.api.tokenId) {
          return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
              this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
                  .then(hcp => this.api.fhc().Hubcontroller().putTransactionSetUsingPOST(this.hubEndPoint,
                      this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword,
                      hcp.lastName, hcp.firstName, hcp.nihii, hcp.ssin, this.hcpZip,
                      this.hubId,
                      this.patient.ssin,
                      myblob,
                      this.hubPackageId, this.hubApplication
                      )
                  ).then(putResp => {
                      if (putResp) {
                          return putResp;
                      } else {
                          return null;
                      }
                  }
              )
          )
      }else{
          return Promise.resolve(null)
      }
  }

  xmlHubListener() {
      this._putHubTransactionSet(document.getElementById('putHubXml').value).then(resp => {
          console.log('---response _putHubTransactionSet---');
          console.log(resp);
          this.set("tsResp", resp);
      })
  }

  _closeDialogs(){
      this.$['sumehrPreviewDialog'].close();
  }

  _hubDownload(e){
      this.dispatchEvent(new CustomEvent('hub-download', {}))
  }

  _localizeHcpType(type){
      return this.localize("cd-hcp-"+type, type, this.language)
  }

  _showHistoryItem(e){
      if(e.target && e.target.dataset && e.target.dataset.item) {
          const item = JSON.parse(e.target.dataset.item);
          console.log(item);
          this.set("messageBefore", JSON.parse(item.oldatt));
          this.set("messageAfter", JSON.parse(item.newatt));
          this.$['htPatHubTransactionViewerBefore'].openHist(this.messageBefore);
          this.$['htPatHubTransactionViewerAfter'].openHist(this.messageAfter);
          this.$["historyViewer"].open();
      }
  }

  _closeHistoryViewer(){
      this.$["historyViewer"].close();
  }
}
customElements.define(HtPatHubSumehrPreview.is, HtPatHubSumehrPreview);
