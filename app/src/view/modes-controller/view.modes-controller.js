import helper from './../../../mixins/helpers'

class EditorPanel  {

    /**
     *
     * @returns {string[]}
     */
    static get editorModes () {
        return [
            {
                name : 'blocks',
                selector : '.blocks-mode'
            },
            {
                name : 'content',
                selector : '.content-mode'
            },
            {
                name : 'drag',
                selector : '.drag-mode'
            },
            {
                name : 'props',
                selector : '.props-mode'
            }
        ]
    }


    /**
     *
     * @param current
     * @param mode
     */
    setActiveMode (mode) {
        EditorPanel.editorModes.forEach(editorMode => {
            let el = this.$root.querySelector(editorMode.selector);


            if (editorMode.name === mode) {
                el.classList['add']('active');
            } else {
                el.classList['remove']('active');
            }
        });

        this.setMode(mode)

    }

    /**
     *
     * @returns {*[]}
     */
    getEditorEvents () {
        
        return [
            {
                event:'mouseover',
                handler: this.onMouseOver.bind(this),
                selector: this.$iframeContent.querySelector('.drop-area')
            },
            {
                event:'mouseout',
                handler: this.onMouseOut.bind(this),
                selector: this.$iframeContent.querySelector('.drop-area')
            },
            {
                event:'click',
                handler: this.onMouseClick.bind(this),
                selector: this.$iframeContent.querySelector('.drop-area')
            }
        ]
    }

    attachEditorHandlers () {

        this.dispatcher.attachEvents(
            this.getEditorEvents()
        );

    }

    /**
     *
     * @param e
     */
    blocksMode (e) {
        this.setActiveMode('blocks');

        this.dispatcher.attachEvents(
            [ {event: 'mouseleave', handler: this.onBlockElementMouseLeave.bind(this)} ],
            this.$iframeContent.querySelectorAll('[switchable]')
        );
    }

    /**
     *
     * @param e
     */
    contentMode (e) {
        this.setActiveMode('content');

        this.dispatcher.detachEventsByName(['mouseleave']);

    }

    /**
     *
     * @param e
     */
    dragMode (e) {
        this.setActiveMode('drag');

        this.dispatcher.detachEventsByName(['mouseleave'])
    }

    /**
     *
     * @param e
     */
    propsMode (e) {
        this.setActiveMode('props');

        this.dispatcher.detachEventsByName(['mouseleave']);


    }


    /**
     *
     * @param e
     */
    onMouseOver (e) {
        let parent;

        if ((parent = helper.findParent(e.target,'[switchable]')) && this.mode === 'blocks') {
            this.onBlockElementHover(parent);
        }

        if (this.mode === 'content' && helper.findParent(e.target,'[switchable]')) {
            this.onContentElementHover(e.target);
        }

        if (this.mode === 'props' && helper.findParent(e.target,'[switchable]')) {
            this.onPropsElementHover(e.target)
        }
    }

    /**
     *
     * @param e
     */
    onMouseOut (e) {
        if (this.mode === 'content' || this.mode === 'props') {
            e.target.classList.remove('on-hover')
        }
    }

    /**
     *
     * @param e
     */
    onMouseClick (e) {
        e.preventDefault();

        if (helper.findParent(e.target, '[switchable]') && this.mode === 'content') {
            this.onContentElementClick(e.target)
        }

        if (helper.findParent(e.target, '[switchable]') && this.mode === 'props') {
            this.onPropsElementClick(e.target)
        }

    }

}

export default EditorPanel
