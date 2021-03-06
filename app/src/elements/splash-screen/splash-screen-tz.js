import {PolymerElement, html} from '@polymer/polymer';
class SplashScreenTz extends PolymerElement {
  static get template() {
    return html`
		<style>
			.container {
				width: calc(var(--width) * 5.5);
				height: calc(var(--width) * 5.5);
				position: absolute;
				top: 50%;
				left: 50%;
			}

			.dot {
				position: absolute;
				display: block;
				height: 10px;
				width: var(--width);
				border-radius: 10px;
				overflow: visible;
				background: transparent;
			}

			.dot:before {
				content: '';
				display: block;
				width: calc(var(--width) * 5);
				height: var(--width);
				transform-origin: var(--hw) 0px;
				animation: width 1.82s infinite ease-in-out;
				opacity: 0.8;
				border-radius: var(--width);
			}

			.dot1 {
				top: 0;
				left:  calc(50% - (var(--width) / 2) );
				transform: rotate(60deg);
			}

			.dot1:before {
				background: #FFB300;
			}

			.dot2 {
				bottom: 0;
				left: calc(100% - (var(--width) / 2) );
				transform: rotate(180deg);
			}

			.dot2:before {
				background: #FF8F00;
			}

			.dot3 {
				bottom: 0;
				left:  calc(0% - (var(--width) / 2) );
				transform: rotate(300deg);
			}

			.dot3:before {
				background: #FFD740;
			}

			@keyframes width {
				0% {
					width: var(--width);
				}
				35% {
					width: calc(var(--width) * 5.7);
					margin-left: 0;
				}
				75% {
					width: calc(var(--width) * 1);
					
					margin-left: calc(var(--width) * 5.7 - var(--hw));
				}
				100% {
					width: var(--width);
				}
			}
		</style>

		<div class="container">
			<span class="dot dot1"></span>
			<span class="dot dot2"></span>
			<span class="dot dot3"></span>
		</div>
`;
  }

  static get is() {
      return 'splash-screen-tz';
	}

  static get properties() {
      return {};
	}

  constructor() {
      super();
	}
}

customElements.define(SplashScreenTz.is, SplashScreenTz);
