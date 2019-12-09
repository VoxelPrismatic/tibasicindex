function btn(elem, id) {
    btns = find(".tab");
    for(el of btns)
        el.className = "tab";
    elem.className = "tab tabbed";
    pages = find(".page");
    for(el of pages)
        el.style.display = "none";
    find(id).style.display = "block";
}
function highlight(phrase) {
    phrase = phrase.trim();
    find("page").innerHTML = findHtml("DOCS_" + findHtml("this-here"));
    if(phrase.lengh == 0)
        return;
    var phrase2 = "";
    phrase = phrase.replace(/</gm, "\\&lt;");
    phrase = phrase.replace(/>/gm, "\\&gt;");
    phrase = phrase.replace(/\&/gm, "\\&amp;");
    var jumps = find("sect").children;
    for(var l of phrase.split('')) {
        var lc = l.toLowerCase().charCodeAt(0).toString(16);
        var uc = l.toUpperCase().charCodeAt(0).toString(16);
        while(lc.length < 4)
            lc = "0" + lc;
        while(uc.length < 4)
            uc = "0" + uc;
        phrase2 += `[\\u${lc}\\u${uc}]`; //Escape chars
    }
    phrase2 = "(" + phrase2 + ")"
    var re = RegExp(phrase2, "gm")
    if(phrase.startsWith("/") && phrase.endsWith("/"))
        re = RegExp("("+phrase.slice(1, -1)+")", "gm")
    var intag = false;
    var st = findHtml("page");
    var str = [];
    var thistag = "";
    var thistext = "";
    for(var chr of st) {
        if(chr == ">") {
            intag = false;
            str.push("<" + thistag + ">");
            thistag = "";
            continue;
        }
        if(chr == "<") {
            intag = true;
            str.push(thistext.replace(re, `<span class="find">$1</span>`));
            thistext = "";
        }
        if(intag) {
            thistag += chr;
        }
        else {
            thistext += chr;
        }
    }
    find("page").innerHTML = str.join("");
    
    uri("&"+phrase);
    find("docs").click();
    ls = find(".find");
    for(var l of ls) {
        l.ondblclick = function() {
            ls = find(".find");
            var show = this.className.includes("nofind")
            for(var l of ls) {
                if(show)
                    l.className = "find";
                else
                    l.className = "find nofind";
            }
        }
        l.onclick = function() {
            this.classList.toggle("nofind");
        }
    }
    find("highlighter").innerHTML = phrase
}
function uri(thing) {
    try {
        var href = find("url").innerHTML
        while(href.startsWith(" "))
            href = href.slice(1);
        href = href.replace(/.*>(.*)<.*/gm, "$1");
        var page = "";
        var jump = "";
        var look = "";
        try {
            page = href.split("?")[1].split("#")[0];
        } catch(err) {
            console.log(err);
        } try {
            jump = href.split("#")[1].split("&")[0];
        } catch(err) {
            console.log(err);
        } try {
            look = href.split("&")[1];
        } catch(err) {
            console.log(err);
        }
        if(thing.startsWith("&"))
            look = thing;
        if(thing.startsWith("?"))
            page = thing;
        if(thing.startsWith("#"))
            jump = thing;
        if(page != "" && page != undefined && !(page.startsWith("?")))
            page = "?" + page;
        if(jump != "" && jump != undefined && !(jump.startsWith("#")))
            jump = "#" + jump;
        if(look != "" && look != undefined && !(look.startsWith("&")))
            look = "&" + look;
        href = `https://VoxelPrismatic.github.io/prizmatic.docs/${page}${jump}`
        if(look != "" && look != undefined)
            href += look;
        find("url").innerHTML = `[ <a href="${href}">${href}</a> ]`;
    } catch(err) {
        console.log(err);
    }
}

function searching() {
    if(find("swapper").value != "") {
        maybeload(find("swapper").value);
        find("swapper").value = "";
    }
    if(find("searcher").value != "") {
        highlight(find("searcher").value);
        find("searcher").value = "";
    }
    if(find("finder").value != "") {
        find_in_docs(find("finder").value);
        find("finder").value = "";
    }
    find("docs").click();
}

function filter_docs(thing) {
    var pages = find("nav").children;
    for(var page of pages) {
        if(!(page.id.startsWith("/prizmatic.docs/doc/")))
            continue;
        if(thing == "" || page.id.slice(20, -4).search(thing) != -1)
            page.style.display = "block";
        else
            page.style.display = "none";
    }
}

function filter_jump(thing) {
    var pages = find("sect").children;
    for(var page of pages) {
        if(!(page.id.startsWith("JUMP_")))
            continue;
        if(thing == "" || page.id.slice(5).search(thing) != -1)
            page.style.display = "block";
        else
            page.style.display = "none";
    }
}

function unimap(str) {
    return uni[str.toUpperCase()];
}

function find_in_docs(phrase) {
    var phrase2 = "";
    for(var l of phrase.split('')) {
        var lc = l.toLowerCase().charCodeAt(0).toString(16);
        var uc = l.toUpperCase().charCodeAt(0).toString(16);
        while(lc.length < 4)
            lc = "0" + lc;
        while(uc.length < 4)
            uc = "0" + uc;
        phrase2 += `[\\u${lc}\\u${uc}]`; //Escape chars
    }
    var re = RegExp(phrase2, "gm")
    if(phrase.startsWith("/") && phrase.endsWith("/"))
        re = RegExp(phrase.slice(1, -1), "gm")
    for(var dir of dirs) {
        try {
            if(find("RAW_"+dir).innerHTML.search(re) == -1)
                find(dir).style.display = "none";
            else
                find(dir).style.display = "block";
        } catch(err) {
            var this_here = find("this-here").innerHTML;
            try {
                docs(dir);
            } catch(err) {
                console.log(err);
            }
            docs(this_here);
            if(find("RAW_"+dir).innerHTML.search(re) == -1)
                find(dir).style.display = "none";
            else
                find(dir).style.display = "block";
        }
    }
    highlight(phrase);
    find("nav").click();
}

function check_for_dupes() {
    var btns = find("sect").children;
    var ls = [];
    for(var btn of btns) {
        if(ls.includes(btn.id)) {
            btn.remove();
        } else {
            ls.push(btn.id);
        }
    }
}
function escape(elem = find("page")) {
    var elms = elem.children;
    var st = elem.innerHTML;
    var ls = [];
    var el = [];
    if(elms.length == 0) {
        elem.innerHTML = elem.innerHTML.replace(/\&/gm, "&amp;");
        elem.innerHTML = elem.innerHTML.replace(/</gm, "&lt;");
        elem.innerHTML = elem.innerHTML.replace(/>/gm, "&gt;");
        elem.innerHTML = elem.innerHTML.replace(/\&lt;br\&gt;/, "<br>");
        return true;
    }
    for(var elm of elms) {
        if(escape(elm)) {
            if(ls.length == 0) {
                ls = elem.innerHTML.split(elm.outerHTML);
            } else {
                var tmp = ls.slice(-1)[0].split(elm.outerHTML);
                ls[ls.length-1] = tmp[0];
                ls.push(tmp[1]);
            }
            el.push(elm.outerHTML);
        }
    }
    var str = "";
    while(el.length < ls.length)
        el.push("");
    while(el.length > ls.length)
        ls.push("");
    for(var i = 0; i < ls.length; i++)
        str += ls[i] + el[i];
    elem.innerHTML = str;
    return false;
}
