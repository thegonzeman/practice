/**
 * The name of a custom event that is triggered only when a selection change occurs.
 * @type {string}
 */
const selectionChangeEventName = "selectionchange"

/**
 * The current HTMLTextareaElement
 * @type {null}
 */
let currentEl = null

/**
 * Attaches "onselectionchange" dispatcher given element that is triggered by a selection change.
 *
 * @param {HTMLTextAreaElement | HTMLInputElement} el
 *
 * @decription
 * This function attaches a dispatcher to a <textarea> or <input> element. Whenever a selection change occurs, the
 * dispatcher triggers the event "onselectionchange". That is, the event is triggered whenever the caret changes
 * or the content highlighted by the cursor changes. The event has no additional details, it merely serves as a
 * messenger.
 *
 * @warning
 * At the time of writing, the default event "selectionchange" is an experimental feature only supported by Firefox.
 * The name conflict between this custom event and the default event hasn't been tested and may cause issues.
 *

 */
function attachSelectionChangeDispatcher(el) {
    function myHandler() {
        // Timeout necessary to queue handler after default handler.
        // If removed, selectionStart/selectionEnd might not have updated by the time the values are read.
        // That is, it might cause the read selectionStart/selectionEnd to be old values.
        setTimeout(() => {
            if (previousStart !== el.selectionStart || previousEnd !== el.selectionEnd) {
                previousStart = el.selectionStart
                previousEnd = el.selectionEnd
                el.dispatchEvent(new Event(selectionChangeEventName))
            }
        }, 0)
    }

    let previousStart = -1, previousEnd = -1
    el.addEventListener('keydown', myHandler)   // caret moves or highlight changes
    el.addEventListener('mousemove', myHandler) // caret moves or highlight changes
}
