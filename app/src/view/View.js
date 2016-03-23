import helper from './../../mixins/helpers';

import DropArea from './drop-area/view.drop-area.js'
import EditorPanel from './modes-controller/view.modes-controller.js'

//RELATED TO EDITORPANEL EXTENDS
import ContentMode from './modes/view.content-mode.js'
import BlocksMode from './modes/view.blocks-mode.js'
import DragMode from './modes/view.drag-mode'
import PropsMode from './modes/view.props-mode'


class View extends helper.mix(DropArea, EditorPanel, helper.mix(ContentMode, BlocksMode, DragMode, PropsMode)) {

    constructor (dispatcher, templates, holder, dragElements, layout) {
        super();

        this.dispatcher = dispatcher;
        this.templates = templates;

        this.iframeSrc = 'iframe/iframe.html';

        this.$root = holder;
        this.$dragElements = dragElements;

        this.templates.__layout = layout;

        this.MODES = {
            content: 'content',
            blocks: 'blocks',
            props: 'props',
            drag:'drag',
            _default: 'drag'
        };

    }

    /**
     *
     */
    init () {

        this.loadIframe()
            .then(this.onAfterIframeLoad.bind(this));

    }

    /**
     *
     * @returns {String}
     */
    getDropAreaTemplate() {

        return `
            <div class="drop-area">
                ${this.templates.__layout}
            </div>
        `

    }

    /**
     *
     * @returns {*}
     */
    getEditorCtrlsTemplate () {
        return this.templates.getTemplate('editPanel');
    }

    /**
     *
     * @returns {Promise}
     */
    loadIframe () {
        this.$iframe = document.createElement('iframe');
        this.$iframe.src = this.iframeSrc;

        this.$root.insertAdjacentHTML('beforeend', this.getEditorCtrlsTemplate());
        this.$root.appendChild(this.$iframe);

        return new Promise((resolve, reject) => this.onIframeLoad(resolve))

    }

    /**
     *
     * @param resolve
     */
    onIframeLoad (resolve) {

        this.$iframe.addEventListener('load', resolve);

    }

    /**
     *
     * @param e
     */
    onAfterIframeLoad (e) {

        this.$iframeContent = e.target.contentWindow.document.body;
        this.$iframeContent.innerHTML = this.getDropAreaTemplate();

        this.attachDragElements(this.$dragElements)
            .attachDropArea()
            .attachEditorHandlers();

        this.parseEvents();

        this.dispatcher.mediator.pub('constructor:load')
    }

    /**
     *
     * @param mode
     */
    setMode (mode) {
        this.mode = this.MODES[mode] || this.MODES._default;

        try {
            this.$iframeContent.setAttribute('data-mode', this.mode);

        } catch (e) {
            console.error(e)
        }
    }

    /**
     * I init event parsing function
     * @param root
     */
    parseEvents (root = this.$root) {

        this.dispatcher.parseDeclaredEvents(this, root.querySelectorAll('[data-event]'));

    }
}

export default View



