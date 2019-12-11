function load(fil) {
    var jumps = find("sect").children
    for(var jmp of jumps)
        if(jmp.id.startsWith("JUMP_"))
            jmp.remove();
    find("page").innerHTML = "WAIT... [LOADING FILE]";
    find(fil).className = "lnk sel";
    var txt = read(fil);
    if(!(txt.startsWith("--top--\n")))
       txt = "--top--\n"+txt;
    find("cached-pages").innerHTML += mkElm("div", txt, {id: "RAW_"+fil, class: "invis"});
    var mark = mark_page(txt).slice(21);
    find("page").innerHTML = "<span>"+mark+"</span>";
    mark = findHtml("page");
    mark = mark.replace(/<span><\/span>/gm, "");
    mark = mark.replace(/<br><br>/gm, "<br>");
    find("page").innerHTML = mark;
    // Section
    for(var line of txt.split("\n")) {
        if(line.search(/^--[\w\d_.-]+--$/gm) == 0) {
            sid = line.slice(2, -2);
            find("sect").innerHTML += mkElm("div", "#"+sid, {class: "lnk", id: "JUMP_"+sid, onclick: "jump(this)"});
        }
    }
    check_for_dupes();
    find("loaded-pages").innerHTML += mkElm("div", findHtml("page"), {id: "DOCS_"+fil, class: "invis"});
    find("loaded-sects").innerHTML += mkElm("div", findHtml("sect"), {id: "SECT_"+fil, class: "invis"});
    find("this-here").innerHTML = fil;
    searching();
}

function maybeload(uri) {
    if (!(uri.startsWith("/prizmatic.docs/doc/")));
          uri = "/prizmatic.docs/doc/" + uri
    var url = uri.replace(/\/\//gm, "/").split("#")[0].split("&")[0];
    if(!(url.endsWith(".txt")))
       url += "index.txt";
    if (!(dirs.includes(url)))
        find("page").innerHTML = mkElm("div", "404 ] File not found", {class: "warn"});
    else
        try {
            docs(url);
        } catch(err) {
            console.log(err);
            console.log(url);
            try {
                load(url);
                docs(url);
            } catch(err) {
                find("page").innerHTML = mkElm("div", "An unknown error occured, check console for details", {class: "warn"});
                console.log(err);
            }
        }
    url = uri;
    if(url.includes("#")) {
        var sec = url.split("#")[1].split("?")[0].split("&")[0];
        if(!(sec.startsWith("JUMP_")))
            sec = "JUMP_"+sec;
        jump(sec);
    } else
        jump("JUMP_top");
    if(url.includes("&")) {
        var sec = url.split("#")[1].split("?")[0].split("&")[0];
        find("page").innerHTML = findHtml("page").replace(RegExp(sec, "gm"), `<div class="find">${sec}</div>`);
    }
}

function btnload(url) {
    var here = findHtml("this-here");
    if(url.startsWith("./")) {
        maybeload(here.split("/").slice(0, -1).join("/") + url.replace(/\.\//gm, ""));
    } else if (url.startsWith("../")) {
        while(url.startsWith("../")) {
            url = url.slice(3);
            here = here.split("/").slice(0, -1).join("/");
        }
        maybeload(here + url.replace(/\.\//gm, ""));
    }
    maybeload(url);
}
