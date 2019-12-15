function ind(num) {
    var st = "";
    for(var i = 0; i < num; i++)
        st += "\u200b \u200b";
    return st;
}

var docs_regex = [
    [
        /\{\{cls\}\} (.+?) = (.+?)\(((.|\n)+?)\)\n/gm,
        function(m, p1, p2, p3) {
            var st = `<div class="head1">`;
            st += `#] <span class="typ">{{cls}}</span> ` + p2;
            st += `</div><div class="code">`;
            st += `${p1} = <span class="cls">${p2}</span>(`;
            st += p3.replace(/\n */gm, " ");
            st += ")</div>";
            return st;
        }
    ], [
        /\{\{desc\}\} ((.|\n)+?)\n\n/gm,
        function(m, p1) {
            return ind(4) + p1.trim().replace(/\n */gm, "\n" + ind(4)) + "\n";
        }
    ], [
        /\{\{fn\}\} (await )?instance\.(.+?)\(((.|\n)+?)\)\n/gm,
        function(m, p1, p2, p3) {
            if(p1 == undefined)
                p1 = "";
            else
                p1 = `<span class="aio">`;
            var st = `<div class="head2">`;
            st += `~] <span class="typ">{{fn}}</span> ` + p1 + p2;
            st += `</div><div class="code">`;
            var py = "";
            py += p1 + "instance." + p2 + "(";
            py += p3.replace(/\n */gm, " ") + ")";
            st += py_mark(py) + "</div>";
            return st;
        }
    ], [
        /\{\{param\}\} (.+?) \[(.+?)\]\n((.|\n)+?)\n\n/gm,
        function(m, p1, p2, p3) {
            var st = `<span class="typ">{{param}}</span>`;
            st += ` <span class="var"><b>${p1}</b></span> [<span class="cls">${p2}</span>]\n`;
            st += ind(4) + p3.trim().replace(/\n */gm, "\n" + ind(4)) + "\n";
            return st;
        }
    ], [
        /\{\{prop\}\} (.+?) \[(.+?)\]\n((.|\n)+?)\n\n/gm, 
        function(m, p1, p2, p3) {
            var st = `<span class="typ">{{prop}}</span>`;
            st += ` <span class="var"><b>${p1}</b></span> [<span class="cls">${p2}</span>]\n`;
            st += ind(4) + p3.trim().replace(/\n */gm, "\n" + ind(4)) + "\n";
            return st;
        }
    ], [
        /\{\{rtn\}\} \[(.+)\] (.+?)\n\n/gm,
        function(m, p1, p2) {
            var st = `<span class="typ">{{rtn}}</span>`;
            st += ` [<span class="cls">${p1}</span>] ${p2}\n`;
            return st;
        }
    ], [
        /\{\{err\}\} \[(.+)\] (.+?)\n\n/gm,
        function(m, p1, p2) {
            var st = `<span class="typ">{{err}}</span>`;
            st += ` [<span class="err">${p1}</span>] ${p2}\n`;
            return st;
        }
    ]
]

function docs_mark(st) {
    st = st.trim() + "\n\n";
    for(var r of docs_regex) {
        console.log(r);
        console.log(st);
        st = st.replace(r[0], r[1]);
        console.log(st);
    }
    st = st.trim().replace(/\n/gm, "<br>") + "<br>";
    return st
}
