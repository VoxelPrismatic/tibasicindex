function folder_back() {
    ls = find("back-page").children;
    if(ls.length != 0) {
        docs(ls.slice(-1)[0]);
        ls.slice(-1)[0].remove();
    }
}
