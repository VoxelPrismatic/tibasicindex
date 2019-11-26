function jump(elem) {
    id = elem.id.slice(5);
    find(id).scrollIntoView();
    var things = find("sect").children;
    for(var thing of things)
        thing.className = "lnk";
    elem.className = "alnk";
}
function docs(elem) {
    load(elem.id);
    var things = find("nav").children;
    for(var thing of things)
        thing.className = "lnk";
    elem.className = "alnk";
    jump("SECT_top");
}
