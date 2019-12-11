function read(filename) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            find("file").innerHTML = f.responseText.replace(/  /gm, "\u200b \u200b \u200b");
    }
    f.open("GET", filename, false);
    f.send();
    delete f;
    return findHtml("file");
}

function readAsync(filename) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            find("file").innerHTML = f.responseText.replace(/  /gm, "\u200b \u200b \u200b");
    }
    f.open("GET", filename, true);
    f.send();
    delete f;
    return new Promise(resolve => {setTimeout(() => {resolve(findHtml("file"));}, 500)});
}
