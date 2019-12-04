regex = [
    [/^\#\] +(.+)$/gm, "<div class='head1'>#] $1</div>"],
    [/^\~\] +(.+)$/gm, "<div class='head2'>~] $1</div>"],
    [/^\+\] +(.+)$/gm, "<div class='head3'>+] $1</div>"],
    [/^\-\] +(.+)$/gm, "<div class='head4'>-] $1</div>"],
    [/^\$\] +(.+)$/gm, "<div class='head5'>$] $1</div>"],
    [/^\%\] +(.+)$/gm, "<div class='head6'>%] $1</div>"],
    
    [/\[(.+?)\]\((.+?)\)/gm, "<a href='$2'>$1</a>"],
    [/\[\[(.+?)\]\]\((.+?)\)/gm, "<a href='$2'><div class='lnk'>$1</div></a>"],
    
    [/\$\#(.+?)\#/gm, "<b>\\#$1#</b>"],
    [/\$\*(.+?)\*/gm, "<i>\\*$1*</i>"],
    [/\$\_(.+?)\_/gm, "<u>\\_$1_</u>"],
    [/\$\~(.+?)\~/gm, "<s>\\~$1~</s>"],
    [/\$\`(.+?)\`/gm, `<span class="code">\\\`$1\`</span>`],
    [/\$\^(.+?)\^/gm, "<sup>\\^$1^</sup>"],
    [/\$\%(.+?)\%/gm, "<sub>\\%$1%</sub>"],
    [/\$\|(.+?)\|/gm, `<span class="hide">\\|$1|</span>`],
    
    [/([^\\])\#(.+?)\#/gm, "$1<b>$2</b>"],
    [/([^\\])\*(.+?)\*/gm, "$1<i>$2</i>"],
    [/([^\\])\_(.+?)\_/gm, "$1<u>$2</u>"],
    [/([^\\])\~(.+?)\~/gm, "$1<s>$2</s>"],
    [/([^\\])\`(.+?)\`/gm, `$1<span class="code">$2</span>`],
    [/([^\\])\^(.+?)\^/gm, "$1<sup>$2</sup>"],
    [/([^\\])\%(.+?)\%/gm, "$1<sub>$2</sub>"],
    [/([^\\])\|(.+?)\|/gm, `$1<span class="hide">$2</span>`],
    
    [/^WARN---$/gm, "<div class='warn'><b>WARNING ---</b><br>"],
    [/^NOTE---$/gm, "<div class='note'><b>NOTICE ---</b><br>"],
    [/^NEW---$/gm, "<div class='new'><b>NEW ---</b><br>"],
    [/^INFO---$/gm, "<div class='info'><b>INFO ---</b><br>"],
    [/^EX---$/gm, "<div class='exc'><b>EXAMPLES ---</b><br>"],
    [/^CODE---$/gm, "<div class='code'>§"],
    [/^COMMENT---$/gm, "<div class='comblock'><b>OTHER INFO ---</b><br>"],
    [/^ *(\w+) *-{3,}/gm, "<b>$1 ---</b>"],
    [/^---$/gm, "</div>"],
    
    [/^ *\:(.*)$/gm, "<div class='com'>> $1</div>"],
    [/\{\{(\w+?)\}\}([\w\d]+?) /gm, "<span class='$1'>$2</span>"],
    [/^--([\w\d_.-]+)--$/gm, "<div id='$1'></div>"],
    [/\\([^\\])/gm, "$1"], //Escape Chars
    [/\\U([A-Fa-f0-9]{16})/gm, "\\u{$1}"],
    [/\\ *$/gm, "§"], //New line escape
];
function mark(st) {
    for(var r of regex) {
        st = st.replace(r[0], r[1]);
    }
    return st;
}
