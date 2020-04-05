import '../../../dynamic-form/ckmeans-grouping.js'
import '../../../../styles/vaadin-icure-theme.js'
import '../../../../styles/spinner-style.js'
import '../../../../styles/scrollbar-style'
import '../../../../styles/shared-styles'
import '../../../../styles/buttons-style'
import '../../../../styles/dialog-style'
import '../../../../styles/invoicing-style';
import '../../../ht-spinner/ht-spinner.js'

//TODO import "@polymer/iron-collapse-button/iron-collapse-button"
import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-tooltip/paper-tooltip"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"
import "@vaadin/vaadin-grid/vaadin-grid-column-group"
import "@vaadin/vaadin-grid/vaadin-grid-sorter"
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle"
import '@vaadin/vaadin-accordion/vaadin-accordion'
import '@vaadin/vaadin-details/vaadin-details'

import moment from 'moment/src/moment'
import _ from 'lodash/lodash'
import * as models from 'icc-api/dist/icc-api/model/models'

import {PolymerElement, html} from '@polymer/polymer'
import {TkLocalizerMixin} from "../../../tk-localizer"

class HtMsgInvoiceToBeSend extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        
        <style include="shared-styles spinner-style scrollbar-style buttons-style dialog-style invoicing-style">
            .panel{
                margin: 5px;
                height: calc(100% - 20px);
                width: auto;
            }
            
            .panel-title{
                height: 40px;
                width: auto;
            }
            
            .panel-search{
                height: 45px;
                width: auto;
            }
            
            .panel-content{
                height: calc(100% - 125px);
                width: auto;
            }
            
            .panel-button{
                height: 32px;
                width: auto; 
                padding: 4px; 
                display: flex;
                justify-content: flex-end!important;           
            }
            
            .assurability--redStatus{
                color: var(--app-status-color-nok);
                height: 8px;
                width: 8px;
            }

            .assurability--greenStatus{
                color: var(--app-status-color-ok);
                height: 8px;
                width: 8px;
            }
            
            .invoice-status {
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                font-size: 12px;
                display: block;
                width: auto;
                max-width: fit-content;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .invoice-status--orangeStatus{
                background: #fcdf354d;
            }
            
            .statusIcon{
                height: 8px;
                width: 8px;
                background: transparent !important
            }
            .statusIcon.invoice-status--orangeStatus {
                color: var(--app-status-color-pending);
            }
            
            .statusIcon.invoice-status--orangeStatus,
            .statusIcon.invoice-status--greenStatus,
            .statusIcon.invoice-status--redStatus,
            .statusIcon.invoice-status--purpleStatus {
                background: transparent !important;
            }
            
            *.txtcolor--orangeStatus {
                color: var(--app-status-color-pending);
            }
            
            .batchNumber{
                color: var(--app-text-color-light);
                border-radius: 25px;
                min-height: 0;
                margin-left: 8px;
                font-size: .6em;
                display: inline-block;
                line-height: 0.8;
                text-align: center;
                height: 10px;
                padding: 5px;
                margin-top: 2px;
            }
            
            .batchPending{background-color: var(--paper-orange-400);}
            .batchToBeCorrected{background-color: var(--paper-red-400);}
            .batchProcessed{background-color: var(--paper-blue-400);}
            .batchRejected{background-color: var(--paper-red-400);}
            .batchAccepted{background-color: var(--paper-green-400);}
            .batchArchived{background-color: var(--paper-purple-300);}
                      
            .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .th{
                height: auto!important;
                font-weight: bold;
                vertical-align: middle;
            }
            
            .tr{
                display: flex;
                height: 22px;
                border-bottom: 1px solid var(--app-background-color-dark);   
                padding: 4px;                
            }
            
            .td{
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                flex-grow: 1;
                flex-basis: 0;
                padding: 6px;
                overflow: hidden;
                min-width: 0px;
                z-index: 2;
                word-break: break-word;
                white-space: nowrap;               
                font-size: 13px;
                text-overflow: ellipsis;
            }

            .fg0{
                flex-grow: 0;
            }
            
            .fg02{
                flex-grow: 0.2;
            }
            
            .fg05{
                flex-grow: 0.5;
            }
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }  
                       
            .status{
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            
            .info-icon{
                height: 14px;
                width: 14px;
            }
            
            .searchField{
                display: block;
            }
            
            .button{
                display: inline-flex!important;
                align-items: center!important;
            }
            
            .title{
                display:flex;
                padding: 5px;
            }
            
            .tr-item{
                cursor: pointer;
            }
            
            .modalDialog{
                height: 350px;
                width: 600px;
            }

             .modalDialogContent{
                  height: calc(100% - 69px);
                  width: auto;
                  margin: 0;
                  background-color: white;
                  position: relative;
                  padding: 10px;
             }
             
             #checkBeforeSendingDialog{
                    height: 500px;
                    width: 800px;
             }

             .unsentInvoice{
                 height: 250px;
                 width: auto;
             }

             previousCheck{
                 height: 100px;
                 width: auto;
             }

             .errorBeforeSendInvoice{
                 color: var(--app-status-color-nok);
                 font-weight: bold;
             }

             #patientsWithoutAssurabilityGrid{
                 max-height: 200px;
                 overflow: auto;
             }
             
             .sendingSpinner{
                height: 100px!important;
                width: 100px!important;
                margin: auto;
             }
             
             .prossessList{
                height: calc(100% - 100px);
                width: auto;
                padding: 4px;
             }
             
             .content-container{
                padding: 4px;
                width: auto;
             }
             
             .previousCheckContainer{
             
             }
             
             .listOfUnsentInvoiceContainer{
             
             }
            
        </style>
        
        <div class="panel">
            <div class="panel-title">
                <div class="title">
                    [[localize('inv-to-be-send', 'Invoice to be send', language)]]
                    <span class="batchNumber batchPending">{{_forceZeroNum(listOfInvoice.length)}}</span>
                 </div>                 
            </div>
            <div class="panel-search">
                <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="panel-content">
                <div class="table">
                    <div class="tr th">
                        <div class="td fg02"></div>                     
                        <div class="td fg05">[[localize('inv_mut','Mutual',language)]]</div>
                        <div class="td fg1">[[localize('inv_num_fac','Invoice number',language)]]</div>
                        <div class="td fg2">[[localize('inv_pat','Patient',language)]]</div>
                        <div class="td fg1">[[localize('inv_niss','Inss',language)]]</div>
                        <div class="td fg1">[[localize('inv_date','Invoice date',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_oa','Oa',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_pat','Patient',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_supp','Extra',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_tot','Total',language)]]</div>
                        <div class="td fg1">[[localize('inv_stat','Status',language)]]</div>
                    </div>
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                    <template is="dom-if" if="[[!isLoading]]">
                        <template is="dom-repeat" items="[[_sortInvoiceListByOa(filteredListOfInvoice)]]" as="inv">
                            <div class="tr tr-item" id="[[inv.invoiceId]]" data-item$="[[inv]]" on-tap="_displayInfoInvoicePanel">
                                <div class="td fg02">
                                    <template is="dom-if" if="[[inv.realizedByTrainee]]">
                                        <iron-icon icon="vaadin:academy-cap" class="info-icon"></iron-icon>
                                    </template>
                                </div>
                                <div class="td fg05">[[inv.insuranceCode]]</div>
                                <div class="td fg1">[[inv.invoiceReference]]</div>
                                <div class="td fg2">
                                    <template is="dom-if" if="[[!inv.insurabilityCheck]]">
                                         <iron-icon icon="vaadin:circle" class="assurability--redStatus"></iron-icon>
                                    </template>
                                    <template is="dom-if" if="[[inv.insurabilityCheck]]">
                                         <iron-icon icon="vaadin:circle" class="assurability--greenStatus"></iron-icon>
                                    </template>
                                    [[inv.patientName]]
                                </div>
                                <div class="td fg1">[[inv.patientSsin]]</div>
                                <div class="td fg1">[[formatDate(inv.invoiceDate,'date')]]</div>                         
                                <div class="td fg1">[[inv.reimbursement]]€</div>
                                <div class="td fg1">[[inv.patientIntervention]]€</div>
                                <div class="td fg1">[[inv.doctorSupplement]]€</div>
                                <div class="td fg1">[[inv.totalAmount]]€</div>
                                <div class="td fg1">
                                    <span class="invoice-status invoice-status--orangeStatus">
                                        <iron-icon icon="vaadin:circle" class="statusIcon invoice-status--orangeStatus"></iron-icon>
                                        [[inv.statut]]
                                     </span>
                                </div>                    
                            </div>
                        </template>
                    </template>                  
                </div>
            </div>
            <div class="panel-button">
                <template is="dom-if" if="[[!isLoading]]" restamp="true">
                    <paper-button class="button button--other" on-tap="getMessage">[[localize('refresh','Refresh',language)]]</paper-button>
                    <template is="dom-if" if="[[api.tokenId]]">                    
                        <paper-button on-tap="_checkBeforeSend" class="button button--save" disabled="[[cannotSend]]">[[localize('inv_send','Send',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[!api.tokenId]]" restamp="true">                   
                        <paper-button on-tap="" class="button button--other" disabled title="Pas de connexion ehealth active">[[localize('inv_send','Send',language)]]</paper-button>
                    </template> 
                </template>
            </div>
        </div>  
        
        <paper-dialog id="checkBeforeSendingDialog">
            <h2 class="modal-title">[[localize('pre_chk_bef_inv','Pre check before invoice',language)]]</h2>
            <div class="content"> 
                <div class="content-container">
                    <div class="previousCheckContainer">
                    <h4>[[localize('pr_ctr_block_inv','Prior control(s) blocking(s)',language)]]</h4>
                    <template is="dom-if" if="[[checkBeforeSendEfact.inamiCheck]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_nihii_inv','- Nihii invalid',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[checkBeforeSendEfact.ssinCheck]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_ssin_inv','- Ssin invalid',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[checkBeforeSendEfact.bceCheck]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_cbe_inv','- Cbe invalid',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[checkBeforeSendEfact.ibanCheck]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_iban_inv','- Iban invalid',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[checkBeforeSendEfact.bicCheck]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_bic_inv','- Bic invalid',language)]]</div>
                    </template>
    
                    <template is="dom-if" if="[[!checkBeforeSendEfact.invoiceCheck100]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_inv_numb_OA100_inv','- Anomaly detected on the invoiceNumber for OA100. Please contact helpdesk',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[!checkBeforeSendEfact.invoiceCheck200]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_inv_numb_OA200_inv','- Anomaly detected on the invoiceNumber for OA200. Please contact helpdesk',language)]</div>
                    </template>
                    <template is="dom-if" if="[[!checkBeforeSendEfact.invoiceCheck300]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_inv_numb_OA300_inv','- Anomaly detected on the invoiceNumber for OA300. Please contact helpdesk',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[!checkBeforeSendEfact.invoiceCheck306]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_inv_numb_OA306_inv','- Anomaly detected on the invoiceNumber for OA306. Please contact helpdesk',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[!checkBeforeSendEfact.invoiceCheck400]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_inv_numb_OA400_inv','- Anomaly detected on the invoiceNumber for OA400. Please contact helpdesk',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[!checkBeforeSendEfact.invoiceCheck500]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_inv_numb_OA500_inv','- Anomaly detected on the invoiceNumber for OA500. Please contact helpdesk',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[!checkBeforeSendEfact.invoiceCheck600]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_inv_numb_OA600_inv','- Anomaly detected on the invoiceNumber for OA600. Please contact helpdesk',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[!checkBeforeSendEfact.invoiceCheck900]]">
                        <div class="errorBeforeSendInvoice">[[localize('pr_inv_numb_OA900_inv','- Anomaly detected on the invoiceNumber for OA900. Please contact helpdesk',language)]]</div>
                    </template>
                </div>
                <template is="dom-if" if="[[patientWithoutMutuality.length]]">
                    <div class="listOfUnsentInvoiceContainer">
                        <h4>[[localize("pr_don_send_inv","Next invoice don't be send",language)]]</h4>
                        <div class="table">
                            <div class="tr th">
                                <div class="td fg2">[[localize('pr_pat_inv','Patient',language)]]</div>
                                <div class="td fg2">[[localize('pr_pat_inv_rea','Reason',language)]]</div>
                            </div>
                            <template is="dom-repeat" items="[[patientWithoutMutuality]]" as="p">
                                 <div class="tr">
                                    <div class="td fg2">[[p.patientName]]</div>
                                    <div class="td fg2">[[localize('pr_pat_ass_inf_inv','Patient without assurability information',language)]]</div>
                                </div>
                            </template>
                        </div>                       
                    </div>
                </template>
                </div>            
            </div>
            <div class="buttons">
                <paper-button class="button button--other" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button>
                <template is="dom-if" if="[[patientWithoutMutuality.length]]">
                    <paper-button class="button button--save" on-tap="sendInvoices">[[localize('continue','Continue',language)]]</paper-button>
                </template>
            </div>
        </paper-dialog>
        
      
         <paper-dialog class="modalDialog" id="sendingDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('inv-trt-in-prog','treatment in progress',language)]]</h2>
            <div class="modalDialogContent m-t-50">
                <div class="sendingSpinner">
                    <ht-spinner active="[[isSending]]"></ht-spinner>
                </div>
                <div class="prossessList">
                   <template is="dom-repeat" items="[[progressItem]]" as="pi">
                      <div>[[pi]]</div>
                   </template>
                </div>     
            </div>        
        </paper-dialog>
`
    }

    static get is() {
        return 'ht-msg-invoice-to-be-send'
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value: () => {
                }
            },
            user: {
                type: Object,
                value: () => {
                }
            },
            hcp: {
                type: Object,
                value: () => {
                }
            },
            listOfInvoice: {
                type: Array,
                value: () => []
            },
            filteredListOfInvoice:{
              type: Array,
              value: () => []
            },
            filter:{
                type: String,
                value: null
            },
            cannotSend: {
                type: Boolean,
                value: false
            },
            checkBeforeSendEfact:{
                type: Object,
                value: () => ({
                    inamiCheck : false,
                    ssinCheck: false,
                    bceCheck: false,
                    ibanCheck: false,
                    bicCheck: false,
                    invoiceCheck100: false,
                    invoiceCheck200: false,
                    invoiceCheck300: false,
                    invoiceCheck306: false,
                    invoiceCheck400: false,
                    invoiceCheck500: false,
                    invoiceCheck600: false,
                    invoiceCheck900: false
                })
            },
            patientWithoutMutuality:{
                type: Array,
                value: () => []
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            isSending:{
                type: Boolean,
                value: false
            },
            progressItem:{
                type: Array,
                value: () => []
            }
        }
    }

    constructor() {
        super()
    }

    static get observers() {
        return ['_initialize(api, user, listOfInvoice)', '_filterValueChanged(filter)']
    }

    _initialize(){
        this.set('filteredListOfInvoice', _.get(this, 'listOfInvoice', []))

        const LastSend = parseInt(localStorage.getItem('lastInvoicesSent')) ? parseInt(localStorage.getItem('lastInvoicesSent')) : -1
        const maySend = (LastSend < Date.now() + 24*60*60000 || LastSend===-1)
        this.set('cannotSend',!maySend)
    }

    _sortInvoiceListByOa(listOfInvoice) {
        return _.sortBy(listOfInvoice, ['insuranceCode'], ['asc'])
    }

    _forceZeroNum(num) {
        return (!num) ? '0' : num.toString()
    }

    formatDate(d,f) {
        const input = d && d.toString() || _.trim(d)
        const yyyy = input.slice(0,4), mm = input.slice(4,6), dd = input.slice(6,8)
        switch(f) {
            case 'date' :
                return `${dd}/${mm}/${yyyy}`;
            case 'month' :
                const monthStr =
                    (mm.toString() === '01') ? this.localize('Jan',this.language) :
                        (mm.toString() === '02') ? this.localize('Feb',this.language) :
                            (mm.toString() === '03') ? this.localize('Mar',this.language) :
                                (mm.toString() === '04') ? this.localize('Apr',this.language) :
                                    (mm.toString() === '05') ? this.localize('May',this.language) :
                                        (mm.toString() === '06') ? this.localize('Jun',this.language) :
                                            (mm.toString() === '07') ? this.localize('Jul',this.language) :
                                                (mm.toString() === '08') ? this.localize('Aug',this.language) :
                                                    (mm.toString() === '09') ? this.localize('Sep',this.language) :
                                                        (mm.toString() === '10') ? this.localize('Oct',this.language) :
                                                            (mm.toString() === '11') ? this.localize('Nov',this.language) :
                                                                this.localize('Dec',this.language)
                return `${monthStr} ${yyyy}`
        }
    }

    _filterValueChanged(){
        if(this.filter){
            const keywordsString = _.trim(_.get(this,"filter","")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            const keywordsArray = _.compact(_.uniq(_.map(keywordsString.split(" "), i=>_.trim(i))))

            setTimeout(() => {
                if(parseInt(_.get(keywordsString,"length",0)) > 2) {
                    const invoiceSearchResults =  _.chain(_.get(this, "listOfInvoice", []))
                        .chain(_.get(this, "filter", []))
                        .filter(i => _.size(keywordsArray) === _.size(_.compact(_.map(keywordsArray, keyword => _.trim(_.get(i, "normalizedSearchTerms", "")).indexOf(keyword) > -1))))
                        .compact()
                        .uniq()
                        .orderBy(['code', 'label.' + this.language, 'id'], ['asc', 'asc', 'asc'])
                        .value()
                        this.set('filteredListOfInvoice', _.sortBy(invoiceSearchResults, ['insuranceCode'], ['asc']))
                }else{
                    this.set('filteredListOfInvoice', _.sortBy(_.get(this, 'listOfInvoice', []), ['insuranceCode'], ['asc']))
                }
            }, 100)
        }else{
            this.set('filteredListOfInvoice', _.sortBy(_.get(this, 'listOfInvoice', []), ['insuranceCode'], ['asc']))
        }
    }

    _checkBeforeSend(){

        this.set('checkBeforeSendEfact.inamiCheck', !_.get(this.hcp, 'nihii', null))
        this.set('checkBeforeSendEfact.ssinCheck', !_.get(this.hcp, 'ssin', null))
        this.set('checkBeforeSendEfact.bceCheck', !_.get(this.hcp, 'cbe', null))

        this.set('checkBeforeSendEfact.ibanCheck', !((this.hcp && this.hcp.bankAccount && this.hcp.bankAccount.length) || (this.hcp && this.hcp.financialInstitutionInformation && this.hcp.financialInstitutionInformation[0] && this.hcp.financialInstitutionInformation[0].bankAccount)))
        this.set('checkBeforeSendEfact.bicCheck', !((this.hcp && this.hcp.bic && this.hcp.bic.length) || (this.hcp && this.hcp.financialInstitutionInformation && this.hcp.financialInstitutionInformation[0] && this.hcp.financialInstitutionInformation[0].bic)))
        this.set('patientWithoutMutuality', _.get(this, 'listOfInvoice', []).filter(inv => inv.insurabilityCheck === false) || [])

        this.set('checkBeforeSendEfact.invoiceCheck100',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 100, 200))
        this.set('checkBeforeSendEfact.invoiceCheck200',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 200, 300))
        this.set('checkBeforeSendEfact.invoiceCheck300',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 300, 400))
        this.set('checkBeforeSendEfact.invoiceCheck306',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 306, 307))
        this.set('checkBeforeSendEfact.invoiceCheck400',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 400, 500))
        this.set('checkBeforeSendEfact.invoiceCheck500',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 500, 600))
        this.set('checkBeforeSendEfact.invoiceCheck600',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 600, 700))
        this.set('checkBeforeSendEfact.invoiceCheck900',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 900, 1000))

        if(_.size(_.get(this, 'patientWithoutMutuality', [])) > 0 || _.get(this, 'checkBeforeSendEfact.inamiCheck', null) === true || _.get(this, 'checkBeforeSendEfact.ssinCheck', null) === true ||
            _.get(this, 'checkBeforeSendEfact.bceCheck', null) === true || _.get(this, 'checkBeforeSendEfact.ibanCheck', null) === true || _.get(this, 'checkBeforeSendEfact.bicCheck', null) === true ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck100', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck200', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck300', null) === false ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck306', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck400', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck500', null) === false ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck600', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck900', null) === false){
            this.shadowRoot.querySelector('#checkBeforeSendingDialog').open()
        }else{
            this.sendInvoices()
        }
    }

    checkIfDoubleInvoiceNumber(invoices, startOfRange, endOfRange){
        if(startOfRange === 300 && endOfRange === 400){
            return _.uniq(_.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange && i.insuranceCode !== "306").map( i => parseInt(i.invoiceReference)))).length === _.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange && i.insuranceCode !== "306").map( i => parseInt(i.invoiceReference))).length
        }else{
            return _.uniq(_.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange).map( i => parseInt(i.invoiceReference)))).length === _.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange).map( i => parseInt(i.invoiceReference))).length
        }
    }

    sendInvoices(){
        //todo
        this.shadowRoot.querySelector('#checkBeforeSendingDialog') ? this.shadowRoot.querySelector('#checkBeforeSendingDialog').close() : null
        this.set('progressItem', [])

        const LastSend = parseInt(localStorage.getItem('lastInvoicesSent')) ? parseInt(localStorage.getItem('lastInvoicesSent')) : -1
        const maySend = (LastSend < Date.now() + 24*60*60000 || LastSend===-1)
        if (maySend) {
            this.set('cannotSend',true)
            localStorage.setItem('lastInvoicesSent', Date.now())
            this.shadowRoot.querySelector('#sendingDialog').open()
            this.set('isSending', true)
            this.push('progressItem', this.localize('inv-step-1', 'inv-step-1', this.language))

            let prom = Promise.resolve()
            _.chain(_.head(_.chunk(this.listOfInvoice.filter(inv => inv.insurabilityCheck === true), 500)))
                .groupBy(fact => fact.insuranceParent)
                .toPairs().value()
                .forEach(([fedId,invoices]) => {
                    prom = prom.then(() => this.api.message().sendBatch(this.user, this.hcp, invoices.map(iv=>({invoiceDto:iv.invoice, patientDto:iv.patient})), this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword, this.api.fhc().Efactcontroller(),
                        undefined,
                        (fed, hcpId) => Promise.resolve(`efact:${hcpId}:${fed.code === "306" ? "300" : fed.code}:`))
                    ).then(message => {
                        this.push('progressItem', this.localize('inv-step-2', 'inv-step-2', this.language)+' '+_.get(fed, 'code', ""))
                        this.api.register(message,'message')
                    })
                })

            return prom.then(() => {
                this.set('isSending',false)
                this.shadowRoot.querySelector('#sendingDialog').close()
                this.getMessage()
            })
        }
    }

    getMessage(){
        this.dispatchEvent(new CustomEvent('get-message', {bubbles: true, composed: true}))
    }

    _displayInfoInvoicePanel(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){
            this.dispatchEvent(new CustomEvent('open-invoice-detail-panel', {bubbles: true, composed: true, detail: {selectedInv: JSON.parse(_.get(e, 'currentTarget.dataset.item', null))}}))
        }
    }

}

customElements.define(HtMsgInvoiceToBeSend.is, HtMsgInvoiceToBeSend)
