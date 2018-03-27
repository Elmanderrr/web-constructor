import PropertiesEditor from '../components/properties-editor'
import templates from './../../templates';

import helper from './../../../mixins/helpers.js'

class EditorMode  {

    onPropsElementHover (element) {
        element.classList.add('on-hover');
    }

    onPropsElementClick () {
        this.delegateAction.apply(this, arguments)
    }

    delegateAction (element) {

        switch (element.tagName) {
            case 'DIV':
            case 'IMG':
            case 'A':
                this.showPropertiesEditor(element)
            default:
                break;
        }

    }

    showPropertiesEditor (element) {
        if (!this.propEditor) {
            this.propEditor = new PropertiesEditor()
        }

        //this.propEditor.show(element)
    }

}

export default EditorMode