function read(filename) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            find("file").innerHTML = f.responseText;
    }
    f.open("GET", filename, false);
    f.send();
    return find("file").innerHTML.replace(/ /gm, "\u200b \u200b");
}
