import '../../../../styles/scrollbar-style.js';
import '../../../../styles/spinner-style.js';
import '../../../../styles/buttons-style.js';
import '../../../../styles/dialog-style.js';
import '../../../ht-spinner/ht-spinner.js';
import './ht-pat-mcn-chapteriv-verse.js';
import moment from 'moment/src/moment'

class HtPatMcnChapterIVAgreement extends Polymer.TkLocalizerMixin(Polymer.mixinBehaviors([Polymer.IronResizableBehavior], Polymer.Element)) {
  static get template() {
    return Polymer.html`
        <style include="scrollbar-style spinner-style buttons-style dialog-style">
            #dialog {
                min-height: 600px;
                min-width: 800px;
                height: 80%;
                width: 80%;
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
                top: 4px;
            }

            .container {
                margin: 0;
                padding: 0;
                display: grid;
                height: 100%;
                width: 100%;
                grid-template-columns: 25% auto;
                grid-template-rows: 100%;
                box-sizing: border-box;
                border-bottom: 1px solid var(--app-background-color-dark);
            }

            .list-panel {
                height: 100%;
                background: var(--app-background-color);
                grid-column: 1/2;
                grid-row: 1/1;
                display: inline-grid;
                grid-template-columns: 1fr;
                grid-template-rows: auto 1fr 48px;
                margin-top: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .list-panel.search-load-container-collapsed {
                grid-template-rows: calc(40px + 8px) 1fr 48px;
            }

            .searchLoadContainer{
                grid-column: 1/1;
                grid-row: 1/1;
                display: flex;
                flex-flow: row wrap;
                padding: 0 12px;
            }

            .searchLoadContainer .tool{
                height: 57px;
                margin: 0;
            }

            .searchLoadContainer vaadin-date-picker.tool{
                width: calc(50% - 8px);
                box-sizing: border-box;
            }

            #_chapter_listbox{
                outline: 0;
                background: transparent;
                padding: 8px 24px;
                grid-column: 1/1;
                grid-row: 2/2;
                overflow-y: auto;
                overflow-x: hidden;
                --paper-listbox-selected-item: {
                    color: var(--app-text-color-light);
                    background: var(--app-primary-color);
                };
            }

            .bottom-btn-container {
                width: 100%;
                height: 100%;
                grid-column: 1/1;
                grid-row: 3/3;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding: 4px 0;
                box-sizing: border-box;
            }

            .detail-panel {
                height: 100%;
                margin: 0;
                grid-column: 2/2;
                grid-row: 1/1;
                padding: 8px 24px;
                box-sizing: border-box;
                position: relative;
                display: inline-grid;
                grid-template-columns: 1fr;
                grid-template-rows: 56px calc(100% - 56px);
            }

            .detail-panel vaadin-combo-box {
                grid-column: 1/1;
                grid-row: 1/1;
                width: 100%;
                height: 72px;
                position: relative;
            }

            .detail-panel .paragraph{
                grid-column: 1/1;
                grid-row: 2/2;
                display:flex;
                flex-flow: column nowrap;
                justify-content: space-between;
            }

            iron-pages{
                align-self: stretch;
                overflow-y: overlay;
                flex-grow: 1;
            }

            page {
                height:100%;
            }

            .detail-panel div.paragraph-content {
                position: relative;
                text-align: justify;
                padding: 0 24px;
                overflow-y: auto;
            }

            .chapterDateInfo {
                font-size: 12px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                padding: 4px 0;
                max-height: 24px;
            }
            .chapterDateInfo > div{
                height: 100%;
                max-height: 24px;
            }

            .chapterDateInfo span {
                margin-left: 4px;
            }

            .chapterDateInfoIcon {
                height: 14px;
                width: 14px;
            }

            .chapter-text {
                background: transparent;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                width: 100%;
                height: 100%;
                padding: 0;
                overflow: hidden;
            }

            .chapter-text:focus::before, .chapter-text:focus::after {
                background: transparent;
            }

            .chapter-text-row p {
                width: 100%;
                text-overflow: ellipsis;
                overflow-x: hidden;
                white-space: nowrap;
            }

            .chapter-text-row h4 {
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow-x: hidden;         }


            .chapter-item .chapter-text-row {
                width: calc(100% - 32px);
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                font-size: 12px;
                @apply --padding-right-left-16;
            }

            .chapter-text-date {
                justify-content: space-between !important;
                position: relative;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, .1);
                @apply --padding-right-left-16;
                color: var(--app-text-color-disabled);
                height: 24px;
            }

            paper-material.iron-selected > .chapter-text > .chapter-text-date {
                color: var(--app-text-color-light) !important;
            }

            .chapter--big {
                min-height: 96px;
                outline: 0;
                /*@apply --padding-16;*/
                /*border-bottom: 1px solid var(--app-background-color-dark);*/
            }

            .chapter--small {
                min-height: 32px;
                /*@apply --padding-right-left-16;*/
                padding-bottom: 8px;
            }

            .chapter--small .chapter-text-row:nth-child(2) {
                justify-content: space-between;
            }

            .chapter--small .chapter-text-row:last-child {
                display: none;
            }

            .chapter--small .he-dots-container {
                display: none;
            }



            .bottom-btn {
                padding: 0 12px;
            }

            .message {
                height: 40px;
                padding: 0 24px;
                flex-grow: 2;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: flex-start;
            }

            .warning {
                color: #c8a100;
                background: #fcdf3521;
                padding: 0 8px;
                font-weight: bold;
                width: fit-content;
            }

            .error {
                color: var(--app-error-color);
                background: #e539353b;
                font-weight: bold;
                border-radius: 2px;
                width: 100%;
                box-sizing: border-box;
            }

            paper-listbox {
                background: transparent;
            }

            .addedDocuments {
                position: absolute;
                top: 16px;
                right: 16px;
            }

            ul {
                list-style: none;
            }

            ul.outer-ul {
                padding-left: 0;
            }

            iron-icon.smaller {
                padding-right: 8px;
                width: 16px;
                height: 16px;
            }

            paper-button[disabled] {
                background-color: var(--app-secondary-color-dark);
                color: var(--app-text-color-disabled);
                box-shadow: none;
            }

            paper-tabs {
                height: 40px;
                min-height: 40px;
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                --paper-tabs: {
                    color: var(--app-text-color);
                };
            }

            paper-tab {
                --paper-tab-ink: var(--app-secondary-color);
            }

            paper-tab.iron-selected {
                font-weight: bold;
            }

            paper-tab.iron-selected iron-icon {
                opacity: 1;
            }

            paper-tab iron-icon {
                opacity: 0.5;
                color: var(--app-text-color);
            }

            .detail-panel .tool-container {
                width: calc(100% - 48px);
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: flex-start;
                box-sizing: border-box;
                margin: 0 8px;
                height: 103px;
                min-height: 103px;
            }

            .detail-panel .btns-container{
                padding: 4px 0;
            }

            vaadin-date-picker {
                min-width: 132px;
            }

            .tool {
                padding: 0 4px;
                flex-grow: 1;
                height: 50%;
            }

            tk-token-field.tool {
                min-width: 180px;
                height: 80px;
                flex-grow: 3;
            }
            vaadin-checkbox.tool{
                height: auto;
            }

            #appendix-upload-container {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
                display: none;
            }

            vaadin-upload {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: 16px 16px 0;
                min-height: 280px;
                background: var(--app-background-color);
                --vaadin-upload-buttons-primary: {
                    height: 28px;
                };
                --vaadin-upload-button-add: {
                    border: 1px solid var(--app-secondary-color);
                    color: var(--app-secondary-color);
                    background: transparent;
                    font-weight: 500;
                    font-size: var(--font-size-normal);
                    height: 28px;
                    padding: 0 12px;
                    text-transform: capitalize;
                    background: transparent;
                    box-sizing: border-box; 
                    border-radius: 3px;
                };
                --vaadin-upload-file-progress: {
                    --paper-progress-active-color: var(--app-secondary-color);
                };
                --vaadin-upload-file-commands: {
                    color: var(--app-primary-color);
                }

            }

            .close-button-icon {
                position: absolute;
                top: 16px;
                right: 16px;
                margin: 0;
                transform: translate(50%, -50%);
                height: 32px;
                width: 32px;
                padding: 8px;
                background: var(--app-primary-color);
            }

            .chapter-item {
                height: 90px;
                width: auto;
                box-shadow: var(--shadow-elevation-3dp_-_box-shadow);
                margin-top: 12px;
            }

            .chapter-item h4 {
                font-size: 14px;
                font-weight: 600;
                margin: 0;
                -webkit-user-select: none; /* Chrome/Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+ */

                /* Rules below not implemented in browsers yet */
                -o-user-select: none;
                user-select: none;

            }

            .ichapter-item .label-container {
                display: flex;
                flex-flow: row nowrap;
            }

            .chapter-item.iron-selected {
                background: var(--app-primary-color);
                color: var(--app-light-color);
                @apply --text-shadow;
            }

            .chapter-item:first-child {
                margin-top: 0;
            }

            .chapter-item:nth-of-type(1) .chapter-text-row p {
                padding-right: 32px;
            }

            .chapter-item .colour-code:not(:first-child) {
                margin-left: 4px;
            }

            .chapter-item p {
                @apply --paper-font-body1;
                margin: 0;
                -webkit-user-select: none; /* Chrome/Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+ */

                /* Rules below not implemented in browsers yet */
                -o-user-select: none;
                user-select: none;
            }

            .chapter-item-title {
                height: 20px;
                width: auto;
                background: rgba(0, 0, 0, .1);
            }



            .layout.vertical {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
            }

            .ch4AcceptedStatus {
                height: 10px;
                width: 10px;
                color: var(--app-status-color-ok);
            }

            .ch4PendingStatus {
                height: 10px;
                width: 10px;
                color: var(--app-status-color-pending);
            }

            .ch4RejectedStatus{
                height: 10px;
                width: 10px;
                color: var(--app-status-color-ko);
            }

            .accepted-status {
                background: #00f9743b;
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                width: auto;
                font-size: 12px;
                line-height: 16px;
            }
            .pending-status {
                background: #fcdf354d;
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                width: auto;
                font-size: 12px;
                line-height: 16px;
            }

            .rejected-status{
                background: rgba(252, 39, 31, 0.3);
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                width: auto;
                font-size: 12px;
                line-height: 16px;
            }

            .chapter-list-spinner {
                grid-column: 1/1;
                grid-row: 2/2;
                place-self: center center;
            }

            .paragraph-spinner {
                position: absolute;
                grid-column: 1/1;
                grid-row: 2/2;
                place-self: center center;
            }

            .ioref-icon{
                opacity: 0.7;
                transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .ioref-icon:hover{
                opacity: 1;
            }

            .searchLoadContainer .search-load-container-collapsed {
                max-height: 40px;
                overflow-y: hidden;
            }

            .options-bar {
                position: relative;
                text-overflow: ellipsis;
                overflow-x: hidden;
                white-space: nowrap;
                width: 100%;
                height: 40px;
                padding: 8px 0;
            }

            .options-bar paper-icon-button {
                position: absolute;
                right: 0;
                top: 0;
            }
            .small-text {
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                text-decoration: none;
                font-weight: lighter;
                font-size: 0.8em;
            }
            ht-spinner.asking {
                top: 12px;
                left: 5px;
                position: relative;
                height: 42px;
                width: 42px;
            }

            ht-spinner{
                height: 30px;
                width: 30px;
            }

            div.one-line {
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                flex-wrap: wrap;
            }
            div.one-line > .fleft {
                flex: 1 0 25%;
                flex-grow: 1;
                border: .5px solid var(--app-background-color-dark);
                box-sizing: border-box;
                padding: 4px 12px;
                box-sizing: border-box;
                text-align: left;
            }
            /*div.one-line *:not(:first-child) {*/
                /*margin-left: gutter;*/
            /*}*/
            h4 {
                clear: both;
                font-size: 1.5em;
            }
            #medications-list {
                height: auto;
                margin: 8px auto;
            }

            .invalid {
                background: rgba(252, 39, 31, 0.3) !important;
            }

            .willBeInvalid {
                background: #fcdf354d !important;
            }

            @media (max-width: 1025px) {
                .list-panel {
                    overflow-x: auto;
                }
            }

        </style>

        <!--<paper-dialog id="dialog" opened="{{opened}}">-->
            <!--<h2 class="modal-title">[[localize('chap-iv','Chapter IV',language)]]</h2>-->
            <div class="container">
                <div class\$="list-panel [[searchLoadContainerClass(searchLoadContainerCollapsed)]]">
                    <div class="searchLoadContainer">
                        <div class\$="[[searchLoadContainerClass(searchLoadContainerCollapsed)]]">
                            <div class="chapter-text-row grey options-bar">
                                [[_formatDateShort(consultationStartDateAsString)]] - [[_formatDateShort(consultationEndDateAsString)]] - [[_formatParagraph(selectedLoadParagraph, language)]]
                                <paper-icon-button class="menu-item-icon" icon="hardware:keyboard-arrow-down" hover="none" on-tap="toggleMenu"></paper-icon-button>
                            </div>
                            <vaadin-date-picker class="tool" i18n="[[i18n]]" initial-position="[[initialFrom]]" label="[[localize('from','From',language)]]" value="{{consultationStartDateAsString}}"></vaadin-date-picker>

                            <vaadin-date-picker class="tool" i18n="[[i18n]]" initial-position="[[initialTo]]" label="[[localize('to','To',language)]]" value="{{consultationEndDateAsString}}"></vaadin-date-picker>

                            <paper-input class="tool" label="[[localize('par','Paragraph',language)]]" value="{{selectedLoadParagraph}}"></paper-input>
                        </div>
                    </div>
                    <paper-listbox id="_chapter_listbox" selectable="paper-material" selected="{{selectedAgreementIndex}}">
                        <template is="dom-repeat" items="[[_agreements(convertedMedications.*, orphanAgreements.*)]]">
                            <paper-material class="layout vertical chapter-item chapter--big" id="[[item.decisionReference]]">
                                <paper-item class="chapter-text">
                                    <div class\$="chapter-text-row chapter-text-date [[_isInvalidClass(item)]] [[_willBeInvalidClass(item)]]">
                                        <label>
                                            <iron-icon icon="vaadin:book" class="chapterDateInfoIcon"></iron-icon>
                                            [[item.paragraph]]
                                        </label>
                                        <div>

                                                <span id="from-[[item.decisionReference]][[item.ioRequestReference]]"><iron-icon icon="vaadin:calendar-clock" class="chapterDateInfoIcon"></iron-icon>[[_formatDate(item.start)]]</span>
                                                &nbsp;
                                            <paper-tooltip for="from-[[item.decisionReference]][[item.ioRequestReference]]" position="left" animation-delay="0">Date de début de l'accord</paper-tooltip>

                                            <span id="to-[[item.decisionReference]][[item.ioRequestReference]]"><iron-icon icon="vaadin:calendar-clock" class="chapterDateInfoIcon"></iron-icon>[[_formatDate(item.end)]]</span>
                                            </div>
                                        <paper-tooltip for="to-[[item.decisionReference]][[item.ioRequestReference]]" position="left" animation-delay="0">Date de fin de l'accord</paper-tooltip>

                                    </div>
                                    <div class="chapter-text-row grey">
                                        <h4>
                                            <div class="small-text">[[item.paragraphName]]</div>
                                            [[item.strength]] [[item.strengthUnit]]
                                            <template is="dom-repeat" items="[[item.medications]]">
                                                [[item]],
                                            </template>
                                        </h4>
                                        <div class="chapterDateInfo">
                                            <template is="dom-if" if="[[item.accepted]]">
                                                <span class="accepted-status">
                                                    <iron-icon icon="vaadin:circle" class="ch4AcceptedStatus"></iron-icon>
                                                    [[localize('ch4Accept','Accepted',language)]]
                                                </span>
                                            </template>
                                            <template is="dom-if" if="[[item.inTreatment]]">
                                                <span class="pending-status">
                                                    <iron-icon icon="vaadin:book" class="ch4PendingStatus"></iron-icon>
                                                    [[localize('ch4Pending','Pending',language)]]
                                                </span>
                                            </template>
                                            <template is="dom-if" if="{{_isAgreementRejected(item.inTreatment, item.accepted)}}">
                                                <span class="rejected-status">
                                                    <iron-icon icon="vaadin:close" class="ch4RejectedStatus"></iron-icon>
                                                    [[localize('ch4Rejected','Rejected',language)]]
                                                </span>
                                            </template>
                                            <template is="dom-if" if="[[item.canceled]]">
                                                 <span class="pending-status">
                                                    <iron-icon icon="vaadin:close" class="ch4RejectedStatus"></iron-icon>
                                                    [[localize('ch4Canceled','Canceled',language)]]: [[_formatDate(item.cancelationDate)]]
                                                </span>
                                            </template>
                                            <iron-icon class="chapterDateInfoIcon ioref-icon" id="ioref-[[item.decisionReference]][[item.ioRequestReference]]" icon="info"></iron-icon>
                                            <paper-tooltip for="ioref-[[item.decisionReference]][[item.ioRequestReference]]" position="left" animation-delay="0">[[item.decisionReference]] [[item.ioRequestReference]]</paper-tooltip>
                                        </div>
                                    </div>
                                </paper-item>
                            </paper-material>
                        </template>
                    </paper-listbox>
                    <ht-spinner class="spinner chapter-list-spinner" alt="Loading chapter4 list" active="[[_isLoadingChapter]]"></ht-spinner>
                    <div class="bottom-btn-container">
                        <paper-button disabled="[[_isLoadingChapter]]" class="button button--other bottom-btn" on-tap="_loadChapter4">[[localize('load_agr','Load
                            agr.',language)]]
                        </paper-button>
                    </div>
                </div>
                <div class="detail-panel" on-dragover="_onDrag">
                    <vaadin-combo-box id="entities-list" filtered-items="[[searchResults]]" value="{{cbValue}}" on-filter-changed="_filterChanged" item-label-path="descr" selected-item="{{selectedParagraph}}" item-value-path="id" label="[[localize('sea_for_par','Search for paragraph‚ medication‚ pathology...',language)]]"></vaadin-combo-box>
                    <ht-spinner class="spinner paragraph-spinner" alt="Loading chapter4 list" active="[[_isLoadingParagraph]]"></ht-spinner>
                    <div class="paragraph">
                        <template is="dom-if" if="[[displayedParagraph.paragraphInfo]]">
                            <paper-tabs selected="{{tabs}}">
                                <paper-tab class="adm-tab">
                                    <iron-icon class="smaller" icon="vaadin:clipboard-text"></iron-icon>
                                    [[localize('que_form','Query Form',language)]]
                                </paper-tab>
                                <paper-tab class="adm-tab">
                                    <iron-icon class="smaller" icon="vaadin:family"></iron-icon>
                                    [[localize('agr_res','Agreement response',language)]]
                                </paper-tab>
                            </paper-tabs>


                            <iron-pages selected="[[tabs]]" class="">
                                <page>
                                    <div class="paragraph-content">
                                        <h2>[[localize('chapter','Chapter',language)]] [[displayedParagraph.paragraphInfo.chapterName]],
                                            [[localize('par','Paragraph',language)]]
                                            [[displayedParagraph.paragraphInfo.paragraphName]]</h2>
                                        <template is="dom-if" if="[[addedDocuments.length]]">
                                            <paper-dropdown-menu id="addedDocuments" class="addedDocuments" label="Annexes" on-selected-item-changed="_downloadAnnex">
                                                <paper-listbox slot="dropdown-content" class="dropdown-content">
                                                    <template id="addedDocumentsDr" is="dom-repeat" items="[[addedDocuments]]">
                                                        <paper-item>
                                                            <template is="dom-if" if="[[_isFrench(language)]]">
                                                                [[item.descrFr]]
                                                            </template>
                                                            <template is="dom-if" if="[[!_isFrench(language)]]">
                                                                [[item.descrNl]]
                                                            </template>
                                                        </paper-item>
                                                    </template>
                                                </paper-listbox>
                                            </paper-dropdown-menu>
                                        </template>
                                        <p>
                                            <template is="dom-if" if="[[_isFrench(language)]]">[[displayedParagraph.paragraphInfo.keyStringFr]]
                                            </template>
                                            <template is="dom-if" if="[[_isDutch(language)]]">[[displayedParagraph.paragraphInfo.keyStringNl]]
                                            </template>
                                        </p>
                                        <ul class="outer-ul">
                                            <ht-pat-mcn-chapteriv-verse verse="[[displayedParagraph.paragraphInfo.headerVerse]]" extension="[[_extension(displayedParagraph, isAgreementSelected)]]" checked-verses="{{checkedVerses}}" language="[[language]]"></ht-pat-mcn-chapteriv-verse>
                                        </ul>
                                    </div>
                                </page>
                                <page>
                                    <div class="paragraph-content">
                                        <template is="dom-if" if="[[agreementResponse]]">
                                            <template is="dom-if" if="[[!_isNull(agreementResponse.acknowledge)]]">
                                                <h3>[[localize('the_req_was_suc', 'The request was successfully transmitted
                                                    to the IO', language)]]</h3>
                                            </template>
                                            <template is="dom-if" if="[[_isNull(agreementResponse.acknowledge)]]">
                                                <h3>[[localize('the_req_cou_not', 'The request could not be successfully
                                                    transmitted to the IO', language)]]</h3>
                                            </template>
                                            <template is="dom-if" if="[[agreementResponse.errors.length]]">
                                                <h4>Error(s)</h4>
                                                <template is="dom-repeat" items="[[agreementResponse.errors]]" as="e">
                                                    <p class="error">[[localizeObjectKey(e,'msg',language)]] <br>[ code :
                                                        [[e.code]], path: [[e.path]] ]</p>
                                                </template>
                                            </template>
                                            <template is="dom-if" if="[[agreementResponse.warnings.length]]">
                                                <h4>Warning(s)</h4>
                                                <template is="dom-repeat" items="[[agreementResponse.warnings]]" as="e">
                                                    <p class="warning">[[localizeObjectKey(e,'msg',language)]] <br>[ code :
                                                        [[e.code]], path: [[e.path]] ]</p>
                                                </template>
                                            </template>

                                            <template id="transactionRepeat" is="dom-repeat" items="[[agreementResponse.transactions]]" as="t">
                                                <h4>[[localize('agr_res','Agreement response',language)]],
                                                    [[_formatDateTime(t.timestamp)]]</h4>
                                                <div class="one-line">
                                                        <template is="dom-if" if="[[t.accepted]]">
                                                            <div class="fleft third">
                                                            <p><b>[[localize('status','Status',language)]]:</b>
                                                                [[localize('agreed','Agreement conceded',language)]]</p></div>
                                                        </template>
                                                        <template is="dom-if" if="[[t.inTreatment]]">
                                                            <div class="fleft third">
                                                            <p><b>[[localize('status','Status',language)]]:</b>
                                                                [[localize('req_in_tre','Request in treatment',language)]]</p></div>
                                                        </template>
                                                        <template is="dom-if" if="[[_none(t.accepted, t.inTreatment)]]">
                                                            <div class="fleft third">
                                                            <p><b>[[localize('status','Status',language)]]:</b>
                                                                [[localize('req_rej','Request rejected',language)]]</p>
                                                            <p>[[localize('ref_jus','Justification of refusal',language)]]:
                                                                <template is="dom-if" if="[[_isFrench(language)]]">
                                                                    <span class="error">[[t.refusalJustification.fr]]</span>
                                                                </template>
                                                                <template is="dom-if" if="[[!_isFrench(language)]]">
                                                                    <span class="error">[[t.refusalJustification.nl]]</span>
                                                                </template>
                                                            </p></div>
                                                        </template>
                                                        <div class="fleft third">
                                                            <p><b>[[localize('ref_io','Reference IO',language)]]:</b> [[t.decisionReference]] [[t.ioRequestReference]]</p>
                                                        </div>
                                                    <template is="dom-if" if="[[t.start]]">
                                                        <div class="fleft third">
                                                            <p><b>[[localize('from','From',language)]]:</b> [[_formatDate(t.start)]]</p></div>
                                                    </template>
                                                        <template is="dom-if" if="[[t.end]]">
                                                            <div class="fleft third">
                                                                <p><b>[[localize('to','to',language)]]:</b> [[_formatDate(t.end)]]</p></div>
                                                        </template>
                                                </div>

                                                <h4>[[localize('medications','Medications',language)]]</h4>
                                                <vaadin-grid id="medications-list" class="material" items="[[_mpps(t.paragraph, agreementMpps.*)]]" active-item="{{selectedMedication}}">
                                                    <vaadin-grid-column flex-grow="10">
                                                        <template class="header">
                                                            <vaadin-grid-sorter path="mut">
                                                                [[localize('medication','Medication',language)]]
                                                            </vaadin-grid-sorter>
                                                        </template>
                                                        <template>
                                                            <div class="cell frozen">[[item.name]])</div>
                                                        </template>
                                                    </vaadin-grid-column>
                                                    <vaadin-grid-column flex-grow="1">
                                                        <template class="header">
                                                            <vaadin-grid-sorter path="periodStart">
                                                                [[localize('selected','Selected',language)]]
                                                            </vaadin-grid-sorter>
                                                        </template>
                                                        <template>
                                                            <div class="cell frozen">
                                                                <vaadin-checkbox id="[[item.id.id]]" checked="[[_medicationChecked(item, displayedParagraph.selectedMedication)]]" on-checked-changed="_updateMedication"></vaadin-checkbox>
                                                            </div>
                                                        </template>
                                                    </vaadin-grid-column>
                                                </vaadin-grid>
                                            </template>

                                            <h4>[[localize('tec_dat','Technical data',language)]]</h4>
                                            <div class="one-line">
                                                <template is="dom-if" if="[[t.ioRequestReference]]">
                                                    <div class="fleft third">
                                                        <p><b>[[localize('req_ref_io','Request Reference IO',language)]]: </b>[[t.ioRequestReference]]</p>
                                                    </div>
                                                </template>
                                                <template is="dom-if" if="[[t.responseType]]">
                                                    <div class="fleft third">
                                                        <p><b>[[localize('raw_res','Raw response',language)]]:</b> [[t.responseType]]</p>
                                                    </div>
                                                </template>
                                                <template is="dom-if" if="[[agreementResponse.commonOutput.inputReference]]">
                                                    <div class="fleft third">
                                                        <p><b>commonInput:</b> [[agreementResponse.commonOutput.inputReference]]</p>
                                                    </div>
                                                </template>
                                                <template is="dom-if" if="[[agreementResponse.commonOutput.nipReference]]">
                                                    <div class="fleft third">
                                                        <p><b>nipReference:</b> [[agreementResponse.commonOutput.nipReference]]</p>
                                                    </div>
                                                </template>
                                                <template is="dom-if" if="[[agreementResponse.commonOutput.outputReference]]">
                                                    <div class="fleft third">
                                                        <p><b>commonOutput:</b> [[agreementResponse.commonOutput.outputReference]]</p>
                                                    </div>
                                                </template>
                                            </div>

                                        </template>
                                    </div>
                                </page>
                            </iron-pages>

                            <div class="tool-container">
                                <vaadin-date-picker class="tool" i18n="[[i18n]]" initial-position="[[initialFrom]]" label="[[localize('from','From',language)]]" value="{{fromAsString}}"></vaadin-date-picker>
                                <tk-token-field class="tool" label="[[localize('appendices','Appendices',language)]]" value="{{appendicesTokens}}" on-value-splices-change="_localizedValueChanged" data-value-path="id" data-label-path="descr" always-float-label=""></tk-token-field>
                                <vaadin-checkbox class="tool" checked="{{incomplete}}">[[localize('inc_req',
                                    'incomplete
                                    request', language)]]
                                </vaadin-checkbox>
                            </div>

                            <div class="message">
                                <template is="dom-if" if="[[warnings.length]]">
                                    <div class="warning">
                                        <template is="dom-repeat" items="[[warnings]]">
                                            [[item]]<br>
                                        </template>
                                    </div>
                                </template>
                                <template is="dom-if" if="[[errors.length]]">
                                    <div class="error">
                                        <template is="dom-repeat" items="[[errors]]">
                                            [[item]]<br>
                                        </template>
                                    </div>
                                </template>
                            </div>

                            <template is="dom-if" if="[[_missingAppendices(appendicesTokens.*, displayedParagraph.paragraphInfo, checkedVerses.*)]]">
                                <div class="warning">[[_missingAppendices(appendicesTokens.*, displayedParagraph)]] [[localize('app_are_mis','appendices are missing', language)]]</div>
                            </template>
                            <template is="dom-if" if="[[_unwantedAppendix(appendicesTokens.*, displayedParagraph.paragraphInfo, checkedVerses.*)]]">
                                <div class="error">[[localize('app_are_unw','No appendix is expected for this agreement request. Adding one can delay the procedure.', language)]]</div>
                            </template>

                            <div class="btns-container">
                                <template is="dom-if" if="[[_cancellation(isAgreementSelected, displayedParagraph)]]">
                                    <paper-button class="button button--other bottom-btn" id="cancelChapter" on-tap="_cancelChapter" disabled="[[isClosingAgreement]]">[[localize('can_agr','Cancel
                                        agreement',language)]]
                                    </paper-button>
                                    <ht-spinner class="asking" active="[[isClosingAgreement]]"></ht-spinner>
                                </template>
                                <template is="dom-if" if="[[_closure(isAgreementSelected, displayedParagraph)]]">
                                    <paper-button class="button button--other bottom-btn" id="closeChapter" on-tap="_closeChapter" disabled="[[isClosingAgreement]]">[[localize('clos_agr','Close
                                        agreement',language)]]
                                    </paper-button>
                                    <ht-spinner class="asking" active="[[isClosingAgreement]]"></ht-spinner>
                                </template>
                                <template is="dom-if" if="[[_complimentaryAnnex(isAgreementSelected, displayedParagraph, appendicesTokens.*)]]">
                                    <paper-button class="button button--other bottom-btn" id="complimentaryAnnex" on-tap="_requestChapter4" disabled="[[isAskingAgreement]]">
                                        [[localize('sen_com_app','Send complimentary annex',language)]]
                                    </paper-button>
                                    <ht-spinner class="asking" active="[[isAskingAgreement]]"></ht-spinner>
                                </template>
                                <template is="dom-if" if="[[_extension(isAgreementSelected, displayedParagraph)]]">
                                    <template is="dom-if" if="[[displayedParagraph.end]]">
                                        <paper-button class="button button--other bottom-btn" id="extendChapter" on-tap="_requestChapter4" disabled="[[isAskingAgreement]]">[[localize('ext_agr','Extend
                                            agreement',language)]]
                                        </paper-button>
                                        <ht-spinner class="asking" active="[[isAskingAgreement]]"></ht-spinner>
                                    </template>
                                </template>

                                <template is="dom-if" if="[[!isAgreementSelected]]">
                                    <paper-button class="button button--other bottom-btn" id="requestChapter" on-tap="_requestChapter4" disabled="[[isAskingAgreement]]">
                                        [[localize('req_agr','Request
                                        agreement',language)]]
                                    </paper-button>
                                    <ht-spinner class="asking" active="[[isAskingAgreement]]"></ht-spinner>
                                </template>
                            </div>

                            <div id="appendix-upload-container">
                                <vaadin-upload id="appendix-upload" no-auto="" files="{{appendices}}" accept="image/jpeg,application/pdf" target="[[api.host]]/document/{documentId}/attachment/multipart;jsessionid=[[api.sessionId]]" method="PUT" form-data-name="attachment" on-upload-success="_fileUploaded"></vaadin-upload>
                                <paper-fab class="close-button-icon" icon="icons:close" on-tap="_hideUpload"></paper-fab>
                            </div>
                        </template>
                    </div>
                    <template is="dom-if" if="[[loadResponse]]">

                    </template>
                </div>
            </div>

        <!--</paper-dialog>-->
`;
  }

  static get is() {
      return 'ht-pat-mcn-chapteriv-agreement'
  }

  static get properties() {
      return {
          api: {
              type: Object,
              value: null,
              noReset: true
          },
          user: {
              type: Object,
              value: null,
              noReset: true
          },
          patient: {
              type: Object
          },
          language: {
              type: String,
              noReset: true
          },
          appendices: {
              type: Array,
              value: () => []
          },
          appendicesTokens: {
              type: Array,
              value: () => []
          },
          errors: {
              type: Array,
              value: () => []
          },
          warnings: {
              type: Array,
              value: () => []
          },
          opened: {
              type: Boolean,
              value: false,
              noReset: true
          },
          incomplete: {
              type: Number, //null or 2 means managed by dialog, 0 or 1 means managed by user
              value: null
          },
          searchResults: {
              type: Array,
              value: () => []
          },
          selectedParagraph: {
              type: Object,
              observer: "_selectedParagraphChanged"
          },
          displayedParagraph: {
              type: Object,
              observer: "_displayedParagraphChanged"
          },
          medications: {
              type: Array,
              value: () => []
          },
          convertedMedications: {
              type: Array,
              value: null
          },
          orphanAgreements: {
              type: Array,
              value: () => []
          },
          tabs: {
              type: Number,
              value: 0
          },
          initialFrom: {
              type: String,
              value: () => moment().startOf('month').format('YYYY-MM-DD')
          },
          initialTo: {
              type: String,
              value: () => moment().endOf('month').format('YYYY-MM-DD')
          },
          fromAsString: {
              type: String,
              value: () => moment().format('YYYY-MM-DD')
          },
          toAsString: {
              type: String
          },
          selectedAgreementIndex: {
              type: Number,
              value: null
          },
          isAgreementSelected: {
              type: Boolean,
              value: false
          },
          consultationStartDateAsString: {
              type: String,
              value: () => moment().startOf('month').format('YYYY-MM-DD')
          },
          consultationEndDateAsString: {
              type: String,
              value: () => moment().endOf('month').format('YYYY-MM-DD')
          },
          selectedLoadParagraph: {
              type: String
          },
          searchLoadContainerCollapsed: {
              type: Boolean,
              value: true
          },
          isAskingAgreement: {
              type: Boolean,
              value: false
          },
          isClosingAgreement: {
              type: Boolean,
              value: false
          },
          isCancellingAgreement: {
              type: Boolean,
              value: false
          }
      }
  }

  static get observers() {
      return [
          '_convertedMedications(medications.*)',
          '_appendicesChanged(appendices.*)',
          '_appendicesTokenChanged(appendicesToken.*)',
          '_selectAgreementInList(selectedAgreementIndex)',
          '_prepareIncomplete(appendicesTokens.*, displayedParagraph.paragraphInfo, checkedVerses.*)',
          '_medicationChanged(displayedParagraph.selectedMedication)',
          '_patientChanged(patient)']
  }

  reset() {
      const props = HtPatMcnChapterIVAgreement.properties
      Object.keys(props).forEach(k => { if (!props[k].noReset) { this.set(k, (typeof props[k].value === 'function' ? props[k].value() : (props[k].value || null))) }})
  }

  ready() {
      super.ready()
      this.addEventListener('iron-resize', () => this.onWidthChange())
  }

  attached() {
      super.attached()
      this.async(this.notifyResize, 1)
  }

  _fromLabel() {
      return this._extension() ? this.localize('sta_of_pro','Start of extension') : this.localize('from','From')
  }

  _isNull(v) {
      return v === null
  }

  searchLoadContainerClass(collapsed) {
      return collapsed ? 'search-load-container-collapsed' :''
  }

  toggleMenu() {
      this.set('searchLoadContainerCollapsed',!this.searchLoadContainerCollapsed)
  }

  _medicationChanged(mpp) {
      const t = this.displayedParagraph
      if (t && mpp) {
          if (t.service) {
              const content = Object.values((t.service || {}).content || {}).find( c => c.medicationValue && c.medicationValue.paragraphAgreements && c.medicationValue.paragraphAgreements[t.paragraph])
                  content.medicationValue.medicinalProduct = {
                      intendedcds: {type: "CD-DRUG-CNK", code: mpp.id.id},
                      intendedname: mpp.name
                  }
              this.dispatchEvent(new CustomEvent('update-services', {detail: {services: [t.service]}, bubbles: true, composed: true}))
          }
      }
  }

  _filterChanged(text) {
      if (text.detail && text.detail.value && text.detail.value.length > 2) {
          const searchString = text.detail.value
          this.latestSearchString = searchString
          setTimeout(() => {
              if (this.latestSearchString !== searchString) {
                  return
              }
              this.api.fhc().Chaptercontroller().findParagraphsUsingGET(searchString, this.language).then((paragraphs) => {
                  if (searchString === this.latestSearchString) {
                      this.set('searchResults', paragraphs.map(p => ({
                          id: `${p.paragraphName}/${p.paragraphVersion}`,
                          descr: `${p.paragraphName} - ${this.localizeObjectKey(p, 'keyString')}`
                      })))
                  }
              })
          }, 600)
      } else {
          this.set('searchResults', [])
      }
  }

  _selectedParagraphChanged() {
      if (this.selectedParagraph && this.selectedParagraph.id) {
          this.set('agreementResponse', [])
          this.set('selectedAgreementIndex', null);

          this.set('isAgreementSelected', false)

          this.set('displayedParagraph', this.selectedParagraph);
          this.set('tabs', 0)
      }
  }

  _displayedParagraphChanged() {
      const grid = this.shadowRoot.querySelector('#medications-list')
      this.incomplete = null
      this.fromAsString = this._extension() && this.displayedParagraph && this.displayedParagraph.end && this.api.moment(this.displayedParagraph.end).add(1,'day').format('YYYY-MM-DD') || moment().format('YYYY-MM-DD')
      if (this.displayedParagraph && this.displayedParagraph.id) {
          (this.displayedParagraph.ioRequestReference || this.displayedParagraph.decisionReference) ? this.set('isAgreementSelected', true) : this.set('isAgreementSelected', false)
          this.set('checkedVerses', [])
          const paragraph = this.displayedParagraph.id.split('/')[0]
          this.set('_isLoadingParagraph',true)
          ;(this.displayedParagraph.paragraphInfo ? Promise.resolve(this.displayedParagraph.paragraphInfo) : this.api.fhc().chaptercontrollerfhc.getParagraphInfosUsingGET('IV', paragraph))
              .then(pi => {
                  console.log("pi",pi)
                  this.set('displayedParagraph.paragraphInfo', pi)
                  this.set('_isLoadingParagraph',false)
                  return this.api.fhc().Chaptercontroller().getAddedDocumentsUsingGET('IV', paragraph)
              })
              .then(addedDocuments => {
                  console.log("added",addedDocuments)
                  console.log(grid)
                  this.set('addedDocuments', addedDocuments)
                  return addedDocuments
              })
              .finally(() =>  this.set('_isLoadingParagraph',false))
      }
  }

  _isInvalidClass(item) {
      return item && (item.canceled || item.end && this.api.moment(item.end).isSameOrBefore(moment())) ? 'invalid' : ''
  }

  _willBeInvalidClass(item) {
      return !this._isInvalidClass(item).length && item && item.end && this.api.moment(item.end).isSameOrBefore(moment().add(2,'month')) ? 'willBeInvalid' : ''
  }

  _closure(){
      return this.isAgreementSelected && this.displayedParagraph && !this.displayedParagraph.canceled && (!this.displayedParagraph.end || this.api.moment(this.displayedParagraph.end).isAfter(moment())) &&
          (this.displayedParagraph.start && this.api.moment(this.displayedParagraph.start).isBefore(moment()))
  }


  _cancellation() {
      return this.isAgreementSelected && this.displayedParagraph && !this.displayedParagraph.canceled &&  (this.displayedParagraph.inTreatment || (this.displayedParagraph.start && this.api.moment(this.displayedParagraph.start).isSameOrAfter(moment(),"day")))
  }

  _extension() {
      return this.isAgreementSelected && this.displayedParagraph && !this.displayedParagraph.canceled && !this.displayedParagraph.inTreatment
  }

  _complimentaryAnnex() {
      return this.isAgreementSelected && this.displayedParagraph && this.displayedParagraph.inTreatment && this.appendicesTokens && this.appendicesTokens.length > 0
  }

  neededAppendices() {
      const dp = this.displayedParagraph
      if (!dp || !dp.paragraphInfo) { return 0 }

      const pt = (dp.paragraphInfo.processType || 1)
      const extension = this.isAgreementSelected && !dp.inTreatment

      const scanVerse = (v) => {
          return v.verses.reduce((acc, v) => acc + scanVerse(v), (extension && v.requestType !== 'D' || !extension && v.requestType !== 'P')
          && (v.checkBoxInd === 'N' || v.checkBoxInd === 'Y' && ((this.checkedVerses || []).includes(v.verseNum) || (dp.verses || []).includes(v.verseNum)))
          && (v.otherAddedDocumentInd === 'Y') ? 1 : 0)
      }

      const num = dp.paragraphInfo.headerVerse && scanVerse(dp.paragraphInfo.headerVerse) || 0
      return  (pt === 2 || pt === 3 && extension || pt === 4 && !extension) ? num : 0
  }

  _prepareIncomplete() {
      if (this.incomplete === null || this.incomplete > 1) {
          this.incomplete = this.neededAppendices()>0 ? 2 : null;
      }
  }

  _missingAppendices() {
      return Math.max(this.neededAppendices() - (this.appendicesTokens || []).length, 0)
  }

  _unwantedAppendix() {
      const dp = this.displayedParagraph
      if (!dp || !dp.paragraphInfo) { return false }
      const pt = (dp.paragraphInfo.processType || 1)
      const extension = !dp.inTreatment

      return (pt === 1 && (this.appendicesTokens || []).length > 0)
          || (pt === 3  && !extension && (this.appendicesTokens || []).length > 0)
          || (pt === 4  && extension && (this.appendicesTokens || []).length > 0)
  }

  onWidthChange() {
      /*const offsetWidth = this.$.dialog.offsetWidth
      const offsetHeight = this.$.dialog.offsetHeight
      if (!offsetWidth || !offsetHeight) {
          return
      }*/
  }

  close() {
      this.set('opened', false)
  }

  open() {
      this.set('opened', true)
  }

  _patientChanged(patient) {
      this.set('convertedMedications', []);
      this.set('orphanAgreements', []);
  }

  _none(a, b, c) {
      return !a && !b && !c
  }

  _formatParagraph(p) {
      return p || this.localize('any','Any')
  }

  _formatDate(d) {
      return d && this.api.moment(d).format('DD/MM/YYYY')
  }

  _formatDateShort(d) {
      return d && this.api.moment(d).format('DD/MM/YY')
  }

  _formatDateTime(d) {
      return d && this.api.moment(d).format('DD/MM/YYYY HH:mm:ss')
  }

  _isFrench(language) {
      return this.language === 'fr'
  }

  _isDutch(language) {
      return this.language === 'nl'
  }

  _convertedMedications() {
      return Promise.all((this.medications || []).filter(svc => Object.values(svc.content).some(c => !!c.medicationValue && !!c.medicationValue.paragraphAgreements && Object.keys(c.medicationValue.paragraphAgreements).length)).flatMap(svc => {
          const content =  Object.values(svc.content).find(c => !!c.medicationValue && !!c.medicationValue.paragraphAgreements && Object.keys(c.medicationValue.paragraphAgreements).length)
          const agreements = content.medicationValue.paragraphAgreements
          return _.toPairs(agreements).map(([p, t]) => _.assign({}, t, { service: svc, paragraph: p, medications: [(content.medicationValue.medicinalProduct || {}).intendedname || (content.medicationValue.substanceProduct || {}).intendedname] }))
      }).map(t => Promise.all([this.api.fhc().chaptercontrollerfhc.getVtmNamesForParagraphUsingGET('IV', t.paragraph, this.language), this.api.fhc().chaptercontrollerfhc.getParagraphInfosUsingGET('IV', t.paragraph)]).then(([vtm, pi]) => Object.assign(t, {
          paragraphName: this.localizeObjectKey(pi, 'keyString'),
          medications: (t.medications || []).concat(vtm),
          paragraphInfo: pi
      })))).then(agreements => {
          this.set('convertedMedications', agreements)
          return agreements
      })
  }

  _agreements() {
      return (this.convertedMedications || []).concat(this.orphanAgreements)
  }

  _mpps(p) {
      return this.agreementMpps && (this.agreementMpps.find(mpps => mpps.paragraph === p) || {}).mpps || []
  }

  _loadChapter4() {
      this._isLoadingChapter = true;
      this.set('agreementResponse', [])
      this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
          this.api.fhc().Chaptercontroller().agreementRequestsConsultationUsingGET(this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword,
              hcp.nihii, hcp.ssin, hcp.firstName, hcp.lastName,
              this.patient.ssin, this.patient.dateOfBirth, this.patient.firstName, this.patient.lastName, this.patient.gender, null, this.selectedLoadParagraph !== "" ? this.selectedLoadParagraph : null,
              this.api.moment(this.consultationStartDateAsString).valueOf(), this.consultationEndDateAsString !== "" ? this.api.moment(this.consultationEndDateAsString).valueOf() : null).then( x => this.api.logMcn(x, this.user, this.patient.id, "CHAPIV", "consult") )
      ).then(agreements => {
          if (agreements.warnings && agreements.warnings.length) {
              this.set('warnings', agreements.warnings.map(w => this.localizeObjectKey(w,'msg') + (w.code||w.path?` [${w.code||''} : ${w.path||''}]` : '')))
          }
          if (agreements.errors && agreements.errors.length) {
              this.set('errors', agreements.errors.map(w => this.localizeObjectKey(w,'msg') + (w.code||w.path?` [${w.code||''} : ${w.path||''}]` : '')))
          }

          if(agreements.acknowledged === true && agreements.transactions.length === 0){
              this.push('warnings', this.localize('no_agre','No agreement found for selected period',this.language))
          }
          console.log(agreements)

          return Promise.all(
              agreements.transactions.map(t => Promise.all([this.api.fhc().chaptercontrollerfhc.getVtmNamesForParagraphUsingGET('IV', t.paragraph, this.language).catch(() => ''), this.api.fhc().chaptercontrollerfhc.getParagraphInfosUsingGET('IV', t.paragraph).catch(() => [])]).then(([vtm, pi]) => [t, vtm, pi]))
          ).then((transactions) => {
              return (this.convertedMedications ? Promise.resolve(this.convertedMedications) : this._convertedMedications()).then(medications => {
                  const ioRequestReferences = medications.map(x => x.ioRequestReference)
                  const decisionReferences = medications.map(x => x.decisionReference)

                  const updatedAgreements = _.compact(medications.map(x => {
                      const bx = _.cloneDeep(x)
                      const t = transactions.find( t => t.decisionReference && t.decisionReference === x.decisionReference || t.ioRequestReference && t.ioRequestReference === x.ioRequestReference)
                      if (t) {
                          _.assign(x, t)
                          if (!_.isEqual(bx, x)) {
                              return x
                          }
                      }
                      return null
                  }))

                  if (updatedAgreements.length) {
                      const services = _.compact(updatedAgreements.map(x => {
                          const c = Object.values((x.service || {}).content || {}).find( c => c.medicationValue && c.medicationValue.paragraphAgreements && c.medicationValue.paragraphAgreements[x.paragraph])
                          const pa = c && c.medicationValue.paragraphAgreements[x.paragraph]
                          return pa && Object.assign(pa, _.pickBy(x, (v,k) => !['paragraphInfo','medications','paragraphName','service'].includes(k))) && x
                      }))
                      this.dispatchEvent(new CustomEvent('update-services', {detail: {services: services}, bubbles: true, composed: true}))
                  }

                  this.set('orphanAgreements', transactions.filter(([t]) => !((t.ioRequestReference && ioRequestReferences.includes(t.ioRequestReference)) || (t.decisionReference && decisionReferences.includes(t.decisionReference))))
                      .map(([t, vtm, pi]) => _.assign({}, t, {
                          paragraphName: this.localizeObjectKey(pi,'keyString', this.language),
                          medications: vtm,
                          paragraphInfo: pi
                      }))
                  )
                  this.set('agreementResponse', agreements)
                  this.set('isAskingAgreement', false)
              })
          })
      }).finally(() => {
          this._isLoadingChapter = false;
          this.set('isAskingAgreement', false)
      })
  }

  _requestChapter4(e) {
      const pi = this.displayedParagraph && this.displayedParagraph.paragraphInfo
      this.set('agreementResponse', {})
      const requestType = (e.target && e.target.id === "requestChapter") ? "newrequest" :
                          (e.target && e.target.id === "extendChapter" && (this.api.moment(this.fromAsString).diff(this.api.moment(this.displayedParagraph.end), "days")) <= 1 ) ? "extension" :
                          (e.target && e.target.id === "extendChapter" && (this.api.moment(this.fromAsString).diff(this.api.moment(this.displayedParagraph.end), "days")) > 1 ) ? "noncontinuousextension" :
                          (e.target && e.target.id === "complimentaryAnnex") ? "complimentaryannex" : null

      if (pi && requestType != null) {
          this.set('isAskingAgreement',true)
          this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp =>
              Promise.all(this.appendicesTokens.map(ap =>
                  this.api.document().getDocument(ap.id)
                      .then(doc =>
                          this.api.document().getAttachment(doc.id, doc.attachmentId)
                      ).then(a => ({
                          verseSeq: ap.verseSeq,
                          documentSeq: ap.docSeq,
                          data: btoa(new Uint8Array(a).reduce((data, byte) => data + String.fromCharCode(byte), '')),
                          mimeType: 'application/pdf',
                          path: ap.name
                      })
                  ))
              ).then(appendices =>
                  this.api.fhc().Chaptercontroller().requestAgreementUsingPOST(this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword,
                      hcp.nihii, hcp.ssin, hcp.firstName, hcp.lastName,
                      this.patient.ssin, this.patient.dateOfBirth, this.patient.firstName, this.patient.lastName, this.patient.gender,
                      requestType, pi.paragraphVersion, pi.paragraphName,
                      appendices, this.checkedVerses.join(','), !!this.incomplete,
                      requestType === "complimentaryannex" ? null : requestType === "extension" ? this.api.moment(this.displayedParagraph.end).add(1, "days").valueOf() : this.api.moment(this.fromAsString).valueOf() , null,
                      (requestType === "extension" || requestType === "noncontinuousextension" || requestType === "complimentaryannex") ? this.displayedParagraph.decisionReference : null, //Might want to set ioRequestReference here for complimentary appendices
                      ((requestType === "noncontinuousextension" || requestType === "complimentaryannex") && !this.displayedParagraph.decisionReference) ? this.displayedParagraph.ioRequestReference : null).then( x => this.api.logMcn(x, this.user, this.patient.id, "CHAPIV", requestType) )
              )
          ).then(res => {
              console.log(res)
              this.set('agreementResponse', res)
              this.set('tabs', 1)

              return Promise.all(((res || {}) && res.transactions || []).map(t =>
                  this.api.fhc().Chaptercontroller().getMppsForParagraphUsingGET('IV', t.paragraph || pi.paragraphName).then(it => ({
                      paragraph: t.paragraph || pi.paragraphName,
                      transaction: t,
                      mpps: it
                  }))
              )).then(links => {
                  this.set('agreementMpps', links)

                  if (requestType === 'newrequest' || requestType === 'extension' || requestType === 'noncontinuousextension') {
                      return Promise.all(links.map(l =>
                          this.api.contact().service().newInstance(this.user, {
                              tags: [{type: "CD-ITEM", code: "medication"}],
                              codes: l.mpps.length ? [{type: "CD-DRUG-CNK", code: l.mpps[0].id.id}] : [],
                              content: _.fromPairs([[this.language, {
                                  medicationValue: {
                                      medicinalProduct: {
                                          intendedcds: l.mpps.length ? [{
                                              type: "CD-DRUG-CNK",
                                              code: l.mpps[0].id.id
                                          }] : [],
                                          intendedname: l.mpps.length ? l.mpps[0].name : 'Chapter IV §' + t.paragraph
                                      },
                                      paragraphAgreements: _.fromPairs([[l.paragraph,
                                          _.assign({}, l.transaction, {
                                              verses: this.checkedVerses,
                                              agreementAppendices: this.appendicesTokens.map(ap => ({
                                                  verseSeq: ap.verseSeq,
                                                  documentSeq: ap.docSeq,
                                                  path: ap.name,
                                                  documentId: ap.id
                                              }))
                                          })
                                      ]])
                                  }
                              }]]), label: this.localize('medication', 'Medication')
                          })
                      )).then(svcs => {
                          svcs.forEach(svc => this.dispatchEvent(new CustomEvent('create-service', {
                              detail: {service: svc},
                              bubbles: true,
                              composed: true
                          })))
                          return svcs
                      })
                  } else {
                      return Promise.all(((res || {}) && res.transactions || []).map(t => {
                          const svc = this.displayedParagraph.service
                          if (svc && t.accepted && t.decisionReference && t.end) {
                              const content = Object.values(svc.content || {}).find( c => c.medicationValue && c.medicationValue.paragraphAgreements && c.medicationValue.paragraphAgreements[this.displayedParagraph.paragraph])
                              const paragraphAgreement = content.medicationValue.paragraphAgreements[this.displayedParagraph.paragraph]
                              if (paragraphAgreement) {
                                  Object.assign(paragraphAgreement, {end: res.transaction.end})
                                  this.dispatchEvent(new CustomEvent('update-services', {detail: {services: [svc]}, bubbles: true, composed: true}))
                              }
                          }
                      }))
                  }
              })
          }).finally(() => {this.isAskingAgreement = false;})
      }
  }

  _annexBaseName(addedDoc) {
      const pi = this.displayedParagraph && this.displayedParagraph.paragraphInfo
      return pi ? `${pi.paragraphName}_${pi.paragraphVersion}_${addedDoc.verseSeq}_${addedDoc.documentSeq}_${this.localizeObjectKey(addedDoc, 'descr')}` : 'annex'
  }

  _downloadAnnex(e) {
      const pi = this.displayedParagraph && this.displayedParagraph.paragraphInfo
      if (e && e.detail && e.detail.value && pi) {
          const tpl = this.root.querySelector('#addedDocumentsDr').modelForElement(e.detail.value)
          if (tpl.item.addressUrl) {
              const url = `${this.api.fhcHost}/chap4/sam/docpreview/IV/${pi.paragraphName}/${tpl.item.verseSeq}/${tpl.item.documentSeq}/${this.language}`
              var a = document.createElement('a')
              return fetch(url, {
                  method: 'GET'
              }).then((resp) => {
                  return resp.blob();
              }).then((blob) => {
                  a.href = window.URL.createObjectURL(blob);
                  a.download = `${this._annexBaseName(tpl.item)}.pdf`
                  a.click();
                  return null
              }).finally(() => a.remove())
          }
      }
      this.root.querySelector('#addedDocuments').set('value', null)
  }

  _appendicesTokenChanged() {
      const files = _.clone(this.appendices)
      files.forEach(f => {
          if (!this.appendicesTokens.map(x => x && x.id).includes(f.doc.id)) {
              this.splice('appendices', this.appendices.indexOf(f), 1)
          }
      })
  }

  _appendicesChanged() {
      const files = _.clone(this.appendices)
      const vaadinUpload = this.root.querySelector('#appendix-upload')
      if (vaadinUpload){
          vaadinUpload.set('i18n.addFiles.many', this.localize('upl_fil','Upload file',this.language))
          vaadinUpload.set('i18n.dropFiles.many', this.localize('uplabel','Drop files here...',this.language))
      }

      Promise.all(files.filter(f => !f.attached).map(f => {
          f.attached = true
          return this.api.document().newInstance(this.user, null, {
              documentType: 'result',
              mainUti: this.api.document().uti(f.type, f.name.replace(/.+\.(.+)/,'$1')),
              name: f.name
          }).then(d => this.api.document().createDocument(d)).then(d => {
              f.doc = d
              f.uploadTarget = (f.uploadTarget || vaadinUpload.target).replace(/\{documentId\}/, d.id)
              return f
          })
      })).then(files => {
          if (files.length) {
              vaadinUpload.uploadFiles(files)
              files.forEach(f => {
                  const regAnnex = this.addedDocuments.find(a => f.name.startsWith(this._annexBaseName(a))) || {}
                  this.appendicesTokens.map(x => x && x.id).includes(f.doc.id) || this.push('appendicesTokens', {
                  descr: f.name.replace(/^(.{5})...+(.{5})$/, '$1…$2'),
                  id: f.doc.id,
                  name: f.name,
                  docSeq: regAnnex.documentSeq,
                  verseSeq: regAnnex.verseSeq
              })})
          }
      })
  }

  _hideUpload() {
      this.root.querySelector('#appendix-upload-container').style.display = 'none'
  }

  _onDrag() {
      this.root.querySelector('#appendix-upload-container').style.display = 'block'
  }

  _medicationChecked(item) {
      return item && item.id && item.id.id && this.displayedParagraph && this.displayedParagraph.selectedMedication && this.displayedParagraph.selectedMedication.id.id && this.displayedParagraph.selectedMedication.id.id === item.id.id
  }

  _updateMedication(event) {
      const tr = this.root.querySelector("#transactionRepeat").modelForElement(event.target)
      const t = tr.t
      if (t) {
          const id = event.target.id
          const mpp = this._mpps(t.paragraph).find(mpp => ''+mpp.id.id === id)

          if (mpp && mpp.id.id && (!this.displayedParagraph.selectedMedication || this.displayedParagraph.selectedMedication.id.id !== id)) {
              this.set('displayedParagraph.selectedMedication', mpp)
          } else {
              this.set('displayedParagraph.selectedMedication', null)
          }
      }
  }

  _selectAgreementInList(idx) {
      if (!idx && idx !== 0) {
          this.set('isAgreementSelected', false)
          this.set('displayedParagraph', null);
          this.set('agreementResponse', null);
          this.set('agreementMpps', null);

          return
      }
      this._isLoadingParagraph = true
      const selectedAgreement = this._agreements()[idx]

      ;(selectedAgreement.paragraphInfo ? Promise.resolve(selectedAgreement.paragraphInfo) : this.api.fhc().chaptercontrollerfhc.getParagraphInfosUsingGET('IV', selectedAgreement.paragraph))
          .then(pi => {
              this.set('isAgreementSelected', true)
              this.set('cbValue', '')
              this.set('displayedParagraph', _.assign({}, selectedAgreement, {
                  id: `${pi.paragraphName}/${pi.paragraphVersion}`,
                  descr: `${pi.paragraphName} - ${this.localizeObjectKey(pi, 'keyString')}`,
                  paragraphInfo : pi
              }))
              this.set('checkedVerses', selectedAgreement.verses)
              this.set('agreementResponse', {
                  transactions: [selectedAgreement]
              })

             this.api.fhc().Chaptercontroller().getMppsForParagraphUsingGET('IV', selectedAgreement.paragraph).then(it => ([{
                  paragraph: selectedAgreement.paragraph || pi.paragraphName,
                  transaction: selectedAgreement,
                  mpps: it
              }])).then(links =>{
                 this.set('agreementMpps', links)
                // this.set('displayedParagraph.selectedMedication', links[0].mpps.find(lnk => lnk.id.id === links[0].transaction.service.codes[0].code))
             })
              this._isLoadingParagraph = false
              this.set('tabs', 0)
              this.set('isAskingAgreement', false)
       })
  }

  _closeChapter(e) {
      if (this.displayedParagraph) {
          this.set('isClosingAgreement', true)
          this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp => this.api.fhc().chaptercontrollerfhc.closeAgreementUsingDELETE(this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword, hcp.nihii, hcp.ssin, hcp.firstName, hcp.lastName,
              this.patient.ssin, this.patient.dateOfBirth, this.patient.firstName, this.patient.lastName, this.patient.gender, this.displayedParagraph.decisionReference, this.displayedParagraph.ioRequestReference).then( x => this.api.logMcn(x, this.user, this.patient.id, "CHAPIV", "closure") ))
              .then(res => {
                  this.set('agreementResponse', res)
                  this.set('tabs', 1)

                  console.log(res)

                  return Promise.all(((res || {}) && res.transactions || []).map(t => {
                      const svc = this.displayedParagraph.service
                      if (svc && t.accepted && t.decisionReference && t.end) {
                          const content = Object.values(svc.content || {}).find( c => c.medicationValue && c.medicationValue.paragraphAgreements && c.medicationValue.paragraphAgreements[this.displayedParagraph.paragraph])
                          const paragraphAgreement = content.medicationValue.paragraphAgreements[this.displayedParagraph.paragraph]
                          if (paragraphAgreement) {
                              Object.assign(paragraphAgreement, {end: t.end})
                              this.dispatchEvent(new CustomEvent('update-services', {detail: {services: [svc]}, bubbles: true, composed: true}))
                          }
                      }
                  }))
              }).finally(() => this.set('isClosingAgreement', false))
      }
  }

  _cancelChapter(e) {
      if (this.displayedParagraph) {
          this.set('isClosingAgreement', true)
          this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp => this.api.fhc().chaptercontrollerfhc.cancelAgreementUsingDELETE(this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword, hcp.nihii, hcp.ssin, hcp.firstName, hcp.lastName,
              this.patient.ssin, this.patient.dateOfBirth, this.patient.firstName, this.patient.lastName, this.patient.gender, this.displayedParagraph.decisionReference, this.displayedParagraph.ioRequestReference).then( x => this.api.logMcn(x, this.user, this.patient.id, "CHAPIV", "cancellation") ))
              .then(res => {
                  this.set('agreementResponse', res)
                  this.set('tabs', 1)
                  console.log(res)

                  return Promise.all(((res || {}) && res.transactions || []).map(t => {
                      const svc = this.displayedParagraph.service
                      if (svc && t.accepted && t.decisionReference) {
                          const content = Object.values(svc.content || {}).find( c => c.medicationValue && c.medicationValue.paragraphAgreements && c.medicationValue.paragraphAgreements[this.displayedParagraph.paragraph])
                          const paragraphAgreement = content.medicationValue.paragraphAgreements[this.displayedParagraph.paragraph]
                          if (paragraphAgreement) {
                              Object.assign(paragraphAgreement, {canceled: true, cancelationDate: +new Date()})
                              this.dispatchEvent(new CustomEvent('update-services', {detail: {services: [svc]}, bubbles: true, composed: true}))
                          }
                      }
                  }))
              }).finally(() => this.set('isClosingAgreement', false))
      }
  }

  _isAgreementRejected(inTreatment, accepted){
      return (!inTreatment && !accepted) ? true : false
  }
}

customElements.define(HtPatMcnChapterIVAgreement.is, HtPatMcnChapterIVAgreement)
