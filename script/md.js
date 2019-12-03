regex = [
    [/^([^\\])\#\] *(.+)$/gm, "$1<div class='head1'>#] $2</div>"],
    [/^([^\\])\~\] *(.+)$/gm, "$1<div class='head2'>~] $2</div>"],
    [/^([^\\])\=\] *(.+)$/gm, "$1<div class='head3'>=] $2</div>"],
    [/([^\\])\[(.+)\]\((.+)\)/gm, "$1<a href='$3'>$2</a>"],
    [/([^\\])\[\[(.+)\]\]\((.+)\)/gm, "$1<a href='$3'><div class='lnk'>$2</div></a>"],
    [/([^\\])\#(.+)\#/gm, "$1<b>$2</b>"],
    [/([^\\])\*(.+)\*/gm, "$1<i>$2</i>"],
    [/([^\\])\_(.+)\_/gm, "$1<u>$2</u>"],
    [/([^\\])\~(.+)\~/gm, "$2<s>$2</s>"],
    [/([^\\])\`(.+)\`/gm, `<span class="code">$1</span>`],
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
    [/\\[^\\]/gm, ""], //Escape Chars
    [/\\U([A-Fa-f0-9]{16})/gm, "\\u{$1}"],
    [/ /gm, "\u200b \u200b"],
];
function mark(st) {
    for(var r of regex) {
        st = st.replace(r[0], r[1]);
    }
    return st;
}
