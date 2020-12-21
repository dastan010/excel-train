import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {defaultTitle} from '@/constants'
import {changeTitle} from '@/redux/actions.js'
import {debounce} from '../../core/utils'

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `
    }

    onInput(event) {
        console.log('onInput');
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}