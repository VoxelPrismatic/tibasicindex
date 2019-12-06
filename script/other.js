function btn(elem, id) {
    btns = find(".tab");
    for(el of btns)
        el.className = "tab";
    elem.className = "tab tabbed";
    pages = find(".page");
    for(el of pages)
        el.style.display = "none";
    find(id).style.display = "block";
}
function highlight(phrase) {
    find("page").innerHTML = find("page").innerHTML.replace(RegExp(sec, "gm"), `<div class="find">${sec}</div>`);
    url("&"+phrase);
}
function url(thing) {
    href = find("url").innerHTML
    var page = "";
    var jump = "";
    var find = "";
    try {
        page = href.split("?")[1].split("#")[0].split("&")[0].split(" ")[0];
    } catch(err) {
    } try {
        jump = href.split("#")[1].split("?")[0].split("&")[0].split(" ")[0];
    } catch(err) {
    } try {
        find = href.split("&")[1].split("?")[0].split("#")[0].split(" ")[0];
    } catch(err) {
    }
    if(thing.startsWith("&"))
        find = thing;
    if(thing.startsWith("?"))
        page = thing;
    if(thing.startsWith("#"))
        jump = thing;
    href = `https://VoxelPrismatic.github.io/prizmatic.docs/?${page}#${jump}`
    if(find != "")
        href += "&"+find;
    find("url").innerHTML = `[ ${href} ]`;
}
