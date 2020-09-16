import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }
    toHTML() {
        return createTable(40)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target),
                  $parent = $resizer.closest('[data-type="resizable"]'),
                  coords = $parent.getCoords(),
                  cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
            $resizer.css({
                opacity: 1
            })

            document.onmousemove = e => {
                if ($resizer.data.resize === 'col') {
                    const delta = Math.floor(e.pageX - coords.right),
                          value = coords.width + delta
                    $parent.css({width: value + 'px'})
                    cells.forEach(el => el.style.width = value + 'px')
                } else {
                    const delta = Math.floor(e.pageY - coords.bottom),
                          value = coords.height + delta
                    $parent.css({height: value + 'px'})
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null
                $resizer.css({
                    opacity: 0
                })
            }
        }
    }
}
