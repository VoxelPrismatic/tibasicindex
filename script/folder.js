function folder(id) {
    ls = find(id).children;
    if(ls.length != 0) {
        docs(ls[ls.length-1]);
        ls[ls.length-1].remove();
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
    if(findHtml("this-here").lastIndexOf("/") != 0)
        btnload("../__init__.txt");
}

function folder_next() {
    find("prev-page").innerHTML += `<span>${findHtml("this-here")}</span>`;
    folder("next-page");
}

function folder_fwd() {
    find("back-page").innerHTML += `<span>${findHtml("this-here")}</span>`;
    folder("fwd-page");
}
