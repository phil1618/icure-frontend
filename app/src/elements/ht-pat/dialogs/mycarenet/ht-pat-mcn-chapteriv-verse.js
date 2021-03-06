import {PolymerElement, html} from '@polymer/polymer';
class HtPatMcnChapterIVVerse extends PolymerElement {
  static get template() {
    return html`
        <style>
            ul {
                list-style: none;
            }

            .disabled {
                color: lightgrey;
            }

            .chapterDocIcon{
                height: 14px;
                width: 14px;
            }
        </style>

        <li style\$="background-color: [[_ynToColour(verse.checkBoxInd, parentIncomplete)]]">
            <template is="dom-if" if="[[_isY(verse.checkBoxInd)]]"><vaadin-checkbox id="[[verse.verseNum]]" checked="[[_checked(verse.verseNum, checkedVerses.*)]]" on-checked-changed="_checkChanged"></vaadin-checkbox></template>
            <span class\$="[[_verseDisabled(extension,verse)]]"><template is="dom-if" if="[[_isFrench(language)]]">[[verse.textFr]] </template><template is="dom-if" if="[[_isDutch(language)]]">[[verse.textNl]]</template><template is="dom-if" if="[[_isY(verse.otherAddedDocumentInd)]]"> <iron-icon icon="vaadin:file-text-o" class="chapterDocIcon"></iron-icon> *doc* </template>[ [[verse.verseNum]] ]</span>
            <template is="dom-if" if="[[_isParent(verse, checkedVerses.*)]]"><span style="background-color: #ffa">[Veuillez cocher au minimum [[verse.minCheckNum]] case(s) ci-dessous]</span></template>
            <ul>
              <template is="dom-repeat" items="[[verse.verses]]" as="v">
                <ht-pat-mcn-chapteriv-verse verse="[[v]]" language="[[language]]" parent-incomplete="[[_isIncomplete(verse.minCheckNum, checkedVerses.*)]]" on-check="_check" checked-verses="[[checkedVerses]]"></ht-pat-mcn-chapteriv-verse>
            </template>
            </ul>
        </li>
`;
  }

  static get is() {
      return 'ht-pat-mcn-chapteriv-verse';
  }

  static get properties() {
      return {
          language: {
              type: String
          },
          verse: {
              type: Object
          },
          checkedVerses: {
              type: Array,
              notify: true,
              value: () => []
          },
          parentIncomplete: {
              type: Boolean
          },
          extension: {
              type: Boolean,
              value : false
          }
      };
  }

  static get observers() {
      return [];
  }

  ready() {
      super.ready();
  }

  attached() {
      super.attached();
  }

  _ynToColour(yn ) {
      return yn === 'Y' && this.parentIncomplete ? '#ffa':'transparent';
  }

  _isY(yn) {
      return yn === 'Y'
  }

  _isFrench(language) {
      return this.language === 'fr'
  }

  _isDutch(language) {
      return this.language === 'nl'
  }

  _isIncomplete(val) {
      return val>0 && (this.checkedVerses || []).length<val
  }

  _checked(verseNum) {
      return (this.checkedVerses || []).includes(verseNum)
  }

  _checkChanged(e) {
      if (e.detail) {
          this.dispatchEvent(new CustomEvent('check', {detail: {uncheck: !e.detail.value, verse: this.verse.verseNum}, bubbles: true, composed: true}))
      }
  }

  _check(e) {
      if (e.detail.uncheck && this.checkedVerses.includes(e.detail.verse)) {
          this.splice('checkedVerses', this.checkedVerses.indexOf(e.detail.verse), 1)
      } else if (!e.detail.uncheck && !this.checkedVerses.includes(e.detail.verse)) {
          this.splice('checkedVerses', 0, 0, e.detail.verse)
      }
      this.dispatchEvent(new CustomEvent('check', {detail: e.detail, bubbles: true, composed: true}))
  }

  _isParent(val){
      return val && val.verses && val.verses.length !== 0 && val.minCheckNum>0 && (this.checkedVerses || []).length<val.minCheckNum
  }

  _verseDisabled(ext,v) {
      return !v || (this.extension && v.requestType !== 'N' || !this.extension && v.requestType !== 'P') ? '' : 'disabled'
  }
}
customElements.define(HtPatMcnChapterIVVerse.is, HtPatMcnChapterIVVerse);
