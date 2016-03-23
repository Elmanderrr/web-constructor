import codeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import templates from './../../templates'

class CodeMirrorInstance {
    constructor (props) {
        this.props = props;

        this.init();
    }


    init () {
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
        this.instance = codeMirror(
            this.holder,
            this.props.codemirror.props
        )
    }

    /**
     * I set value in the coderMirror instance and refresh codeMirror;
     * @param element
     */
    setValue (element) {
        this.editedElement = element;
        this.instance.getDoc().setValue(element.innerHTML);

        setTimeout(() => this.instance.refresh(),10)
    }


    applyEditing () {
        this.editedElement.innerHTML = this.instance.getValue();
        this.hide()
    }


    show () {
        this.holder.classList.remove('hidden')
    }


    hide () {
        this.holder.classList.add('hidden')
    }

}

export default CodeMirrorInstance