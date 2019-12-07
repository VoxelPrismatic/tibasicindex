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
    uri("&"+phrase);
}
function uri(thing) {
    var href = find("url").innerHTML
    while(href.startsWith(" "))
        href = href.slice(1);
    href = href.slice(2, -2);
    console.log(href);
    var page = "";
    var jump = "";
    var look = "";
    try {
        page = href.split("?")[1].split("#")[0];
    } catch(err) {
        console.log(err);
    } try {
        jump = href.split("#")[1].split("&")[0];
    } catch(err) {
        console.log(err);
    } try {
        look = href.split("&")[1];
    } catch(err) {
        console.log(err);
    }
    if(thing.startsWith("&"))
        look = thing;
    if(thing.startsWith("?"))
        page = thing;
    if(thing.startsWith("#"))
        jump = thing;
    if(page != "" && page != undefined && !(page.startsWith("?")))
        page = "?" + page;
    if(jump != "" && jump != undefined && !(jump.startsWith("#")))
        jump = "#" + jump;
    if(look != "" && look != undefined && !(look.startsWith("&")))
        look = "&" + look;
    href = `https://VoxelPrismatic.github.io/prizmatic.docs/${page}${jump}`
    if(look != "" && look != undefined)
        href += "&"+look;
    find("url").innerHTML = `[ <a href="${href}">${href}</a> ]`;
}
