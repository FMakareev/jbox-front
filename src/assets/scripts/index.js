import SlimSelect from 'slim-select';
import SimpleBar from 'simplebar';
import StickyJS from 'sticky-js';

const jquery = require('./jquery-3.2.1.min');
window.$ = window.jQuery = jquery; // notice the definition of global variables here


const magnify = require('./jquery.magnify');
const ZoomInit = () => {
    try {
        const thumb = $('#js-zoomple-schema');
        if(!thumb){
            return null;
        }
        console.log(thumb.attr('data-magnify-src'));

        $('#js-zoomple-schema').magnify({
            speed: 200,
            src: thumb.attr('data-magnify-src'),
        });

    } catch (e) {
        console.log(e);
    }

};


$(document).ready(function () {


    ZoomInit();


    const sticky = new StickyJS('.js-sticky');

    class SelectWithCustomScrollBar {
        selectId = null; // id оригинального элемента select
        slimSelect = null; //
        simpleBar = null;
        simpleBarContainer = null;
        originalSelect = null;

        selectValue = null;

        constructor({selectId}) {
            this.selectId = selectId;
            this.originalSelect = this.getSelectContainer(this.selectId);

            this.slimSelect = this.createSelect();
        }

        createSelect = () => {
            if (!this.originalSelect) {
                return
            }
            const instance = new SlimSelect({
                select: this.originalSelect,
                placeholder: true,
                showSearch: false,
                onChange: (info) => {
                    this.selectValue = info.value;
                },
                afterClose: () => {
                    if (this.slimSelect !== null) {
                        this.slimSelect.destroy();
                        this.slimSelect = this.createSelect()
                    }
                },
            });
            if (this.selectValue !== null) {
                this.slimSelect.set(this.selectValue);
            }
            this.createSimpleBar();
            return instance;
        };

        createSimpleBar = () => {
            this.simpleBarContainer = this.getSimpleBarList();
            this.simpleBar = new SimpleBar(this.simpleBarContainer, {
                autoHide: false,
                scrollbarMinSize: 80,
                scrollbarMaxSize: 80,
            });
        };

        getSelectContainer = () => {
            return document.querySelector(`#${this.selectId} .js-select`)
        };

        getSimpleBarList = () => {
            return document.querySelector(`#${this.selectId} .ss-list`)
        }
    }

    new SelectWithCustomScrollBar({
        selectId: 'js_yearOfManufacture'
    });
    new SelectWithCustomScrollBar({
        selectId: 'js_selectModels'
    });
    new SelectWithCustomScrollBar({
        selectId: 'js_model'
    });

    new SimpleBar(document.getElementById('js_parts-models_list'), {
        autoHide: false,
        scrollbarMinSize: 80,
        scrollbarMaxSize: 80,
    });

})



