function load(fil) {
    find("sect").innerHTML = `<div class="head textC" style="width: 100%;">[JUMP]</div>`
    find("sect").innerHTML += `<div class="lnk" id="JUMP_top" onclick="jump(this);">#top</div>`;
    find("page").innerHTML = "WAIT... [LOADING FILE]";
    find(fil).className = "alnk";
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
    if(url.includes("?")) {
        var thing = url.split("?")[1].split("#")[0];
        if(thing.startsWith("./doc"))
            thing = thing.slice(5);
        if(thing.startsWith("/"))
            thing = thing.slice(1);
        if(thing.endsWith(".txt")) {
            thing = thing.slice(0, -3);
            thing = thing.replace(/\./g, "/");
            thing += ".txt";
        } else {
            thing = thing.replace(/\./g, "/");
            thing += ".txt";
        }
        var fil = "/prizmatic.docs/doc/"+thing;
    } else {
        var fil = "/prizmatic.docs/doc/index.txt";
    } if (!(dirs.includes(fil))) {
        fil += "index.txt";
    } if (!(dirs.includes(fil))) {
        find("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
        find("page").innerHTML = "This search works by finding all documents upon the page loading, " +
                                 "then checks to see if the requested filename is in the directory list. " +
                                 "If you think this file should exist, try refreshing the page."
    } else {
        docs(fil);
    }
    if(url.includes("#")) {
        url = url.replace("##", "#")
        var sec = url.split("#")[1].split("?")[0];
        if(!(sec.startsWith("JUMP_"))) {
            sec = "JUMP_"+sec;
        }
        jump(sec);
    } else {
        jump("JUMP_top");
    }
}
