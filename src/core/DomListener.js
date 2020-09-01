import {capitilize} from '@core/utils'

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
            this[method] = this[method].bind(this)
            // It is exactly like eventListener
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = createEvent(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function createEvent(string) {
    return 'on' + capitilize(string)
}