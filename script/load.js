function md(txt) {
    var md = "<div id='top'></div>";
    var py = "";
    var inpy = false;
    for(var line of txt.split("\n")) {
        if(line.search(/^--[\w\d_.-]+--$/gm) == 0) {
            sid = line.slice(2, -2);
            find("sect").innerHTML += `<div class="lnk" id="JUMP_${sid}" onclick="jump(this);">#${sid}</div>`;
        }
        if(line == "PY---") {
            inpy = true;
            continue;
        }
        else if(line == "---" && inpy) {
            md += py_mark(py).replace(/\n/gm, "<br>");
            py = "";
            inpy = false;
            continue;
        }
        else if(inpy) {
            py += line + "\n";
            continue;
        }
        line = mark(line);
        if(line.endsWith("<br>"))
            md += line;
        else if(line.endsWith("§"))
            md += line.slice(0, -1);
        else if(line.endsWith("</br>"))
            md += line.slice(0, -5);
        else
            md += line+"\n";
    }
    find("page").innerHTML = md.replace(/\n/gm, "<br>");
}

function load(fil) {
    find("sect").innerHTML = `<div class="head textC" style="width: 100%;">[JUMP]</div>`
    find("sect").innerHTML += `<div class="lnk" id="JUMP_top" onclick="jump(this);">#top</div>`;
    find("page").innerHTML = "WAIT... [LOADING FILE]";
    find(fil).className = "lnk sel";
    txt = read(fil);
    find("cached-pages").innerHTML += `<div id="RAW_${fil}" class="invis">${txt}</div>`;
    md(txt);
    find("loaded-pages").innerHTML += `<div id="DOCS_${fil}" class="invis">${find("page").innerHTML}</div>`;
    find("loaded-sects").innerHTML += `<div id="SECT_${fil}" class="invis">${find("sect").innerHTML}</div>`;
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
            find("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
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
