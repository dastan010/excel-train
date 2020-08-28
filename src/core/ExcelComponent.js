import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
    }
    // Returning components template
    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }
}