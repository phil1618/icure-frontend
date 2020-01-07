class DynamicVisibilitySelector extends Polymer.TkLocalizerMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
        <style>
            paper-menu-button {
                padding: 0;
                color: grey;
            }

            paper-icon-button {
                padding: 0 4px 8px 4px;
                width: 20px;
                height: 20px;
            }

            paper-listbox {
                max-height: 33vh;
                padding: 0;
            }

            paper-item {
                font-size: var(--font-size-normal);
                min-height: 24px;
                padding: 0 8px;
            }

            paper-item.link:hover {
                cursor: pointer;
                background: var(--app-background-color-dark);
            }
        </style>
        <paper-menu-button id="visibilityType" horizontal-align="left" dynamic-align="true" opened="{{visibilityOpened}}" allow-outside-scroll="">
            <paper-icon-button id="hc_menu" class="form-title-bar-btn" icon="icons:visibility-off" slot="dropdown-trigger" alt="menu" on-tap="_showVisibilitySelector"></paper-icon-button>
            <paper-listbox slot="dropdown-content">
                <template is="dom-repeat" items="[[availableVisibilityType]]" as="act">
                    <paper-item id="[[act.id]]" class="link" on-tap="addVisibilityType">[[_localizeVisibilityType(sct.label)]]</paper-item>
                </template>
            </paper-listbox>
        </paper-menu-button>
        <paper-tooltip position="right" for="act_menu">[[localize('visibility-type','Visibility type',language)]]</paper-tooltip>
`;
  }

  static get is() {
      return 'dynamic-visibility-selector';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          representedObject: {
              type: Object
          },
          visibilityOpened: {
              type: Boolean,
              value: false,
              observer: '_visibilityOpened'
          },
          statusOpened: {
              type: Boolean,
              value: false
          },
          openedOnce: {
              type: Boolean,
              value: false
          },
          initialised: {
              type: Boolean,
              value: false
          },
          delayed: {
              type: Boolean,
              value: true
          },
          listOfVisibilityType:{
              type: Array,
              value: () => []
          },
          availableVisibilityType:{
              type: Array,
              value: () => []
          }
      };
  }

  static get observers() {
      return [];
  }

  ready() {
      super.ready();
      if (this.delayed) {
          setTimeout(() => this.set('initialised', true), 100)
      }
  }

  _visibilityOpened(b) {
      this.set('openedOnce', b || this.openedOnce)
  }

  _showVisibilitySelector(e) {
      e.preventDefault();
      e.stopPropagation();

      if(e.target.id) {
          this.root.querySelector('#visibilityType').open();
      }

  }

  addConfidentialityType(e) {
      const type = this.subcontactType && this.subcontactType.find(type => e.target.id === type.id) || null
      if (!type) {
          return;
      }
      this.dispatchEvent(new CustomEvent('visibility-tag-changed', {bubbles: true, composed: true, detail: { type: type} }));

  }

  _localizeVisibilityType(label){
      return label[this.language]
  }
}
customElements.define(DynamicVisibilitySelector.is, DynamicVisibilitySelector);
