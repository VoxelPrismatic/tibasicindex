var kw_68k = [
];

var fn_68k = [
]

var kw_ti83 = [
];

var fn_ti83 = [
]

var kw_nspire = [
];

var fn_nspire = [
];

var ti_regex = [
    [
        /"(.+?)"/gm,
        `<span class="str">"$1"</span>`
    ], [
        /__([\w\d_]+)__/gm,
        `<span class="op">__$1__</span>`
    ], [
        /([\w\d_]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
    ], [
        /([^\u200b])(\([cC]\)|\u00a9)(.*)$/gm,
        function(m, b, a) {
            return `${b}<span class="comm">\u00a9${a.split('').join('\u200b')}</span>`;
        }
    ], [
        /^\(\([cC]\)|\u00a9)(.*)$/gm,
        function(m, a) {
            return `<span class="comm">\u00a9${a.split('').join('\u200b')}</span>`;
        }
    ]
];

var tok = [
    [
        /(-?)(\d+(\.\d+)?j?)/gm, 
        `<span class="var">$1$2</span>`
    ], [
        /\>\>/gm,
        `\u25b6`
    ], [
        /\>=/gm,
    ]
]
function ti_mark(st) {
    st = st.replace(/\n/gm, " \n");
    var sym = "[\\"+"\\.,:;()[]{}~|/-+=*^%&@ ".split('').join("\\")+"]";
    var gsym = "("+sym+")";
    for(var r of ti_regex) {
        st = st.replace(r[0], r[1]);
    }
    var kw = [];
    if(document.URL.includes("68k"))
        kw = kw_68k;
    else if(document.URL.includes("nspire"))
        kw = kw_nspire;
    else
        kw = kw_ti83;
    for(var r of kw) {
        st = st.replace(
            RegExp("^"+r+gsym, "gm"), 
            `<span class="kw">${r.split('').join('\u200b')}</span>$1`
        );
        st = st.replace(
            RegExp("("+sym+"|\n|[\u200b ]+)"+r+gsym, "gm"), 
            `$1<span class="kw">${r.split('').join('\u200b')}</span>$2`
        );
    }
    return st.replace(/([^ ])\u200b/gm, "$1").replace(/ +\n/gm, "\n");
}
