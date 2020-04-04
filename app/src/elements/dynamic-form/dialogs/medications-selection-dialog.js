import '../../../styles/atc-styles.js';
import '../../../styles/dialog-style.js';
import '../../../styles/buttons-style.js';
import '../../ht-spinner/ht-spinner.js';
import _ from 'lodash/lodash'
import accounting from '../../../../scripts/accounting';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class MedicationsSelectionDialog extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="dialog-style atc-styles buttons-style">

            vaadin-grid {
                --vaadin-grid-body-row-hover-cell: {
                    background-color: var(--app-primary-color);
                    color: white;
                };
                --vaadin-grid-body-row-selected-cell: {
                    background-color: var(--app-primary-color);
                    color: white;
                };
            }

            paper-input, paper-input-container {
                --paper-input-container-focus-color: var(--app-primary-color);
            }

            paper-input-container {
                margin-top: 24px;
                margin-left: 40px;
            }

            #entities-list, #accumulated-medications {
                margin-bottom: 55px;
            }



            paper-input {
                --paper-input-container-focus-color: var(--app-primary-color);
                --paper-input-container-label: {
                    color:var(--app-text-color);
                    opacity:1;
                };
            }

            paper-tabs {
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                width: 100%;
            }

            paper-tab {
                --paper-tab-ink: var(--app-secondary-color);
            }

            paper-tab.iron-selected {
                font-weight: bold;
            }

            paper-tab.iron-selected > iron-icon {
                color: var(--app-secondary-color);
            }

            paper-dialog {
                min-height: 480px;
                min-width: 600px;
                max-height: unset!important;
                width: 80%;
                top: 50px;
            }

            .no-grid {
                display: none;
            }

            .no-column{
                display: none;
            }

            .column{
                margin: 2px;
            }

            div.cheap {
                color: #606060;
            }


            vaadin-grid {
                --vaadin-grid-body-row-hover-cell: {
                    background-color: var(--app-primary-color);
                    color: white;
                };
                --vaadin-grid-body-row-selected-cell: {
                    background-color: var(--app-primary-color);
                    color: white;
                };
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
                transform: translate(-50%,-50%);
                height: 42px;
				width: 42px;
            }

            .container {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-around;
                align-items: flex-start;
            }

            .left-pane {
                width: calc(67% - 12px);
                margin-right: 12px;
                flex-grow: 3;
                padding-left: 12px;
                box-sizing: border-box;
            }

            .right-pane {
                width: calc(33% - 12px);
                margin-left: 12px;
                align-self: flex-end;
                flex-grow: 1;
                padding-right: 12px;
                box-sizing: border-box;
            }

            .add-btn--compound {
                position: absolute;
                left: 0;
                margin-top: 50px;
            }

            .helper{
                display:block;
                width:100%;
                height:62px;
            }

            .boxes-qty {
                display: inline-block;
                width:18px;
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
                paper-dialog#dialog,
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
                #accumulated-medications, #entities-list {
                    margin-bottom: 0;
                }
                .buttons {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                }
            }
        </style>

        <paper-dialog id="dialog" always-on-top="true">
            <ht-spinner class="center" active="[[isLoadingEntities]]"></ht-spinner>
            <h2 class="modal-title">[[localize('sel_med','Select medication',language)]]</h2>
            <div class="content container">
                <paper-tabs selected="{{medicationType}}" attr-for-selected="name">
                    <paper-tab name="chronical" on-tap="setMedicationType">
                        <span class="names-nomobile">[[localize('medication-chronical','Chronical medication',language)]]</span>
                        <span class="names-mobile-only">[[localize('chronic','Chronical',language)]]</span>
                    </paper-tab>
                    <paper-tab name="medicinalProduct" on-tap="setMedicationType">
                        <span class="names-nomobile">[[localize('medication-by-product-name','By product name',language)]]</span>
                        <span class="names-mobile-only">[[localize('name','Name',language)]]</span>
                    </paper-tab>
                    <paper-tab name="substanceProduct" on-tap="setMedicationType">
                        <span class="names-nomobile">[[localize('medication-by-molecule','By molecule',language)]]</span>
                        <span class="names-mobile-only">[[localize('mol','Molecule',language)]]</span>
                    </paper-tab>
                    <paper-tab name="compoundPrescription" on-tap="setMedicationType">
                        <span class="names-nomobile">[[localize('medication-compound','Compound prescription',language)]]</span>
                        <span class="names-mobile-only">[[localize('compound','Compound',language)]]</span>
                    </paper-tab>
                </paper-tabs>
                <div class="left-pane">
                    <template is="dom-if" if="[[_isChronicalView(medicationType)]]">
                        <div class="helper"></div>
                        <vaadin-grid id="entities-list" active-item="{{selectedChronicalMedicationFromList}}" items="[[medications]]" on-tap="clickChron">
                            <vaadin-grid-column>
                                <template class="header">
                                    <vaadin-grid-sorter path="[[column.key]]">[[localize('atc-categ','Atc category',language)]]</vaadin-grid-sorter>
                                </template>
                                <template>
                                    <div><paper-icon-button id="[[item.id]]" class="add-btn" icon="icons:add" on-tap="_addChron"></paper-icon-button>&nbsp;[[atcCat(item.atcCat)]]</div>
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column>
                                <template class="header">
                                    <vaadin-grid-sorter path="[[column.key]]">[[localize('med','Medication',language)]]</vaadin-grid-sorter>
                                </template>
                                <template>
                                    <div>[[_serviceDescription(item)]]</div>
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column>
                                <template class="header">
                                    <vaadin-grid-sorter path="[[column.key]]">[[localize('pos','Posology',language)]]</vaadin-grid-sorter>
                                </template>
                                <template>
                                    <div>[[_servicePosology(item)]]</div>
                                </template>
                            </vaadin-grid-column>
                        </vaadin-grid>
                    </template>
                    <template is="dom-if" if="[[_isCompoundPrescription(medicationType)]]">
                        <div style="margin-top: 12px; position: relative;">
                            <vaadin-combo-box filtered-items="[[compoundListItems]]" item-label-path="descr" item-value-path="id" id="procedures-list" on-filter-changed="_compoundFilterChanged" on-value-changed="_compoundChanged" label="[[localize('compound_name','Compound name',language)]]" filter="{{compoundFilterString}}" value="{{compound}}" readonly="[[readonly]]"></vaadin-combo-box>
                            <paper-icon-button id="[[_id(item)]]" class="button--icon-btn add-btn--compound" icon="icons:add" on-tap="_addCompound"></paper-icon-button>
                            <paper-input-container>
                                <label slot="label">[[localize('medication-compound','Compound Prescription',language)]]</label>
                                <iron-autogrow-textarea class="paper-input-input" slot="input" id="compoundPrescriptionText" value="{{compoundPrescriptionText}}"></iron-autogrow-textarea>
                            </paper-input-container>
                        </div>
                    </template>
                    <div class\$="grid-container [[_noGridClass(medicationType)]]">
                        <paper-input id="filter" label="[[localize('sch_med','Search a medicine',language)]]" autofocus="" value="{{filterValue}}" on-keydown="refresh"></paper-input>
                        <vaadin-grid id="entities-list" active-item="{{selectedMedicationFromList}}" on-tap="click">
                            <template is="dom-repeat" items="[[_getColumns(medicationType)]]" as="column">
                                <vaadin-grid-column width="[[_columnWidth(column)]]">
                                    <template class="header">
                                        <vaadin-grid-sorter path="[[column.key]]">[[column.title]]</vaadin-grid-sorter>
                                    </template>
                                    <template>
                                        <div class\$="cell frozen [[item.cheap]]">
                                            <template is="dom-if" if="[[_isEqual(column.title, 'Name')]]">
                                                <paper-icon-button id="[[_id(item)]]" class="add-btn" icon="icons:add" on-tap="_addCnkDci"></paper-icon-button>
                                            </template>
                                            [[_cellContent(item, column)]]
                                        </div>
                                    </template>
                                </vaadin-grid-column>
                            </template>
                            <vaadin-grid-column>
                                <template class="header">
                                    <div></div>
                                </template>
                                <template>
                                   <div class\$="cell frozen [[item.cheap]]"><img src\$="[[drugPicture(item)]]"></div>
                                </template>
                            </vaadin-grid-column>
                        </vaadin-grid>
                    </div>
                </div>
                <div class="right-pane">
                    <h5>[[localize('selected_meds','Selected medication(s)',language)]]</h5>
                    <vaadin-grid id="accumulated-medications" items="[[medicationAccumulator]]" active-item="{{selectedMedicationFromAccumulator}}">
                        <vaadin-grid-column width="72px">
                            <template class="header">
                                <div>Boxes</div>
                            </template>
                            <template>
                                <span class="boxes-qty">[[item.boxes]]</span><paper-icon-button id="remove-[[_id(item)]]" class="add-btn" icon="icons:remove" on-tap="_removeFromAcc"></paper-icon-button>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column width="calc(100% - 72px)">
                            <template class="header">
                                <div>Description</div>
                            </template>
                            <template>
                                <div class="cell frozen">[[_serviceDescription(item.newMedication)]]</div>
                            </template>
                        </vaadin-grid-column>
                    </vaadin-grid>
                </div>
            </div>
            <div class="buttons">
                <template is="dom-if" if="[[_isMedicinalProduct(medicationType)]]"><vaadin-checkbox checked="{{searchOnIngredients}}" style="position:absolute; left:20px; color:black;">[[localize('also_search_on_ingredients','Also search on ingredients ?',language)]]</vaadin-checkbox></template>
                <paper-button class="button" dialog-dismiss="" on-tap="skip">[[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--save" dialog-confirm="" autofocus="" on-tap="validateMedications" disabled="[[!medicationAccumulator.length]]">[[localize('valid','Validate',language)]]</paper-button>
            </div>
        </paper-dialog>
        <paper-dialog id="checkintol" always-on-top="true">
            <h2 class="modal-title">[[localize('warning','Warning',language)]] !</h2>
            <div class="content">
                <div class="warn">
                    <iron-icon icon="icons:warning"></iron-icon> [[localize('patient_has_adr','Le patient possède une contre-indication pour la médication',language)]]
                     <em>[[medicationToBeAdded_label]]</em>.
                </div>
                <div class="con">[[localize('con_list','Contraindication list',language)]] :</div>
                <div class="list">
                    <template is="dom-repeat" items="[[intolItems]]" as="intol">
                        <div><iron-icon icon="[[_getIntolIcon(intol)]]"></iron-icon> [[getIcpcLabel(intol)]] <i>[[_heShortDateFormat(intol.openingDate, intol.valueDate)]]</i>: [[intol.descr]] </div>
                    </template>
                </div>
            </div>
            <div class="buttons">
                <span>[[localize('continue','Continue',language)]] ?</span>
                <paper-button class="button" dialog-dismiss="">[[localize('no','no',language)]]</paper-button>
                <paper-button class="button button--save" dialog-confirm="" autofocus="" on-tap="continueAddMedication">[[localize('yes','Yes',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'medications-selection-dialog'
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          medicationType: {
              type: String,
              value: 'medicinalProduct'
          },
          compoundPrescriptionText: {
              type: String
          },
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
          selectedChronicalMedicationFromList:{
              type: Object,
              value: null
          },
          newMedication: {
              type: Object,
              value: null
          },
          filterValue: {
              type: String,
              value: ''
          },
          isLoadingEntities: {
              type: Boolean,
              value: false
          },
          medications: {
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
          }
      }
  }

  static get observers() {
      return [
          'medicationTypeChanged(medicationType)',
      ];
  }

  constructor() {
      super()
  }

  _isMedicinalProduct(medicationType) {
      return !_.trim(medicationType) || _.trim(medicationType) === "medicinalProduct"
  }

  _searchOnIngredientsChanged() {
      let grid = this.$['entities-list'];
      // Force bypass cache, we just checked / unchecked ingredient box
      if(grid && grid.drugsCache) { grid.drugsCache = null; grid.drugsCacheUpperSearchIndex = 0; grid.clearCache();}
  }

  open(medication, options = {}) {
      this.set('newMedication', medication || { content: {}});
      this.set('medicationAccumulator', []);

      this.set('isPrescription', options.isPrescription);

      this.set('compoundFilterString', '')
      this.set('compound','')
      this.set('compoundPrescriptionText', '')

      this.$['dialog'].open()

      this.medications.map(m => {
          const letter = ((m && m.codes && m.codes.find(c => c.type === 'CD-ATC') || {code: 'V'}).code || 'V').substr(0,1)
          m.atcCat = letter
      })

      this.set('medications', _.orderBy(this.medications, ['atcCat'], ['asc']))
  }

  ready() {
      super.ready()

      let grid = this.$['entities-list'];

      grid.lastParams = null; //Used to prevent double calls
      grid.size = 0;
      grid.pageSize = 50;
      grid.dataProvider = (params, callback) => {
          const columns = this._getColumns(this.medicationType)
          const sort = params.sortOrders && params.sortOrders[0] && params.sortOrders[0].path || columns[0] && columns[0].key
          const desc = params.sortOrders && params.sortOrders[0] && params.sortOrders[0].direction === 'desc' || false

          const pageSize = params.pageSize || grid.pageSize
          const startIndex = (params.page || 0) * pageSize
          const endIndex = ((params.page || 0) + 1) * pageSize

          const thisParams = this.filterValue + "|" + sort + "|" + this.medicationType + "|" + (desc ? "<|" : ">|") + startIndex + ":" + pageSize + ":"

          let latestSearchValue = this.filterValue
          this.latestSearchValue = latestSearchValue
          if (!latestSearchValue || latestSearchValue.length < 2) {
              // console.log("Cancelling empty search")
              this.setGridSize(grid, 0)
              callback([])
              return
          }

          // console.log("Starting search for " + thisParams)

          const limit = endIndex || grid.pageSize
          const offset = params.index
          if (this.medicationType === 'substanceProduct') {
              this.api.bedrugs().getInnClusters(this.latestSearchValue, this.language, null, 0, 100).then(packs => {
                  return {totalSize: packs.length, rows: (desc ? _.reverse(_.sortBy(packs, sort)) : _.sortBy(packs, sort)).slice(offset, limit)}
              }).then(function (res) {
                  if (this.filterValue !== latestSearchValue) {
                      console.log("Cancelling obsolete search")
                      return
                  }
                  this.setGridSize(grid, res.totalSize)
                  grid.latestResults = _.slice(res.rows, startIndex, endIndex)
                  if (grid.latestResults.length) {
                      ;(grid.drugsCache || (grid.drugsCache = []))[startIndex] = null
                      grid.drugsCache.splice(startIndex, grid.latestResults.length, ...grid.latestResults)
                  }
                  callback(grid.latestResults)
              }.bind(this))
          } else {
              const fillCache = (minSize) =>
                  grid.drugsCache && grid.drugsCache.allItemsLoaded ?
                      Promise.resolve(grid.drugsCache) :
                      Promise.all([
                          this.api.dedup(() => this.api.bedrugs().getMedecinePackages(this.latestSearchValue, this.language, null, grid.drugsCacheUpperSearchIndex || 0, 100), 'getMedecinePackages', `${this.latestSearchValue}|${this.language}|${grid.drugsCacheUpperSearchIndex}`, 5000),
                          this.searchOnIngredients ? this.api.dedup(() => this.api.bedrugs().getMedecinePackagesFromIngredients(this.latestSearchValue, this.language, null, grid.drugsCacheUpperSearchIndex || 0, 100), 'getMedecinePackagesFromIngredients', `${this.latestSearchValue}|${this.language}|${grid.drugsCacheUpperSearchIndex}`, 5000) : Promise.resolve({})
                      ])
                          .then(([packs, packsIng]) => {
                              const allDone = (packs||[]).length < 100 && (packsIng||[]).length
                              const newItems = _.unionBy(packs, packsIng, 'id.id') //what to do when there are no newitems ?
                              if (newItems.length > 0) {
                                  grid.drugsCacheUpperSearchIndex = (grid.drugsCacheUpperSearchIndex || 0) + 100
                              }
                              return [(grid.drugsCache = _.sortBy(_.unionBy(grid.drugsCache || [], newItems, 'id.id'), 'name')), newItems.length, allDone]
                          })
                          .then(([cache, newItemsLength, allDone]) => {
                              cache.allItemsLoaded = !newItemsLength || allDone
                              return cache.length > minSize || !newItemsLength || allDone ? Promise.resolve(cache) : fillCache(minSize)
                          })

              this.loadCheapAlternativesIfNeeded(this.selectedMedicationFromList).then(alternatives => {
                  const cheapAlternativeSearchSeedIndex = this.cheapAlternativeSearchSeed ? grid.drugsCache.findIndex(mpp => this._id(mpp) === this._id(this.cheapAlternativeSearchSeed)) : -1
                  const cacheEndIndex = cheapAlternativeSearchSeedIndex === -1 ? endIndex :
                      (cheapAlternativeSearchSeedIndex < endIndex ? endIndex - alternatives.length : endIndex)
                  ;((grid.drugsCache && grid.drugsCache.length >= cacheEndIndex) ? Promise.resolve(grid.drugsCache) : fillCache(cacheEndIndex)).then(cache => {
                      this.setGridSize(grid, cache.length + alternatives.length)

                      let fullVirtualDataSet = cache.map(it => it)
                      if (cheapAlternativeSearchSeedIndex === -1 || endIndex <= cheapAlternativeSearchSeedIndex) {
                          fullVirtualDataSet = cache.slice(startIndex, endIndex)
                      } else if (cheapAlternativeSearchSeedIndex + alternatives.length < startIndex) {
                          fullVirtualDataSet = cache.slice(startIndex - alternatives.length, endIndex - alternatives.length)
                      } else {
                          fullVirtualDataSet.splice(cheapAlternativeSearchSeedIndex + 1, 0, ...alternatives)
                          fullVirtualDataSet = fullVirtualDataSet.slice(startIndex, endIndex)
                      }
                      grid.fullVirtualDataSet = fullVirtualDataSet
                      callback(grid.fullVirtualDataSet)
                  })
              })
          }
      };
  }

  medicationTypeChanged(name) {
     if(this.medicationType === 'substanceProduct' || this.medicationType === 'medicinalProduct')  {
         let grid = this.$['entities-list'];
         grid.clearCache()
     }
  }

  setGridSize(grid, size) {
      console.log('setSize', size)
      grid.set('size', size)
      this.set('isLoadingEntities',false)
  }

  _cellContent(item, column) {
      return column.key.indexOf("price") !== -1 ? accounting.formatMoney(_.get(item, column.key) / 100, "€", 2, " ", ",") :
          (column.key.indexOf("name") !== -1 && _.get(item, "cheap") && _.get(item, "cheap") === 'cheap' ? '\u2794 ' + _.get(item, column.key) :
              _.get(item, column.key));
  }

  _addCnkDci(e) {
      const grid = this.$['entities-list'];
      let med = null
      if(this.medicationType == 'substanceProduct') {
          med = grid.latestResults.find(d => this._id(d) === e.target.id)
      } else {
          med = grid.fullVirtualDataSet.find(d => this._id(d) === e.target.id)
      }
      this.checkAdr(med, ()=> this.selectMedicationFromList(med) )
  }

  _addChron(e) {
      const med = this.medications.find(d => d.id === e.target.id)
      this.checkAdr(med, ()=> this.selectChron(med) )
  }

  _addCompound(e){
      if (this.compoundPrescriptionText && this.compoundPrescriptionText.length) {
          ;((this.selectedCompound || (this.selectedCompound = {})).medicationValue || (this.selectedCompound.medicationValue = {})).compoundPrescription = this.compoundPrescriptionText
          if (!this.selectedCompound.id) { this.selectedCompound.id = this.compoundPrescriptionText }
          this.selectMedicationFromList(this.selectedCompound)

          this.set('selectedCompound', null)
          this.set('compoundPrescriptionText', '')
          this.set('compoundFilterString','')
      }
  }

  _removeFromAcc(e) {
      const idx = _.findIndex(this.medicationAccumulator, d => `remove-${this._id(d)}` === e.target.id)

      if (idx>=0) {
          this.set(`medicationAccumulator.${idx}.boxes`, (this.medicationAccumulator[idx].boxes || 1) - 1)
          if (!this.medicationAccumulator[idx].boxes) {
              this.splice('medicationAccumulator', idx, 1)
          }
      }
  }

  _id(item) {
      return item && (item.id && (item.id.id || item.id) || item.inncluster || item.name)
  }

  _columnWidth(column) {
      return column.size || "100px";
  }

  selectMedicationFromList(med) {
      console.log("selectMedicationFromList",med)

      const unit = this.localize('generic_unit','unit',this.language)
      const newMedicationContent = { medicationValue: {}, medicationUnit: unit, regimen: [{administratedQuantity: {time:'',quantity: 1, unit: unit}}]}
      this.set('newMedication.content.'+this.language, newMedicationContent)

      const options = {
          isPrescription: this.isPrescription
      }

      const id = this._id(med)

      const currentMedIdx = _.findIndex(this.medicationAccumulator, m => this._id(m) === id)
      if (currentMedIdx >= 0) {
          this.set(`medicationAccumulator.${currentMedIdx}.boxes`, (this.medicationAccumulator[currentMedIdx].boxes || 1) + 1)
      } else {
          if (med.id && med.id.id) {
              //by productName
              this.api.bedrugs().getMppInfos(med.id.id, this.language === 'en' ? 'fr' : this.language || 'fr').then(mppInfos => {
                  newMedicationContent.medicationValue.medicinalProduct = {
                      "intendedname": med.name,
                      "intendedcds": [{type: "CD-DRUG-CNK", code: med.id.id}],
                      "priority": 'low'
                  }
                  if (mppInfos.gal && mppInfos.gal.name) {
                      newMedicationContent.medicationUnit = newMedicationContent.regimen[0].administratedQuantity.unit = mppInfos.gal.name
                  }

                  med.id.id && (((this.newMedication.codes || (this.newMedication.codes = [])).find(c => c.type === 'CD-DRUG-CNK') || (this.newMedication.codes[this.newMedication.codes.length] = {
                      type: 'CD-DRUG-CNK',
                      version: '1'
                  })).code = med.id.id)
                  mppInfos.atcCode && (((this.newMedication.codes || (this.newMedication.codes = [])).find(c => c.type === 'CD-ATC') || (this.newMedication.codes[this.newMedication.codes.length] = {
                      type: 'CD-ATC',
                      version: '1'
                  })).code = mppInfos.atcCode)

                  const desc = this._serviceDescription(_.cloneDeep(this.newMedication));
                  if(desc) {
                      this.push('medicationAccumulator', {boxes: 1, newMedication: _.cloneDeep(this.newMedication), id, options })
                  }
              })
          } else {
              //by molecule
              if (med.inncluster) {
                  newMedicationContent.medicationValue.substanceProduct = {
                      "intendedname": med.name,
                      "intendedcds": [{type: "CD-INNCLUSTER", code: med.inncluster}]
                  }

                  med.inncluster && (((this.newMedication.codes || (this.newMedication.codes = [])).find(c => c.type === 'CD-INNCLUSTER') || (this.newMedication.codes[this.newMedication.codes.length] = {
                      type: 'CD-INNCLUSTER',
                      version: '1'
                  })).code = med.inncluster)
                  med.atcCode && (((this.newMedication.codes || (this.newMedication.codes = [])).find(c => c.type === 'CD-ATC') || (this.newMedication.codes[this.newMedication.codes.length] = {
                      type: 'CD-ATC',
                      version: '1'
                  })).code = med.atcCode)
              } else {
                  //Compound prescription
                  newMedicationContent.medicationValue = med.medicationValue
              }
              this.push('medicationAccumulator', {boxes: 1, newMedication: _.cloneDeep(this.newMedication), id, options})
          }
      }
  }

  validateMedications() {
      this.dispatchEvent(new CustomEvent('new-medications', {detail: { medications: this.medicationAccumulator }, bubbles: true, composed: true}))
  }

  click(e) {
      const selected = this.selectedMedicationFromList;

      console.log('selected ',selected,' - ',this.latestSelected);
      if (this.inDoubleClick && (this._id(this.latestSelected) === this._id(selected) || this.latestSelected && !selected || !this.latestSelected && selected)) {
          this._addCnkDci({target: {id: this._id(this.latestSelected)}})
      } else {
          if (selected) this.latestSelected = selected;
          this.inDoubleClick = true;

          //Trigger cheapAlternativeSearch
          if (this.selectedMedicationFromList && !this.selectedMedicationFromList.cheap) {
              const grid = this.$['entities-list']
              grid.clearCache();
          }

          setTimeout(() => {
              delete this.inDoubleClick;
          }, 500);
      }
  }

  clickChron(e) {
      const selected = this.selectedChronicalMedicationFromList;

      console.log('selected ',selected,' - ',this.latestSelected);
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

  refresh() {
      //Give the gui the time to update the field
      setTimeout(function () {
          let currentValue = this.filterValue;

          if (this.latestSearchValue === currentValue) {
              return;
          }
          setTimeout(function () {
              if (currentValue === this.filterValue) {
                  this.set('isLoadingEntities',true)
                  console.log("Triggering search for " + this.filterValue);

                  this.selectedMedicationFromList = null
                  this.cheapAlternativeSearchSeed = null

                  const grid = this.$['entities-list']
                  grid.drugsCache = null;
                  grid.drugsCacheUpperSearchIndex = 0;
                  grid.clearCache();
              } else {
                  console.log("Skipping search for " + this.filterValue + " != " + currentValue);
                  this.set('isLoadingEntities',false)
              }
          }.bind(this), 500); //Wait for the user to stop typing
      }.bind(this), 100);
  }

  skip() {
      this.set('filterValue','')
      this.set('medicationType','medicinalProduct')
      this.$['entities-list'].clearCache();
  }

  close() {
      if (!this.customFrequencyTable) {
          this._setFrequencyList()
      }
      this.set('filterValue','')
      this.$['entities-list'].clearCache();
      this.set('customFrequencyTable', false)
      this.set('flagTableFrequency', false)
  }

  select(item) {
      if (item) {
          this.selectMedicationFromList(item);
          this.set('filterValue','')
          this.set('medicationType','medicinalProduct')
          this.$['entities-list'].clearCache();
      }
  }

  selectChron(med) {
      if (med) {
          const id = this._id(med)
          const currentMedIdx = _.findIndex(this.medicationAccumulator, m => m.id === id)
          if (currentMedIdx >= 0) {
              this.set(`medicationAccumulator.${currentMedIdx}.boxes`, (this.medicationAccumulator[currentMedIdx].boxes || 1) + 1)
          } else {
              this.push('medicationAccumulator', { id, boxes:1, newMedication:_.cloneDeep(med),options: {isPrescription: this.isPrescription} })
          }
      }
  }

  _isEqual(a, b){
      return a === b
  }

  _selectedMedicationFromListChanged(item) {
      var grid = this.$['entities-list'];
      grid.selectedItems = item ? [item] : [];
  }

  _indexOfDayPeriod(code) {
      return this._dayPeriods.indexOf(code)
  }

  _getColumns(medicationType) {
      return this.columnsDefinition[medicationType] || []
  }

  _isCompoundPrescription(medicationType) {
      return medicationType === 'compoundPrescription';
  }

  _isMedicinalProduct(medicationType) {
      return medicationType === 'medicinalProduct';
  }

  _noGridClass(medicationType) {
      return this._isCompoundPrescription(medicationType) || this._isChronicalView(medicationType) ? 'no-grid' : ''
  }

  _noColumnClass(medicationType) {
      return this._isMedicinalProduct(medicationType) ? 'no-column' : ''
  }

  drugPicture(med) {
      if (!med.rrsstate) {
          return require('../../../../images/Drug.None.gif')
      }
      if (med.rrsstate === 'R') {
          return require('../../../../images/Drug.NotReduced.gif')
      } else if (med.rrsstate === 'B') {
          return require('../../../../images/Drug.NoAlternative.gif')
      }
      else if (med.rrsstate === 'G') {
          return require('../../../../images/Drug.Cheap.gif')
      }
      else {
          return require('../../../../images/Drug.None.gif')
      }

      //return pat.picture ? 'data:image/jpeg;base64,' + pat.picture : pat.gender === 'female' ? require('../../../images/Female-128.jpg') : require('../../../images/Male-128.jpg')
  }

  _indexOfDayPeriod(code) {
      return this._dayPeriods.indexOf(code)
  }

  _getColumns(medicationType) {
      return this.columnsDefinition[medicationType] || []
  }

  _isCompoundPrescription(medicationType) {
      return medicationType === 'compoundPrescription';
  }

  _isMedicinalProduct(medicationType) {
      return medicationType === 'medicinalProduct';
  }

  _isChronicalView(medicationType){
      return medicationType === "chronical"
  }

  atcCat(l) {
      return  l === 'A' ? this.localize('ali_trac_meta','Alimentary tract and metabolism') :
              l === 'B' ? this.localize('blo_blo_for','Blood and blood forming organs') :
              l === 'C' ? this.localize('car_sys','Cardiovascular system') :
              l === 'D' ? this.localize('dermatologicals','Dermatologicals') :
              l === 'G' ? this.localize('gen_uri_sys','Genito-urinary system and sex hormones') :
              l === 'H' ? this.localize('sys_hor_pre','Systemic hormonal preparations, excluding sex hormones and insulins') :
              l === 'J' ? this.localize('anti_inf_sys','Antiinfectives for systemic use') :
              l === 'L' ? this.localize('anti_neo_imm','Antineoplastic and immunomodulating agents') :
              l === 'M' ? this.localize('mus_ske_sys','Musculo-skeletal system') :
              l === 'N' ? this.localize('ner_sys','Nervous system') :
              l === 'P' ? this.localize('Anti_para_pro','Antiparasitic products, insecticides and repellents') :
              l === 'R' ? this.localize('res_sys','Respiratory system') :
              l === 'S' ? this.localize('sens_org','Sensory organs') :
              l === 'V' ? this.localize('various','Various') : this.localize('unk','Unknown')
  }

  _serviceDescription(s) {
      return this.api.contact().medication().medicationNameToString((this.api.contact().preferredContent(s, this.language) || {}).medicationValue, this.language)
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

      this.api.entitytemplate().findAllEntityTemplates('org.taktik.icure.entities.embed.Medication',searchString,true).then(res => {
          if (searchString !== this.compoundSearchString) {
              //console.log("Cancelling obsolete search");
              this.set('compoundListItems', []);
          }
          this.set('compoundListItems', res);
      })
  }

  _compoundChanged(e) {
      const compound = this.compoundListItems.find(c => c.id === e.detail.value)
      if(compound) {
          const medication = compound.entity.find(e => e.compoundPrescription)
          this.set('selectedCompound', {
              id: e.detail.value,
              medicationValue: medication
          })
          this.set('compoundPrescriptionText', medication.compoundPrescription )
      }else {
          this.set('selectedCompound', null);
          this.set('compoundPrescriptionText','')
      }
  }


  checkAdr(med, thenfun) {
      // check if patient have adverse drug reaction to this drug

      if(!this.user || !this.patient) {
          console.log("no user or patient, abort")
          return
      }
      if(!med) {
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

              if(intols.length) {
                  this.set('intolItems', intols)
                  this.set('medicationToBeAdded', med)
                  if(!med.content) {
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
      const icpc = he.codes && he.codes.find(t=>t.type==='ICPC' || t.type==='ICPC2')
      return icpc && ((icpc.code || icpc.id.split('|')[1]) + ' - ')
  }

  _heShortDateFormat(date, altDate) {
      return (date || altDate) && "'"+this.api.moment((date || altDate)).format('YY') || '';
  }

  _any(a,b,c,d,e) {
      return a||b||c||d||e
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
      return iconsMapping[(intol.tags.find(c => (c.type === 'CD-ITEM' || c.type === 'CD-ITEM-EXT-CHARACTERIZATION')) || {}).code || '']
  }
}

customElements.define(MedicationsSelectionDialog.is, MedicationsSelectionDialog)
