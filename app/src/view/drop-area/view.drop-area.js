import helper from './../../../mixins/helpers'

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
        if (!this.dragSrcElement || e.target == this.dragSrcElement) return;

        e.target.classList.add('drag-enter');

    }

    /**
     *
     * @param e
     */
    onDropAreaDragLeave (e) {
        if (!this.dragSrcElement) return;

        e.target.classList.remove('drag-enter');
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

        if (!this.dragSrcElement ||  e.target == this.dragSrcElement) return;

        e.target.classList.remove('drag-enter');

        this.dispatcher.mediator.pub(`drop-area:${e.type}`, {
            src: this.dragSrcElement,
            dist: e.target
        });

    }

    /**
     * I create wrapper for HTML for better opportunity to manipulate further content
     * @param dist
     * @param html
     * @param props
     */
    insertHTML (dist, html, props) {
        let wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        wrapper.setAttribute('switchable','')

        if (props) {
            Object.keys(props).forEach(key => {
                wrapper.setAttribute(`data-${key}`, props[key])
            })
        }

        dist.appendChild(wrapper);
    }

}

export default DropArea
