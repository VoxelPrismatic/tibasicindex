function load(fil) {
    find("sect").innerHTML = `<div class="head textC" style="width: 100%;">[JUMP]</div>`
    find("sect").innerHTML += `<div class="lnk" id="JUMP_top" onclick="jump(this);">#top</div>`;
    find("page").innerHTML = "WAIT... [LOADING FILE]";
    find(fil).className = "lnk sel";
    txt = read(fil);
    var md = "<div id='top'></div>";
    for(var line of txt.split("\n")) {
        if(line.startsWith("JUMP_")) {
            find("sect").innerHTML += `<div class="lnk" id="${line}" onclick="jump(this);">#${line.slice(5)}</div>`;
            continue;
        }
        line = mark(line);
        if(line.endsWith("<br>"))
            md += line;
        else if(line.endsWith("§"))
            md += line.slice(0, -1);
        else
            md += line+"\n";
    }
    find("page").innerHTML = md.replace(/\n/gm, "<br>");
}

function maybeload(url) {
    if (!(url.startsWith("/prizmatic.docs/doc/")));
          url = "/prizmatic.docs/doc/" + url
    url = url.replace(/\/\//gm, "/");
    if(!(url.endsWith(".txt")))
       url += "index.txt";
    if (!(dirs.includes(fil)))
        find("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
    else 
        docs(fil);
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
