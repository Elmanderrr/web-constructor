const helpers = {
    root:document.body,

    /**
     *
     * @param selector
     * @param parent
     * @returns {Element}
     */
    qs (selector, parent = this.root) {
        return parent.querySelector(selector)
    },

    /**
     *
     * @param selectors
     * @param parent
     * @returns {NodeList}
     */
    qsa (selectors, parent = this.root) {
        return parent.querySelectorAll(selectors)
    },

    /**
     *
     * @param htmlString
     * @param src
     */
    wrap (htmlString, src) {
        src = src.length ? src : [src];
        let wrapper = this.createElement(htmlString);

        Array.from(src).forEach(child => wrapper.appendChild(child));

        return wrapper
    },

    /**
     *
     * @param element
     * @returns {*}
     */
    findDeepest (element) {
        while(element.children.length > 0) {
            element = element.children[0]
        }

        return element
    },

    /**
     *
     * @param extended
     * @param src
     * @returns {{}}
     */
    extend (extended = {}, src) {
        for (let prop in src) {
            if (src.hasOwnProperty(prop)) {
                extended[prop] = src[prop]
            }
        }

        return extended
    },

    /**
     * Create Node element from given str;
     * @param str
     * @returns {HTMLElement}
     */
    createElement (str) {
        let holder = document.createElement('div');
        holder.innerHTML = str;

        if (holder.children.length > 1) {
            let temp = document.createElement('div');
            temp.appendChild(holder.children[0].cloneNode());

            console.info(`
                String must contain only the 1 wrapper, ${holder.children.length} given. ${temp.innerHTML} will be returned
            `)
        }

        return holder.children[0]
    },

    /**
     * I return crossbrowser matches function
     * @returns {*}
     */
    get matches () {

        return (document.body.matchesSelector || document.body.webkitMatchesSelector
        || document.body.mozMatchesSelector || document.body.msMatchesSelector
        || document.body.webkitMatchesSelector || document.body.matchesSelector);

    },

    /**
     *
     * @param el
     * @param selector
     * @returns {null}
     */
    findParent (el, selector) {
        while(el.parentNode && !this.matches.call(el, selector)) {
            el = el.parentNode
        }

        return el.nodeType === 9 ? null : el

    },


    /**
     *
     * @param mixins
     * @returns {Mix}
     */
    mix(...mixins) {
        class Mix {}

        // Programmatically add all the methods and accessors
        // of the mixins to class Mix.
        for ( let mixin of mixins ) {
            this.copyProperties(Mix, mixin);
            this.copyProperties(Mix.prototype, mixin.prototype);
        }

        return Mix;
    },

    /**
     *
     * @param target
     * @param source
     */
    copyProperties(target, source) {
        for ( let key of Reflect.ownKeys(source) ) {
            if ( key !== "constructor" && key !== "prototype" && key !== "name" ) {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }

};

export default helpers