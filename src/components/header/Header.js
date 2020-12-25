import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {defaultTitle} from '@/constants'
import {changeTitle} from '@/redux/actions.js'
import {debounce} from '../../core/utils'
import {ActiveRoute} from '../../core/routes/ActiveRoute'

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options    
        })
    }
    static className = 'excel__header'

    prepare() {
        this.onInput = debounce(this.onInput, 500)
    }
    toHTML() {
        const val = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="input" value="${val}">
            <div>
                <div class="button" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>
                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div>
        `
    }

    onInput(event) {
        console.log('onInput');
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'remove') {
            const decision = confirm('Are you sure nigga?')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')    
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}