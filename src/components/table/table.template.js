const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120

function getWidth(state, index) {
    if (state === undefined) {
        return DEFAULT_WIDTH + 'px'
    }
    return state[index] + 'px'
}

function toCell(state, row) {
    return function(_, col) {
        const width = getWidth(state.colState, col)
        return `
            <div
                class="cell" 
                contenteditable 
                data-col="${col}"
                data-id="${row}:${col}"
                data-type="cell"
                style="width: ${width}"
            ></div>
        `
    }
}

function toCol({col, index, width}) {
    return `
        <div 
            class="column" 
            data-type="resizable" 
            data-col="${index}" 
            style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, iterator) {
    const resize = iterator ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${iterator ? iterator : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 20, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1,
          rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toCol)
        .join('')

    rows.push(createRow(cols))
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(cells, row+1))
    }

    return rows.join('')
}