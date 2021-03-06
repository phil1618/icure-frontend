import {PolymerElement, html} from '@polymer/polymer';
class SplashScreen extends PolymerElement {
  static get template() {
    return html`
		<style>
			.container {
				position:fixed;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
			}

			svg {
				transform: scale(1);
			}

			svg path.st0 {
				stroke-dasharray: 743.27;
				stroke-dashoffset: 743.27;
				animation: dash 300s forwards linear;
			}

			@keyframes dash {
				to {
					stroke-dashoffset: 148654;
				}
			}        </style>

		<div class="container">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="194px" height="139.5px" viewBox="0 0 194 139.5" style="enable-background:new 0 0 194 139.5;" xml:space="preserve">
<style type="text/css">
	.st0 {
		fill: none;
		stroke: #66DEA1;
		stroke-width: 6;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-miterlimit: 10;
	}
</style>
<defs>
</defs>
<path class="st0" d="M42.4,75.1h28.7c1.5,0,2.8-1,3.2-2.3l3.1-7.7l8.9,37.5c0.3,1.6,1.7,2.7,3.3,2.7c1.6,0,3-1.2,3.2-2.8l12.2-54
	l9.3,39.3c0.2,1.4,1.2,2.4,2.6,2.7c1.4,0.3,2.7-0.3,3.5-1.4l6.9-14l28.4,0.1c21.2,0,32.2,7.8,34.9,24.6c1.6,10.5-1,20-7.4,26.9
	c-6.6,7.1-16.6,10.6-27.7,9.7h-110c-22.8,0-41.4-17.6-42.4-40C2,74,18.7,54.8,41,52.8c1.5-0.1,2.8-1.3,3-2.9
	c1.4-12,6.7-22.9,15.2-31.4C69.2,8.5,82.5,3,96.8,3c14.2,0,27.5,5.5,37.5,15.5c6.9,6.9,12.5,19.4,15,33.4l0.2,0.9"></path>
</svg>
		</div>
`;
  }

  static get is() {
      return 'splash-screen';
	}

  static get properties() {
      return {};
	}

  constructor() {
      super();
	}
}

customElements.define(SplashScreen.is, SplashScreen);
