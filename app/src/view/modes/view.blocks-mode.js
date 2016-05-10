import helper from './../../../mixins/helpers'

import codeMirrorInstance from './../components/codemirror-instance'

class SwitchMode {

    /**
     *
     * @param parent
     */
    onBlockElementHover (parent) {
        if (parent.classList.contains('on-hover')) return;

        parent.classList.add('on-hover');

        parent.insertAdjacentHTML('beforeend', this.templates.getTemplate('switchElement'));

        this.parseEvents(this.$iframeContent)
    }

    /**
     *
     * @param e
     */
    onBlockElementMouseLeave (e) {
        e.target.classList.remove('on-hover');

        if (helper.qs('.switch-controllers', e.target)) {
            e.target.removeChild(helper.qs('.switch-controllers', e.target));
        }

        this.dispatcher.detachInactive()

    }

    /**
     * I move element to the top or to the bottom, relatively to their position;
     * @param direction (String)
     * @param movable (Node)
     */
    moveElement (direction, movable) {
        const directions = {
            up:'previousElementSibling',
            down:'nextElementSibling'
        };

        let sibling = movable[ directions[direction] ];

        if (direction === 'up' && sibling) {
            movable.parentNode.insertBefore(movable, sibling)
        }

        if (direction === 'down' && sibling) {
            movable.parentNode.insertBefore(movable, sibling.nextElementSibling)
        }
    }

    /**
     *
     * @param e
     */
    moveElementUp (e) {
        let movable = helper.findParent(e.target, '[switchable]');
        this.moveElement('up', movable)
    }

    /**
     *
     * @param e
     */
    moveElementDown (e) {
        let movable = helper.findParent(e.target, '[switchable]');
        this.moveElement('down', movable)

    }

    /**
     *
     * @param e
     */
    removeElement (e) {
        let parent = helper.findParent(e.target, '[switchable]');

        parent.parentNode.removeChild(parent);

        this.dispatcher.mediator.pub('block:remove', {element:helper.findParent(e.target,'[drop-container]')})
    }

    /**
     *
     * @param e
     */
    editSourceElement (e) {
        let parent = helper.findParent(e.target,'[switchable]');

        // Remove controllers before initializing codeMirror instance;
        parent.removeChild(helper.qs('.switch-controllers',parent));
        parent.classList.remove('on-hover');

        if (!this.codeMirrorInstance) {
            this.codeMirrorInstance = new codeMirrorInstance({
                codemirror:{
                    holder:this.$root,
                    props: {
                        mode:'htmlmixed',
                        lineNumbers:true,
                        theme:'base16-dark'
                    }
                }
            });

            this.parseEvents();
        }

        this.codeMirrorInstance.setValue(parent);
        this.codeMirrorInstance.show();


    }


    applyCodeMirrorEdit () {
        this.codeMirrorInstance.applyEditing();

        this.dispatcher.mediator.pub('block:edited', {value:this.codeMirrorInstance.instance.getValue()})
    }

    cancelCodeMirrorEdit () {
        this.codeMirrorInstance.hide();
    }

}

export default SwitchMode