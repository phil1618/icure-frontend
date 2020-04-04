import '../../styles/buttons-style.js';
import '../../styles/paper-input-style.js';
import {TkLocalizerMixin} from "../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class FilterPanel extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="buttons-style paper-input-style">
            paper-card {
                width: calc(100%);
                margin: 0 32px 32px;

            }

            .pat-details-card > .card-content {
                padding: 16px 16px 32px !important;
            }

            .filters-panel {
                background: var(--app-light-color);
                @apply --padding-right-left-32;
                overflow: hidden;
                max-height: 85%;
                @apply --transition;
            }

            .filters-panel--collapsed {
                max-height: 0;
            }

            .filters-bar {
                background: var(--app-background-color-dark);
                border-bottom: 1px solid var(--app-background-color-darker);
                height: 40px;
                text-align: center;
                padding: 4px 0;
                width: var(--panel-width, 100%);
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
            }

            .hide-filters-btn {
                height: 40px;
                margin: 0 auto;
                width: 100%;
            }

            .filters-bar--small {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin: 0 12px;
                flex-shrink: 2;
                flex-grow: 1;
                max-height: 40px;
            }

            .filters-container {
                position: relative;
            }

            .filters-container-list {
                text-align: left;
                position: absolute;
                margin-top: 8px;
                top: 28px;
                right: 4px;
                background-color: var(--app-background-color);
                opacity: 1;
                border-radius: 2px;
                z-index: 200;
                height: auto !important;
                box-shadow: var(--app-shadow-elevation-2);
                display: flex;
                flex-flow: column nowrap;
                align-items: stretch;
                border-radius: 3px;
                overflow: hidden;
                padding: 0;
			}

            .filters-container-list paper-button{
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                text-transform: capitalize;
                height: 28px;
                padding: 0 12px 0 8px;
                font-weight: 400;
                font-size: var(--font-size-normal);
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                flex-grow: 1;
                border-radius: 0;
                margin: 0;
            }
            .filters-container-list paper-button:hover, .print-forms-container paper-button:hover, .outgoing-docs-container paper-button:hover{
                background: var(--app-background-color-dark);
            }

            .filters-container-list paper-button iron-icon, .print-forms-container paper-button iron-icon, .outgoing-docs-container paper-button iron-icon{
                color: var(--app-secondary-color);
                height: 20px;
                width: 20px;
                margin-right: 4px;
                box-sizing: border-box;
            }

            paper-item.iron-selected {
                background-color: var(--app-primary-color);
                color: var(--app-text-color-light);
            }

            .search-icon {
                height: 20px;
                width: 20px;
                color: var(--app-text-color);
            }

            .clear-search-button-icon {
                height: 26px;
                width: 26px;
                padding: 2px;
                margin-bottom: 6px;
                color: var(--app-text-color);
            }

            paper-input {
                padding: 0 8px;
                box-sizing: border-box;
            }

            @media screen and (max-width:1025px){
                .filters-bar--small{
                    margin: 0 16px;
                }
            }
        </style>

        <div class="filters-bar">
            <div is="dom-if" hidden\$="{{showFiltersPanel}}" style="width: 100%;">
                <div class="filters-bar--small">
                    <div class="horizontal">
                        <template id="filterPanelIcons" is="dom-repeat" items="[[visibleItems]]" as="menu">
                            <paper-icon-button id="[[menu.id]]-btn" class\$="filters-bar--small-icon [[_isFilterSelected(menu.filter,selectedFilters,selectedFilters.*)]]" icon="[[menu.icon]]" on-tap="_filterSelected"></paper-icon-button>
                            <paper-tooltip for="[[menu.id]]-btn">[[_localize(menu.title)]]</paper-tooltip>
                        </template>
                    </div>
                    <template is="dom-if" if="[[!showFiltersContainer]]">
                        <paper-button id="newFormBtn" class="button button--menu button--menu--other" on-tap="_toggleFiltersContainer">
                            <span class="no-mobile">[[localize('sho_fil','Show Filters',language)]]</span>
                            <iron-icon icon="[[_actionIcon(showFiltersContainer)]]"></iron-icon>
                        </paper-button>
                    </template>

                    <template is="dom-if" if="[[showFiltersContainer]]">
                        <div class="filters-container">
                            <paper-button class="button button--menu button--menu--other" on-tap="_toggleFiltersContainer">
                                <span class="no-mobile">[[localize('clo','Close',language)]]</span>
                                <iron-icon icon="[[_actionIcon(showFiltersContainer)]]"></iron-icon>
                            </paper-button>
                            <div class="filters-container-list">
                                <paper-input id="searchInput" label="[[localize('sch','Search',language)]]" value="{{searchString}}" always-float-label="">
                                    <iron-icon class="search-icons" icon="icons:search" prefix=""></iron-icon>
                                    <paper-icon-button suffix="" on-click="clearInput" icon="clear" alt="clear" title="clear" class="clear-search-button-icon"></paper-icon-button>
                                </paper-input>
                                <paper-listbox selected-values="[[_selectedFilterIndexes(selectedFilters, selectedFilters.*)]]" focused="" on-selected-items-changed="selectMenu" multi="">
                                    <template id="filterPanelMenu" is="dom-repeat" items="[[items]]" as="menu">
                                        <paper-button>
                                            <iron-icon class="filters-panel-icon" icon="[[menu.icon]]"></iron-icon>
                                            [[itemTitle(menu)]]
                                        </paper-button>
                                    </template>
                                </paper-listbox>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div>
            <template is="dom-repeat" items="[[visibleItems]]" as="menu">
                <paper-tooltip for="[[menu.id]]-btn">[[iconTitle(icon)]]</paper-tooltip>
            </template>
        </div>
`;
  }

  static get is() {
      return 'filter-panel';
  }

  static get properties() {
      return {
          items: {
              type: Array,
              value: [],
              noReset: true
          },
          visibleItems: {
              type: Array,
              computed: "computeVisibleItems(panelWidth,items)",
              noReset: true
          },
          showFiltersPanel: {
              type: Boolean,
              value: false
          },
          panelWidth: {
              type: Number,
              value: 200,
              noReset: true
          },
          searchString: {
              type: String,
              notify: true,
              value: null
          },
          selectedFilters: {
              type: Array,
              notify: true,
              value: []
          },
          showFiltersContainer: {
              type: Boolean,
              value: false
					}
      };
  }

  ready() {
      super.ready();
      this.addEventListener('iron-resize', () => this.onWidthChange());
  }

  attached() {
      super.attached();
      this.async(this.notifyResize, 1);
  }

  onWidthChange() {
      this.set('panelWidth', this.parentElement.offsetWidth - Array.from(this.parentElement.children).filter(el => el !== this).map(x => x.offsetWidth).reduce((sum, w) => sum + w, 0));
  }

  refreshIcons() {
      this.onWidthChange();
  }

  computeVisibleItems(width, items) {
      return items.filter((it, idx) => it.icon && idx * 40 < width - 255);
  }

  clearInput() {
      this.$.searchInput.value = "";
  }

  toggleFiltersPanel() {
      this.showFiltersPanel = !this.showFiltersPanel;
      this.root.querySelector('#filtersPanel').classList.toggle('filters-panel--collapsed');
  }

  _toggleFiltersContainer() {
      this.showFiltersContainer = !this.showFiltersContainer;
  }

  iconTitle(icon){
      return icon.title[this.language]
  }

  itemTitle(item){
      return item.title[this.language]
  }

  _isFilterSelected(filter) {
      return this.selectedFilters.includes(filter) ? 'selected' : ''
  }

  _filterSelected(e) {
      const filter = this.$.filterPanelIcons.modelForElement(e.target).menu.filter
      const currentIndex = this.selectedFilters.indexOf(filter)
      if (currentIndex >= 0) {
          this.splice('selectedFilters', currentIndex, 1)
      } else {
          this.push('selectedFilters', filter)
      }
  }

  selectMenu(e) {
      if(e.detail.value.length !== 0) {
          this.set('selectedFilters',e.detail.value.map(val =>this.shadowRoot.querySelector("#filterPanelMenu").modelForElement(val).menu.filter))
      } else {
          this.set('selectedFilters',[])
      }
  }

  _selectedFilterIndexes(){
      return this.selectedFilters ? this.selectedFilters.map(f=> this.items.map(i=>i.filter).indexOf(f)) : []

  }

  reset() {
      const props = FilterPanel.properties
      Object.keys(props).forEach(k => { if (!props[k].noReset) { this.set(k, (typeof props[k].value === 'function' ? props[k].value() : (props[k].value || null))) }})
      // this.root.querySelector('#filtersPanel').classList.add('filters-panel--collapsed');

  }

  _localize(data, language = this.language) {
      return data[language]
  }

  _triggerOpenDocumentsDirectory() {
      this.dispatchEvent(new CustomEvent('trigger-open-documents-directory', {composed:true,bubbles:true,detail:{}}))
  }

  _actionIcon(showFiltersContainer) {
      return showFiltersContainer ? 'icons:close' : 'icons:more-vert';
  }
}

customElements.define(FilterPanel.is, FilterPanel);
