
/**
 * Custom hook to handle editor formatting commands.
 */
export const useEditor = (editorRef) => {
    const handleFormat = (command, value = null) => {
        if (document.activeElement !== editorRef.current) {
            editorRef.current?.focus();
        }

        switch (command) {
            case 'p': document.execCommand('formatBlock', false, 'p'); break;
            case 'h1': document.execCommand('formatBlock', false, 'h1'); break;
            case 'h2': document.execCommand('formatBlock', false, 'h2'); break;
            case 'h3': document.execCommand('formatBlock', false, 'h3'); break;
            case 'quote': document.execCommand('formatBlock', false, 'blockquote'); break;
            case 'pre': document.execCommand('formatBlock', false, 'pre'); break;
            case 'bold': document.execCommand('bold'); break;
            case 'italic': document.execCommand('italic'); break;
            case 'strike': document.execCommand('strikeThrough'); break;
            case 'ul': document.execCommand('insertUnorderedList'); break;
            case 'ol': document.execCommand('insertOrderedList'); break;
            case 'code':
                const selection = window.getSelection();
                if (selection.rangeCount) {
                    const range = selection.getRangeAt(0);
                    const span = document.createElement('span');
                    span.style.fontFamily = 'monospace';
                    span.style.backgroundColor = '#262626';
                    span.style.padding = '2px 4px';
                    span.style.borderRadius = '4px';
                    span.style.color = '#ff7b72';
                    span.style.fontSize = '0.9em';
                    try { range.surroundContents(span); } catch (e) { document.execCommand('fontName', false, 'monospace'); }
                }
                break;
            case 'color': document.execCommand('foreColor', false, value); break;
            case 'link':
                const url = prompt('Enter URL:');
                if (url) document.execCommand('createLink', false, url);
                break;
            case 'image':
                const imgUrl = prompt('Enter Image URL:');
                if (imgUrl) document.execCommand('insertImage', false, imgUrl);
                break;
            case 'callout':
                const calloutHTML = `<div class="callout">💡 <span style="font-weight: 500;">New Callout</span></div><p></p>`;
                document.execCommand('insertHTML', false, calloutHTML);
                break;
            case 'toggle':
                const toggleHTML = `<details><summary>Toggle Header</summary><p style="margin-top: 0.5em; padding-left: 1em;">Hidden content</p></details><p></p>`;
                document.execCommand('insertHTML', false, toggleHTML);
                break;
            case 'hr': document.execCommand('insertHorizontalRule'); break;
            case 'indent': document.execCommand('indent'); break;
            case 'checkbox':
                document.execCommand('insertHTML', false, '<input type="checkbox" />&nbsp;');
                break;
            default: break;
        }
    };

    return { handleFormat };
};
