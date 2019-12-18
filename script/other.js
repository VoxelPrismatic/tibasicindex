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
    if(phrase.lengh <= 2) {
        return;
        throw "Thrown to stop highlighting";
    }
    var phrase2 = "";
    var jumps = find("sect").children;
    for(var l of phrase.split('')) {
        var lc = l.toLowerCase().charCodeAt(0).toString(16);
        var uc = l.toUpperCase().charCodeAt(0).toString(16);
        while(lc.length < 4)
            lc = "0" + lc;
        while(uc.length < 4)
            uc = "0" + uc;
        phrase2 += `[\\u${lc}\\u${uc}\\u200b\\\\]`; //Escape chars
    }
    phrase2 = "(" + phrase2 + ")"
    if(phrase2 == "()") {
        return;
        throw "Thrown to stop highlighting";
    }
    var re = RegExp(phrase2, "gm")
    if(phrase.startsWith("/") && phrase.endsWith("/"))
        re = RegExp("("+phrase.slice(1, -1)+")", "gm")
    
    find_text(re);
    
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

function find_text(re, parent = find("page")) {
    var elems = parent.children;
    if(elems.length == 0) {
        parent.innerHTML = parent.innerHTML.replace(re, "<span class='find'>$1</span>");
    } else {
        for(var elem of elems) {
            find_text(re, elem);
        }
    }
}
function uri(thing) {
    try {
        var href = find("url").innerHTML
        href = href.replace(/<a href="(.*)"/gm, "$1").trim();
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
    var regex = false;
    find("filter_docs").style.color = "#ffffff";
    if(thing.startsWith("/") && thing.endsWith("/") && thing != "/") {
        try {
            var re = RegExp(thing.slice(1, -1), "gm");
            find("filter_docs").style.color = "#00ffff";
            regex = true;
        } catch(err) {
            find("filter_docs").style.color = "#ff0000";
        }
    } else {
        var re = "";
        for(var l of thing) {
            var lc = l.toLowerCase().charCodeAt(0).toString(16);
            var uc = l.toUpperCase().charCodeAt(0).toString(16);
            while(lc.length < 4)
                lc = "0" + lc;
            while(uc.length < 4)
                uc = "0" + uc;
            re += `[\\u${lc}\\u${uc}\\u200b\\\\]`; //Escape chars
        }
    }
    for(var page of pages) {
        if(!(page.id.startsWith("/prizmatic.docs/doc/")))
            continue;
        var id = page.id.slice(20, -4);
        if(regex)
            id = id.toLowerCase();
        if(thing == "" || id.search(re) != -1)
            page.style.display = "block";
        else
            page.style.display = "none";
    }
}

function filter_jump(thing) {
    var pages = find("sect").children;
    var regex = false;
    find("filter_docs").style.color = "#ffffff";
    if(thing.startsWith("/") && thing.endsWith("/") && thing != "/") {
        try {
            var re = RegExp(thing.slice(1, -1), "gm");
            find("filter_docs").style.color = "#00ffff";
            regex = true;
        } catch(err) {
            find("filter_docs").style.color = "#ff0000";
        }
    } else {
        var re = "";
        for(var l of thing) {
            var lc = l.toLowerCase().charCodeAt(0).toString(16);
            var uc = l.toUpperCase().charCodeAt(0).toString(16);
            while(lc.length < 4)
                lc = "0" + lc;
            while(uc.length < 4)
                uc = "0" + uc;
            re += `[\\u${lc}\\u${uc}\\u200b\\\\]`; //Escape chars
        }
    }
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
                console.error(err);
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
