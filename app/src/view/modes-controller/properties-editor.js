const propEditorTpl = `
    <div class="prop-editor-holder">
        <div class="prop-editor-body">

        </div>
    </div>
`;

class PropertiesEditor {
    constructor () {
        this.init();
    }

    init () {

        this
            .create()
            .attachElements();

    }

    show (element) {
        console.log(element)
    }

    create () {
        let wrapper = this.$root = document.createElement('div');
        wrapper.innerHTML = propEditorTpl;

        document.body.appendChild(this.$root);

        return this
    }

    attachElements () {
        this.$editorBody = this.$root.querySelector('.prop-editor-body');
    }

}

export default PropertiesEditor