regex = [
    [/^[^\\](\#+)(.+)$/gm, "<div class='head'>$1$2</div>"],
    [/[^\\]\[(.+)\]\((.+)\)/gm, "<a href='$2'>$1</a>"],
    [/[^\\]\[\[(.+)\]\]\((.+)\)/gm, "<a href='$2'><div class='lnk'>$1</div></a>"],
    [/[^\\]\%(.+)\%/gm, "<b>$1</b>"],
    [/[^\\]\*(.+)\*/gm, "<i>$1</i>"],
    [/[^\\]\_(.+)\_/gm, "<u>$1</u>"],
    [/[^\\]\~(.+)\~/gm, "<s>$1</s>"],
    [/[^\\]\`(.+)\`/gm, `<span class="code">$1</span>`],
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
function mark(st) {
    for(var r of regex) {
        st = st.replace(r[0], r[1]);
    }
    return st;
}
