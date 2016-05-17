import helper from './../../../mixins/helpers/dist/helper.js'
import codeMirrorInstance from './../components/codemirror-instance'

class HTMLMode {
    initHTMLMode () {
        
        if (!this.codeMirrorInstance) {
            this.codeMirrorInstance = new codeMirrorInstance({
                codemirror:{
                    holder:this.$root,
                    parent:this,
                    props: {
                        mode:'htmlmixed',
                        lineNumbers:true,
                        theme:'base16-dark'
                    },
                    onShow () {
                        this.parent.codeMirrorInstance.editButton.classList.add('hidden')
                    },

                    onHide () {
                        this.parent.codeMirrorInstance.editButton.classList.remove('hidden')
                    }
                }
            });

            this.transformCodeMirror();
            this.parseEvents();
        }


        this.codeMirrorInstance.setValue(this.$iframeContent);
        this.codeMirrorInstance.show();

    }

    transformCodeMirror () {
        this.codeMirrorInstance.editButton = helper.createElement(this.templates.getTemplate('HTMLMode'));

        this.$root.appendChild( this.codeMirrorInstance.editButton )
    }

    showCodeMirror () {
        this.codeMirrorInstance.show()
    }

}

export default HTMLMode
