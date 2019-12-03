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
    "super", "self"
];

py_regex = [
    [
        /( *)def ([\w\d_]+)/gm, 
        `$1<span class="kw">def</span> <span class="fn">$2</span>`
    ], [
        /( *)class ([\w\d_]+)/gm,
        `${m[1]}<span class="kw">class</span> <span class="cls">${m[2]}</span>`
    ], [
        /([fFrRuUbB]?)(['"])(.+?)$2/gm,
        `<span class="str">$1$2$3$2</span>`
    ], [
        /([fFrRuUbB]?)('''|""")((.|\n)+)$2/gm,
        function(m, a, b, c) {
            var s = "";
            for(var z = 0; z < c.length(); z++)
                s += c[z] + "\u200b";
            s = s.slice(0, -1);
            return `<span class="str">${a}${b}${s}${b}</span>`;
        }
    ], [
        /([\w\d_]+)\(/gm,
        `<span class="fn">$1</span>(`
    ], [
        /\#(.+?)/gm,
        function(m, a) {
            var s = "";
            for(var z = 0; z < a.length(); z++)
                s += a[z] + "\u200b";
            s = s.slice(0, -1);
            return `<span class="comm">#${s}</span>`;
        }
    ]
];

function py_mark(st) {
}
