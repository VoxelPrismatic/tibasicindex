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

function filter_docs(thing) {
    var pages = find("nav").children;
    var regex = false;
    var re = "";
    find("filter_docs").style.color = "#ffffff";
    if(thing.startsWith("/") && thing.endsWith("/") && thing != "/") {
        try {
            re = RegExp(thing.slice(1, -1), "gm");
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
    var re = "";
    find("filter_jumps").style.color = "#ffffff";
    if(thing.startsWith("/") && thing.endsWith("/") && thing != "/") {
        try {
            re = RegExp(thing.slice(1, -1), "gm");
            find("filter_jumps").style.color = "#00ffff";
            regex = true;
        } catch(err) {
            find("filter_jumps").style.color = "#ff0000";
        }
    } else {
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
        if(thing == "" || page.id.slice(5).search(re) != -1)
            page.style.display = "block";
        else
            page.style.display = "none";
    }
}

function unimap(str) {
    return uni[str.toUpperCase()];
}

function find_in_docs(thing) {
    while(find("search").children.length > 2) {
        var jmp = find("search").children;
        for(var elm of jmp)
            if(elm.id.startsWith("JUMP"))
                elm.remove();
    }
    var pages = find("nav").children;
    var regex = false;
    var re = "";
    find("filter_text").style.color = "#ffffff";
    if(thing.startsWith("/") && thing.endsWith("/") && thing != "/") {
        try {
            re = RegExp(thing.slice(1, -1), "gm");
            find("filter_text").style.color = "#00ffff";
            regex = true;
        } catch(err) {
            find("filter_text").style.color = "#ff0000";
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
    var this_here = findHtml("this-here");
    for(var page of pages) {
        if(!(page.id.startsWith("/prizmatic.docs/doc/")))
            continue;
        var id = page.id.slice(20, -4);
        docs(id);
        var text = findHtml("RAW_" + id)
        if(text.search(re) != -1 && re != "") {
            find("search").innerHTML += page.outerHTML;
        }
    }
    docs(this_here);
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
