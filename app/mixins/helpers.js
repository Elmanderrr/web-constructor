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
        let srcParent = src.parentNode;
        let wrapper = document.createElement('div');
        wrapper.innerHTML = htmlString;

        this.findDeepest(wrapper).appendChild(src);

        srcParent.insertAdjacentHTML('beforeend',wrapper.innerHTML)
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

    createElement (str) {
        let holder = document.createElement('div');
        holder.innerHTML = str;

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