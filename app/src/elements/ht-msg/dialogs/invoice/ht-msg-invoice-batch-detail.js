import '../../../dynamic-form/ckmeans-grouping.js';
import '../../../../styles/vaadin-icure-theme';
import '../../../../styles/spinner-style';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/dialog-style';
import '../../../ht-spinner/ht-spinner';

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

import moment from 'moment/src/moment';
import _ from 'lodash/lodash';
import * as models from 'icc-api/dist/icc-api/model/models'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../../tk-localizer";
class HtMsgInvoiceBatchDetail extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`

        <style include="shared-styles spinner-style scrollbar-style buttons-style dialog-style">
        
            .panel{
                background-color: white;
                height: calc(100% - 16px);
                width: auto;
            }
            
            .panel-title{
                height: 40px;
                width: auto;               
            }
            
            .panel-search{
                height: 40px;
                width: auto;
            }
            
            .panel-detail{
                height: 60px;
                width: auto;
                font-size: var(--font-size-normal);
            }
            
            .panel-error{
                height: 40px;
                width: auto;
                font-size: var(--font-size-normal);
            }
            
            .panel-content{
                height: calc(100% - 215px);
                width: auto;
            }
            
            .panel-button{
                height: 32px;
                width: auto; 
                padding: 4px; 
                display: flex;
                justify-content: flex-end!important; 
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
                                            
                .statusIcon{
                    height: 8px;
                    width: 8px;
                }
                
                .invoice-status--orangeStatus{
                    background: #fcdf354d;
                }
                .invoice-status--greenStatus{
                    background: #07f8804d;
                }
                .invoice-status--blueStatus {
                    background: #84c8ff;
                }
                .invoice-status--redStatus{
                    background: #ff4d4d4d;
                }
                .invoice-status--purpleStatus {
                    background: #e1b6e6;
                }
                
                 .statusIcon.invoice-status--orangeStatus {
                    color: var(--app-status-color-pending);
                }
                .statusIcon.invoice-status--greenStatus {
                    color: var(--app-status-color-ok);
                }
                .statusIcon.invoice-status--blueStatus {
                    color: var(--paper-blue-400);
                }
                .statusIcon.invoice-status--redStatus {
                    color: var(--app-status-color-nok);
                }
                .statusIcon.invoice-status--purpleStatus {
                    color: var(--paper-purple-300);
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
                *.txtcolor--greenStatus {
                    color: var(--app-status-color-ok);
                }
                *.txtcolor--blueStatus {
                    color: var(--paper-blue-400);
                }
                *.txtcolor--redStatus {
                    color: var(--app-status-color-nok);
                }
                *.txtcolor--purpleStatus {
                    color: var(--paper-purple-300)
                }
            
               .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .tr{
                display: flex;
                height: auto;
                padding: 2px;
            }
        
            .bb{
                border-bottom: 1px solid lightgray;
            }
        
            .th{
                height: auto!important;
                font-weight: bold;
                vertical-align: middle;
            }
            
            .tr-item{
                cursor: pointer;
            }
            
            .td{
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;                           
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
            
            .fg3{
                flex-grow: 3;
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
            
            .rejectionInfo{
                white-space: normal!important;
            }
            
            .button{
               display: inline-flex!important;
               align-items: center!important;
            }
            
            .modalDialog{
                height: 350px;
                width: 600px;
             }

             .modalDialogContent{
                  height: calc(100% - 113px);
                  width: auto;
                  margin: 0;
                  background-color: white;
                  position: relative;
                  padding: 10px;
             }
            
            .bold{
                font-weight: bold;
            }
            
            .error-line{
                padding: 2px;
                width: auto;
                margin-left: 5px;
                color: var(--app-status-color-nok);
            }
            
            .tr-info{
                display: flex;
                height: auto;              
            }
            
            .td-info{
                 position: relative;
                 display: flex;
                 flex-flow: row nowrap;
                 align-items: center;
                 flex-basis: 0;
                 padding-left: 6px;
                 overflow: hidden;
                 min-width: 0px;
                 z-index: 2;
                 word-break: break-word;
                 white-space: nowrap;
                 font-size: 13px;
                 text-overflow: ellipsis;
            }
            
        </style>
        
        <div class="panel">
           <div class="panel-title">
                [[localize('inv-num-detail', 'Detail of batch number', language)]] [[_getInvoiceReference(selectedInvoiceForDetail)]] [[localize('inv-oa-title', 'for oa', language)]] [[selectedInvoiceForDetail.messageInfo.oa]]         
            </div>
            <div class="panel-detail">
                <div class="table">
                    <div class="tr-info">
                        <div class="td-info fg1"><span class="bold">[[localize('inv_prest','Physician',language)]]:</span>&nbsp; [[selectedInvoiceForDetail.messageInfo.hcp]]</div>                        
                        <div class="td-info fg1"><span class="bold">[[localize('inv_batch_amount','Amount',language)]] [[localize('inv_batch_amount_invoiced','Invoiced',language)]]:</span>&nbsp; [[_formatAmount(selectedInvoiceForDetail.messageInfo.invoicedAmount)]]€</div>
                        <div class="td-info fg1"><span class="bold">[[localize('inv_batch_bank_account','Bank account',language)]]:</span>&nbsp; [[selectedInvoiceForDetail.messageInfo.paymentAccount]]</div>   
                    </div>
                    <div class="tr-info">
                        <div class="td-info fg1"><span class="bold">[[localize('inv_batch_month','Billed month',language)]]:</span>&nbsp; [[formatDate(selectedInvoiceForDetail.messageInfo.invoiceMonth,'month')]]</div>
                        <div class="td-info fg1"><span class="bold">[[localize('inv_batch_amount','Amount',language)]] [[localize('inv_batch_amount_acc','Accepted',language)]]:</span>&nbsp; <span class="txtcolor--greenStatus">[[_formatAmount(selectedInvoiceForDetail.messageInfo.acceptedAmount)]]€</span></div>
                        <div class="td-info fg1"><span class="bold">[[localize('inv-ref-pai','Paiement reference',language)]]:</span>&nbsp; [[selectedInvoiceForDetail.messageInfo.paymentReference]]</div>
                    </div>
                    <div class="tr-info">
                        <div class="td-info fg1"><span class="bold">[[localize('inv_date_fact','Invoice date',language)]]:</span>&nbsp; [[formatDate(selectedInvoiceForDetail.messageInfo.invoiceDate,'date')]]</div>
                        <div class="td-info fg1"><span class="bold">[[localize('inv_batch_amount','Amount',language)]] [[localize('inv_batch_amount_rej','Rejected',language)]]:</span>&nbsp; <span class="txtcolor--redStatus">[[_getRefusedAmount(selectedInvoiceForDetail.messageInfo.invoicedAmount, selectedInvoiceForDetail.messageInfo.acceptedAmount)]]€</span></div>
                        <div class="td-info fg1"><span class="bold">[[localize('inv_batch_amount_paid','Paid',language)]]:</span>&nbsp; [[_formatAmount(selectedInvoiceForDetail.messageInfo.amountPaid)]]€</div>
                    </div>
                </div>            
            </div>         
            <div class="panel-error">
                <template is="dom-repeat" items="[[invoicesErrorMsg]]" as="err">
                    <div class="error-line">
                        [[err]]
                    </div>
                </template>
            </div>
             <div class="panel-search">
                <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="panel-content">
                <div class="table">
                    <div class="tr bb th">                     
                        <div class="td fg1">[[localize('inv_num_fac','Invoice number',language)]]</div>
                        <div class="td fg2">[[localize('inv_pat','Patient',language)]]</div>
                        <div class="td fg1">[[localize('inv_niss','Niss',language)]]</div>
                        <div class="td fg1">[[localize('nmcl','Nmcl',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_month','Invoiced month',language)]]</div>
                        <div class="td fg1">[[localize('inv_date_pres','Prestation date',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_invoiced','Invoiced',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_acc','Accepted',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_rej','Rejected',language)]]</div>
                        <div class="td fg3">Motif rejet</div>  
                        <div class="td fg05">Payé</div>  
                        <div class="td fg1">[[localize('inv_stat','Status',language)]]</div>                                          
                    </div>
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                    <template is="dom-if" if="[[!isLoading]]">
                        <template is="dom-repeat" items="[[_sortInvoiceListByInvoiceRef(filteredInvoicesFormBatch)]]" as="inv">
                            <div class="tr">
                                <div class="td fg1">[[inv.invoiceReference]]</div>
                                <div class="td fg2">[[inv.patient]]</div>
                                <div class="td fg1">[[inv.ssin]]</div>
                                <div class="td fg1"></div>
                                <div class="td fg1">[[formatDate(inv.invoiceDate,'month')]]</div>
                                <div class="td fg1">[[formatDate(inv.invoiceDate,'date')]]</div>
                                <div class="td fg1"><span class\$="[[_getTxtStatusColor(inv.statut,inv.totalAmount)]]">[[_formatAmount(inv.invoicedAmount)]]€</span></div>
                                <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-green',inv.acceptedAmount)]]">[[_formatAmount(inv.acceptedAmount)]]€</span></div>
                                <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-red',inv.refusedAmount)]]">[[_formatAmount(inv.refusedAmount)]]€</span></div>
                                <div class="td fg3 rejectionInfo">[[inv.rejectionReason]]</div>
                                <div class="td fg05">[[_formatAmount(inv.paid)]]€</div>                             
                                <div class="td fg1"><span class\$="invoice-status [[_getIconStatusClass(inv.status))]]"><iron-icon icon="vaadin:circle" class\$="statusIcon [[_getIconStatusClass(inv.status)]]"></iron-icon> [[inv.status]]</span></div>           
                            </div>
                            <template is="dom-repeat" items="[[inv.invoicingCodes]]" as="invco">
                                <div class="tr bb">
                                    <div class="td fg1"></div>
                                    <div class="td fg2"></div>
                                    <div class="td fg1"></div>
                                    <div class="td fg1 center">[[invco.invoicingCode]]</div>
                                    <div class="td fg1"></div>
                                    <div class="td fg1">[[formatDate(invco.invoiceDate,'date')]]</div>
                                    <div class="td fg1"><span class\$="[[_getTxtStatusColor(inv.statut,inv.totalAmount)]]">[[_formatAmount(invco.invoicedAmount)]]€</span></div>
                                    <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-green',inv.acceptedAmount)]]">[[_formatAmount(invco.acceptedAmount)]]€</span></div>
                                    <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-red',inv.refusedAmount)]]">[[_formatAmount(invco.refusedAmount)]]€</span></div>
                                    <div class="td fg3 rejectionInfo">[[invco.rejectionReason]]</div>
                                    <div class="td fg05"></div>                             
                                    <div class="td fg1"><span class\$="invoice-status [[_getIconStatusClass(invco.status))]]"><iron-icon icon="vaadin:circle" class\$="statusIcon [[_getIconStatusClass(invco.status)]]"></iron-icon> [[_getStatusOfInvoiceCode(invco.status, inv.status)]]</span></div>                                      
                                </div>
                            </template>
                        </template>
                    </template>                   
                </div>
            </div>
            <div class="panel-button">
                <template is="dom-if" if="[[correctiveInvoiceCanBeCreated]]" restamp="true">
                    <paper-button class="button button--other" on-tap="_createInvoiceToBeCorrectedFromBatch">[[localize('btn-crea-fro-bat', 'Create invoice from batch', language)]]</paper-button>
                </template>
                <template is="dom-if" if="[[batchCanBeArchived]]" restamp="true">
                   <paper-button class="button button--other" on-tap="_openArchiveDialog">[[localize('btn-arch', 'Archive', language)]]</paper-button>
                </template>
                <template is="dom-if" if="[[batchCanBeResent]]" restamp="true">
                   <paper-button class="button button--other" on-tap="_openResendDialog">[[localize('btn-trans-for-res', 'Transfer for resending', language)]]</paper-button>
                </template>
                <paper-button class="button button--other" on-tap="_closeDetailPanel">[[localize('clo','Close',language)]]</paper-button>              
            </div>
        </div>
        
        <paper-dialog class="modalDialog" id="archiveBatchDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="modalDialogContent m-t-50">
                <h3 class="textAlignCenter">[[localize('confirm-arch-batch','Are you sure you wish to archive this batch?',language)]]</h3>
                <p class="textAlignCenter m-t-50 bold"></p>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeArchiveDialog">[[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_archiveBatch"><iron-icon icon="check-circle"></iron-icon> [[localize('confirm','Confirm',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="modalDialog" id="resendingBatchDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="modalDialogContent m-t-50">
                <h3 class="textAlignCenter">[[localize('confirm-resend-batch','Are you sure you wish to resend this batch ?',language)]]</h3>
                <p class="textAlignCenter m-t-50 bold"></p>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeResendDialog">[[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_transferInvoicesForResending"><iron-icon icon="check-circle"></iron-icon> [[localize('confirm','Confirm',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
    }

    static get is() {
        return 'ht-msg-invoice-batch-detail';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value : () => {}
            },
            user: {
                type: Object,
                value : () => {}
            },
            hcp: {
                type : Object,
                value : () => {}
            },
            selectedInvoiceForDetail:{
                type: Object,
                value : () => {}
            },
            isSendError:{
                type: Boolean,
                value: false
            },
            invoicesErrorMsg: {
                type: String,
                value: null
            },
            filteredInvoicesFormBatch:{
                type: Array,
                value: () => []
            },
            invoicesFromBatch:{
                type: Array,
                value: () => []
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            batchCanBeArchived:{
                type: Boolean,
                value: false
            },
            batchCanBeResent:{
                type: Boolean,
                value: false
            },
            correctiveInvoiceCanBeCreated:{
                type: Boolean,
                value: false
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return ['_initializeDataProvider(api, user, selectedInvoiceForDetail, selectedInvoiceForDetail.*)', '_filterValueChanged(filter)'];
    }

    _initializeDataProvider(){
        this.set('invoicesFromBatch', [])
        if(!_.isEmpty(_.get(this, 'selectedInvoiceForDetail', {}))){
            this._showDetail()
        }
    }

    _closeDetailPanel(){
        this.set('invoicesFromBatch', [])
        this.set('batchCanBeArchived', false)
        this.set('batchCanBeResent', false)
        this.set('isSendError', false)
        this.set('isLoading', false)
        this.set('invoicesErrorMsg', [])

        this.dispatchEvent(new CustomEvent('close-detail-panel', {bubbles: true, composed: true}))
    }

    _showDetail() {
            this.set('batchCanBeArchived', false)
            this.set('batchCanBeResent', false)
            this.set('isLoading', true)
            this.set('invoicesErrorMsg', []);

            this.api.setPreventLogging()

            this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: _.get(this.selectedInvoiceForDetail, 'message.invoiceIds', []).map(i => i)}))
                .then(invoices => Promise.all(invoices.map(inv => this.api.crypto().extractCryptedFKs(inv, _.get(this.user, 'healthcarePartyId', null)).then(ids => [inv, ids.extractedKeys[0]]))))
                .then(invAndIdsPat =>
                    this.api.patient().getPatientsWithUser(this.user,new models.ListOfIdsDto({ids: _.uniq(invAndIdsPat.map(x => x[1]))})).then(pats => invAndIdsPat.map(it => [it[0], pats.find(p => p.id === it[1])]))
                )
                .then(invAndPats => invAndPats.map( ([inv, pat]) => ({
                    invoiceReference: _.get(inv, 'invoiceReference', null),
                    patient: _.get(pat, 'firstName', null)+" "+_.get(pat, 'lastName', null),
                    ssin: _.get(pat, 'ssin', null),
                    invoiceDate: _.get(inv, 'invoiceDate', null),
                    invoicedAmount: _.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.reimbursement || 0), 0),
                    acceptedAmount: (!!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 17)) || !!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 12))) ? 0.00 : _.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.paid || 0), 0),
                    refusedAmount: (!!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 17)) || !!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 12))) ? _.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.reimbursement || 0), 0) : (Number(_.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.reimbursement || 0), 0)) -  Number(_.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.paid || 0), 0))),
                    rejectionReason: _.get(inv, 'error', null),
                    paid: false,
                    status: _.get(this.selectedInvoiceForDetail, 'messageInfo.invoiceStatus', null),
                    invoice: inv,
                    patientDto: pat,
                    normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.trim(_.get(pat, 'firstName', null)), _.trim(_.get(pat, 'lastName', null)), _.trim(_.get(pat, 'ssin', null)), _.trim(_.get(inv, 'invoiceReference', null)), _.trim(_.get(inv, 'invoiceDate', null))])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" "),
                    invoicingCodes: _.get(inv, 'invoicingCodes', []).map(code => ({
                        invoicingCode: _.get(code, 'code', null),
                        invoiceDate: _.get(code, 'dateCode', null),
                        invoicedAmount: Number(_.get(code, 'reimbursement', null)),
                        acceptedAmount:  (!!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 17)) || !!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 12))) ? 0.00 : ((_.get(code, 'paid', 0) >= 0) ? _.get(code, 'paid', 0) : 0.00),
                        refusedAmount:  (!!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 17)) || !!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 12))) ? Number(_.get(code, 'reimbursement', 0)) : (_.get(code, 'paid', 0) >= 0) ? (Number(_.get(code, 'reimbursement', 0)) - Number(_.get(code, 'paid', 0))) : 0.00,
                        rejectionReason: _.get(code, 'error', null),
                        paid: false,
                        accepted: _.get(code, 'accepted', null),
                        status: _.get(code, 'accepted', false) === true ?  this.localize('nmcl-accepted','Accepted',this.language) : this.localize('nmcl-rejected','Rejected',this.language)
                    }))
                })))
                .then(infos => this.set('invoicesFromBatch', infos))
                .then(() => this.api.message().getChildren(_.get(this.selectedInvoiceForDetail, 'message.id', null)))
                .then((msgs) => Promise.all(_.map(msgs.filter(m => m.subject && ['920999','920099', '920098', '920900'].includes(m.subject.substr(0,6))), (msg => this.api.document().findByMessage(this.user.healthcarePartyId, msg)))))
                .then((docs) => Promise.all(_.flatMap(docs).filter(d => !_.endsWith(d.name, '_parsed_records') && _.endsWith(d.name, '_records') && d.mainUti === "public.json").map(d => this.api.document().getAttachment(d.id, d.attachmentId))))
                .then((attachs) => {
                    this.api.setPreventLogging(false)
                    attachs.forEach( a => {

                        if (typeof a === "string"){
                            try { a = JSON.parse( this.cleanStringForJsonParsing(a) ) } catch (ignored) {}
                        } else if (typeof a === "object") {
                            try { a = JSON.parse( this.cleanStringForJsonParsing(new Uint8Array(a).reduce((data, byte) => data + String.fromCharCode(byte), ''))); } catch (ignored) {}
                        }

                        const zone1and90 = _.get(a, 'message', []).find(enr => _.get(enr, 'zones', []).find(z => z.zone === "1" || z.zone === "90"))
                        let errorString = ''
                        Object.keys(_.get(zone1and90, 'errorDetail', [])).find(key => {
                            if(key.includes('rejectionCode')) {
                                if( parseInt(zone1and90.errorDetail[key]) > 0 ){
                                    const index = key.replace('rejectionCode',"")
                                    errorString = zone1and90.errorDetail['rejectionDescr' + index] + ' '
                                    return zone1and90.errorDetail['rejectionDescr' + index] && zone1and90.errorDetail['rejectionDescr' + index].length
                                }
                            }
                            return false
                        })

                        this.set('invoicesErrorMsg', _.compact(_.concat(this.invoicesErrorMsg, errorString)));

                        const zone200 = _.get(a, 'message', []).find(enr => enr.zones.find(z => z.zone === "200"))
                        const zone300 = _.get(a, 'message', []).find(enr => enr.zones.find(z => z.zone === "300"))
                        const zone400 = _.get(a, 'message', []).find(enr => enr.zones.find(z => z.zone === "400"))
                        const zone500 = _.get(a, 'message', []).find(enr => enr.zones.find(z => z.zone === "500"))

                        let globalError = _.compact(_.uniq([zone200 && this.SEG_getErrSegment_200(zone200.zones || []),
                            zone300 && this.SEG_getErrSegment_300(zone300.zones || []),
                            zone400 && this.SEG_getErrSegment_400(zone400.zones || []),
                            zone500 && this.SEG_getErrSegment_500(zone500.zones || [])]))

                        this.set('invoicesErrorMsg', _.compact(_.concat(this.invoicesErrorMsg, globalError)));

                    })
                }).finally(()=>{
                    this._batchCanBeArchived()
                    this.set('correctiveInvoiceCanBeCreated', _.size(_.compact(_.get(this, 'invoicesFromBatch',[]).map(inv => _.get(inv, 'invoice', [])).map(invDto => _.get(invDto, 'correctiveInvoiceId', null)))) === 0 && ((!!(this.selectedInvoiceForDetail.message.status & (1 << 16))) || (!!(this.selectedInvoiceForDetail.message.status & (1 << 12)))))
                    this.set('filteredInvoicesFormBatch', _.get(this, 'invoicesFromBatch', []))
                    this.set('batchCanBeResent', _.get(this.selectedInvoiceForDetail, 'messageInfo.sendError', null) ? _.get(this.selectedInvoiceForDetail, 'messageInfo.sendError', null) : false)
                    this.set('isLoading', false)
                    this.api.setPreventLogging(false)
            })

    }

    cleanStringForJsonParsing(inputValue) {
        return inputValue
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f")
            .replace(/[\u0000-\u0019]+/g,"")
    }

    _getInvoiceReference(){
        return _.get(this.selectedInvoiceForDetail, 'messageInfo.invoiceNumber', null)
    }

    _sortInvoiceListByInvoiceRef(listOfInvoice) {
        return _.sortBy(listOfInvoice, ['invoiceReference'], ['asc'])
    }

    _formatAmount(amount){
        return this.findAndReplace(((Number(amount).toFixed(2)).toString()),'.',',')
    }

    findAndReplace(string, target, replacement) {
        for (let i = 0; i < string.length; i++) { string = string.replace(target, replacement); }
        return string;
    }

    _getIconStatusClass(status) {
        console.log("geticonstatus",status)
        return (status === this.localize('inv_acc_tre','Accepted for treatment',this.language)) ? "invoice-status--blueStatus" :
            (status === this.localize('inv_to_be_send','To be send',this.language)) ? (!this.statusToBeSend)  ? "invoice-status--blueStatus" : "invoice-status--orangeStatus" :
                (status === this.localize('inv_to_be_corrected','To be corrected',this.language))  ? "invoice-status--redStatus" :
                    (status === this.localize('inv_par_acc','Partially accepted',this.language)) ? "invoice-status--orangeStatus" :
                        (status === this.localize('inv_full_acc','Fully accepted',this.language)) ? "invoice-status--greenStatus" :
                            (status === this.localize('inv_tre','Treated',this.language)) ? "invoice-status--greenStatus" :
                                (status === this.localize('inv_acc_tre','Accepted for treatment',this.language)) ? "invoice-status--blueStatus" :
                                    (status === this.localize('inv_pen','Pending',this.language)) ? (!this.statusToBeSend) ? "invoice-status--blueStatus" : "" :
                                        (status === this.localize('inv_err','Error',this.language)) ? "invoice-status--redStatus" :
                                            (status === this.localize('inv_arch','Archived',this.language)) ? "invoice-status--purpleStatus" :
                                                (status === this.localize('nmcl-rejected','Rejected',this.language)) ? "invoice-status--redStatus" :
                                                    (status === this.localize('nmcl-accepted','Accepted',this.language)) ? "invoice-status--greenStatus" :
                                                        (status === this.localize('inv_send_err', 'Send error', this.language)) ? "invoice-status--redStatus" :
                                                            ""
    }
    _getTxtStatusColor(status,amount) {
        console.log("gettxtstatus",status,amount)
        if (amount > 0) {
            return (status === this.localize('inv_par_acc','Partially accepted',this.language)) ? "txtcolor--orangeStatus" :
                (status === this.localize('inv_full_acc','Fully accepted',this.language)) ? "txtcolor--greenStatus" :
                    (status === this.localize('inv_to_be_corrected','To be corrected',this.language))  ? "txtcolor-status--redStatus" :
                        (status === this.localize('inv_acc_tre','Accepted for treatment',this.language)) ? "txtcolor--blueStatus" :
                            (status === this.localize('inv_pen','Pending',this.language)) ? "txtcolor--blueStatus" :
                                (status === this.localize('inv_tre','Treated',this.language)) ? "txtcolor--greenStatus" :
                                    (status === this.localize('inv_err','Error',this.language)) ? "txtcolor--redStatus" :
                                        (status === this.localize('inv_arch','Archived',this.language)) ? "txtcolor--purpleStatus" :
                                            (status === this.localize('nmcl-rejected','Rejected',this.language)) ? "txtcolor--redStatus" :
                                                (status === this.localize('nmcl-accepted','Accepted',this.language)) ? "txtcolor--greenStatus" :
                                                    (status === 'force-red') ? "txtcolor--redStatus" :
                                                        (status === 'force-green') ? "txtcolor--greenStatus" :
                                                            (status === this.localize('inv_send_err', 'Send error', this.language)) ? "invoice-status--redStatus" :
                                                                ""
        }
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

    SEG_getErrSegment_200(zones){
        var erreur = '';

        //Erreur sur le nom du message
        if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value !== '00'){
            if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '10'){
                erreur += 'Nom du message => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '11'){
                erreur += 'Nom du message => Erreur de format';
            }else if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '20'){
                erreur += 'Nom du message => Codification inconnue';
            }else if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '21'){
                erreur += 'Nom du message => Message non autorisé pour cet émetteur';
            }else if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '22'){
                erreur += 'Nom du message => # de 920000';
            }
        }

        //Erreur sur le n° de version du message
        if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value !== '00'){
            if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '10'){
                erreur += 'N° version mess => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '11'){
                erreur += 'N° version mess => Erreur format';
            }else if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '20'){
                erreur += 'N° version mess => N° de version n\'est plus d\'application';
            }else if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '21'){
                erreur += 'N° version mess => N° de version pas encore d\'application';
            }else if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '30'){
                erreur += 'N° version mess => N° de version non autorisé pour ce flux';
            }
        }

        //Erreur sur le type de message
        if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value !== '00'){
            if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '10'){
                erreur += 'Type de mess => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '11'){
                erreur += 'Type de mess => Erreur format';
            }else if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '20'){
                erreur += 'Type de mess => Valeur non permise';
            }else if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '30'){
                erreur += 'Type de mess => Message test dans un buffer de production (1er car zone 107 = P)';
            }else if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '31'){
                erreur += 'Type de mess => Message de production dans un buffer de test (1er car zone 107 = T)';
            }
        }

        //Erreur sur le statut du message
        if(zones.find(z => z.zone === "2031") && zones.find(z => z.zone === "2031").value !== '00'){
            if(zones.find(z => z.zone === "2031") && zones.find(z => z.zone === "2031").value === '10'){
                erreur += 'Statut mess => Erreur format';
            }else if(zones.find(z => z.zone === "2031") && zones.find(z => z.zone === "2031").value === '20'){
                erreur += 'Statut mess => Valeur non permise';
            }
        }

        //Erreur sur la référence message institution ou prestataire de soins
        if(zones.find(z => z.zone === "2041") && zones.find(z => z.zone === "2041").value !== '00'){
            if(zones.find(z => z.zone === "2041") && zones.find(z => z.zone === "2041").value === '10'){
                erreur += 'Réf mess => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "2041") && zones.find(z => z.zone === "2041").value === '11'){
                erreur += 'Réf mess => Erreur format';
            }
        }

        //Erreur sur la référence message O.A
        if(zones.find(z => z.zone === "2051") && zones.find(z => z.zone === "2051").value !== '00'){
            if(zones.find(z => z.zone === "2051") && zones.find(z => z.zone === "2051").value === '10'){
                erreur += 'Réf mess OA => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "2051") && zones.find(z => z.zone === "2051").value === '11'){
                erreur += 'Réf mess OA => Erreur format';
            }
        }

        return erreur;
    }

    SEG_getErrSegment_300(zones){
        var erreur = '';

        //Erreur sur l'année et le mois de facturation
        if(zones.find(z => z.zone === "3001") && zones.find(z => z.zone === "3001").value !== '00'){
            if(zones.find(z => z.zone === "3001") && zones.find(z => z.zone === "3001").value === '10'){
                erreur += 'Année mois fact => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3001") && zones.find(z => z.zone === "3001").value === '11'){
                erreur += 'Année mois fact => Erreur format';
            }else if(zones.find(z => z.zone === "3001") && zones.find(z => z.zone === "3001").value === '20'){
                erreur += 'Année mois fact => Valeur non permise';
            }
        }

        //Erreur sur le n° d'envoi
        if(zones.find(z => z.zone === "3011") && zones.find(z => z.zone === "3011").value !== '00'){
            if(zones.find(z => z.zone === "3011") && zones.find(z => z.zone === "3011").value === '10'){
                erreur += 'N° envoi => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3011") && zones.find(z => z.zone === "3011").value === '11'){
                erreur += 'N° envoi => Erreur format';
            }else if(zones.find(z => z.zone === "3011") && zones.find(z => z.zone === "3011").value === '40'){
                erreur += 'N° envoi => Signalisation de double fichier de facturation transmis';
            }
        }

        //Erreur sur la date de création de la facture
        if(zones.find(z => z.zone === "3021")  && zones.find(z => z.zone === "3021").value !== '00'){
            if(zones.find(z => z.zone === "3021") && zones.find(z => z.zone === "3021").value === '10'){
                erreur += 'Date création facture => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3021") && zones.find(z => z.zone === "3021").value === '11'){
                erreur += 'Date création facture => Erreur format';
            }else if(zones.find(z => z.zone === "3021") && zones.find(z => z.zone === "3021").value === '20'){
                erreur += 'Date création facture => Date > date du jour';
            }else if(zones.find(z => z.zone === "3021") && zones.find(z => z.zone === "3021").value === '21'){
                erreur += 'Date création facture => Date invraisemblable ( date < 01/01/2002)';
            }
        }


        //Erreur sur le n° de version des instruction
        if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value !== '00'){
            if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value === '10'){
                erreur += 'N° version instruction => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value === '11'){
                erreur += 'N° version instruction => Erreur format';
            }else if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value === '20'){
                erreur += 'N° version instruction => Valeur non permise';
            }else if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value === '21'){
                erreur += 'N° version instruction => Incompatibilité avec valeur reprise en zone 202';
            }
        }

        //Erreur sur le nom de la personne de contact
        if(zones.find(z => z.zone === "3051") && zones.find(z => z.zone === "3051").value !== '00'){
            if(zones.find(z => z.zone === "3051") && zones.find(z => z.zone === "3051").value === '10'){
                erreur += 'Nom personne de contact => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3051") && zones.find(z => z.zone === "3051").value === '11'){
                erreur += 'Nom personne de contact => Erreur format';
            }
        }

        //Erreur sur le prenom de la personne de contact
        if(zones.find(z => z.zone === "3061") && zones.find(z => z.zone === "3061").value !== '00'){
            if(zones.find(z => z.zone === "3061") && zones.find(z => z.zone === "3061").value === '10'){
                erreur += 'Prénom personne de contact => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3061") && zones.find(z => z.zone === "3061").value === '11'){
                erreur += 'Prénom personne de contact => Erreur format';
            }
        }

        //Erreru sur le n° de tel de contact
        if(zones.find(z => z.zone === "3071") && zones.find(z => z.zone === "3071").value !== '00'){
            if(zones.find(z => z.zone === "3071") && zones.find(z => z.zone === "3071").value === '10'){
                erreur += 'N° téléphone => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3071") && zones.find(z => z.zone === "3071").value === '11'){
                erreur += 'N° téléphone => Erreur format';
            }
        }

        //Erreur sur le type de la facture
        if(zones.find(z => z.zone === "3081") && zones.find(z => z.zone === "3081").value !== '00'){
            if(zones.find(z => z.zone === "3081") && zones.find(z => z.zone === "3081").value === '10'){
                erreur += 'Type de la facture => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3081") && zones.find(z => z.zone === "3081").value  === '11'){
                erreur += 'Type de la facture => Erreur format';
            }else if(zones.find(z => z.zone === "3081") && zones.find(z => z.zone === "3081").value  === '20'){
                erreur += 'Type de la facture => Valeur non permise en fonction du secteur qui émet la facturation';
            }
        }

        //Erreur sur le type de facturation
        if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value !== '00'){
            if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value === '10'){
                erreur += 'Type de facturation => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value === '11'){
                erreur += 'Type de facturation => Erreur format';
            }else if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value === '20'){
                erreur += 'Type de facturation => Valeur non permise en fonction du secteur qui émet la facturation';
            }else if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value === '30'){
                erreur += 'Type de facturation => Valeur # de 1 ou 2 alors que la zone 308 = 3';
            }
        }

        return erreur;

    }

    SEG_getErrSegment_400(zones){
        var erreur = '';

        //Erreur sur le type de record
        if(zones.find(z => z.zone === "4001")  && zones.find(z => z.zone === "4001").value  !== '00'){
            if(zones.find(z => z.zone === "4001") && zones.find(z => z.zone === "4001").value === '10'){
                erreur +='Type de record => Zone obligatoire';
            }else if(zones.find(z => z.zone === "4001") && zones.find(z => z.zone === "4001").value === '11'){
                erreur += 'Type de record => Erreur de format';
            }else if(zones.find(z => z.zone === "4001") && zones.find(z => z.zone === "4001").value === '20'){
                erreur += 'Type de record => Valeur non permise';
            }
        }

        //Erreur sur le num de mut
        if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value  !== '00'){
            if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value === '10'){
                erreur += 'N° de mutualité => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value === '11'){
                erreur +='N° de mutualité => Erreur de format';
            }else if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value === '20'){
                erreur +='N° de mutualité => Numéro inconnu ou codification erronée';
            }else if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value === '21'){
                erreur += 'N° de mutualité => N° de mutualité non retrouvé dans le détail de la facturation';
            }
        }

        //Erreur sur le num fact
        if(zones.find(z => z.zone === "4021") && zones.find(z => z.zone === "4021").value  !== '00'){
            if(zones.find(z => z.zone === "4021") && zones.find(z => z.zone === "4021").value === '10'){
                erreur +='N° de facture récapitulative => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "4021") && zones.find(z => z.zone === "4021").value === '11'){
                erreur += 'N° de facture récapitulative => Erreur de format';
            }
        }

        //Erreur sur le signe montant a ou montant demande a
        if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value !== '00'){
            if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value === '11'){
                erreur += 'Montant demandé cpt a => Erreur de format';
            }else if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value === '40'){
                erreur += 'Montant demandé cpt a => Erreur code signe (# de + ou -)';
            }else if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value === '41'){
                erreur +='Montant demandé cpt a => Discordance entre montant ci-mentionné et total du fichier facturation pour la mutualité';
            }else if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value === '20'){
                erreur += 'Montant demandé cpt a => Somme erronée';
            }
        }

        //Erreur sur le signe montant b ou montant demande b
        if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value !== '00'){
            if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '11'){
                erreur += 'Montant demandé cpt b => Erreur de format';
            }else if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '15'){
                erreur +='Montant demandé cpt b => Zone # de 0 si l\'émetteur n\est pas une institution hospitalière - Zone signe # de «blanc» et émetteur de la facturation # d’une institution hospitalière';
            }else if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '40'){
                erreur +='Montant demandé cpt b => Erreur code signe (# de + ou -)';
            }else if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '41'){
                erreur +='Montant demandé cpt b => Discordance entre montant ci-mentionné et total du fichier facturation pour la mutualité';
            }else if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '20'){
                erreur +='Montant demandé cpt b => Somme erronée';
            }
        }

        //Erreur sur le signe montant a + b ou montant demande a + b
        if(zones.find(z => z.zone === "4081") && zones.find(z => z.zone === "4081").value !== '00'){
            if(zones.find(z => z.zone === "4081") && zones.find(z => z.zone === "4081").value === '11'){
                erreur +='Total montant demandés cpt a + cpt b => Erreur de format';
            }else if(zones.find(z => z.zone === "4081") && zones.find(z => z.zone === "4081").value === '20'){
                erreur +='Total montant demandé cpt a + cpt b => Montant # somme des montants cpt a et cpt b';
            }else if(zones.find(z => z.zone === "4081") && zones.find(z => z.zone === "4081").value === '40'){
                erreur +='Total montant demandé cpt a + cpt b => Erreur code signe (# de + ou -)';
            }
        }

        //Erreur sur le nb d'enreg
        if(zones.find(z => z.zone === "4091") && zones.find(z => z.zone === "4091").value !== '00'){
            if(zones.find(z => z.zone === "4091") && zones.find(z => z.zone === "4091").value === '10'){
                erreur += 'Nb de records détail => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "4091") && zones.find(z => z.zone === "4091").value === '11'){
                erreur +='Nb de records détail => Erreur de format';
            }else if(zones.find(z => z.zone === "4091") && zones.find(z => z.zone === "4091").value === '20'){
                erreur += 'Nb de records détail => Somme erronée';
            }
        }

        //Erreur sur le num de controle par mutualite si 95 ou num de controle de l'envoi si 96
        if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "400").value !== '00'){
            if(zones.find(z => z.zone === "400") && zones.find(z => z.zone === "400").value === '95'){
                if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "4101").value === '10'){
                    erreur += 'N° de contrôle par mutualité => zone obligaoire non complétée';
                }else if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "4101").value === '11'){
                    erreur +='N° de contrôle par mutualité => Erreur de format';
                }
            }else if(zones.find(z => z.zone === "400") && zones.find(z => z.zone === "4101").value  === '96'){
                if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "4101").value === '10'){
                    erreur += 'N° de contrôle de l\'envoi => zone obligaoire non complétée';
                }else if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "4101").value === '11'){
                    erreur +='N° de contrôle de l\'envoi => Erreur de format';
                }
            }
        }

        return erreur;
    }

    SEG_getErrSegment_500(zones){
        var erreur = '';

        //Erreur sur le type de record
        if(zones.find(z => z.zone === "5001") && zones.find(z => z.zone === "5001").value  !== '00'){
            if(zones.find(z => z.zone === "5001") && zones.find(z => z.zone === "5001").value === '10'){
                erreur +='Type de record => Zone obligatoire';
            }else if(zones.find(z => z.zone === "5001") && zones.find(z => z.zone === "5001").value === '11'){
                erreur += 'Type de record => Erreur de format';
            }else if(zones.find(z => z.zone === "5001") && zones.find(z => z.zone === "5001").value === '20'){
                erreur += 'Type de record => Valeur non permise';
            }
        }

        //Erreur sur le num de mut
        if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value !== '00'){
            if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value === '10'){
                erreur += 'N° de mutualité => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value === '11'){
                erreur +='N° de mutualité => Erreur de format';
            }else if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value === '20'){
                erreur +='N° de mutualité => Numéro inconnu ou codification erronée';
            }else if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value === '21'){
                erreur += 'N° de mutualité => N° de mutualité non retrouvé dans le détail de la facturation';
            }
        }

        //Erreur sur le num fact
        if(zones.find(z => z.zone === "5021") && zones.find(z => z.zone === "5021").value !== '00'){
            if(zones.find(z => z.zone === "5021") && zones.find(z => z.zone === "5021").value === '10'){
                erreur +='N° de facture récapitulative => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "5021") && zones.find(z => z.zone === "5021").value === '11'){
                erreur += 'N° de facture récapitulative => Erreur de format';
            }
        }

        //Erreur sur le signe montant a ou montant demande a
        if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value !== '00'){
            if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value === '11'){
                erreur += 'Montant demandé cpt a => Erreur de format';
            }else if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value === '40'){
                erreur += 'Montant demandé cpt a => Erreur code signe (# de + ou -)';
            }else if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value === '41'){
                erreur +='Montant demandé cpt a => Discordance entre montant ci-mentionné et total du fichier facturation pour la mutualité';
            }else if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value === '20'){
                erreur += 'Montant demandé cpt a => Somme erronée';
            }
        }

        //Erreur sur le signe montant b ou montant demande b
        if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value !== '00'){
            if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '11'){
                erreur += 'Montant demandé cpt b => Erreur de format';
            }else if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '15'){
                erreur +='Montant demandé cpt b => Zone # de 0 si l\'émetteur n\est pas une institution hospitalière - Zone signe # de «blanc» et émetteur de la facturation # d’une institution hospitalière';
            }else if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '40'){
                erreur +='Montant demandé cpt b => Erreur code signe (# de + ou -)';
            }else if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '41'){
                erreur +='Montant demandé cpt b => Discordance entre montant ci-mentionné et total du fichier facturation pour la mutualité';
            }else if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '20'){
                erreur +='Montant demandé cpt b => Somme erronée';
            }
        }

        //Erreur sur le signe montant a + b ou montant demande a + b
        if(zones.find(z => z.zone === "5081") && zones.find(z => z.zone === "5081").value !== '00'){
            if(zones.find(z => z.zone === "5081") && zones.find(z => z.zone === "5081").value === '11'){
                erreur +='Total montant demandés cpt a + cpt b => Erreur de format';
            }else if(zones.find(z => z.zone === "5081") && zones.find(z => z.zone === "5081").value === '20'){
                erreur +='Total montant demandé cpt a + cpt b => Montant # somme des montants cpt a et cpt b';
            }else if(zones.find(z => z.zone === "5081") && zones.find(z => z.zone === "5081").value === '40'){
                erreur +='Total montant demandé cpt a + cpt b => Erreur code signe (# de + ou -)';
            }
        }

        //Erreur sur le nb d'enreg
        if(zones.find(z => z.zone === "5091") && zones.find(z => z.zone === "5091").value !== '00'){
            if(zones.find(z => z.zone === "5091") && zones.find(z => z.zone === "5091").value === '10'){
                erreur += 'Nb de records détail => Zone obligatoire non complétée';
            }else if(zones.find(z => z.zone === "5091") && zones.find(z => z.zone === "5091").value === '11'){
                erreur +='Nb de records détail => Erreur de format';
            }else if(zones.find(z => z.zone === "5091") && zones.find(z => z.zone === "5091").value === '20'){
                erreur += 'Nb de records détail => Somme erronée';
            }
        }

        //Erreur sur le num de controle par mutualite si 95 ou num de controle de l'envoi si 96
        if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value !== '00'){
            if(zones.find(z => z.zone === "500") && zones.find(z => z.zone === "500").value === '95'){
                if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value === '10'){
                    erreur += 'N° de contrôle par mutualité => zone obligaoire non complétée';
                }else if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value === '11'){
                    erreur +='N° de contrôle par mutualité => Erreur de format';
                }
            }else if(zones.find(z => z.zone === "500") && zones.find(z => z.zone === "500").value === '96'){
                if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value === '10'){
                    erreur += 'N° de contrôle de l\'envoi => zone obligatoire non complétée';
                }else if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value === '11'){
                    erreur +='N° de contrôle de l\'envoi => Erreur de format';
                }
            }
        }

        return erreur;
    }

    _getBatchStatus(batchStatus){
           return  !!(batchStatus & (1 << 21)) ? "archived" :
                   !!(batchStatus & (1 << 17)) ? "error" :
                   !!(batchStatus & (1 << 16)) ? "partially accepted" :
                   !!(batchStatus & (1 << 15)) ? "fully accepted" :
                   !!(batchStatus & (1 << 12)) ? "rejected":
                   !!(batchStatus & (1 << 11)) ? "treated":
                   !!(batchStatus & (1 << 10)) ? "acceptedForTreatment":
                   !!(batchStatus & (1 << 9))  ? "successfullyTransmittedToOA":
                   !!(batchStatus & (1 << 8))  ? "pending":
                   !!(batchStatus & (1 << 7))  ? "pending": ""
    }

    _batchCanBeArchived(){
        const res = this._getBatchStatus(_.get(this, 'selectedInvoiceForDetail.message.status', null)) !== "archived"
        this.set('batchCanBeArchived', res)
    }

    _getMessage(){
        this.dispatchEvent(new CustomEvent('get-message', {bubbles: true, composed: true}))
    }

    _openArchiveDialog(){
        if(_.get(this, 'selectedInvoiceForDetail.message.id', null)){
            this.shadowRoot.querySelector("#archiveBatchDialog").open()
        }
    }

    _archiveBatch(){
        if(_.get(this, 'selectedInvoiceForDetail.message.id', null)){
            this.set('isLoading', true)
            const newStatus = (_.get(this, 'selectedInvoiceForDetail.message.status', null) | (1 << 21))
            this.set('selectedInvoiceForDetail.message.status', newStatus)
            this.api.message().modifyMessage(_.get(this, 'selectedInvoiceForDetail.message', null))
                .then(msg => this.api.register(msg, 'message'))
                .then(msg => this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: msg.invoiceIds.map(i => i)})))
                .then(invoices => invoices.map(inv => {
                    inv.invoicingCodes.map(ic => ic.archived = true)
                    this.api.invoice().modifyInvoice(inv).then(inv => this.api.register(inv,'invoice'))
                }))
                .finally(() => {
                    this._closeArchiveDialog()
                    this._closeDetailPanel()
                    this._getMessage()
            })
        }
    }

    _closeArchiveDialog(){
        this.shadowRoot.querySelector("#archiveBatchDialog").close()
    }

    _openResendDialog(){
        if(_.get(this, 'selectedInvoiceForDetail.message.id', null)){
            this.shadowRoot.querySelector("#resendingBatchDialog").open()
        }
    }

    _transferInvoicesForResending(){
        if(_.get(this, 'selectedInvoiceForDetail.message.id', {}) && _.size(_.get(this, 'selectedInvoiceForDetail.message.invoiceIds', [])) > 0){
            this.set('isLoading', true);
            let prom = Promise.resolve({})
            this.api.setPreventLogging()
            this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: _.get(this, 'selectedInvoiceForDetail.message.invoiceIds', []).map(id => id)}))
                .then(invs => {
                    invs.map(inv => {
                        inv.invoicingCodes.map(ic => ic.pending = false)
                        inv.sentDate = null
                        prom = prom.then(invs => this.api.invoice().modifyInvoice(inv)
                            .then(() => _.concat(invs, [inv]))
                            .catch(e => console.log('Erreur lors du traitement de la facture', inv, e))
                        )
                    })

                    return prom.then(() => {
                        return this.api.message().getMessage(_.get(this, 'selectedInvoiceForDetail.message.id', {})).then(msg => {
                            msg.status = (msg.status | (1 << 21))
                            this.api.message().modifyMessage(msg)
                                .then(msg => this.api.register(msg, 'message'))
                                .then(msg => {
                                    console.log(msg)
                                    this._closeResendDialog()
                                    this._closeDetailPanel()
                                    this._getMessage()
                                })
                                .catch(e => console.log("Erreur lors de l'archivage du message", msg, e))
                        })
                    })
                })
                .finally(()=>{
                    this._closeResendDialog()
                    this._closeDetailPanel()
                })
        }
    }

    _closeResendDialog(){
        this.shadowRoot.querySelector("#resendingBatchDialog").close()
    }

    _getRefusedAmount(totalAmount, acceptedAmount){
        return this.findAndReplace(((Number(Number(totalAmount) - Number(acceptedAmount)).toFixed(2)).toString()),'.',',')
    }

    _getStatusOfInvoiceCode(codeStatus, invCode){
        return invCode !== "En cours" && invCode !== "En cours de traitement" ? codeStatus : invCode
    }

    _filterValueChanged(){
        if(this.filter){
            const keywordsString = _.trim(_.get(this,"filter","")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            const keywordsArray = _.compact(_.uniq(_.map(keywordsString.split(" "), i=>_.trim(i))))

            setTimeout(() => {
                if(parseInt(_.get(keywordsString,"length",0)) > 2) {
                    const invoiceSearchResults =  _.chain(_.get(this, "invoicesFromBatch", []))
                        .chain(_.get(this, "filter", []))
                        .filter(i => _.size(keywordsArray) === _.size(_.compact(_.map(keywordsArray, keyword => _.trim(_.get(i, "normalizedSearchTerms", "")).indexOf(keyword) > -1))))
                        .compact()
                        .uniq()
                        .orderBy(['code', 'label.' + this.language, 'id'], ['asc', 'asc', 'asc'])
                        .value()
                    this.set('filteredInvoicesFormBatch', _.sortBy(invoiceSearchResults, ['insuranceCode'], ['asc']))
                }else{
                    this.set('filteredInvoicesFormBatch', _.sortBy(_.get(this, 'invoicesFromBatch', []), ['insuranceCode'], ['asc']))
                }
            }, 100)
        }else{
            this.set('filteredInvoicesFormBatch', _.sortBy(_.get(this, 'invoicesFromBatch', []), ['insuranceCode'], ['asc']))
        }
    }

    _createInvoiceToBeCorrectedFromBatch(){
        if(!_.isEmpty(_.get(this, 'selectedInvoiceForDetail', {})) && _.size(_.get(this, 'invoicesFromBatch', [])) > 0 && _.size(_.compact(_.get(this, 'invoicesFromBatch', []).map(inv => _.get(inv, 'invoice.invoicingCodes', []).map(c => _.get(c, 'accepted', null) === false ? _.get(c, 'accepted', null) : null)))) > 0){
            this.set('isLoading', true)
            this._createInstanceOfNewInvoiceFromList(_.get(this, 'invoicesFromBatch', []))
                .then(listOfInvoice => this._createNewInvoiceFromList(listOfInvoice))
                .then(listOfInvoice => {
                    this._archiveBatch()
                })
        }
    }

    _createInstanceOfNewInvoiceFromList(invoicesFromBatch){
        let prom = Promise.resolve()
        _.compact(invoicesFromBatch).map(inv => {
            _.size(_.compact(_.get(inv, 'invoice.invoicingCodes', []).map(c => _.get(c, 'accepted', null) === false ? _.get(c, 'accepted', null) : null))) > 0 ?
            prom = prom.then(listOfInvoice =>
                this.api.invoice().newInstance(this.user, _.get(inv, 'patientDto', {}), _.omit(_.get(inv, 'invoice', {}), [
                    "id", "rev", "deletionDate", "created", "modified", "sentDate", "printedDate",
                    "secretForeignKeys", "cryptedForeignKeys", "delegations", "encryptionKeys",
                    "invoicingCodes", "error", "receipts", "encryptedSelf"])
                ).then(ninv => {
                    inv.invoice.correctiveInvoiceId = _.get(ninv, 'id', null)
                    ninv.correctedInvoiceId = _.get(inv, 'invoice.id', null)
                    ninv.invoicingCodes = _.get(inv, 'invoice.invoicingCodes', []).map(invc =>
                        !_.get(invc, 'accepted', false) ? _.assign(_.omit(invc, ["id", "accepted", "canceled", "pending", "resent", "archived"]), {
                            id: this.api.crypto().randomUuid(),
                            accepted: false,
                            canceled: false,
                            pending: true,
                            resent: true,
                            archived: false
                        }) : null
                    )

                    return _.concat(listOfInvoice, {invoice: _.get(inv, 'invoice', {}), correctiveInvoice: ninv})

                })) : Promise.resolve()
        })

        return prom
    }

    _createNewInvoiceFromList(listOfInvoice){
        let prom = Promise.resolve()
        _.compact(listOfInvoice).map(inv => {
            prom = prom.then(newInvoiceList => this.api.insurance().getInsurance(_.get(inv, 'correctiveInvoice.recipientId', null))
                .then(ins => this.api.insurance().getInsurance(_.get(ins, 'parent', null)))
                .then(parentIns => this.api.invoice().createInvoice(_.get(inv, 'correctiveInvoice', {}), 'invoice:' + this.user.healthcarePartyId + ':' + _.get(inv, 'parentIns.code', '000') + ':'))
                .then(ninv => {
                    return _.concat(newInvoiceList, {invoice: _.get(inv, 'invoice', {}), correctiveInvoice: ninv})
                }))
        })

        return prom
    }

}

customElements.define(HtMsgInvoiceBatchDetail.is, HtMsgInvoiceBatchDetail);
