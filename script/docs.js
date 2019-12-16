function ind(num) {
    var st = "";
    for(var i = 0; i < num; i++)
        st += "\u200b \u200b";
    return st;
}

var props = false;
var params = false;
var docs_regex = [
    [
        /\{\{cls\}\} (.+?) = (.+?)\(([\w\d, ]+)\)\n/gm,
        function(m, p1, p2, p3) {
            var st = `<div class="head1">`;
            st += `#] ` + p2 + `<span class="typ">{{cls}}</span>`;
            find("sect").innerHTML += `<div class="lnk" id="JUMP_${p2}" onclick="jump(this);">#cls ${p2}()</div>`;
            st += `</div><div class="code">`;
            st += `${p1} = <span class="cls">${p2}</span>(`;
            st += p3.replace(/\n */gm, " ");
            st += ")</div>";
            return st;
            
        }
    ], [
        /\{\{desc\}\} ([^{]+?)\n\n/gm,
        function(m, p1) {
            return ind(4) + p1.trim().replace(/\n */gm, "\n" + ind(4)) + "\n";
        }
    ], [
        /\{\{fn\}\} (await )?instance\.(.+?)\(([\w\d_, ]+)\)\n/gm,
        function(m, p1, p2, p3) {
            if(p1 == undefined)
                p1 = "";
            else
                p1 = `<span class="aio">await</span> `;
            var st = `<div id="${p2}"></div><div class="head2">`;
            find("sect").innerHTML += `<div class="lnk" id="JUMP_${p2}" onclick="jump(this);">#fn ${p2}()</div>`;
            st += `~] ` + p1 + p2 + `<span class="typ">{{fn}}</span>`;
            st += `</div><div class="code">`;
            var py = "";
            py += p1 + "instance." + p2 + "(";
            py += p3.replace(/\n */gm, " ") + ")";
            st += py_mark(py) + "</div>";
            return st;
        }
    ], [
        /\{\{sepfn\}\} (await )?instance\.([\w\d_]+)\(([\w\d._]+)\)\n/gm,
        function(m, p1, p2, p3) {
            if(p1 == undefined)
                p1 = "";
            else
                p1 = `<span class="aio">await</span> `;
            var st = `<div class="head3">`;
            st += `~] ` + p1 + p2 + `<span class="typ">{{fn}}</span>`;
            st += `</div><div class="code">`;
            var py = "";
            find("sect").innerHTML += `<div class="lnk" id="JUMP_${p2}" onclick="jump(this);">#fn ${p2}()</div>`;
            py += p1 + "instance." + p2 + "(";
            py += p3.replace(/\n */gm, " ") + ")";
            st += py_mark(py) + "</div>";
            st += `<div class="note">NOTICE ---\n`
            st += "This function is seperate from the class, which means it cannot be called from it.";
            st += "</div>"
            return st;
        }
    ], [
        /\{\{param\}\} (.+?) \[(.+?)\]\n([^{]+?)\n\n/gm,
        function(m, p1, p2, p3) {
            var st = ""
            if(!params) {
                st += `<div id="params"></div>`;
                find("sect").innerHTML += `<div class="lnk" id="JUMP_params" onclick="jump(this);">#params</div>`;
                params = true;
            }
            st += `<span class="typ">{{param}}</span>`;
            st += ` <span class="var"><b>${p1}</b></span> [<span class="cls">${p2}</span>]\n`;
            st += ind(4) + p3.trim().replace(/\n */gm, "\n" + ind(4)) + "\n";
            return st;
        }
    ], [
        /\{\{prop\}\} (.+?) \[(.+?)\]\n([^{]+?)\n\n/gm, 
        function(m, p1, p2, p3) {
            var st = ""
            if(!props) {
                st += `<div id="props"></div>`;
                find("sect").innerHTML += `<div class="lnk" id="JUMP_props" onclick="jump(this);">#props</div>`;
                props = true;
            }
            st += `<span class="typ">{{prop}}</span>`;
            st += ` <span class="var"><b>${p1}</b></span> [<span class="cls">${p2}</span>]\n`;
            st += ind(4) + p3.trim().replace(/\n */gm, "\n" + ind(4)) + "\n";
            return st;
        }
    ], [
        /\{\{rtn\}\} \[(.+?)\] ([^{]+?)\n\n/gm,
        function(m, p1, p2) {
            var st = `<span class="typ">{{rtn}}</span>`;
            st += ` [<span class="cls">${p1}</span>] ${p2}\n`;
            return st;
        }
    ], [
        /\{\{err\}\} \[(.+?)\] ([^{]+?)\n\n/gm,
        function(m, p1, p2) {
            var st = `<span class="typ">{{err}}</span>`;
            st += ` [<span class="err">${p1}</span>] ${p2}\n`;
            return st;
        }
    ], [
        /\{\{note\}\} ([^{]+?)\n\n/gm,
        function(m, p1) {
            var st = `<div class="note">NOTICE ---\n`
            st += p1.replace(/\n */gm, " ");
            st += `</div>`;
            return st;
        }
    ], [
        /\{\{warn\}\} ([^{]+?)\n\n/gm,
        function(m, p1) {
            var st = `<div class="warn">NOTICE ---\n`
            st += p1.replace(/\n */gm, " ");
            st += `</div>`;
            return st;
        }
    ], [
        /discord\.([.\w_]+)/gm, 
        function(m, p1) {
            var st = `<<button class="btn" onclick="btnload(this.id)"`;
            st += `id="discord/${p1.replace(/\./gm, "/")}.txt">`;
            st += "discord." + p1;
            st += "</button>";
            return st;
        }
    ], [
        /\`(.+?)`/gm, 
        function(m, p1) {
            var st = `<span class="code">`;
            st += py_mark(p1);
            st += `</span>`;
            return st;
        }
    ]
]

function docs_mark(st) {
    st = st.trim() + "\n\n";
    for(var r of docs_regex)
        st = st.replace(r[0], r[1]);
    st = st.trim().replace(/\n/gm, "<br>") + "<br>";
    return st
}
