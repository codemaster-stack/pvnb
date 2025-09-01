// On skip content link click, change tabindex to content area
(() => {
    const skipToContent = document.querySelector('.skip-to-content')
    const contentAnchor = document.querySelector('#content-anchor')
    const onBlur = () => {
        contentAnchor.removeAttribute('tabindex')
        skipToContent.removeEventListener('blur focusout', onBlur)
    }
    const onClick = () => {
        contentAnchor.setAttribute('tabindex', -1)
        contentAnchor.addEventListener('blur focusout', onBlur)
        contentAnchor.focus()
    }

    skipToContent.addEventListener('click', onClick)
})()