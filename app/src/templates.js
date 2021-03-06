const templates = {

    styles:`
        <link data-type="injectable" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

        <style data-type="injectable">
            .drag-enter, .droppable {
                outline: 2px dashed #ff9f00 !important;
            }

            .droppable {
                min-height: 200px;
            }

            .drop-area {
                border: 2px solid black;
                min-height: 500px;
            }

            .drop-area:after,
             [switchable]:after{
                content: '';
                display: block;
                visibility: visible;
                height: 0;
                clear: both;
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
                padding: 6px 10px;
                cursor: pointer;
                border:1px solid #ccc;
                border-radius: 2px;
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
        <button class="btn btn-default HTML-mode" data-event="click:HTMLMode">HTML mode</button>
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

    HTMLMode:`
        <button class="btn btn-success codemirror-show-button" data-event="click:showCodeMirror">
            <i class="fa fa-edit"></i>
        </button>
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