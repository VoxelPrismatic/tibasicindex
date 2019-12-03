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
ops = [
    "+", "-", "*", "^", "|", "~", ">", 
    "<", "%", "=", "/", "@", "&", "[",
    "]", "(", ")", "{", "}", ",", ".",
    ":", ";"
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
        function(m) {
            v = m[3];
            var s = "";
            for(var a = 0; a < v.length(); a++)
                s += v[a] + "\u200b";
            s = s.slice(0, -1);
            return `<span class="str">${m[1]}${m[2]}${s}${m[3]}</span>`;
        }
    ], [
        /([\w\d_]+)\(/gm,
        `<span class="fn">$1</span>(`
    ]
];

function py_mark(st) {
