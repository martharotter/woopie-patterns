function replaceContentOld(target, source) {

    document.getElementById(target).innerHTML = document.getElementById(source).innerHTML;
}

// Replace the mainContentDiv with the template file contents of the selected component
function replaceContent(source) {
    var parent = document.getElementById('mainContentDiv');
    var content = document.getElementById(source).import;
    var template = content.getElementById(source);
    parent.removeChild(parent.firstElementChild);
    parent.appendChild(template.cloneNode(true));

    // refire codeMirror:
    var txtArea = document.getElementById("pattern");
    var myCodeMirror = CodeMirror.fromTextArea(txtArea, {
        "mode": "text/html",
        "readOnly": true,
        "theme": "default",
        "autoClearEmptyLines": true,
        "lineWrapping": true,
        "lineNumbers": true
    });
    CodeMirror.commands["selectAll"](myCodeMirror);
}

// Handle Loaded Templates.
function templatesLoaded(event) {
    console.log('Templates loaded.');
}

// Handle Errors.
function templatesFailed(event) {
    console.log('Templates could not be loaded.');
}