function load(fil) {
    var jumps = find("sect").children
    for(var jump of jumps)
        if(jump.id.startsWith("JUMP_"))
            delete jump;
    find("page").innerHTML = "WAIT... [LOADING FILE]";
    find(fil).className = "lnk sel";
    txt = read(fil);
    find("cached-pages").innerHTML += `<div id="RAW_${fil}" class="invis">${txt}</div>`;
    find("page").innerHTML = "<div id='top'></div>" + mark_page(txt);
    // Section
    for(var line of txt.split("\n")) {
        if(line.search(/^--[\w\d_.-]+--$/gm) == 0) {
            sid = line.slice(2, -2);
            find("sect").innerHTML += `<div class="lnk" id="JUMP_${sid}" onclick="jump(this);">#${sid}</div>`;
        }
    }
    check_for_dupes();
    find("loaded-pages").innerHTML += `<div id="DOCS_${fil}" class="invis">${find("page").innerHTML}</div>`;
    find("loaded-sects").innerHTML += `<div id="SECT_${fil}" class="invis">${find("sect").innerHTML}</div>`;
    find("this-here").innerHTML = fil;
    searching();
}

function maybeload(uri) {
    if (!(uri.startsWith("/prizmatic.docs/doc/")));
          uri = "/prizmatic.docs/doc/" + uri
    var url = uri.replace(/\/\//gm, "/").split("#")[0].split("&")[0];
    if(!(url.endsWith(".txt")))
       url += "index.txt";
    console.log(url);
    if (!(dirs.includes(url)))
        find("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
    else
        try {
            docs(url);
        } catch(err) {
            find("page").innerHTML = `<div class="warn">An unknown error occured, check console for details</div>`;
            console.log(err);
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
        find("page").innerHTML = find("page").innerHTML.replace(RegExp(sec, "gm"), `<div class="find">${sec}</div>`);
    }
}
