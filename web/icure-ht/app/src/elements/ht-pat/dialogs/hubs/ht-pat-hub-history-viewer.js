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

class HtPatHubHistoryViewer extends Polymer.TkLocalizerMixin(Polymer.mixinBehaviors([Polymer.IronResizableBehavior], Polymer.Element)) {
  static get template() {
    return Polymer.html`
        <style include="dialog-style scrollbar-style">

            #historyViewer{
                height: calc(95% - 12vh);
                width: 95%;
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

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
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

        <paper-dialog id="historyViewer">
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
                            <ht-spinner active="[[isLoading]]"></ht-spinner>
                            [[localize('hist_sum_change','History of sumehr updates by Topaz',language)]]
                        </div>
                        <template is="dom-if" if="[[!isLoading]]">
                            <paper-listbox class="menu-content sublist" selectable="paper-item" toggle-shift="">
                                <div class="table-line-menu table-line-menu-top">
                                    <div class="dateTit">[[localize('dat','Date',language)]]</div>
                                </div>
                                <template is="dom-repeat" items="[[updateList]]">
                                    <paper-item data-item\$="[[item]]" on-tap="_showHistoryItem">
                                        <div id="subMenu" class="table-line-menu">
                                            <div class="date" data-item\$="[[item]]">[[_dateFormat(item.created)]]</div>
                                        </div>
                                    </paper-item>
                                </template>
                            </paper-listbox>
                        </template>
                    </div>
                </div>
                <div class="hub-menu-view">
                    <paper-tabs class="tab-selector" selected="{{tabs}}">
                        <paper-tab>
                            <iron-icon class="tabIcon" icon="icons:flip-to-back"></iron-icon> [[localize('before','Before',language)]]
                        </paper-tab>
                        <paper-tab>
                            <iron-icon class="tabIcon" icon="icons:flip-to-front"></iron-icon> [[localize('after','After',language)]]
                        </paper-tab>
                    </paper-tabs>
                    <iron-pages selected="[[tabs]]">
                        <page>
                            <div class="pageContent">
                                <ht-pat-hub-transaction-view id="htPatHubTransactionViewerBefore" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload"></ht-pat-hub-transaction-view>
                            </div>
                        </page>
                        <page>
                            <div class="pageContent">
                                <ht-pat-hub-transaction-view id="htPatHubTransactionViewerAfter" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload"></ht-pat-hub-transaction-view>
                            </div>
                        </page>
                    </iron-pages>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeHistoryViewer">[[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
        <ht-pat-hub-utils id="htPatHubUtils" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload" on-close-hub-dialog="_closeOverlay"></ht-pat-hub-utils>
`;
  }

  static get is() {
      return 'ht-pat-hub-history-viewer';
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

  open() {
      this.set('isLoading',true);
      this.set("messageBefore", {});
      this.set("messageAfter", {});
      this.$['htPatHubTransactionViewerBefore'].openHist(this.messageBefore);
      this.$['htPatHubTransactionViewerAfter'].openHist(this.messageAfter);

      this.$['historyViewer'].open();
      this.set('updateList', []);
      this._refresh();
      this.getSumehrUpdateServices();
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

  _curHubChanged(){
      this._setHub();
  }

  _setHub(){
      const hubConfig = this.$["htPatHubUtils"].getHubConfig(this.curHub, this.curEnv);

      this.set('hcpHubConsent', null);
      this.set('patientHubConsent', null);
      this.set('patientHubTherLinks', null);
      this.set('patientHubInfo', null);
      this.set('breakTheGlassReason', null);

      this.hubId = hubConfig.hubId;
      this.hubEndPoint = hubConfig.hubEndPoint;
      this.set("hubSupportsConsent", hubConfig.hubSupportsConsent);
      this.hubPackageId = hubConfig.hubPackageId;
      this.hubApplication = hubConfig.hubApplication;
      this.set("supportBreakTheGlass", hubConfig.supportBreakTheGlass);
  }

  close() {
      this.$.dialog.close();
  }

  _activeItemChanged(item){

  }

  _isEqual(a,b) {
      return (a === b)
  }

  getAttachment(doc) {
      return this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, doc.id, _.size(doc.encryptionKeys) ? doc.encryptionKeys : doc.delegations).then(
          ({extractedKeys: enckeys}) => this.api.document().getAttachment(_.trim(_.get(doc,"id","")), _.trim(_.get(doc,"attachmentId","")), enckeys.join(','))
      ).catch(err => {
          return err;
      })
  }

  getSumehrUpdateServices(){
      const patient = this.patient;
      this.api.contact().findBy(this.user.healthcarePartyId, patient).then(ctcs => ctcs.map(ctc => this.api.register(ctc, 'contact'))).then(ctcs => {
          ctcs.sort((a, b) => (a.created || 0) - (b.created || 0));
          console.log("Contacts", ctcs);
          this.api.contact().filterServices(ctcs, s => s.tags.find(c => c.type === 'CD-TRANSACTION' && ['sumehr'].includes(c.code))).then(svcs => {
              const contents = svcs.map(svc => this.api.contact().preferredContent(svc, this.language));
              Promise.all(contents.map(cnt => this.api.document().getDocument(cnt.documentId))).then(docs => {
                  Promise.all(docs.map(doc => this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, doc.id, doc.cryptedForeignKeys).then(cfks => ([cfks,doc]))))
                      .then(promResults => {
                          const idsAndDocs = promResults.map(res => {
                              return {messageId: res[0].extractedKeys[0], doc: res[1] };
                          });
                          return Promise.all(idsAndDocs.map(idDoc => this.api.message().getMessage(idDoc.messageId).then(msg => [msg, idDoc.doc]).catch(err => [err, idDoc.doc] ))).then(msgAndDocs => {
                              return msgAndDocs.map(msgNdoc => {return {msg: msgNdoc[0], doc: msgNdoc[1]}});
                          })
                      })
                      .then(msgNdocs => {
                          console.log("msgNdocs", msgNdocs);
                          const docList = msgNdocs.filter(m => m.msg && m.msg.transportGuid && m.msg.transportGuid === "HUB:OUT:UPDATE-SUMEHR" && m.msg.metas.updateReference);
                          const oldDocList = docList.filter(m => m.msg.metas.filename && m.msg.metas.filename === "old");
                          const newDocList = docList.filter(m => m.msg.metas.filename && m.msg.metas.filename === "new");
                          const pairList = oldDocList.map(m => {
                              const newDoc = newDocList.find(mn => mn.msg.metas.updateReference === m.msg.metas.updateReference);
                              return {old : m, new: newDoc, updateReference: m.msg.metas.updateReference, created: m.msg.created};
                          }).filter(m => m.new);
                          //TODO: get Attachments for docs in pairList;

                          Promise.all(pairList.map(pair => this.getAttachment(pair.old.doc).then(
                              attachmentResponse =>
                                  ({oldatt: attachmentResponse,old: pair.old, new: pair.new, created: pair.created, updateReference: pair.updateReference})))).then(
                              pairs => Promise.all(pairs.map(pair => this.getAttachment(pair.new.doc).then(
                                  attachmentResponse =>
                                      ({newatt: attachmentResponse, oldatt: pair.oldatt, old: pair.old, new: pair.new, created: pair.created, updateReference: pair.updateReference})
                              )))).then(
                              pairs => {
                                  // console.log("pairs with att", pairs)
                                  // console.log("pairList", pairList);
                                  this.set("updateList", _.orderBy(pairs, "created", "desc"));
                                  this.set("isLoading", false);
                                  return this.updateList;
                              });
                      })
              });
          })
      })
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
          //this.$["historyViewer"].open();
      }
  }

  _closeHistoryViewer(){
      this.$["historyViewer"].close();
  }
}
customElements.define(HtPatHubHistoryViewer.is, HtPatHubHistoryViewer);
