/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../styles/dialog-style.js';

import '../../styles/paper-input-style.js';
import '../ht-spinner/ht-spinner.js';
import '../../styles/buttons-style.js';
import _ from '../../../bower_components/lodash/lodash';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "./elements/tk-localizer";
class HtHcpList extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
		<custom-style>
			<style is="custom-style" include="dialog-style paper-input-style buttons-style">
				:host {
					display: flex;
                    flex-direction: column;
					height: 100%;
					@apply --padding-right-left-32;
				}

				:host #hcps-list {
					outline: none;
                    flex-grow: 1;
				}

				vaadin-grid.material {

					font-family: Roboto, sans-serif;
					--divider-color: rgba(0, 0, 0, var(--dark-divider-opacity));

					--vaadin-grid-cell: {
						padding: 8px;
					};

					--vaadin-grid-header-cell: {
						height: 64px;
						color: rgba(0, 0, 0, var(--dark-secondary-opacity));
						font-size: 12px;
					};

					--vaadin-grid-body-cell: {
						height: 48px;
						color: rgba(0, 0, 0, var(--dark-primary-opacity));
						font-size: 13px;
					};

					--vaadin-grid-body-row-hover-cell: {
						background-color: var(--paper-grey-200);
					};

					--vaadin-grid-body-row-selected-cell: {
						background-color: var(--paper-grey-100);
					};

					--vaadin-grid-focused-cell: {
						box-shadow: none;
						font-weight: bold;
					};
				}

				vaadin-grid.material .cell {
					overflow: hidden;
					text-overflow: ellipsis;
					padding-right: 56px;
				}

				vaadin-grid.material .cell.last {
					padding-right: 24px;
				}

				vaadin-grid.material .cell.numeric {
					text-align: right;
				}

				vaadin-grid.material paper-checkbox {
					--primary-color: var(--paper-indigo-500);
					margin: 0 24px;
				}

				vaadin-grid.material vaadin-grid-sorter .cell {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				vaadin-grid.material vaadin-grid-sorter iron-icon {
					transform: scale(0.8);
				}

				vaadin-grid.material vaadin-grid-sorter:not([direction]) iron-icon {
					color: rgba(0, 0, 0, var(--dark-disabled-opacity));
				}

				vaadin-grid.material vaadin-grid-sorter[direction] {
					color: rgba(0, 0, 0, var(--dark-primary-opacity));
				}

				vaadin-grid.material vaadin-grid-sorter[direction=desc] iron-icon {
					transform: scale(0.8) rotate(180deg);
				}

				paper-input{
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

				.container {
					height: calc(100% - 12px);
                    display: flex;
                    flex-direction: column;
				}

				.btn-container {
					width: 80%;
					left: 20%;
					position: absolute;
					bottom: 28px;

					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					align-items: center;
					margin-top: 2px;
				}

				.export-btn-container {
					width: 100%;
					left: 0;
                    padding: 0 30px;
                    box-sizing: border-box;
				}
                ht-spinner {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
					height: 42px;
					width: 42px;
                }
				paper-dialog#newHcpDialog{
					width: 50vw;
					left: 0;
					transform: translateX(50%);
					margin: 0;
				}

				.newHcpInput {
					width: 100%;
				}

				.formNewHcp {
					height: 350px;
					width: 100%;
					box-sizing: border-box;
				}

                #patients-list {
                    flex-grow: 1;
                }

				.hcp-photo {
					background: rgba(0, 0, 0, 0.1);
					height: 26px;
					width: 26px;
					min-width: 26px;
					border-radius: 50%;
					margin-right: 8px;
					overflow: hidden !important;
					padding-right: 0 !important;
				}

				.hcp-photo img {
					width: 100%;
					margin: 50%;
					transform: translate(-50%, -50%);
				}

				#selectHcpOption {
					height: 34px;
					padding: 14px;
					background: var(--app-background-color-dark);
					-webkit-transition: background .15s;
					transition: background .15s;
					z-index: 2;
					display: flex;
					border-left: 1px solid rgba(0, 0, 0, .05);
					border-right: 1px solid rgba(0, 0, 0, .05);

				}

				#selectHcpOption_back {
					min-width: 80px;
					cursor: pointer;
					line-height: 35px;
				}

				#selectHcpOption_text {
					margin: auto;
				}

				.labelFusion{
					width: 200px;
				}

				paper-dialog#fusionDialog{
					width:650px;
					height: 200px;
                    display: flex;
                    flex-direction: column;
                    padding: 8px;
				}

                paper-dialog#fusionDialog > * {
                    width: 100%;
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                paper-dialog#fusionDialog .buttons {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

				#fusionHcpSelect{
					border : 0px
				}

                .add-btn-mobile {
                    display: none;
                }

                @media screen and (max-width: 528px) {
                    .nomobile {
                        display: none;
                    }

                    .add-btn-container {
                        width: 100%;
                        left: inherit;
                        position: initial;
                        justify-content: initial;
                        padding-top: 15px;
                        overflow-x: scroll;
                        height: 100px;
                        border-left: 1px dashed lightgrey;
                        border-right: 1px dashed lightgrey;
                        box-sizing: border-box;
                    }

                    .add-btn-container {
                        display: none;
                    }

                    .add-btn-mobile {
                        display: block;
                        position: fixed;
                        bottom: 28px;
                        right: 36px;
                    }

                    .add-list-mobile {
                        position: fixed;
                        bottom: 64px;
                        right: 40px;

                        background: var(--app-background-color-light);
                        width: 200px;
                        border: 1px solid rgba(0, 0, 0, .1);
                        border-radius: 2px;
                        z-index: 99;
                        padding: 8px 0;

                        transition: .25s cubic-bezier(0.075, 0.82, 0.165, 1);
                        transform: scaleY(0);
                        transform-origin: bottom;
                    }

                    .shown-menu {
                        transform: scaleY(1);
                    }

                    .toggle-btn {
                        background: var(--app-secondary-color);
						color: var(--app-text-color-light);
						box-shadow: var(--app-shadow-elevation-1);
						border-radius: 3px;
						height: 28px;
						width: 28px;
						box-sizing: border-box;
						padding: 4px;
                    }

					.toggle-btn:hover {
						box-shadow: var(--app-shadow-elevation-2);
						background: var(--app-secondary-color-dark);
						color: var(--app-text-color-light);
					}

                    .add-elem-mobile {
                        cursor: pointer;
                        padding: 10px;
                    }

                    .add-elem-mobile:hover {
                        background: rgba(0, 0, 0, .1);
                    }
                }

				.content {
					padding: 0 12px;
				}
				
				#filter{
					margin: 24px 0;
				}

			</style>
		</custom-style>

		<div class="container">
			<template is="dom-if" if="{{modeGrid}}">
				<div id="selectHcpOption">
					<div id="selectHcpOption_back" on-tap="_switchMode">
						<iron-icon icon="vaadin:arrow-left"></iron-icon>
						<span>[[localize('can','Cancel',language)]]</span>
					</div>
					<div id="selectHcpOption_text">
						[[nbHcpSelected]] [[localize('hc_par','Prestataire',language)]] [[localize('multiple_selected','Selected',language)]]
					</div>
				</div>
			</template>
			<template is="dom-if" if="{{!modeGrid}}">
				<paper-input id="filter" always-float-label="" label="[[localize('fil','Filter',language)]]" value="{{filterValue}}" on-keydown="refresh"></paper-input>
			</template>
			<ht-spinner class="center" active="[[isLoadingHcp]]"></ht-spinner>
			<vaadin-grid id="hcps-list" class="material" multi-sort="[[multiSort]]" active-item="{{activeItem}}" on-tap="click">

				<vaadin-grid-column width="50px">
					<template class="header">
						<vaadin-grid-sorter path="id">[[localize('','Id',language)]]</vaadin-grid-sorter>
					</template>
					<template>
						<div class="cell frozen">[[item.id]]</div>
					</template>
				</vaadin-grid-column>

				<vaadin-grid-column width="50px">
					<template class="header">
						<div class="cell frozen">[[localize('pic','Picture',language)]]</div>
					</template>
					<template>
						<template is="dom-if" if="[[!modeGrid]]">
							<div class="cell frozen hcp-photo"><img src\$="[[picture(item)]]"></div>
						</template>
						<template is="dom-if" if="[[modeGrid]]">
							<vaadin-checkbox id="[[item.id]]" patient="[[item]]" checked="[[_hcpSelected(item, hcpSelected.*)]]" on-checked-changed="_checkHcp"></vaadin-checkbox>
						</template>
					</template>
				</vaadin-grid-column>

				<vaadin-grid-column width="100px">
					<template class="header">
						<vaadin-grid-sorter path="lastName">[[localize('las_nam','Last name',language)]]</vaadin-grid-sorter>
					</template>
					<template>
						<div class="cell frozen">[[item.lastName]]</div>
					</template>
				</vaadin-grid-column>
				<vaadin-grid-column width="100px">
					<template class="header">
						<vaadin-grid-sorter path="firstName">[[localize('fir_nam','First name',language)]]</vaadin-grid-sorter>
					</template>
					<template>
						<div class="cell frozen">[[item.firstName]]</div>
					</template>
				</vaadin-grid-column>
				<vaadin-grid-column width="100px">
					<template class="header">
						<vaadin-grid-sorter path="speciality">[[localize('spe','Speciality',language)]]</vaadin-grid-sorter>
					</template>
					<template>
						<div class="cell frozen">[[item.speciality]]</div>
					</template>
				</vaadin-grid-column>
				<vaadin-grid-column width="100px">
					<template class="header">
						<div class="cell frozen">[[localize('ema','Email',language)]]</div>
					</template>
					<template>
						<div class="cell frozen">[[item.email]]</div>
					</template>
				</vaadin-grid-column>
				<vaadin-grid-column>
					<template class="header">
						<div class="cell numeric">[[localize('pho','Phone',language)]]</div>
					</template>
					<template>
						<div class="cell numeric">[[item.phone]]</div>
					</template>
				</vaadin-grid-column>
				<vaadin-grid-column>
					<template class="header">
						<div class="cell numeric">[[localize('mob','Mobile',language)]]</div>
					</template>
					<template>
						<div class="cell numeric">[[item.mobile]]</div>
					</template>
				</vaadin-grid-column>
			</vaadin-grid>

			<div class="btn-container export-btn-container nomobile">
				<template is="dom-if" if="{{!modeGrid}}">
					<paper-button class="button button--other" on-tap="_exportListToCsv">[[localize('export_csv','Export to CSV',language)]]</paper-button>
					<paper-button class="button button--other" on-tap="_openAddHcpDialog">[[localize('add_hcp','Add New HCP',language)]]</paper-button>
					<paper-button class="button button--other" on-tap="_switchMode">[[localize('fusion_hcp','Fusionner HCP',language)]]</paper-button>
				</template>
				<template is="dom-if" if="{{modeGrid}}">
                    <paper-button class="button" on-tap="_switchMode">[[localize('can','Cancel',language)]]</paper-button>
					<paper-button class="button button--other" on-tap="_openFusionDialog">[[localize('fusion_hcp','Fusionner HCP',language)]]</paper-button>
				</template>
			</div>

            <div class="add-btn-mobile">
                <paper-fab mini="" icon="more-vert" id="add-btn-mobile-btn" class="toggle-btn" on-tap="toggleMobileMenu"></paper-fab>
                <paper-tooltip position="left" for="add-btn-mobile-btn">[[localize('more','More',language)]]</paper-tooltip>
                <div id="add-list-mobile" class\$="add-list-mobile [[isShown]]">
                    <template is="dom-if" if="[[!modeGrid]]">
                        <div class="add-elem-mobile" on-tap="_exportListToCsv">[[localize('export_csv','Export to CSV',language)]]</div>
                        <div class="add-elem-mobile" on-tap="_openAddHcpDialog">[[localize('add_hcp','Add New HCP',language)]]</div>
                        <div class="add-elem-mobile" on-tap="_switchMode">[[localize('fusion_hcp','Fusionner HCP',language)]]</div>
                    </template>
                    <template is="dom-if" if="[[modeGrid]]">
                        <div class="add-elem-mobile" on-tap="_switchMode">[[localize('can','Cancel',language)]]</div>
                        <div class="add-elem-mobile" on-tap="_openFusionDialog">[[localize('fusion_hcp','Fusionner HCP',language)]]</div>
                    </template>
                </div>
            </div>

			<paper-dialog id="newHcpDialog">
				<h2 class="modal-title">[[localize('add_hcp','Ajouter un prestataire',language)]]</h2>
				<div class="content">
					<div id="" class="formNewHcp">
						<paper-input class="addHcpInput" always-float-label="" label="[[localize('las_nam','Last name',language)]]" value="{{newHcp.lastName}}"></paper-input>
						<paper-input class="addHcpInput" always-float-label="" label="[[localize('fir_nam','First name',language)]]" value="{{newHcp.firstName}}"></paper-input>
						<paper-input class="addHcpInput" always-float-label="" label="[[localize('ema','Email',language)]]" value="{{newHcp.email}}"></paper-input>
						<paper-input class="addHcpInput" always-float-label="" label="[[localize('inami','NIHII',language)]]" value="{{newHcp.nihii}}"></paper-input>
						<paper-input class="addHcpInput" always-float-label="" label="[[localize('ssin','SSIN',language)]]" value="{{newHcp.ssin}}"></paper-input>
					</div>
	
					<template is="dom-if" if="[[_checkListDoublon(listDoublon.*)]]">
						<vaadin-grid id="doublon" class="material" multi-sort="[[multiSort]]" items="[[listDoublon]]">
							<vaadin-grid-column>
								<template class="header">
									<vaadin-grid-sorter path="lastName">[[localize('las_nam','Last name',language)]]</vaadin-grid-sorter>
								</template>
								<template>
									<div class="cell frozen">[[item.hcp.lastName]]</div>
								</template>
							</vaadin-grid-column>
							<vaadin-grid-column>
								<template class="header">
									<div path="firstName">[[localize('fir_nam','First name',language)]]</div>
								</template>
								<template>
									<div class="cell frozen">[[item.hcp.firstName]]</div>
								</template>
							</vaadin-grid-column>
							<vaadin-grid-column width="50px">
								<template class="header">
									<div class="cell numeric">[[localize('ssin','NISS',language)]]</div>
								</template>
								<template>
									<div class="cell numeric">[[item.hcp.ssin]]</div>
								</template>
							</vaadin-grid-column>
							<vaadin-grid-column width="50px">
								<template class="header">
									<div class="cell numeric">[[localize('nihii','INAMI',language)]]</div>
								</template>
								<template>
									<div class="cell numeric">[[item.hcp.nihii]]</div>
								</template>
							</vaadin-grid-column>
							<vaadin-grid-column>
								<template class="header">
									<div class="cell numeric">[[localize('message','Message',language)]]</div>
								</template>
								<template>
									<div class="cell numeric">[[getMessages(item.messages)]]</div>
								</template>
							</vaadin-grid-column>
						</vaadin-grid>
					</template>
				</div>
				<div class="buttons">
					<paper-button dialog-dismiss="" class="button">[[localize('can','Cancel',language)]]</paper-button>
					<paper-button dialog-confirm="" autofocus="" on-tap="confirmAddHcp" class="button button--save">[[localize('add','Add',language)]]</paper-button>
				</div>
			</paper-dialog>

			<paper-dialog id="fusionDialog">
				<label>[[localize('chose_hcp_will_stay','Choisissez le prestataire qui restera',language)]]</label>
				<paper-input-container>
					<iron-input slot="input">
						<input id="fusionHcpSelect" value="{{_getNameHcp(idFusionHcp)}}" readonly="" on-tap="_openPopupMenu">
					</iron-input>
					<paper-menu-button id="paper-menu-button" slot="suffix" horizontal-offset="[[listBoxOffsetWidth]]">
						<iron-icon icon="paper-dropdown-menu:arrow-drop-down" slot="dropdown-trigger"></iron-icon>
						<paper-listbox id="dropdown-listbox" slot="dropdown-content" selected="{{fusionSelected}}">
							<template is="dom-repeat" items="{{hcpSelected}}">
								<paper-item>{{item.hcp.name}}</paper-item>
							</template>
						</paper-listbox>
					</paper-menu-button>
				</paper-input-container>
				<template is="dom-if" if="[[fusionSelected>=0]]">
					<label>[[localize('hcp_selected','prestataire sélectionné',language)]]</label><br>

					<label class="labelFusion">[[localize('name','Nom',language)]] : [[_getNameHcp(idFusionHcp)]]</label>
					<label class="labelFusion">[[localize('special','Spécialité',language)]] : [[_getSpeciality(idFusionHcp)]]</label>
					<label class="labelFusion">[[localize('email','E-mail',language)]] : [[_getEmail(idFusionHcp)]]</label>
				</template>
				<div class="buttons">
					<paper-button dialog-dismiss="" class="button">[[localize('can','Cancel',language)]]</paper-button>
					<paper-button dialog-confirm="" autofocus="" on-tap="confirmFusionHcp" class="button button--save">[[localize('fusion','Fusion',language)]]</paper-button>
				</div>
			</paper-dialog>
		</div>
`;
  }

  static get is() {
      return 'ht-hcp-list';
	}

  static get properties() {
      return {
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          selectedHcp: {
              type: Object,
              notify: true
          },
          activeItem: {
              type: Object
          },
          isLoadingHcp: {
              type: Boolean,
              value: false
          },
          newHcp :{
              type: Object
          },
          listDoublon :{
              type: Array,
              value: ()=> []
          },
          lastResearch :{
              type : Object,
              value :{
                  lastName :"",
                  ssin : "",
                  nihii : "",
                  email : ""
              }
          },
          modeGrid :{
              type: Boolean,
              value : false
          },
          hcpSelected: {
              type: Array,
              notify: true,
              value: () => []
          },
          nbHcpSelected: {
              type: Number,
              value: 0
          },
          fusionSelected: {
              type: Number,
              observer: '_fusionSelectedChanged'
          },
          idFusionHcp: {
              type: String,
              notify: true
          },
          mobileMenuHidden: {
              type: Boolean,
              value: true
          },
          isShown: {
              type: String,
              value: ""
          }
      };
	}

  static get observers() {
      return ['launchCheckDoublon(newHcp,newHcp.*)'];
  }

  constructor() {
      super();
	}

  ready() {
      super.ready();

      const grid = this.$['hcps-list'];

      grid.lastParams = null; //Used to prevent double calls
      grid.searchMilestones = {};
      grid.size = 0;
      grid.pageSize = 50;
      grid.dataProvider = function (params, callback) {
          const desc = params.sortOrders && params.sortOrders[0] && params.sortOrders[0].direction === 'desc' || false;

          const pageSize = params.pageSize || grid.pageSize;
          const startIndex = (params.page || 0) * pageSize;
          const endIndex = ((params.page || 0) + 1) * pageSize;

          const thisParams = this.filterValue + "|" + (desc ? "<|" : ">|") + startIndex + ":" + pageSize + ":";

          let latestSearchValue = this.filterValue;
          this.latestSearchValue = latestSearchValue;
          let latestSearchDirection = desc;

          if (!latestSearchValue || latestSearchValue.length < 1) {
              console.log("Cancelling empty search");
              grid.set("size", 0);
              callback([]);
              return;
          }

          const keys = _.sortBy(Object.keys(grid.searchMilestones).map(x => parseInt(x, 10)), x => x);
          const keysIdx = (startIndex > 0 ? _.sortedIndex(keys, startIndex) || 0 : 0) - 1;

          let msIndex = keysIdx >= 0 ? keys[keysIdx] : 0;
          let deltaIndex = startIndex - msIndex;
          let keyPair = grid.searchMilestones[msIndex] || {};
          let count = pageSize + deltaIndex || 100;

          if (grid.lastParams !== thisParams) {
              grid.lastParams = thisParams;
              console.log("Starting search for " + thisParams);
              grid.latestPromise = this.api.hcparty().findByName(latestSearchValue, keyPair.startKey || null, keyPair.startKeyDocId || null, count, desc);
          }

          grid.latestPromise.then(function (res) {
              const desc = params.sortOrders && params.sortOrders[0] && params.sortOrders[0].direction === 'desc' || false;
              if (this.filterValue !== latestSearchValue || desc !== latestSearchDirection) {
                  grid.searchMilestones = {};
                  console.log("Cancelling obsolete search");
                  return;
              }
              if (res.nextKeyPair) {
                  grid.searchMilestones[(msIndex || 0) + res.pageSize] = res.nextKeyPair;
              } else {
                  res.nextKeyPair = {};
              }

              var rows = _.slice(res.rows, deltaIndex).map(this.pimpHcp);
              var totalSize = res.rows.length < count ? msIndex + res.rows.length : msIndex + count + 100;

              //console.log(`Server call at idx ${msIndex} (∆ = ${deltaIndex}), keyPair = {${keyPair.startKey}:${keyPair.startKeyDocId}}, count = ${count}: ${rows.length} rows sel. out of ${res.rows.length}. Next keypair is {${res.nextKeyPair.startKey}:${res.nextKeyPair.startKeyDocId}}. Total size is : ${totalSize}`)
              if (grid.size !== totalSize) {
                  grid.set("size", totalSize);
              }
              callback(rows);
          }.bind(this));
      }.bind(this);
	}

  refresh() {
      //Give the gui the time to update the field
      setTimeout(function () {
          let currentValue = this.filterValue;

          if (this.latestSearchValue === currentValue) {
              return;
          }
          setTimeout(function () {
              if (currentValue === this.filterValue) {
                  this.set('isLoadingHcp',true)
                  console.log("Triggering search for " + this.filterValue);
                  this.$['hcps-list'].clearCache();
                  this.set('isLoadingHcp',false)
              } else {
                  console.log("Skipping search for " + this.filterValue + " != " + currentValue);
                  this.set('isLoadingHcp',false)
              }
          }.bind(this), 500); //Wait for the user to stop typing
      }.bind(this), 100);
	}

  pimpHcp(h) {
      h.email = h.addresses && h.addresses.map(a => a.telecoms && a.telecoms.filter(t => t.telecomType === 'email').map(t => t.telecomNumber).join()).filter(a => a).join() || '';
      h.phone = h.addresses && h.addresses.map(a => a.telecoms && a.telecoms.filter(t => t.telecomType === 'phone').map(t => t.telecomNumber).join()).filter(a => a).join() || '';
      h.mobile = h.addresses && h.addresses.map(a => a.telecoms && a.telecoms.filter(t => t.telecomType === 'mobile').map(t => t.telecomNumber).join()).filter(a => a).join() || '';
      return h;
	}

  click(e) {
	    if(this.modeGrid)return;
      const selected = this.activeItem;
      console.log('selected ' + selected + ' - ' + this.latestSelected);
      if (this.inDoubleClick && (this.latestSelected === selected || this.latestSelected && !selected || !this.latestSelected && selected)) {
          this.set('selectedHcp', selected || this.latestSelected);
      } else {
          this.latestSelected = selected;
          this.inDoubleClick = true;
          setTimeout(() => {
              delete this.inDoubleClick;
          }, 500);
      }
	}

  toggleMobileMenu() {
      this.set('mobileMenuHidden', !this.mobileMenuHidden)
      this.set('isShown', !this.mobileMenuHidden ? "shown-menu" : "")
  }

  _exportListToCsv() {
      var columns = ["lastName", "firstName", "gender", "dateOfBirth", "ssin", "email", "phone", "mobile"];
      var csv = columns.join(";") + "\n";
      var grid = this.$['hcps-list'];
      grid.dataProvider({pageSize:10000}, function(items) {
          items.forEach( item =>
              csv += columns.map(col => item[col]).join(";") + '\n'
          );

          var file = new Blob([csv] ,{type: "text/csv"});
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";

          var url = window.URL.createObjectURL(file);
          a.href = url;
          a.download = "hcps-list.csv";
          a.click();
          window.URL.revokeObjectURL(url)
      })

  }

  _openAddHcpDialog(){
	    this.set('listDoublon',[])
      this.set("newHcp",{})
	    this.$['newHcpDialog'].open()

	}

  confirmAddHcp(){
      let newHcpData ={
          name : this.newHcp.lastName+" "+this.newHcp.firstName,
        	lastName : this.newHcp.lastName,
        	firstName : this.newHcp.firstName,
        	nihii : this.newHcp.nihii,
        	ssin : this.newHcp.ssin,
          addresses : [
              {
                  addressType: "work",
                  descr : "",
                  street : "",
                  houseNumber: "",
                  postboxNumber : "",
                  postalCode : "",
                  city : "",
                  country: "",
                  telecoms : [
                      {
                          telecomType: "email",
                          telecomNumber: this.newHcp.email
                      }
                  ]
              }
          ],
        	languages:[
        	  this.language
          ]
    	}

    	this.api.hcparty().createHealthcareParty(newHcpData).then(hcp =>{
          console.log(hcp)
      })
	}

  _checkDoublon(){
	    this.previousValue="";
	    if(_.isEqual(this.newHcp,{})){
          this.set("listDoublon",[]);
          return;
      }

      let tamponDoublon=this.listDoublon;
      let listPromises =[];

      //tamponDoublon.map(doublon => doublon.messages = [])

      if(this.newHcp && this.newHcp.lastName){
          if(!this.lastResearch.lastName || this.lastResearch.lastName!==this.newHcp.lastName){
              this.lastResearch.lastName=this.newHcp.lastName;
              listPromises.push(this.api.hcparty().findByName(this.newHcp.lastName,null,null,100,"desc").then(hcps =>{
                  hcps.rows.map(hcp =>{
                      if(_.lowerCase(hcp.lastName) !== _.lowerCase(this.lastResearch.lastName)){
                          _.remove((tamponDoublon.find(doublon => doublon && doublon.hcp && doublon.hcp.id===hcp.id) || {messages :[]}).messages,msg => msg==="same_name")
                          return;
                      }
                      const index = tamponDoublon.findIndex(doublon => doublon && doublon.hcp && doublon.hcp.id===hcp.id)
                      index!==-1 ?
                          tamponDoublon[index].messages.push("same_name") :
                          tamponDoublon.push({
                              hcp: hcp,
                              messages : ["same_name"]
                          })
                  })
              }))
          }
          else{
              tamponDoublon.map(doublon => doublon && doublon.hcp && _.lowerCase(doublon.hcp.lastName)!==_.lowerCase(this.lastResearch.lastName) ? doublon.messages.filter(message => message!=="same_name") : "");
          }
      }

      if(this.newHcp && this.newHcp.ssin){
          if(!this.lastResearch.ssin || this.lastResearch.ssin!==this.newHcp.ssin){
              this.lastResearch.ssin=this.newHcp.ssin;
              listPromises.push(this.api.hcparty().findBySsinOrNihii(this.newHcp.ssin,null,null,100,"desc").then(hcps =>{
                  hcps.rows.map(hcp =>{
                      if(_.lowerCase(hcp.ssin) !== _.lowerCase(this.lastResearch.ssin)){
                          _.remove((tamponDoublon.find(doublon => doublon && doublon.hcp && doublon.hcp.id===hcp.id) || {messages :[]}).messages,msg => msg==="same_ssin")
                          return;
                      }
                      const index = tamponDoublon.findIndex(doublon => doublon && doublon.hcp && doublon.hcp.id===hcp.id)
                      index!==-1 ?
                          _.lowerCase(tamponDoublon[index].hcp.ssin)===_.lowerCase(this.lastResearch.ssin) ? tamponDoublon[index].messages.push("same_ssin") :"" :
                          tamponDoublon.push({
                              hcp: hcp,
                              messages : ["same_ssin"]
                          })
                  })
              }))
          }
          else{
              tamponDoublon.map(doublon => doublon && doublon.hcp && _.lowerCase(doublon.hcp.ssin)!==_.lowerCase(this.lastResearch.ssin) ? doublon.messages.filter(message => message!=="same_ssin") : "");
          }
      }

      if(this.newHcp && this.newHcp.nihii){
          if(!this.lastResearch.nihii || this.lastResearch.nihii!==this.newHcp.nihii){
              this.lastResearch.nihii=this.newHcp.nihii;
              listPromises.push(this.api.hcparty().findBySsinOrNihii(this.newHcp.nihii,null,null,100,"desc").then(hcps =>{
                  hcps.rows.map(hcp =>{
                      if(_.lowerCase(hcp.nihii) !== _.lowerCase(this.lastResearch.nihii)){
                          _.remove((tamponDoublon.find(doublon => doublon && doublon.hcp && doublon.hcp.id===hcp.id) || {messages :[]}).messages,msg => msg==="same_nihii")
                          return;
                      }
                      const index = tamponDoublon.findIndex(doublon => doublon && doublon.hcp && doublon.hcp.id===hcp.id)
                      index!==-1 ?
                          _.lowerCase(tamponDoublon[index].hcp.nihii)===_.lowerCase(this.lastResearch.nihii) ? tamponDoublon[index].messages.push("same_nihii") :"" :
                          tamponDoublon.push({
                              hcp: hcp,
                              messages : ["same_nihii"]
                          })
                  })
              }))
          }
          else{
              tamponDoublon.map(doublon => doublon && doublon.hcp && _.lowerCase(doublon.hcp.nihii)!==_.lowerCase(this.lastResearch.nihii) ? doublon.messages.filter(message => message!=="same_nihii") : "");
          }
      }

      if(this.newHcp && this.newHcp.email){
          if(!this.lastResearch.email || this.lastResearch.email!==this.newHcp.email){
              this.lastResearch.email=this.newHcp.email;
              listPromises.push(this.api.user().getUserByEmail(this.newHcp.email).then(user =>{
                  this.api.hcparty().getHealthcareParty(user.healthcarePartyId).then(hcp =>{
                      if(_.lowerCase(user.email) !== _.lowerCase(this.lastResearch.email)){
                          _.remove((tamponDoublon.find(doublon => doublon && doublon.hcp && doublon.hcp.id===hcp.id) || {messages :[]}).messages,msg => msg==="same_email")
                          return;
                      }
                      const index = tamponDoublon.findIndex(doublon => doublon && doublon.hcp && doublon.hcp.id===hcp.id)
                      index!==-1 ?
                          tamponDoublon[index].messages.push("same_email") :
                          tamponDoublon.push({
                              hcp: hcp,
                              messages : ["same_email"]
                          })
                  })
              }).catch(error => {
                  tamponDoublon.map(doublon => _.remove((doublon && doublon.messages || {messages : []}),msg => msg==="same_email"))
              }))
          }
          else{
              tamponDoublon.map(doublon => doublon && doublon.hcp && _.lowerCase(doublon.hcp.email)!==_.lowerCase(this.lastResearch.email) ? doublon.messages.filter(message => message!=="same_email") : "");
          }
      }


      Promise.all(listPromises).then( x =>{
          this.set("listDoublon",tamponDoublon.filter(doublon => doublon.messages.length>0))
      })
	}

  _checkListDoublon(){
	    return !!(this.listDoublon && this.listDoublon.length>0);
	}

  getMessages(messages){
	    return _.join(messages.map(msg => this.localize(msg,msg,this.language)),", ")
	}

  launchCheckDoublon(){
      this.previousValue = this.newHcp
      setTimeout( () => {
          if (this.previousValue === this.newHcp) {
              this._checkDoublon();
          }
      }, 5000) //Wait for the user to stop typing
	}

  _switchMode(){
	    this.set('nbHcpSelected',0);
	    this.set('hcpSelected',[]);
	    this.set('modeGrid',!this.modeGrid)
	}

  _openFusionDialog(){
      this.$['fusionDialog'].open()
	}

  _hcpSelected(item) {
      if (item) {
          const mark = this.hcpSelected.find(m => m.id === item.id)
          return mark && mark.check
      } else {
          return false
      }
  }

  _checkHcp(e) {
      e.stopPropagation();
      e.preventDefault();
      const targetId = e.target.id

      if (targetId !== "") {
          const mark = this.hcpSelected.find(m => m.id === targetId)
          if (!mark) {
              this.api.hcparty().getHealthcareParty(targetId).then(hcp =>{
                  this.push('hcpSelected', {id: targetId, check: true, hcp:this.api.register(hcp, 'hcp')})
                  this.set('nbHcpSelected', this.hcpSelected.filter(hcp => hcp.check).length)
              })
              } else {
              mark.check = !mark.check
              this.notifyPath('hcpSelected.*')
              this.set('nbHcpSelected', this.hcpSelected.filter(hcp => hcp.check).length)
          }
      }

  }

  picture(hcp) {
      if (!hcp) {
          return require('../../../images/male-placeholder.png')
      }
      return hcp.picture ? 'data:image/png;base64,' + hcp.picture : hcp.gender === 'female' ? require('../../../images/female-placeholder.png') : require('../../../images/male-placeholder.png')
  }

  _fusionSelectedChanged(selected) {
      if (this.readOnly) {
          return
      }
      this.set('idFusionHcp', this.hcpSelected[selected].id || null)
  }

  _getNameHcp(id){
	    return this.hcpSelected.find(hcp => hcp.id===id).hcp.name;
	}

  _getSpeciality(id){
      return this.hcpSelected.find(hcp => hcp.id===id).hcp.speciality;
  }

  _getEmail(id){
      return _.flatten(this.hcpSelected.find(hcp=>hcp.id === id).hcp.addresses.map(adr=>_.compact(adr.telecoms.map(tel=>tel.telecomType === "email" ? tel.telecomNumber : ""))))[0];
  }

  confirmFusionHcp(){
	    //Todo fusionHcp
	}
}

customElements.define(HtHcpList.is, HtHcpList);
