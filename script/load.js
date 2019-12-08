function load(fil) {
    var jumps = find("sect").children
    for(var jump of jumps)
        if(jump.id.startsWith("JUMP_"))
            delete jump;
    find("page").innerHTML = "WAIT... [LOADING FILE]";
    find(fil).className = "lnk sel";
    txt = read(fil);
    find("cached-pages").innerHTML += `<div id="RAW_${fil}" class="invis">${txt}</div>`;
    find("page").innerHTML = mark_page(txt);
    find("loaded-pages").innerHTML += `<div id="DOCS_${fil}" class="invis">${find("page").innerHTML}</div>`;
    find("loaded-sects").innerHTML += `<div id="SECT_${fil}" class="invis">${find("sect").innerHTML}</div>`;
    find("this-here").innerHTML = fil;
    searching();
}

function maybeload(url) {
    if (!(url.startsWith("/prizmatic.docs/doc/")));
          url = "/prizmatic.docs/doc/" + url
    url = url.replace(/\/\//gm, "/");
    if(!(url.endsWith(".txt")))
       url += "index.txt";
    console.log(url);
    if (!(dirs.includes(url)))
        find("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
    else
        try {
            docs(url);
        } catch(err) {
            find("page").innerHTML = `<div class="warn">404 ] An unknown error occured, check console for details</div>`;
            console.log(err);
        }
    if(url.includes("#")) {
        var sec = url.split("#")[1].split("?")[0].split("&")[0];
        if(!(sec.startsWith("JUMP_")))
            sec = "JUMP_"+sec;
        jump(sec);
    } else
        jump("JUMP_top");
    if(url.includes("&")) {
        var sec = url.split("#")[1].split("?")[0].split("&")[0];
        find("page").innerHTML = find("page").innerHTML.replace(RegExp(sec, "gm"), `<div class="find">${sec}</div>`);
    }
}
