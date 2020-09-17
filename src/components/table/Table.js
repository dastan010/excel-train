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
                  cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`),
                  type = $resizer.data.resize,
                  sideProp = type === 'col' ? 'bottom' : 'right'
            let value
            $resizer.css({
                opacity: 1,
                [sideProp]: '-5000px'
            })

            document.onmousemove = e => {
                if (type === 'col') {
                    const delta = Math.floor(e.pageX - coords.right)
                    value = coords.width + delta
                    $resizer.css({
                        right: -delta + 'px'
                    })
                } else {
                    const delta = Math.floor(e.pageY - coords.bottom)
                    value = coords.height + delta
                    $resizer.css({
                        bottom: -delta + 'px'
                    })
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
                const sideProp = type === 'col' ? 'width' : 'height'
                $parent.css({[sideProp]: value + 'px'})
                if (type === 'col') {
                    cells.forEach(el => el.style.width = value + 'px')
                }
                $resizer.css({
                    opacity: 0,
                    bottom: 0,
                    right: 0
                })
            }
        }
    }
}
