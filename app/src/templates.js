const templates = {

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