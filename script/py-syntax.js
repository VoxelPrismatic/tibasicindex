py_regex = [
    [/( *)def ([\w\d_]+)/gm, `$1<span class="kw">def</span> <span class="fn">$2</span>`],
    [/( *)class ([\w\d_]+)/gm, `$1<span class="kw">class</span> <span class="cls">$2</span>`],
    [/([fFrRuUbB]?)(['"])(.+?)$2/gm, `<span class="str">$1$2$3$2</span>`],
]

function py_mark(st) {
