import '../../../styles/scrollbar-style.js';
import '../../../styles/dropdown-style.js';
import '../../../styles/dialog-style.js';
import '../../../styles/paper-input-style.js';
import '../../../styles/dropdown-style.js';
import '../../../styles/vaadin-icure-theme.js';

import _ from 'lodash/lodash'
import moment from 'moment/src/moment'

class MedicationDetailsDialogOld extends Polymer.TkLocalizerMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
        <style include="scrollbar-style dropdown-style dialog-style vaadin-icure-theme">
            paper-dialog {
                position: absolute;
                width: 80%;
                height: 80%;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                max-height: 780px !important;
                max-width: 1280px !important;
                display: flex;
                flex-direction: column;
            }

            .content{
                flex-grow: 1
            }

            #medication-detail .save-line {
                height: 20px;
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
            }

            .regimen-line.block{
                justify-content: flex-start;
                align-items: flex-end;
                height: 46px;
                padding: 0 0 16px 0;
            }

            .regimen-line paper-icon-button {
                margin: 12px;
                height: 24px;
                width: 24px;
                padding: 2px;
            }
            .regimen-line vaadin-checkbox {
                align-self: flex-end;
                margin: 0 8px 8px;
            }
            .regimen-line div {
                align-self: flex-end;
                margin-bottom: 8px;
                width: auto;
            }
            .regimen-line paper-input[type=number] {
                margin: 0 8px 0;
                width: 48px;
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
                }
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
                margin: 0 12px;
                flex-shrink: 0;
            }
            .display-type-regimen .regimen-txt {flex:1;text-align: right;}
            #medication-name {
                flex: 4;
                padding-top: 1px;
            }

            #numberByFrequency {
                text-align: right;
                padding-right: 4px;
            }

            paper-input-container {
                --paper-input-container-focus-color: var(--app-primary-color);
                --paper-input-container-label: {
                    color: var(--app-text-color);
                    opacity: 1;
                };
                --paper-input-container-underline-disabled: {
                    border-bottom: 1px solid var(--app-text-color);

                };
                --paper-input-container-color: var(--app-text-color);
            }


            .comment {
                width: 100%;
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

            #selectedMedicationTable {
                border: none;
                height: 240px;
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

            #add-take {
                right: 0;
                z-index: 10;
            }

            paper-tab span{
                text-overflow: ellipsis;
                overflow: hidden;
                padding-right: 12px;
                display: block;
                max-width: calc(100% - 34px);
            }

            .add-col {
                display: flex;
                position: absolute;
                z-index: 1;
                right: 12px;
            }
            .add-col .btn-dropdown-container {
                position: absolute;
                right: 0;
                padding-top: 36px;
                transition: .5s ease;
                transform-origin: top;
            }
            .add-col .btn-dropdown-container.visible-false {
                transform: scaleY(0);
            }
            .add-col .btn-dropdown-container.visible-true {
                transform: scaleY(1);
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

            #add-take {
                transition: .25s ease-out;
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
                    top: 64px;
                    left: 0;
                    height: calc(100vh - 84px) !important;
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
                }prescriptionDialog
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

        </style>

        <paper-dialog id="medication-detail" always-on-top="true" no-cancel-on-outside-click="true">

            <h2 class="modal-title">[[localize('med_det','Medication detail',language)]]</h2>

            <div class="content">
                <template is="dom-if" if="[[medications.length]]">
                    <paper-tabs selected="{{selectedMedication}}">
                        <template is="dom-repeat" items="[[medications]]">
                            <paper-tab>
                                <iron-icon icon="vaadin:pill" class="marginRight10"></iron-icon><span>[[_medicationName(item.newMedication)]]</span>
                            </paper-tab>
                        </template>
                    </paper-tabs>
                </template>


                <div class="regimen-line display-type-regimen">
                    <paper-input id="medication-name" label="[[localize('med','Medication',language)]]" value="[[_any(selectedMedicationContentWithId.medicationValue.medicinalProduct.intendedname, selectedMedicationContentWithId.medicationValue.substanceProduct.intendedname,selectedMedicationContentWithId.medicationValue.compoundPrescription)]]" disabled="true"></paper-input>
                        <vaadin-date-picker id="beginMoment" label="[[localize('start-date', 'Start date', language)]]" value="{{selectedMedicationContentWithId.beginMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                        <vaadin-date-picker id="endMoment" label="[[localize('end-date', 'End date', language)]]" value="{{selectedMedicationContentWithId.endMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                </div>
                <div class="regimen-line display-type-regimen">
                    <paper-dropdown-menu id="medicReimbursement" label="[[localize('presc_reimb', 'Reimbursement', language)]]" class="regimen--reimbursement">
                        <paper-listbox slot="dropdown-content" class="dropdown-reimbursement" selected="{{selectedMedicationContentWithId.medicationValue.reimbursementItemIdx}}" selected-item="{{selectedMedicationContentWithId.medicationValue.reimbursementItem}}">
                            <template is="dom-repeat" items="[[reimbursementCodeRecipe]]" as="code">
                                <paper-item id="[[code.id]]">[[_getCodeLabel(code.label)]]</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>


                    <vaadin-checkbox checked="[[selectedMedicationContentWithId.medicationValue.substitutionAllowed]]" id="substitutionAllowed" on-checked-changed="_substitutionAllowedChanged">[[localize('substitution', 'Substitution', language)]]</vaadin-checkbox>

                    <vaadin-checkbox id="renewal" checked="[[selectedMedicationContentWithId.medicationValue.isRenewal]]" on-checked-changed="_renewalValueChanged">[[localize('renewal', 'Renewal', language)]]</vaadin-checkbox>
                    <template is="dom-if" if="[[selectedMedicationContentWithId.medicationValue.isRenewal]]">
                        <paper-input type="number" min="0" value="{{selectedMedicationContentWithId.medicationValue.renewalDecimalValue}}"></paper-input>
                        <div>x tous les</div>
                        <paper-input type="number" min="0" value="{{selectedMedicationContentWithId.medicationValue.renewalDurationValue}}"></paper-input>
                        <paper-dropdown-menu id="medicRenewalTimeUnit" label="[[localize('time_unit','Time unit',language)]]" class="regimen--renewalTimeUnit">
                            <paper-listbox slot="dropdown-content" class="dropdown-renewalTimeUnit" selected="{{selectedMedicationContentWithId.medicationValue.renewalTimeUnitIdx}}" selected-item="{{selectedMedicationContentWithId.medicationValue.renewalDurationUnitItem}}">
                                <template is="dom-repeat" items="[[timeUnit]]" as="tu">
                                    <paper-item id="[[tu.id]]">[[_getCodeLabel(tu.label)]]</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </template>
                </div>

                <div class="regimen-line display-type-regimen">
                    <paper-input-container always-float-label="true" class="comment">
                        <label slot="label" class="color-status">[[localize('com','Comment',language)]]</label>
                        <iron-autogrow-textarea class="paper-input-input" slot="input" value="{{selectedMedicationContentWithId.medicationValue.commentForDelivery}}"></iron-autogrow-textarea>
                    </paper-input-container>
                </div>

                    <div id="main-table" class="regimen-lines">
                        <div class="regimen-line regimen-add">
                            <div class="add-first-regimen">
                                <div class="button button--menu">
                                    <span on-tap="_addRegimen">[[localize('add_pos_reg','Add posology regimen',language)]]</span>
                                    <iron-icon icon="more-vert" on-tap="_toggleAddDropDown"></iron-icon>
                                </div>
                                <template is="dom-if" if="[[openAddDropDown]]">
                                    <template is="dom-if" if="[[!selectedTab]]">
                                        <div class="btn-dropdown-container">
                                            <paper-item id="weekly" on-tap="_pushRegimen" data-item="weekly">[[localize('wee','Weekly',language)]]</paper-item>
                                            <paper-item id="monthly" on-tap="_pushRegimen" data-item="monthly">[[localize('mon','Monthly',language)]]</paper-item>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                                <h4>[[localize('pos','Posology',language)]]</h4>
                                <div class="add-col">
                                        <paper-listbox id="dayListbox" class\$="btn-dropdown-container visible-[[openAddColDropDown]]" slot="dropdown-content" selected="[[tempColToAdd]]" on-selected-changed="_addCustomDayPeriod" attr-for-selected="id">
                                            <paper-item class="timeOfDay" id="morning" on-tap="" data-item="daily">[[localize('ms_morning','morning',language)]]</paper-item>
                                            <paper-item class="timeOfDay" id="evening" on-tap="" data-item="weekly">[[localize('ms_evening','evening',language)]]</paper-item>
                                            <paper-item class="timeOfDay" id="night" on-tap="" data-item="monthly">[[localize('ms_night','night',language)]]</paper-item>
                                            <paper-item id="custom" data-item="monthly" on-tap="_ignoreEvent">
                                                <div class="custom-time">
                                                    <div>
                                                        <span>[[localize('T:','T:',language)]]</span>
                                                        <paper-input-container no-label-float="">
                                                            <iron-input slot="input" bind-value="{{customTime}}">
                                                                <input type="text" value="{{value::input}}">
                                                            </iron-input>
                                                        </paper-input-container>
                                                    </div>
                                                    <paper-icon-button id="add-custom-time" class="custom-time-add" icon="icons:add" on-tap="_addCustomDayPeriod"></paper-icon-button>
                                                </div>
                                            </paper-item>
                                        </paper-listbox>
                                    <paper-icon-button id="add-take" icon="add" on-tap="_toggleColDropDown"></paper-icon-button>
                                </div>
                                <vaadin-grid id="selectedMedicationTable" data-provider="[[_regimenTableDataProvider('daily', selectedMedicationContentWithId)]]" indexas="index">
                                    <vaadin-grid-column flex-grow="1" width="160px">
                                        <!-- <template class="header">
                                            [[localize('tim_span','Time span',language)]]
                                        </template> -->
                                        <template>
                                            [[item.moment]]
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="50px">
                                        <template class="header bt">[[localize('mom_morning','Morning',language)]]</template>
                                        <template>
                                            <template is="dom-if" if="[[item.morning]]">
                                                <paper-input no-label-float="" value="{{item.morning.administratedQuantity.quantity}}" type="number" class="regimen-grid-quantity" min="0" on-change="_selectSingleQuantityFromTable"></paper-input>
                                            </template>
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="50px">
                                        <template class="header bt">[[localize('mom_midday','Noon',language)]]</template>
                                        <template>
                                            <template is="dom-if" if="[[item.midday]]">
                                                <paper-input no-label-float="" value="{{item.midday.administratedQuantity.quantity}}" type="number" class="regimen-grid-quantity" min="0" on-change="_selectSingleQuantityFromTable"></paper-input>
                                            </template>
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="50px">
                                        <template class="header bt">[[localize('mom_evening','Evening',language)]]</template>
                                        <template>
                                            <template is="dom-if" if="[[item.evening]]">
                                                <paper-input no-label-float="" value="{{item.evening.administratedQuantity.quantity}}" type="number" class="regimen-grid-quantity" min="0" on-change="_selectSingleQuantityFromTable"></paper-input>
                                            </template>
                                        </template>
                                        </vaadin-grid-column>
                                </vaadin-grid>
                        <template id="rgRepeatWeekly" is="dom-repeat" items="[[_weekly(selectedMedicationContentWithId.medicationValue.regimen)]]" as="rg" indexas="index">
                            <paper-dropdown-menu id="[[rg.administratedQuantity.day]]" label="[[localize('dow','Day of week',language)]]" class="regimen--tod">
                                <paper-listbox slot="dropdown-content" selected="{{rg.administratedQuantity.day}}" attr-for-selected="id" on-selected-changed="_selectWeekPeriod">
                                    <paper-item id="monday">[[localize('Monday','Monday',language)]]</paper-item>
                                    <paper-item id="tuesday">[[localize('Tuesday','Tuesday',language)]]</paper-item>
                                    <paper-item id="wednesday">[[localize('Wednesday','Wednesday',language)]]</paper-item>
                                    <paper-item id="thursday">[[localize('Thursday','Thursday',language)]]</paper-item>
                                    <paper-item id="friday">[[localize('Friday','Friday',language)]]</paper-item>
                                    <paper-item id="saturday">[[localize('Saturday','Saturday',language)]]</paper-item>
                                    <paper-item id="sunday">[[localize('Sunday','Sunday',language)]]</paper-item>
                                </paper-listbox>
                            </paper-dropdown-menu>
                            <template is="dom-if" if="[[!_isEqual(rg.dayPeriod.code,'custom')]]">
                                <paper-dropdown-menu label="[[localize('tod','Time of day',language)]]" class="regimen--tod" id="{{rg.dayPeriod.code}}">
                                    <paper-listbox id="daylyListbox" slot="dropdown-content" selected="{{rg.dayPeriod.code}}" attr-for-selected="id" on-selected-changed="_selectDayPeriod" value="[[rg.dayPeriod.code]]">
                                        <paper-item id="beforebreakfast">[[localize("beforebreakfast",'Beforebreakfast',language)]]</paper-item>
                                        <paper-item id="duringbreakfast">[[localize("duringbreakfast",'Duringbreakfast',language)]]</paper-item>
                                        <paper-item id="afterbreakfast">[[localize("afterbreakfast",'Afterbreakfast',language)]]</paper-item>
                                        <paper-item id="morning">[[localize("morning",'Morning',language)]]</paper-item>
                                        <paper-item id="beforelunch">[[localize("beforelunch",'Beforelunch',language)]]</paper-item>
                                        <paper-item id="afternoon">[[localize("afternoon",'Afternoon',language)]]</paper-item>
                                        <paper-item id="duringlunch">[[localize("duringlunch",'Duringlunch',language)]]</paper-item>
                                        <paper-item id="afterlunch">[[localize("afterlunch",'Afterlunch',language)]]</paper-item>
                                        <paper-item id="beforedinner">[[localize("beforedinner",'Beforedinner',language)]]</paper-item>
                                        <paper-item id="duringdinner">[[localize("duringdinner",'Duringdinner',language)]]</paper-item>
                                        <paper-item id="afterdinner">[[localize("afterdinner",'Afterdinner',language)]]</paper-item>
                                        <paper-item id="evening">[[localize("evening",'Evening',language)]]</paper-item>
                                        <paper-item id="night">[[localize("night",'Night',language)]]</paper-item>
                                        <hr>
                                        <paper-item id="custom">[[localize('precise_hour','Precise hour',language)]]</paper-item>
                                    </paper-listbox>
                                    <div class="hidden">[[rg.dayPeriod.code]]</div>
                                </paper-dropdown-menu>
                            </template>
                            <template is="dom-if" if="[[_isEqual(rg.dayPeriod.code,'custom')]]">
                                <paper-input id="preciseHour" class="regimen--tod" label="[[localize('prec_hour','precise hour',language)]]" value="{{_formatTime(rg.timeOfDay)}}" on-value-changed="_changeTimeOfDay"></paper-input>
                            </template>                        </template>
                        <template id="rgRepeatMonthly" is="dom-repeat" items="[[_monthly(selectedMedicationContentWithId.medicationValue.regimen)]]" as="rg" indexas="index">
                            <vaadin-date-picker id="beginMoment" label="[[localize('date', 'Date', language)]]" value="{{rg.administratedQuantity.time}}" class="regimen--tod" i18n="[[i18n]]"></vaadin-date-picker>
                        </template>

                        <div class="regimen-line display-type-regimen">
                            <paper-input-container always-float-label="true" class="comment">
                                <label slot="label" class="color-status">[[localize('pos','Posology',language)]]</label>
                                <iron-autogrow-textarea class="paper-input-input" slot="input" value="{{posologyString}}"></iron-autogrow-textarea>
                            </paper-input-container>
                        </div>
                    </div>
            </div>

            <div class="buttons">
                <template is="dom-if" if="[[_all(selectedMedicationContentWithId ,selectedMedicationContentWithId.isPrescription)]]">
                    <paper-checkbox id="createMedication" on-checked-changed="_createMedication" checked="{{selectedMedicationContentWithId.medicationValue.createMedication}}"> [[localize('create_med','Create medication',language)]]</paper-checkbox>
                    <!-- Create medication <vaadin-checkbox id="createMedication" on-checked-changed="_createMedication"></vaadin-checkbox> -->
                </template>
                <paper-button dialog-confirm="" autofocus="" on-tap="cancel" class="button">[[localize('can','Cancel',language)]]</paper-button>
                <template is="dom-if" if="[[!_all(selectedMedicationContentWithId ,selectedMedicationContentWithId.isPrescription)]]">
                    <paper-button dialog-confirm="" autofocus="" on-tap="endAndClose" class="button button--other">[[localize('clo2','End',language)]]</paper-button>
                    <paper-button dialog-confirm="" autofocus="" on-tap="EOLAndClose" class="button button--other">[[localize('del','Delete',language)]]</paper-button>
                </template>
                <paper-button dialog-confirm="" autofocus="" on-tap="saveAndClose" class="button button--save">[[localize('save','Save',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'medication-details-dialog-old'
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          selectedMedicationContentWithId: {
              type: Object,
              value: null,
              notify: true
          },
          medications: {
              type: Array,
              value: []
          },
          _dayPeriods: {
              type: Array,
              value: () => [
                  "beforebreakfast",
                  "duringbreakfast",
                  "afterbreakfast",
                  "morning",
                  "beforelunch",
                  "afternoon",
                  "duringlunch",
                  "afterlunch",
                  "beforedinner",
                  "duringdinner",
                  "afterdinner",
                  "evening",
                  "night"
              ]
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
          // beginMomentAsString: {
          //     type: String,
          //     value: "",
          //     observer: "_changeBeginMoment"
          // },
          // endMomentAsString: {
          //     type: String,
          //     value: "",
          //     observer: "_changeEndMoment"
          // },
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
          timeUnit:{
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
          posologyString: {
              type: String,
              value: '',
              observer: '_posologyChanged'
          },
          medicationDetail: {
              type: Object,
              value: () => {}
          },
      }
  }

  static get observers() {
      return ['_changeBeginMoment(selectedMedicationContentWithId.beginMomentAsString)','_changeEndMoment(selectedMedicationContentWithId.endMomentAsString)','_regimenChanged(selectedMedicationContentWithId.medicationValue.regimen.*)', '_changeReimbursementItem(reimbursementItem)', '_changeRenewalTimeUnitItem(renewalDurationUnitItem, renewalDurationValue, renewalDecimalValue)', '_selectedMedicationChanged(selectedMedication)'];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  _any(a,b,c,d,e) {
      return a||b||c||d||e
  }

  _ignoreEvent(e) {
      e.stopPropagation()
  }

  _weekly(items) {
      return (items || []).filter(i => i.frequency === 'weekly')
  }

  _monthly(items) {
      return (items || []).filter(i => i.frequency === 'monthly')
  }

  _toggleAddDropDown() {
      this.set('openAddDropDown',!this.openAddDropDown)
  }

  _toggleColDropDown() {
      if (!this.root.querySelector('#add-take').classList.contains('rotate-icon')) {
          this.root.querySelector('#add-take').classList.add('rotate-icon')
      } else {
          this.root.querySelector('#add-take').classList.remove('rotate-icon')
      }
      this.set('openAddColDropDown',!this.openAddColDropDown)
  }

  _regimenChanged() {
      this.set('posologyString',this.api.contact().medication().posologyToString(this.selectedMedicationContentWithId && this.selectedMedicationContentWithId.medicationValue || {}, this.language))
      this.updateGridIfNeeded()
  }

  _selectedMedicationChanged(idx) {
      const medicationDetail = this.medications[idx]
      const medcontent =  this.extractContentWithIdFromMedicationService(this.medications[idx].newMedication, true, this.medications[idx].options.isPrescription)
      this.set('selectedMedicationContentWithId', Object.assign(medcontent, {
          beginMomentAsString : this.api.moment((medcontent && medcontent.medicationValue && medcontent.medicationValue.beginMoment) || (medicationDetail.newMedication && medicationDetail.newMedication.valueDate) || (medicationDetail.newMedication && medicationDetail.newMedication.openingDate) || Date.now()).format('YYYY-MM-DD') || null,
          endMomentAsString: this.api.moment((medcontent && medcontent.medicationValue && medcontent.medicationValue.endMoment) || (medicationDetail.newMedication && medicationDetail.newMedication.closingDate)) ? this.api.moment(medcontent.medicationValue.endMoment || (medicationDetail.newMedication && medicationDetail.newMedication.closingDate)).format("YYYY-MM-DD") : null
      }))
      this._initSelectedMedicationContentWithId()
      this.set('medicationDetail', Object.assign(
          medicationDetail,
          {
              bufferUnit: this.selectedMedicationContentWithId.medicationUnit || this.localize('generic_unit', 'unit', this.language),
              medicPriority : this.selectedMedicationContentWithId.medicationValue.priority === "high" ? 2 : this.selectedMedicationContentWithId.medicationValue.priority === "middle" ? 1 : 0,
              reimbursementItemIdx: this.selectedMedicationContentWithId.medicationValue.reimbursementReason ? this.reimbursementCodeRecipe.findIndex(idx => idx.code === this.selectedMedicationContentWithId.medicationValue.reimbursementReason.code) : this.reimbursementCodeRecipe.findIndex(idx => idx.code === "notreimbursable"),
              isRenewal : !!this.selectedMedicationContentWithId.medicationValue.renewal,
              renewalDecimalValue : this.isRenewal ? this.selectedMedicationContentWithId.medicationValue.renewal && this.selectedMedicationContentWithId.medicationValue.renewal.decimal ? this.selectedMedicationContentWithId.medicationValue.renewal.decimal : 1 : null,
              renewalDurationValue : this.isRenewal ? this.selectedMedicationContentWithId.medicationValue.renewal && this.selectedMedicationContentWithId.medicationValue.renewal.duration.value ? this.selectedMedicationContentWithId.medicationValue.renewal.duration.value : 1 : null,
              renewalTimeUnitIdx : this.isRenewal ? this.selectedMedicationContentWithId.medicationValue.renewal ? this.timeUnit.findIndex(idx => idx.code === this.selectedMedicationContentWithId.medicationValue.renewal.duration.unit.code) : this.timeUnit.findIndex(idx => idx.code === "mo") : null
          }
      ))
  }

  _posologyChanged(newValue, oldValue) {
      if(!this.selectedMedicationContentWithId || !this.selectedMedicationContentWithId.medicationValue) {
          return;
      }
      const fetchedValue = this.api.contact().medication().posologyToString(this.selectedMedicationContentWithId.medicationValue, this.language)
      if(newValue !== fetchedValue) {
          this.set('selectedMedicationContentWithId.medicationValue.instructionForPatient', newValue)
      }
  }

  _all(a,b) { return a && b }

  _regimenLines() {
      return this.selectedMedicationContentWithId && this.selectedMedicationContentWithId.medicationValue && this.selectedMedicationContentWithId.medicationValue.regimen || []
  }

  _pad2(n) {
      return n<10 ? '0'+n : ''+n
  }

  _formatTime(timeOfDay) {
      return timeOfDay >= 0 && timeOfDay <= 240000 ? `${this._pad2(Math.floor(timeOfDay / 10000))}:${this._pad2(Math.floor(timeOfDay/100) % 100)}` : ''
  }

  _changeTimeOfDay(event) {
      const rgModel = this.root.querySelector("#rgRepeat").modelForElement(event.target)
      if (!rgModel) {
          return
      }
      rgModel.set('rg.timeOfDay', event.target && (
          event.target.value.match(/^[0-9]+[:hH][0-9]+$/) && Number(event.target.value.replace(/[:hH]/g,'')*100)
          || event.target.value.match(/^[0-9]+[hH]$/) && Number(event.target.value.replace(/[hH]/g,'')*10000)
      ) || null)

      this.updateGridIfNeeded()
  }

  extractContentWithIdFromMedicationService(m, isNew, isPres) {
      return {
          id: m.id,
          codes: m.codes,
          medicationValue:
          (
              this.api.contact().preferredContent(m, this.language)  ||
              ( m.content[this.language] =
                      {
                          medicationValue: { regimen: [] }
                      }
              )
          ).medicationValue,
          isNew: isNew || false,
          isPrescription: m.isPrescription || isPres || false,
          createMedication: m.options && m.options.createMedication || false
      };
  }

  open(medicationDetail, selectedMedicationContentWithId, boxes) {
      //console.log("open medication-details:", medicationDetail, selectedMedicationContentWithId, boxes)
      ;(!this.reimbursementCodeRecipe || this.reimbursementCodeRecipe.length === 0 || !this.timeUnit || this.timeUnit.length === 0 ? this.api.code().findPaginatedCodes('be', 'CD-REIMBURSEMENT-RECIPE', '')
          .then(reimb => this.set("reimbursementCodeRecipe", _.orderBy(reimb.rows, ['label.fr'], ['asc'])))
          .then(() => this.api.code().findPaginatedCodes('be', 'CD-TIMEUNIT', ''))
          .then(timeunit => this.set("timeUnit", _.orderBy(_.filter(_.get(timeunit, "rows", []), i => ["ns", "us", "ms", "s", "min"].indexOf(_.trim(_.get(i, "code"))) == -1), ['label.fr'], 'asc'))) : Promise.resolve())
          .finally(() => {
              if (medicationDetail) {
                  let idx = this.medications.indexOf(medicationDetail);
                  if (idx > -1) {
                      this._selectedMedicationChanged(idx)
                  } else {
                      const preferredContent = this.api.contact().preferredContent(medicationDetail, this.language)

                      if (!selectedMedicationContentWithId || !selectedMedicationContentWithId.isNew) { // selectedMedicationContentWithId.isNew==false when opening an existing medication
                          // do not set a default date if not defined, for the user to see when a medication has no date
                          const start = (preferredContent && preferredContent.medicationValue && preferredContent.medicationValue.beginMoment)
                              || (medicationDetail.valueDate)
                              || (medicationDetail.openingDate)
                          const end = (preferredContent && preferredContent.medicationValue && preferredContent.medicationValue.endMoment)
                              || (medicationDetail.closingDate)
                          selectedMedicationContentWithId = this.extractContentWithIdFromMedicationService(medicationDetail, false)
                          selectedMedicationContentWithId.beginMomentAsString = start && this.api.moment(start).format('YYYY-MM-DD') || null
                          selectedMedicationContentWithId.endMomentAsString = end && this.api.moment(end).format('YYYY-MM-DD') || null
                      } else { // new medication, should set a default start date
                          selectedMedicationContentWithId.beginMomentAsString = this.api.moment(Date.now()).format("YYYY-MM-DD")
                      }

                      this.set('selectedMedicationContentWithId', selectedMedicationContentWithId)
                      this._initSelectedMedicationContentWithId()
                      this.set('previousMedication', this.selectedMedicationContentWithId)
                      this.set('medicationDetail', {
                          boxes: boxes || 1,
                          bufferUnit: this.selectedMedicationContentWithId.medicationUnit || this.localize('generic_unit', 'unit', this.language),
                          medicPriority: this.selectedMedicationContentWithId.medicationValue.priority === "high" ? 2 : this.selectedMedicationContentWithId.medicationValue.priority === "middle" ? 1 : 0,
                          reimbursementItemIdx: this.selectedMedicationContentWithId.medicationValue.reimbursementReason ? this.reimbursementCodeRecipe.findIndex(idx => idx.code === this.selectedMedicationContentWithId.medicationValue.reimbursementReason.code) : this.reimbursementCodeRecipe.findIndex(idx => idx.code === "notreimbursable"),
                          isRenewal: !!this.selectedMedicationContentWithId.medicationValue.renewal,
                          renewalDecimalValue: this.isRenewal ? this.selectedMedicationContentWithId.medicationValue.renewal && this.selectedMedicationContentWithId.medicationValue.renewal.decimal ? this.selectedMedicationContentWithId.medicationValue.renewal.decimal : 1 : null,
                          renewalDurationValue: this.isRenewal ? this.selectedMedicationContentWithId.medicationValue.renewal && this.selectedMedicationContentWithId.medicationValue.renewal.duration.value ? this.selectedMedicationContentWithId.medicationValue.renewal.duration.value : 1 : null,
                          renewalTimeUnitIdx: this.isRenewal ? this.selectedMedicationContentWithId.medicationValue.renewal ? this.timeUnit.findIndex(idx => idx.code === this.selectedMedicationContentWithId.medicationValue.renewal.duration.unit.code) : this.timeUnit.findIndex(idx => idx.code === "mo") : null,
                          newMedication: medicationDetail,
                          options: {
                              createMedication: this.selectedMedicationContentWithId.createMedication,
                              isPrescription: this.selectedMedicationContentWithId.isPrescription
                          }
                      })
                  }

                  this.set('medicationMustBeCreated', false)
                  this.set('openAddDropDown', false)

                  this.$['medication-detail'].open()
              }
          })
  }

  _initSelectedMedicationContentWithId(){
      this.selectedMedicationContentWithId.medicationValue && !this.selectedMedicationContentWithId.medicationValue.regimen ? this.set('selectedMedicationContentWithId.medicationValue.regimen', []) : null
  }

  openList(list) {
      // ------------------if we want to create an array even when we have only one medication selected
      // list && list.length > 0 ? this.set('medications', _.clone(list)) : (list.newMedication && this.set('medications',[list])) || this.set('medications', [])
      // ----------------------------------------------------------------------------------------------
      list && list.length > 0 ? this.set('medications', _.clone(list)) : this.set('medications', [])
      if (this.medications.length) {
          this.open(this.medications[0], this.extractContentWithIdFromMedicationService(this.medications[0].newMedication, true, this.medications[0].options.isPrescription), this.medications[0].boxes);
          this.set('selectedMedication',0)
      }
  }

  _clearPosologyRegimen(event) {
      if (this.selectedMedicationContentWithId.medicationValue.regimen.length > 1) {
          this.splice('selectedMedicationContentWithId.medicationValue.regimen', event.target.dataset.item, 1)
      }
  }

  _formatGridLabels(str) {
      if (str) {
          moment.locale(this.language)
          const string = str.toLowerCase()
          return string.includes('custom') ? string.replace(/custom/i,this.localize('custom','custom_moment',this.language)) :
              string.includes('before') ? string.replace(/before/i,'') :
                  string.includes('during') ? string.replace(/during/i,'') :
                      string.includes('after') ? string.replace(/after/i,'') :
                          string.includes('day') ? moment(string,'dddd') :
                              str
      }
  }

  updateGridIfNeeded() {
      const grid = this.root.querySelector('#selectedMedicationTable')
      const gridRgs = _.flatMap(this.regimenTable, line => [line.beforeMeal,line.duringMeal,line.afterMeal])

      grid && this.selectedMedicationContentWithId
      && this.selectedMedicationContentWithId.medicationValue
      && this.selectedMedicationContentWithId.medicationValue.regimen
      && grid.clearCache();
  }

  _addRegimen(e) {
      if (!this.selectedTab) {
          this._toggleAddDropDown()
      } else {
          //TODO And what about substance products or compounds
          if (!this.selectedMedicationContentWithId.medicationValue.regimen) { this.set('selectedMedicationContentWithId.medicationValue.regimen', []) }
          this._pushRegimen(e)
      }
  }

  _addCustomDayPeriod(event) {
      this.root.querySelector('#add-take').classList.remove('rotate-icon')
      let medicationValue = this.selectedMedicationContentWithId && this.selectedMedicationContentWithId.medicationValue
      if (medicationValue && medicationValue.regimen && !medicationValue.regimen.some(r => r.frequency === 'daily'
          && (r.dayPeriod && event.detail.value && r.dayPeriod.code === event.detail.value || event.target.id === 'add-custom-time' && this.customTime && r.timeOfDay === this.customTime))) {
          this.push('selectedMedicationContentWithId.medicationValue.regimen', _.assign({
              frequency: 'daily',
              administratedQuantity: {
                  time: null,
                  quantity: 1,
                  unit: this.medicationDetail && this.medicationDetail.bufferUnit || this.localize('generic_unit', 'unit', this.language)
              }
          }, event.target.id === 'add-custom-time' ? {timeOfDay: Number((moment(this.customTime,['HH:mm','HHmm']) || moment()).format('HHmmss') || '120000')} :
              {dayPeriod: {type: "CD-DAYPERIOD", code: event.detail.value}}))
          this.updateGridIfNeeded()
      }
      this.set('openAddColDropDown', false)

      this.set('tempColToAdd', null)
  }

  _pushRegimen(e) {
      //if (e.target.dataset.item == 'weekly' || e.target.dataset.item == 'monthly') this.set('selectedTab',1)
      const dropDownSelectedFreq = e.target.dataset.item;
      if (!this.selectedMedicationContentWithId.medicationValue) {this.set('selectedMedicationContentWithId.medicationValue', {})}
      if (!this.selectedMedicationContentWithId.medicationValue.regimen) {this.set('selectedMedicationContentWithId.medicationValue.regimen', [])}
      this.push('selectedMedicationContentWithId.medicationValue.regimen', {
          frequency: dropDownSelectedFreq ? dropDownSelectedFreq : this.bufferGeneralFrequency === 2 ? 'monthly' : this.bufferGeneralFrequency === 1 ? 'weekly' : 'daily',
          administratedQuantity: {
              time: null,
              quantity: dropDownSelectedFreq ? 1 :this.bufferQuantity,//quantity: !reg[0] || reg[0].administratedQuantity.quantity === 0 ? this.bufferQuantity : reg[0].administratedQuantity.quantity,
              unit: this.medicationDetail && this.medicationDetail.bufferUnit || this.localize('generic_unit', 'unit', this.language)
          }
      })
      this.updateGridIfNeeded()
  }

  _localize(s) {
      return this.api.contact().medication().localize(s, this.language)
  }

  _changeBeginMoment() {
      if (this.selectedMedicationContentWithId && this.selectedMedicationContentWithId.beginMomentAsString) { // begin moment can NOT be empty
          const beginMoment = parseInt(this.selectedMedicationContentWithId.beginMomentAsString.replace(/(....)-(..)-(..)/, '$1$2$3'))
          this.set("selectedMedicationContentWithId.medicationValue.beginMoment", beginMoment)
      }
  }

  _changeEndMoment() {
      if (this.selectedMedicationContentWithId && this.selectedMedicationContentWithId.endMomentAsString != null) { // end moment can be empty string
          const endMoment = parseInt(this.selectedMedicationContentWithId.endMomentAsString.replace(/(....)-(..)-(..)/, '$1$2$3'))
          this.set("selectedMedicationContentWithId.medicationValue.endMoment", endMoment)
      }
  }

  _changeMedicPriority() {
      // console.log('_changeMedicPriority')
      if (this.selectedMedicationContentWithId) {
          const priority = this.selectedMedicationContentWithId.medicationValue.priority?
                          this.selectedMedicationContentWithId.medicationValue.priority=== 2 ? 'high' :
                          this.selectedMedicationContentWithId.medicationValue.priority=== 1 ? 'middle' : 'low' :
                          'low'
          this.set("selectedMedicationContentWithId.medicationValue.priority", priority)
      }
  }

  _selectSingleQuantity(event) {
      this.updateGridIfNeeded()
  }

  _selectSingleQuantityFromTable(event) {
      if (!this.selectedMedicationContentWithId.medicationValue.regimen) { this.set('selectedMedicationContentWithId.medicationValue.regimen', []) }
      this.regimenTable.reduce((refresh, line) =>
          refresh || [line.morning,line.midday,line.evening].filter(x=>!!x).reduce((refresh,rg) => {
              if (rg.administratedQuantity && Number(rg.administratedQuantity.quantity) > 0) {
                  const idx = this.selectedMedicationContentWithId.medicationValue.regimen.indexOf(rg)
                  if (!(idx>=0)) {
                      this.push('selectedMedicationContentWithId.medicationValue.regimen', rg)
                      return true
                  } else {
                      this.notifyPath(`selectedMedicationContentWithId.medicationValue.regimen.${idx}.administratedQuantity.quantity`)
                  }
              } else if (rg.administratedQuantity && Number(rg.administratedQuantity.quantity) === 0) {
                  const idx = this.selectedMedicationContentWithId.medicationValue.regimen.indexOf(rg)
                  if (idx>=0) {
                      this.splice('selectedMedicationContentWithId.medicationValue.regimen', idx, 1)
                  }
              }
              return false
          }, false)
      , false) && (console.log('Regimen changed'))
  }

  _selectDayPeriod(event){
      // console.log("select day period",event,target)
      const rgModel = this.root.querySelector("#rgRepeat").modelForElement(event.target)
      if (!rgModel) {
          return
      }
      rgModel.set('rg.dayPeriod', {type: "CD-DAYPERIOD", code: event.detail.value})

      this.updateGridIfNeeded()
  }

  _selectWeekPeriod(event, target) {
      // console.log("select week period",event,target)
      const rgModel = this.root.querySelector("#rgRepeat").modelForElement(event.target)
      if (!rgModel) {
          return
      }
      rgModel.set('rg.weekPeriod', {type: "CD-WEEKPERIOD", code: (target.item)?target.item.id:'error'})
  }

  _isEqual(a,b) {return (a === b)}

  _strContains(str,test) {return str ? test ? str.includes(test) : false : false}

  _toggleAddDropDown() {this.set('openAddDropDown',!this.openAddDropDown)}

  _formatFreq(freq) {return (freq == 'monthly') ? 2 : (freq == 'weekly') ? 1 : 0}

  _selectTakeQuantity() {this.set('bufferNumberByFrequency',this.bufferNumberByFrequency <= 0 ? 1 : this.bufferNumberByFrequency)}

  cancel() {
      this.close()
  }

  EOLAndClose(){
      const today = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"))
      this.set("medicationDetail.newMedication.endOfLife", today)
      this.save()
      this.close()
  }

  endAndClose(){
      const yesterday = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"))
      this.set("selectedMedicationContentWithId.medicationValue.endMoment", yesterday)
      this.save()
      this.close()
  }

  saveAndClose() {
      this.save() // instant save
      this.close()
  }

  close() {
      this.set("selectedMedicationContentWithId", null)
      this.set('medications', [])
  }

  save() {
      this._valueChanged()
  }

  _valueChanged() {
      console.log("_valueChanged()",this.medicationDetail)
      this.dispatchEvent(new CustomEvent('value-changed', {detail: {medication: this.medicationDetail, medications:this.medications}, bubbles: true, composed: true}))
  }

  _regimenTableDataProvider(frequency) {

      const getTimeOfDayRegimen = (regimen, frequency, relativetime, scores) => {

          const empty = (meal) => ({
              administratedQuantity: { quantity: 0 },
              dayPeriod: {type: "CD-DAYPERIOD", code: relativetime + meal},
              frequency: "daily"
          })

          const morning = (regimen || []).find(r => ( r.frequency || 'daily' ) === frequency && this.selectRegimen(scores, r, 0     , 105959)) || empty('breakfast')
          const midday  = (regimen || []).find(r => ( r.frequency || 'daily' ) === frequency && this.selectRegimen(scores, r, 110000, 155959)) || empty('lunch')
          const evening = (regimen || []).find(r => ( r.frequency || 'daily' ) === frequency && this.selectRegimen(scores, r, 160000, 240000)) || empty('dinner')
          return {morning, midday, evening}
      }

      const getBeforeDuringAfterMeal = (regimen, frequency, scores) => {
          const meals = ['breakfast', 'lunch', 'dinner']
          const beforeMeal = (regimen || []).filter(r => ( r.frequency || 'daily' ) === frequency && meals.find(m => (r.dayPeriod && r.dayPeriod.code || "").includes('before' + m)))
          const duringMeal = (regimen || []).filter(r => ( r.frequency || 'daily' ) === frequency && meals.find(m => (r.dayPeriod && r.dayPeriod.code || "").includes('during' + m)))
          const afterMeal  = (regimen || []).filter(r => ( r.frequency || 'daily' ) === frequency && meals.find(m => (r.dayPeriod && r.dayPeriod.code || "").includes('after'  + m)))

          const extras = (regimen || []).filter(r => ( r.frequency || 'daily' ) === frequency && !meals.find(m => ['before'+m,'during'+m, 'after'+m].includes((r.timeOfDay || r.dayPeriod && r.dayPeriod.code)))) || []

          return {beforeMeal, duringMeal, afterMeal, extras}
      }

      return (params, callback) => {
          if (!this.get('selectedMedicationContentWithId.medicationValue')) { callback([], 0); return }

          const startIndex = params.page * params.pageSize
          const regs = this.selectedMedicationContentWithId.medicationValue.regimen

          const scores = this.api.contact().medication().regimenScores()

          const {beforeMeal, duringMeal, afterMeal, extras} = getBeforeDuringAfterMeal(regs, frequency, scores)
          const beforeMealRegimens = getTimeOfDayRegimen(beforeMeal, frequency, 'before', scores)
          const duringMealRegimens = getTimeOfDayRegimen(duringMeal, frequency, 'during', scores)
          const afterMealRegimens  = getTimeOfDayRegimen(afterMeal , frequency, 'after' , scores)


          let tempRegimenTable = [
              {moment:this.localize('beforemeal','before meal'), regimens: beforeMeal, morning: beforeMealRegimens.morning, midday: beforeMealRegimens.midday, evening: beforeMealRegimens.evening},
              {moment:this.localize('duringmeal','during meal'), regimens: duringMeal, morning: duringMealRegimens.morning, midday: duringMealRegimens.midday, evening: duringMealRegimens.evening},
              {moment:this.localize('aftermeal','after meal')  , regimens: afterMeal , morning: afterMealRegimens.morning , midday: afterMealRegimens.midday , evening: afterMealRegimens.evening }
          ]

          const extraLines = {before: [], after: []}

          ;[[0,scores.duringbreakfast,scores.duringbreakfast + 1,105959], [110000,scores.duringlunch,scores.duringlunch+1,155959], [160000,scores.duringdinner,scores.duringdinner+1,240000]].forEach((quad,idx) => {

              const extraBefore = extras.filter(r => this.selectRegimen(scores, r, quad[0],  quad[1]))
              const extraAfter  = extras.filter(r => this.selectRegimen(scores, r, quad[2],  quad[3]))

              if(extraBefore.length || extraAfter.length) {

                  const createGridObject = (rg) => ({moment:this.localize(rg.dayPeriod && rg.dayPeriod.code || null, rg.dayPeriod && rg.dayPeriod.code || this._formatTime(rg.timeOfDay)), regimens: [rg], morning: idx === 0 && rg || null, midday: idx === 1 && rg || null, evening: idx === 2 && rg || null })

                  extraBefore.length && extraLines.before.push(...extraBefore.map(createGridObject))
                  extraAfter.length  && extraLines.after.push(...extraAfter.map(createGridObject))

              }
          })

          const tempRegimenTableWithExtras = []
          tempRegimenTableWithExtras.push(...(_.sortBy(extraLines.before.filter(x => !!x.regimens), rg => rg.regimens[0].timeOfDay || rg.regimens[0].dayPeriod && rg.regimens[0].dayPeriod.code && scores[rg.regimens[0].dayPeriod.code] || 0)))
          tempRegimenTableWithExtras.push(...tempRegimenTable)
          tempRegimenTableWithExtras.push(...(_.sortBy(extraLines.after.filter( x => !!x.regimens), rg => rg.regimens[0].timeOfDay || rg.regimens[0].dayPeriod && rg.regimens[0].dayPeriod.code && scores[rg.regimens[0].dayPeriod.code] || 0)))

          this.regimenTable = tempRegimenTableWithExtras

          callback(this.regimenTable.slice(startIndex, startIndex + params.pageSize), this.regimenTable.length)
      }
  }

  selectRegimen(scores, rg, start, end) {
      const s = rg.timeOfDay || rg.dayPeriod && rg.dayPeriod.code && scores[rg.dayPeriod.code] ||  0
      return s >= start && s <= end
  }

  _getCodeLabel(code){
      return code && code[this.language]
  }

  _changeReimbursementItem(item){
      if(item && item.id){
          const reimbursementItem = this.reimbursementCodeRecipe.find(r => r.id === item.id)
          this.set("selectedMedicationContentWithId.medicationValue.reimbursementReason", reimbursementItem)
      }
  }

  _substitutionAllowedChanged(e){
      this.set('selectedMedicationContentWithId.medicationValue.substitutionAllowed', e.target.checked)
  }

  _renewalValueChanged(e){
      this.set('selectedMedicationContentWithId.medicationValue.isRenewal', e.target.checked)
      if(e.target.checked === false){
          this.set("selectedMedicationContentWithId.medicationValue.renewal", null)
      }
  }

  _changeRenewalTimeUnitItem(item, unitValue, decimalValue){
      if(item && item.id){
          const timeUnitItem = this.timeUnit.find(r => r.id === item.id)
          this.set("selectedMedicationContentWithId.medicationValue.renewal", {
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
      this.set('selectedMedicationContentWithId.medicationValue.createMedication', e.target.checked)
  }

  _medicationName(svc) {
      return this.api.contact().medication().medicationNameToString(this.api.contact().preferredContent(svc, this.language).medicationValue) || ''
  }
}

customElements.define(MedicationDetailsDialogOld.is, MedicationDetailsDialogOld)
