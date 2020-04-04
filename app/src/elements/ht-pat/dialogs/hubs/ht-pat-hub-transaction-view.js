import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import './ht-pat-hub-medication-scheme-view.js';
import './ht-pat-hub-diarynote-view.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/paper-tabs-style.js';
import * as models from 'icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';
import { Base64 } from 'js-base64';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatHubTransactionViewSecond extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="scrollbar-style dialog-style paper-tabs-style">

            #dialog .hub-cons{
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                box-sizing: border-box;
            }

            #dialog paper-button.action {
                --paper-button-ink-color: var(--app-secondary-color-dark);
                font-weight: 400;
                font-size: 12px;
                height: 32px;
                padding: 10px 1.2em;
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                background: var(--app-secondary-color);
                color: var(--app-primary-color-dark);
                justify-self: flex-end;
            }
            #dialog .hub-cons paper-button.action[disabled] {
                background-color: var(--app-secondary-color-dark);
                color: var(--app-text-color-disabled);
                box-shadow: none;
            }

            #dialog .hub-cons .buttons {
                right: 24px;
                position: absolute;
            }

            #dialog .hub-cons vaadin-date-picker {
                margin-right: 8px;
            }

            #dialog a {
                text-decoration: none;
                color:	var(--app-secondary-color);
            }

            #dialog{
                min-height: 800px;
                min-width: 1024px;
            }

            #dialog .hub-doc {
                overflow: auto ;
                max-height: 500px;
            }



            .links {
                position: absolute;
                right: 0;
            }

            .pills {
                float: right;
            }

            dynamic-link {
                float: right;
                top:4px;
            }

            vaadin-combo-box {
                width: 100%;
            }

            vaadin-text-area {
                width: 100%;
            }

            .containerHubCons {
                height: 58px;
                display: flex;
            }

            #par-search {
                flex: 1;
            }

            #dialog .hub-info{
                margin-top:0;
                display:flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            #dialog .hub-info div{
                margin-right: 24px;
            }

            #dialog .hub-info div p{
                margin: 8px 0;
            }

            #dialog .hub-info div b{
                margin-right: 8px;
            }

            .modal-title{
                background:  var(--app-background-color-dark);
                margin-top: 0;
                padding: 16px 24px;
            }

            .end-buttons {
                display: flex;
                position: absolute;
                right: 0;
                bottom: 0;
            }

            ht-spinner {
                position: relative;
                height: 42px;
                width: 42px;
            }

            #kmehr_slot{
                overflow-y: scroll;
                height: 90%;
            }

            #titleInfo{
                height: 20px;
                width: 98%;
                margin-bottom: 12px;
                font-size: 20px;
                font-weight: bold;
            }

            .headerInfo{
                height: auto;
                width: 100%;
                box-sizing: border-box;
            }

            #blockInfo{
                height: auto;
                width: 100%;
                box-sizing: border-box;
            }

            .headerInfoLine{
                width: 100%;
                padding: 4px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .headerInfoField{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                align-content: stretch;
                width: calc(100% / 4);
                padding: 0 8px;
                box-sizing: border-box;
            }

            .headerLabel{
                font-weight: bold;
            }

            .hub-doc-container{
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                margin-bottom: 12px;
            }

            .headerMasterTitle{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }

            .blockInfo{
                height: auto;
                width: 100%;
                box-sizing: border-box;
            }

            .vaadinStyle{
                height: auto;
                border: none;
            }

            .doNotDisplay {
                display: none;
            }

            .pageContent{
                padding: 12px;
                width: auto;
                box-sizing: border-box;
            }

            iron-pages{
                height: calc(100% - 48px);
                width: auto;
                overflow: auto;
            }

            .selectedDocumentToImportContent{
                height: 260px;
                width: auto;
                margin: 12px;
            }

            #importHubDocumentDialog{
                height: 400px;
                width: 650px;
            }

            .pat-details-card > .card-content {
                padding: 16px 16px 32px !important;
            }

            .pat-details-card {
                margin: 0 32px 32px;
                padding:0 8px 8px;
                overflow: hidden;
                width: calc(100%);
            }

            .pat-details-card.fullWidth {
                margin: 0 0 32px 0;
                width: 100%;
            }

            .pat-details-card hr {
                border: 1px solid var(--app-background-color-darker)
            }

            .form-title {
                color: var(--app-primary-color);
                border-top: 2px solid var(--app-background-color-dark);
                border-radius: 2px 2px 0 0;
                background: var(--app-background-color-dark);
                font-size: 12px;
                margin: 0 0 8px -8px;
                padding: 2px 4px 2px 20px;
                display: flex;
                flex-flow: row nowrap;
                width: calc(100% - 8px);
                text-align: left;
                justify-content: space-between;
                align-items: center;
            }
            .form-title > span {
                flex-grow: 1;
                min-width: 100px;
            }

            .form-title >div {
                flex-grow: 0;
                min-width: 20px;
            }

            .full-height {
                height: 100%;
            }

            .tabIcon{
                padding-right: 10px;
            }

            .tel-line{
                display: flex;
                align-items: center;
            }

            .tel-line iron-icon{
                color: var(--app-text-color-disabled);
                height: 16px;
                width: 16px;
                margin-right: 4px;
            }

            .chronicIcon{
                height: 12px;
                width: 12px;
            }

            .oneShotIcon{
                height: 12px;
                width: 12px;
                color: #c60b44;
            }

            .legend-oneShotIcon{
                height: 18px;
                width: 18px;
                color: #c60b44;
            }

            .legend-compoundIcon{
                height: 14px;
                width: 14px;
                color: #2882ff;
            }

            .legend-substanceIcon{
                height: 14px;
                width: 14px;
                color: #c62ac4;
            }

            .legend-line{
                margin-right: 8px;
                font-size: var(--font-size-normal);
            }

            #legend {
                background: var(--app-background-color);
                border-radius: 4px;
                padding: 4px;
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 12px;
            }

            .vaadin-temporality{
                width: 30px!important;
            }

        </style>

            <paper-tabs selected="{{tabs}}">
                <paper-tab>
                    <iron-icon class="tabIcon" icon="vaadin:male"></iron-icon> [[localize('tra_vwr','Viewer',language)]]
                </paper-tab>
                <paper-tab class="doNotDisplay" id="tabAttachments">
                    <iron-icon class="tabIcon" icon="editor:attach-file"></iron-icon> [[_getAttachmentCount(attachmentCount)]] [[localize('attachments','Attachments',language)]]
                </paper-tab>
                <paper-tab>
                    <iron-icon class="tabIcon" icon="maps:local-library"></iron-icon> [[localize('tra_acc_tra','Trace',language)]]
                </paper-tab>
                <template is="dom-if" if="[[_haveDiaryNote(diaryNote, diaryNote.*)]]">
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:newspaper"></iron-icon> [[localize('diarynotes','Journal notes',language)]]
                    </paper-tab>
                </template>
               <!--<paper-tab>[[localize('json_vwr','JSON View',language)]]</paper-tab>-->
            </paper-tabs>
            <iron-pages selected="[[tabs]]">
                <page> <!-- info -->
                    <div class="pageContent">
                        <div id="titleInfo">
                            [[_localizeTransactionType(transInfo)]]
                            <ht-spinner active="[[isLoading]]"></ht-spinner>
                        </div>
                        <template is="dom-if" if="[[_isMedicationView(transInfo)]]">
                            <ht-pat-hub-medication-scheme-view id="medicationSchemeView" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" resources="[[resources]]" current-medication-scheme="[[currentMedicationScheme]]"></ht-pat-hub-medication-scheme-view>
                        </template>
                        <template is="dom-if" if="[[!_isMedicationView(transInfo)]]">
                            <div class="hub-doc">
                                <template is="dom-repeat" items="[[message.folders]]" as="folder">
                                    <div class="hub-doc-container">
                                        <div class="headerMasterTitle headerLabel">[[localize('hub_pat','Patient',language)]]</div>
                                        <div class="headerInfo">
                                            <div class="headerInfoLine">
                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_las_nam','Last name',language)]]: &nbsp; </span> [[folder.patient.familyname]]</div>
                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_fir_nam','First name',language)]]: &nbsp; </span> [[folder.patient.firstnames.0]] ([[folder.patient.sex.value]])</div>
                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_bir_dat','Birth date',language)]]: &nbsp; </span> [[dateFormat(folder.patient.birthdate)]]</div>
                                                <template is="dom-repeat" items="[[folder.patient.addresses]]" as="address">
                                                        <div class="headerInfoField tel-line"><span class="headerLabel">[[localize('hub_adr','Adress',language)]] </span>
                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'work')]]"><iron-icon icon="social:domain"></iron-icon></template>
                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'home')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'other')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'vacation')]]"><iron-icon icon="places:beach-access"></iron-icon></template>
                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'careaddress')]]"><iron-icon icon="social:location-city"></iron-icon></template>
                                                            [[address.street]] [[address.houseNumber]] [[address.postboxNumber]] [[address.zip]] [[address.city]]</div>
                                                    </template>
                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_inss','Inss',language)]]: &nbsp; </span> </div>
                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_loc','Locality',language)]]: &nbsp; </span> [[folder.patient.addresses.0.zip]] [[folder.patient.addresses.0.city]]</div>
                                            </div>
                                        </div>
                                    </div>

                                    <template is="dom-repeat" items="[[folder.transactions]]" as="trn">
                                        <!-- Transaction general info : rsw/vitalink/ ... ids, creation date -->
                                        <div class="hub-doc-container">
                                            <div class="headerMasterTitle headerLabel">[[localize('tra_info','Transaction info',language)]]</div>
                                            <div class="headerInfo">
                                                <div class="headerInfoLine">
                                                    <div class="headerInfoField"><span class="headerLabel">[[localize('cre_dat','Creation date',language)]]: </span>[[_transactionDateTime(trn)]]</div>
                                                    <template is="dom-repeat" items="[[trn.ids]]" as="id">
                                                        <div class="headerInfoField"><span class="headerLabel">[[id.s]]/[[id.sl]] : </span>[[id.value]]</div>
                                                    </template>
                                                </div>
                                                <template is="dom-repeat" items="[[_transactionCD_S(trn)]]" as="s">
                                                    <div class="headerInfoLine">
                                                        <div class="headerInfoField"><span class="headerLabel">[[s]] : </span>[[_transactionCDByS(trn, s)]]</div>
                                                    </div>
                                                </template>
                                            </div>
                                        <template is="dom-if" if="[[_isAuthor(trn.author.hcparties)]]">
                                            <div class="hub-doc-container">
                                                <div class="headerMasterTitle headerLabel">[[localize('hub_auth','Author(s)',language)]]</div>
                                                <template is="dom-repeat" items="[[_getHcpInfo(trn.author.hcparties)]]" as="hcp">
                                                    <div class="headerInfo">
                                                        <div class="headerInfoLine">
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_las_nam','Last name',language)]]: &nbsp;</span> [[hcp.name]] [[hcp.familyName]]</div>
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_fir_nam','First name',language)]]: &nbsp;</span> [[hcp.firstName]]</div>
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_hcp_type','Type',language)]]: &nbsp;</span> [[_localizeHcpType(hcp.type)]]</div>
                                                            <template is="dom-repeat" items="[[hcp.addresses]]" as="address">
                                                                <div class="headerInfoField tel-line"><span class="headerLabel">[[localize('hub_adr','Adress',language)]] </span>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'work')]]"><iron-icon icon="social:domain"></iron-icon></template>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'home')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'other')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'vacation')]]"><iron-icon icon="places:beach-access"></iron-icon></template>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'careaddress')]]"><iron-icon icon="social:location-city"></iron-icon></template>
                                                                    [[address.street]] [[address.houseNumber]] [[address.postboxNumber]] [[address.zip]] [[address.city]]</div>
                                                            </template>
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_inss','Inss',language)]]: &nbsp;</span> [[hcp.inss]]</div>
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_nihii','Nihii',language)]]: &nbsp;</span> [[hcp.nihii]]</div>
                                                            <template is="dom-repeat" items="[[hcp.telecoms]]" as="tel">
                                                                <template is="dom-if" if="[[tel.telecomNumber]]">
                                                                    <div class="headerInfoField tel-line">
                                                                        <template is="dom-if" if="[[_isEqual(tel.telecomType,'phone')]]"> <iron-icon icon="maps:local-phone"></iron-icon> </template>
                                                                        <template is="dom-if" if="[[_isEqual(tel.telecomType,'email')]]"> <iron-icon icon="icons:mail"></iron-icon> </template>
                                                                        <template is="dom-if" if="[[_isEqual(tel.telecomType,'fax')]]"> <iron-icon icon="icons:print"></iron-icon> </template> 
                                                                        [[tel.telecomNumber]] ([[tel.addressType]])
                                                                    </div>
                                                                </template>
                                                            </template> 
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </template>
                                        <template is="dom-if" if="[[_isRedactor(trn.redactor.hcparties)]]">
                                            <div class="hub-doc-container">
                                                <div class="headerMasterTitle headerLabel">[[localize('hub_redact','Redactor(s)',language)]]</div>
                                                <template is="dom-repeat" items="[[_getHcpInfo(trn.redactor.hcparties)]]" as="hcp">
                                                    <div class="headerInfo">
                                                        <div class="headerInfoLine">
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_las_nam','Last name',language)]]: </span> [[hcp.name]] [[hcp.familyName]]</div>
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_fir_nam','First name',language)]]: </span> [[hcp.firstName]]</div>
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_hcp_type','Type',language)]]: </span> [[_localizeHcpType(hcp.type)]]</div>
                                                            <template is="dom-repeat" items="[[hcp.addresses]]" as="address">
                                                                <div class="headerInfoField tel-line"><span class="headerLabel">[[localize('hub_adr','Adress',language)]] </span>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'work')]]"><iron-icon icon="social:domain"></iron-icon></template>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'home')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'other')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'vacation')]]"><iron-icon icon="places:beach-access"></iron-icon></template>
                                                                    <template is="dom-if" if="[[_isEqual(address.addressType,'careaddress')]]"><iron-icon icon="social:location-city"></iron-icon></template>
                                                                    [[address.street]] [[address.houseNumber]] [[address.postboxNumber]] [[address.zip]] [[address.city]]</div>
                                                            </template>
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_inss','Inss',language)]]: </span> [[hcp.inss]] </div>
                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_nihii','Nihii',language)]]: </span> [[hcp.nihii]] </div>
                                                            <template is="dom-repeat" items="[[hcp.telecoms]]" as="tel">
                                                                <template is="dom-if" if="[[tel.telecomNumber]]">
                                                                    <div class="headerInfoField tel-line">
                                                                        <template is="dom-if" if="[[_isEqual(tel.telecomType,'phone')]]"> <iron-icon icon="maps:local-phone"></iron-icon> </template>
                                                                        <template is="dom-if" if="[[_isEqual(tel.telecomType,'email')]]"> <iron-icon icon="icons:mail"></iron-icon> </template>
                                                                        <template is="dom-if" if="[[_isEqual(tel.telecomType,'fax')]]"> <iron-icon icon="icons:print"></iron-icon> </template> 
                                                                        [[tel.telecomNumber]] ([[tel.addressType]])
                                                                    </div>
                                                                </template>
                                                            </template> 
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </template>
                                        <template is="dom-if" if="[[_isSumehrType(transInfo)]]">
                                            <template is="dom-repeat" items="[[_processTransactionItemAndHeadingItem(trn)]]" as="item">
                                                <div class="hub-doc-container">
                                                    <div class="headerMasterTitle headerLabel">[[_getTraduction(item.0.type)]]</div>

                                                    <div class="blockInfo">

                                                        <template is="dom-if" if="[[_ifTableView(item.0.type)]]">
                                                            <template is="dom-if" if="[[_isVaccineData(item.0.type)]]">
                                                                <vaadin-grid class="vaadinStyle" items="[[item]]">
                                                                    <vaadin-grid-column>
                                                                        <template class="header">
                                                                            [[localize('hub_titl','Title',language)]]
                                                                        </template>
                                                                        <template>
                                                                            [[_getTitle(item.contents, item.type)]]
                                                                        </template>
                                                                    </vaadin-grid-column>
                                                                    <vaadin-grid-column>
                                                                        <template class="header">
                                                                            [[localize('hub_sta_dat','Start date',language)]]
                                                                        </template>
                                                                        <template>
                                                                            [[_convertHubDateAsString(item.beginMoment)]]
                                                                        </template>
                                                                    </vaadin-grid-column>
                                                                    <vaadin-grid-column>
                                                                        <template class="header">
                                                                            [[localize('hub_code','Code',language)]]
                                                                        </template>
                                                                        <template>
                                                                            <template is="dom-repeat" items="[[_getCode(item.contents, item.type)]]" as="code">
                                                                                [[code.code]] [[_localizeVaccine(code.value)]]<br>
                                                                            </template>
                                                                        </template>
                                                                    </vaadin-grid-column>
                                                                </vaadin-grid>
                                                            </template>
                                                            <template is="dom-if" if="[[_isMedicationData(item.0.type)]]">
                                                                <div id="legend">
                                                                    <span class="legend-line bold">[[localize('legend', 'Legend', language)]]: </span>
                                                                    <span class="legend-line"><iron-icon class="legend-chronicIcon" icon="icons:alarm-on"></iron-icon> [[localize('hub-chron-med', 'Chronic medication', language)]]</span>
                                                                    <span class="legend-line"><iron-icon class="legend-oneShotIcon" icon="vaadin:thumbs-up-o"></iron-icon> [[localize('hub-one-shot', 'One shot', language)]]</span>
                                                                </div>
                                                                <vaadin-grid class="vaadinStyle" items="[[item]]">
                                                                    <vaadin-grid-column>
                                                                        <template class="header">
                                                                            [[localize('medication','Medication',language)]]
                                                                        </template>
                                                                        <template>
                                                                            <template is="dom-if" if="[[_isChronic(item.temporality)]]">
                                                                                <iron-icon class="chronicIcon" icon="icons:alarm-on"></iron-icon>
                                                                            </template>
                                                                            <template is="dom-if" if="[[_isOneShot(item.temporality)]]">
                                                                                <iron-icon class="oneShotIcon" icon="vaadin:thumbs-up-o"></iron-icon>
                                                                            </template>
                                                                            [[_getTitle(item.contents, item.type)]]
                                                                        </template>
                                                                    </vaadin-grid-column>
                                                                    <vaadin-grid-column>
                                                                        <template class="header">
                                                                            [[localize('pos','Posology',language)]]
                                                                        </template>
                                                                        <template>
                                                                            <template is="dom-repeat" items="[[item.regimen]]" as="regimen">
                                                                                [[_getRegimenAsText(regimen)]] <br>
                                                                            </template>
                                                                        </template>
                                                                    </vaadin-grid-column>
                                                                    <vaadin-grid-column>
                                                                        <template class="header">
                                                                            [[localize('hub_sta_dat','Start date',language)]]
                                                                        </template>
                                                                        <template>
                                                                            [[_convertHubDateAsString(item.beginMoment)]]
                                                                        </template>
                                                                    </vaadin-grid-column>
                                                                    <vaadin-grid-column>
                                                                        <template class="header">
                                                                            [[localize('hub_end_dat','End date',language)]]
                                                                        </template>
                                                                        <template>
                                                                            [[_convertHubDateAsString(item.endMoment)]]
                                                                        </template>
                                                                    </vaadin-grid-column>
                                                                    <vaadin-grid-column>
                                                                        <template class="header">
                                                                            [[localize('hub_code','Code',language)]]
                                                                        </template>
                                                                        <template>
                                                                            <template is="dom-repeat" items="[[_getCode(item.contents, item.type)]]" as="code">
                                                                                [[code.code]] [[code.value]]<br>
                                                                            </template>
                                                                        </template>
                                                                    </vaadin-grid-column>
                                                                </vaadin-grid>
                                                            </template>
                                                            <template is="dom-if" if="[[_isOtherData(item.0.type)]]">
                                                                <template is="dom-if" if="[[item.0.noItemsOfTypeItem]]">
                                                                    [[localize('hub_no_items_of_type_present', 'Not present', language)]]
                                                                </template>
                                                                <template is="dom-if" if="[[!item.0.noItemsOfTypeItem]]">
                                                                    <vaadin-grid class="vaadinStyle" items="[[item]]">
                                                                        <vaadin-grid-column>
                                                                            <template class="header">
                                                                                [[localize('hub_titl','Title',language)]]
                                                                            </template>
                                                                            <template>
                                                                                [[_getTitle(item.contents, item.type)]]
                                                                            </template>
                                                                        </vaadin-grid-column>
                                                                        <vaadin-grid-column>
                                                                            <template class="header">
                                                                                [[localize('hub_sta_dat','Start date',language)]]
                                                                            </template>
                                                                            <template>
                                                                                [[_convertHubDateAsString(item.beginMoment)]]
                                                                            </template>
                                                                        </vaadin-grid-column>
                                                                        <vaadin-grid-column>
                                                                            <template class="header">
                                                                                [[localize('hub_end_dat','End date',language)]]
                                                                            </template>
                                                                            <template>
                                                                                [[_convertHubDateAsString(item.endMoment)]]
                                                                            </template>
                                                                        </vaadin-grid-column>
                                                                        <vaadin-grid-column>
                                                                            <template class="header">
                                                                                [[localize('hub_code','Code',language)]]
                                                                            </template>
                                                                            <template>
                                                                                <template is="dom-repeat" items="[[_getCode(item.contents, item.type)]]" as="code">
                                                                                    [[code.code]] [[code.value]]<br>
                                                                                </template>
                                                                            </template>
                                                                        </vaadin-grid-column>
                                                                    </vaadin-grid>
                                                                </template>
                                                            </template>

                                                        </template>

                                                        <template is="dom-if" if="[[!_ifTableView(item.0.type)]]">
                                                            <template is="dom-repeat" items="[[item]]" as="item">

                                                                <template is="dom-if" if="[[_isHcp(item.type)]]">
                                                                    <template is="dom-repeat" items="[[item.contents]]" as="content">
                                                                        <template is="dom-repeat" items="[[content.authors]]" as="hcp">
                                                                            <div class="headerInfoLine">
                                                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_las_nam','Last name',language)]]: </span> [[hcp.name]] [[hcp.familyName]]</div>
                                                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_fir_nam','First name',language)]]: </span> [[hcp.firstName]]</div>
                                                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_hcp_type','Type',language)]]: </span> [[_localizeHcpType(hcp.type)]]</div>
                                                                                <template is="dom-repeat" items="[[hcp.addresses]]" as="address">
                                                                                        <div class="headerInfoField tel-line"><span class="headerLabel">[[localize('hub_adr','Adress',language)]] </span>
                                                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'work')]]"><iron-icon icon="social:domain"></iron-icon></template>
                                                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'home')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'other')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'vacation')]]"><iron-icon icon="places:beach-access"></iron-icon></template>
                                                                                            <template is="dom-if" if="[[_isEqual(address.addressType,'careaddress')]]"><iron-icon icon="social:location-city"></iron-icon></template>
                                                                                            [[address.street]] [[address.houseNumber]] [[address.postboxNumber]] [[address.zip]] [[address.city]]</div>
                                                                                    </template>
                                                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_inss','Inss',language)]]: </span> [[hcp.inss]] </div>
                                                                                <div class="headerInfoField"><span class="headerLabel">[[localize('hub_nihii','Nihii',language)]]: </span> [[hcp.nihii]] </div>
                                                                            </div>
                                                                        </template>
                                                                    </template>
                                                                </template>

                                                                <template is="dom-if" if="[[_isPerson(item.type)]]">
                                                                    <template is="dom-repeat" items="[[item.contents]]" as="content">
                                                                        <div class="headerInfoLine">
                                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_las_nam','Last name',language)]]: </span> [[content.persons.name]] [[content.persons.familyName]]</div>
                                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_fir_nam','First name',language)]]: </span> [[content.persons.firstName]]</div>
                                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_person_type','Rel type ',language)]]: </span> [[content.persons.type]]</div>
                                                                            <template is="dom-repeat" items="[[content.persons.addresses]]" as="address">
                                                                                    <div class="headerInfoField tel-line"><span class="headerLabel">[[localize('hub_adr','Adress',language)]] </span>
                                                                                        <template is="dom-if" if="[[_isEqual(address.addressType,'work')]]"><iron-icon icon="social:domain"></iron-icon></template>
                                                                                        <template is="dom-if" if="[[_isEqual(address.addressType,'home')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                                                        <template is="dom-if" if="[[_isEqual(address.addressType,'other')]]"><iron-icon icon="icons:home"></iron-icon></template>
                                                                                        <template is="dom-if" if="[[_isEqual(address.addressType,'vacation')]]"><iron-icon icon="places:beach-access"></iron-icon></template>
                                                                                        <template is="dom-if" if="[[_isEqual(address.addressType,'careaddress')]]"><iron-icon icon="social:location-city"></iron-icon></template>
                                                                                        [[address.street]] [[address.houseNumber]] [[address.postboxNumber]] [[address.zip]] [[address.city]]</div>
                                                                                </template>
                                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_inss','Inss',language)]]: </span> [[content.persons.inss]] </div>
                                                                            <div class="headerInfoField"><span class="headerLabel">[[localize('hub_loc','Locality',language)]]: </span> [[content.persons.addresses.0.zip]] [[content.persons.addresses.0.city]]</div>
                                                                        </div>
                                                                    </template>
                                                                </template>

                                                                <template is="dom-if" if="[[_isPatientWill(item.type)l]]" as="pw">
                                                                    <template is="dom-repeat" items="[[item.contents]]" as="content">
                                                                        <template is="dom-repeat" items="[[content.cds]]" as="will">
                                                                            <div class="headerInfoLine">
                                                                                [[_getPatientWill(will)]]
                                                                            </div>
                                                                        </template>
                                                                    </template>
                                                                </template>
                                                            </template>
                                                        </template>
                                                    </div>
                                                </div>
                                            </template>
                                        </template>
                                    </div></template>
                                </template>
                            </div>
                        </template>
                    </div>
                </page>
                <page> <!--  -->
                    <div class="pageContent">
                        <div class="hub-doc">
                            <!--                    <div class="headerMasterTitle headerLabel">[[localize('hub_pat','First name',language)]]</div>-->
<!--                            <template is="dom-if" if="[[!_isSumehrType(transInfo)]]">-->
                                <template is="dom-repeat" items="[[message.folders]]" as="folder">
                                    <template is="dom-repeat" items="[[folder.transactions]]" as="trn">
                                        <template is="dom-repeat" items="[[_txtsWithCnt(trn)]]" as="txt">
                                            <paper-card class="pat-details-card ">
                                                <div class="form-title"> &nbsp;</div>
                                                <p>[[_textData(txt.value)]]</p>
                                            </paper-card>
                                        </template>
                                        <template is="dom-repeat" items="[[_textsWithLayoutWithCnt(trn)]]" as="ftxt">
                                            <dynamic-doc api="[[api]]" user="[[user]]" patient="[[patient]]" data="[[_textWithLayoutData(ftxt)]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" title="[[lnk.mediatype]]" downloadable="true" preview="true" is-pat-detail="false"></dynamic-doc>
                                           <!-- <paper-button class="button" on-tap="_importDocumentIntoPatient" data-item\$=[[ftxt]]><iron-icon icon="icons:assignment-returned" class="mr5 smallIcon" ></iron-icon> [[localize('imp-pat','Import',language)]]</paper-button>-->
                                        </template>
                                        <template is="dom-repeat" items="[[_lnksWithCnt(trn)]]" as="lnk">
                                            <dynamic-doc api="[[api]]" user="[[user]]" patient="[[patient]]" data="[[_linkData(lnk)]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" title="[[lnk.mediatype]]" transaction-info="[[trn]]" downloadable="true" preview="true" is-pat-detail="false" hub-importable="true" on-import-hub-document="_importDocumentIntoPatientDialog"></dynamic-doc>
                                            </template>
                                    </template>
                                </template>
<!--                            </template>-->
                        </div>
                    </div>
                </page>
                <page>
                    <div class="pageContent full-height">
                        <div class="hub-doc full-height">
                            <vaadin-grid id="transactionaccess-list" class="material full-height" overflow="bottom" items="[[auditTrail.transactionaccesslist.transactionaccesses]]" active-item="{{activeItem}}">
                                <vaadin-grid-column width="80px">
                                    <template class="header">[[localize('dat','Date',language)]]</template>
                                    <template>
                                        <div class="cell frozen">[[_transactionAccessDate(item)]]</div>
                                    </template>
                                </vaadin-grid-column>
                                <vaadin-grid-column width="120px">
                                    <template class="header">[[localize('users','Users',language)]]</template>
                                    <template>
                                        <div class="cell frozen">[[_trailHcpPartiesDesc(item)]]</div>
                                    </template>
                                </vaadin-grid-column>
                                <vaadin-grid-column width="40px">
                                    <template class="header">[[localize('btg','BTG',language)]]</template>
                                    <template>
                                        <div class="cell frozen">[[_hasBTG(item)]]</div>
                                    </template>
                                </vaadin-grid-column>
                            </vaadin-grid>
                        </div>
                    </div>
                </page>
                <page>
                    <ht-pat-hub-diarynote-view api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" resources="[[resources]]" diary-note="[[diaryNote]]" transaction-of-diary-note="[[transactionOfDiaryNote]]"></ht-pat-hub-diarynote-view>
                </page>
                <page>
                    <div class="pageContent">
                        <div class="hub-cons"> <!-- Notification input -->
                            <div>
                                <iron-autogrow-textarea class="paper-input-input" slot="input" id="transactionText" value="[[getJSON(message)]]"></iron-autogrow-textarea>
                            </div>

                        </div>
                    </div>
                </page>
            </iron-pages>

        <paper-dialog id="importHubDocumentDialog">
            <h2 class="modal-title">[[localize('imp-pat','Import document',language)]]</h2>
            <div class="content">
                <div class="selectedDocumentToImportContent">
                    <paper-input label="[[localize('hub-doc-title', 'Document title', language)]]" value="{{selectedDocumentToBeImported.title}}"></paper-input>
                    <paper-input label="[[localize('hub-doc-type', 'Document type', language)]]" value="{{selectedDocumentToBeImported.docType}}" disabled=""></paper-input>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeImportDialog">[[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_importDocumentIntoPatient"><iron-icon icon="icons:cloud-download"></iron-icon> [[localize('imp','Import',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-hub-transaction-view';
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
          patient:{
            type: Object
          },
          language: {
              type: String
          },
          opened: {
              type: Boolean,
              value: false
          },
          tabs: {
              type:  Number,
              value: 0
          },
          isLoading:{
              type: Boolean,
              value: false
          },
          transInfo:{
              type: Object,
              value: null
          },
          message:{
              type: Object,
              value: null
          },
          attachmentCount: {
              type:  Number,
              value: 0
          },
          auditTrail:{
              type: Object,
              value: null
          },
          parent:{
              type:Object,
              value: null
          },
          selectedDocumentToBeImported:{
              type: Object,
              value: () => {}
          },
          currentContact:{
              type: Object
          },
          cdTransaction:{
              type: Object,
              value: () => [
                  {
                      type: 'contactreport', label: {en: 'Contact report', fr : 'Rapport de consultation'}
                  },
                  {
                      type: 'labresult', label: {en: 'Laboratory result', fr : 'Résultat de laboratoire'}
                  },
                  {
                      type: 'note', label: {en : "Note", fr : 'Note'}
                  },
                  {
                      type: 'report', label: {en : "Repport", fr : 'Rapport'}
                  },
                  {
                      type: 'diarynote', label: {en : "Diary note", fr : 'Note de journal'}
                  },
                  {
                      type: 'result', label: {en : "Result", fr : 'Résultat'}
                  }
              ]
          },
          currentMedicationScheme:{
              type: Object,
              value:null
          },
          isPreview:{
              type: Boolean,
              value: false
          },
          historyView:{
              type: Boolean,
              value: false
          },
          administrationUnit:{
              type: Object,
              value : [
                  {code: "00001", label: {fr: "x 5 ml", en: '', nl: ''}},
                  {code: "00002", label: {fr: "amp.", en: '', nl: ''}},
                  {code: "00003", label: {fr: "applic.", en: '', nl: ''}},
                  {code: "00004", label: {fr: "caps.", en: '', nl: ''}},
                  {code: "00005", label: {fr: "compr.", en: '', nl: ''}},
                  {code: "00006", label: {fr: "dose", en: '', nl: ''}},
                  {code: "00007", label: {fr: "gouttes", en: '', nl: ''}},
                  {code: "00008", label: {fr: "flac.", en: '', nl: ''}},
                  {code: "00009", label: {fr: "implant", en: '', nl: ''}},
                  {code: "00010", label: {fr: "perfusion", en: '', nl: ''}},
                  {code: "00011", label: {fr: "inhalation", en: '', nl: ''}},
                  {code: "00012", label: {fr: "insert", en: '', nl: ''}},
                  {code: "00013", label: {fr: "gommes à mâcher", en: '', nl: ''}},
                  {code: "00014", label: {fr: "compresse(s)", en: '', nl: ''}},
                  {code: "00015", label: {fr: "lavement", en: '', nl: ''}},
                  {code: "00016", label: {fr: "ml", en: '', nl: ''}},
                  {code: "00017", label: {fr: "ov.", en: '', nl: ''}},
                  {code: "00018", label: {fr: "perle(s)", en: '', nl: ''}},
                  {code: "00019", label: {fr: "pastille", en: '', nl: ''}},
                  {code: "00020", label: {fr: "patch", en: '', nl: ''}},
                  {code: "00021", label: {fr: "patr.", en: '', nl: ''}},
                  {code: "00022", label: {fr: "stylo", en: '', nl: ''}},
                  {code: "00023", label: {fr: "puff(s)", en: '', nl: ''}},
                  {code: "00024", label: {fr: "éponge", en: '', nl: ''}},
                  {code: "00025", label: {fr: "stylo", en: '', nl: ''}},
                  {code: "00026", label: {fr: "suppo", en: '', nl: ''}},
                  {code: "00027", label: {fr: "tube", en: '', nl: ''}},
                  {code: "00028", label: {fr: "mèche", en: '', nl: ''}},
                  {code: "00029", label: {fr: "sac", en: '', nl: ''}},
                  {code: "00030", label: {fr: "sachets(s)", en: '', nl: ''}},
                  {code: "cm", label: {fr: "centimètre", en: '', nl: ''}},
                  {code: "dropsperminute", label: {fr: "goutes par minute", en: '', nl: ''}},
                  {code: "gm", label: {fr: "gramme", en: '', nl: ''}},
                  {code: "internationalunits", label: {fr: "unités internationales", en: '', nl: ''}},
                  {code: "mck/h", label: {fr: "microgramme par heure", en: '', nl: ''}},
                  {code: "mck/kg/minute", label: {fr: "microgramme par kilogramme par minute", en: '', nl: ''}},
                  {code: "measure", label: {fr: "mesure", en: '', nl: ''}},
                  {code: "mg", label: {fr: "milligramme", en: '', nl: ''}},
                  {code: "mg/h", label: {fr: "milligramme par heure", en: '', nl: ''}},
                  {code: "mg/ml", label: {fr: "milligramme par millimètre", en: '', nl: ''}},
                  {code: "ml/h", label: {fr: "millilitre par heure", en: '', nl: ''}},
                  {code: "tbl", label: {fr: "cuillère à soupe", en: '', nl: ''}},
                  {code: "tsp", label: {fr: "cuillère à café", en: '', nl: ''}},
                  {code: "unt/h", label: {fr: "unités par heure", en: '', nl: ''}}
              ]
          },
          diaryNote:{
              type: Array,
              value: () => []
          },
          transactionOfDiaryNote:{
              type: Array,
              value: () => []
          }

      };
  }

  static get observers() {
      return ['apiReady(api,user,opened)'];
  }

  ready() {
      super.ready();
  }

  _isEqual(a,b) {
      return (a === b)
  }

  _dateFormat(date) {
      return date ? this.api.moment(date).format('DD/MM/YYYY') : '';
  }

  _textData(txt){
      if(txt){
          //console.log("text:", txt)
          return txt
      }else{
          return null
      }
  }

  _textWithLayoutData(ftxt){
      if(ftxt){
          //console.log("textWL:", ftxt)
          return ftxt
      }else{
          return null
      }
  }

  _linkData(lnk){
      if(lnk){
          //console.log("lnk:", lnk)
          return lnk
      }else{
          return null
      }
  }

  _yesOrNo(b){
      return b ? this.localize('yes','yes',this.language) : this.localize('no','no',this.language)
  }

  _lnks(trn) {
      let lnks = _.flatMap(trn.item || [], it => this._lnks(it)).concat(_.flatMap(trn.heading, it => this._lnks(it))).concat(_.flatMap(trn.lnk || [], it => it)).concat(_.flatMap(trn.lnks || [], it => it))
      lnks = lnks.filter(it => !it.url || it.url.substring(0,13) !== "//transaction")
      return lnks
  }

  _lnksWithCnt(trn){
      let lnks = this._lnks(trn)
      this.set("attachmentCount", this.attachmentCount + lnks.length)
      return lnks;
  }

  _txts(trn) {
      let txts =_.flatMap(trn.item || [], it => this._txts(it)).concat(_.flatMap(trn.heading, it => this._txts(it))).concat(_.flatMap(trn.text || [], it => it)).concat(_.flatMap(trn.texts || [], it => it))
      return txts
  }

  _txtsWithCnt(trn){
      let txts = this._txts(trn)
      this.set("attachmentCount", this.attachmentCount + txts.length)
      return txts;
  }

  _textsWithLayout(trn) {
      //todo add mimetype + filename
      let txts = _.flatMap(trn.item || [], it => this._textsWithLayout(it)).concat(_.flatMap(trn.heading, it => this._textsWithLayout(it))).concat(_.flatMap(trn.textWithLayout || [], it => it))
      return txts
  }

  _textsWithLayoutWithCnt(trn){
      let txts = this._textsWithLayout(trn)
      this.set("attachmentCount", this.attachmentCount + txts.length)
      return txts;
  }

  _hasAttachments(cnt){
      return cnt && cnt > 0 ? true : false
  }

  _getAttachmentCount(cnt){
      if(this._hasAttachments(cnt) && !this._isMedicationView(this.transInfo)){
          if (this.shadowRoot) this.shadowRoot.getElementById("tabAttachments").classList.remove("doNotDisplay")
          this.set("tabs", 1);
          this.set("tabs", 0);
      }else{
          if (this.shadowRoot) this.shadowRoot.getElementById("tabAttachments").classList.add("doNotDisplay")
          this.set("tabs", 0);
      }
      return cnt;
  }

  isEven(n) {
      return n % 2 == 0;
  }

  getGender(niss){
      if(niss && niss.length === 11){
          const c9 = niss.substring(8,9);
          const even = this.isEven(parseInt(c9));
          if(even){
              return 'female';
          }
          else{
              return 'male';
          }
      }
      else{
          return '';
      }
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

  openHist(message){
      this.set('parent', null)
      this.set('attachmentCount', 0);
      this.set('message', null);
      this.set('transInfo', null);
      this.set('isLoading',true);
      this.set('isPreview', false);
      this.set('historyView', true);
      this.set('message', message);
      this.set('isLoading',false);
  }

  open(htPatHubDetail, transInfo, tranRespPromise, preview) {
      this.set('parent', htPatHubDetail);
      this.set('attachmentCount', 0);
      this.set('message', null);
      this.set('transInfo', transInfo);
      this.set('isLoading',true);
      this.set('diaryNote', [])
      this.set('transactionOfDiaryNote', [])
//                this._getTrail(transInfo).then(trail => this.set('auditTrail',trail));
      if(transInfo){
          this._getTrail(transInfo).then(
              trail => {
                  if(trail && trail.transactionaccesslist &&  trail.transactionaccesslist.transactionaccesses) trail.transactionaccesslist.transactionaccesses = _.orderBy(trail.transactionaccesslist.transactionaccesses, ["accessdatetime"], ["desc"]);
                  this.set('auditTrail', trail);
              })
      }else{
          this.set('isLoading',false);
      };

      if(tranRespPromise){
          tranRespPromise.then(tranResp => {
              if(preview){
                  let reader = new FileReader();
                  const myself = this;
                  reader.onload = function() {
                      //console.log("sumehr = ", reader.result);
                      myself.set('message', JSON.parse(reader.result));
                      myself.set('isLoading',false);
                      myself.set("currentMedicationScheme", null);
                  }
                  reader.readAsText(tranResp);
              }
              else
              {
                  this.set('message', tranResp);
                  this.set('isLoading',false);
                  if(this._isMedicationScheme(transInfo)) {
                      this.set("currentMedicationScheme", this._getMedicationSchemeFromTransactionSet(tranResp));
                  }
                  else
                  {
                      this.set("currentMedicationScheme", null);
                  }
              }
          }).catch( error=> {
              this.set('message', null);
              console.log('getTransaction failed : ' + error);
              this.set('isLoading',false);
          })
      }
  }

  getJSON(obj){
      return JSON.stringify(obj);
  }

  //create easy medicationscheme object
  _getMedicationSchemeFromTransactionSet(tr){
      let ms = {};
      //transactions [0..n]
      //get informative transaction tr[0]
      const infoTr = tr.folders[0].transactions.find(it => it.cds.find(cd => cd.value==="medicationscheme"));
      //ms.infoTr = infoTr;
      ms.idKmehr = infoTr.ids.find(id => id.s === "ID_KMEHR").value;
      ms.hubId = infoTr.ids.find(id => id.s === "LOCAL").sl + "." + infoTr.ids.find(id => id.s === "LOCAL").value;
      ms.date = "";
      ms.authors = infoTr.author.hcparties;
      ms.version = infoTr.version;

      //loop trough medicationschemeElements tr[1..n]
      const msElemTrs =  tr.folders[0].transactions.filter(it => it.cds.find(cd => cd.value==="medicationschemeelement"));
      //ms.msElemTrs = msElemTrs;
      // loop trough items
      //  medicationchemeelement:
      //  item[0]: meta info (adaptation, ...)
      //  item[1]: medication info (medication, dates, posology, regimen, frequency, ...)
      //  item[2]: medication use /optional (?)
      const elems = msElemTrs.map(elTr => {
          let el = {}
          el.idKmehr = elTr.ids.find(id => id.s === "ID_KMEHR").value;
          //meta info
          const infoItems = elTr.item.filter(itm=>itm.cds.find(cd => cd.value === "healthcareelement"));
          const adaptationItem = infoItems.find(itm => itm.contents.find(it => it.cds.find(cd => cd.s==="CD_MS_ADAPTATION")))
          //el.adaptationItem = adaptationItem; //added for debug
          el.adaptationflag = adaptationItem ? adaptationItem.contents.filter(it => it.cds.find(cd => cd.value==="adaptationflag")).length > 0 : false;
          el.adaptationtype = adaptationItem ? adaptationItem.contents.find(it => it.cds.find(cd => cd.s==="CD_MS_ADAPTATION")).cds.find(cd => cd.s==="CD_MS_ADAPTATION").value : "";
          //medication
          const medicationItem = elTr.item.find(itm=>itm.cds.find(cd => cd.value === "medication"))
          //el.medicationItem = medicationItem; //added for debug
          const medicationContent = medicationItem && medicationItem.contents && medicationItem.contents.length > 0 ? medicationItem.contents[0] : null
          el.compoundprescription = medicationContent ? medicationContent.compoundprescription : null;
          el.medicinalproduct = medicationContent ? medicationContent.medicinalproduct : null;
          el.substanceproduct = medicationContent ? medicationContent.substanceproduct : null;
          el.beginmoment = medicationItem.beginmoment;
          el.endmoment = medicationItem.endmoment;
          el.temporality = medicationItem.temporality;
          el.frequency = medicationItem.frequency;
          //el.regimen = medicationItem.regimen;
          el.regimen = _.values(_.groupBy(this._decomposedRegimen(medicationItem.regimen), item => item.dayNumber || 'other'))
          el.regimenDayNumber = _.values(_.groupBy(this._decomposedRegimen(medicationItem.regimen), item => item.dayNumber || 'other'))
          el.regimenWeekDay = _.values(_.groupBy(this._decomposedRegimen(medicationItem.regimen), item => item.weekDay || 'other'))
          el.regimenWeekNumber = _.values(_.groupBy(this._decomposedRegimen(medicationItem.regimen), item => item.weekNumber || 'other'))
          if(el.regimenDayNumber.length > el.regimenWeekDay.length){
              if(el.regimenWeekNumber.length > el.regimenDayNumber.length){
                  el.regimen = el.regimenWeekNumber;
              } else {
                  el.regimen = el.regimenDayNumber;
              }
          } else {
              if(el.regimenWeekNumber.length > el.regimenWeekDay.length){
                  el.regimen = el.regimenWeekNumber;
              } else {
                  el.regimen = el.regimenWeekDay;
              }
          }
          el.posology = medicationItem.posology;
          el.suspensions = [];
          //use
          const useItem = infoItems.find(itm => itm.contents.find(it => it.cds.find(cd => cd.value==="medicationuse")))
          //el.useItem = useItem; //added for debug
          const useContent = useItem ? useItem.contents.find(it => it.cds.length === 0) : null;
          el.usePresent = useContent ? true : false;
          el.useTexts = useContent ? useContent.texts : [];

          el.date = "";

          return el;
      })
      ms.msElems = elems;
      //loop trough treatmentsuspensions tr[1..n]
      const msSuspTrs =  tr.folders[0].transactions.filter(it => it.cds.find(cd => cd.value==="treatmentsuspension"));
      //ms.msSuspTrs = msSuspTrs; //added for debug
      // loop trough items
      //  treatmentsuspension:
      //  item[0]: suspension info (medication, , lnks ...)
      //   lnks:type, url: //transaction[id[@S='ID-KMEHR']='5']
      //  item[1]: transactionreason: texts / optional
      const susps = msSuspTrs.map(elTr => {
          let el = {}
          el.idKmehr = elTr.ids.find(id => id.s === "ID_KMEHR").value;
          //suspended medication
          const suspendedMedicItem = elTr.item.find(itm=>itm.cds.find(cd => cd.value === "medication"))
          const medicationContent = suspendedMedicItem && suspendedMedicItem.contents && suspendedMedicItem.contents.length > 0 ? suspendedMedicItem.contents[0] : null
          el.compoundprescription = medicationContent ? medicationContent.compoundprescription : null;
          el.medicinalproduct = medicationContent ? medicationContent.medicinalproduct : null;
          el.substanceproduct = medicationContent ? medicationContent.substanceproduct : null;
          el.beginmoment = suspendedMedicItem.beginmoment;
          el.endmoment = suspendedMedicItem.endmoment;
          el.lifecycle = suspendedMedicItem.lifecycle;
          el.lnks = suspendedMedicItem.lnks;

          //suspension reason
          const reasonItem = elTr.item.find(itm=>itm.cds.find(cd => cd.value === "transactionreason"))
          const reasonContent = reasonItem ? reasonItem.contents.find(it => it.cds.length === 0) : null;
          el.reasonTexts = reasonContent ? reasonContent.texts : [];

          //link to msElem by idKmehr
          const lnk = el.lnks && el.lnks.length > 0 ? (el.lnks[0].url ? el.lnks[0].url : "") : ""
          const matches = lnk.match(/(\d+)/);
          const lnkIdKmehr = matches && matches.length > 0 ? matches[0] : null;
          if(lnkIdKmehr){
              let trToSusp = ms.msElems.find(elm => elm.idKmehr === lnkIdKmehr);
              if(trToSusp){
                  trToSusp.suspensions.push(el);
                  trToSusp.suspended = true;
              }
          }
          return el;
      })
      ms.msSusps = susps;
      ms.times = this._getTimes(ms);
      return ms;
  }

  _decomposedRegimen(regimen){

      let decomposedRegimen = []

      const subRegimen = regimen && regimen.daynumbersAndQuantitiesAndDates ?  _.chunk(regimen.daynumbersAndQuantitiesAndDates, (_.indexOf(regimen.daynumbersAndQuantitiesAndDates, regimen.daynumbersAndQuantitiesAndDates.find(r => r.name === "{http://www.ehealth.fgov.be/standards/kmehr/schema/v1}quantity")) + 1)) : []

      subRegimen.map(sr => decomposedRegimen.push(this._getRegimenInfo(sr)))

      return decomposedRegimen
  }

  _getRegimenInfo(regimen){

      const dayNumber = regimen && regimen.find(r => r.name === "{http://www.ehealth.fgov.be/standards/kmehr/schema/v1}daynumber") || null
      const dayTime = regimen && regimen.find(r => r.name === "{http://www.ehealth.fgov.be/standards/kmehr/schema/v1}daytime") || null
      const quantity = regimen && regimen.find(r => r.name === "{http://www.ehealth.fgov.be/standards/kmehr/schema/v1}quantity") || null
      const weekDay = regimen && regimen.find(r => r.name === "{http://www.ehealth.fgov.be/standards/kmehr/schema/v1}weekday") || null

      const regimenInfo = {
          dayNumber: dayNumber && dayNumber.value || null,
          dayTime: dayTime && dayTime.value && dayTime.value.dayperiod && dayTime.value.dayperiod.cd && dayTime.value.dayperiod.cd.value || dayTime && dayTime.value && dayTime.value.time || null,
          quantity:  quantity && quantity.value && quantity.value.decimal || null,
          administrationUnit: quantity && quantity.value && quantity.value.unit && quantity.value.unit.cd && quantity.value.unit.cd.value || null,
          weekDay: weekDay && weekDay.value && weekDay.value.cd && weekDay.value.cd.value ? weekDay.value.cd.value.toLowerCase() : null,
          weekNumber: weekDay && weekDay.value && weekDay.value.weeknumber  ? weekDay.value.weeknumber : null
      }

      return regimenInfo

  }


  _getTimes(simplifiedMs){
      const times = _.uniq(_.flatMap(simplifiedMs.msElems, msElem=>_.flatMap(msElem.regimen, reg=>_.flatMap(reg, ritm => ritm.dayTime))).filter(it => !isNaN(it))).sort();
      return times;
  }

  //getPatientAuditTrailUsingGET(
  // endpoint, xFHCKeystoreId, xFHCTokenId, xFHCPassPhrase,
  // hcpLastName, hcpFirstName, hcpNihii, hcpSsin, hcpZip,
  // hubPackageId, from, to,
  // authorNihii, authorSsin,
  // isGlobal, breakTheGlassReason, ssin, sv, sl, id)
  _getTrail(transaction){
      if (this.patient.ssin && this.api.tokenId) {
          return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
              .then(hcp => this.api.fhc().Hubcontroller().getPatientAuditTrailUsingGET(
                      _.get(this, 'parent.hubEndPoint', null),
                      _.get(this, 'api.keystoreId', null),
                      _.get(this, 'api.tokenId', null),
                      _.get(this, 'api.credentials.ehpassword', null),
                      _.get(hcp, 'lastName', null),
                      _.get(hcp, 'firstName', null),
                      _.get(hcp, 'nihii', null),
                      _.get(hcp, 'ssin', null),
                      _.get(this, 'parent.hcpZip', null),
                      _.get(this, 'hubPackageId',  null),
                      null, null, null, null, true,
                      _.get(this, 'breakTheGlassReason', null),
                      _.get(this, 'patient.ssin', null),
                      _.get(_.get(transaction, 'ids', []).find(id => id.s === 'LOCAL'), 'sv', null),
                      _.get(_.get(transaction, 'ids', []).find(id => id.s === 'LOCAL'), 'sl', null),
                      _.get(_.get(transaction, 'ids', []).find(id => id.s === 'LOCAL'), 'value', null)
                  ))
              .then(trailResp => {
                 return  trailResp ? trailResp : null
                      if (trailResp) {
                          return trailResp;
                      } else {
                          return null;
                      }
                  }
              ).catch(e => {console.log(e)})
      } else {
          return Promise.resolve(null)
      }
  }

  _transactionAccessDate(ta){
      return ta && ta.accessdatetime && ta.accessdatetime.millis ? this.api.moment(ta.accessdatetime.millis).format("DD/MM/YYYY") : "";
  }

  _trailHcpPartiesDesc(ta){
      return ta.hcparties.map(hcp => hcp.familyname ? hcp.familyname + " " + hcp.firstname : hcp.name + "(" + this.cdDesc(hcp.cds) + ")");
  }

  _hasBTG(ta){
      return ta.breaktheglass ? "*" : ""
  }

  cdDesc(cds){
      return cds.map(cd => cd.value);
  }

  saveMedicationSchemeAsDocument(transactionSetId, sXml){
      return this.api.document().newInstance(this.user, null, {documentType: 'medicationscheme', mainUti: "public.xml", name: "medicationscheme.xml"}).then(
          doc => this.api.document().createDocument(doc)).then(
          doc => this.api.document().setAttachment(doc.id, undefined, this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.utf82ua(sXml))).then(() => doc)
      ).catch(error => console.log(error))
  }

  _getNodeList(msg, tagName){
      return msg ? msg.querySelectorAll(tagName) : null;
  }

  _getAuthorDesc(trn, type){
      const auth = this._getAuthor(trn, type);
      if(auth){
          let nm = auth.querySelector('name') ? auth.querySelector('name').innerHTML : '';
          nm += auth.querySelector('firstname') ? ' ' + auth.querySelector('firstname').innerHTML : ''
          nm += auth.querySelector('familyname') ? ' ' + auth.querySelector('familyname').innerHTML : ''
          return nm
      }else {
          return '';
      }
  }

  _getAuthor(trn, type){
      //msg.querySelectorAll(tagName)[0].querySelectorAll('author')[0].querySelectorAll('hcparty')
      const hcps = Array.from(trn.querySelectorAll('author')[0].querySelectorAll('hcparty'));
      const auth =  hcps ? hcps.find(hcp => hcp.querySelectorAll('cd')[0].innerHTML === type) : null;
      return auth;
  }

  _isSumehr(transInfo){
      return this._transactionType(transInfo) === 'sumehr';
  }

  _isMedicationScheme(transInfo){
      return this._transactionType(transInfo) === 'medicationscheme';
  }

  _isDiaryNote(transInfo){
      return this._transactionType(transInfo) === 'diarynote';
  }

  _isOther(transInfo){
      return !( this._isSumehr(transInfo)|| this._isMedicationScheme(transInfo) || this._isDiaryNote(transInfo));
  }

  _transactionId(tr){
      if(tr && tr.ids){
          const id = tr.ids.find(id => id.s === "LOCAL");
          if(id){
              return (id.sl ? id.sl : "") + "/" + (id.value ? id.value : "");
          } else{
              return "--";
          }
      }else{
          return "";
      }
  }

  _transactionDateTime(tr){
      let res = "--";
      if(tr && tr.date && tr.date.millis){
         res =  this.api.formatedMoment(tr.date.millis);
      } else if(tr && tr.date){
          res = tr.date.toString().substr(0,8);
      }
      // if(tr && tr.time){
      //     res += " " + tr.time.toString().substr(8);
      // }
      return res;
  }

  _transactionDate(tr){
      if(tr && tr.date) {
          var d = new Date(0);
          d.setUTCMilliseconds(tr.date);
          return d.toDateString();
      } else {
          return "";
      }
  }

  _transactionCD_S(tr){
      const exclude = ['CD_TRANSACTION'];
      return _.uniq(tr.cds.filter(cd => !exclude.includes(cd.s)).map(cd => cd.s));
  }

  _transactionCDByS(tr, s){
      return tr.cds.filter(cd => cd.s === s).map(cd => cd.value).join(', ');
  }

  dateFormat(date){
      if(date && date.date && date.date.millis){
          let d = new Date(0);
          d.setUTCMilliseconds(date.date.millis);
          return d.toDateString();
      }else {
          return ""
      }
  }

  fromYYYYMMDDHHmmss(num){
      if(num) {
          const str = num.toString()
          const year = str.substring(0, 4);
          const month = str.substring(4, 6);
          const day = str.substring(6, 8);
          const hour = str.substring(8, 10);
          const minute = str.substring(10, 12);
          const second = str.substring(12, 14);
          return day + "/" + month + "/" + year + " (" + hour + ":" + minute + ")"
      }
      else {
          return null
      }
  }

  _transactionAuthor(tr){
      if(tr){
          var authorRes = "--";
          const author = tr.author.hcparties.find(hcp => hcp.familyname);
          if(author) {
              authorRes = author.familyname + ' ' + author.firstname;
          }
          const dept = tr.author.hcparties.find(hcp => hcp.cds.find(cd => cd.s === "CD-HCPARTY"))
          if(dept){
              const cd = dept.cds.find(cd => cd.s === "CD-HCPARTY")
              authorRes += "/" + cd.value;
          }
          return authorRes;
      }else {
          return "";
      }
  }

  _transactionType(tr){
      if(tr) {
          const cdTransType = tr.cds.find(cd => cd.s === "CD-TRANSACTION");
          if (cdTransType) {
              return cdTransType.value;
          }
          else {
              return "--";
          }
      } else {
          return "";
      }
  }

  _localizeTransactionType(tr){
      if(tr){
          const cdTransType = tr.cds.find(cd => cd.s === "CD-TRANSACTION");
          if (cdTransType) {
              return this.localize("cd-transaction-"+cdTransType.value, cdTransType.value, this.language);
          }

      }
  }

  formatResponse(transInfo, tranResp){
      const slot = this.shadowRoot.querySelector("#kmehr_slot");
      if(tranResp) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(tranResp,"text/xml");
          const req = new XMLHttpRequest();
          req.onreadystatechange = function(event) {
              if (this.readyState === XMLHttpRequest.DONE) {
                  if (this.status === 200) {
                      const xsltProcessor = new XSLTProcessor();
                      const xslStylesheet = this.responseXML;
                      xsltProcessor.importStylesheet(xslStylesheet);
                      const fragment = xsltProcessor.transformToFragment(xmlDoc, document);
                      slot.innerHTML = "";
                      slot.appendChild(fragment);
                  } else {
                      slot.innerHTML = "ERROR: XSLT not found";
                  }
              }
          };

          const transtype =  this._transactionType(transInfo);
          if(transtype == "sumehr") {
              req.open("GET", "sumehr_to_html.xslt", true);
              req.send(null);
          } else if(transtype == "medicationscheme") {
              req.open("GET", "sumehr_to_html.xslt", true);
              req.send(null);
          } else {
              slot.innerHTML = "No visualizer implemented for transaction of type " + transtype + ":" + tranResp
          }

      } else {
          slot.innerHTML = "No transaction found";
      }
  }

  close() {
      this.set('diaryNote', [])
      this.set('transactionOfDiaryNote', [])
      this.$.dialog.close();
  }

  _getHcpInfo(hcps){
      let hcpInfo = []

      if(hcps){
          hcps.map(hcp => {
              hcp && hcp.cds && hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY") && hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY").value !== "hub" ?
                  hcpInfo.push({
                      name: hcp.name || null,
                      firstName: hcp.firstname || null,
                      familyName: hcp.familyname || null,
                      inss: hcp && hcp.ids && hcp.ids.find(id => id && id.s === 'INSS') && hcp.ids.find(id => id && id.s === 'INSS') ? hcp.ids.find(id => id && id.s === 'INSS').value : null,
                      nihii: hcp && hcp.ids && hcp.ids.find(id => id && id.s === 'ID_HCPARTY') && hcp.ids.find(id => id && id.s === 'ID_HCPARTY').value ? hcp.ids.find(id => id && id.s === 'ID_HCPARTY').value : null,
                      type: hcp && hcp.cds && hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY") && hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY").value ? hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY").value : null,
                      addresses: this._getAdresses(hcp.addresses) || [],
                      telecoms: this._getTelecoms(hcp.telecoms) || []
                  }) : null
          })
      }

      return hcpInfo
  }

  _getPersonInfo(person){
      let personInfo = {}

      person ?
          personInfo = {
              inss: person.ids && person.ids.find(id => id.s === "INSS") && person.ids.find(id => id.s === "INSS").value ? person.ids.find(id => id.s === "INSS").value : null,
              firstName: person.firstnames.join(' ') || null,
              familyName: person.familyname || null,
              birthdate: person.birthdate || null,
              deathdate: person.deathdate || null,
              sex : person.sex && person.sex.value || null,
              addresses: this._getAdresses(person.addresses) || [],
              telecoms: this._getTelecoms(person.telecoms) || [],
              type: person && person.cds && person.cds.find(cd => cd && cd.s === "CD_HCPARTY") && person.cds.find(cd => cd && cd.s === "CD_HCPARTY").value ? person.cds.find(cd => cd && cd.s === "CD_HCPARTY").value : null,
          }
          : null

      return personInfo

  }


  _getAdresses(addresses){
      let addressesInfo = []
      addresses.map(adr => addressesInfo.push({
              addressType: adr && adr.cds && adr.cds.find(cd => cd.s === "CD_ADDRESS") && adr.cds.find(cd => cd.s === "CD_ADDRESS").value ? adr.cds.find(cd => cd.s === "CD_ADDRESS").value : null,
              country: adr && adr.country && adr.country.cd && adr.country.cd.s  && adr.country.cd.s === "CD_FED_COUNTRY" && adr.country.cd.value ? adr.country.cd.value : null,
              zip: adr.zip || null,
              nis: adr.nis || null,
              city: adr.city || null,
              district : adr.district || null,
              street : adr.street || null,
              houseNumber: adr.housenumber || null,
              postboxNumber :adr.postboxnumber || null
          })
      )

      return addressesInfo
  }

  _getTelecoms(telecoms){
      let telecomInfo = []
      telecoms.map(tel => telecomInfo.push({
          addressType: tel && tel.cds && tel.cds.find(cd => cd.s === "CD_ADDRESS") && tel.cds.find(cd => cd.s === "CD_ADDRESS").value ? tel.cds.find(cd => cd.s === "CD_ADDRESS").value : null,
          telecomType: tel && tel.cds && tel.cds.find(cd => cd.s === "CD_TELECOM") && tel.cds.find(cd => cd.s === "CD_TELECOM").value ? tel.cds.find(cd => cd.s === "CD_TELECOM").value : null,
          telecomNumber : tel.telecomnumber
      }))

      return telecomInfo
  }

  _processTransactionItemAndHeadingItem(trn){
      if(this.isPreview){
          //const trnListOfItem = this._processItem(trn.item, "transaction");
          const headingListOfItem = trn.headingsAndItemsAndTexts ? this._processItem(_.flatMap(trn.headingsAndItemsAndTexts.map(it => it.headingsAndItemsAndTexts)), "heading") : [];
          return headingListOfItem;//.concat(trnListOfItem);
      }else {
          const trnListOfItem = this._processItem(trn.item, "transaction");
          const headingListOfItem = trn.heading ? this._processItem(_.flatMap(trn.heading.map(it => it.item)), "heading") : [];
          return headingListOfItem.concat(trnListOfItem);
      }
  }

  _processItem(listOfItem, itemParent){

      let newListOfItem = []

      if(listOfItem){
          listOfItem.filter(item => item ? true : false).map(item => newListOfItem.push({
              type: item && item.cds && item.cds.find(cd => cd && cd.s === "CD_ITEM") && item.cds.find(cd => cd && cd.s === "CD_ITEM").value ? item.cds.find(cd => cd && cd.s === "CD_ITEM").value : null,
              contents: this._getItemsContents(item.contents),
              beginMoment: item && item.beginmoment && item.beginmoment.date || null,
              endMoment: item && item.endmoment && item.endmoment.date || null,
              lifeCycle: item && item.lifecycle && item.lifecycle.cd && item.lifecycle.cd.value || null,
              isRelevant: item && item.isrelevant || null,
              parent: itemParent,
              temporality: item && item.temporality && item.temporality.cd && item.temporality.cd.value || null,
              posology: this._getPosology(item),
              regimen: item && item.regimen ? this._decomposedRegimen(item.regimen) : null,
              noItemsOfTypeItem: this.ifIsNotPresentItem(item)
          }))
      }

      return _.orderBy(_.groupBy(newListOfItem, 'type'), ['type'])

  }

  _getItemsContents(contents){
      let contentInfo = []

      if(contents){
          contents.map(c => {
              contentInfo.push({
                  authors: this._getHcpInfo(c.hcparty ? [c.hcparty] : null),
                  persons: this._getPersonInfo(c.person || null),
                  cds: this._getContentCds(c.cds),
                  texts: this._getContentTexts(c.texts),
                  medicinalproduct: c.medicinalproduct

              })


          })
      }
      return contentInfo
  }

  _getContentCds(cds){
      let cdsInfo = []
      cds ? cds.map(cd => { cdsInfo.push({ s: cd.s, value: cd.value }) }) : null
      return cdsInfo
  }

  _getContentTexts(texts){
      let textInfo = []
      texts ? texts.map(txt => {textInfo.push({txtValue: txt.value,lang: txt.l}) }) : null
      return textInfo
  }

  _getTraduction(type){
      return this.localize(type, type, this.language)
  }

  _getTitle(contents, type){
      return type === "medication" || type === "vaccine" ? _.compact(_.flatten(contents.map(ct => ct.medicinalproduct))).map(med => med.intendedname).join(',') || null : _.flatten(contents.map(ct => ct.texts.map(txt => txt.txtValue))).join(',') || null
  }

  _getCode(contents, type){
      let codeList = []
      contents.map(ct => ct.cds.map(cd => {
          codeList.push({
              value: cd.value,
              code: cd.s === "CD_CLINICAL" ? "Ibui: " :
                  cd.s === "CD_ATC" ? "Atc: " :
                      cd.s === "CD_VACCINEINDICATION" ? "" :
                          cd.s === "ICD" ? "Icd: " :
                              cd.s === "ICPC" ? "Icpc: " :
                                  cd.s === "CD_PATIENTWILL" ? "" :
                                      cd.s+": "
          })
      }))

      return codeList
  }

  _ifTableView(type){
      return type === "gmdmanager" || type === "contactperson" || type === "contacthcparty" || type === "patientwill" ? false : true
  }

  ifIsNotPresentItem(item){
      return item && item.cds && item.cds.find(cd => cd.nullFlavor && cd.nullFlavor === "NA") ? true : false;
  }

  _convertHubDateAsString(timestamp){
      return timestamp && timestamp.millis ? this.api.moment(timestamp.millis).format("DD/MM/YYYY") : "//";
  }

  _isSumehrType(transInfo){
      return this.historyView || this._transactionType(transInfo) === "sumehr" ? true : false
  }

  _isHcp(type){
      return type === "gmdmanager" || type === "contacthcparty" ? true : false
  }

  _isPerson(type){
      return type === "contactperson" ? true : false
  }

  _isAuthor(hcp){
      return hcp && hcp.length > 0 ? true : false
  }

  _isRedactor(hcp){
      return hcp && hcp.length > 0 ? true : false
  }

  _importDocumentIntoPatientDialog(e){
      this.set('selectedDocumentToBeImported', {
          transaction : null,
          document: null,
          title: null,
          docType: null
      })

      if(e && e.detail && e.detail.document && e.detail.transaction){
          const transaction = JSON.parse(e.detail.transaction)
          const document = JSON.parse(e.detail.document)
          const docType = transaction && transaction.cds && transaction.cds.find(cd => cd.s === "CD_TRANSACTION") && transaction.cds.find(cd => cd.s === "CD_TRANSACTION").value ? transaction.cds.find(cd => cd.s === "CD_TRANSACTION").value : 'report'
          this.set('selectedDocumentToBeImported.transaction', transaction)
          this.set('selectedDocumentToBeImported.document', document)
          this.set('selectedDocumentToBeImported.docType', docType)
          this.$['importHubDocumentDialog'].open()
      }
  }

  _closeImportDialog(){
      this.set('selectedDocumentToBeImported', {
          transaction : null,
          document: null,
          title: null,
          docType: null
      })
      this.$['importHubDocumentDialog'].close()
  }

  _importDocumentIntoPatient(){
      if(this.selectedDocumentToBeImported && this.selectedDocumentToBeImported.transaction && this.selectedDocumentToBeImported.document){
          this.api.message().newInstance(this.user)
              .then(nmi => this.api.message().createMessage(_.merge(nmi, {
                  transportGuid: "HUB:IN:IMPORTED-DOCUMENT",
                  recipients: [this.user && this.user.healthcarePartyId],
                  metas: {filename: this.selectedDocumentToBeImported.title,
                  mediaType: this.tranformHubTypeToUti(this.selectedDocumentToBeImported.document)},
                  toAddresses: [_.get(this.user, 'email', this.user && this.user.healthcarePartyId)],
                  subject: "Import document from hub: "+ this.selectedDocumentToBeImported.title || null,
                  status : 0 | 1<<25 | (this.patient.id ? 1<<26 : 0)
                  }))
                  .then(createdMessage => Promise.all([createdMessage, this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("encrypt", this.user, createdMessage, this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(JSON.stringify({patientId : this.patient.id, isAssigned: true}))))]))
                  .then(([createdMessage, cryptedMeta]) => {
                      createdMessage.metas.cryptedInfo = Base64.encode(String.fromCharCode.apply(null, new Uint8Array(cryptedMeta)))
                      return this.api.message().modifyMessage(createdMessage)
                  })
                  .then(createdMessage => this.api.document().newInstance(this.user, createdMessage, {
                      documentType: this.selectedDocumentToBeImported && this.selectedDocumentToBeImported.docType ? this.selectedDocumentToBeImported.docType : 'report',
                      mainUti: this.api.document().uti(this.tranformHubTypeToUti(this.selectedDocumentToBeImported.document)),
                      name: this.selectedDocumentToBeImported && this.selectedDocumentToBeImported.title ? "documentDownloadFromHub_" + this.selectedDocumentToBeImported.title : "documentDownloadFromHub_"+moment().format("YYYYMMDDhhmmss")
                  }))
                  .then(newDocInstance => this.api.document().createDocument(newDocInstance))
                  .then(createdDocument => this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject('encrypt', this.user, createdDocument, this.api.crypto().utils.base64toArrayBuffer(this.selectedDocumentToBeImported.document.value))
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
                          tags: [
                              {type: 'CD-TRANSACTION', code: this.selectedDocumentToBeImported && this.selectedDocumentToBeImported.docType ? this.selectedDocumentToBeImported.docType : 'report'},
                              {type: 'HUB-TRANSACTION', code: 'download'},
                          ]
                      });
                      this.currentContact.services.push(svc);
                      sc.services.push({ serviceId: svc.id });

                      this.saveCurrentContact().then(c => {
                          this.dispatchEvent(new CustomEvent('hub-download', {}))
                      })

                      /*
                      //Import in new contact
                      this.api.contact().newInstance(this.user, this.patient, {
                          created: new Date().getTime() ,
                          modified: new Date().getTime() ,
                          author: this.user.id,
                          responsible: this.user.healthcarePartyId,
                          subContacts: []
                      }).then(ctc => {
                          if (resourcesObject && resourcesObject.id) {
                              const svc = this.api.contact().service().newInstance(this.user, { content: _.fromPairs([[this.language, { documentId: resourcesObject.id, stringValue: resourcesObject.name }]]), label: 'Hub document'});
                              ctc.services.push(svc);
                              ctc.subContacts = [{ status: 64, services: [{serviceId: svc.id }]}]
                              this.api.contact().createContactWithUser(this.user, ctc).then(c=>{
                                  this.api.register(c,'contact')
                              })
                          }
                      })*/
                  }).finally(() => {
                      this.set('selectedDocumentToBeImported', {
                          transaction : null,
                          document: null,
                          title: null,
                          docType: null
                      })
                      this.$['importHubDocumentDialog'].close()
                  }).catch(e => {
                      console.log("---error upload attachment---", e)
                  })
              )
      }
  }

  tranformHubTypeToUti(docInfo){
      return docInfo && docInfo.mediatype ? _.toLower(_.split(docInfo.mediatype,'_').join('/')) : "application/pdf"
  }

  saveCurrentContact() {
      if(!this.currentContact.id ) {
          this.currentContact.id = this.api.crypto().randomUuid()
      }
      return (this.currentContact.rev ? this.api.contact().modifyContactWithUser(this.user, this.currentContact) : this.api.contact().createContactWithUser(this.user, this.currentContact)).then(c=>this.api.register(c,'contact')).then(c => (this.currentContact.rev = c.rev) && c);
  }

  _isMedicationView(docType){
      return (!this.historyView) && docType && docType.desc && docType.desc === "medicationscheme" ? true : false
  }

  _localizeHcpType(type){
      return this.localize("cd-hcp-"+type, type, this.language)
  }

  _isPatientWill(transactionType){
      return transactionType === "patientwill" ? true : false
  }

  _isVaccineData(transactionType){
      return transactionType === "vaccine" ? true : false
  }

  _isMedicationData(transactionType){
      return transactionType === "medication" ? true : false
  }

  _isOtherData(transactionType){
      return transactionType !== "medication" && transactionType !== "vaccine"  ? true : false
  }

  _getPatientWill(cds){
      return cds.s === "CD_PATIENTWILL" ? this.localize('cd-patientwill-'+cds.value, cds.value, this.language) :
                  cds.s === "CD_PATIENTWILL_HOS" ? this.localize('cd-patientwill-hos-'+cds.value, cds.value, this.language):
                      cds.s === "CD_PATIENTWILL_RES" ? this.localize('cd-patientwill-res-'+cds.value, cds.value, this.language) :
                          cds.value
  }

  _getPosology(item){
      if(item && item.posology){
          //const posology = item.posology || null

      }
  }

  _getRegimenAsText(regimen){
      const administrationInfo = this.administrationUnit.find(adm => adm.code === regimen.administrationUnit) || null
      const adminUnit = administrationInfo && administrationInfo.label && administrationInfo.label[this.language] ? administrationInfo.label[this.language] : ""

      return this._getDayFreqDesc(regimen) + regimen.quantity+" "+adminUnit+" "+ this._getDayTimeDesc(regimen.dayTime)
  }

  _getDayFreqDesc(regimen){
      return regimen.dayNumber ? (this.localize("daynr", "Day #", this.language) + regimen.dayNumber + ":") :
          (regimen.weekDay ? ((regimen.weekNumber ? (this.localize("weeknr", "Week #", this.language) + regimen.weekNumber + ":") : "") + this.localize(regimen.weekDay, regimen.weekDay, this.language) + ":") : (""));
  }

  _getDayTimeDesc(dayTime){

      return !isNaN(dayTime) ? this._getTimeDesc(dayTime) : this.localize('ms_'+_.toLower(dayTime), _.toLower(dayTime), this.language);
  }

  _getTimeDesc(time){
      return  time && time.toString().length >= 14 ? time.toString().substr(8,2) + ":" + time.toString().substr(10,2) : "";
  }

  _isChronic(temporality){
      return temporality && temporality === "CHRONIC" ? true : false
  }

  _isOneShot(temporality){
      return temporality && temporality === "ONESHOT" ? true : false
  }

  _localizeVaccine(value){
      return value && this.localize("cd-vaccine-indication-"+value, value, this.language)
  }

  _haveDiaryNote(){
      return _.size(_.compact(_.get(this, "diaryNote", []))) > 0 ? true : false
  }
}
customElements.define(HtPatHubTransactionViewSecond.is, HtPatHubTransactionViewSecond);
