import helper from './../../../mixins/helpers.js'

class EditableElement {
    constructor () {
        this.$root = null;
        this._editableContent = [];

        this.init();
    }


    init () {
        if (typeof nanoModal === 'undefined') throw 'nanoModal plugin doesn\'t find';

        this.customizeModal();

        if (!this.modal) {
            this.modal = nanoModal('', {
                classes:'animated zoomIn',
                buttons: [
                    {
                        text : "OK",
                        handler : modal => {
                            this.applyContent();
                            setTimeout(modal.hide, 100);

                        },
                        primary : true
                    },
                    {
                        text : "Cancel",
                        handler : modal => setTimeout(modal.hide, 100)
                    }
                ]
            });
        }



    }

    /**
     *
     * @param element
     */
    setContent (element) {
        this.$root = element;

        if (this.modal) {
            this.modal.setContent(this.generateTemplate())
        }

    }

    /**
     * Custom function for hiding and showing nanoModal
     */
    customizeModal () {

        nanoModal.customShow = (defShow, modalAPI) => {
            document.body.classList.add('no-scroll');
            modalAPI.overlay.el.classList.add('animated', 'fadeIn');

            defShow();

            // Add negative margin to modal
            modalAPI.modal.el.style.marginTop = -Math.abs(modalAPI.modal.el.offsetHeight)/2 + 'px';
        };

        nanoModal.customHide = (defHide) => {
            document.body.classList.remove('no-scroll')
            defHide();
        };

    }

    /**
     *
     * @param content
     */
    applyContent () {

        Array.from(this._editableContent).forEach(field => {
            field.node.textContent = field.field.value
        });

    }


    /**
     * I generate template for each edited field;
     * Revers array for display the fields correctly. From left to top => from top to bottom;
     * @returns {string}
     */
    generateTemplate () {
        this.$form = document.createElement('form');

        this.getNodes(this.$root)
            .filter(this.filterNodes.bind(this)).reverse()
            .forEach( node => {
                let field = this.$form.appendChild(this.createField(node));

                this._editableContent.push({
                    node:node,
                    field: field.querySelector('textarea')
                });

            });

        return this.$form

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
                    children,
                    [
                        childNodes[i].childNodes.length ? Array.from(childNodes[i].childNodes) : childNodes[i]
                    ]
                )

            }
        }

        return children;
    }


    /**
     *
     * @param node
     * @returns {*}
     */
    createField (node) {
        let field = helper.createElement(`
            <div class="modal-custom-content">
                <textarea class="form-control" >${node.textContent}</textarea>
            </div>
        `);

        return field
    }

}

export default EditableElement