cls = [
    "int", "float", "dict", "list",
    "tuple", "set", "bool", "None",
    "frozenset", "str", "bytes",
    "files", "type"
];

kw = [
    "True", "False", "def", "import",
    "from", "yield", "class", "if",
    "elif", "else", "for", "while",
    "async", "await", "with", "as",
    "in", "not", "and", "or", "is",
    "super", "self", "global",
    "local", "try", "except", "pass",
    "continue", "break", "return"
];

ops = "()[]<>{}|.,:;&£*^%=/-@";

py_regex = [
    [
        /([\[\]\{\}\%\^\*\+\=\|\\\~\!\.\,\<\>\:\;\-\(\)\/\&])/gm,
        `<span class="op">$1</span>`
    ], [
        /([fFrRuUbB]?)(['"])(.+?)(['"])/gm,
        function(m, a, b, c) {
            return `<span class="str">${a}${b}${c.split('').join('\u200b')}${b}</span>`;
        }
    ], [
        /([fFrRuUbB]?)('''|""")((.|\n)+)('''|""")/gm,
        function(m, a, b, c) {
            return `<span class="str">${a}${b}${c.split('').join('\u200b')}${b}</span>`;
        }
    ], [
        /^( *)def ([\w\d_]+)/gm, 
        `$1<span class="kw">def</span> <span class="fn">$2</span>`
    ], [
        /^( *)class ([\w\d_]+)/gm,
        function(m, a, b) {
            cls.push(b);
            return `${a}<span class="kw">class</span> <span class="cls">${b}</span>`;
        }
    ], [
        /([\w\d_]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
    ], [
        /\#(.+?)/gm,
        function(m, a) {
            var s = "";
            for(var z = 0; z < a.length(); z++)
                s += a[z] + "\u200b";
            s = s.slice(0, -1);
            return `<span class="comm">#${s}</span>`;
        }
    ], [
        /(-)?0x(\d+)/gm,
        `<span class="var">$10x$2</span>`
    ], [
        /(-)?(\d+(\.\d+)?j?)/gm, 
        `<span class="var">$1$2</span>`
    ], [
        /^( *)\@([\d\w_.]+)/gm,
        `<span class="dec">$1@$2</span>`
    ], [
        /([\w\d_]*)(Error|Exception)/gm,
        `<span class="err">$1$2</span>`
    ]
];

function py_mark(st) {
    for(var r of py_regex)
        st = st.replace(r[0], r[1]);
    for(var r of kw)
        st = st.replace(RegExp("^( *)("+r+")", "gm"), `$1<span class="kw">$2</span>`);
    for(var r of cls)
        st = st.replace(RegExp(cls+"([\\(\\[\\.])", "gm"), `<span class="cls">${r}</span>$1`);
    return st;
}
