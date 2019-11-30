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
    reps = [
        [/^(\#+)(.+)$/gm, "<div class='head'>$1$2</div>"],
        [/\[(.+)\]\((.+)\)/gm, "<a href='$2'>$1</a>"],
        [/\[\[(.+)\]\]\((.+)\)/gm, "<a href='$2'><div class='lnk'>$1</div></a>"],
        [/\%(.+)\%/gm, "<b>$1</b>"],
        [/\*(.+)\*/gm, "<i>$1</i>"],
        [/\_(.+)\_/gm, "<u>$1</u>"],
        [/\~(.+)\~/gm, "<s>$1</s>"],
        [/\`(.+)\`/gm, `<span class="code">$1</span>`],
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
        console.log(line);
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
    find("page").innerHTML = md.replace(/\n/gm, "<br>");
}
