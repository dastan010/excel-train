import {capitilize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for this DOM`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = createEvent(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(
                 `Method ${method} is not implemented in ${name} Component`
                )
            }
            // It is exactly like eventListener
            this.$root.on(listener, this[method].bind(this))
        })
    }

    removeDOMListeners() {
        console.log('Remove: ', this.listeners)
    }
}

function createEvent(string) {
    return 'on' + capitilize(string)
}