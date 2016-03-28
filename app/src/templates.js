const templates = {

    styles:`
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <style>
            .drag-enter {
                outline: 2px dashed #ff9f00 !important;
            }

            .drop-area {
                border: 2px solid black;
            }

            .drop-area {
                min-height: 500px;
            }

            .drop-area [role="header"] *,
            .drop-area [role="footer"] *,
            .drop-area [role="content"] *,
            .drop-area [role="sidebar"] *,
            .drop-area [role="footer"] * {
                pointer-events: none;
            }

            [draggable="true"],

            [data-mode="blocks"] * ,
            [data-mode="content"] *,
            [data-mode="props"] * {
                pointer-events: auto !important;
            }

            .drop-area [role="header"],
            .drop-area [role="footer"],
            .drop-area [role="content"],
            .drop-area [role="sidebar"],
            .drop-area [role="footer"],
            .drop-area [role="main"] {
                min-height:200px;
            }

            [switchable] {
                position: relative;
            }

            .switch-controllers {
                position: absolute;
                right: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,0.4);
                animation: fadeIn 0.2s ease-out;
                z-index: 99;
                text-align: right;
                padding: 5px;
                cursor: pointer;
            }

            .switch-controllers button {
                display: inline-block;
            }

            @keyframes fadeIn {
                from {
                    opacity:0;
                    display: inline-block;
                }
                to {
                    opacity: 1;
                    display: inline-block;
                }
            }

            .on-hover {
                box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.35);
                border-radius: 2px;
                cursor: text;
            }

        </style>
    `,

    editPanel: `
        <button class="btn btn-default blocks-mode" data-event="click:blocksMode">Blocks Mode</button>
        <button class="btn btn-default content-mode" data-event="click:contentMode">Content Mode</button>
        <button class="btn btn-default props-mode hidden" data-event="click:propsMode">Properties Mode</button>
        <button class="btn btn-default drag-mode" data-event="click:dragMode">Drag Mode</button>
    `,

    switchElement: `
        <div class="switch-controllers">
            <button class="btn btn-default" data-event="click:editSourceElement">
                <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-default" data-event="click:moveElementUp">
                <i class="fa fa-arrow-up"></i>
            </button>
            <button class="btn btn-default" data-event="click:moveElementDown">
                <i class="fa fa-arrow-down"></i>
            </button>
            <button class="btn btn-default" data-event="click:removeElement">
                <i class="fa fa-close"></i>
            </button>
        </div>
    `,

    propEditorContainer: `
        <div class="prop-editor-holder">
            <div class="prop-editor-body">

            </div>
        </div>
    `,

    codeMirror: `
      <div class="codemirror-holder">
        <div class="codemirror-ctrls">
            <button class="btn btn-danger" data-event="click:cancelCodeMirrorEdit">
                <i class="fa fa-close"></i>
            </button>
            <button class="btn btn-success" data-event="click:applyCodeMirrorEdit">
                <i class="fa fa-save"></i>
            </button>
        </div>
      </div>
    `,

    getTemplate (template) {
        if (!this[template]) throw `There\'s no ${template} template`;

        return this[template];
    }

};

export default templates