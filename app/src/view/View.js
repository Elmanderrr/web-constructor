import helper from './../../mixins/helpers.js';

import DropArea from './drop-area/view.drop-area.js'
import modesController from './modes-controller/view.modes-controller.js'

//RELATED TO EDITORPANEL EXTENDS
import ContentMode from './modes/view.content-mode.js'
import BlocksMode from './modes/view.blocks-mode.js'
import DragMode from './modes/view.drag-mode'
import PropsMode from './modes/view.props-mode'
import HTMLMode from './modes/view.HTML-mode'


class View extends helper.mix(DropArea, modesController, helper.mix(ContentMode, BlocksMode, DragMode, PropsMode, HTMLMode)) {

    constructor (dispatcher, templates, holder, dragElements, layout) {
        super();

        this.dispatcher = dispatcher;
        this.templates = templates;

        this.iframeWrapper = '<div class="drop-area"></div>';
        this.constructorWrapper = '<div class="Web-constructor"></div>';
        this.$root = holder.appendChild(helper.createElement(this.constructorWrapper));
        this.$dragElements = dragElements;

        this.templates.__layout = layout;

        this.MODES = {
            content: 'content',
            blocks: 'blocks',
            props: 'props',
            drag:'drag',
            HTML:'HTML',
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

        this.transformIframe(
            this.templates.getTemplate('__layout')
        );

        // Insert modes controllers button
        this.$root.insertAdjacentHTML('afterbegin', this.getEditorCtrlsTemplate());

        return Promise.resolve()
    }

    /**
     * I insert content in to the iframe and do necessary wrapper around given layout content
     * @param layout
     */
    transformIframe(layout) {
        this.$iframe.contentWindow.document.open();
        this.$iframe.contentDocument.write(layout);
        this.$iframe.contentWindow.document.close();

        this.$iframe.contentDocument.head.innerHTML += this.templates.getTemplate('styles');

        this.$iframeContent = this.$iframe.contentWindow.document.body;

        // console.log(this.iframeWrapper, this.$iframe.contentWindow.document.body)
        // Wrap all body nodes into iframewrapper
        this.$iframeContent.appendChild(
            helper.wrap(this.iframeWrapper, this.$iframe.contentWindow.document.body)
        );


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
    
    reload (layout) {
        if (!layout) {
            throw 'Constructor: layout argument hasn\'t been given'
        }

        this.transformIframe(
            layout
        );

        this
            .attachDropArea()
            .attachEditorHandlers();

        this.parseEvents();

        this.dispatcher.mediator.pub('constructor:layout-reload')
    }

    /**
     *
     * @returns {Element}
     */
    getIframeHTML () {
        let cloned = this.$iframe.contentDocument.cloneNode(true);

        // Remove injected els
        Array.from(cloned.head.querySelectorAll('[data-type="injectable"]')).forEach(element => element.parentNode.removeChild(element));

        cloned.head.querySelectorAll('[data-type="injectable"]');

        return cloned.documentElement
    }
}

export default View



