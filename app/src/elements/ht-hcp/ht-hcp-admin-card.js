/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../dynamic-form/dynamic-form.js';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtHcpAdminCard extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
		<style include="iron-flex iron-flex-alignment"></style>
		<style>
			:host {
				height: 100%;
				padding-top:32px;
			}

			.container {
				width: 100%;
				height: 100%;
			}

			paper-material.card {
				background-color: #fff;
				padding: 10px;
				margin-left: 5px;
				margin-right: 5px;
				margin-bottom: 10px;
			}

			paper-input {
				padding-left: 5px;
				padding-right: 5px;
			}

			paper-dropdown-menu {
				padding-left: 5px;
				padding-right: 5px;
			}

		</style>

		<dynamic-form id="dynamic-form" api="[[api]]" user="[[user]]" template="[[hcpForm]]" data-map="[[hcpMap]]" data-provider="[[dataProvider]]" language="[[language]]" resources="[[resources]]"></dynamic-form>
`;
  }

  static get is() {
      return 'ht-hcp-admin-card';
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
          prevHcp: {
              type: Boolean,
              value: false,
          },
          hcpMap: {
              type: Object,
              notify: true
          },
          hcpForm: {
              type: Object,
              value: function () {
                  return require('./rsrc/HcpAdministrativeForm.json');
              }
          },
          addressForm: {
              type: Object,
              value: function () {
                  return require('./rsrc/HcpAddressForm.json');
              }
          },
          telecomForm: {
              type: Object,
              value: function () {
                  return require('./rsrc/HcpTelecomForm.json');
              }
          },
          dataProvider: {
              type: Object,
              value: null
          }
      };
	}

  static get observers() {
      return ['hcpChanged(api,user,hcp)', 'hcpFormChanged(hcpForm, addressForm, telecomForm)'];
	}

  constructor() {
      super();
	}

  detached() {
      this.flushSave();
	}

  hcpFormChanged() {
      if (this.hcpForm && this.addressForm && this.telecomForm  && this.medicalHouseContractsForm) {
          this.set('combinedForm', this.hcpForm);
      }
	}

  hcpChanged() {
      if (this.api && this.user && this.hcp) {
          this.set('hcpForm', require((this.hcp && this.hcp.type && this.hcp.type.toLowerCase()==="medicalhouse")? "./rsrc/MedicalHouseHcpAdministrativeForm.json" : "./rsrc/HcpAdministrativeForm.json"));
          this.api.getRegistry('hcp').listeners['ht-hcp-admin'] = {target: this, pool: [this.hcp.id], callbacks: [() => this.hcpChanged()]}
          // this.flushSave();
          this.api.code().getCodes(this.hcp.languages.map(l=>'ISO-639-1|'+l+'|1').join(',') || "ISO-639-1|en|1").then( codes => {
              this.set('dataProvider', this.hcpDataProvider(this.hcp, '', this.hcp && this.hcp.id,codes));
              this.set("hcpMap", _.cloneDeep(this.hcp));
              if (!this.root.activeElement) {
                  this.$['dynamic-form'].loadDataMap();
              } else {
                  this.$[this.root.activeElement.id].loadDataMap();
              }

          })
      }
	}

  scheduleSave() {
      if (this.saveTimeout) {
          clearTimeout(this.saveTimeout);
      }
      this.saveAction = () => {
          this.api.hcparty().modifyHealthcareParty(this.hcp)
              .catch(e => this.api.hcparty().getHealthcareParty((this.hcp && this.hcp.id) || (hcp && hcp.id)))
              .then(p => this.api.register(p,"hcp"))
              .finally( () => this.dispatchEvent(new CustomEvent("hcp-saved",{ detail: {hcp : this.hcp},params: null})));
      };
      this.saveTimeout = setTimeout(this.saveAction, 10000);
	}

  flushSave() {
      if (this.saveTimeout) {
          clearTimeout(this.saveTimeout);
          this.saveAction();

          this.saveTimeout = undefined;
          this.saveAction = undefined;
      }
	}

  hcpDataProvider(root,rootPath,id,codes) {
      const getValue = function (key) {
          return root ? _.get(root, key) : null;
      };
      const setValue = (key, value) => {
          if (root && !_.isEqual( _.get(root, key) , value)) {
              root === this.hcp ? this.set('hcp.' + key, value) : _.set(root, key, value);
              this.scheduleSave(this.hcp);
          }
      };

      return {
          getStringValue: getValue.bind(this),
          getNumberValue: getValue.bind(this),
          getMeasureValue: getValue.bind(this),
          getDateValue: getValue.bind(this),
          getBooleanValue: function (key){root ? _.get(root, key) && _.get(root, key) !== 'false' : null}.bind(this),
          setStringValue: setValue.bind(this),
          setNumberValue: setValue.bind(this),
          setMeasureValue: setValue.bind(this),
          setDateValue: setValue.bind(this),
          setBooleanValue: setValue.bind(this),
          getSubForms: function (key) {
              return (root[key] || []).map((a, idx) => {
                  return {
                      dataMap: a,
                      dataProvider: this.hcpDataProvider(a,(rootPath.length ? rootPath + '.' : '') + key + '.' + idx, a.id || (a.id = this.api.crypto().randomUuid())),
                    	template:
                          key === 'addresses' ?
                              this.addressForm :
                              this.telecomForm
                  };
              });
          }.bind(this),
          addSubForm: function (key, guid){
              this.flushSave()
              ;(root[key] || (root[key] = [])).push({});
              this.$[this.root.activeElement.id].notify((rootPath.length ? rootPath + '.' : '') + key + '.*');
              this.scheduleSave(this.hcp);

          }.bind(this),
          getId : function(){ return id;}.bind(this),
          deleteSubForm: function(key, id){
              this.flushSave();
              _.remove(root[key], root[key].find(a => a.id === id));
              this.$[this.root.activeElement.id].notify((rootPath.length ? rootPath + '.' : '') + key + '.*');
              this.scheduleSave(this.hcp);
          }.bind(this),
          getValueContainers: function(key){
              return getValue(key).map((l,idx)=>{
                  const code = codes.find(c => c.code === l)
                  return {
                      id:this.api.crypto().randomUuid(),
                      index:idx,
                      content:(code && code.label && _.fromPairs(_.toPairs(code.label).map(([k,v]) => [k, {stringValue: v}]))) || _.fromPairs([[this.language,{stringValue:l}]]),
                      codes: code ? [code] : []
                  }
              })
          }.bind(this),
          setValueContainers: function(key, value){setValue(key, value.map(s=> (s.codes && s.codes[0] || {}).code || (this.api.contact().preferredContent(s,this.language) || {}).stringValue))}.bind(this),
          filter: function(data, text, uuid, id){
              if (data.source === 'insurances') {
                  return (text || '').length >= 2 ?
                      (text.match(/^[0-9]+$/) ? this.api.insurance().listInsurancesByCode(text) : this.api.insurance().listInsurancesByName(text))
                          .then(res => res.map(i => ({
                              'id': i.id,
                              'name': this.localizeContent(i.name, this.language)
                          }))) : id ? this.api.insurance().getInsurance(id)
                          .then(i => ({
                              'id': i.id,
                              'name': this.localizeContent(i.name, this.language)
                          })) : Promise.resolve([]);
              } else if (data.source === 'users') {
                  const s = text && text.toLowerCase()
                  return Promise.resolve(s ? Object.values(this.api.users).filter(u => (u.login && u.login.toLowerCase().includes(s.toLowerCase())) ||
                      (u.name && u.name.toLowerCase().includes(s.toLowerCase())) || (u.email && u.email.toLowerCase().includes(s.toLowerCase())))
                      .map(u => ({id: u.id, name: u.name || u.login || u.email})) : [])
              } else if (data.source === "mh") {
                  return (id||'').length >= 1 ?
                      this.api.hcparty().getHealthcareParty( id ).then(results => { return { 'id': results.id, 'name':_.upperFirst(_.lowerCase(results.name)) + ' ' +(typeof results.nihii === 'undefined' || !results.nihii ? '' : ' - ' + this.localize('nihii', 'INAMI', language) + ': ' + results.nihii) }}) :
                      (text || '').length >= 2 ? Promise.all([this.api.hcparty().findBySsinOrNihii( text ),this.api.hcparty().findByName( text )]).then(results => {
                          return _.flatten(_.chain( _.concat( results[0].rows, results[1].rows ) ).uniqBy( 'id' ).filter({ type : 'medicalhouse' }).value().map(i => ({
                              'id': i.id,
                              'name':_.upperFirst(_.lowerCase(i.name)) + ' ' +(typeof i.nihii === 'undefined' || !i.nihii ? '' : ' - ' + this.localize('nihii', 'INAMI', language) + ': ' + i.nihii) + ' ' +''
                          })));

                      }) : Promise.resolve([]);
              } else if (data.source === "supervisors") {
                  return (id||'').length >= 1 ?
                      this.api.hcparty().getHealthcareParty( id ).then(results => { return { 'id': results.id, 'name':_.upperFirst(_.lowerCase(results.firstName)) + " " + _.upperFirst(_.lowerCase(results.lastName)) + ' ' +(typeof results.nihii === 'undefined' || !results.nihii ? '' : ' - ' + this.localize('nihii', 'INAMI', language) + ': ' + results.nihii) }}) :
                      (text || '').length >= 2 ? Promise.all([this.api.hcparty().findBySsinOrNihii( text ),this.api.hcparty().findByName( text )]).then(results => {
                          return _.flatten(_.chain( _.concat( results[0].rows, results[1].rows ) ).uniqBy( 'nihii' ).filter(i=>{ return _.trim(_.get(i,"type", "")) !== "medicalhouse" && _.trim(_.get(i,"type", "")) !== _.trim(this.hcp||"") && !_.trim(_.get(i, "supervisorId", "")) }).value().map(i => ({
                              'id': i.id,
                              'name':_.upperFirst(_.lowerCase(i.firstName)) + " " + _.upperFirst(_.lowerCase(i.lastName)) + ' ' +(typeof i.nihii === 'undefined' || !i.nihii ? '' : ' - ' + this.localize('nihii', 'INAMI', language) + ': ' + i.nihii)+''
                          })));

                      }) : Promise.resolve([]);
              } else if (data.source === "codes" && data.types.length && (id || (text && text.length > 1))) {
                  return id ?
                      Promise.all(data.types.map(ct => this.api.code().getCodeWithParts(ct.type, id, '1')))
                          .then(x => _.compact(x)[0])
                          .then(c => {
                              const typeLng = this.api.code().languageForType(c.type, this.language)
                              return {id: c.code, name: c.label[typeLng]}
                          }) :
                      Promise.all(data.types.map(ct => {
                          const typeLng = this.api.code().languageForType(ct.type, this.language)
                          const words = text.toLowerCase().split(/\s+/)
                          const sorter = x => [x.name && x.name.toLowerCase().startsWith(words[0]) ? 0 : 1, x.name]

                          return this.api.code().findPaginatedCodesByLabel('be', ct.type, typeLng, words[0], null, null, 200).then(results => _.sortBy(results.rows.filter(c => c.label[typeLng] && words.every(w => c.label[typeLng].toLowerCase().includes(w))).map(code => ({
                              id: code.code, name: code.label[typeLng], stringValue: code.label[typeLng], codes: [code]
                          })), sorter))
                      })).then(responses => _.flatMap(responses))
              }
              return Promise.resolve(id ? null : [])
          }.bind(this)

      };
	}
}

customElements.define(HtHcpAdminCard.is, HtHcpAdminCard);
