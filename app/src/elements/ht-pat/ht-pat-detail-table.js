import '../dynamic-form/ckmeans-grouping.js';
import '../dynamic-form/dynamic-form.js';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtPatDetailTable extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style>
            .form-title-bar-btn {
                height: 20px;
                width: 20px;
                padding: 2px;
            }
            .horizontal vaadin-date-picker {
                height: 90px;
                padding-bottom: 0px;
                @apply --padding-right-left-16
            }

           vaadin-grid{
                /*height: unset;*/
				max-height:calc(100% - 104px);
				margin: 32px 32px 0;
				box-shadow: var(--app-shadow-elevation-1);
				border: none;
                border-radius: 3px;
                overflow-y: auto;
               flex-grow: 1;
			}


            .link .ICD-10 span {
                content: '';
                display: inline-block;
                height: 6px;
                width: 6px;
                border-radius: 3px;
                margin-right: 3px;
                margin-bottom: 1px;
            }

            paper-listbox {
                min-width: 200px;
            }

            paper-menu-button {
                padding: 0;
            }
        </style>

        <ckmeans-grouping id="ckmeans-grouping" max-distance="1800000"></ckmeans-grouping>

        <vaadin-grid id="dynamic-list" size="10" multi-sort="[[multiSort]]" items="[[_labels(contacts,contacts.*, columns.*)]]" active-item="{{activeItem}}" on-tap="click">
            <vaadin-grid-column flex-grow="2">
                <template class="header">
                    <vaadin-grid-sorter path="label">[[localize('lab','Label',language)]]</vaadin-grid-sorter>
                </template>
                <template>[[item.label]]</template>
            </vaadin-grid-column>
            <template is="dom-repeat" items="[[columns]]" as="date" index-as="columnIndex">
                <vaadin-grid-column flex-grow="1">
                    <template class="header">
                        [[_date(date)]]
                    </template>
                    <template>[[_itemValueAtIndex(item,columnIndex)]]</template>
                </vaadin-grid-column>
            </template>
        </vaadin-grid>
`;
  }

  static get is() {
      return 'ht-pat-detail-table';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          patient: {
              type: Object,
              value: null
          },
          contact: {
              type: Object,
              value: null
          },
          contacts: {
              type: Array,
              value: []
          },
          activeItem: {
              type: Object
          },
          healthElements: {
              type: Array,
              value: function () {
                  return [];
              }
          },
          currentContact: {
              type: Object,
              value: null
          },
          columns: {
              type: Array,
              value: null
          },
          clusters: {
              type: Array,
              value: null
          },
          labelsServices: {
              type: Array,
              value: null
          }
      };
  }

  static get observers() {
      return ['_updateTable(contacts, contacts.*)'];
  }

  constructor() {
      super();
  }

  _updateTable(contacts) {
      const services = _.sortBy(_.flatMap(contacts, c => c.services.filter(s => this.api.contact().isNumeric(s, this.language) && !s.endOfLife)), ['modified']);
      const datesServices = services.reduce((acc, s) => {
          s.modified = s.modified ? s.modified : new Date().getTime()
          s.created = s.created ? s.created : new Date().getTime()
          ;(acc[s.modified || s.created] || (acc[s.modified || s.created] = [])).push(s)
          return acc;
      }, {});
      const labelsServices = services.reduce((acc, s) => {
          ;(acc[s.label] || (acc[s.label] = { label: s.label, services: [] })).services.push(s)
          return acc;
      }, {});
      this.set('labelsServices', labelsServices);
      const clusters = Object.keys(datesServices).length > 2 ? this.$['ckmeans-grouping'].cluster(_.sortBy(Object.keys(datesServices).map(d => parseInt(d)))).clusters : _.sortBy(Object.keys(datesServices)).map(d => [parseInt(d)]);
      this.set('clusters', clusters);
      const columns = clusters.map(a => this.averageDate(a)); //todo column cluster && ligne label
      this.set('columns', columns);
  }

  averageDate(cluster) {
      if (!cluster) {
          return 0;
      }
      return cluster.reduce((acc, val) => {
          return acc + val;
      }, 0) / cluster.length;
  }

  _isNotInCurrentContact(currentContact, contact) {
      return currentContact === null || contact !== currentContact;
  }

  _labels() {
      return this.labelsServices ? Object.values(this.labelsServices) : [];
  }

  _columnsIndex(item, index) {
      return item ? item[index][0] + '' : '';
  }

  _shortDescription(svc) {
      return this.api.contact().shortServiceDescription(svc, this.language);
  }

  _itemValueAtIndex(item, index) {
      const services = item && item.services && item.services.filter(s => this.clusters[index] && (this.clusters[index].includes(s.modified) || this.clusters[index].includes(s.created))) || [];
      return services.length ? _.uniq(services.map(s => this._shortDescription(s))).join(', ') : '-';
  }

  _date(date) {
      return date ? this.api.moment(date).format(date > 99991231 ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY') : '';
  }
}

customElements.define(HtPatDetailTable.is, HtPatDetailTable);
