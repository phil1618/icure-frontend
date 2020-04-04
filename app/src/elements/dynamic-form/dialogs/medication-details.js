import '../../../styles/scrollbar-style.js';
import '../../../styles/dropdown-style.js';
import '../../../styles/dialog-style.js';
import '../../../styles/paper-input-style.js';
import '../../../styles/dropdown-style.js';
import '../../../styles/atc-styles.js';
import '../ht-regimen-day.js';

import _ from 'lodash/lodash'
import moment from 'moment/src/moment'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class MedicationDetails extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="scrollbar-style dropdown-style dialog-style atc-styles paper-input-style">
            .container {
                box-sizing: border-box;
                max-height: unset;
                display: flex;
                flex-flow: column nowrap;
                align-items: stretch;
            }

            .container-standalone {
                height: 100%;
            }

            .container-prescription {
                height: calc(100% - 48px);
                margin: 24px 24px 24px 12px;
                border: 1px solid var(--app-background-color-darker);
            }

            .content {
                width: 100%;
                height: 100%;
                flex-grow: 1;
                max-height: inherit;
                padding: 0 12px 24px 12px;
                box-sizing: border-box;
                overflow-y: scroll;
            }

            #medication-detail .save-line {
                height: 20px;
            }

            .modal-title{
                justify-content: flex-start;
            }

            .modal-title iron-icon {
                margin-right: 8px;
            }

            .medication-line > span {
                padding: 0 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 90%;
                white-space: nowrap;
            }

            .regimen-line {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: flex-start;
            }

            .regimen-line.block{
                justify-content: flex-start;
                align-items: flex-end;
                height: 46px;
                padding: 0 0 16px 0;
            }

            .regimen-line paper-icon-button {
                height: 16px;
                width: 16px;
                padding: 0px;
                margin-right: 8px;
            }
            .regimen-line vaadin-checkbox {
                margin-right: 8px;
            }
            .regimen-line div {
                /*align-self: flex-end;*/
                /*margin-bottom: 8px;*/
                /*width: auto;*/
            }
            .regimen-line paper-input[type=number] {
                margin-right: 8px;
                width: 128px;
            }
            .regimen-line paper-input[type=text] {
                margin-right: 8px;
            }

            .regimen-line paper-dropdown-menu {
                margin-right: 8px;
            }

            .regimen-line.block .renewal-input{
                max-height: 42px;
                min-height: 0;
                max-width: 50px;
                text-align: center;
                --paper-input-container: {
                    padding: 0;
                }
            }
            .regimen-line.block paper-dropdown-menu {
                margin-right: 8px;
                --paper-dropdown-menu-input: {
                    height: 42px;
                    padding: 0;
                };
                --paper-input-container: {
                    padding: 0;
                };
                --paper-input-container-focus-color: var(--app-primary-color);
            }

            .regimen-line.block span{
                margin-right: 4px;
            }

            .regimen-line.block paper-checkbox{
                margin-right: 8px;
                --paper-checkbox-checked-color: var(--app-secondary-color);
            }

            .regimen-line vaadin-date-picker {
                margin-right: 8px;
                margin-top: 18px;
                cursor: pointer;
            }

            .regimen--frequency {
                margin: auto;
            }

            .regimen--tod {
                margin: auto;
                margin: 0 4px;
                flex-grow: 1;
            }

            .regimen--quantity {
                margin-right: 4px;
                width: 80px;
                text-align: right;
            }

            .regimen-grid-quantity {
                margin-left: auto;
                margin-right: auto;
                width: 48px;
                text-align: center;
                position: relative;
                --paper-input-container-underline: {
                    border-color: transparent;
                };
                --paper-input-container-input: {
                    transition: all .12s cubic-bezier(0.075, 0.82, 0.165, 1);
                };
            }

            .regimen-grid-quantity:hover{
                --paper-input-container-input: {
                    background: var(--app-background-color-darker);
                }
            }

            .regimen--units {
                margin: auto;
                width: 168px;
            }

            .regimen--datepicker {
                max-width: 152px;
                cursor: pointer;
                flex: 1;
            }

            .regimen-extra {
                display: flex;
                flex-direction: row;
            }

            paper-input {
                --paper-input-container-focus-color: var(--app-primary-color);
            }

            paper-input.center {
                text-align: center;
            }

            #filter {
                width: 50%;
            }

            .dropdown-priority {
                cursor: pointer;
            }

            .regimen-lines {
                border-top: 1px solid var(--app-background-color-dark);
                margin-bottom: auto;
                padding: 0 12px;
            }
            .force-left {
                left: 12px;
            }
            .force-right {
                right: 12px;
            }

            .posology-btn {
                left: 100%;
                transform: translateX(-100%);
                padding-right: 3px;
            }

            .marginRight10 {
                margin-right: 10px;
            }

            iron-input#medicNameInput {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            .regimen-details {
                border: 1px solid var(--app-background-color-dark);
                border-radius: 4px;
                padding: 4px;
                margin-bottom: 4px;
            }

            span.regimen-txt {
                height: 36px;
            }

            .regimen-add {
                justify-content: flex-end;
                margin: 8px 0;
                position: absolute;
                right: 24px;
                z-index: 10;
            }

            .display-type-regimen {
                flex-shrink: 0;
                height: 46px;
            }
            .display-type-regimen .regimen-txt {flex:1;text-align: right;}
            #medication-name {
                flex: 4;
                padding-top: 1px;
            }

            .display-type-regimen vaadin-checkbox {
                margin: 24px 8px 4px 0px;
            }

            .display-type-regimen {
                flex-shrink: 0;
                height: 46px;
            }

            #numberByFrequency {
                text-align: right;
                padding-right: 4px;
            }

            /*paper-input-container {*/
            /*    --paper-input-container-focus-color: var(--app-primary-color);*/
            /*    --paper-input-container-label: {*/
            /*        color: var(--app-text-color);*/
            /*        opacity: 1;*/
            /*    };*/
            /*    --paper-input-container-underline-disabled: {*/
            /*        border-bottom: 1px solid var(--app-text-color);*/

            /*    };*/
            /*    --paper-input-container-color: var(--app-text-color);*/
            /*}*/

            /*paper-dropdown-menu {*/
            /*    width: 140px;*/
            /*    height: 22px;*/
            /*}*/

            .comment {
                width: 100%;
                margin-right: 8px;
            }

            .custom-time {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .custom-time > div {
                display: flex;
            }

            .custom-time-add {
                height: 20px;
                width: 20px;
                background: var(--app-secondary-color);
                border-radius: 50%;
                padding: 1px;
                margin-right: 4px;
            }

            .add-box {
                position: absolute;
                display: flex;
                flex-direction: column;
                padding: 8px;
                background: white; /*var(--app-background-color-dark);*/
                border-radius: 4px;
                box-shadow: var(--app-shadow-elevation-1);
                transform: translateY(8px);
                z-index: 1;
            }
            .add-box h2 {
                text-align: center;
            }
            .add-box .one-line {
                display: flex;
                flex-direction: row;
                width: 100%;
            }
            .add-box .one-line > * {
                flex: 1;
            }

            .regimen-add .one-line {
                display: flex;
            }
            .regimen-add .one-line.fields { flex:1; }

            .add-first-regimen {
                width: 216px;
                margin: 0 auto;
                cursor: pointer;
            }

            .regimen-line .add-first-regimen {
                margin: initial;
            }

            * .btn-dropdown-container {
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                position: absolute;
                background: white;
                z-index: 10;
                width: 216px;
            }

            .add-first-regimen .btn-dropdown-container paper-item {
                text-transform: capitalize;
                height: 28px;
                padding: 0 8px;
            }

            .add-first-regimen .btn-dropdown-container paper-item:hover {
                background: var(--app-background-color-dark);
            }

            .extra-regimen {
                align-items: flex-start;
            }

            .extra-line {
                flex-grow: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .extra-control {
                flex-grow: 0;
                flex-shrink: 0;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: center;
            }

            #selectedMedicationTable {
                border: none;
                height: 200px;
            }

            *.capitalize {
                text-transform: capitalize;
            }

            paper-tabs {
                /* background: var(--app-secondary-color);
                --paper-tabs-selection-bar-color: var(--app-text-color-disabled); */
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                --paper-tabs_-_color: var(--app-text-color);
                margin-top: 0;
                flex-shrink: 0;
                padding: 0;
            }

            paper-tab{
                --paper-tab-ink: var(--app-secondary-color);
            }

            #main-table {
                position: relative;
            }

            paper-tab span{
                text-overflow: ellipsis;
                overflow: hidden;
                padding-right: 12px;
                display: block;
                max-width: calc(100% - 34px);
            }

            #custom paper-input-container{
                padding: 0;
                margin: 0 8px;
                --paper-input-container-input: {
                    border: none;
                    outline: 0;
                };
                max-width: 64px;
            }

            .rotate-icon {
                transform: rotate(-225deg);
            }

            .timeOfDay:hover {
                cursor: pointer;
                background: var(--app-background-color-dark);
            }

            #custom paper-input-container input{
                border: none;
                font-size: 1em;
                max-width: 48px;
            }

            #custom paper-input-container input:focus{
                outline: 0;
            }


            @media screen and (max-width: 936px) {
                paper-dialog#medication-detail {
                    position: fixed;
                    max-width: none !important;
                    max-height: none !important;
                    left: 0;
                    height: calc(100% - 84px) !important;
                    width: 100vw !important;
                    margin: 0;
                    transform: none;
                }
            }

            @media screen and (max-width: 768px) {
                .display-type-regimen {
                    flex-direction: column;
                }
                .display-type-regimen > * {
                    width: 100%;
                    box-sizing: border-box;
                }
                .display-type-regimen .one-line {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }
                .display-type-regimen .one-line > * {
                    flex: 1;
                }

                .regimen-add {
                    flex-direction: column;
                    height: auto;
                }
                .regimen-add > * {
                    width: 100%;
                }
                .regimen-add .add-first-regimen .btn-dropdown-container {
                    width: 100%;
                }

                .regimen-add .one-line {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }
                .regimen-add .one-line > * {
                    flex: 1;
                }
            }

            .reset-all {
                height: 22px;
                width: 22px;
                margin: 0 4px 0 8px;
                padding: 2px;
            }

            .colour-code span{
                content: '';
                display: inline-block;
                height: 24px;
                width: 24px;
                border-radius: 50%;
                vertical-align: middle;
                background-color: transparent;
                margin-right: 12px;
            }
            .code-icon {
                width: 16px;
                height: 16px;
                margin-right: 4px;
            }

            .alert-icon {
                width: 16px;
                height: 16px;
                color: var(--app-secondary-color-dark);
                margin-right: 4px;
            }

            .date-alert {
                align-self: flex-end;
                margin: 0 8px;
            }

            .allergy-alert {
                padding: 12px 0;
            }
            .allergy-title {
                display: flex;
                align-items: center;
                flex-direction: row;
                color: var(--app-secondary-color-dark);
                font-size: var(--font-size-large);
                font-weight: 700;
            }

            .title {
                flex-grow: 1;
                position: relative;
                display: inline-block;
            }
            /*.title h5 {*/
            /*    margin: 0;*/
            /*    position: absolute;*/
            /*    bottom: -4px;*/
            /*    display: flex;*/
            /*}*/

            .title-header {
                display: flex;
                align-items: center;
                padding: 0 12px;
            }

            .text-area {
                width: 100%;
            }

            .compound-title {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
            }

            .strikeOut {
                text-decoration-line: line-through;
            }

            .sam-code {
                font-size: var(--font-size-normal);
                font-weight: 400;
                display: flex;
                /*-webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);*/
            }
            .sam-code-item {
                margin-right: 8px;
                display: flex;
                align-items: center;
            }

            .list {
                font-size: var(--font-size-normal);
                font-weight: 500;
            }

            .cbip-icon {
                width: 24px;
                height: 24px;
                padding: 4px;
                margin-right: 4px
            }
            .cbip-icon.rcp {
                color: #0054ff;
            }
            .cbip-icon.leaflet {
                color: #0054ff;
                padding: 6px;
            }
            .comment {
                height: unset;
            }
            .comment paper-input-container {
                margin: 0;
                height: auto;
                --paper-input-container-input_-_height: unset;
            }
            .comment paper-input {
                width: 100%;
            }

            /*iron-autogrow-textarea {*/
            /*    --iron-autogrow-textarea_-_padding: 4px 8px 0;*/
            /*}*/

        </style>
        <div class\$="container [[_customContainer(closable)]]">
            <div class="title-header">
                <template is="dom-if" if="[[_isCompoundPrescription(medicationDetail)]]">
                    <paper-icon-button id="editBtn" class="button button--other" icon="create" role="button" on-tap="_editCompoundPrescription"></paper-icon-button>
                </template>
                <div class="title">
                    <h2><template is="dom-if" if="[[medicationDetail.compoundTitle]]">[[medicationDetail.compoundTitle]]: </template>[[medicationDetail.intendedName]]</h2>
                </div>
                <template is="dom-if" if="[[closable]]">
                    <paper-icon-button id="closeBtn" class="button button--other" icon="close" role="button" on-tap="_close"></paper-icon-button>
                    <paper-tooltip position="left" for="closeBtn">[[localize('Clo', 'Close', language)]]</paper-tooltip>
                </template>
            </div>
            <div class="content">
                <template is="dom-if" if="[[medicationDetail.samCode]]">
                    <div class="sam-code">
                        <div class="sam-code-item">
                            <paper-icon-button id="CBIPLink[[medicationDetail.id]]" class="cbip-icon" src="[[_CBIPPicture()]]" role="button" on-tap="_linkToCBIP"></paper-icon-button>
                            <paper-tooltip id="tt_CBIPLink[[medicationDetail.id]]" position="right" for="CBIPLink[[medicationDetail.id]]">[[localize('cbip','CBIP',language)]]</paper-tooltip>
                            <paper-icon-button id="rcpLink_[[medicationDetail.id]]" class="cbip-icon rcp" icon="vaadin:pill" role="button" on-tap="_linkToRcp"></paper-icon-button>
                            <paper-tooltip id="tt_rcpLink_[[medicationDetail.id]]" position="right" for="rcpLink_[[medicationDetail.id]]">[[localize('med_rcp','Résumé caractéristiques du produit (CBiP)',language)]]</paper-tooltip>
                            <paper-icon-button id="leafletLink_[[medicationDetail.id]]" class="cbip-icon leaflet" icon="vaadin:pill" role="button" on-tap="_linkToLeaflet"></paper-icon-button>
                            <paper-tooltip id="tt_leafletLink_[[medicationDetail.id]]" position="right" for="leafletLink_[[medicationDetail.id]]">[[localize('med_leaflet','Notice pour le public (CBiP)',language)]]</paper-tooltip>
                        </div>
                        <div class="sam-code-item">[[_formatSam(medicationDetail)]]</div>
                        <div class="sam-code-item">[[_formatCti(medicationDetail)]]</div>
                        <div class="sam-code-item">
                            <template is="dom-if" if="[[!medicationDetail.oldCnk]]">[[_formatCnk(medicationDetail.id)]]</template>
                            <template is="dom-if" if="[[medicationDetail.oldCnk]]">
                                <iron-icon class="alert-icon" icon="icons:warning"></iron-icon>
                                [[localize('', 'Attention', language)]] <span class="strikeOut">[[_formatCnk(medicationDetail.oldCnk)]]</span> [[localize('', 'devient', language)]] [[_formatCnk(medicationDetail.id)]]
                            </template>
                        </div>
                    </div>
                </template>
                <template is="dom-if" if="[[_hasAllergies(medicationDetail)]]">
                    <div class="allergy-alert">
                        <div class="allergy-title">
                            <iron-icon class="alert-icon" icon="icons:warning"></iron-icon>
                            [[localize('aller_int','Allergies et intolérances',language)]]
                        </div>
                        <div class="list">
                            <template is="dom-repeat" items="[[medicationDetail.allergies]]" as="allergy">
                                <div><iron-icon class\$="code-icon [[_getAtcStyle(allergy)]]" icon="[[_getAllergyIcon(allergy)]]"></iron-icon>[[_getIcpcLabel(allergy)]]<i>[[_shortDateFormat(allergy.openingDate, allergy.valueDate)]]</i>[[allergy.descr]]</div>
                            </template>
                        </div>
                    </div>
                </template>
                <div class="regimen-line display-type-regimen">
                    <template is="dom-if" if="[[medicationContent.isPrescription]]">
                        <vaadin-checkbox checked="{{medicationDetail.options.createMedication}}" id="isNew">
                            <template is="dom-if" if="[[!medicationContent.isMedication]]">
                                [[localize('create_med', 'Créer une médication chronique', language)]]
                            </template>
                            <template is="dom-if" if="[[medicationContent.isMedication]]">
                                [[localize('update_med', 'Mettre à jour la médication chronique', language)]]
                            </template>
                        </vaadin-checkbox>
                    </template>
                    <vaadin-checkbox checked="{{medicationDetail.isConfidential}}" id="isConfidential">
                            [[localize('confidentialInformation', 'Informations confidentielles', language)]]
                    </vaadin-checkbox>
                    <vaadin-checkbox checked="{{medicationContent.medicationValue.knownUsage}}" id="usageIsKnown">
                        [[localize('known_usage', 'Usage connu', language)]]
                    </vaadin-checkbox>
                </div>
                <template is="dom-if" if="[[medicationDetail.posologyNote]]">
                    <div class="regimen-line display-type-regimen comment">
                        <paper-input-container always-float-label="true">
                            <label slot="label" class="color-status">[[localize('proposed_posology','Posologie proposée',language)]]</label>
                            <iron-autogrow-textarea slot="input" disabled="" value="[[medicationDetail.posologyNote]]"></iron-autogrow-textarea>
                        </paper-input-container>
<!--                        <paper-icon-button class="button&#45;&#45;icon-btn" icon="content-copy" role="button" on-tap="_copyPosologyNote"></paper-icon-button>-->
                    </div>
                </template>
                <div class="regimen-line display-type-regimen">
                    <paper-dropdown-menu always-float-label="" id="unit" label="[[localize('portion', 'Portion', language)]]" disabled="[[!medicationDetail.dividable]]">
                        <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{quantityFactor}}">
                            <template is="dom-repeat" items="[[quantityFactors]]">
                                <paper-item id="[[item.id]]" value="[[item]]">[[localize(item.label, item.numLabel, language)]]</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>
                </div>
                <template is="dom-repeat" items="[[regimenKeys]]">
                    <ht-regimen-day api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" period-config="[[periodConfig]]" regimen-config="[[regimenConfig]]" regimen="{{medicationContent.medicationValue.regimen}}" key="[[item]]" medication-unit="[[medicationDetail.unit]]" weekday-codes="[[weekdayCodes]]" occurrences="[[regimenKeys.length]]" quantity-factor="[[quantityFactorValue]]" on-regimen-changed="_regimenChanged" on-regimen-delete="_removeRegimen">
                    </ht-regimen-day>
                </template>
                <div class="regimen-line display-type-regimen">
                    <paper-dropdown-menu always-float-label="" id="peri" label="[[localize('peri', 'Période', language)]]">
                        <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{periodConfig}}">
                            <template is="dom-repeat" items="[[periodConfigs]]">
                                <paper-item value="[[item]]">[[localize(item.id, item.id, language)]]</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>
                    <template is="dom-if" if="[[_canAddRegimen(periodConfig)]]">
                        <paper-icon-button class="button--icon-btn" icon="icons:add" on-tap="_addRegimen"></paper-icon-button>
                        <paper-dropdown-menu always-float-label="" id="periodConfigDropDown" label="[[localize(periodConfig.label, periodConfig.label, language)]]" disabled="[[periodConfig.disabled]]">
                            <paper-listbox id="periodConfig" slot="dropdown-content" attr-for-selected="value" selected="{{regimenKey}}">
                                <template is="dom-repeat" items="[[availableRegimenKeys]]">
                                    <paper-item value="[[item]]">[[localize(item, item, language)]]</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </template>
                </div>
                <div class="regimen-line display-type-regimen comment">
                    <paper-input-container always-float-label="true">
                        <label slot="label" class="color-status">[[localize('pos','Posology',language)]]</label>
                        <iron-autogrow-textarea readonly="" slot="input" value="{{medicationDetail.posology}}"></iron-autogrow-textarea>
                    </paper-input-container>
                </div>
                <div class="regimen-line display-type-regimen comment">
                    <paper-input-container always-float-label="true">
                        <label slot="label" class="color-status">[[localize('instructions-for-patient','Instructions pour le patient',language)]]/[[localize('pos','Posology',language)]]</label>
                        <iron-autogrow-textarea slot="input" value="{{medicationDetail.commentForPatient}}"></iron-autogrow-textarea>
                    </paper-input-container>
                </div>
                <div class="regimen-line display-type-regimen">
                    <vaadin-date-picker id="beginMoment" label="[[localize('start-date', 'Start date', language)]]" value="{{medicationDetail.beginMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]" required=""></vaadin-date-picker>
                    <template is="dom-if" if="[[medicationContent.isPrescription]]">
                        <vaadin-date-picker id="endMoment" label="[[localize('end-date', 'End date', language)]]" value="{{medicationDetail.endMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]" min="[[medicationDetail.beginMomentAsString]]"></vaadin-date-picker>
                        <paper-input always-float-label="" type="number" min="0" label="[[localize('','Nombre de jours',language)]]" value="{{duration}}" autovalidate="" pattern="^\\d*\$"></paper-input>
                        <template is="dom-if" if="[[canShowProvisionInfo]]">
                            <vaadin-date-picker id="endProvisionMoment" label="[[localize('', 'Fin boîte', language)]]" readonly="" value="[[endProvisionMomentAsString]]" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                            <paper-input always-float-label="" type="number" min="0" readonly="" label="[[localize('provision-days','Jours couverts',language)]]" value="[[provisionDays]]"></paper-input>
                            <template is="dom-if" if="[[insufficientProvision]]">
                                <div class="date-alert">
                                    <iron-icon class="alert-icon" icon="icons:warning"></iron-icon>
                                </div>
                            </template>
                        </template>
                    </template>
                </div>
                <div class="regimen-line display-type-regimen">
                    <template is="dom-if" if="[[medicationContent.isPrescription]]">
                        <paper-dropdown-menu always-float-label="" id="medicSubstitution" label="[[localize('', 'Substitution', language)]]">
                            <paper-listbox id="substitution" slot="dropdown-content" selected="{{medicationDetail.substitutionAllowed}}" attr-for-selected="value">
                                <paper-item value="true">[[localize('subtitutionAllowed','Autorisée',language)]]</paper-item>
                                <paper-item value="false">[[localize('subtitutionForbidden','Interdite',language)]]</paper-item>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </template>

                    <paper-dropdown-menu always-float-label="" id="medicReimbursement" label="[[localize('presc_reimb', 'Reimbursement', language)]]" class="regimen--reimbursement">
                        <paper-listbox id="reimbursementReason" slot="dropdown-content" class="dropdown-reimbursement" attr-for-selected="value" selected="{{reimbursementReason}}">
                            <template is="dom-repeat" items="[[reimbursementCodeRecipe]]">
                                <paper-item value="[[item]]">[[_getCodeLabel(item.label)]]</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>

                    <template is="dom-if" if="[[medicationContent.isPrescription]]">
                        <vaadin-date-picker id="deliveryDate" label="[[localize('deliv_from', 'Délivrable à partir du', language)]]" readonly="" value="{{medicationDetail.deliveryMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                        <vaadin-date-picker id="endExecDate" label="[[localize('EndDateForExecution', 'Date de fin pour excécution', language)]]" readonly="" value="{{medicationDetail.endExecMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                    </template>
                </div>
                <div class="regimen-line display-type-regimen">
                    <!--
                    <vaadin-checkbox checked="[[medicationContent.medicationValue.substitutionAllowed]]" id="substitutionAllowed" on-checked-changed="_substitutionAllowedChanged">[[localize('substitution', 'Substitution', language)]]</vaadin-checkbox>
                    <vaadin-checkbox id="renewal" checked=[[medicationContent.medicationValue.isRenewal]] on-checked-changed="_renewalValueChanged">[[localize('renewal', 'Renewal', language)]]</vaadin-checkbox>
                    -->
                    <template is="dom-if" if="[[medicationContent.isPrescription]]">
                        <paper-dropdown-menu always-float-label="" id="medicRenewal" label="[[localize('renewal', 'Renouvellement', language)]]">
                            <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{medicationDetail.renewal}}">
                                <paper-item value="allowed">[[localize('allowed','Permis',language)]]</paper-item>
                                <paper-item value="forbidden">[[localize('forbidden','Interdit',language)]]</paper-item>
                            </paper-listbox>
                        </paper-dropdown-menu>
                        <template is="dom-if" if="[[_isAllowed(medicationDetail.renewal)]]">
                            <paper-input always-float-label="" type="number" min="0" label="[[localize('amount', 'Nombre', language)]]" max="100" value="{{medicationContent.medicationValue.renewal.decimal}}"></paper-input>
                            <paper-input always-float-label="" type="number" min="0" label="[[localize('everyX', 'tous le', language)]]" max="100" value="{{medicationContent.medicationValue.renewal.duration.value}}"></paper-input>
                            <paper-dropdown-menu always-float-label="" id="medicRenewalTimeUnit" label="[[localize('time_unit','Time unit',language)]]" class="regimen--renewalTimeUnit">
                                <paper-listbox id="renewalTimeUnit" slot="dropdown-content" class="dropdown-renewalTimeUnit" attr-for-selected="value" selected="{{renewalTimeUnit}}">
                                    <template is="dom-repeat" items="[[timeUnits]]">
                                        <paper-item value="[[item]]">[[_getCodeLabel(item.label)]]</paper-item>
                                    </template>
                                </paper-listbox>
                            </paper-dropdown-menu>
                        </template>
                    </template>
                </div>
<!--                deprecated-->
<!--                <div class="regimen-line display-type-regimen comment">-->
<!--                    <paper-input-container always-float-label="true">-->
<!--                        <label slot="label" class="color-status">[[localize('comments-for-pharmacist','Commentaires pour le pharmacien',language)]]</label>-->
<!--                        <iron-autogrow-textarea slot="input" value="{{medicationContent.medicationValue.commentForDelivery}}"></iron-autogrow-textarea>-->
<!--                    </paper-input-container>-->
<!--                </div>-->
            </div> 
        </div>
`;
  }

  static get is() {
      return 'medication-details'
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          medicationContent: {
              type: Object,
              value: null,
              notify: true
          },
          medications: {
              type: Array,
              value: []
          },
          bufferUnit: {
              type: String
          },
          bufferQuantity: {
              type: Number,
              value: 1
          },
          bufferNumberByFrequency: {
              type: Number,
              value: 1
          },
          bufferFrequency: {
              type: String,
              value: "daily"
          },
          bufferGeneralFrequency: {
              type: Number,
              value: 0
          },
          medicPriority: {
              type: Number,
              value: 0,
              observer: "_changeMedicPriority"
          },
          selectedTab: {
              type: Number,
              value: 0
          },
          openAddDropDown: {
              type: Boolean,
              value: false
          },
          openAddColDropDown: {
              type: Boolean,
              value: false
          },
          reimbursementCodeRecipe: {
              type: Array,
              value: () => []
          },
          reimbursementItem:{
              type: Object,
              value: () => {}
          },
          reimbursementItemIdx:{
              type: Number,
              value: 0
          },
          timeUnits:{
              type: Array,
              value: () => []
          },
          renewalDurationUnitItem: {
              type: Object,
              value: () => {}
          },
          renewalTimeUnitIdx:{
              type: Number,
              value: 0
          },
          renewalDurationValue: {
              type: Number,
              value: 0
          },
          isRenewal:{
              type: Boolean,
              value: false
          },
          renewalDecimalValue:{
              type: Number,
              value: 0
          },
          medicationMustBeCreated:{
              type: Boolean,
              value: false
          },
          medicationDetail: {
              type: Object,
              value: () => {}
          },
          substitution: {
              type: Number,
              value: 0
          },
          duration: {
              type: Number
          },
          time: {
              type: String,
              value: "10:00"
          },
          renewal: {
              type: Number,
              value: 0
          },
          // medication: {
          //     type: Object,
          //     value: null
          // },
          quantityFactor: {
              type: Object,
              value: null
          },
          totalQuantity: {
              type: Number,
              value: 0
          },
          totalTakes: {
              type: Number,
              value: 0
          },
          regimenKeys: {
              type: Array,
              value: () => [],
              notify: true
          },
          regimenKey: {
              type: String,
              value: ""
          },
          medicationId: {
              type: String,
              value: ""
          },
          quantityFactors: {
              type: Array,
              value: () => [
                  {id: "one", label: "quantity_factor_one", numLabel: "1", denominator: 1},
                  {id: "half", label: "quantity_factor_half", numLabel: "1/2", denominator: 2},
                  {id: "third", label: "quantity_factor_third", numLabel: "1/3", denominator: 3},
                  {id: "quarter", label: "quantity_factor_quarter", numLabel: "1/4", denominator: 4}
              ]
          },
          weekdayKeys: {
              type: Array,
              value: () => ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
          },
          periodConfigs: {
              type: Array,
              value: () => [
                  {id: "dailyPosology", title: "dai", keys: [], label: "", disabled: true, keyId: ""},
                  {id: "weeklyPosology", title: "wee", keys: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], label: "dayOfWeek", disabled: false, keyId: "weekday"}
                  // @ todo: dayNumber not supported in posologyString
                  // {id: "monthly", keys: _.range(1, 32), label: "dayOfMonth", disabled: false, keyId: "dayNumber"}
              ]
          },
          periodConfig: {
              type: Object,
              value: {id: ""}
          },
          availableRegimenKeys: {
              type: Array,
              value: () => [""]
          },
          regimenConfig: {
              type: Array,
              value: () => [
                  {id: "afterwakingup"},
                  {id: "beforebreakfast", parentId: "morning"},
                  {id: "morning"},
                  {id: "duringbreakfast", parentId: "morning"},
                  {id: "afterbreakfast", parentId: "morning"},
                  {id: "betweenbreakfastandlunch"},
                  {id: "beforelunch", parentId: "midday"},
                  {id: "midday"},
                  {id: "duringlunch", parentId: "midday"},
                  {id: "afterlunch", parentId: "midday"},
                  {id: "betweenlunchanddinner"},
                  {id: "beforedinner", parentId: "evening"},
                  {id: "evening"},
                  {id: "duringdinner", parentId: "evening"},
                  {id: "afterdinner", parentId: "evening"},
                  {id: "thehourofsleep"}
              ]
          },
          weekdayCodes: {
              type: Array,
              value: () => []
          },
          dayPeriodCodes: {
              type: Array,
              value: () => []
          },
          reimbursementReason: {
              type: Object,
              value: () => {}
          },
          insufficientProvision: {
              type: Boolean,
              value: false
          },
          renewalTimeUnit: {
              type: Object,
              value: () => {}
          },
          canShowProvisionInfo: {
              type: Boolean,
              value: false
          },
          canShowQuantityInfo: {
              type: Boolean,
              value: false
          },
          cachedBoxes: {
              type: String,
              value: ""
          },
          closable: {
              type: Boolean,
              value: false
          },
          initializingDate: {
              type: Boolean,
              value: false,
          },
          commentSeparator: {
              type: String,
              value: " - "
          }
      }
  }

  static get observers() {
      return [
          '_changeBeginMoment(medicationDetail.beginMomentAsString)',
          '_changeEndMoment(medicationDetail.endMomentAsString)',
          '_changeDuration(duration)',
          '_regimenChanged(medicationContent.medicationValue, medicationDetail.commentForPatient, medicationContent.medicationValue.regimen.*)',
          '_medicationChanged(medication, medication.*)',
          '_quantityFactorChanged(quantityFactor)',
          '_periodChanged(periodConfig)',
          '_renewalChanged(medicationDetail.renewal)',
          '_reimbursementReasonChanged(reimbursementReason)',
          '_renewalTimeUnitChanged(renewalTimeUnit)',
          '_isConfidentialChanged(medicationDetail.isConfidential)',
          '_substitutionAllowedChanged(medicationDetail.substitutionAllowed)'

      ];
  }

  constructor() {
      super();
  }

  ready() {
      super.ready();
  }

  _linkToCBIP(e){
      e.stopPropagation();
      if (!this.medicationDetail) return;
      window.open(`http://www.cbip.be/${this.language}/contents/jump?cnk=${this.medicationDetail.id}`,'_blank');
  }
  _linkToRcp(e){
      e.stopPropagation();
      if (!this.medicationDetail) return;
      window.open(this.medicationDetail.spcLink,'_blank');
  }
  _linkToLeaflet(e){
      e.stopPropagation();
      if (!this.medicationDetail) return;
      window.open(this.medicationDetail.leafletLink,'_blank');
  }
  _CBIPPicture() {
      return require('../../../../images/cbip-logo.png')
  }
  _formatSam(medicationDetail) {
      return medicationDetail && (medicationDetail.samCode + " (" + medicationDetail.samDate + ")") || "";
  }

  _formatCnk(id) {
      return id && ("CNK " + id) || "";
  }

  _formatCti(medicationDetail) {
      return medicationDetail && medicationDetail.ctiExtended && ("CTI-ext " + medicationDetail.ctiExtended) || "";
  }
  _customContainer() {
      return this.closable ? "container-prescription" : "container-standalone";
  }

  _isConfidentialChanged() {
      if (!this.medicationDetail || !this.medicationDetail.newMedication) return;
      const newMed = this.medicationDetail.newMedication;
      const confType = "org.taktik.icure.entities.embed.Confidentiality";
      ((newMed.tags || (newMed.tags = [])).find(tag => tag.type === confType) || (newMed.tags[newMed.tags.length] = {type: confType, version: "1"})).code = (this.medicationDetail.isConfidential ? "secret" : "notsecret");
  }

  _substitutionAllowedChanged() {
      if (!this.medicationDetail) return;
      this.set("medicationContent.medicationValue.substitutionAllowed", (this.medicationDetail.substitutionAllowed === "true"));
  }

  _close() {
      this.dispatchEvent(new CustomEvent('close', {detail: {}, bubbles: true, composed: true}));
  }

  _editCompoundPrescription() {
      this.dispatchEvent(new CustomEvent('edit-compound', {
          detail: {
              item : {
                  title: this.medicationDetail.compoundTitle,
                  formula: this.medicationDetail.intendedName,
                  fromPrescription: {
                      update: false,
                      onChange: this._updateCompoundPrescription.bind(this)
                  }
              }
          }, bubbles: true, composed: true
      }));
  }

  _updateCompoundPrescription(compound) {
      const medicationValue = _.get(this.medicationContent, "medicationValue", "");
      if (medicationValue) {
          medicationValue.compoundPrescription = compound.title + "\r\n" + compound.formula;
          this.set("medicationDetail.compoundTitle", compound.title);
          this.set("medicationDetail.intendedName", compound.formula);
      }
  }

  _isPortion() {
      return this.quantityFactor.denominator > 1;
  }

  _reimbursementReasonChanged() {
      if (!this.reimbursementReason) {
          this.set("medicationContent.medicationValue.reimbursementReason", null);
      }
      else {
          this.set("medicationContent.medicationValue.reimbursementReason", this.reimbursementReason);
      }
  }

  _renewalTimeUnitChanged() {
      this.set("medicationContent.medicationValue.renewal.duration.unit", this.renewalTimeUnit);
  }

  _isAllowed(renewal) {
      return renewal === "allowed";
  }

  _renewalChanged() {
      if (!this.medicationDetail || !this.medicationContent) return;
      if (this.medicationDetail.renewal === "allowed") {
          const renewal = this.medicationContent.medicationValue.renewal || {
              decimal: 1,
              duration: {
                  value: 1,
                  unit: this.timeUnits.find(timeUnit => timeUnit.code === "mo")
              }
          };
          this.set("medicationContent.medicationValue.renewal", renewal);
          this.set("renewalTimeUnit", this.timeUnits.find(timeUnit => timeUnit.code === renewal.duration.unit.code));
      } else {
          delete this.medicationContent.medicationValue.renewal;
          this.notifyPath("medicationContent.medicationValue.renewal");
      }
  }

  _quantityFactorChanged() {
      const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
      if (!regimen) return;
      regimen.filter(reg => reg.administratedQuantity && reg.administratedQuantity.quantity || "")
          .forEach(reg => {
              const quantity = reg.administratedQuantity.quantity;
              reg.administratedQuantity.unit = this.medicationDetail.unit || this.localize("uni", "Unités");
              reg.administratedQuantity.quantity = this.quantityFactor.denominator > 1 && this.quantityFactor.numLabel || parseInt(quantity) || "";
          });
      this.set("quantityFactorValue", this.quantityFactor);
      this.notifyPath("medicationContent.medicationValue", "changed");
  }

  // _medicationDetailChanged(e) {
  //     console.log("__medicationDetailChanged()", this.medicationDetail)
  //     this.dispatchEvent(new CustomEvent('value-changed', {detail: {id: this.medicationDetail.id}, bubbles: true, composed: true}))
  // }

  _hasAllergies(item) {
      return item && item.allergies && item.allergies.length;
  }

  _getAllergyIcon(item) {
      return item.type === "allergy" ? "image:filter-vintage" : (item.type === "adr" ? "vaadin:pill" : "");
  }

  _getAtcStyle(item) {
      if (!item || !item.atcCode) return '';
      return 'ATC--' + item.atcCode[0].toUpperCase();
  }

  _getIcpcLabel(item) {
      const icpc = item.codes && item.codes.find(code => code.type==='ICPC' || code.type==='ICPC2');
      return icpc && (icpc.code || icpc.id.split("|")[1]) || "";
  }

  _shortDateFormat(date, altDate) {
      return (date || altDate) && this.api.moment((date || altDate)).format("YY") || "";
  }

  _any(a,b,c,d,e) {
      return a||b||c||d||e
  }

  _getCodeLabel(code){
      return code && code[this.language]
  }

  _instructionOverride() {
      const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
      if (regimen && regimen.length) {
          this._resetAll()
      }
  }

  _regimenChanged() {
      if (!this.medicationContent || !this.medicationContent.medicationValue || !this.medicationDetail) return;
      this._updateStats();
      this.medicationContent.medicationValue.instructionForPatient = "";
      const posology = this.api.contact().medication().posologyToString(this.medicationContent.medicationValue || {}, this.language);
      this.set("medicationDetail.posology", posology);
      const separator = posology && this.medicationDetail.commentForPatient && this.commentSeparator || "";
      this.medicationContent.medicationValue.instructionForPatient = posology + separator + this.medicationDetail.commentForPatient;
  }

  _extractCommentForPatient() {
      if (!this.medicationContent || !this.medicationContent.medicationValue) return;
      const instructionForPatient = this.medicationContent.medicationValue.instructionForPatient;
      this.medicationContent.medicationValue.instructionForPatient = "";
      const posology = this.api.contact().medication().posologyToString(this.medicationContent.medicationValue || {}, this.language);
      const comment = instructionForPatient && instructionForPatient.replace(posology, "") || "";
      const index =  comment ? comment.indexOf(this.commentSeparator) : -1;
      return (index < 0) ? comment : comment.slice(this.commentSeparator.length);
  }

  _updateStats() {
      if (!this.quantityFactor) return;
      const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
      if (!regimen) return;

      const end = this._endMoment();
      const begin = this._beginMoment();

      let availableDoses = parseInt(_.get(this.medicationDetail, "packDisplayValue", 0), 10) * parseInt(_.get(this.medicationDetail, "boxes", 0), 10) * this.quantityFactor.denominator;
      const keys= this.periodConfig.id === "weeklyPosology" ? this.weekdayKeys : [""];
      let currentDayNumber = this.periodConfig.id === "weeklyPosology" ? begin.weekday() : 0;

      let takes = keys.map(key => regimen.reduce((total, period) => {
              if (!key || _.get(period, "weekday.code", 0) === key) {
                  total += (this.quantityFactor.denominator > 1) && 1 || parseInt(period.administratedQuantity.quantity, 10) || 0;
              }
              return total;
          }, 0)
      );

      const totalTakesPerPeriod = takes.reduce((total, quantity) => {
          total += quantity;
          return total;
      }, 0);

      // this.set("totalTakesPerPeriod", totalTakesPerPeriod);

      const totalQuantityPerPeriod = Math.round(totalTakesPerPeriod / this.quantityFactor.denominator);

      // this.set("totalQuantityPerPeriod", totalQuantityPerPeriod);
      this.set("canShowProvisionInfo", this.medicationContent.isPrescription && availableDoses > 0 && totalTakesPerPeriod > 0);

      let medicationDays = end ? end.diff(begin, "days") : 0;

      this.set("canShowQuantityInfo", medicationDays && totalTakesPerPeriod);

      let provisionDays = 0;
      let totalTakes = 0;

      if (totalTakesPerPeriod > 0) {
          while (availableDoses > 0 || medicationDays > 0) {
              const dailyTakes = (takes[(currentDayNumber++) % takes.length] || 0);
              if (availableDoses > 0) {
                  availableDoses -= dailyTakes;
                  provisionDays += 1;
              }
              if (medicationDays > 0) {
                  medicationDays -= 1;
                  totalTakes += dailyTakes;
              }
          }

          if (availableDoses < 0) {
              provisionDays--;
          }
      }

      const totalQuantity = Math.round(totalTakes / this.quantityFactor.denominator);

      const endProvisionMoment = this._beginMoment().add(provisionDays, "days");

      this.set("provisionDays", provisionDays);
      this.set("totalTakes", totalTakes);
      this.set("totalQuantity", totalQuantity);
      this.set("endProvisionMomentAsString", endProvisionMoment.format("YYYY-MM-DD"));
      this.set("insufficientProvision", (endProvisionMoment.isBefore(this._endMoment())));
  }

  _beginMoment() {
      return this.api.moment(this.medicationDetail.beginMomentAsString, "YYYY-MM-DD");
  }

  _endMoment() {
      return this.api.moment(this.medicationDetail.endMomentAsString, "YYYY-MM-DD");
  }

  _changeBeginMoment() {
      if (this.medicationDetail) { // begin moment can NOT be empty
          if (!this._beginMoment()) {
              this.set("medicationDetail.beginMomentAsString", moment().format("YYYY-MM-DD"))
          } else {
              if (this.medicationDetail.endMomentAsString && !this.initializingDate) {
                  const endMoment = this._beginMoment().add(this.duration, "days");
                  this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD"));
                  this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10));
              } else {
                  this.set("medicationContent.medicationValue.endMoment", null);
              }
              this.set("medicationContent.medicationValue.beginMoment", parseInt(this._beginMoment().format("YYYYMMDD"), 10));
              this._updateStats();
          }
      }
  }

  _changeEndMoment() {
      if (this.medicationDetail && this._beginMoment()) {
          if (!this._endMoment()) {
              this.set("duration", "");
          } else {
              let endMoment = this._endMoment();
              let duration = endMoment.diff(this._beginMoment(), "days");
              if (duration < 0) {
                  duration = 0;
                  endMoment = this._beginMoment();
                  this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD"));
              }
              this.set("duration", duration.toString());
              this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10));
          }
          this._updateStats();
      }
  }

  _changeDuration() {
      if (this.medicationDetail && this._beginMoment()) {
          if (this.duration === "0") {
              this.set("duration", "");
          }
          else if (!this.duration) {
              this.set("medicationDetail.endMomentAsString", "");
              this.set("medicationContent.medicationValue.endMoment", null);
          } else {
              const endMoment = this._beginMoment().add(this.duration, "days");
              this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD"));
              this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10));
          }
          this._updateStats();
      }
  }

  _isCompoundPrescription() {
      return this.medicationDetail && this.medicationDetail.type === "compound";
  }

  _setSpinnerBusy() {
      this.dispatchEvent(new CustomEvent('spinner-busy', {
          detail: {}, bubbles: true, composed: true
      }));
  }

  _setSpinnerIdle() {
      this.dispatchEvent(new CustomEvent('spinner-idle', {
          detail: {}, bubbles: true, composed: true
      }));
  }

  extractContentWithIdFromMedicationService(m, isNew, isPres) {
      const content = this.api.contact().preferredContent(m, this.language)  || (m.content[this.language] = {
          medicationValue: {regimen: []}
      });
      return {
          id: m.id,
          codes: m.codes,
          medicationValue: content.medicationValue,
          isNew: isNew || false,
          isPrescription: m.isPrescription || isPres || false,
          isMedication: m.tags && m.tags.length && m.tags.some(tag => tag.type === "CD-ITEM" && tag.code === "medication") || false
      };
  }

  _checkCnk(medication) {
      if (medication.type === "medicine" && medication.id && !medication.samCode) {
          return this.api.besamv2().findAmpsByDmppCode(medication.id)
              .then(amps => {
                  // get the latest version and compare cnk
                  const now = moment().valueOf();
                  const validAmpps = amps && amps.length && amps.reduce((validAmpps, amp) => {
                      if ((amp.status === "AUTHORIZED") && amp.ampps && amp.ampps.length) {
                          return validAmpps.concat(amp.ampps.map(ampp => {
                              return Object.assign(ampp, {
                                  amp: amp,
                                  publicDmpp: ampp.dmpps.find(dmpp => dmpp.deliveryEnvironment === "P" && dmpp.codeType === "CNK" && dmpp.from < now && (!dmpp.to || dmpp.to > now))
                              });
                          }));
                      } else {
                          return validAmpps;
                      }
                  }, []);

                  const lastAmpps = validAmpps && validAmpps.filter(ampp => ampp.publicDmpp);
                  const updatedAmpp = lastAmpps && lastAmpps.length && lastAmpps.sort((a, b) => b.publicDmpp.from - a.publicDmpp.from)[0];
                  const samDate = updatedAmpp && updatedAmpp.publicDmpp && moment(updatedAmpp.publicDmpp.from).format("DD/MM/YYYY");
                  Object.assign(medication, {
                      spcLink: _.get(updatedAmpp, `spcLink.${this.language}`, ""),
                      leafletLink: _.get(updatedAmpp, `leafletLink.${this.language}`, ""),
                      ctiExtended: updatedAmpp && updatedAmpp.ctiExtended,
                      posologyNote: updatedAmpp && updatedAmpp.posologyNote,
                      dividable: updatedAmpp && updatedAmpp.dividable,
                      packDisplayValue: updatedAmpp && updatedAmpp.packDisplayValue,
                      samCode: _.get(updatedAmpp, "amp.code", ""),
                      samDate: samDate,
                  });
                  if (lastAmpps.some(ampp => ampp.publicDmpp.code === medication.id)) {
                      console.log("CNK ok");
                  } else {
                      const updatedCnk = updatedAmpp.publicDmpp.code;
                      const oldCnk = medication.id;
                      console.log("CNK too old: current CNK: " + oldCnk + "; latest: " + updatedCnk);
                      Object.assign(medication, {
                          oldCnk: oldCnk,
                          id: updatedCnk
                      })
                  }
                  // @ todo also retrieve the current ampp to update data like displayPackage
                  medication.updatedAmpp = updatedAmpp;
                  return medication;
              })
              .catch(err => {
                  console.log(err);
                  return medication;
              })
      } else {
          return Promise.resolve(medication);
      }
  }

  _medicationChanged(medication) {
      if (!medication) return;

      this._setSpinnerBusy();
      this._checkCnk(medication)
          .then(medication => {
              if (this.cachedBoxes && this.cachedBoxes !== medication.boxes) {
                  this._updateStats();
              }
              this.cachedBoxes = medication.boxes;

              this.set("medicationDetail", null);

              const content = this.content || this.extractContentWithIdFromMedicationService(medication.newMedication, medication.options.isNew, medication.options.isPrescription);
              this.set("medicationContent", content);

              this._initmedicationContent();

              const today = this.api.moment(Date.now());
              this.set("initializingDate", true);

              const commentForPatient = this._extractCommentForPatient();

              this.set("medicationDetail", Object.assign(
                  medication,
                  {
                      beginMomentAsString : this.api.moment((content && content.medicationValue && content.medicationValue.beginMoment) || (medication.newMedication && medication.newMedication.valueDate) || (medication.newMedication && medication.newMedication.openingDate) || Date.now()).format('YYYY-MM-DD') || null,
                      endMomentAsString: this.api.moment((content && content.medicationValue && content.medicationValue.endMoment) || (medication.newMedication && medication.newMedication.closingDate)) ? this.api.moment(content.medicationValue.endMoment || (medication.newMedication && medication.newMedication.closingDate)).format("YYYY-MM-DD") : null,
                      deliveryMomentAsString: today.format("YYYY-MM-DD"),
                      endExecMomentAsString: today.add(3, "months").subtract(1, "days").format("YYYY-MM-DD"),
                      dividable: medication.dividable === undefined ? true : medication.dividable,
                      packDisplayValue: medication.packDisplayValue || 0,
                      medicPriority : this.medicationContent.medicationValue.priority === "high" ? 2 : this.medicationContent.medicationValue.priority === "middle" ? 1 : 0,
                      renewal: !!this.medicationContent.medicationValue.renewal ? "allowed" : "forbidden",
                      isConfidential: ((medication.newMedication.tags || []).find(tag => tag.type === "org.taktik.icure.entities.embed.Confidentiality") || {code: ""}).code === "secret",
                      substitutionAllowed: this.medicationContent.medicationValue.substitutionAllowed ? "true" : "false",
                      commentForPatient: commentForPatient
                  }
              ));
              this.set("initializingDate", false);

              // this.set("renewalTimeUnit", this.medicationContent.medicationValue.renewal && this.medicationContent.medicationValue.renewal.duration.unit || this.timeUnits.find(timeUnit => timeUnit.code === "mo"));
              const reimb = this.medicationContent.medicationValue.reimbursementReason;
              this.reimbursementReason = null;
              // this.set("reimbursementReason", reimb && this.reimbursementCodeRecipe.find(item => item.code === reimb.code) || this.reimbursementCodeRecipe.find(item => item.code === "notreimbursable"));
              this.set("reimbursementReason", reimb && this.reimbursementCodeRecipe.find(item => item.code === reimb.code) || "");

              const quantitySample = _.get(this.medicationContent, "medicationValue.regimen[0].administratedQuantity.quantity", "");
              this.set("quantityFactor", quantitySample && !parseInt(quantitySample, 10) && this.quantityFactors.find(q => q.numLabel === quantitySample) || this.quantityFactors[0]);

              // @todo: month (dayNumber) and date
              const period = _.has(this.medicationContent, "medicationValue.regimen[0].weekday") ? "weeklyPosology" : "dailyPosology" ;
              if (this.periodConfig.id !== period) {
                  this.set("periodConfig", this.periodConfigs.find(config => config.id === period));
              } else {
                  this._periodChanged();
              }
              this._updateStats();
          })
          .finally(() => this._setSpinnerIdle());
  }

  _periodChanged() {
      if (!this.periodConfig.id) return;
      let regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
      this.set("medicationContent.medicationValue.regimen", regimen.filter(reg => this.periodConfig.id === "weeklyPosology" ? reg.weekday : !reg.weekday));
      this._initRegimenKeys();
  }

  _initRegimenKeys() {
      this.splice("regimenKeys", 0, this.regimenKeys.length);
      let regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
      if (this.periodConfig.id === "weeklyPosology") {
          if (!regimen.length) {
              this.push("regimenKeys", this.periodConfig.keys[0]);
          } else {
              const keyId = this.periodConfig.keyId;
              if (keyId === "weekday") {
                  const regimenKeys = regimen.filter((e, i, a) => a.findIndex(x => x[keyId].code === e[keyId].code) === i)
                      .map(reg => reg[keyId].code)
                      .filter(code => this.weekdayCodes.some(weekdayCode => weekdayCode.code === code));
                  this.push("regimenKeys", ...regimenKeys)
              } else {
                  // @todo: dayNumber and date cases
              }
          }
      } else {
          this.push("regimenKeys", "none");
      }
      this._updatePeriodConfigs();
  }

  _updatePeriodConfigs() {
      if (!this.periodConfig) return;
      if (this.periodConfig.id !== "dailyPosology") {
          this.splice("availableRegimenKeys", 0, this.availableRegimenKeys.length);
          const availableRegimenKeys = this.periodConfig.keys.filter(key => !this.regimenKeys.some(regKey => regKey === key));
          if (availableRegimenKeys.length) {
              this.push("availableRegimenKeys", ...availableRegimenKeys);
              this.set("regimenKey", availableRegimenKeys[0]);
          }
      }
  }

  _canAddRegimen() {
      // @ todo
      // return (this.periodConfig.id === "weeklyPosology") || (this.periodConfig.id === "monthlyPosology");
      return (this.periodConfig.id === "weeklyPosology" && this.availableRegimenKeys.length);
  }

  _canDeleteRegimen() {
      return (this.regimenKeys.length > 1);
  }

  _addRegimen() {
      const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
      if (!regimen) return;
      if (!this.regimenKey) return;
      if (this.regimenKeys.includes(this.regimenKey))
          return;
      this.push("regimenKeys", this.regimenKey);
      this._updatePeriodConfigs();
  }

  _removeRegimen(e) {
      const key = _.get(e, "detail.key", "")
      if (!key) return;
      if (this.periodConfig.id === "dailyPosology") return;
      if (this.regimenKeys.length < 2) return;
      const keyId = this.periodConfig.keyId;
      let regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
      if (keyId === "weekday") {
          regimen = regimen.filter(reg => reg.weekday && reg.weekday.code != key)
      } else {
          // @ todo dayNumber and date
      }
      this.set("medicationContent.medicationValue.regimen", regimen);
      this.splice("regimenKeys", this.regimenKeys.indexOf(key), 1);
      this._updatePeriodConfigs();
  }


  _all(a,b) { return a && b }

  _regimenLines() {
      return this.medicationContent && this.medicationContent.medicationValue && this.medicationContent.medicationValue.regimen || []
  }

  // extractContentWithIdFromMedicationService(m, isNew, isPres) {
  //     const content = this.api.contact().preferredContent(m, this.language)  || (m.content[this.language] = {
  //         medicationValue: {regimen: []},
  //         medicationUnit: this.localize("generic_unit", "unit")
  //     });
  //     return {
  //         id: m.id,
  //         codes: m.codes,
  //         medicationValue: content.medicationValue,
  //         medicationUnit: content.medicationUnit,
  //         isNew: isNew || false,
  //         isPrescription: m.isPrescription || isPres || false,
  //         isMedication: m.tags && m.tags.length && m.tags.some(tag => tag.type === "CD-ITEM" && tag.code === "medication") || false
  //     };
  // }

  // open(medicationDetail, medicationContent, boxes) {
  //     const preferredContent = this.api.contact().preferredContent(medicationDetail, this.language);
  //     if (!medicationContent || !medicationContent.isNew) { // medicationContent.isNew==false when opening an existing medication
  //         // do not set a default date if not defined, for the user to see when a medication has no date
  //         const start = (preferredContent && preferredContent.medicationValue && preferredContent.medicationValue.beginMoment)
  //             || (medicationDetail.valueDate)
  //             || (medicationDetail.openingDate);
  //         const end = (preferredContent && preferredContent.medicationValue && preferredContent.medicationValue.endMoment)
  //             || (medicationDetail.closingDate);
  //         medicationContent = this.extractContentWithIdFromMedicationService(medicationDetail, false, medicationContent.isPrescription);
  //         medicationContent.beginMomentAsString = start && this.api.moment(start).format('YYYY-MM-DD') || null;
  //         medicationContent.endMomentAsString = end && this.api.moment(end).format('YYYY-MM-DD') || null;
  //     } else { // new medication, should set a default start date
  //         medicationContent.beginMomentAsString = this.api.moment(Date.now()).format("YYYY-MM-DD");
  //     }
  //
  //     this.set('medicationContent', medicationContent);
  //     this._initmedicationContent();
  //     this.set('medicationDetail', {
  //         boxes: boxes || 1,
  //         medicPriority: this.medicationContent.medicationValue.priority === "high" ? 2 : this.medicationContent.medicationValue.priority === "middle" ? 1 : 0,
  //         renewal: !!this.medicationContent.medicationValue.renewal,
  //         newMedication: medicationDetail,
  //         options: {
  //             createMedication: this.medicationContent.createMedication,
  //             isPrescription: this.medicationContent.isPrescription,
  //             isNew: this.medicationContent.isNew
  //         }
  //     });
  //
  //     this.set('medicationMustBeCreated', false):
  //     this.set('openAddDropDown', false);
  //
  //     const medicationControl = this.$['medication-detail'];
  //     medicationControl.init()
  //         .catch(err => console.log(err))
  //         .finally(() => medicationControl.open());
  // }

  init() {
      return new Promise(resolve => {
          if (this.dayPeriodCodes && this.dayPeriodCodes.length) return resolve();
          else return this.api.code().findCodes("be", "CD-DAYPERIOD")
              .then(codes => this.api.code().findCodes("be", "care.topaz.customDayPeriod")
                  .then(customCodes => this.push("dayPeriodCodes", ...codes.concat(customCodes))))
              .then(() => Promise.all(this.regimenConfig.map(reg => {
                      let dayPeriod = this.dayPeriodCodes.find(dayPeriod => dayPeriod.code === reg.id);
                      if (!dayPeriod) {
                          dayPeriod = {code: reg.id, type: "CD-DAYPERIOD"};
                      }
                      Object.assign(reg, {dayPeriod: dayPeriod});
                      if (!dayPeriod.label || !dayPeriod.label[this.language]) {
                          dayPeriod.label = _.fromPairs([[this.language, _.lowerCase(_.trim(this.localize(`ms_${reg.id}`, reg.id)))]]);
                      }
                  }))
              )
              .then(() => resolve())
      })
          .then(() => {
              if (this.weekdayCodes && this.weekdayCodes.length) return Promise.resolve();
              else return this.api.code().findCodes("be", "CD-WEEKDAY")
                  .then(codes => this.push("weekdayCodes", ...codes.map(code => {
                      const day = code.label[this.language] || "";
                      const number = this.weekdayKeys.indexOf(code.code) || -1;
                      return Object.assign(
                          code,
                          {
                              "weekday": day,
                              "weekNumber": (number > -1) && number || 0
                          });
                  })
              ))
          })
          .then (() => {
              if (this.reimbursementCodeRecipe && this.reimbursementCodeRecipe.length) return Promise.resolve();
              return this.api.code().findCodes("be", "CD-REIMBURSEMENT-RECIPE")
                  .then(reimb => this.push("reimbursementCodeRecipe", "", ..._.orderBy(reimb, ['label.fr'], ['asc'])))
          })
          .then(() => {
              if (this.timeUnits && this.timeUnits.length) return Promise.resolve();
              return this.api.code().findCodes("be", "CD-TIMEUNIT")
                  .then(timeUnits => this.push("timeUnits", ..._.orderBy(_.filter(timeUnits, i => ["ns", "us", "ms", "s", "min"].indexOf(_.trim(_.get(i, "code"))) === -1), ['label.fr'], 'asc')))
          });
  }

  _resetAll() {
      const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
      if (!regimen) return;
      this.splice("medicationContent.medicationValue.regimen", 0, regimen.length);
  }

  _copyPosologyNote() {
      this._resetAll();
      this.set("medicationDetail.commentForPatient", this.medicationDetail.posologyNote);
  }

  _initmedicationContent(){
      this.medicationContent.medicationValue && !this.medicationContent.medicationValue.regimen ? this.set('medicationContent.medicationValue.regimen', []) : null
  }

  openList(list) {
      // ------------------if we want to create an array even when we have only one medication selected
      // list && list.length > 0 ? this.set('medications', _.clone(list)) : (list.newMedication && this.set('medications',[list])) || this.set('medications', [])
      // ----------------------------------------------------------------------------------------------
      list && list.length > 0 ? this.set('medications', _.clone(list)) : this.set('medications', [])
      if (this.medications.length) {
          this.open(this.medications[0], this.extractContentWithIdFromMedicationService(this.medications[0].newMedication, true, this.medications[0].options.isPrescription), this.medications[0].boxes);
          this.set('selectedMedication',0);
      }
  }

  _localize(s) {
      return this.api.contact().medication().localize(s, this.language);
  }

  _changeMedicPriority() {
      // console.log('_changeMedicPriority')
      if (this.medicationContent) {
          const priority = this.medicationContent.medicationValue.priority?
              this.medicationContent.medicationValue.priority=== 2 ? 'high' :
                  this.medicationContent.medicationValue.priority=== 1 ? 'middle' : 'low' :
              'low';
          this.set("medicationContent.medicationValue.priority", priority);
      }
  }

  cancel() {
      this.close()
  }

  EOLAndClose(){
      const today = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"), 10)
      this.set("medicationDetail.newMedication.endOfLife", today)
      this.save()
      this.close()
  }

  endAndClose(){
      const yesterday = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"), 10)
      this.set("medicationContent.medicationValue.endMoment", yesterday)
      this.save()
      this.close()
  }

  saveAndClose() {
      this.save() // instant save
      this.close()
  }

  close() {
      this.set("medicationContent", null)
      this.set('medications', [])
  }

  test() {
      const regs = this._register();
      console.log(regs);
  }

  // _changeReimbursementItem(item) {
  //     if(item && item.id){
  //         const reimbursementItem = this.reimbursementCodeRecipe.find(r => r.id === item.id)
  //         this.set("medicationContent.medicationValue.reimbursementReason", reimbursementItem)
  //     }
  // }
  //
  // _substitutionChanged(e) {
  //     this.set('medicationContent.medicationValue.substitutionAllowed', e.detail.value === 0);
  // }
  //
  // _substitutionAllowedChanged(e) {
  //     this.set('medicationContent.medicationValue.substitutionAllowed', e.target.checked);
  // }

  _changeRenewalTimeUnitItem(item, unitValue, decimalValue){
      if(item && item.id){
          const timeUnitItem = this.timeUnit.find(r => r.id === item.id)
          this.set("medicationContent.medicationValue.renewal", {
              decimal: decimalValue,
              duration: {
                  value: unitValue,
                  unit: timeUnitItem
              }
          })
      }
  }

  _createMedication(e){
      this.set('medicationDetail.options.createMedication', e.target.checked)
      this.set('medicationContent.createMedication', e.target.checked)
  }

  _medicationName(svc) {
      return this.api.contact().medication().medicationNameToString(this.api.contact().preferredContent(svc, this.language).medicationValue) || ''
  }
}

customElements.define(MedicationDetails.is, MedicationDetails)
