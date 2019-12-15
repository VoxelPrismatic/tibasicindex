function ind(num) {
    var st = "";
    for(var i = 0; i < num; i++)
        st += "\u200b \u200b";
    return st;
}

var docs_regex = [
    [
        /\{\{cls\}\} (.+?) = (.+?)\(((.|\n)+?)\)/gm,
        function(m, p1, p2, p3) {
            var st = `<div class="head1">`;
            st += "#] " + p2;
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
        /\{\{fn\}\} (await )?instance\.(.+?)\(((.|\n)+?)\)/gm,
        function(m, p1, p2, p3) {
            if(p1 == undefined)
                p1 = "";
            var st = `<div class="head2">`;
            st += "~] " + p1 + p2;
            st += `</div><div class="code">`;
            var py = "";
            py += p1 + "instance." + p2 + "(";
            py += p3.replace(/\n */gm, " ") + ")";
            st += py_mark(py) + "</div>\n";
            return st;
        }
    ], [
        /\{\{param\}\} (.+?) \[(.+?)\]\n((.|\n)+?)\n\n/gm,
        function(m, p1, p2, p3) {
            var st = `<span class="comm"><i>{{</i><i>param</i><i>}}</i></span>`;
            st += ` <span class="var"><b>${p1}</b></span> [<span class="cls">${p2}</span>]\n`;
            st += ind(4) + p3.trim().replace(/\n */gm, "\n" + ind(4)) + "\n";
        }
    ], [
        /\{\{prop\}\} (.+?) \[(.+?)\]\n((.|\n)+?)\n\n/gm, 
        function(m, p1, p2, p3) {
            var st = `<span class="comm"><i>{{</i><i>prop</i><i>}}</i></span>`;
            st += ` <span class="var"><b>${p1}</b></span> [<span class="cls">${p2}</span>]\n`;
            st += ind(4) + p3.trim().replace(/\n */gm, "\n" + ind(4)) + "\n";
        }
    ], [
        /\{\{rtn\}\} \[(.+)\] (.+?)\n\n/gm,
        function(m, p1, p2) {
            var st = `<span class="comm"><i>{{</i><i>rtn</i><i>}}</i></span>`;
            st += `[<span class="cls">${p1}</span>] ${p2}\n`;
        }
    ], [
        /\{\{error\}\} \[(.+)\] (.+?)\n\n/gm,
        function(m, p1, p2) {
            var st = `<span class="comm"><i>{{</i><i>error</i><i>}}</i></span>`;
            st += `[<span class="cls">${p1}</span>] ${p2}\n`;
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
