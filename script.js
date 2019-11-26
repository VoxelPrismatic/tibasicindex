function find_in(thing, ids) {
    ls = [];
    for(var id of ids.split(" ")) {
        if(id.startsWith("."))
            ls.push(...thing.getElementsByClassName(id.slice(1)));
        else if(id.startsWith(">"))
            ls.push(...thing.getElementsByTagName(id.slice(1)));
        else if(id.startsWith(":"))
            ls.push(...thing.getElementsByName(id.slice(1)));
        else
            return thing.getElementById(id);
    }
    return ls;
} 

function find(ids) {
    return find_in(document, ids);
}

function read(filename) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            find("file").innerHTML = f.responseText;
    }
    f.open("GET", filename, false);
    f.send();
    return find("file").innerHTML;
}
function jump(elem) {
    id = elem.id.slice(5);
    find(id).scrollIntoView();
    var things = find("sect").children;
    for(var thing of things)
        thing.className = "lnk";
    elem.className = "alnk";
}
function load(fil) {
    find("sect").innerHTML = `<div class="lnk" id="SECT_top" onclick="jump(this);">#top</div>`;
    find("page").innerHTML = "WAIT... [LOADING FILE]";
    find(fil).className = "alnk";
    txt = read(fil);
    chars = [
        ["\\\\n", ""],
        ["&", "&amp;"],
        [">", "&gt;"],
        ["<", "&lt;"]
    ];
    for(var ls of chars) {
        k = ls[0];
        v = ls[1];
        while(txt.includes(k))
            txt = txt.replace(k, v);
    }
    txt = txt.replace(/\\U([A-Fa-f0-9]{16})/gm, "\\u{$1}");
    var md = "<div id='top'></div>";
    reps = [
        [/^(\#+)(.+)$/gm, "<div class='head'>$1$2</div>"],
        [/\[(.+)\]\((.+)\)/gm, "<a href='$2'>$1</a>"],
        [/\[\[(.+)\]\]\((.+)\)/gm, "<a href='$2'><div class='lnk'>$1</div></a>"],
        [/\%(.+)\%/gm, "<b>$1</b>"],
        [/\*(.+)\*/gm, "<i>$1</i>"],
        [/\_(.+)\_/gm, "<u>$1</u>"],
        [/\~(.+)\~/gm, "<s>$1</s>"],
        [/\`(.+)\`/gm, `<span class="code">$1</span>`]
        [/^WARN---$/gm, "<div class='warn'><b>WARNING ---</b><br>"],
        [/^NOTE---$/gm, "<div class='note'><b>NOTICE ---</b><br>"],
        [/^NEW---$/gm, "<div class='new'><b>NEW ---</b><br>"],
        [/^INFO---$/gm, "<div class='info'><b>INFO ---</b><br>"],
        [/^EX---$/gm, "<div class='exc'><b>EXAMPLES ---</b><br>"],
        [/^CODE---$/gm, "<div class='code'>§"],
        [/^COMMENT---$/gm, "<div class='comblock'><b>OTHER INFO ---</b><br>"],
        [/^ *(\w+) *---{3,}/gm, "<b>$1 ---</b>"],
        [/^---$/gm, "</div>"],
        [/^ *\|(.*)$/gm, "<div class='com'>&gt; $1</div>"],
        [/\{\{(\w+)\}\}([\w\d]+) /gm, "<span class='$1'>$2</span>"],
        [/--([\w]+)--/gm, "<div id='$1'></div>"],
    ];
    for(var line of txt.split("\n")) {
        if(line.startsWith("SECT_")) {
            find("sect").innerHTML += `<div class="lnk" id="${line}" onclick="jump(this);">#${line.slice(5)}</div>`;
            continue;
        }
        for(var rep of reps)
            line = line.replace(rep[0], rep[1]);
        if(line.endsWith("<br>"))
            md += line;
        else if(line.endsWith("§"))
            md += line.slice(0, -1);
        else
            md += line+"\n";
    }
    find("page").innerHTML = md.replace(/\n/gm, "<br>")
    fil = fil.replace("index.txt", "").replace(".txt", ".py")
}
function docs(elem) {
    load(elem.id);
    var things = find("nav").children;
    for(var thing of things)
        thing.className = "lnk";
    elem.className = "alnk";
    jump("SECT_top");
}
function grab_dirs(lvl) {
    var dirs = [];
    var lines = read(lvl+"/dir.txt").split("\n");
    for(var line of lines) {
        if(line.endsWith(".txt")) {
            lnk = lvl+"/"+line;
            var smol = lnk.slice(5);
            dirs.push(lnk);
            if(lnk.endsWith("index.txt")) {
                lnk = lnk.replace("index.txt", "");
                var smol = lnk.slice(5);
            } else {
                nam = smol.slice(1)
                fil = lvl+"/"+line
                find("nav").innerHTML +=
                    `<div class="lnk" id="${fil}" onclick="docs(this);">${smol}</div>`;
            }
        } else if(line != "") {
            try {
                for(var name of grab_dirs(lvl+"/"+line))
                    dirs.push(name);
            } catch(err) {}
        }
    }
    return dirs;
}
dirs = grab_dirs("./doc");
url = document.URL;
if(url.includes("?")) {
    var thing = url.split("?")[1].split("#")[0];
    if(thing.startsWith("./doc"))
        thing = thing.slice(5);
    if(thing.startsWith("/"))
        thing = thing.slice(1)
    var fil = "./doc/"+thing.replace(/\.txt/g, "&").
    replace(/\./g, "/").replace(/\&/g, ".txt");
} else {
    var fil = "./doc/index.txt";
} if (!(fil.endsWith(".txt"))) {
    fil += ".txt";
} if (!(dirs.includes(fil))) {
    fil += "index.txt";
} if (!(dirs.includes(fil))) {
    find("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
} else {
    load(fil);
}
if(url.includes("#")) {
    url = url.replace("##", "#")
    var sec = url.split("#")[1].split("?")[0];
    if(!(sec.startsWith("SECT_"))) {
        sec = "SECT_"+sec;
    }
    jump(sec);
} else {
    jump("SECT_top");
}
