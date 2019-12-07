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
    var phrase2 = "";
    for(l of phrase.split('')) {
        var lc = l.toLowerCase().charCodeAt(0).toString(16);
        var uc = l.toUpperCase().charCodeAt(0).toString(16);
        while(lc.length < 4)
            lc = "0" + lc;
        while(uc.length < 4)
            uc = "0" + uc;
        phrase2 += `[\\u${lc}\\u${uc}]`; //Escape chars
    }
    phrase2 = "(" + phrase2 + ")"
    md(find("RAW_"+find("this-here").innerHTML).innerHTML.replace(RegExp(phrase2, "gm"), `<span class="find">$1</span>`));
    uri("&"+phrase);
    find("docs").click();
}
function uri(thing) {
    var href = find("url").innerHTML
    while(href.startsWith(" "))
        href = href.slice(1);
    href = href.replace(/.*>(.*)<.*/gm, "$1");
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
        href += look;
    find("url").innerHTML = `[ <a href="${href}">${href}</a> ]`;
}

function searching() {
    if(find("swapper").value != "") {
        maybeload(find("swapper").value);
        find("swapper").value = "";
    }
    if(find("searcher").value != "") {
        highlight(find("searcher").value);
        find("searcher").value = "";
    }
    find("docs").click();
}

function filter_docs(thing) {
    var pages = find("nav").children;
    for(var page of pages) {
        if(page.id == undefined && page.id != "filter")
            continue;
        if(thing == "" || page.id.slice(20, -4).search(thing) != -1)
            page.style.display = "block";
        else
            page.style.display = "none";
    }
}
