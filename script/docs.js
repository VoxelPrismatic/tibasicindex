function ind(num) {
    var st = "";
    for(var i = 0; i < num; i++)
        st += "\u200b \u200b";
    return st;
}

function mkJmp(nam, show = "") {
    if(show == "")
        show = nam;
    return `<div class="lnk" id="JUMP_${nam}" onclick="jump(this);">#${show}</div>`;
}

var props = false;
var params = false;
var notes = {}
var jumps = []
var docs_regex = [
    [
        /\{\{com\}\} (.*)\n\n/gm,
        function(m, p1, p2, p3) {
            var st = `<div id="top"></div><div id="${p2}" class="head1">`;
            st += `#] ` + p2 + ` <span class="typ">{{cls}}</span>`;
            jumps.push([p2, `cls ${p2}()`]);
            st += `</div><div class="code">`;
            st += `${p1} = <span class="cls">${p2}</span>(`;
            st += p3.replace(/\n */gm, " ");
            st += ")</div>";
            return st;
            
        }
    ], [
        /\{\{desc\}\} ([^{]+)\n\n/gm,
        function(m, p1) {
            return ind(4) + trim(p1).replace(/\n */gm, "\n" + ind(4)) + "\n";
        }
    ], [
        /\{\{param\}\} (.+?) \[(.+)\]\n([^{]*)\n\n*/gm,
        function(m, p1, p2, p3) {
            var st = ""
            if(!params) {
                st += `<div id="params"></div>`;
                jumps.push(["params", ""]);
                params = true;
            }
            st += `<span class="typ">{{param}}</span>`;
            st += ` <span class="var"><b>${p1}</b></span> [<span class="cls">${p2}</span>]\n`;
            st += ind(4) + trim(p3).replace(/\n */gm, "\n" + ind(4)) + "\n";
            return st;
        }
    ], [
        /\{\{rtn\}\} \[(.+?)\] ([^{]+)\n\n/gm,
        function(m, p1, p2) {
            var st = `<span class="typ">{{rtn}}</span>`;
            st += ` [<span class="cls">${p1}</span>] ${p2}\n`;
            return st;
        }
    ], [
        /\{\{err\}\} \[(.+?)\] ([^{]+)\n\n/gm,
        function(m, p1, p2) {
            var st = `<span class="typ">{{err}}</span>`;
            st += ` [<span class="err">${p1}</span>] ${p2}\n`;
            return st;
        }
    ], [
        /\{\{note\}\} ([^{]+)\n\n/gm,
        function(m, p1) {
            var st = `<div class="note"><b>NOTE ] </b>`
            st += p1.replace(/\n */gm, " ");
            st += `</div>`;
            return st;
        }
    ], [
        /\{\{warn\}\} ([^{]+)\n\n/gm,
        function(m, p1) {
            var st = `<div class="warn"><b>WARNING ] </b>`
            st += p1.replace(/\n */gm, " ");
            st += `</div>`;
            return st;
        }
    ], [
        /ti\.([.\w_]+)/gm, 
        function(m, p1) {
            var st = `<button class="btn" onclick="btnload(this.id)"`;
            st += `id="ti/${p1.replace(/\./gm, "/")}.txt">`;
            st += "ti." + p1;
            st += "</button>";
            return st;
        }
    ], [
        /\`(.+?)`/gm, 
        function(m, p1) {
            var st = `<span class="code">`;
            st += ti_mark(p1);
            st += `</span>`;
            return st;
        }
    ], [
        /\n\%n(\d+)\% ([^%{]+)\n/gm,
        function(m, p1, p2) {
            notes["\\%N" + p1 + "\\%"] = p2;
            return "\n";
        }
    ], [
        /\{\{alias\}\} ([\w\d_]+)/gm,
        function(m, p1) {
            return `<b>NOTE ] </b>An alias resides under '${p1}'</div>`;
        }
    ], [
        /\{\{norm\}\} (.+)/gm,
        function(m, p1) {
            return `<b>NOTE ] </b>The default value is <span class="code">${p1}</span>`;
        }
    ]
]

function docs_mark(st) {
    jumps = [];
    props = false;
    params = false;
    st = st.slice(8); // Removes the "--top--"
    st = st.trim() + "\n\n";
    for(var r of docs_regex)
        st = st.replace(r[0], r[1]);
    var keys = notes.constructor.keys(notes);
    for(var n of keys)
        st = st.replace(RegExp(n, "gm"), notes[n]);
    st = st.trim().replace(/\n/gm, "<br>") + "<br>";
    while(find("sect").children.length > 1) {
        var jmp = find("sect").children;
        for(var elm of jmp)
            if(elm.id.startsWith("JUMP_"))
                elm.remove();
    }
    for(var elm of jumps)
        find("sect").innerHTML += mkJmp(...elm);
    return st
}
