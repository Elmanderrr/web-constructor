import swal from 'sweetalert'

class EditableElement {
    constructor (element, callback) {
        this.$root = element;
        this.callback = callback;
        this._editableContent = [];
    }

    init () {
        swal(
            {
                animation:'slide-from-top',
                title:'Редактирование',
                text:this.generateTemplate(),
                html:true,
                showCancelButton:true
            },
            this.setContent.bind(this)
        );

        this.mergeModels();
    }

    /**
     *
     * @param content
     */
    setContent (content) {

        if (content) {
            this._editableContent.forEach(item => {
                item.node.textContent = item.relatedInput.value;
            })
        }

        if (typeof this.callback === 'function') {
            this.callback()
        }

    }


    /**
     * I generate template for each edited field;
     * Revers array for display the fields correctly. From left to top => from top to bottom;
     * @returns {string}
     */
    generateTemplate () {
        return this.getNodes(this.$root)
            .filter(this.filterNodes.bind(this))
            .map(this.pushToModel.bind(this)).reverse()
            .map(EditableElement.createField).join('')
    }

    /**
     *
     * @param node
     * @returns {string|boolean|Number}
     */
    filterNodes (node) {
        return (
            this.filter(node)
            || Array.from(node.childNodes).filter(this.filter).length
        )
    }

    filter (node) {
        return node.nodeType === 3 && node.textContent.trim()
    }

    /**
     * I return all childNodes of an element
     * @param element
     * @returns {Array}
     */
    getNodes (element) {
        var childNodes = element.childNodes,
            children = [],
            i = childNodes.length;

        while (i--) {
            if (childNodes[i].nodeType === 1 || childNodes[i].nodeType === 3) {

                children = children.concat.apply(
                    children, [
                        childNodes[i].childNodes.length ? Array.from(childNodes[i].childNodes) : childNodes[i]
                    ]
                )

            }
        }
        return children;
    }

    /**
     * I push to model each node that can be possibly edited;
     * @param node
     * @returns {*}
     */
    pushToModel (node) {
        this._editableContent.push({node});

        return node
    }


    /**
     * I merge earlier filled model with editable inputs in sweet-alert modal;
     * First of all, it's a deliberate shitty code. And i go for it, just because of sweet-alert modal
     * don't work with custom NodeList and only with HTML string. So I cant get access to my dynamically generated inputs.
     */
    mergeModels () {

        // Revers array for display the fields correctly. From left to from top => top to bottom;
        let swalCustomNodes = Array.from(
            document.body.querySelectorAll('.sweet-alert .modal-custom-content textarea')
        ).reverse();

        this._editableContent.forEach((content, i) => {
            content.relatedInput = swalCustomNodes[i];
        });

    }

    /**
     *
     * @param node
     * @returns {*}
     */
    static createField (node) {
        let textarea = document.createElement('textarea');
        textarea.classList.add('form-control');
        textarea.textContent = node.textContent;

        return `
            <div class="modal-custom-content">
                ${new XMLSerializer().serializeToString(textarea)}
            </div>
        `
    }

}

export default EditableElement