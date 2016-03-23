import helper from './../mixins/helpers'


class Dispatcher {
    constructor (mediator) {
        this.mediator = mediator;

        this._events = [];
    }

    /**
     *
     * @param elements
     * @param h
     */
    attachMultiEvents (elements, h) {

        Array.from(elements).forEach(element => {
            let copy = Object.assign({}, h);
            element.addEventListener(h.event, h.handler, false);

            this._events.push(
                Object.assign(copy, {selector:element, ownerDocument:element.ownerDocument})
            )
        })

    }

    /**
     *
     * @param h
     */
    attachTargetEvents (h) {
        let element = h.selector.nodeType === 1 ? h.selector : helper.qs(h.selector);

        element.addEventListener(h.event, h.handler, false);

        this._events.push(
            Object.assign(h, {selector:element, ownerDocument:element.ownerDocument})
        );

    }

    /**
     *
     * @returns {Dispatcher}
     */
    attachEvents (events, elements) {
        events.forEach(
            h => elements ? this.attachMultiEvents(elements, h) : this.attachTargetEvents(h)
        );

        return this
    }

    /**
     * @param events (Array)
     */
    detachEventsByName (events) {
        events.forEach(this.detach.bind(this))
    }

    /**
     * I detaching event
     * @param event
     */
    detach (event) {

        this._events = this._events.filter(e => {
            let isEvent = e.event === event;

            if (isEvent) {
                e.selector.removeEventListener(e.event, e.handler, false)
            }

            return !isEvent
        });


    }

    /**
     * I trying to guess if saved element is exist. Remove eventListener if not;
     */
    detachInactive () {
        this._events = this._events.filter( (e) => {
            // Check if element exist in their owner document;
            let isExist = e.ownerDocument.contains(e.selector);

            if (!isExist) {
                e.selector.removeEventListener(e.event, e.handler, false);
            }

            return isExist
        });


    }

    /**
     * I parse declared events (example:<button class="btn btn-default" data-event="click:removeElement">remove</button>)
     * And attach handler (example:removeElement) for current scope (this)
     * I trying to detach inactive events firstly, for preventing duplicates;
     * @param scope
     * @param nodes
     */
    parseDeclaredEvents (scope, nodes) {
        this.detachInactive();

        Array.from(nodes).forEach(element => {
            let split = element.getAttribute('data-event').split(':');
            let event = split[0];
            let handler = typeof scope[split[1]] === 'function' ? scope[split[1]].bind(scope) : null;

            if (!handler) {
                return console.error(
                    `Handler ${split[1]} must be the function, ${handler} given`
                )
            }

            this.attachEvents([{ event, handler, selector:element }])
        })
    }

}

export default Dispatcher
