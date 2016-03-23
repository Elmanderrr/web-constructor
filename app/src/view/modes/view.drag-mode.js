import helper from './../../../mixins/helpers'

class DragMode {

    /**
     *
     * @returns {*[]} Events
     */
    getDragElsEvents () {
        return [
            {
                event : 'dragstart',
                handler : this.onDragElDragStart.bind(this)
            },
            {
                event : 'dragend',
                handler : this.onDragElDragEnd.bind(this)
            }
        ]
    }

    /**
     * Attaching drag events through dispatcher
     */
    attachDragElements (nodeList = [], events = this.getDragElsEvents()) {
        this.dispatcher.attachEvents(
            events,
            nodeList
        );

        return this
    }

    /**
     * About dataTransfer set:
     *      Hack for firefox that able us to drag items
     *      info: http://mereskin.github.io/dnd/
     * Do nothing if constructor isn't in drag mode
     * @param e
     */
    onDragElDragStart (e) {
        if (this.mode !== 'drag') {
            return e.preventDefault();
        }

        e.dataTransfer.setData('text', 'undefined');

        e.target.classList.add('dragging');
        this.dragSrcElement = e.target;

        this.dispatcher.mediator.pub(`block:${e.type}`, {src: e.target})
    }

    /**
     *
     * @param e
     */
    onDragElDragEnd (e) {
        this.dragSrcElement = null;
        e.target.classList.remove('dragging');

        this.dispatcher.mediator.pub(`block:${e.type}`, {src: e.target})
    }

}

export default DragMode
