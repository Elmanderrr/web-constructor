import Dispatcher from './Dispatcher'
import View from './view/View'

import templates from './templates'
import mediator from './../mixins/mediator'

class Constructor {
    constructor (params = {}) {

        if (!params.holder || !params.layout) {
            throw `Constructor: holder and layout must be defined while creating the new Constructor`
        }

        this.mediator = mediator;
        this.dispatcher = new Dispatcher(this.mediator);
        this.view = new View(this.dispatcher, templates, params.holder, params.dragElements, params.layout);

        this._init();

    }

    _init () {

        this.view.init()

    }

    /**
     *
     * @param event
     * @param callback
     * @returns {*|{unsub}}
     */
    on (event, callback) {
        return this.mediator.sub(event, callback);
    }

    /**
     *
     * @param nodes
     */
    addDraggableItems (nodes=[]) {
        this.view.attachDragElements(nodes);
    }

    appendHTML () {
        this.view.insertHTML.apply(this.view, arguments);
    }

    activateMode () {
        this.view.setActiveMode.apply(this.view, arguments);
    }

    /**
     *
     * @param layout
     */
    reloadLayout (layout) {
        this.view.reload(layout)
    }

    /**
     *
     * @returns {Node}
     */
    getHTML () {
        return this.view.getIframeHTML()
    }

    /**
     *
     * @returns {*}
     */
    getCodeMirrorHTML () {
        return this.view.getCodeMirrorContent();
    }

    /**
     *
     * @param modes
     */
    disableModes (modes) {
        this.view.disableModes(modes)
    }

    /**
     *
     * @param modes
     */
    enableModes (modes) {
        this.view.enableModes(modes)
    }

    /**
     *
     * @returns {*}
     */
    getCurrentMode () {
        return this.view.getActiveMode()
    }

}

export default Constructor