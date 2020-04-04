import '../../../styles/atc-styles.js';
import '../../../styles/dialog-style.js';
import '../../../styles/scrollbar-style.js';
import '../../../styles/shared-styles.js';
import '../../../styles/paper-input-style.js';
import '../../ht-spinner/ht-spinner.js';
import '../../icons/medication-icons.js';
import './medication-details.js';
import _ from 'lodash/lodash'
import accounting from '../../../../scripts/accounting';
import moment from 'moment/src/moment';

const STATUS_NOT_SENT = 1;
const STATUS_SENT = 2;
const STATUS_PENDING = 4;
const STATUS_DELIVERED = 8;
const STATUS_REVOKED = 16;

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class MedicationPrescriptionDialog extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles dialog-style atc-styles buttons-style vaadin-grid-scrollbar-style paper-input-style vaadin-grid-style">
            paper-input, paper-input-container {
                --paper-input-container-focus-color: var(--app-primary-color);
            }

            paper-input-container {
                margin-top: 24px;
                margin-left: 40px;
            }

            #medication-prescription {
                min-height: 480px;
                min-width: 600px;
                max-height: calc(100% - 48px - 20px);
                height: calc(98% - 12vh);
                width: 98%;
            }

            #compound-dialog {
                width: 30%;
                height: 30%;
            }

            .no-grid {
                display: none;
            }

            .no-column {
                display: none;
            }

            .column {
                margin: 2px;
            }

            div.cheap {
                color: #606060;
            }

            vaadin-combo-box {
                display: block;
                width: auto;
            }

            ht-spinner {
                position: fixed;
                top: calc(50% + 62px);
                left: 25%;
                z-index: 150;
                transform: translate(-50%, -50%);
                height: 42px;
                width: 42px;
            }

            .container {
                height: calc(100% - 45px - 45px);
                display: flex;
                flex-flow: row wrap;
                justify-content: space-around;
                align-items: flex-start;
                overflow: hidden;
            }
            .add-btn--compound {
                position: absolute;
                left: 0;
                margin-top: 55px;
            }

            .helper {
                display: block;
                width: 100%;
                height: 62px;
            }

            .list-right {
                display: inline-block;
                text-align: right;
            }

            .list-center {
                width: 100%;
                vertical-align: center;
            }

            .names-mobile-only {
                display: none;
            }

            .names-nomobile {
                display: initial;
            }

            #checkintol {
                display: flex;
                flex-direction: column;
                min-height: 640px;
                max-height: 50vh !important;
            }

            #checkintol em {
                font-weight: bold;
            }

            #checkintol div.warn {
                color: var(--app-status-color-nok);
                font-size: 1.2em;
            }

            #checkintol div.con {
                margin: 16px 0 8px 0;
            }

            #checkintol div.list {
                flex-grow: 1;
                margin: 8px 32px;
                padding: 0;
                overflow-y: auto;
                border: 1px solid var(--app-background-color-dark);
            }

            #checkintol div.list > div {
                padding: 4px 16px;
                height: 32px;
                border-bottom: 1px solid var(--app-background-color-dark);
                box-sizing: border-box;
            }

            #checkintol div.list > div:nth-child(2n-1) {
                background-color: var(--app-background-color-dark);
            }

            #checkintol div.list > div > iron-icon {
                height: 16px;
            }

            #checkintol div.endline {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin: 8px 0;
                padding: 0;
                min-height: 40px;
            }

            #checkintol div.endline span {
                line-height: 40px;
                padding: 0 24px;
            }

            @media screen and (max-width: 936px) {
                paper-dialog#medication-selection,
                #checkintol {
                    position: fixed;
                    max-width: none !important;
                    left: 0;
                    height: calc(100% - 84px) !important;
                    width: 100vw !important;
                    margin: 0;
                    transform: none;
                }

                #checkintol {
                    max-height: none !important;
                }
            }

            @media screen and (max-width: 800px) {
                .names-mobile-only {
                    display: initial;
                }

                .names-nomobile {
                    display: none;
                }
            }

            @media screen and (max-width: 640px) {
                div.container {
                    flex-flow: initial;
                    flex-direction: column;
                    width: 100vw;
                    box-sizing: border-box;
                    overflow-y: auto;
                    /*height: calc(100% - 164px);*/
                    justify-content: flex-start;
                }

                .left-pane, .right-pane {
                    width: 100%;
                    height: 33vh;
                }

                #entities-list {
                    height: auto;
                    max-height: 25vh;
                    overflow-y: auto;
                }

                .buttons {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                }
            }

            .filter-icon {
                --paper-icon-button: {
                    height: 22px;
                    width: 22px;
                    padding: 2px;
                    margin: 0px;
                    border-radius: 50%;
                };

                --toggle-icon: {
                    background: var(--app-background-color);
                    color: var(--app-primary-color-dark);
                    border-radius: 50%;
                };

                --toggle-icon-checked: {
                    background: var(--app-status-color-pending);
                    color: var(--app-primary-color-dark);
                    border-radius: 50%;
                };
            }

            .filter-button {
                height: 22px;
                min-width: 24px;
                border-radius: 10%;
                width: auto;
                padding: 12px 20px;
                background-color: var(--app-background-color);
                color: var(--app-primary-color-dark);
            }

            .filter-button[active] {
                background-color: var(--app-status-color-pending);
                color: var(--app-primary-color-dark);
            }

            .button-group {
                margin-right: 12px;
                padding: 6px;
            }

            vaadin-grid {
                width: 100%;
                border: 1px solid  var(--app-background-color-darker);
                box-sizing: border-box;
                height: 20%;
            }

            vaadin-grid.header {
                flex: 0 0 40px;
                height: 40px;
            }

            vaadin-grid.sub-list-collapse {
                visibility: collapse !important;
                flex: 0 1 0;
                height: 0;
            }

            vaadin-grid.sub-list-expanded {
                visibility: visible;
                flex: 1 1 0;
                height: 100%;
            }

            vaadin-grid.medication-list .cell {
                user-select: none;
                cursor: pointer;
            }

            vaadin-grid.medication-list {
                flex: 1 1 auto;

                --vaadin-grid-cell: {
                    padding: 8px;
                    user-select: none;
                    cursor: pointer;
                };

                --vaadin-grid-body-cell: {
                    height: 20px;
                    max-height: 20px;
                    font-size: var(--font-size-normal);
                    user-select: none;
                    cursor: pointer;
                };
            }

            vaadin-grid.material .cell {
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 0;
            }

            .align-right {
                text-align: right;
            }

            .dot {
                height: 8px;
                width: 8px;
                background-color: transparent;
                border-radius: 50%;
                display: inline-block;
                vertical-align: middle;
            }

            .table-icon {
                --iron-icon-height: 18px !important;
                --iron-icon-width: 18px !important;
                padding: 0px;
            }

            .small-table-icon {
                --iron-icon-height: 14px !important;
                --iron-icon-width: 14px !important;
                padding: 0px;
            }

            .icon-type-group {
                display: flex;
            }

            .filters-bar--small-icon.filter-selected {
                color: var(--app-secondary-color);
                background: var(--app-background-color-dark);
                border-radius: 50%;
            }

            .filters-bar--small-icon {
                height: 32px;
                width: 32px;      
            }

            paper-icon-button.list-item-icon--add {
                padding: 0;
                height: 16px;
                width: 16px;
                border-radius: 2px;
                background: var(--app-secondary-color);
                color: var(--app-text-color-light);
            }
            paper-icon-button.list-item-icon--add[disabled] {
                background: #CCCCCC;
                color: var(--app-text-color-disabled);
            }

            .quantity {
                background: var(--app-secondary-color);
                color: white;
                padding: 0 4px;
                height: 16px;
                border-radius: 2px;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;
            }

            .quantity.remove {
                justify-content: center;
            }

            .sub-header {
                position: relative;
                background: var(--app-background-color-dark);
                border-left: 1px solid var(--app-background-color-darker);
                border-right: 1px solid var(--app-background-color-darker);
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                box-sizing: border-box;
                flex: 0 0 auto;
                height: 22px;
                @apply --transition;
            }

            .sub-header:hover, .sub-header:focus {
                background: var(--app-background-color-darker);
                padding: 0 12px;
            }

            .sub-header .sub-header-title {
                flex-grow: 1;
            }

            .sub-header-title {
                display: block;
                @apply --paper-font-body2;
                @apply --padding-32;
                padding: 4px 0;
            }

            .sub-header.filter-selected iron-icon{
                transform: scaleY(-1);
            }

            .sub-header.filter-selected .filters-bar--small-icon {
                color: var(--app-secondary-color);
            }

            .search-bar {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                padding: 24px 12px 12px 12px;
            }

            #search {
                flex-grow: 2;
                margin-bottom: 8px;
                margin-right: 12px;
            }

            .search-results {
                position: relative;
                box-sizing: border-box;
                float: left;
                padding: 0;
                display: flex;
                flex-flow: column nowrap;
                justify-content: flex-start;
                align-items: stretch;
                width: 100%;
                flex-grow: 1;
                height: calc(100% - 234px);
                border: 1px solid var(--app-background-color-darker);
            }

            .search-results vaadin-grid {
                border: none;
            }

            .prescription-title {
                padding: 12px 20px;
                height: 40px;
                margin: 0;
            }

            .prescription-list {
                position: relative;
                box-sizing: border-box;
                float: left;
                padding: 24px 12px 24px 24px;
                display: flex;
                flex-flow: column nowrap;
                justify-content: flex-start;
                align-items: stretch;
                width: 100%;
                flex-grow: 1;
                height: calc(100% - 32px);
            }

            .sub-list div {
                height: 18px;
                line-height: 18px;
                font-weight:500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .price {
                text-align: right;
            }

            .CHAP4--PENDING {
                color: var(--paper-amber-a700) !important;
            }

            .CHAP4--PENDING-back::after {
                background: var(--paper-amber-a700) !important;
            }

            .CHAP4--PENDING span {
                background: var(--paper-amber-a700) !important;
            }

            .CHAP4--NOK {
                color: var(--paper-red-a200) !important;
            }

            .CHAP4--NOK-back::after {
                background: var(--paper-red-a200) !important;
            }

            .CHAP4--NOK span {
                background: var(--paper-red-a200) !important;
            }

            .CHAP4--OK {
                color: var(--paper-green-a700) !important;
            }

            .CHAP4--OK-back::after {
                background: var(--paper-green-a700) !important;
            }

            .CHAP4--OK span {
                background: var(--paper-green-a700) !important;
            }

            .CHAP4--HIDDEN {
                color: transparent !important;
            }

            .CHAP4--HIDDEN-back::after {
                background: transparent !important;
            }

            .CHAP4--HIDDEN span {
                background: transparent !important;
            }



            .DELIVERY--SENT {
                color: var(--paper-amber-a700) !important;
            }

            .DELIVERY--SENT-back::after {
                background: var(--paper-amber-a700) !important;
            }

            .DELIVERY--SENT span {
                background: var(--paper-amber-a700) !important;
            }

            .DELIVERY--PENDING {
                color: var(--paper-amber-a700) !important;
            }

            .DELIVERY--PENDING-back::after {
                background: var(--paper-amber-a700) !important;
            }

            .DELIVERY--PENDING span {
                background: var(--paper-amber-a700) !important;
            }



            .DELIVERY--NOTSENT {
                color: var(--google-blue-100) !important;
            }

            .DELIVERY--NOTSENT-back::after {
                background: var(--google-blue-100) !important;
            }

            .DELIVERY--NOTSENT span {
                background: var(--google-blue-100) !important;
            }



            .DELIVERY--DELIVERED {
                color: var(--paper-green-a700) !important;
            }

            .DELIVERY--DELIVERED-back::after {
                background: var(--paper-green-a700) !important;
            }

            .DELIVERY--DELIVERED span {
                background: var(--paper-green-a700) !important;
            }



            .DELIVERY--REVOKED {
                color: var(--paper-red-a200) !important;
            }

            .DELIVERY--REVOKED-back::after {
                background: var(--paper-red-a200) !important;
            }

            .DELIVERY--REVOKED span {
                background: var(--paper-red-a200) !important;
            }



            .DELIVERY--HIDDEN {
                color: transparent !important;
            }

            .DELIVERY--HIDDEN-back::after {
                background: transparent !important;
            }

            .DELIVERY--HIDDEN span {
                background: transparent !important;
            }

            .PRICE_INDEX--CHEAP div {
                background: var(--paper-light-green-100) !important;
            }

            .PRICE_INDEX--CHEAPEST div {
                background: var(--paper-light-green-200) !important;
            }

            .NO_ENTRY {
                color: var(--app-primary-color) !important;
                font-style: italic;
            }

            .ADR_WARNING {
                background: var(--app-secondary-color) !important;
            }

            .small {
                padding: 1px;
                height: 20px;
                width: 20px;
            }

            .colour-code span{
                content: '';
                display: inline-block;
                height: 8px;
                width: 8px;
                border-radius: 50%;
                vertical-align: middle;
                background-color: transparent;
                margin-left: 2px;
            }

            .icon-code {
                width: 12px;
                height: 12px;
                color: var(--app-primary-color-dark);
            }

            .medication-details {
                overflow-y: auto;
            }

            .right-pane {
                width: 70%;
                flex-grow: 3;
                display: flex;
                flex-direction: column;
                align-self: flex-start;
                height: 100%;
                overflow: hidden;
                transition: all .64s ease-in-out;
            }

            #search-pane {
                transform-origin: center left;
                padding: 0 24px 24px 12px;
                box-sizing: border-box;
            }

            #dosage-pane {
                transform-origin: center right;
            }

            .left-pane {
                width: 30%;
                max-width: 30%;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-self: flex-start;
                height: 100%;
            }

            .collapsed {
                flex: 0 1 0px;
                height: 100%;
                width: 0px;
                padding: 0!important;
            }

            .list-icon {
                padding: 0;
                height: 16px;
                width: 16px;
            }

            #medication-details {
                height: 100%;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .compound-control-line {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
            }

            .compound-control paper-icon-button {
                padding: 2px;
                margin-left: 4px;
            }

            .compound-control paper-icon-button {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                padding: 2px;
                box-sizing: border-box;
                --paper-icon-button-hover_-_background: var(--app-background-color-dark);
                --paper-icon-button-hover_-_box-shadow: initial;
                --paper-icon-button-hover_-_color: initial;
            }

            .compound-container {
                display: flex;
                flex-direction: column;
                align-items: stretch;
                padding: 12px;
            }

            .compound-line {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: flex-start;
                /*height: 46px;*/
            }

            .compound-line paper-input-container {
                margin: 0;
                height: auto;
                --paper-input-container-input_-_height: unset;
            }

            iron-autogrow-textarea {
                --iron-autogrow-textarea_-_padding: 4px 8px 0;
            }

            .compound-line paper-input {
                width: 100%
            }

            #busySpinner {
                background: rgba(255,255,255,.6);
                z-index:110;
            }
            ht-spinner {
                top: 50%;
                left:50%;
            }
        </style>

        <paper-dialog id="medication-prescription" always-on-top="" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title">[[_title(isPrescription)]]</h2>
            <div class="content container">
                <div id="prescription-pane" class="left-pane">
                    <div class="prescription-list">
                        <vaadin-grid class="medication-list" overflow="bottom" id="accumulated-medications" items="[[medicationAccumulator]]" active-item="{{selectedMedicationFromAccumulator}}" selected="{{selected}}">
                            <vaadin-grid-column width="80px" flex-grow="0" hidden="[[!isPrescription]]">
                                <template class="header">
                                    <div class="list-right">[[localize('qua_abr','Qté',language)]]</div>
                                </template>
                                <template>
                                    <template is="dom-if" if="[[_hasBoxes(item)]]">
                                        <div class="quantity">
                                            <paper-icon-button id="remove-[[_id(item)]]" class="list-item-icon--add" role="button" icon="icons:remove" on-tap="_removeFromAcc"></paper-icon-button>
                                            <span class="list-right">{{item.boxes}}</span>
                                            <paper-icon-button id="add-[[_id(item)]]" class="list-item-icon--add" disabled="[[!_hasBoxes(item)]]" role="button" icon="icons:add" on-tap="_addToAcc"></paper-icon-button>
                                        </div>
                                    </template>
                                    <template is="dom-if" if="[[!_hasBoxes(item)]]">
                                        <div class="quantity remove">
                                            <paper-icon-button id="remove-[[_id(item)]]" class="list-item-icon--add" role="button" icon="icons:close" on-tap="_removeFromAcc"></paper-icon-button>
                                        </div>
                                    </template>
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="32px" flex-grow="0" hidden="[[isPrescription]]">
                                <template>
                                    <div class="quantity">
                                        <paper-icon-button id="remove-[[_id(item)]]" class="list-item-icon--add" role="button" icon="icons:remove" on-tap="_removeFromAcc"></paper-icon-button>
                                    </div>
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="48px" flex-grow="0">
                                <template class="header">
                                    <div class="list-center">[[localize('type','Type',language)]]</div>
                                </template>
                                <template>
                                    <div class="list-center">
                                        <template is="dom-if" if="[[_isMedicinePackage(item)]]">
                                            <iron-icon icon="medication-svg-icons:registered" class="list-icon"></iron-icon>
                                        </template>
                                        <template is="dom-if" if="[[_isIngredient(item)]]">
                                            <iron-icon icon="vaadin:pill" class="list-icon"></iron-icon>
                                        </template>
                                        <template is="dom-if" if="[[_isCompoundPrescription(item)]]">
                                            <iron-icon icon="vaadin:flask" class="list-icon"></iron-icon>
                                        </template>
                                    </div>
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column flex-grow="1">
                                <template class="header">
                                    <div>Description</div>
                                </template>
                                <template>
                                    <div class="cell frozen">[[_serviceDescription(item.newMedication, refreshDescription)]]</div>
                                </template>
                            </vaadin-grid-column>
                        </vaadin-grid>
                    </div>
                </div>
                <div id="search-pane" class\$="right-pane [[_activePaneClass('search', trigger)]]">
                    <div class="search-bar">
                        <div class="button-group">
                            <template is="dom-if" if="[[devShow]]">
                                <paper-icon-button icon="vaadin:file-process" class="button--icon-btn small" on-tap="" id="action-medication-scheme"></paper-icon-button>
                            </template>
                            <paper-icon-button icon="medication-svg-icons:add-flask" class="button--icon-btn small" on-tap="_createCompound" id="action-create-masterly"></paper-icon-button>
                        </div>
                        <paper-input id="search" label="[[localize('sch_med','Search a medicine',language)]]" autofocus="" value="{{filterValue}}" on-keydown="refresh" always-float-label=""></paper-input>
                        <paper-icon-button icon="vaadin:alarm" class\$="filters-bar--small-icon [[_activeIconClass('chronic', trigger)]]" id="chronic" on-tap="_toggleFilter" toggles=""></paper-icon-button>
                        <paper-icon-button icon="vaadin:time-backward" class\$="filters-bar--small-icon [[_activeIconClass('history', trigger)]]" id="history" on-tap="_toggleFilter" toggles=""></paper-icon-button>
                        <paper-icon-button icon="medication-svg-icons:registered" class\$="filters-bar--small-icon [[_activeIconClass('medicine-package', trigger)]]" id="medicine-package" on-tap="_toggleFilter" toggles=""></paper-icon-button>
                        <paper-icon-button icon="vaadin:pill" class\$="filters-bar--small-icon [[_activeIconClass('ingredient', trigger)]]" id="ingredient" on-tap="_toggleFilter" toggles=""></paper-icon-button>
                        <paper-icon-button icon="vaadin:flask" class\$="filters-bar--small-icon [[_activeIconClass('compound', trigger)]]" id="compound" on-tap="_toggleFilter" toggles=""></paper-icon-button>
                    </div>
                    <div class="search-results">
                        <vaadin-grid id="header" class="header">
                            <vaadin-grid-column width="40px" flex-grow="0"></vaadin-grid-column>
                            <vaadin-grid-column width="40px" flex-grow="0"></vaadin-grid-column>
                            <vaadin-grid-column flex-grow="1">
                                <template class="header">Nom Posologie</template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template class="header">ATC</template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="54px" flex-grow="0">
                                <template class="header">Type</template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template class="header">IV</template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template class="header">Del</template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template class="header">Cat</template>
                            </vaadin-grid-column>
                            <vaadin-grid-column flex-grow="0">
                                <template class="header"><div class="align-right">Patient</div></template>
                            </vaadin-grid-column>
                            <vaadin-grid-column flex-grow="0">
                                <template class="header"><div class="align-right">Public</div></template>
                            </vaadin-grid-column>
                            <vaadin-grid-column flex-grow="0">
                                <template class="header">Début</template>
                            </vaadin-grid-column>
                            <vaadin-grid-column flex-grow="0">
                                <template class="header">Fin</template>
                            </vaadin-grid-column>
                        </vaadin-grid>

                        <div class\$="sub-header [[_activeIconClass('chronic', trigger)]]" id="chronic" on-tap="_toggleFilter">
                            <paper-icon-button icon="vaadin:alarm" class="filters-bar--small-icon"></paper-icon-button>
                            <span class="sub-header-title">[[localize('chronic','Chronique',language)]]</span>
                            <iron-icon icon="hardware:keyboard-arrow-down"></iron-icon>
                        </div>

                        <vaadin-grid id="chronic-list" class\$="sub-list [[_activeListClass('chronic', trigger)]]" active-item="{{chronic}}">

                            <!-- ADD-->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <paper-icon-button id="[[item.id]]" class="list-item-icon--add" icon="icons:add" on-tap="_addChronic"></paper-icon-button>
                                </template>
                            </vaadin-grid-column>

                            <!-- MASTERLY / TEMPLATE-->

<!--                            <vaadin-grid-column width="40px" flex-grow="0">-->
<!--                                <template>-->
<!--                                    <template is="dom-if" if="[[_isMasterly(item.preparation)]]">-->
<!--                                        <iron-icon icon="medication:masterly"></iron-icon>-->
<!--                                    </template>-->
<!--                                    <template is="dom-if" if="[[_isTemplate(item.preparation)]]">-->
<!--                                        <iron-icon icon="medication:template"></iron-icon>-->
<!--                                    </template>-->
<!--                                </template>-->
<!--                            </vaadin-grid-column>-->

                            <!-- NAME / DOSAGE-->

                            <vaadin-grid-column flex-grow="1">
                                <template>
                                    <div><template is="dom-if" if="[[item.compoundTitle]]">[[item.compoundTitle]]: </template>[[item.intendedName]]</div>
                                    <template is="dom-if" if="[[item.posology]]">
                                        <div>[[item.posology]]</div>
                                    </template>
                                </template>
                            </vaadin-grid-column>

                            <!-- ATC CLASS -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('ATC', item.atcCat)]]" id="[[item.atcCat]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.atcCat]]_[[item.id]]" for="[[item.atcCat]]_[[item.id]]">[[_atcTooltip(item.atcCat)]]
                                    </paper-tooltip>
                                </template>

                            </vaadin-grid-column>

                            <!-- TYPE -->

                            <vaadin-grid-column width="54px" flex-grow="0">
                                <template>
                                    <div class="icon-type-group">
                                        <iron-icon icon="medication-svg-icons:[[item.compProhibIcon]]" class="table-icon"></iron-icon>
                                        <iron-icon icon="medication-svg-icons:[[item.narcoticIcon]]" class="table-icon"></iron-icon>
                                        <iron-icon icon="medication-svg-icons:[[item.reinfPharmaVigiIcon]]" class="table-icon"></iron-icon>
                                    </div>
                                </template>
                            </vaadin-grid-column>

                            <!-- CHAP IV -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('CHAP4', item.chap4Status)]]" id="[[item.chap4Status]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.chap4Status]]_[[item.id]]" for="[[item.chap4Status]]_[[item.id]]">
                                        [[_chap4Tooltip(item.chap4Status)]]
                                    </paper-tooltip>
                                </template>
                            </vaadin-grid-column>

                            <!-- DELIVERED -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('DELIVERY', item.deliveryStatus)]]" id="[[item.deliveryStatus]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.deliveryStatus]]_[[item.id]]" for="[[item.deliveryStatus]]_[[item.id]]">
                                        [[_deliveryTooltip(item.deliveryStatus)]]
                                    </paper-tooltip>
                                </template>
                            </vaadin-grid-column>

                            <!-- CATEGORY -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <iron-icon icon="medication-svg-icons:[[item.catIcon]]" class="table-icon"></iron-icon>
                                </template>
                            </vaadin-grid-column>

                            <!-- PRICE -->


                            <!-- PRICE: PAT -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div class="price">[[item.patientPrice]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- PRICE: PUBLIC -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div class="price">[[item.publicPrice]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- DURATION -->


                            <!-- DURATION: START -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div>[[item.startDate]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- DURATION: END -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div>[[item.endDate]]</div>
                                </template>
                            </vaadin-grid-column>

                        </vaadin-grid>

                        <div class\$="sub-header [[_activeIconClass('history', trigger)]]" id="history" on-tap="_toggleFilter">
                            <paper-icon-button icon="vaadin:time-backward" class="filters-bar--small-icon"></paper-icon-button>
                            <span class="sub-header-title">[[localize('his','Historique',language)]]</span>
                            <iron-icon icon="hardware:keyboard-arrow-down"></iron-icon>
                        </div>

                        <vaadin-grid id="history-list" class\$="sub-list [[_activeListClass('history', trigger)]]" active-item="{{history}}">

                            <!-- ADD-->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <paper-icon-button id="[[item.id]]" class="list-item-icon--add" icon="icons:add" on-tap="_addFromHistory"></paper-icon-button>
                                </template>
                            </vaadin-grid-column>

                            <!-- MASTERLY / TEMPLATE-->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <template is="dom-if" if="[[_isMedication(item)]]">
                                        <iron-icon icon="vaadin:alarm" class="table-icon"></iron-icon>
                                    </template>
                                    <template is="dom-if" if="[[_isPrescription(item)]]">
                                        <iron-icon icon="vaadin:barcode" class="table-icon"></iron-icon>
                                    </template>
                                </template>
                            </vaadin-grid-column>

                            <!-- NAME / DOSAGE-->

                            <vaadin-grid-column flex-grow="1">
                                <template>
                                    <div><template is="dom-if" if="[[item.compoundTitle]]">[[item.compoundTitle]]: </template>[[item.intendedName]]</div>
                                    <template is="dom-if" if="[[item.posology]]">
                                        <div>[[item.posology]]</div>
                                    </template>
                                </template>
                            </vaadin-grid-column>

                            <!-- ATC CLASS -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('ATC', item.atcCat)]]" id="[[item.atcCat]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip id="tt_[[item.atcCat]]_[[item.id]]" for="[[item.atcCat]]_[[item.id]]">[[_atcTooltip(item.atcCat)]]
                                    </paper-tooltip>
                                </template>

                            </vaadin-grid-column>

                            <!-- TYPE -->

                            <vaadin-grid-column width="54px" flex-grow="0">
                                <template>
                                    <div class="icon-type-group">
                                        <iron-icon icon="medication-svg-icons:[[item.compProhibIcon]]" class="table-icon"></iron-icon>
                                        <iron-icon icon="medication-svg-icons:[[item.narcoticIcon]]" class="table-icon"></iron-icon>
                                        <iron-icon icon="medication-svg-icons:[[item.reinfPharmaVigiIcon]]" class="table-icon"></iron-icon>
                                    </div>
                                </template>
                            </vaadin-grid-column>

                            <!-- CHAP IV -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('CHAP4', item.chap4Status)]]" id="[[item.chap4Status]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.chap4Status]]_[[item.id]]" for="[[item.chap4Status]]_[[item.id]]">
                                        [[_chap4Tooltip(item.chap4Status)]]
                                    </paper-tooltip>
                                </template>
                            </vaadin-grid-column>

                            <!-- DELIVERED -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('DELIVERY', item.deliveryStatus)]]" id="[[item.deliveryStatus]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.deliveryStatus]]_[[item.id]]" for="[[item.deliveryStatus]]_[[item.id]]">
                                        [[_deliveryTooltip(item.deliveryStatus)]]
                                    </paper-tooltip>
                                </template>
                            </vaadin-grid-column>

                            <!-- CATEGORY -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <iron-icon icon="medication-svg-icons:[[item.catIcon]]" class="table-icon"></iron-icon>
                                </template>
                            </vaadin-grid-column>

                            <!-- PRICE -->


                            <!-- PRICE: PAT -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div class="price">[[item.patientPrice]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- PRICE: PUBLIC -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div class="price">[[item.publicPrice]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- DURATION -->


                            <!-- DURATION: START -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div>[[item.startDate]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- DURATION: END -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div>[[item.endDate]]</div>
                                </template>
                            </vaadin-grid-column>

                        </vaadin-grid>

                        <div class\$="sub-header [[_activeIconClass('medicine-package', trigger)]]" id="medicine-package" on-tap="_toggleFilter">
                            <paper-icon-button icon="medication-svg-icons:registered" class="filters-bar--small-icon"></paper-icon-button>
                            <span class="sub-header-title">[[localize('commercial_name','Nom commercial',language)]]</span>
                            <iron-icon icon="hardware:keyboard-arrow-down"></iron-icon>
                        </div>

                        <vaadin-grid id="medicine-package-list" class\$="sub-list [[_activeListClass('medicine-package', trigger)]]" active-item="{{medicinalProduct}}">

                            <!-- ADD-->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <template is="dom-if" if="[[item.id]]">
                                        <paper-icon-button id="[[item.id]]" data-item\$="[[item]]" class="list-item-icon--add" icon="icons:add" on-tap="_addMedicine"></paper-icon-button>
                                    </template>
                                </template>
                            </vaadin-grid-column>

                            <!-- MASTERLY / TEMPLATE-->

<!--                            <vaadin-grid-column width="40px" flex-grow="0">-->
<!--                                <template>-->
<!--                                    <template is="dom-if" if="[[_isMasterly(item.preparation)]]">-->
<!--                                        <iron-icon icon="medication:masterly"></iron-icon>-->
<!--                                    </template>-->
<!--                                    <template is="dom-if" if="[[_isTemplate(item.preparation)]]">-->
<!--                                        <iron-icon icon="medication:template"></iron-icon>-->
<!--                                    </template>-->
<!--                                </template>-->
<!--                            </vaadin-grid-column>-->

                            <!-- NAME / DOSAGE-->

                            <vaadin-grid-column flex-grow="1">
                                <template>
                                    <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" level="[[level]]">
                                        <div class\$="[[_getNoEntryStyle(item.id)]]">[[item.intendedName]]</div>
                                    </vaadin-grid-tree-toggle>
                                </template>
                            </vaadin-grid-column>

                            <!-- ATC CLASS -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <template is="dom-if" if="[[_hasIcon(item)]]">
                                        <iron-icon class\$="icon-code [[_getStyle('ATC', item.atcCat)]]" icon="[[_getIcon(item)]]"></iron-icon>
                                    </template>
                                    <template is="dom-if" if="[[_hasColor(item)]]">
                                        <label class\$="colour-code [[_getStyle('ATC', item.atcCat, 'span')]]"><span></span></label>
                                    </template>
<!--                                    <div class\$="[[_getStyle('ATC', item.atcCat)]]" id="[[item.atcCat]]_[[item.id]]">-->
<!--                                        <span class="dot"></span>-->
<!--                                    </div>-->
<!--                                    <paper-tooltip z-index="1000" id="tt_[[item.atcCat]]_[[item.id]]"-->
<!--                                                   for="[[item.atcCat]]_[[item.id]]">[[_atcTooltip(item.atcCat)]]-->
<!--                                    </paper-tooltip>-->
                                </template>

                            </vaadin-grid-column>

                            <!-- TYPE -->

                            <vaadin-grid-column width="54px" flex-grow="0">
                                <template>
                                    <div class="icon-type-group">
                                        <iron-icon icon="medication-svg-icons:[[item.compProhibIcon]]" class="table-icon"></iron-icon>
                                        <iron-icon icon="medication-svg-icons:[[item.narcoticIcon]]" class="table-icon"></iron-icon>
                                        <iron-icon icon="medication-svg-icons:[[item.reinfPharmaVigiIcon]]" class="table-icon"></iron-icon>
                                    </div>
                                </template>
                            </vaadin-grid-column>

                            <!-- CHAP IV -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('CHAP4', item.chap4Status)]]" id="[[item.chap4Status]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.chap4Status]]_[[item.id]]" for="[[item.chap4Status]]_[[item.id]]">
                                        [[_chap4Tooltip(item.chap4Status)]]
                                    </paper-tooltip>
                                </template>
                            </vaadin-grid-column>

                            <!-- DELIVERED -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('DELIVERY', item.deliveryStatus)]]" id="[[item.deliveryStatus]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.deliveryStatus]]_[[item.id]]" for="[[item.deliveryStatus]]_[[item.id]]">
                                        [[_deliveryTooltip(item.deliveryStatus)]]
                                    </paper-tooltip>
                                </template>
                            </vaadin-grid-column>

                            <!-- CATEGORY -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <iron-icon icon="medication-svg-icons:[[item.catIcon]]" class="table-icon"></iron-icon>
                                </template>
                            </vaadin-grid-column>

                            <!-- PRICE -->


                            <!-- PRICE: PAT -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div class\$="[[_getPriceIndexStyle(item.priceIndex)]]" id="[[item.priceIndex]]_[[item.id]]">
                                        <div class="price">[[item.patientPrice]]</div>
                                    </div>
                                </template>
                            </vaadin-grid-column>

                            <!-- PRICE: PUBLIC -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div class="price">[[item.publicPrice]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- DURATION -->


                            <!-- DURATION: START -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div>[[item.startDate]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- DURATION: END -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div>[[item.endDate]]</div>
                                </template>
                            </vaadin-grid-column>

                        </vaadin-grid>

                        <div class\$="sub-header [[_activeIconClass('ingredient', trigger)]]" id="ingredient" on-tap="_toggleFilter" toggles="">
                            <paper-icon-button icon="vaadin:pill" class="filters-bar--small-icon"></paper-icon-button>
                            <span class="sub-header-title">[[localize('mol','Molécule',language)]]</span>
                            <iron-icon icon="hardware:keyboard-arrow-down"></iron-icon>
                        </div>

                        <vaadin-grid id="ingredient-list" class\$="sub-list [[_activeListClass('ingredient', trigger)]]" active-item="{{ingredient}}">

                            <!-- ADD-->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <paper-icon-button id="[[item.id]]" data-item\$="[[item]]" class="list-item-icon--add" icon="icons:add" on-tap="_addIngredient"></paper-icon-button>
                                </template>
                            </vaadin-grid-column>

                            <!-- MASTERLY / TEMPLATE-->

<!--                            <vaadin-grid-column width="40px" flex-grow="0">-->
<!--                                <template>-->
<!--                                    <template is="dom-if" if="[[_isMasterly(item.preparation)]]">-->
<!--                                        <iron-icon icon="medication:masterly"></iron-icon>-->
<!--                                    </template>-->
<!--                                    <template is="dom-if" if="[[_isTemplate(item.preparation)]]">-->
<!--                                        <iron-icon icon="medication:template"></iron-icon>-->
<!--                                    </template>-->
<!--                                </template>-->
<!--                            </vaadin-grid-column>-->

                            <!-- NAME / DOSAGE-->

                            <vaadin-grid-column flex-grow="1">
                                <template>
                                    <div>[[item.intendedName]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- ATC CLASS -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <template is="dom-if" if="[[_hasIcon(item)]]">
                                        <iron-icon class\$="icon-code [[_getStyle('ATC', item.atcCat)]]" icon="[[_getIcon(item)]]"></iron-icon>
                                    </template>
                                    <template is="dom-if" if="[[_hasColor(item)]]">
                                        <label class\$="colour-code [[_getStyle('ATC', item.atcCat, 'span')]]"><span></span></label>
                                    </template>
                                </template>
<!--                                <template>-->
<!--                                    <div class\$="[[_getStyle('ATC', item.atcCat)]]" id="[[item.atcCat]]_[[item.id]]">-->
<!--                                        <span class="dot"></span>-->
<!--                                    </div>-->
<!--                                    <paper-tooltip z-index="1000" id="tt_[[item.atcCat]]_[[item.id]]"-->
<!--                                                   for="[[item.atcCat]]_[[item.id]]">[[_atcTooltip(item.atcCat)]]-->
<!--                                    </paper-tooltip>-->
<!--                                </template>-->

                            </vaadin-grid-column>

                            <!-- TYPE -->

                            <vaadin-grid-column width="54px" flex-grow="0">
                                <template>
                                    <div class="icon-type-group">
                                        <iron-icon icon="medication-svg-icons:[[item.compProhibIcon]]" class="table-icon"></iron-icon>
                                        <iron-icon icon="medication-svg-icons:[[item.narcoticIcon]]" class="table-icon"></iron-icon>
                                        <iron-icon icon="medication-svg-icons:[[item.reinfPharmaVigiIcon]]" class="table-icon"></iron-icon>
                                    </div>
                                </template>
                            </vaadin-grid-column>

                            <!-- CHAP IV -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('CHAP4', item.chap4Status)]]" id="[[item.chap4Status]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.chap4Status]]_[[item.id]]" for="[[item.chap4Status]]_[[item.id]]">
                                        [[_chap4Tooltip(item.chap4Status)]]
                                    </paper-tooltip>
                                </template>
                            </vaadin-grid-column>

                            <!-- DELIVERED -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <div class\$="[[_getStyle('DELIVERY', item.deliveryStatus)]]" id="[[item.deliveryStatus]]_[[item.id]]">
                                        <span class="dot"></span>
                                    </div>
                                    <paper-tooltip z-index="1000" id="tt_[[item.deliveryStatus]]_[[item.id]]" for="[[item.deliveryStatus]]_[[item.id]]">
                                        [[_deliveryTooltip(item.deliveryStatus)]]
                                    </paper-tooltip>
                                </template>
                            </vaadin-grid-column>

                            <!-- CATEGORY -->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <iron-icon icon="medication-svg-icons:[[item.catIcon]]" class="table-icon"></iron-icon>
                                </template>
                            </vaadin-grid-column>

                            <!-- PRICE -->


                            <!-- PRICE: PAT -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div class="price">[[item.patientPrice]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- PRICE: PUBLIC -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div class="price">[[item.publicPrice]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- DURATION -->


                            <!-- DURATION: START -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div>[[item.startDate]]</div>
                                </template>
                            </vaadin-grid-column>

                            <!-- DURATION: END -->

                            <vaadin-grid-column flex-grow="0">
                                <template>
                                    <div>[[item.endDate]]</div>
                                </template>
                            </vaadin-grid-column>

                        </vaadin-grid>

                        <div class\$="sub-header [[_activeIconClass('compound', trigger)]]" id="compound" on-tap="_toggleFilter" toggles="">
                            <paper-icon-button icon="vaadin:flask" class="filters-bar--small-icon"></paper-icon-button>
                            <span class="sub-header-title">[[localize('compound','Magistrale',language)]]</span>
                            <iron-icon icon="hardware:keyboard-arrow-down"></iron-icon>
                        </div>

<!--                        <vaadin-grid id="compound-list" class\$="sub-list [[_activeListClass('compound', trigger)]]" active-item="{{selectedCompound}}">-->
                        <vaadin-grid id="compound-list" class\$="sub-list [[_activeListClass('compound', trigger)]]">

                            <!-- ADD-->

                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <paper-icon-button id="[[item.id]]" class="list-item-icon--add" icon="icons:add" on-tap="_addCompound"></paper-icon-button>
                                </template>
                            </vaadin-grid-column>

                            <!-- NAME / DOSAGE-->

                            <vaadin-grid-column flex-grow="1">
                                <template>
                                    <div>[[item.compoundTitle]]</div>
                                    <div>[[item.intendedName]]</div>
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="40px" flex-grow="0">
                                <template>
                                    <template is="dom-if" if="[[_isMine(item)]]">
                                        <iron-icon class="table-icon small" icon="social:person"></iron-icon>
                                    </template>
                                    <template is="dom-if" if="[[!_isMine(item)]]">
                                        <iron-icon class="table-icon small" icon="social:group"></iron-icon>
                                    </template>
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="80px" flex-grow="0">
                                <template>
                                    <div class="compound-control-line">
                                        <div class="compound-control">
                                            <paper-icon-button id="[[item.id]]" icon="create" on-tap="_editCompound"></paper-icon-button>
                                        </div>
                                        <div class="compound-control">
                                            <paper-icon-button id="[[item.id]]" icon="clear" on-tap="_deleteCompound" disabled="[[!_isMine(item)]]"></paper-icon-button>
                                        </div>
                                    </div>
                                </template>
                            </vaadin-grid-column>

                        </vaadin-grid>
                    </div>
                </div>
                <div id="dosage-pane" class\$="right-pane [[_activePaneClass('dosage', trigger)]]">
                    <medication-details id="medication-details" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" medication="[[selectedMedicationFromAccumulator]]" on-close="_showSearchPane" on-edit-compound="_editCompound" on-spinner-busy="_setSpinnerBusy" on-spinner-idle="_setSpinnerIdle" closable="">
                    </medication-details>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button" dialog-dismiss="" on-tap="skip">[[localize('clo','Fermer',language)]]</paper-button>
                <template is="dom-if" if="[[!_isSearching(trigger)]]">
                    <paper-button class="button button--other" on-tap="_showSearchPane">[[localize('val-poso','Validate posology',language)]]</paper-button>
                </template>
                <paper-button class="button button--save" dialog-confirm="" autofocus="" on-tap="saveMedications" disabled="[[!medicationAccumulator.length]]">[[_saveButtonName(isPrescription)]]</paper-button>
                <!--                <paper-button class="button button&#45;&#45;save" dialog-confirm autofocus on-tap="saveMedications"-->
                <!--                              disabled="[[!medicationAccumulator.length]]">[[localize('valid','Validate',language)]]-->
                <!--                </paper-button>-->
            </div>
        </paper-dialog>
        <paper-dialog id="compound-dialog" always-on-top="" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title">[[localize('compound', 'Magistrale', language)]]</h2>
            <div class="content compound-container">
                <div class="compound-line">
                    <paper-input always-float-label="" label="[[localize('compound_name','Nom de la préparation',language)]]" value="{{selectedCompound.title}}"></paper-input>
                </div>
                <div class="compound-line">
                    <paper-input-container always-float-label="true">
                        <label slot="label" class="color-status">[[localize('formula','Formule',language)]]</label>
                        <iron-autogrow-textarea slot="input" value="{{selectedCompound.formula}}" rows="3"></iron-autogrow-textarea>
                    </paper-input-container>
                </div>
                <template is="dom-if" if="[[selectedCompound.fromPrescription]]">
                    <div class="compound-line">
                        <vaadin-checkbox checked="{{selectedCompound.fromPrescription.update}}" id="updateCompound">
                            [[localize('updated_compound', 'Mettre à jour la magistrale', language)]]
                        </vaadin-checkbox>
                    </div>
                </template>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" dialog-dismiss="" on-tap="_closeCompound">[[localize('can','Annuler',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_saveCompound" disabled="[[!_canSaveCompound(selectedCompound.*)]]">[[localize('save', 'Enregistrer', language)]]</paper-button>
            </div>
        </paper-dialog>
        <template is="dom-if" if="[[busySpinner]]">
            <div id="busySpinner">
                <ht-spinner class="spinner" active="">
                </ht-spinner>
            </div>
        </template>
`;
  }

  static get is() {
      return 'medication-prescription-dialog'
  }

  static get properties() {
      return {
          devShow: {
              type: Boolean,
              value: false
          },
          api: {
              type: Object
          },
          patientBim: {
              type: Boolean,
              value: false
          },
          medicationType: {
              type: String,
              value: 'medicinalProduct'
          },
          // compoundText: {
          //     type: String,
          //     value: ""
          // },
          // compoundName: {
          //     type: String,
          //     value: ""
          // },
          columnsDefinition: {
              type: Object,
              value: function () {
                  return {
                      substanceProduct: [{key: 'name', title: 'Name', size: '400px'}],
                      medicinalProduct: [{key: 'name', title: 'Name', size: '400px'}, {
                          key: 'pricepatstd',
                          title: 'Price pat.'
                      }, {key: 'pubprice', title: 'Price'}]
                  };
              }
          },
          selectedMedicationFromList: {
              type: Object,
              value: null,
              observer: "_selectedMedicationFromListChanged"
          },
          selectedChronicalMedicationFromList: {
              type: Object,
              value: null
          },
          newMedication: {
              type: Object,
              value: null
          },
          medications: {
              type: Array,
              value: () => []
          },
          treatmentHistory: {
              type: Array,
              value: () => []
          },
          compounds: {
              type: Array,
              value: () => []
          },
          medicationAccumulator: {
              type: Array,
              value: []
          },
          compoundListItems: {
              type: Array,
              value: () => []
          },
          selectedCompound: {
              type: Object,
              value: () => ({
                  medicationValue: null
              })
          },
          isPrescription: {
              type: Boolean,
              value: false
          },
          searchOnIngredients: {
              type: Boolean,
              value: false,
              observer: "_searchOnIngredientsChanged"
          },
          ingredients: {
              type: Array,
              value: () => []
          },
          medicinalProducts: {
              type: Array,
              value: () => []
          },
          medicinalProduct: {
              type: Object,
              value: null
          },
          ingredient: {
              type: Object,
              value: null
          },
          chronic: {
              type: Object,
              value: null
          },
          history: {
              type: Object,
              value: null
          },
          masterly: {
              type: Object,
              value: null
          },
          filterValue: {
              type: String,
              value: ""
          },
          filters: {
              type: Object,
              // notify: true,
              value: []
          },
          filterNone: {
              type: Object,
              notify: true,
              value: null
          },
          allDisabled: {
              type: Boolean,
              value: true
          },
          iconsMapping: {
              type: Object,
              value: () => ({
                  allergy: "image:filter-vintage",
                  adr: "vaadin:pill"
              })
          },
          panes: {
              type: Object,
              value: []
          },
          selectedMedicationContentWithId: {
              type: Object,
              value: null,
          },
          selectedMedicationFromAccumulator: {
              type: Object,
              value: null
          },
          medication: {
              type: Object,
              value: null
          },
          searchList: {
              type: Array,
              value: []
          },
          trigger: {
              type: String,
              notify: true,
              value: ''
          },
          allergies: {
              type: Array,
              value: () => []
          },
          isUpdating: {
              type: Boolean,
              value: false
          },
          isMedicationDetailOpened:{
              type: Boolean,
              value: false
          },
          busySpinner: {
              type: Boolean,
              value: false
          },
          busySpinnerCounter: {
              type: Number,
              value: 0
          },
          refreshDescription: {
              type: String,
              value: ""
          }
      }
  }

  static get observers() {
      return [
          '_medicationChanged(selectedMedicationFromAccumulator)'
      ];
  }

  constructor() {
      super()
  }

  _isHistory(item) {
      return item && item.type && item.type === "";
  }

  _isPrescription(item) {
      return item && item.type && item.type === "";
  }

  _isMine(item) {
      return item.userId === this.user.id;
  }

  _reloadCompounds() {
      let grid = this.$['compound-list'];
      if (grid && grid.drugsCache) {
          grid.drugsCache = null;
          grid.drugsCacheUpperSearchIndex = 0;
          grid.clearCache();
      }
  }

  _createCompound() {
      this.set("selectedCompound", {});
      this.$["compound-dialog"].open();
  }

  _editCompound(e) {
      const item = _.get(e, "detail.item","");
      if (item) {
          this.set("selectedCompound", item);
      } else {
          const grid = this.$["compound-list"];
          if (!grid || !grid.drugsCache) return;
          const compound = _.cloneDeep(grid.drugsCache.find(entityTemplate => entityTemplate.id === _.get(e, "target.id", "")));
          this.set("selectedCompound", {
              title: compound.compoundTitle,
              formula: compound.intendedName
          });
      }
      this.$["compound-dialog"].open();
  }

  _cleanCompoundField(field) {
      return field && field.replace(/(?:\r\n|\r|\n)/g, '\n').replace(/\s{2,}/g,' ').trim() || "";
  }

  _cleanCompound(compound) {
      const fields = ["title", "formula"];
      Object.entries(compound).forEach(pair => fields.includes(pair[0]) && (compound[pair[0]] = this._cleanCompoundField(pair[1])));
  }

  _saveCompound() {
      const compound = this.selectedCompound;
      if (!compound) return;
      this._cleanCompound(compound);
      if (compound.fromPrescription) {
          compound.fromPrescription.onChange && compound.fromPrescription.onChange(compound);
          this.set("refreshDescription", compound.formula);
          if (!compound.fromPrescription.update) {
              this.$["compound-dialog"].close();
              return;
          }
      }
      this.set("busySpinner", true);

      this.api.entitytemplate().findEntityTemplates(this.user.id, "org.taktik.icure.entities.embed.Medication", compound.title, true)
          .then(results => {
              let result = results.find(result => result.descr === compound.title);
              if (result) {
                  result.entity.forEach(item => item.compoundPrescription && (item.compoundPrescription = compound.formula));
                  return this.api.entitytemplate().modifyEntityTemplate(result);
              } else {
                  result = {
                      userId: this.user.id,
                      descr: compound.title,
                      subType: "topaz-magistral",
                      entityType: "org.taktik.icure.entities.embed.Medication",
                      entity: [{compoundPrescription: compound.formula}]
                  };
                  return this.api.entitytemplate().createEntityTemplate(result);
              }
          })
          .then(() => this._reloadCompounds())
          .finally(() => {
              this.set("busySpinner", false);
              this.$["compound-dialog"].close();
      });
  }

  _deleteCompound(e) {
      const id = e.target.id;
      if (!id) return;
      this.set("busySpinner", true);
      this.api.entitytemplate().getEntityTemplate(id)
          .then(result => {
              result.deletionDate = parseInt(moment().format("x")) ;
              return this.api.entitytemplate().modifyEntityTemplate(result);
          })
          .then(() => this._reloadCompounds())
          .finally(() => this.set("busySpinner", false));
  }

  _canSaveCompound() {
      return (this.selectedCompound && this.selectedCompound.title && this.selectedCompound.formula);
  }

  _saveButtonName() {
      return this.isPrescription ? this.localize("pre", "Prescrire") : this.localize("create_med", "Créer une médication chronique");
  }

  _hasBoxes(item) {
      return item && item.drugType && item.drugType === "CD-DRUG-CNK";
  }

  _title() {
      return this.isPrescription ? this.localize("prescription", "Prescription"):this.localize("medication", "Médication");
  }

  _medicationChanged() {
      const list = this.$["accumulated-medications"];
      const previous = list.selectedItems;
      if (previous && previous.length) {
          previous.forEach(p => list.deselectItem(p));
      }

      const selected = this.selectedMedicationFromAccumulator;
      if (selected) {
          this.$["accumulated-medications"].selectItem(selected);
          this._showPane('dosage');
      }
  }

  _selectLastMedication() {
      const acc = _.last(this.medicationAccumulator);
      this._selectMedication(acc);
  }

  _selectMedication(med) {
      if (!this.medicationAccumulator || !this.medicationAccumulator.length || !this.medicationAccumulator.includes(med)) return;
      this.set("selectedMedicationFromAccumulator", med);
  }

  _isMedicinalProduct(medicationType) {
      return !_.trim(medicationType) || _.trim(medicationType) === "medicinalProduct"
  }

  _searchOnIngredientsChanged() {
      let grid = this.$['ingredient-list'];
      // Force bypass cache, we just checked / unchecked ingredient box
      if (grid && grid.drugsCache) {
          grid.drugsCache = null;
          grid.drugsCacheUpperSearchIndex = 0;
          grid.clearCache();
      }
  }

  _updateAccumulatorSelection(idx) {
      if (this.isUpdating) return;
      this.set("isUpdating", true);
      try {
          if (idx < 0 || idx > this.medicationAccumulator.length - 1) return;
          if (!this.medicationAccumulator[idx]) return;
          const boxes = parseInt(this.medicationAccumulator[idx].boxes, 10);
          if (isNaN(boxes)) return;
          if (boxes < 1) {
              if (this.medicationAccumulator[idx] === this.selectedMedicationFromAccumulator) {
                  if (this.medicationAccumulator.length > idx + 1) {
                      this._selectMedication(this.medicationAccumulator[idx + 1]);
                  } else if (idx > 0) {
                      this._selectMedication(this.medicationAccumulator[idx - 1]);
                  } else {
                      this.set("selectedMedicationFromAccumulator", null);
                      this._showSearchPane();
                  }
              } else if (this.medicationAccumulator.length === 1) {
                  this._showSearchPane();
              }
              this.splice('medicationAccumulator', idx, 1)
          } else {
              this.notifyPath(`medicationAccumulator.${idx}`);
              if (this.selectedMedicationFromAccumulator && this.selectedMedicationFromAccumulator.id === this.medicationAccumulator[idx].id) {
                  this.notifyPath("selectedMedicationFromAccumulator.boxes");
              }
          }
      } finally {
          this.set("isUpdating", false);
      }
  }

  _removeFromAcc(e) {
      if(!_.hasIn(e, "target.id")) return;
      const idx = _.findIndex(this.medicationAccumulator, d => `remove-${this._id(d)}` === e.target.id)
      if (idx < 0) return;
      this.medicationAccumulator[idx].boxes = (this.medicationAccumulator[idx].boxes || 1) - 1;
      this._updateAccumulatorSelection(idx);
  }

  _addToAcc(e) {
      if(!_.hasIn(e, "target.id")) return;
      const idx = _.findIndex(this.medicationAccumulator, d => `add-${this._id(d)}` === e.target.id)
      if (idx < 0) return;
      this.medicationAccumulator[idx].boxes = (this.medicationAccumulator[idx].boxes || 1) + 1;
      this._updateAccumulatorSelection(idx);
  }

  open(medication, options = {}) {
      // @todo: spinner
      this.api.helement().findBy(this.user.healthcarePartyId, this.patient)
          .then(hes => {
              const allergies = hes.filter(he => he.tags.some(tag => tag.type === "CD-ITEM" && (tag.code === "allergy" || tag.code === "adr")))
                  .map(he => {
                      const atcCode = he.codes.find(code => code.type === "CD-ATC");
                      return {
                          atcCode: atcCode && atcCode.code || "",
                          cnk: (he.codes.find(code => code.type === "CD-DRUG-CNK") || {code: ""}).code,
                          type: (he.tags.find(tag => tag.code === "allergy" || tag.code === "adr") || {code: ""}).code,
                          descr: he.descr
                      }
                  })
                  .filter(allergy => allergy.atcCode && allergy.type);
              this.set("allergies", allergies);
          })
          .then(() => this.$["medication-details"].init())
          .catch(err => console.log(err))
          .finally(() => {
              this.set('newMedication', medication || {content: {}, codes: []});
              this.set('medicationAccumulator', []);

              this.set('isPrescription', options.isPrescription);

              this.set('compoundFilterString', '');
              this.set('compound', '');
              this.set('compoundPrescriptionText', '');

              this.$['medication-prescription'].open();

              const insurability = ((this.patient || {}).insurabilities || []).find(a => !a.endDate && a.insuranceId && a.insuranceId !== "") || null;
              if (insurability && insurability.parameters) {
                  this.set('patientBim', (parseInt(insurability.parameters.tc1) % 2) === 1);
              }

              // this.set('medications', _.orderBy(this.medications, ['atcCat'], ['asc']))

              this._initList('chronic-list', this._servicesSearch.bind(this, this.medications, "medication"), '_servicesSearch_medications', this._serviceAdapter.bind(this), 500);
              this._initList('history-list', this._servicesSearch.bind(this, this.treatmentHistory, "history"), '_servicesSearch_history', this._serviceAdapter.bind(this), 500);
              this._initList('medicine-package-list', this._medicinePackageHierarchicalSearchSamV2.bind(this), '_medicinePackageHierarchicalSearchSamV2', this._medicinePackageAdapterSamV2.bind(this));
              this._initList('ingredient-list', this._ingredientSearchSamV2.bind(this), '_ingredientSearchSamV2', this._ingredientAdapterSamV2.bind(this));
              this._initList('compound-list', this._compoundPrescriptionsSearch.bind(this, this.compounds), '_compoundPrescriptionsSearch', this._compoundPrescriptionAdapter.bind(this));
              this._showPane('search');
          });
  }

  _init() {
      // this.latestSearchValue = this.filterValue;
      // const bedrugsIcc = this.api.bedrugs();

      // OK
      // this._initList('ingredient-list', bedrugsIcc.getInnClusters.bind(bedrugsIcc), this._ingredientAdapter.bind(this));
      // this._initList('ingredient-list', this._ingredientSearch.bind(this), this._ingredientAdapter.bind(this));

      // OK
      //this._initList('medicine-package-list', bedrugsIcc.getMedecinePackages.bind(bedrugsIcc), this._medicinePackageAdapter.bind(this));

      // OK
      // this._initList('medicine-package-list', bedrugsIcc.getMedecinePackagesFromIngredients.bind(bedrugsIcc), this._medicinePackageAdapter.bind(this));

      // OK
      // this._initList('medicine-package-list', this._medecinePackagesSearch.bind(this), this._medicinePackageAdapter.bind(this));

      // OK
      // this._initList('chronic-list', this._chronicsSearch.bind(this), this._chronicAdapter.bind(this));

      // this.filterNone = this.shadowRoot.querySelector("#filter-none");
      // this.filterNone.active = true;
  }

  _priceIndexSamV2(info) {
      return info && (info.cheapest ? 0 : (info.cheap ? 1 : 2)) || 0;
  }

  _compProhibIcon(info) {
      // return info.mp && info.mp.dopingcode && info.mp.dopingcode === "N" ? 'cat-doping-prod' : 'void';
      return info.mp && info.mp.dopingcode ? 'cat-doping-prod' : 'void';
  }

  _compProhibIconSamV2(vmpGroup) {
      return vmpGroup && vmpGroup.noGenericPrescriptionReason && vmpGroup.noGenericPrescriptionReason.code === "5" ? 'cat-doping-prod' : 'void';
  }

  _servereRenalInsufIcon(info) {
      return true ? 'severe-renal-insufficiency' : 'void';
  }

  _moderateRenalInsufIcon(info) {
      return true ? 'moderate-renal-insufficiency' : 'void';
  }

  _reinfPharmaVigiIcon(info) {
      return info ? 'reinf-pharma-vigi' : 'void';
  }

  _reinfPharmaVigiIconSamV2(info) {
      return (info && info.blackTriangle) ? 'reinf-pharma-vigi' : 'void';
  }

  _rmaPharmaVigiIcon(info) {
      return info ? 'rma-pharma-vigi' : 'void';
  }

  _catIcon(info) {
      switch (info.rrsstate) {
          case 'B':
              return 'cat-notcheap-noacm';
          case 'G':
              return 'cat-cheap-noacm';
          case 'R':
              return 'cat-notcheap-acm';
          default :
              return 'void';
      }
  }

  _catIconSamV2(ampp) {
      if (!ampp.publicDmpp || !ampp.currentReimbursement) return "";
      if (ampp.publicDmpp.cheap) {
          if (ampp.currentReimbursement.copaymentSupplement) return 'void';
          else return 'cat-cheap-noacm';
      } else {
          if (ampp.currentReimbursement.copaymentSupplement) return 'cat-notcheap-acm';
          else return 'cat-notcheap-noacm';
      }
  }

  _getIcon(item) {
      return item.allergyType === "allergy" ? "image:filter-vintage" : (item.allergyType === "adr" ? "vaadin:pill" : "");
  }

  _hasIcon(item) {
      return !!item.allergyType;
  }

  _hasColor(item) {
      return !item.allergyType;
  }

  _narcoticIcon(info) {
      return info.note === 'stupéfiant' ? 'stup' : 'void';
  }

  _hasValidChap4(s) {
      return (((this.api.contact().preferredContent(s, this.language) || {}).medicationValue || {}).agreements || []).some(z => z.accepted && (!!z.end || this.api.moment(z.end).isAfter(moment())));
  }

  _hasPendingChap4(s) {
      return (((this.api.contact().preferredContent(s, this.language) || {}).medicationValue || {}).agreements || []).some(z => z.inTreatment);
  }

  _hasChap4(s) {
      return !!(((this.api.contact().preferredContent(s, this.language) || {}).medicationValue || {}).agreements || []).length;
  }

  _hasValidChap4Class(s) {
      return this._hasValidChap4(s) ? 'ok' : this._hasPendingChap4(s) ? 'pending' : this._hasChap4(s) ? 'nok' : 'hidden';
  }

  _chap4Status(info) {
      const med = this.medications.find(m => (m.codes.find(c => c.type === 'CD-DRUG-CNK') || {}).code === info.id);
      if (med)
          return this._hasValidChap4Class(med);
      else
          return 'hidden';
  }

  _getAllergyType(allergies) {
      if (!allergies || !allergies.length) return "";
      if (allergies.some(allergy => allergy.type === "allergy")) {
          return "allergy";
      } else if (allergies.some(allergy => allergy.type === "adr")) {
          return "adr";
      } else {
          return "";
      }
  }

  _getAllergies(item) {
      if (!item || !item.atcs || !item.atcs.length) return "";
      return this.allergies.filter(allergy => (allergy.cnk && (item.id === allergy.cnk)) || (item.atcs.some(atc => atc.code === allergy.atcCode)));
  }

  _deliveryStatus(status) {
      return status === STATUS_NOT_SENT ? "notsent" :
          status === STATUS_SENT ? "sent" :
              status === STATUS_PENDING ? "pending" :
                  status === STATUS_DELIVERED ? "delivered" :
                      status === STATUS_REVOKED ? "revoked" : "hidden";
      // return (item && item.tags && item.tags.some(t => (t.type === 'CD-ITEM' && t.code === 'treatment') || (t.type === 'ICURE' && t.code === 'PRESC')) && !item.endOfLife && item.tags.find(t => t.type === 'CD-LIFECYCLE') || {code: ""}).code;
  }

  _isDrugAlreadyDelivered(s) {
      return s && s.tags && s.tags.find(t => (t.type === 'CD-ITEM' && t.code === 'treatment') || (t.type === 'ICURE' && t.code === 'PRESC')) && !s.endOfLife && s.tags.find(t => t.type === 'CD-LIFECYCLE' && t.code === 'delivered') && this.api.contact().medicationValue(s, this.language);
  }

  _isMasterly(e) {
      return false;
  }

  _isTemplate(e) {
      return false;
  }

  _chap4Tooltip(e) {
      return "";
  }

  _deliveryTooltip(e) {
      return "";
  }

  _getStyle(prefix, cat, el = "span") {
      if (!cat) return '';
      return prefix + '--' + cat.toUpperCase() + (el ? (' ' + el) : '');
  }

  _getNoEntryStyle(id) {
      if (id) return '';
      return "NO_ENTRY";
  }

  _getPriceIndexStyle(index) {
      return index > 1 ? "" : "PRICE_INDEX--" + (index > 0 ? "CHEAP" : "CHEAPEST");
  }

  _getAdrStyle(adrWarning) {
      return adrWarning ? "ADR_WARNING" : "";
  }

  _buildListItem(mppInfos, prescInfos) {
      const medicationValue = prescInfos && prescInfos.content.fr.medicationValue;
      return {
          "id": mppInfos.id.id,
          "label": mppInfos.name,
          "atc": mppInfos.atcCode,
          "atcCat": mppInfos.atcCode && mppInfos.atcCode[0] || "",
          "publicPrice": accounting.formatMoney(mppInfos.pubprice / 100, "€", 2, " ", ","),
          "compProhibIcon": this._compProhibIcon(mppInfos),
          "moderateRenalInsufIcon": this._moderateRenalInsufIcon(mppInfos),
          "severeRenalInsufIcon": this._servereRenalInsufIcon(mppInfos),
          "rmaPharmaVigiIcon": this._rmaPharmaVigiIcon(mppInfos),
          "reinfPharmaVigiIcon": this._reinfPharmaVigiIcon(mppInfos),
          "narcoticIcon": this._narcoticIcon(mppInfos),
          "catIcon": this._catIcon(mppInfos),
          "chap4Status": this._chap4Status(mppInfos),
          "deliveryStatus": this._deliveryStatus(mppInfos),
          "startDate": medicationValue && medicationValue.beginMoment && this.api.moment(medicationValue.beginMoment).format('DD/MM/YYYY') || '',
          "endDate": medicationValue && medicationValue.endMoment && this.api.moment(medicationValue.endMoment).format('DD/MM/YYYY') || ''
      };
  }

  _medicinePackageAdapter(results) {
      if (results && results.length) {
          return Promise.all(results.map(med => this.api.bedrugs().getMppInfos(med.id.id, this.language === 'en' ? 'fr' : this.language || 'fr')
              .then(mppInfos => {
                  mppInfos.id.id && (((med.codes || (med.codes = [])).find(c => c.type === 'CD-DRUG-CNK') || (med.codes[med.codes.length] = {
                      type: 'CD-DRUG-CNK',
                      version: '0.0.1'
                  })).code = med.id.id)
                  mppInfos.atcCode && (((med.codes || (med.codes = [])).find(c => c.type === 'CD-ATC') || (med.codes[med.codes.length] = {
                      type: 'CD-ATC',
                      version: '0.0.1'
                  })).code = mppInfos.atcCode)

                  return this._buildListItem(mppInfos);
              })))
              .catch(err => {
                  console.log("error:", err);
                  return [];
              });
      } else {
          return Promise.resolve([]);
      }
  }

  _ingredientAdapter(results) {
      return Promise.resolve(results.map(result => {
          return {
              "id": result.inncluster,
              "label": result.name
          };
      }));
  }

  // .then(codes => codes.filter((e, i, a) => a.findIndex(x => x.code === e.code) === i))
  // .then(codes => this.api.code().getCodes(codes.map(c => this.api.code().normalize(c).id).join(',')))
  // .then(codes => {
  //     this.set('entity.codes', _.union(this._stripCodesByTypes(this.entity.codes, ["CD-ATC", "CD-DRUG-CNK"]), codes));
  //     console.log("entity-codes", this.entity.codes);
  // })

  _getCnkCodes(dmpps) {
      return dmpps.reduce((codes, dmpp) => {
          codes.push({
              type: "CD-DRUG-CNK",
              version: "0.0.1",
              code: dmpp.code
          });
          return codes;
      }, []);
  }

  _getServiceType(service) {
      if (!service.tags || !service.tags.length) return "";
      return service.tags.some(tag => tag.type === "ICURE" && tag.code === "PRESC") ? "prescription" :
          service.tags.some(tag => tag.type === "CD-ITEM" && tag.code === "medication") ? "medication" : "";
  }

  _servicesSearch(source, sourceType, searchValue, first, count) {
      // todo: this must be done only once per search!
      const normSearchValue = searchValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      return new Promise(resolve => {
          // let results = [];
          resolve(source.reduce((results, service) => {
              const searchField = this._serviceDescription(service);
              const normSearchField = searchField.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
              if (!searchValue || searchValue.length < 2 || normSearchField.includes(normSearchValue)) {
                  const medicationValue = this.api.contact().medicationValue(service, this.language) || {};
                  const compoundFields = this._getCompoundPrescriptionFields(medicationValue.compoundPrescription);
                  const intendedName = _.get(medicationValue, "medicinalProduct.intendedname", _.get(medicationValue, "substanceProduct.intendedname", compoundFields.formula));
                  const type = service.codes.some(c => c.type === "CD-INNCLUSTER" || c.type === "CD-VMPGROUP") && "substance" || service.codes.some(c => c.type === "CD-DRUG-CNK") && "medicine" || "compound";
                  const id = (service.codes.find(c =>  ["CD-INNCLUSTER", "CD-VMPGROUP", "CD-DRUG-CNK"].includes(c.type)) || {code: service.id}).code;
                  const atcCodes = service.codes.filter(c => c.type === "CD-ATC").map(code => code.code) || [];
                  const allergies = this.allergies.filter(allergy => (allergy.cnk && (id === allergy.cnk)) || (atcCodes && atcCodes.some(atcCode => atcCode === allergy.atcCode) || ""));
                  const medication = {
                      id: id,
                      intendedName: intendedName,
                      compoundTitle: compoundFields.title,
                      posology: this.api.contact().medication().frequencyToString(medicationValue, this.language),
                      type: type,
                      atcCodes: atcCodes,
                      allergies: allergies,
                      startDate: medicationValue.beginMoment && this.api.moment(medicationValue.beginMoment).format('DD/MM/YYYY') || "",
                      endDate: medicationValue.endMoment && this.api.moment(medicationValue.endMoment).format('DD/MM/YYYY') || "",
                      status: medicationValue.status,
                      beginMoment: medicationValue.beginMoment && this.api.moment(medicationValue.beginMoment).valueOf() || service.created,
                      service: service
                  };
                  results.push(medication);
              }
              return results;
          }, [])
              .filter(res => !res.id.includes(":") && (res.intendedName || res.compoundTitle))
              .sort((a, b) => sourceType === "history" ? b.beginMoment - a.beginMoment : a.intendedName.localeCompare(b.intendedName))
          )
      });
  }

  _serviceAdapter(results) {
      if (results && results.length) {
          return Promise.all(results.map(result => {
              const item = {
                  "id": result.id,
                  "intendedName": result.intendedName,
                  "compoundTitle": result.compoundTitle,
                  "posology": result.posology,
                  "atcCodes": result.atcCodes,
                  "atcCat": _.get(result, "atcCodes[0][0]", ""),
                  "allergies": result.allergies,
                  "allergyType": this._getAllergyType(result.allergies),
                  "deliveryStatus": this._deliveryStatus(result.status) || "hidden",
                  "startDate": result.startDate,
                  "endDate": result.endDate,
                  "service": result.service,
                  "type": result.type,
                  "serviceType": this._getServiceType(result.service)
              };
              console.log("service item: ", item);
              return item;
          }));
      } else {
          return Promise.resolve([]);
      }


      // let data = [];
      // if (results && results.length) {
      //     let data = [];
      //     return Promise.all(results.map(result => {
      //         let id = ((result.codes || (result.codes = [])).find(c => c.type === 'CD-DRUG-CNK') || {code: ''}).code;
      //         if (id && !id.includes(':')) {
      //             return this.api.bedrugs().getMppInfos(id, this.language === 'en' ? 'fr' : this.language || 'fr')
      //                 .then(mppInfos => this._buildListItem(mppInfos, result));
      //         } else {
      //             return {
      //                 "id": result.id,
      //                 "intendedName": result.name,
      //                 "pos": this.api.contact().medication().frequencyToString((this.api.contact().preferredContent(result, this.language) || {}).medicationValue, this.language)
      //             };
      //         }}))
      //         .catch(err => {
      //             console.log("error:", err);
      //             return [];
      //         });
      // } else {
      //     return Promise.resolve([]);
      // }
  }

  _ingredientSearch(searchValue, language, type, first, count) {
      if (!searchValue || searchValue.length < 2) return Promise.resolve([]);
      return this.api.bedrugs().getInnClusters(searchValue, language, type, first, count);
  }

  _ingredientSearchSamV2(searchValue, language, type, first, count) {
      if (!searchValue || searchValue.length < 2) return Promise.resolve([]);
      return this.api.besamv2().findPaginatedVmpGroupsByLabel(language, searchValue, null, null, count)
          .then(results => (results && results.rows || []))
          .then (rows => {
              rows.map(row => console.log("vmpgroup - ", row));
              return rows;
          })
          .then(vmpGroups => Promise.all(vmpGroups.map(vmpGroup => {
              return this.api.besamv2().findPaginatedAmpsByGroupCode(vmpGroup.code, null, null, 1)
                  .then(results => (results && results.rows || []))
                  .then(amps => {
                      const id = vmpGroup.code;
                      const amp = _.head(amps);
                      const ampp = _.get(amp, "ampps", []).find(ampp => !ampp.to && ampp.atcs && ampp.atcs.length && ampp.dmpps && ampp.dmpps.length &&
                          ampp.dmpps.some(dmpp => dmpp.deliveryEnvironment === 'P' && dmpp.codeType === 'CNK' && !dmpp.to));
                      const atcCodes = ampp && ampp.atcs && ampp.atcs.map(atc => atc.code) || [];
                      const allergies = this.allergies.filter(allergy => (allergy.cnk && (id === allergy.cnk)) || (atcCodes && atcCodes.some(atcCode => atcCode === allergy.atcCode) || ""));
                      return Object.assign(vmpGroup, {
                              id: id,
                              intendedName: _.get(vmpGroup, "name[" + this.language + "]", ""),
                              unit: _.get(amp, "components[0].pharmaceuticalForms[0].name[" + this.language + "]", ""),
                              atcCodes: atcCodes,
                              allergies: allergies
                          });
                  })
              })
          ))
          .then(rows => rows.filter(row => row.intendedName && row.id))
  }

  _ingredientAdapterSamV2(results) {
      if (results && results.length) {
          return Promise.all(results.map(vmpGroup => {
              const item = {
                  "id": vmpGroup.id,
                  "intendedName": vmpGroup.intendedName,
                  "atcCodes": vmpGroup.atcCodes,
                  "atcCat": _.get(vmpGroup, "atcCodes[0][0]", ""),
                  "allergies": vmpGroup.allergies,
                  "allergyType": this._getAllergyType(vmpGroup.allergies),
                  "unit": vmpGroup.unit,
                  "noSwitchReason": vmpGroup.noSwitchReason,
                  "type": "substance"
              };
              console.log("ingredient item: ", item);
              return item;
          }));
      } else {
          return Promise.resolve([]);
      }
  }

  _medecinePackagesSearch(searchValue, language, type, first, count) {
      if (!searchValue || searchValue.length < 2) return Promise.resolve([]);
      return Promise.all([
          this.api.bedrugs().getMedecinePackages(searchValue, language, type, first, count),
          this.api.bedrugs().getMedecinePackagesFromIngredients(searchValue, language, type, first, count)
      ])
          .then(([packs, packsIng]) => _.unionBy(packs, packsIng, 'id.id'));
  }

  _medicinePackageHierarchicalSearchSamV2(searchValue, language, type, first, count, parentUuid, parentUuids, groupId) {
      if (!searchValue || searchValue.length < 2) return Promise.resolve([]);
      return (parentUuid ?
          this.api.besamv2().findPaginatedAmpsByGroupId(groupId) :
          this.api.besamv2().findPaginatedAmpsByLabel(language, searchValue, null, null, count))
              .then(results => (results && results.rows || []))
              .then(rows => {
                  const level = parentUuid ? 1 : 0;
                  const hierarchicalAmpps = rows.reduce((ampps, row) => {
                      if (row.ampps && row.ampps.length) {
                          return ampps.concat(row.ampps.map(ampp => {
                              const now = moment().valueOf();
                              const publicDmpp = ampp.dmpps.find(dmpp => dmpp.deliveryEnvironment === "P");
                              const currentReimbursement = publicDmpp && publicDmpp.reimbursements && publicDmpp.reimbursements.length && publicDmpp.reimbursements.find(reimbursement => reimbursement.from < now && (!reimbursement.to || reimbursement.to > now ));
                              const groupId = row.vmp && row.vmp.vmpGroup && row.vmp.vmpGroup.id || "";
                              const hasChildren = (level === 0) && !!groupId;
                              const id = publicDmpp && publicDmpp.codeType === 'CNK' && publicDmpp.code;
                              const unit = _.get(row, "components[0].pharmaceuticalForms[0].name[" + this.language + "]", "");
                              const atcCodes = ampp.atcs && ampp.atcs.map(atc => atc.code) || [];
                              const allergies = this.allergies.filter(allergy => (allergy.cnk && (id === allergy.cnk)) || (atcCodes && atcCodes.some(atcCode => atcCode === allergy.atcCode) || ""));
                              const dividable = !(_.get(row, "components[0].dividable", "") === "X");
                              const samDate = publicDmpp && moment(publicDmpp.from).format("DD/MM/YYYY");

                              return Object.assign(ampp, {
                                  id: id,
                                  groupId: groupId,
                                  hasChildren: hasChildren,
                                  uuid: id,
                                  parentUuid: parentUuid,
                                  publicDmpp: publicDmpp,
                                  currentReimbursement: currentReimbursement,
                                  intendedName: (ampp.prescriptionName && ampp.prescriptionName[this.language]) || (publicDmpp && publicDmpp.prescriptionName && publicDmpp.prescriptionName[this.language]) || (ampp.abbreviatedName && ampp.abbreviatedName[this.language]) || '',
                                  posologyNote: ampp.posologyNote && ampp.posologyNote[this.language] || "",
                                  unit: unit,
                                  atcCodes: atcCodes,
                                  allergies: allergies,
                                  dividable: dividable,
                                  samDate: samDate,
                                  amp: row
                              })
                          }));
                      }
                      return ampps;
                  }, [])
                  .filter(e => e.amp.status === "AUTHORIZED" && e.publicDmpp && e.id && e.intendedName && (level === 0 || level === 1 && e.uuid !== parentUuid))
                  .filter((e, i, a) => a.findIndex(x => x.id === e.id) === i);

                  let filteredAmpps = [];
                  if (level === 0) {
                      // build uuids
                      const uuids = hierarchicalAmpps.map(hierarchicalAmpp => hierarchicalAmpp.uuid);
                      filteredAmpps = hierarchicalAmpps.map(hierarchicalAmpp => Object.assign(hierarchicalAmpp, {uuids: uuids}));
                  } else {
                      // filter against parentUuids
                      filteredAmpps = hierarchicalAmpps.filter(hierarchicalAmpp => !parentUuids.includes(hierarchicalAmpp.uuid))
                  }

                  const finalList = filteredAmpps
                      .map(filteredAmpp => {
                          const dmpp = filteredAmpp.publicDmpp;
                          const reimb = filteredAmpp.currentReimbursement;
                          const publicPrice =  !reimb ? parseFloat(dmpp.price || 0) :
                              (reimb.referenceBasePrice && reimb.copaymentSupplement) ? (parseFloat(reimb.referenceBasePrice) + parseFloat(reimb.copaymentSupplement)) :
                                  reimb.reimbursementBasePrice ? parseFloat(reimb.reimbursementBasePrice) : 0;
                          const patientPrice = !reimb ? parseFloat(dmpp.price || 0) :
                              (reimb.copayments && (reimb.copayments.length === 2)) ? parseFloat(this.patientBim ? reimb.copayments[0].feeAmount : reimb.copayments[1].feeAmount) : 0;
                          return Object.assign(filteredAmpp, {
                              publicPrice: publicPrice,
                              patientPrice: patientPrice,
                              priceIndex: dmpp.cheapest ? 0 : (dmpp.cheap ? 1 : 2)
                          })
                      })
                      .sort((a, b) => a.priceIndex !== b.priceIndex ? (a.priceIndex - b.priceIndex) : (a.patientPrice - b.patientPrice));

                  if (finalList.length === 0 && level > 0) {
                      finalList.push({
                          intendedName: this.localize("no_alt", "Pas d'alternative", this.language)
                      });
                  }

                  return finalList
                      .map(ampp => {
                          console.log("ampp - ", ampp);
                          return ampp;
                      })
              });
  }

  _medicinePackageAdapterSamV2(results) {
      return Promise.resolve(results
          .map(ampp => {
              return {
                  "id": ampp.id,
                  "groupId": ampp.groupId,
                  "uuid": ampp.uuid,
                  "uuids": ampp.uuids,
                  "hasChildren": ampp.hasChildren,
                  "parentUuid": ampp.parentUuid,
                  "ctiExtended": ampp.ctiExtended,
                  "intendedName": ampp.intendedName,
                  "reinfPharmaVigiIcon": this._reinfPharmaVigiIcon(_.get(ampp, "amp.blackTriangle", false)),
                  "atcCodes": ampp.atcCodes,
                  "atcCat": _.get(ampp, "atcCodes[0][0]", ""),
                  "allergies": ampp.allergies,
                  "allergyType": this._getAllergyType(ampp.allergies),
                  "patientPrice": ampp.id && ampp.patientPrice.toFixed(2) + "€",
                  "publicPrice": ampp.id && ampp.publicPrice.toFixed(2) + "€",
                  "priceIndex": ampp.id && ampp.priceIndex || 3,
                  "catIcon": this._catIconSamV2(ampp),
                  "unit": ampp.unit,
                  "amp": ampp.amp,
                  "posologyNote": ampp.posologyNote,
                  "dividable": ampp.dividable,
                  "packDisplayValue": ampp.packDisplayValue,
                  "samCode": _.get(ampp, "amp.code", ""),
                  "samDate": ampp.samDate,
                  "type": "medicine"
              };
          }));
  }

  _compoundPrescriptionsSearch(source, searchValue, language, type, first, count) {
      if (!searchValue || searchValue.length < 2) return Promise.resolve([]);
      return this.api.entitytemplate().findAllEntityTemplates("org.taktik.icure.entities.embed.Medication", searchValue, true)
          .then(results => Promise.all(results.map(result => {
              return {
                  id: result.id,
                  userId: result.userId,
                  compoundTitle: result.descr,
                  intendedName: (result.entity && result.entity.length && result.entity.find(ent => ent.compoundPrescription) || {compoundPrescription: ""}).compoundPrescription,
                  type: "compound"
              }
          })))
          .then(results => results.filter(result => result.id && (result.compoundTitle || result.intendedName)))
  }

  _compoundPrescriptionAdapter(results) {
      if (results && results.length) {
          return Promise.all(results.map(result => {
              const item = {
                  "id": result.id,
                  "userId": result.userId,
                  "compoundTitle": result.compoundTitle,
                  "intendedName": result.intendedName,
                  "type": result.type
              };
              console.log("compound item: ", item);
              return item;
          }));
      } else {
          return Promise.resolve([]);
      }
  }

  _initList(list, search, domain, adapter, pageSize) {
      this._list = list;
      let grid = this.$[list];
      if (!grid) return;
      grid.lastParams = null; //Used to prevent double calls
      grid.size = 0;
      grid.pageSize = pageSize || 100;
      grid.drugsCache = [];
      grid.dataProvider = (params, callback) => {
          // const sort = params.sortOrders && params.sortOrders[0] && params.sortOrders[0].path || columns[0] && columns[0].key;
          const sort = params.sortOrders && params.sortOrders[0] && params.sortOrders[0].path;
          const desc = params.sortOrders && params.sortOrders[0] && params.sortOrders[0].direction === 'desc' || false;

          const pageSize = params.pageSize || grid.pageSize;
          const startIndex = (params.page || 0) * pageSize;
          const endIndex = ((params.page || 0) + 1) * pageSize;

          let parentUuid = "";
          let groupId = "";
          let parentUuids = []

          if (params.parentItem) {
              parentUuid = params.parentItem.uuid;
              parentUuids = params.parentItem.uuids;
              groupId = params.parentItem.groupId;
          }

          let latestSearchValue = this.filterValue && this.filterValue.trim();
          this.latestSearchValue = latestSearchValue;

          // console.log("Starting search for " + this.filterValue + "|" + sort + "|" + search.toString() + "|" + (desc ? "<|" : ">|") + startIndex + ":" + pageSize + ":");

          this._setSpinnerBusy();
          const limit = endIndex || grid.pageSize;
          const offset = params.index;
          this.api.dedup(() => search(latestSearchValue, this.language, null, 0, grid.pageSize, parentUuid, parentUuids, groupId), domain, `${this.latestSearchValue}|${this.language}|${grid.drugsCacheUpperSearchIndex}|${parentUuid}`, 5000)
              .then(packs => {
                  return {
                      size: packs.length,
                      rows: (desc ? _.reverse(_.sortBy(packs, sort)) : _.sortBy(packs, sort)).slice(offset, limit)
                  }
              })
              .then(function (res) {
                  if (this.filterValue !== latestSearchValue) {
                      //console.log("Cancelling obsolete search");
                      return;
                  }

                  if (res.size === 0) {
                      console.log("Empty search");
                      this.setGridSize(grid, 0);
                      callback([], 0);
                      return;
                  }

                  adapter(_.slice(res.rows, startIndex, endIndex)).then(results => {
                      grid.latestResults = results;
                      const validResults = results && results.filter(result => result.id) || [];
                      if (validResults.length) {
                          const toReplace = validResults.filter(result => !result.parentUuid) || [];
                          if (toReplace.length) {
                              (grid.drugsCache || (grid.drugsCache = []))[startIndex] = null;
                              grid.drugsCache.splice(startIndex, toReplace.length, ...toReplace);
                          }
                          const toAdd = validResults.filter(result => !!result.parentUuid) || [];
                          if (toAdd.length) {
                              (grid.drugsCache || (grid.drugsCache = [])).push(...toAdd);
                          }
                      }
                      callback(results, results.length);
                  })
              }.bind(this))
              .finally(() => this._setSpinnerIdle());
      };
  }

  ready() {
      super.ready();

      this.filters = {
          'chronic': false,
          'history': false,
          'medicine-package': false,
          'ingredient': false,
          'compound': false
      };

      this.panes = {
          'search': false,
          'dosage': false
      };

      // @todo: first step toward generic list component. Add all search and filter functions
      this.searchList = [
          'chronic-list',
          'history-list',
          'medicine-package-list',
          'ingredient-list',
          'compound-list'
      ];

      this._init();
  }

  medicationTypeChanged(name) {
      if (this.medicationType === 'substanceProduct' || this.medicationType === 'medicinalProduct') {
          let grid = this.$['ingredient-list'];
          grid.clearCache()
      }
  }

  setGridSize(grid, size) {
      console.log('setSize', size)
      grid.set('size', size)
      // this.set('busySpinner', false)
  }

  _cellContent(item, column) {
      return column.key.indexOf("price") !== -1 ? accounting.formatMoney(_.get(item, column.key) / 100, "€", 2, " ", ",") :
          (column.key.indexOf("name") !== -1 && _.get(item, "cheap") && _.get(item, "cheap") === 'cheap' ? '\u2794 ' + _.get(item, column.key) :
              _.get(item, column.key));
  }

  _addCnkDci(e) {
      const grid = this.$['ingredient-list'];
      let med = null
      if (this.medicationType === 'substanceProduct') {
          med = grid.latestResults.find(d => this._id(d) === e.target.id)
      } else {
          med = grid.fullVirtualDataSet.find(d => this._id(d) === e.target.id)
      }
      this.checkAdr(med, () => this.selectMedicationFromList(med))
  }

  _addChron(e) {
      const med = this.medications.find(d => d.id === e.target.id)
      this.checkAdr(med, () => this.selectChron(med))
  }

  _id(item) {
      return item && (item.id && (item.id.id || item.id) || item.inncluster || item.name)
  }

  _columnWidth(column) {
      return column.size || "100px";
  }

  _add(listId, medId) {
      const grid = this.$[listId];
      if (!grid || !medId) return;
      const med = grid.drugsCache.find(res => res.id === medId);
      this._addMedication(med);
      this.set("filterValue", "");
      this.refresh();
  }

  _addIngredient(e) {
      this._add("ingredient-list", _.get(e, "target.id", ""));
  }

  _addMedicine(e) {
      this._add("medicine-package-list", _.get(e, "target.id", ""));
  }

  _addChronic(e) {
      this._add("chronic-list", _.get(e, "target.id", ""));
  }

  _addFromHistory(e) {
      this._add("history-list", _.get(e, "target.id", ""));
  }

  _addCompound(e) {
      this._add("compound-list", _.get(e, "target.id", ""));
  }

  _isIngredient(med) {
      return med && (med.drugType === "CD-INNCLUSTER" || med.drugType === "CD-VMPGROUP");
  }

  _isMedicinePackage(med) {
      return med && med.drugType === "CD-DRUG-CNK";
  }

  _isCompoundPrescription(med) {
      return med && med.drugType === "compoundPrescription";
  }

  _isMedication(item) {
      return item.serviceType === "medication";
  }

  _isPrescription(item) {
      return item.serviceType === "prescription";
  }

  _addMedication(med) {
      const currentMedIdx = _.findIndex(this.medicationAccumulator, m => m.id === med.id);
      if (currentMedIdx >= 0) {
          if (this.isPrescription) {
              this.set(`medicationAccumulator.${currentMedIdx}.boxes`, (this.medicationAccumulator[currentMedIdx].boxes || 1) + 1)
          }
      } else {
          console.log(med.type);
          const drugType = med.type === "medicine" ? "CD-DRUG-CNK" :
              med.type === "substance" ? "CD-VMPGROUP" : "compoundPrescription";

          let newMed = med.service;
          const medicationValue = newMed && this.api.contact().medicationValue(newMed, this.language);
          const hasMedication = !!(medicationValue);

          if (hasMedication) {
              med.unit = _.get(medicationValue, "regimen[0].administratedQuantity.unit", this.localize("uni", "Unités"));
          }
          else {
              // const unit = med.unit || this.localize('generic_unit', 'unit', this.language);
              // const unit = (med.unit && med.unit.length < 20) ? med.unit : "";
              const newMedicationContent = {medicationValue: {regimen: [], substitutionAllowed: true}};

              newMed = {
                  content: _.fromPairs([[this.language, newMedicationContent]]),
                  codes: []
              };

              if (drugType === "compoundPrescription") {
                  Object.assign(newMedicationContent.medicationValue, {
                      // compoundPrescription: med.compoundTitle + "\r\n" + med.intendedName
                      compoundPrescription: med.intendedName
                  });
              } else {
                  const product = {
                      intendedname: med.intendedName,
                      intendedcds: [{type: drugType, code: med.id}],
                      priority: "low"
                  };

                  Object.assign(newMedicationContent.medicationValue, drugType === "CD-VMPGROUP" ? {substanceProduct: product} : {medicinalProduct: product});
                  // newMedicationContent.medicationUnit = newMedicationContent.regimen[0].administratedQuantity.unit = med.unit;

                  ((newMed.codes || (newMed.codes = [])).find(code => code.type === drugType) || (newMed.codes[newMed.codes.length] = {
                      type: drugType,
                      version: "1"
                  })).code = med.id;

                  // @ todo: check usage
                  if (med.atcCodes && med.atcCodes[0]) {
                      ((newMed.codes || (newMed.codes = [])).find(code => code.type === "CD-ATC") || (newMed.codes[newMed.codes.length] = {
                          type: "CD-ATC",
                          version: "1"
                      })).code = med.atcCodes[0];
                  }
              }
          }
          const newMedClone = _.cloneDeep(newMed);
          newMedClone.tags = newMed.tags && newMed.tags.length && newMed.tags.filter(tag => tag.type === "org.taktik.icure.entities.embed.Confidentiality") || [];
          const medicationValueClone = this.api.contact().medicationValue(newMedClone, this.language);
          if (hasMedication) {
              medicationValueClone.beginMoment = parseInt(this.api.moment(Date.now()).format("YYYYMMDD"), 10);
              medicationValueClone.endMoment = null;
          }
          (this.api.contact().medicationValue(newMedClone, this.language) || {medicationValue: {}}).status = 0;
          newMedClone.beginMoment = null;
          newMedClone.endMoment = null;
          const desc = this._serviceDescription(newMedClone);
          if (desc) {
              this.push('medicationAccumulator', Object.assign(
                  med,
                  {
                      boxes: 1,
                      newMedication: newMedClone,
                      options: {isPrescription: this.isPrescription, isNew: !hasMedication, createMedication: false},
                      drugType: drugType,
                  })
              );
          }

          if (!hasMedication) {
              this._selectLastMedication();
          }
      }
  }

  saveMedications() {
      this.dispatchEvent(new CustomEvent(this.isPrescription ? 'save-medications' : 'new-medications', {
          detail: {medications: this.medicationAccumulator},
          bubbles: true,
          composed: true
      }))
  }

  click(e) {
      const selected = this.selectedMedicationFromList;

      console.log('selected ', selected, ' - ', this.latestSelected);
      if (this.inDoubleClick && (this._id(this.latestSelected) === this._id(selected) || this.latestSelected && !selected || !this.latestSelected && selected)) {
          this._addCnkDci({target: {id: this._id(this.latestSelected)}})
      } else {
          if (selected) this.latestSelected = selected;
          this.inDoubleClick = true;

          //Trigger cheapAlternativeSearch
          if (this.selectedMedicationFromList && !this.selectedMedicationFromList.cheap) {
              const grid = this.$['ingredient-list']
              grid.clearCache();
          }

          setTimeout(() => {
              delete this.inDoubleClick;
          }, 500);
      }
  }

  clickChron(e) {
      const selected = this.selectedChronicalMedicationFromList;

      console.log('selected ', selected, ' - ', this.latestSelected);
      if (this.inDoubleClick && (this.latestSelected === selected || this.latestSelected && !selected || !this.latestSelected && selected)) {
          this._addChron({target: {id: this._id(this.latestSelected)}})
      } else {
          if (selected) this.latestSelected = selected;
          this.inDoubleClick = true;

          setTimeout(() => {
              delete this.inDoubleClick;
          }, 500);
      }

  }

  loadCheapAlternativesIfNeeded(searchSeed) {
      if (searchSeed) {
          if (searchSeed.cheap) {
              searchSeed = this.cheapAlternativeSearchSeed
          }
          if (!searchSeed.id) {
              this.cheapAlternativeSearchSeed = null
              return Promise.resolve([])
          }
          this.cheapAlternativeSearchSeed = searchSeed
          return this.api.bedrugs().getCachedCheapAlternativesBasedOnAtc(searchSeed.id.id, 'fr')
              .then(packs => packs.filter(mpp => this._id(searchSeed) !== this._id(mpp)).sort((mpp1, mpp2) => (mpp1.index || 10000000) - (mpp2.index || 10000000)).map(mpp => _.extend(_.extend({}, mpp), {cheap: 'cheap'})))
      } else {
          this.cheapAlternativeSearchSeed = null
          return Promise.resolve([])
      }
  }

  _clear(list) {
      const grid = this.$[list];
      if (!grid) return;
      grid.drugsCache = null;
      grid.drugsCacheUpperSearchIndex = 0;
      grid.clearCache();
  }

  _clearAll() {
      this.searchList.map(el => this._clear(el));
  }

  _resize(list) {
      const grid = this.$[list];
      if (!grid) return;
      grid.notifyResize();
  }

  _resizeAll() {
      this.searchList.map(el => this._resize(el));
  }

  refresh() {
      //Give the gui the time to update the field
      setTimeout(function () {
          let currentValue = this.filterValue && this.filterValue.trim();

          if (this.latestSearchValue === currentValue) {
              return;
          }
          setTimeout(function () {
              if (currentValue === this.filterValue) {
                  // this.set('busySpinner', true)
                  console.log("Triggering search for " + this.filterValue);

                  this.selectedMedicationFromList = null
                  this.cheapAlternativeSearchSeed = null
                  this._forceSpinnerIdle();
                  this._clearAll();
              } else {
                  console.log("Skipping search for " + this.filterValue + " != " + currentValue);
                  // this.set('busySpinner', false)
              }
          }.bind(this), 500); //Wait for the user to stop typing
      }.bind(this), 100);
  }

  skip() {
      this.set('filterValue', '')
      this.set('medicationType', 'medicinalProduct')
      // this.$['ingredient-list'].clearCache();
      this._clearAll();
  }

  close() {
      if (!this.customFrequencyTable) {
          this._setFrequencyList()
      }
      this.set('filterValue', '')
      // this.$['ingredient-list'].clearCache();
      this._clearAll();
      this.set('customFrequencyTable', false)
      this.set('flagTableFrequency', false)
  }

  // select(item) {
  //     if (item) {
  //         this.selectMedicationFromList(item);
  //         this.set('filterValue', '')
  //         this.set('medicationType', 'medicinalProduct')
  //         this.$['ingredient-list'].clearCache();
  //     }
  // }

  selectChron(med) {
      if (med) {
          const id = this._id(med)
          const currentMedIdx = _.findIndex(this.medicationAccumulator, m => m.id === id)
          if (currentMedIdx >= 0) {
              this.set(`medicationAccumulator.${currentMedIdx}.boxes`, (this.medicationAccumulator[currentMedIdx].boxes || 1) + 1)
          } else {
              this.push('medicationAccumulator', {
                  id,
                  boxes: 1,
                  newMedication: _.cloneDeep(med),
                  options: {isPrescription: this.isPrescription}
              })
          }
      }
  }

  _isEqual(a, b) {
      return a === b
  }

  _selectedMedicationFromListChanged(item) {
      var grid = this.$['medicine-package-list'];
      grid.selectedItems = item ? [item] : [];
  }

  _indexOfDayPeriod(code) {
      return this._dayPeriods.indexOf(code)
  }

  _getColumns(medicationType) {
      return this.columnsDefinition[medicationType] || []
  }

  // _isCompoundPrescription(medicationType) {
  //     return medicationType === 'compoundPrescription';
  // }

  _isMedicinalProduct(medicationType) {
      return medicationType === 'medicinalProduct';
  }

  _noGridClass(medicationType) {
      return this._isCompoundPrescription(medicationType) || this._isChronicalView(medicationType) ? 'no-grid' : ''
  }

  _noColumnClass(medicationType) {
      return this._isMedicinalProduct(medicationType) ? 'no-column' : ''
  }

  _indexOfDayPeriod(code) {
      return this._dayPeriods.indexOf(code)
  }

  _getColumns(medicationType) {
      return this.columnsDefinition[medicationType] || []
  }

  // _isCompoundPrescription(medicationType) {
  //     return medicationType === 'compoundPrescription';
  // }

  _isMedicinalProduct(medicationType) {
      return medicationType === 'medicinalProduct';
  }

  _isChronicalView(medicationType) {
      return medicationType === "chronical"
  }

  _atcTooltip(cat) {
      if (!cat) return "";
      return this.localize('atc-' + cat, '');
      // return cat === 'A' ? this.localize('ali_trac_meta', 'Alimentary tract and metabolism') :
      //     cat === 'B' ? this.localize('blo_blo_for', 'Blood and blood forming organs') :
      //         cat === 'C' ? this.localize('car_sys', 'Cardiovascular system') :
      //             cat === 'D' ? this.localize('dermatologicals', 'Dermatologicals') :
      //                 cat === 'G' ? this.localize('gen_uri_sys', 'Genito-urinary system and sex hormones') :
      //                     cat === 'H' ? this.localize('sys_hor_pre', 'Systemic hormonal preparations, excluding sex hormones and insulins') :
      //                         cat === 'J' ? this.localize('anti_inf_sys', 'Antiinfectives for systemic use') :
      //                             cat === 'L' ? this.localize('anti_neo_imm', 'Antineoplastic and immunomodulating agents') :
      //                                 cat === 'M' ? this.localize('mus_ske_sys', 'Musculo-skeletal system') :
      //                                     cat === 'N' ? this.localize('ner_sys', 'Nervous system') :
      //                                         cat === 'P' ? this.localize('Anti_para_pro', 'Antiparasitic products, insecticides and repellents') :
      //                                             cat === 'R' ? this.localize('res_sys', 'Respiratory system') :
      //                                                 cat === 'S' ? this.localize('sens_org', 'Sensory organs') :
      //                                                     cat === 'V' ? this.localize('various', 'Various') : this.localize('unk', 'Unknown')
  }

  _getCompoundPrescriptionFields(compoundPrescription) {
      if (!compoundPrescription) return {title: "", formula: ""};
      const fields = compoundPrescription.split(/\r\n/);
      return {title: fields.length > 1 ? fields[0] : "", formula: fields.length > 1 ? fields[1] : fields.length > 0 ? fields[0] : ""};
  }

  _serviceDescription(s) {
      const medicationValue = this.api.contact().medicationValue(s, this.language);
      if (!medicationValue) return "";
      if (medicationValue.compoundPrescription) {
          return medicationValue.compoundPrescription;
          // const fields = this._getCompoundPrescriptionFields(medicationValue.compoundPrescription);
          // return fields.title + ": " + fields.formula;
      } else {
          return this.api.contact().medication().medicationNameToString((this.api.contact().preferredContent(s, this.language) || {}).medicationValue, this.language);
      }
  }

  _servicePosology(s) {
      return this.api.contact().medication().posologyToString((this.api.contact().preferredContent(s, this.language) || {}).medicationValue, this.language)
  }

  _compoundFilterChanged(e) {
      const searchString = e.detail.value || ''

      this.compoundSearchString = searchString;
      if (!searchString || searchString.length < 2) {
          //console.log("Cancelling empty search");
          this.set('compoundListItems', []);
          return;
      }

      this.api.entitytemplate().findAllEntityTemplates('org.taktik.icure.entities.embed.Medication', searchString, true).then(res => {
          if (searchString !== this.compoundSearchString) {
              //console.log("Cancelling obsolete search");
              this.set('compoundListItems', []);
          }
          this.set('compoundListItems', res);
      })
  }

  _compoundChanged(e) {
      const compound = this.compoundListItems.find(c => c.id === e.detail.value)
      if (compound) {
          const medication = compound.entity.find(e => e.compoundPrescription)
          this.set('selectedCompound', {
              id: e.detail.value,
              medicationValue: medication
          })
          this.set('compoundPrescriptionText', medication.compoundPrescription)
      } else {
          this.set('selectedCompound', null);
          this.set('compoundPrescriptionText', '')
      }
  }


  checkAdr(med, thenfun) {
      // check if patient have adverse drug reaction to this drug

      if (!this.user || !this.patient) {
          console.log("no user or patient, abort")
          return
      }
      if (!med) {
          return
      }
      this.set('continueAddMedication', thenfun)
      this.api.helement().findBy(this.user.healthcarePartyId, this.patient).then(hes => {
          console.log(hes)
          this._fillMedecineCodes(med).then(() => {

              const intols = hes
                  .filter(he => he.tags.find(tag => tag.type == "CD-ITEM" && tag.code == "adr"))
                  .filter(he =>
                      he.codes.find(hecode =>
                          med.codes.find(medcode => hecode.type == medcode.type && hecode.code == medcode.code)
                      )
                  )

              if (intols.length) {
                  this.set('intolItems', intols)
                  this.set('medicationToBeAdded', med)
                  if (!med.content) {
                      this.set('medicationToBeAdded_label', med.name)
                  } else {
                      const content = med.content[this.language]
                      this.set('medicationToBeAdded_label',
                          this._any(
                              content.medicationValue.medicinalProduct && content.medicationValue.medicinalProduct.intendedname,
                              content.medicationValue.substanceProduct && content.medicationValue.substanceProduct.intendedname,
                              content.medicationValue.compoundPrescription
                          )
                      )
                  }
                  this.$['checkintol'].open()
              } else {
                  console.log("no intol")
                  return thenfun()
              }
          })
      })

  }

  getIcpcLabel(he) {
      const icpc = he.codes && he.codes.find(t => t.type === 'ICPC' || t.type === 'ICPC2')
      return icpc && ((icpc.code || icpc.id.split('|')[1]) + ' - ')
  }

  _heShortDateFormat(date, altDate) {
      return (date || altDate) && "'" + this.api.moment((date || altDate)).format('YY') || '';
  }

  _any(a, b, c, d, e) {
      return a || b || c || d || e
  }

  _fillMedecineCodes(med) {
      // add codes to med in place and return promise
      if (med.id && med.id.id) {
          //by productName
          return this.api.bedrugs().getMppInfos(med.id.id, this.language === 'en' ? 'fr' : this.language || 'fr').then(mppInfos => {

              med.id.id && (((med.codes || (med.codes = [])).find(c => c.type === 'CD-DRUG-CNK') || (med.codes[med.codes.length] = {
                  type: 'CD-DRUG-CNK',
                  version: '0.0.1'
              })).code = med.id.id)
              mppInfos.atcCode && (((med.codes || (med.codes = [])).find(c => c.type === 'CD-ATC') || (med.codes[med.codes.length] = {
                  type: 'CD-ATC',
                  version: '0.0.1'
              })).code = mppInfos.atcCode)

          })
      } else {
          //by molecule
          if (med.inncluster) {

              med.inncluster && (((med.codes || (med.codes = [])).find(c => c.type === 'CD-INNCLUSTER') || (med.codes[med.codes.length] = {
                  type: 'CD-INNCLUSTER',
                  version: '0.0.1'
              })).code = med.inncluster)
              med.atcCode && (((med.codes || (med.codes = [])).find(c => c.type === 'CD-ATC') || (med.codes[med.codes.length] = {
                  type: 'CD-ATC',
                  version: '0.0.1'
              })).code = med.atcCode)
          } else {
              //Compound prescription

          }
      }
      return Promise.resolve([])

  }

  _getIntolIcon(intol) {
      const iconsMapping = {
          allergy: "image:filter-vintage",
          adr: "vaadin:pill",
          risk: "vaadin:exclamation-circle",
          socialrisk: "vaadin:group",
          professionalrisk: "icons:work"
      }
      return iconsMapping[(intol.tags.find(c => (c.type === 'CD-ITEM' || c.type === 'CD-ITEM-EXT-CHARACTERIZATION')) || {}).code || '']
  }

  _chronicIcon(filter) {
      return filter === "chronic" ? "vaadin:close-circle" : "vaadin:clock";
  }

  _activeIconClass(key, trigger) {
      return this.filters[key] ? 'filter-selected' : ''
  }

  _activeListClass(key, trigger) {
      if (Object.values(this.filters).every(f => !f)) return '';
      return this.filters[key] ? 'sub-list-expanded' : 'sub-list-collapse';
  }

  _oneActiveListClass(key, trigger) {
      return this.filters[key] ? '' : 'sub-control-collapse';
  }

  _toggleFilter(e) {
      const key = e.currentTarget.id;
      this.filters[key] = !this.filters[key];
      Object.keys(this.filters).filter(k => k !== key && this.filters[k]).map(k => this.filters[k] = false);
      this.set('trigger', key + '_' + this.filters[key]);
      this._resizeAll();
  }

  _resetFilter() {
      Object.keys(this.filters).map(k => this.filters[k] = false);
      this.set('trigger', '');
      this._resizeAll();
  }

  _activePaneClass(key, trigger) {
      // if (Object.values(this.panes).every(f => !f)) {
      //     if (Object.keys(this.panes)[0] === key) {
      //         this.panes[key] = true;
      //     }
      // }
      return this.panes[key] ? '' : 'collapsed';
  }

  _showPane(key) {
      if (!key) return;
      this.panes[key] = true;
      Object.keys(this.panes).filter(k => k !== key && this.panes[k]).map(k => this.panes[k] = false);
      this.set('trigger', key + '_' + this.panes[key]);
      this._resetFilter();
  }

  _showSearchPane() {
      this._showPane('search');
  }

  _isSearching(trigger) {
      return this.panes['search'];
  }

  _setSpinnerBusy() {
      this.busySpinnerCounter ++;
      if (this.busySpinnerCounter > 0) {
          this.set("busySpinner", true);
      }
      console.log("increasing spinner counter: ", this.busySpinnerCounter);
  }

  _setSpinnerIdle() {
      this.busySpinnerCounter --;
      if (this.busySpinnerCounter < 1) {
          this.set("busySpinner", false);
          this.busySpinnerCounter = 0;
      }
      console.log("decreasing spinner counter: ", this.busySpinnerCounter);
  }

  _forceSpinnerIdle() {
      this.busySpinnerCounter = 0;
      this.set("busySpinner", false);
      console.log("resetting spinner counter: ", this.busySpinnerCounter);
  }
}

customElements.define(MedicationPrescriptionDialog.is, MedicationPrescriptionDialog)
