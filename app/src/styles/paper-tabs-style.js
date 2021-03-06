const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="paper-tabs-style">
	<template>
		<style is="custom-style">
            paper-tabs {
				flex-grow: 1;
                background: var(--app-background-color-dark);
                border-bottom: 1px solid var(--app-background-color-darker);
				box-sizing: border-box;
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                --paper-tabs: {
                    color: var(--app-text-color);
                };
            }

            paper-tab {
                --paper-tab-ink: var(--app-secondary-color);
                font-size: var(--font-size-normal);
            }

            paper-tab.iron-selected {
                font-weight: bold;
            }

            paper-tab.iron-selected iron-icon{
                opacity: 1;
                color: var(--app-secondary-color);
            }

            paper-tab iron-icon{
                opacity: 0.5;
                color: var(--app-text-color);
                max-height: 20px;
				width: 20px;
				margin-right: 8px;
            }
        </style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
