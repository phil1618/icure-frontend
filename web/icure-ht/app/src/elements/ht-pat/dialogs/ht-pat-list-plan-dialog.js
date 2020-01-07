import '../../../styles/dialog-style.js';
import '../../../styles/scrollbar-style.js';
import _ from 'lodash/lodash';

class HtPatListPlanDialog extends Polymer.TkLocalizerMixin(Polymer.mixinBehaviors([Polymer.IronResizableBehavior], Polymer.Element)) {
  static get template() {
    return Polymer.html`
        <style include="scrollbar-style dialog-style">
            #dialog {
                min-width: 800px;
                max-height: calc( 90vh - 64px ) !important;
            }

            h2 {
                min-height: 44px;
            }

            .err {
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                align-items: center;
                font-weight: 700;
                color: var(--app-error-color);
                padding: 20%;
            }

            paper-item {
                font-size: 14px;
                border: 1px solid var(--app-background-color);
            }

            paper-item:hover {
                background-color: var(--app-background-color);
            }

            .buttons {
                height: 56px;
                display: flex;
                justify-content: flex-end;
            }

            .col-lg-1{
                width: 15%;
            }

            .col-lg-2{
                width: 60%;
            }

            .col-lg-3{
                width: 20%;
            }

            .col-lg-4{
                width: 5%;
            }

            .status {
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                font-size: 14px;
                display: block;
                width: auto;
                max-width: fit-content;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .status--orangeStatus{
                background: #fcdf354d;
            }
            .status--greenStatus{
                background: #07f8804d;
            }
            .status--redStatus{
                background: #ff4d4d4d;
            }

            .statusIcon {
                height: 8px;
                width: 8px;
            }
            .statusIcon--orangeStatus {
                color: var(--app-status-color-pending);
            }
            .statusIcon--greenStatus {
                color: var(--app-status-color-ok);
            }
            .statusIcon--redStatus {
                color: var(--app-status-color-nok);
            }

            .content {
                overflow-y: scroll;
                max-height: 75vh;
            }

            @media screen and (max-width: 936px) {
                paper-dialog#dialog {
                    min-height: 0!important;
                    min-width: 0!important;
                    max-height: none !important;
                    max-width: none !important;
                    height: calc(100vh - 84px)!important;
                    width: 100%;
                    margin: 0;
                    top: 64px!important;
                    left: 0 !important;
                    transform: none!important;
                }
            }
        </style>

        <paper-dialog id="dialog" opened="{{opened}}">
            <h2 class="modal-title">[[localize('plan_of_act','Action plan',language)]]</h2>
            <div class="content">
                <paper-listbox id="services-list" class="" selected="{{selected}}">
                    <template is="dom-if" if="[[!services.length]]">
                        <paper-item class="err"><iron-icon icon="warning"></iron-icon> [[localize('no_action_plan','No action plans',language)]] !</paper-item>
                    </template>
                    <template is="dom-repeat" items="[[services]]">
                        <paper-item class="" on-click="debugPostProcedure" data-item\$="[[item.id]]">
                            <div class="col-lg-1" data-item\$="[[item.id]]">[[_formatDate(item.valueDate, services)]]</div>
                            <div class="col-lg-2" data-item\$="[[item.id]]">[[_getContent(item, services)]]</div>
                            <div class="col-lg-3" data-item\$="[[item.id]]"><span class\$="status [[_getStatusClass(item, services)]]"><iron-icon icon="vaadin:circle" class\$="statusIcon [[_getIconStatusClass(item, services)]]"></iron-icon>&nbsp;[[_getStatus(item,services)]]</span></div>
                            <div class="col-lg-4" data-item\$="[[item.id]]">
                                <paper-icon-button id="bt-[[item.id]]" class="" icon="zoom-in" on-tap="showAction" data-item\$="[[item.id]]"></paper-icon-button>
                                <paper-tooltip position="left" for="bt-[[item.id]]">[[localize('show_det','Show details',language)]]</paper-tooltip>
                            </div>
                        </paper-item>
                    </template>
                </paper-listbox>
            </div>
            <div class="buttons">
                <paper-button class="button" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-list-plan-dialog';
  }

  static get properties() {
      return {
          api: {
              type: Object,
              value: null
          },
          user: {
              type: Object,
              value: null
          },
          language: {
              type: String
          },
          contacts: {
              type: Array,
              value: null,
              observer : "contactsChanged",
          },
          opened: {
              type: Boolean,
              value: false
          },
          services:{
              type: Array,
              value: ()=>[]
          },
          comboStatus: {
              type: Array,
              value : () => [
                  {
                      "id"       : "aborted",
                      "label": {"fr": "Abandonné / Contre-indiqué", "nl": "Verlaten / Niet aangegeven", "en": "Abandoned / Against indicated"}
                  },
                  {
                      "id"       : "aborted",
                      "label": {"fr": "Abandonné / Décès", "nl": "Verlaten / ", "en": "Abandoned / Death"}
                  },
                  {
                      "id"       : "aborted",
                      "label": {"fr": "Abandonné / Désabonné", "nl": "Verlaten / Afgemeld", "en": "Abandoned / Unsubscribed"}
                  },
                  {
                      "id"       : "error",
                      "label": {"fr": "Abandonné / Erreur", "nl": "Verlaten /", "en": "Abandoned / Error"}
                  },
                  {
                      "id"       : "aborted",
                      "label": {"fr": "Abandonné / Non pertient", "nl": "Verlaten / Irrelevant", "en": "Abandoned / Not relevant"}
                  },
                  {
                      "id"       : "refused",
                      "label": {"fr": "Abandonné / Refus patient", "nl": "Verlaten / Weigering van de patiënt", "en": "Abandoned / Patient refusal"}
                  },
                  {
                      "id"       : "aborted",
                      "label": {"fr": "Abandonné / Trop tard", "nl": "Verlaten / ", "en": "Abandoned / Too late"}
                  },
                  {
                      "id"       : "aborted",
                      "label": {"fr": "Abandonné par le patient", "nl": "Verlaten / erwachting", "en": "Abandoned by patient"}
                  },
                  {
                      "id"       : "pending",
                      "label": {"fr": "En attente", "nl": "Verwachting", "en": "Waiting"}
                  },
                  {
                      "id"       : "planned",
                      "label": {"fr": "En attente planifié", "nl": "Gepland wachten", "en": "Scheduled waiting"}
                  },
                  {
                      "id"       : "completed",
                      "label": {"fr": "Fait", "nl": "Geëxecuteerd", "en": "Done"}
                  },
                  {
                      "id"       : "proposed",
                      "label": {"fr": "Rappel envoyé", "nl": "Herinnering verzonden", "en": "Reminder sent"}
                  },
                  {
                      "id"       : "cancelled",
                      "label": {"fr": "Annulé", "nl": "cancelled", "en": "cancelled"}
                  }
              ]
          },
          selected :{
              type:Object,
              value : {}
          },
          servicesRefresher: {
              type: Number,
              value: 0
          },
      };
  }

  static get observers() {
      return ['contactsChanged(contacts, servicesRefresher)'];
  }

  ready() {
      super.ready();
  }

  reset() {
      this.set("services", [])
      this.set("selected", {})
  }

  contactsChanged(){
      if(!(this.contacts && this.contacts.length)) {
          this.reset()
          return;
      }
      this.api.contact().filterServices(this.contacts,s => s.label==='Actes' || (s.tags.some(t => t.type == "SOAP" && t.code == "Plan") && s.tags.some(t => t.type == 'CD-ITEM-TASK')))
      .then(services =>{
          this.set("services",_.orderBy(services,["valueDate", "created"],['desc', 'desc']))
      })
  }

  _getContent(svc){
      const content = svc && this.api.contact().preferredContent(svc, this.language) || svc.content[this.language]
      return content && content.stringValue || this.localize('obs_val','obsolete value',this.language)
  }

  _formatDate(date){
      return date && this.api.formatedMoment(date);
  }

  _getStatus(svc){
      return this.comboStatus.find(statut => statut.id===_.get( svc.tags.find(tag => tag.type==="CD-LIFECYCLE"), "code", "" )) ? this.comboStatus.find(statut => statut.id===_.get(svc.tags.find(tag => tag.type==="CD-LIFECYCLE"), "code", "" ) ).label[this.language] : _.get( svc.tags.find(tag => tag.type==="CD-LIFECYCLE"), "code", "" )
  }

  _getStatusClass(svc){
      let status = this._getStatus(svc)
      return  (this.comboStatus.find(e => e.label[this.language] === status).id === "aborted")  ? "status--redStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "error")  ? "status--redStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "refused")  ? "status--redStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "cancelled")  ? "status--redStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "pending")  ? "status--orangeStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "planned")  ? "status--orangeStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "proposed")  ? "status--orangeStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "completed")  ? "status--greenStatus" :
              ""
  }

  _getIconStatusClass(svc){
      let status = this._getStatus(svc)
      return  (this.comboStatus.find(e => e.label[this.language] === status).id === "aborted")  ? "statusIcon--redStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "error")  ? "statusIcon--redStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "refused")  ? "statusIcon--redStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "cancelled")  ? "statusIcon--redStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "pending")  ? "statusIcon--orangeStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "planned")  ? "statusIcon--orangeStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "proposed")  ? "statusIcon--orangeStatus" :
              (this.comboStatus.find(e => e.label[this.language] === status).id === "completed")  ? "statusIcon--greenStatus" :
              ""
  }

  debugPostProcedure(e) {
      console.log("debug proc", this.services.find(svc => svc.id===e.target.dataset.item))
  }

  showAction(e){
      this.set("contact",this.contacts.find(ctc => ctc.services.find(svc => svc.id===e.target.dataset.item)))
      this.dispatchEvent(new CustomEvent('open-action', { detail: { contact: this.contact, service: this.services.find(svc => svc.id===e.target.dataset.item) } }));
  }
}
customElements.define(HtPatListPlanDialog.is, HtPatListPlanDialog);
