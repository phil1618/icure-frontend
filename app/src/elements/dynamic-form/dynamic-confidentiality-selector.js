import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class DynamicConfidentialitySelector extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
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
            <paper-menu-button id="confidentialityType" horizontal-align="left" dynamic-align="true" opened="{{confidentialityOpened}}" allow-outside-scroll="">
                <paper-icon-button id="hc_menu" class="form-title-bar-btn" icon="icure-svg-icons:privacy" slot="dropdown-trigger" alt="menu" on-tap="_showConfidentialitySelector"></paper-icon-button>
                <paper-listbox slot="dropdown-content">
                    <template is="dom-repeat" items="[[availableConfidentialityType]]" as="act">
                        <paper-item id="[[act.id]]" class="link" on-tap="addConfidentialityType">[[_localizeConfidentialityType(sct.label)]]</paper-item>
                    </template>
                </paper-listbox>
            </paper-menu-button>
        <paper-tooltip position="right" for="act_menu">[[localize('confidentiality-type','Confidentiality type',language)]]</paper-tooltip>
`;
  }

  static get is() {
      return 'dynamic-confidentiality-selector';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          representedObject: {
              type: Object
          },
          confidentialityOpened: {
              type: Boolean,
              value: false,
              observer: '_confidentialityOpened'
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
          listOfConfidentialityType:{
              type: Array,
              value: () => []
          },
          availableConfidentialityType:{
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

  _confidentialityOpened(b) {
      this.set('openedOnce', b || this.openedOnce)
  }

  _showConfidentialitySelector(e) {
      e.preventDefault();
      e.stopPropagation();

      if(e.target.id) {
          this.root.querySelector('#confidentialityType').open();
      }

  }

  addConfidentialityType(e) {
      const type = this.subcontactType && this.subcontactType.find(type => e.target.id === type.id) || null
      if (!type) {
          return;
      }
      this.dispatchEvent(new CustomEvent('confidentiality-tag-changed', {bubbles: true, composed: true, detail: { type: type} }));

  }

  _localizeConfidentialityType(label){
      return label[this.language]
  }
}
customElements.define(DynamicConfidentialitySelector.is, DynamicConfidentialitySelector);
