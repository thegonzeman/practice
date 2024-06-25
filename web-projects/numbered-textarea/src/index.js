window.onload = () => {
    for (const el of document.getElementsByClassName("numberedTextarea")) {
        initializeNumberedTextarea(el)
    }
}


/**
 * Sets up the functionality of a NumberedTextarea
 * @param {HTMLDivElement} el A div element of class 'numberedTextarea'.
 */
function initializeNumberedTextarea(el) {
    // TODO: don't trust the user like this. Have checks in place.
    // TODO: redo this. account for multi-line single-lines.
    // TODO: focus on peformance



    const [lineNumbersEl, textareaEl] = el.children
    let numLines = 1

    el.addEventListener('input', (e) => {
        const lengthDescription = getLengthDescription(textareaEl.value)
        const newNumLines = lengthDescription.length
        if (numLines === newNumLines) return
        numLines = newNumLines
        let HTML = ""
        for (i = 1; i <= numLines; i++) {
            HTML += `<p>${i}</p>`
        }
        lineNumbersEl.innerHTML = HTML;
        textareaEl.style.height = textareaEl.style.lineHeight
    })
}

/**
 * Generates an array describing the length of each line in a string. For example, the length description of
 * "one\ntwo\n\nthree" is represented by the array [3, 3, 0, 5].
 * @param {String} str
 * @return {Number[]}
 */
function getLengthDescription(str) {
    const lengthDescription = []
    let lineLength = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== '\n') {
            lineLength++
            continue
        }
        lengthDescription.push(lineLength)
        lineLength = 0
    }
    lengthDescription.push(lineLength)
    return lengthDescription
}

