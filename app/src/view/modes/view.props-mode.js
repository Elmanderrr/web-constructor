import PropertiesEditor from '../modes-controller/properties-editor'
import templates from './../../templates';

import helper from './../../../mixins/helpers'

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
                this.showPropertiesEditor(element)
                break;
            case 'IMG':
                this.showPropertiesEditor(element)
                break;
            case 'A':
                this.showPropertiesEditor(element)
                break;
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