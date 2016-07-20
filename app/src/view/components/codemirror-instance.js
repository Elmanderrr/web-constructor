import templates from './../../templates'

class CodeMirrorInstance {
    constructor (props) {
        this.props = props;
        this.escapeTimes = 4;

        this.init();
    }


    init () {
        if (typeof CodeMirror === 'undefined') throw 'CodeMirror plugin doesn\'t find';

        this.createHolder();
        this.initCodeMirror()
    }


    createHolder () {
        this.props.codemirror.holder.insertAdjacentHTML(
            'beforeend',
            templates.getTemplate('codeMirror')
        );

        this.holder = this.props.codemirror.holder.querySelector('.codemirror-holder')
    }


    initCodeMirror () {
        this.instance = CodeMirror(
            this.holder,
            this.props.codemirror.props
        )
        
        this.instance.on('beforeChange', function (editor, changed) {
            if (changed.origin === '+input') {
                changed.text[0] += 'fff';
                changed.update(changed.from, changed.to, changed.text, changed.origin)
            }
        })
    }

    /**
     * I set value in the coderMirror instance and refresh codeMirror;
     * @param element
     */
    setValue (element) {
        this.editedElement = element;
        this.instance.getDoc().setValue(this.htmlUnescape(element.innerHTML));
        

        setTimeout(() => this.instance.refresh(),100);


    }

    /**
     * Craziest shit ever, but it seem to only way for properly unescape string which was escaped twice (or more times)
     * @param str
     * @returns {XML|string}
     */
    htmlUnescape (str) {
        let escaped;

        for (let i = 0; i < this.escapeTimes; i++) {
            escaped = str
                .replace(/&quot;/g, '\'')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');
        }

        return escaped
    }


    applyEditing () {
        this.editedElement.innerHTML = this.getValue();
        this.hide()
    }

    getValue () {
        return this.htmlUnescape(this.instance.getValue())
    }


    show () {
        this.holder.classList.remove('hidden');

        if (typeof this.props.codemirror.onShow === 'function') {
            this.props.codemirror.onShow()
        }
    }


    hide () {
        this.holder.classList.add('hidden');

        if (typeof this.props.codemirror.onShow === 'function') {
            this.props.codemirror.onHide()
        }
    }

}

export default CodeMirrorInstance