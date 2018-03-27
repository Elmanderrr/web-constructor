import helper from './../../../mixins/helpers.js'

class modesController  {

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
            },
            {
                name : 'HTML',
                selector : '.HTML-mode'
            }
        ]
    }


    /**
     *
     * @param current
     * @param mode
     */
    setActiveMode (mode) {
        modesController.editorModes.forEach(editorMode => {
            let el = this.$root.querySelector(editorMode.selector);


            if (editorMode.name === mode) {
                el.classList['add']('active');
            } else {
                el.classList['remove']('active');
            }
        });

        this.setMode(mode);
        this.dispatcher.mediator.pub('mode:change', {mode:mode})

    }

    getActiveMode () {
        return this.mode
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
     * @constructor
     */
    HTMLMode (e) {
        this.setActiveMode('HTML');

        this.disableModes(['blocks','content','drag']);
        this.dispatcher.detachEventsByName(['mouseleave']);

        this.initHTMLMode();

    }


    /**
     *
     * @param e
     */
    onMouseOver (e) {
        let parent = helper.findParent(e.target,'[switchable]');undefined
        if (!parent) return;

        switch(this.mode) {
            case 'blocks':
                this.onBlockElementHover(parent);
                break;
            case 'content':
                this.onContentElementHover(e.target);
                break;
            case 'props':
                this.onPropsElementHover(e.target)
                break;
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

    /**
     * I disable button controllers
     * @param modes
     */
    disableModes (modes=[]) {
        modesController.editorModes.forEach(mode => {
            if (modes.findIndex(m => m === mode.name) !== -1) {
                helper.qs(mode.selector).disabled = true;
            }
        })
    }

    /**
     * I enable button controllers
     * @param modes
     */
    enableModes (modes=[]) {
        modesController.editorModes.forEach(mode => {
            if (modes.findIndex(m => m === mode.name) !== -1) {
                helper.qs(mode.selector).disabled = false;
            }
        })
    }

}

export default modesController
