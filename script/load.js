function load(fil) {
    find("sect").innerHTML = `<div class="lnk" id="SECT_top" onclick="jump(this);">#top</div>`;
    find("page").innerHTML = "WAIT... [LOADING FILE]";
    find(fil).className = "alnk";
    console.log("Reading file" + fil);
    txt = read(fil);
    console.log("RegEx Bits");
    chars = [
        [/\\\\n/gm, ""],
        [/\&/gm, "&amp;"],
        [/\>/gm, "&gt;"],
        [/\</gm, "&lt;"],
        [/\\U([A-Fa-f0-9]{16})/gm, "\\u{$1}"],
        [/ /gm, "\u200b \u200b"],
    ];
    for(var ls of chars)
        txt = txt.replace(ls[0], ls[1]);
    var md = "<div id='top'></div>";
    console.log("RegEx Styles");
    for(var line of txt.split("\n")) {
        console.log(line);
        if(line.startsWith("SECT_")) {
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
