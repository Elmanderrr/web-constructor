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
        this.iframeWrapper = '<div class="drop-area"></div>'

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

        this.buildIframe()
            .then(this.onAfterIframeLoad.bind(this));

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
     * @returns {Promise.<T>}
     */
    buildIframe () {
        this.$iframe = document.createElement('iframe');
        this.$root.appendChild(this.$iframe);

        // Insert content in to the iframe and do necessary wrapper around given layout content
        this.$iframe.contentDocument.write(this.templates.getTemplate('__layout'));
        this.$iframe.contentDocument.head.innerHTML += this.templates.getTemplate('styles');

        this.$iframeContent = this.$iframe.contentWindow.document.body;

        helper.wrap(
            this.iframeWrapper,
            helper.qs('body *', this.$iframeContent)
        );

        // Insert modes controllers button
        this.$root.insertAdjacentHTML('afterbegin', this.getEditorCtrlsTemplate());

        return Promise.resolve()
    }

    onAfterIframeLoad () {
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



