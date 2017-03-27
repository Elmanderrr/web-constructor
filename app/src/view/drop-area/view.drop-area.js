import helper from './../../../mixins/helpers/dist/helper.js'

class DropArea {

    /**
     *
     * @returns {*[]} Events
     */
    getDropAreaEvents () {
        return [
            {
                event : 'drop',
                handler : this.onDropAreaDrop.bind(this)
            },
            {
                event : 'dragover',
                handler : this.onDropAreaDragOver.bind(this)
            },
            {
                event : 'dragenter',
                handler : this.onDropAreaDragEnter.bind(this)
            },
            {
                event : 'dragleave',
                handler : this.onDropAreaDragLeave.bind(this)
            },
            {
                event : 'dragend',
                handler : this.onDropAreaDragEnd.bind(this)
            }
        ]
    }

    /**
     * I compare attributes of droppable item and dropping area and decide if item can be dropped
     * @param droppingArea
     * @returns {boolean}
     */
    canBeDropped (droppingArea) {
        let droppable;

        if (!helper.matches.call(this.dragSrcElement,'[interactive-element]')) {
            droppable = helper.findParent(this.dragSrcElement, '[interactive-element]');
        }
        
        return (droppable || this.dragSrcElement).getAttribute('data-dest') === droppingArea.getAttribute('role')
    }

    /**
     * Attaching drag events through dispatcher
     */
    attachDropArea () {
        this.dispatcher.attachEvents(
            this.getDropAreaEvents(),
            this.$iframeContent.querySelectorAll('[drop-container]')
        );

        return this
    }

    /**
     *
     * @param e
     */
    onDropAreaDragEnd (e) {
        if (!this.dragSrcElement) return;

        this.dragSrcElement = null;
        this.mediator.pub(e.type, {src: e.target})
    }

    /**
     *
     * @param e
     */
    onDropAreaDragEnter (e) {
        if (!this.dragSrcElement || e.target == this.dragSrcElement || !this.canBeDropped(e.target)) return;

        e.target.classList.add('drag-enter');

        Array.from(e.target.querySelectorAll('*')).forEach(child => child.style.pointerEvents = 'none');

        this.dispatcher.mediator.pub('drop-area:drag-enter', {src: e.target})

    }

    /**
     *
     * @param e
     */
    onDropAreaDragLeave (e) {
        if (!this.dragSrcElement) return;

        e.target.classList.remove('drag-enter');

        this.dispatcher.mediator.pub('drop-area:drag-leave', {src: e.target})
    }


    /**
     * I run preventDefault function to be able to drop the items
     * @param e
     */
    onDropAreaDragOver (e) {
        e.preventDefault();
    }

    /**
     *
     * @param e
     */
    onDropAreaDrop (e) {
        e.preventDefault();

        // Trying to find parent with role if target element hasn't it
        if (!helper.matches.call(e.target, '[role]')) {
            var target = helper.findParent(e.target, '[role]');
        }

        if (!this.dragSrcElement ||  e.target == this.dragSrcElement || !this.canBeDropped(target || e.target)) return;

        Array.from(e.target.querySelectorAll('*')).forEach(child => child.style.pointerEvents = '');
        e.target.classList.remove('drag-enter');

        this.dispatcher.mediator.pub(`drop-area:${e.type}`, {
            src: this.dragSrcElement,
            dist: target || e.target
        });

    }

    /**
     * I create wrapper for HTML for better opportunity to manipulate further content
     * @param dist
     * @param html
     * @param props
     */
    insertHTML (dist, html, props) {
        let wrapper = helper.createElement('<div switchable></div>');
        wrapper.innerHTML = html;

        if (props) {
            Object.keys(props).forEach(key => {
                wrapper.setAttribute(`data-${key}`, props[key])
            })
        }
        
        dist.appendChild(wrapper);
    }

    insertHTMLToContainer (html, container) {
        const dist = this.$iframeContent.querySelector(`[role=${container}]`);

        if ( dist ) {
            this.insertHTML(dist, html)
        }

    }

}

export default DropArea
