import './dynamic-link.js';
import '../../styles/paper-input-style.js';
import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class DynamicNumberField extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
		<style include="paper-input-style">
			:host {
				position: relative;
				flex-grow: var(--dynamic-field-width, 25);
				min-width: calc(var(--dynamic-field-width-percent, '25%') - 12px);
				padding: 0 6px;
				--paper-font-caption_-_line-height: var(--font-size-normal);
				box-sizing: border-box;
			}

			dynamic-link {
				position: absolute;
				right: 0;
				top: 4px;
			}

			.modified-icon {
				width: 18px;
			}

			.modified-previous-value {
				color: var(--app-text-color-disabled);
				text-decoration: line-through;
				font-style: italic;
			}

			.modified-before-out {
				color: var(--app-secondary-color-dark);
				text-align: right;
				float: right;
				font-style: italic;
				border-bottom: 1px dotted var(--app-secondary-color-dark);
			}

			.modified-after-out {
				color: var(--app-secondary-color-dark);
				text-align: right;
				float: right;
				font-style: italic;
				border-bottom: 1px dotted var(--app-secondary-color-dark);
			}

			.label-span{
				display: block;
                padding-bottom: 2px;
				max-width: 100%;
				text-overflow: ellipsis;
				float: left;
				overflow: hidden;
			}

			iron-input{
				min-width: 0;
				box-sizing: border-box;
				width: 100%;
				max-width: 100%;
				position: relative;
			}

			input{
				border: none;
				width: 0;
				min-width: 0;
				outline: 0;
				padding: 0;
				font-size: var(--font-size-normal);
				box-sizing: border-box;
				max-width: calc(100% - 16px);
				width: 100%;
				position:absolute;
				height: 100%;
				background: transparent;
			}
		</style>

		<template is="dom-if" if="[[readOnly]]">
			<paper-input-container always-float-label="true">
				<label slot="label">
					<span class="label-span">[[localize(label,label,language)]]</span>
					<template is="dom-if" if="[[wasModified]]">
						<span class="modified-before-out">[[localize('mod','modified',language)]] [[lastModified]] <iron-icon class="modified-icon" icon="schedule"></iron-icon></span>
					</template>
					<template is="dom-if" if="[[isModifiedAfter]]">
						<span class="modified-after-out">[[localize('obs_val','obsolete value',language)]]<iron-icon class="modified-icon" icon="report-problem"></iron-icon></span>
					</template>
				</label>
				<iron-input slot="input" bind-value="{{inputValue}}">
					<input value="{{inputValue::input}}" readonly="">
				</iron-input>
			</paper-input-container>
		</template>
		<template is="dom-if" if="[[!readOnly]]">
			<paper-input-container always-float-label="true">
				<label slot="label">
					<span class="label-span">[[localize(label,label,language)]]</span>
					<template is="dom-if" if="[[wasModified]]">
						<span class="modified-before-out">[[localize('mod','modified',language)]] [[lastModified]] <iron-icon class="modified-icon" icon="schedule"></iron-icon></span>
					</template>
					<template is="dom-if" if="[[isModifiedAfter]]">
						<span class="modified-after-out">[[localize('obs_val','obsolete value',language)]]<iron-icon class="modified-icon" icon="report-problem"></iron-icon></span>
					</template>
				</label>
				<iron-input slot="input" bind-value="{{inputValue}}">
					<input value="{{inputValue::input}}">
				</iron-input>
			</paper-input-container>
			<dynamic-link i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" linkables="[[linkables]]" api="[[api]]" represented-object="[[label]]"></dynamic-link>
		</template>
`;
  }

  static get is() {
      return 'dynamic-number-field';
	}

  static get properties() {
      return {
          wasModified: {
              type: Boolean
          },
          isModifiedAfter: {
              type: Boolean
          },
          readOnly: {
              type: Boolean,
              value: false
          },
          lastModified: {
              type: String
          },
          label: {
              type: String
          },
          value: {
              type: Number,
              notify: true,
              observer: '_valueChanged'
          },
          inputValue: {
              type: String,
              observer: '_inputValueChanged'
          },
          width: {
              type: Number,
              value: 24,
              observer: '_widthChanged'
          }
      };
	}

  constructor() {
      super();
	}

  _widthChanged(width) {
      this.updateStyles({ '--dynamic-field-width': width, '--dynamic-field-width-percent': '' + width + '%' });
	}

  _valueChanged(value) {
      const normalizedInputValue = this.value || this.value === 0 ? '' + this.value : '';
      if ((this.inputValue || '').trim() !== normalizedInputValue) {
          this.set('inputValue', normalizedInputValue);
      }
	}

  _inputValueChanged(value) {
      if (this.inputValue !== '' + this.value) {
          const match = /^ *([+-]?[0-9]+(?:[.,][0-9]*)?) *$/.exec(this.inputValue);
          if (!this.inputValue.match(/^ *([+-]?[0-9]+(?:[.,]0*)) *$/) /*intermediate situation*/) {
                  const newValue = match && (match[1] ? parseFloat(match[1].replace(/([0-9]),([0-9])/, "$1.$2")) : null) || (isNaN(parseFloat(this.inputValue)) ? null : parseFloat(this.inputValue));
                  if ((newValue || this.value) && newValue !== this.value) {
                      this.set('value', newValue);
                      if(!this.readOnly) {
                          this.dispatchEvent(new CustomEvent('field-changed', { detail: { context: this.context, value: this.value } }));
                      }
                  }
              }
      }
	}
}

customElements.define(DynamicNumberField.is, DynamicNumberField);
