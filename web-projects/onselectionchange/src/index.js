window.onload = () => {
    const textareaEl = document.getElementById("textarea-el")
    const selectionStartEl = document.getElementById("selectionStart-el")
    const selectionEndEl = document.getElementById("selectionEnd-el")
    const inferenceEl = document.getElementById("inference-el")
    attachSelectionChangeDispatcher(textareaEl)

    textareaEl.addEventListener('selectionchange', (e) => {
        selectionStartEl.innerHTML = textareaEl.selectionStart
        selectionEndEl.innerText = textareaEl.selectionEnd
    })
}

