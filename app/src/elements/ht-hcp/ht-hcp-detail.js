/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../filter-panel/filter-panel.js';

import '../collapse-button/collapse-button.js';
import './ht-hcp-admin-card.js';
import './ht-hcp-pat-list.js';
import './ht-hcp-member-list.js';
import '../icons/icure-icons.js';
import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtHcpDetail extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
		<style include="iron-flex iron-flex-alignment"></style>
		<style>
			:host {
				height: 100%;
			}

			.container {
				width: 100%;
				height: 100%;
			}

			.zone {
				height: 100%;
			}

			.sub-sublist > paper-item {
				max-height: 30px;
				font-size:12px;

			}

			.padding-0{
				padding:0;
			}

			paper-fab {
				--paper-fab-mini: {
					height: 28px;
					width: 28px;
					padding: 4px;
				};

				margin-right: 4px;
			}

			.first-panel{
				width:20%;
				height:calc(100% - 64px);
				background: var(--app-background-color-dark);
				position:fixed;
				top:64px;
				left:0;
				@apply --shadow-elevation-3dp;
				z-index:3;
			}

			paper-listbox{
				background:transparent;
			}

			paper-item{
				background:transparent;
				outline:0;
				--paper-item-selected:{

				};

				--paper-item-disabled-color:{
					color: red;
				};

				--paper-item-focused: {
					background:transparent;
				};
				--paper-item-focused-before: {
					background:transparent;
				};

			}

			paper-listbox {
				outline:0;
				--paper-listbox-selected-item: {
					color:var(--app-text-color-light);
					background:var(--app-primary-color);
				};
				--paper-listbox-disabled-color:{
					color: red;
				};
			}

			#adminFileMenu paper-item.iron-selected {
				color:var(--app-text-color-light);
				background:var(--app-primary-color);
				@apply --text-shadow;
			}

			collapse-button {
				outline:0;
				--paper-listbox-selected-item: {
					color:var(--app-text-color-light);
					background:var(--app-primary-color);
				}
			}

			collapse-button > .menu-item.iron-selected {
				@apply --padding-menu-item;
				color:var(--app-text-color-light);
				background:var(--app-primary-color);
				@apply --text-shadow;
			}

			.menu-item{
				@apply --padding-right-left-32;
				height:60px;
				@apply --paper-font-button;
				text-transform: inherit;
				justify-content: space-between;
				cursor: pointer;
				@apply --transition;
			}

			.menu-item:hover{
				background: var(--app-dark-color-faded);
				@apply --transition;
			}

			.menu-item .iron-selected{
				background:var(--app-primary-color);

			}

			.menu-item .opened{
				background:white!important;
				width:80%;
				border-radius:2px;
			}

			.hcp-info-container{
				height:96px;
				@apply --padding-right-left-32;
				cursor:pointer;
			}

			.hcp-info-container:hover{
				background: var(--app-dark-color-faded);
				@apply --transition;
			}

			.hcp-info{
				@apply --padding-left-16;
				display:flex;
				flex-direction:column;
				align-items: flex-start;
				justify-content: center;
			}
			.hcp-name{
				font-weight:700;
				line-height:14px;
			}
			.hcp-birthdate{
				font-size: 13px;
			}

			.btn-close{
				position: absolute;
				left: 26px;
				top: 18px;
				background:var(--app-secondary-color);
				color:var(--app-text-color);
				height:20px;
				width:20px;
				z-index: 4;
			}

			.btn-close:hover{
				@apply --transition;
				top: 17px;
				@apply --shadow-elevation-2dp;
			}

			.hcp-picture-container{
				height:60px;
				width:60px;
				border-radius:50%;
				overflow: hidden;
			}

			.hcp-picture-container img{
				width:100%;
				margin:50%;
				transform: translate(-50%,-50%);
			}

			.second-third-panel{
				width:80%;
				height:calc(100% - 64px);
				background: var(--app-background-color);
				position:fixed;
				top:64px;
				right:0;
				z-index:2;
				overflow-y:scroll;
                box-sizing: border-box;
			}

			#savedIndicator{
				position: fixed;
				top:50%;
				right: 0;
				z-index:1000;
				color: white;
				font-size: 13px;
				background:rgba(0,0,0,0.42);
				height: 24px;
				padding: 0 8px 0 12px;
				border-radius: 3px 0 0 3px;
				width: 0;
				opacity: 0;
			}
			.saved{
				animation: savedAnim 2.5s ease-in;
			}
			.saved iron-icon{
				margin-left: 4px;
				padding: 4px;
			}

			@keyframes savedAnim {
				0%{
					width: 0;
					opacity: 0;
				}
				20%{
					width: 114px;
					opacity: 1;
				}
				25%{
					width: 96px;
					opacity: 1;
				}
				75%{
					width: 96px;
					opacity: 1;
				}
				100%{
					width: 0;
					opacity: 0;
				}
			}

			@media screen and (max-width:1025px){
				.first-panel{
					width:30%;
					left:0;
				}

				.second-third-panel{
					width:70%;
				}
			}

		</style>

		<div class="container">
			<paper-item id="savedIndicator">
				[[localize('sav','SAVED',language)]]
				<iron-icon icon="icons:check"></iron-icon>
			</paper-item>
			<div class="first-panel">
				<paper-material class="zone compact-menu">
					<paper-listbox class="padding-0" id="adminFileMenu" selected-item="{{selectedAdminFile}}">
						<paper-item id="_admin_info" class="horizontal layout hcp-info-container">
							<paper-fab class="btn-close" mini="" icon="close" on-tap="close"></paper-fab>
							<div class="hcp-picture-container"><img src\$="[[picture(hcp,hcp.*)]]"></div>
							<div class="hcp-info">
								<div class="hcp-name">{{hcp.firstName}} {{hcp.lastName}}</div>
								<div class="hcp-birthdate">{{hcp.nihii}}</div>
							</div>
						</paper-item>
						<paper-item class="menu-item" id="_patient_list">[[localize('pat','Patients',language)]]<iron-icon class="menu-item-icon" icon="icons:arrow-forward"></iron-icon></paper-item>
						<template is="dom-if" if="[[_isMedicalHouse(hcp,hcp.*)]]">
							<paper-item class="menu-item" id="_member_list">[[localize('member','Members',language)]]<iron-icon class="menu-item-icon" icon="icons:arrow-forward"></iron-icon></paper-item>
						</template>
					</paper-listbox>
				</paper-material>
			</div>
			<template is="dom-if" if="[[isAdminSelected(selectedAdminFile,hcp)]]">
				<ht-hcp-admin-card class="second-third-panel" id="hcp-admin-card" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" resources="[[resources]]" on-hcp-saved="hcpSaved"></ht-hcp-admin-card>
			</template>
			<template is="dom-if" if="[[isPatientListSelected(selectedAdminFile,hcp)]]">
				<ht-hcp-pat-list id="hcp-pat-list" api="[[api]]" user="[[user]]" language="[[language]]" hcp="[[hcp]]" resources="[[resources]]"></ht-hcp-pat-list>
			</template>
			<template is="dom-if" if="[[isMemberListSelected(selectedAdminFile,hcp)]]">
				<ht-hcp-member-list id="hcp-member-list" api="[[api]]" user="[[user]]" language="[[language]]" hcp="[[hcp]]" resources="[[resources]]"></ht-hcp-member-list>
			</template>
		</div>
`;
  }

  static get is() {
      return 'ht-hcp-detail';
	}

  static get properties() {
      return {
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          hcp: {
              type: Object,
              notify: true
          },
          selectedAdminFile: {
              type: Object,
              value: null
          }
      };
	}

  static get observers() {
      return ['hcpChanged(api,user,hcp)'];
	}

  constructor() {
      super();
	}

  _timeFormat(date) {
      return this.api.moment(date).format(date > 99991231 ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY');
	}

  hcpChanged(){
	}

  hcpSaved(event) {
      setTimeout(() => this.$.savedIndicator.classList.remove("saved"), 2000);
      this.$.savedIndicator.classList.add("saved");
	}

  unselectAdminFile() {
      this.$.adminFileMenu.select(null);
	}

  close() {
      this.set('hcp', null);
	}

  toggleMenu(e) {
      e.stopPropagation();
      e.preventDefault();
      e.target.parentElement.parentElement.toggle();
      e.target.parentElement.classList.toggle('opened');
	}

  isNotEmpty(a) {
      return a && a.length > 0;
	}

  isEmpty(a) {
      return !a || a.length === 0;
	}

  isAdminSelected(el) {
      return el && el.id === '_admin_info';
	}

  isPatientListSelected(el){
      return el && el.id === '_patient_list';
	}

  isMemberListSelected(el){
      return el && el.id === '_member_list';
	}

  picture(hcp) {
      if (!hcp) {
          return require('../../../images/male-placeholder.png');
      }
      return hcp.picture ? 'data:image/jpeg;base64,' + hcp.picture : hcp.gender === 'F' || hcp.gender === 'f' ? require('../../../images/female-placeholder.png') : require('../../../images/male-placeholder.png');
	}

  _isMedicalHouse(){
      return this.hcp && this.hcp.type && this.hcp.type.toLowerCase() ==="medicalhouse"
	}
}

customElements.define(HtHcpDetail.is, HtHcpDetail);
