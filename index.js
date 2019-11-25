function read(filename) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("file").innerHTML = f.responseText;
        }
    }
    f.open("GET", filename, false);
    f.send();
    return document.getElementById("file").innerHTML;
}
console.log(read("./doc/dir.txt"))
function grab_dirs(lvl) {
    var dirs = [];
    for(var line of read(lvl+"/dir.txt").split("\n")) {
        if(line.endsWith(".txt")) {
            dirs.push(lvl+"/"+line);
            lnk = lvl+"/"+line
            var smol = lnk.slice(5)
            if(lnk.endsWith("index.txt")) {
                lnk = lnk.replace("index.txt", "")
                document.getElementById("nav").innerHTML +=
                    `<div><a href="/prizmatic.docs#${smol}"><div class="lnk" id="${lnk}">${smol}</div></a></div>`;
            } else {
                lnk = lnk.replace(/\.txt/gm, ".py");
                document.getElementById("nav").innerHTML +=
                    `<div><a href="/prizmatic.docs#${smol}"><div class="lnk" id="${lnk}">${smol}</div></a></div>`;
            }
        } else if(line != "") {
            try {
                for(var name of grab_dirs(lvl+"/"+line)) {
                    dirs.push(name);
                }
            } catch(err) {}
        }
    }
    return dirs;
}
dirs = grab_dirs("./doc");
url = document.URL;
if(url.includes("#")) {
    var fil = "./doc/"+url.split("#")[-1].replace(/\.txt/g, "&").replace(/\./g, "/").replace(/\&/g, ".txt");
} else {
    var fil = "./doc/index.txt";
} if (!(fil.endsWith(".txt"))) {
    fil += ".txt";
} if (!(dirs.includes(fil))) {
    fil += "index.txt";
} if (!(dirs.includes(fil))) {
    document.getElementById("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
} else {
    txt = read(fil);
    chars = [
        ["\\\\n", ""],
        ["&", "&amp;"],
        [">", "&gt;"],
        ["<", "&lt;"]
    ]
    for(var ls of chars) {
        k = ls[0];
        v = ls[1];
        while(txt.includes(k)) {
            txt = txt.replace(k, v);
        }
    }
    txt = txt.replace(/\\U([A-Fa-f0-9]{16})/gm, "\\u{$1}")
    var md = ""
    reps = [
        [/^(\#+)(.+)$/gm, "<div class='head'>$1$2</div>"],
        [/\[(.+)\]\((.+)\)/gm, "<a href='$2'>$1</a>"],
        [/\[\[(.+)\]\]\((.+)\)/gm, "<a href='$2'><div class='lnk'>$1</div></a>"],
        [/\%(.+)\%/gm, "<b>$1</b>"],
        [/\*(.+)\*/gm, "<i>$1</i>"],
        [/\_(.+)\_/gm, "<u>$1</u>"],
        [/\~(.+)\~/gm, "<s>$1</s>"],
        [/^WARN---$/gm, "<div class='warn'><b>WARNING ---</b><br>"],
        [/^NOTE---$/gm, "<div class='note'><b>NOTICE ---</b><br>"],
        [/^NEW---$/gm, "<div class='new'><b>NEW ---</b><br>"],
        [/^INFO---$/gm, "<div class='info'><b>INFO ---</b><br>"],
        [/^EX---$/gm, "<div class='exc'><b>EXAMPLES ---</b><br>"],
        [/^CODE---$/gm, "<div class='code'>"],
        [/^COMMENT---$/gm, "<div class='comblock'><b>OTHER INFO ---</b><br>"],
        [/^ *(\w+) *---{3,}/gm, "<b>$1 ---</b>"],
        [/^---$/gm, "</div>"],
        [/^ *\|(.*)$/gm, "<div class='com'>&gt; $1</div>"],
        [/\{\{(\w+)\}\}([\w\d]+) /gm, "<span class='$1'>$2</span>"]
    ];
    for(var line of txt.split("\n")) {
        for(var rep of reps) {
            line = line.replace(rep[0], rep[1]);
        }
        md += line+"\n"
    }
    document.getElementById("page").innerHTML = md;
    fil = fil.replace("index.txt", "").replace(".txt", ".py")
    for(var lnk of dirs) {
        if(lnk.endsWith("index.txt")) {
            if(lnk.replace("index.txt", "") == fil) {
                document.getElementById(fil).className = "alnk";
            }
        } else {
            lnk = lnk.replace(/\.txt/gm, ".py");
            if(lnk == fil) {
                document.getElementById("nav").className = "alnk";
            }
        }
    }
}
console.log(dirs);
