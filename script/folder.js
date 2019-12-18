function folder(id) {
    ls = find(id).children;
    if(ls.length != 0) {
        var elem = ls[ls.length-1];
        docs(elem.innerHTML);
        elem.remove();
    }
}

function folder_back() {
    find("fwd-page").innerHTML += `<span>${findHtml("this-here")}</span>`;
    folder("back-page");
}

function folder_prev() {
    find("next-page").innerHTML += `<span>${findHtml("this-here")}</span>`;
    folder("prev-page");
}

function folder_up() {
    if(findHtml("this-here").lastIndexOf("/") != 19)
        btnload("../__init__.txt");
}

function folder_next() {
    find("prev-page").innerHTML += `<span>${findHtml("this-here")}</span>`;
    folder("next-page");
}

function folder_fwd() {
    folder("fwd-page");
}
