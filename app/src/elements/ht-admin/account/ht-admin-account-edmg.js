/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../../styles/dialog-style.js';

import moment from 'moment/src/moment';
import _ from 'lodash/lodash';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminAccountEdmg extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles dialog-style">
            :host {
                display: block;
                height: calc(100% - 20px)
            }

            :host *:focus{
                outline:0!important;
            }

            .edmg-panel{
                height: 100%;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                position:relative;
            }

            .line {
                display: flex;
            }
            .line.p8 {
                padding: 0 8px;
                box-sizing: border-box;
            }
            .line.p16 {
                padding: 0 16px;
                box-sizing: border-box;
            }
            .line > * {
                flex-grow: 1;
            }
            .line > *.no-grow {
                flex-grow: 0;
            }
            .line > *.w50 {
                width: 50px;
            }
            .line > *.w100 {
                width: 100px;
            }
            .line > *.w150 {
                width: 150px;
            }
            .line > *.grow-3 {
                flex-grow: 3;
            }

            .line span.lang {
                padding-top: 20px;
                width: 80px !important;
            }

            .marginRight10 {
                margin-right:10px;
            }

            @media screen and (max-width: 1024px) {
                .nomobile {
                    display: none;
                }
                .onlymobile {
                    display: block;
                }
            }

            .user-panel .panel-content {
                padding: 0 12px;
                overflow: hidden;
                border-bottom: 1px solid var(--app-background-color-dark);
                box-sizing: border-box;
                height: 400px;
                overflow-y: auto;
            }

            paper-tabs {
                background: var(--app-background-color);
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                --paper-tabs: {
                    color: var(--app-text-color);
                };
            }

            paper-tab {
                --paper-tab-ink: var(--app-text-color);
            }

            paper-tab.iron-selected {
                font-weight: bold;
            }

            paper-tab.iron-selected iron-icon{
                opacity: 1;
            }

            paper-tab iron-icon{
                opacity: 0.5;
                color: var(--app-text-color);
            }

            #edmgRegistrationComplete {
                width: 100%;
                height: 100%;
                background: linear-gradient(rgba(255,255,255,.3) 0%,rgba(255,255,255,.85) 50%);
                position: absolute;
                z-index: 10;
                font-size: 1.8em;
                text-align: center;
                color: var(--app-secondary-color);
            }

            #edmgRegistrationComplete iron-icon{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-120%);
                height: 20%;
                width: 20%;
            }

            #edmgRegistrationComplete p {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 30%;
                padding: .5em 2em;
                line-height: 1.5;
                font-weight: 700;
                text-transform: none;
                border-top: 2px solid var(--app-secondary-color);
            }

            .statusBulletContainer { 
                height:65px; 
                display:flex; 
                align-items: center; 
                border-bottom: 1px solid var(--app-background-color-dark);
            }

            .statusBullet {
                display:block;
                width: 12px;
                height: 12px;
                background-color: var(--app-status-color-nok);
                -webkit-border-radius: 12px;
                -moz-border-radius: 12px;
                border-radius: 12px;
                margin:0 auto;
            }

            .statusBullet.ok {
                background-color: var(--app-status-color-ok);
            }

            .textAlignCenter { text-align: center; }

            .headerField {
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                background-color: #ffffff;
                height: 48px;
                --paper-input-container-underline: {
                    display: none
                };
                --paper-input-container-underline-focus: {
                    display: none
                };
                --paper-input-container-underline-disabled: {
                    display: none
                };
                --paper-input-container-disabled: {
                    opacity: 1;
                };
                font-weight: 700;
                color: var(--app-text-color);
            }

            .marginRight10 { margin-right:10px; }

            .row { 
                display:block; 
                width:100%;
                background-color: var(--app-background-color);
            }
            .col-10 { flex-grow: 1; width: 10%; box-sizing: border-box; float:left }
            .col-15 { flex-grow: 1; width: 15%; box-sizing: border-box; float:left }
            .col-25 { flex-grow: 1; width: 25%; box-sizing: border-box; float:left }
            .col-20 { flex-grow: 1; width: 20%; box-sizing: border-box; float:left }
            .col-30 { flex-grow: 1; width: 30%; box-sizing: border-box; float:left }
            .col-35 { flex-grow: 1; width: 35%; box-sizing: border-box; float:left }
            .col-40 { flex-grow: 1; width: 40%; box-sizing: border-box; float:left }
            .col-45 { flex-grow: 1; width: 45%; box-sizing: border-box; float:left }
            .col-50 { flex-grow: 1; width: 50%; box-sizing: border-box; float:left }

            .error {
                color: #e53935;
            }

            .buttons{
                width:100%;
                text-align:center;
            }

            .col-10 paper-input{
                --paper-input-container-underline-focus: {
                    display: none
                };
                --paper-input-container-underline-disabled: {
                    display: none
                };
                --paper-input-container-disabled: {
                    opacity: 1;
                };
            }
            .left-col, .right-col{
                flex-grow: 1;
                width: 50%;
                box-sizing: border-box;
                float:left
            }

            .horizontal {
                display: grid;
                flex-direction: row;
                flex-wrap: wrap;
                flex-basis: 100%;
                align-items: center;
                box-shadow: var(--app-shadow-elevation-2);
            }

            .horizontal paper-input {
                @apply --padding-right-left-16;
                height: 65px;
                border-bottom: 1px solid var(--app-background-color-dark);
                --paper-input-container-focus-color: var(--app-primary-color-dark);
            }

            .horizontal .tile paper-input {
                padding-left: initial;
                padding-right: initial;
                padding: 0 8px;
            }

            .horizontal paper-input-container {
                @apply --padding-right-left-16;
                padding:0;
            }

            .horizontal paper-menu-button{
                padding:0;
            }

            .horizontal vaadin-date-picker {
                @apply --padding-right-left-16;
                padding-top: 4px;
                height: 48px;
            }

        </style>

        <link rel="import" href="../../dynamic-form/validator/ht-iban-validator.html">

        <div class="edmg-panel">
            <h4>[[localize('my_pro', 'My profil', language)]] - [[localize('acc_edmg_info', 'Edmg informations', language)]]</h4>

            <div class="horizontal">

                <template is="dom-if" if="[[allEDmgregistered]]">
                    <ht-iban-validator validator-name="ht-iban-validator"></ht-iban-validator>
                    <div class="row" style="position:relative">
                        <div id="edmgRegistrationComplete">
                            <iron-icon icon="check-circle"></iron-icon>
                            <p>[[localize('edmg_completed','EDMG REGISTRATION COMPLETED',language)]]</p>
                        </div>
                        <div class="col-10">
                            <paper-input value="OA" readonly="" disabled="" class="headerField borderTop borderLeft"></paper-input>
                            <paper-input value="OA 100" readonly="" disabled="" class="headerField borderRight borderLeft"></paper-input>
                            <paper-input value="OA 200" readonly="" disabled="" class="headerField borderRight borderLeft"></paper-input>
                            <paper-input value="OA 300" readonly="" disabled="" class="headerField borderRight borderLeft"></paper-input>
                            <paper-input value="OA 400" readonly="" disabled="" class="headerField borderRight borderLeft"></paper-input>
                            <paper-input value="OA 500" readonly="" disabled="" class="headerField borderRight borderLeft"></paper-input>
                            <paper-input value="OA 600" readonly="" disabled="" class="headerField borderRight borderLeft"></paper-input>
                            <paper-input value="OA 900" readonly="" disabled="" class="headerField borderRight borderLeft borderBottom"></paper-input>
                        </div>
                        <div class="col-50">
                            <paper-input label="IBAN" readonly="" disabled="" class="headerField borderTop borderBottom"></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_100}}" id="userIBAN_100" rel="100" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic" readonly=""><iron-icon class="icon-button" slot="suffix" on-tap="replicateIbanValueToAllFields" icon="content-copy" alt="Copy in all fields" title="Copy in all fields"></iron-icon><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_200}}" id="userIBAN_200" rel="200" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic" readonly=""><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_300}}" id="userIBAN_300" rel="300" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic" readonly=""><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_400}}" id="userIBAN_400" rel="400" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic" readonly=""><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_500}}" id="userIBAN_500" rel="500" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic" readonly=""><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_600}}" id="userIBAN_600" rel="600" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic" readonly=""><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_900}}" id="userIBAN_900" rel="900" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic" readonly=""><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                        </div>
                        <div class="col-30">
                            <paper-input label="BIC" readonly="" disabled="" class="headerField borderTop borderBottom"></paper-input>
                            <paper-input label="BIC" value="{{userBIC_100}}" id="userBIC_100" rel="100" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_200}}" id="userBIC_200" rel="200" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_300}}" id="userBIC_300" rel="300" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_400}}" id="userBIC_400" rel="400" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_500}}" id="userBIC_500" rel="500" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_600}}" id="userBIC_600" rel="600" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_900}}" id="userBIC_900" rel="900" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                        </div>
                        <div class="col-10">
                            <paper-input label="STATUS" readonly="" disabled="" class="headerField borderTop borderRight borderBottom"></paper-input>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_100_cssClass]]" rel="100" id="statusBullet_100"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_200_cssClass]]" rel="200" id="statusBullet_200"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_300_cssClass]]" rel="300" id="statusBullet_300"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_400_cssClass]]" rel="400" id="statusBullet_400"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_500_cssClass]]" rel="500" id="statusBullet_500"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_600_cssClass]]" rel="600" id="statusBullet_600"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_900_cssClass]]" rel="900" id="statusBullet_900"></div></div>
                        </div>
                    </div>
                </template>

                <template is="dom-if" if="[[!allEDmgregistered]]">

                    <ht-iban-validator validator-name="ht-iban-validator"></ht-iban-validator>
                    <div class="row" style="position:relative">

                        <div class="col-10">
                            <paper-input value="OA" readonly="" disabled="" class="headerField borderTop borderLeft"></paper-input>
                            <paper-input value="OA 100" readonly="" disabled="" class="borderRight borderLeft"></paper-input>
                            <paper-input value="OA 200" readonly="" disabled="" class="borderRight borderLeft"></paper-input>
                            <paper-input value="OA 300" readonly="" disabled="" class="borderRight borderLeft"></paper-input>
                            <paper-input value="OA 400" readonly="" disabled="" class="borderRight borderLeft"></paper-input>
                            <paper-input value="OA 500" readonly="" disabled="" class="borderRight borderLeft"></paper-input>
                            <paper-input value="OA 600" readonly="" disabled="" class="borderRight borderLeft"></paper-input>
                            <paper-input value="OA 900" readonly="" disabled="" class="borderRight borderLeft borderBottom"></paper-input>
                        </div>
                        <div class="col-50">
                            <paper-input label="IBAN" readonly="" disabled="" class="headerField borderTop borderBottom"></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_100}}" id="userIBAN_100" rel="100" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"><iron-icon class="icon-button" slot="suffix" on-tap="replicateIbanValueToAllFields" icon="content-copy" alt="Copy in all fields" title="Copy in all fields"></iron-icon><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_200}}" id="userIBAN_200" rel="200" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_300}}" id="userIBAN_300" rel="300" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_400}}" id="userIBAN_400" rel="400" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_500}}" id="userIBAN_500" rel="500" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_600}}" id="userIBAN_600" rel="600" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="IBAN" value="{{userIBAN_900}}" id="userIBAN_900" rel="900" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"><iron-icon icon="account-balance" slot="suffix"></iron-icon></paper-input>
                        </div>
                        <div class="col-30">
                            <paper-input label="BIC" readonly="" disabled="" class="headerField borderTop borderBottom"></paper-input>
                            <paper-input label="BIC" value="{{userBIC_100}}" id="userBIC_100" rel="100" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_200}}" id="userBIC_200" rel="200" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_300}}" id="userBIC_300" rel="300" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_400}}" id="userBIC_400" rel="400" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_500}}" id="userBIC_500" rel="500" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_600}}" id="userBIC_600" rel="600" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                            <paper-input label="BIC" value="{{userBIC_900}}" id="userBIC_900" rel="900" readonly=""><iron-icon icon="settings" slot="suffix"></iron-icon></paper-input>
                        </div>
                        <div class="col-10">
                            <paper-input label="STATUS" readonly="" disabled="" class="headerField borderTop borderRight borderBottom textAlignCenter"></paper-input>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_100_cssClass]]" rel="100" id="statusBullet_100"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_200_cssClass]]" rel="200" id="statusBullet_200"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_300_cssClass]]" rel="300" id="statusBullet_300"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_400_cssClass]]" rel="400" id="statusBullet_400"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_500_cssClass]]" rel="500" id="statusBullet_500"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_600_cssClass]]" rel="600" id="statusBullet_600"></div></div>
                            <div class="statusBulletContainer"><div class\$="statusBullet [[statusBullet_900_cssClass]]" rel="900" id="statusBullet_900"></div></div>
                        </div>
                    </div>
                </template>



                <template is="dom-if" if="[[!allEDmgregistered]]">
                        <paper-button disabled="[[!registerEnabled]]" on-tap="_registerToEDMG" class="button button--save">[[localize('reg_dmg','Register to eDmg',language)]]</paper-button>
                </template>

            </div>
        </div>
`;
  }

  static get is() {
      return 'ht-admin-account-edmg'
  }

  static get properties() {
      return {
          api: {
              type: Object,
              noReset: true
          },
          user: {
              type: Object,
              noReset: true
          },
          allEDmgregistered:{
              type: Boolean,
              value: false
          },
          registerEnabled: {
              type: Boolean,
              value: true
          },
          userIBAN_100: {
              type: String,
              value: ''
          },
          userIBAN_200: {
              type: String,
              value: ''
          },
          userIBAN_300: {
              type: String,
              value: ''
          },
          userIBAN_400: {
              type: String,
              value: ''
          },
          userIBAN_500: {
              type: String,
              value: ''
          },
          userIBAN_600: {
              type: String,
              value: ''
          },
          userIBAN_900: {
              type: String,
              value: ''
          },
          userBIC_100: {
              type: String,
              value: ''
          },
          userBIC_200: {
              type: String,
              value: ''
          },
          userBIC_300: {
              type: String,
              value: ''
          },
          userBIC_400: {
              type: String,
              value: ''
          },
          userBIC_500: {
              type: String,
              value: ''
          },
          userBIC_600: {
              type: String,
              value: ''
          },
          userBIC_900: {
              type: String,
              value: ''
          },
          statusBullet_100_cssClass: {
              type: String,
              value: ''
          },
          statusBullet_200_cssClass: {
              type: String,
              value: ''
          },
          statusBullet_300_cssClass: {
              type: String,
              value: ''
          },
          statusBullet_400_cssClass: {
              type: String,
              value: ''
          },
          statusBullet_500_cssClass: {
              type: String,
              value: ''
          },
          statusBullet_600_cssClass: {
              type: String,
              value: ''
          },
          statusBullet_900_cssClass: {
              type: String,
              value: ''
          },
          allEDmgregisteredReadAttribute: {
              type: String,
              value: ''
          },
          listOAs: {
              type: Array,
              value: ['100','200','300','400','500','600','900']
          }
      }
  }

  static get observers() {
      return ['_subMenuOpened(user)'];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  _getOARegStatus(reg){
      if (reg) {
          return reg.registered ? reg.OA + ':OK ' : reg.OA + ':NOK ';
      } else {
          return ''
      }
  }

  _registerToEDMG(){
      //100,200,300,400,500,600,900
      let regs = this.getRegistrationStatus();
      this.set('registerEnabled', false);
      Promise.all(regs.rs.filter(reg => !reg.registered).map(reg =>
          this.registerToEDMGbyOA(_.assign(reg, {iban:this[`userIBAN_${reg.OA}`], bic: this[`userBIC_${reg.OA}`]})).then(reg =>{
              this.set(`statusBullet_${reg.OA}_cssClass`, reg.registered ? 'ok' : '')
              const idx = regs.rs.findIndex(r => r.OA === reg.OA);
              if(idx >= 0){
                  regs.rs.splice(idx, 1, reg);
              } else {
                  regs.rs.push(reg);
              }

              this.set('regStatus',JSON.stringify(regs));

              let propRegStatus = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.eDMG.RegistrationStatus')
              propRegStatus.typedValue.stringValue = this.regStatus;

              return reg
          })
      )).then( regs => {
          let allDone = regs.every(r => !!r.registered)
          this.set('allEDmgregistered', allDone)
          return this.api.user().modifyUser(this.user)
              .then(user => {
                  this.user = user
                  this.dispatchEvent(new CustomEvent('user-saved', {detail: user, bubbles: true, composed: true}))
              })
              .finally(() => {
                  if (!allDone) {
                      setTimeout(() => {
                          this._registerToEDMG()
                      }, 300000)
                  }
              })
      }).finally(() => this.set('registerEnabled', true))
  }

  getRegistrationStatus(){
      const propRegStatus = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.eDMG.RegistrationStatus') ||
          (this.user.properties[this.user.properties.length] = {
              type: {identifier: 'org.taktik.icure.user.eDMG.RegistrationStatus'},
              typedValue: {type: 'JSON', stringValue: '{\"rs\":[]}'}
          });
      //'{"rs":[{"OA":"100","Comment":"","ErrorCode":""}]}'

      let OAStatus = {};
      if(propRegStatus && propRegStatus.typedValue) {
          OAStatus = JSON.parse(propRegStatus.typedValue.stringValue);
      }
      let regs = {rs: (OAStatus.rs||[]).map(r => r)}
      this.listOAs.map(itOA => {
          let reg = regs.rs.find(r => r.OA === itOA) || {OA : itOA, registered: false, lastExecution: null, Comment : '', ErrorCode :  '', iban :'', bic: '' };
          const idx = regs.rs.findIndex(r => r.OA === itOA);
          if(idx >= 0){
              regs.rs.splice(idx, 1, reg);
          } else {
              regs.rs.push(reg);
          }
      })
      this.set('allEDmgregistered', regs.rs.every(r => !!r.registered));
      this.set('currentRegs', regs);

      return regs;
  }


  registerToEDMGbyOA(reg) {
      if (this.api.tokenId) {
          if (!iban.isValid(reg.iban)) {
              return Promise.resolve(reg)
          }
          return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
              .then(hcp => {
                      return this.api.fhc().Dmgcontroller().registerDoctorUsingPOST(
                          this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword,
                          hcp.nihii, hcp.ssin, hcp.firstName, hcp.lastName, reg.OA, reg.bic.replace(/ /g, '').toUpperCase(), reg.iban.replace(/ /g, '').toUpperCase())
                          .then(r => this.api.logMcn(r, this.user, hcp.id, "DMG", "register"))
                  }
              ).then(regResp => {
                      if (regResp) {
                          if (regResp.errors && regResp.errors.length > 0) {
                              const err = regResp.errors.find(er => er.code === '168')
                              if (err && err.code === '168') {
                                  reg.registered = true
                                  reg.lastExecution = (new Date).getTime()
                                  return reg
                              }
                              else {
                                  reg.registered = regResp.success
                                  reg.lastExecution = (new Date).getTime()
                                  reg.response = JSON.stringify(regResp)
                                  return reg
                              }
                          } else {
                              reg.registered = regResp.success
                              reg.lastExecution = (new Date).getTime()
                              return reg
                          }
                      } else {
                          reg.registered = false
                          reg.lastExecution = (new Date).getTime()
                          return reg
                      }
                  }
              )
              .catch((error) => {
                  reg.Comment = 'exception caugh:' + error
                  reg.response = JSON.stringify(error)
                  reg.lastExecution = (new Date).getTime()

                  return Promise.resolve(reg)
              })
      } else {
          reg.Comment = 'err: no tokenid'
          return Promise.resolve(reg)
      }
  }

  _evalBic( event, fieldObject ) {

      // Could be a click event / we wouldn't have any value here
      if( typeof fieldObject.value === 'undefined' ) return;

      // target & save
      var ibanFieldObject = event.path[0];

      // Target (100,200,300,400,500,600,900)
      var oaValue = parseInt( ibanFieldObject.getAttribute('rel') );

      // Get bic based on iban
      var bicValue = this.api.getBicByIban( fieldObject.value || '' );

      // Assign bic value back, should we have any
      if( ( bicValue+'').length ) {

          if(oaValue==100) this.userBIC_100 = bicValue;
          if(oaValue==200) this.userBIC_200 = bicValue;
          if(oaValue==300) this.userBIC_300 = bicValue;
          if(oaValue==400) this.userBIC_400 = bicValue;
          if(oaValue==500) this.userBIC_500 = bicValue;
          if(oaValue==600) this.userBIC_600 = bicValue;
          if(oaValue==900) this.userBIC_900 = bicValue;

      }
  }

  replicateIbanValueToAllFields() {
      // Copy iban values to all fields (including us)
      this.listOAs.forEach( io => this.set(`userIBAN_${io}`, this.userIBAN_100))
      // Same goes for BIC values (including us)
      this.listOAs.forEach( io => this.set(`userBIC_${io}`, this.userBIC_100))
  }

  _subMenuOpened(){
      const regs = this.getRegistrationStatus()
      regs.rs.forEach(reg => {
          this.set(`userIBAN_${reg.OA}`, reg.iban)
          this.set(`userBIC_${reg.OA}`, reg.bic)
          this.set(`statusBullet_${reg.OA}_cssClass`, reg.registered ? 'ok' : '')
      })
  }
}

customElements.define(HtAdminAccountEdmg.is, HtAdminAccountEdmg)
