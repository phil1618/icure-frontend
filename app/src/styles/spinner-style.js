const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="spinner-style">
        <template>
            <style is="custom-style">
                .spinner {
                    --paper-spinner-layer-1-color: var(--app-primary-color-light);
                    --paper-spinner-layer-2-color: var(--app-secondary-color);
                    --paper-spinner-layer-3-color: var(--app-primary-color-dark);
                    --paper-spinner-layer-4-color: var(--app-secondary-color-dark);
                    --paper-spinner-stroke-width: 2px;
                }
            </style>
        </template>
    </dom-module>`;

document.head.appendChild($_documentContainer.content);
