function jump(elem) {
    find("docs").click();
    try {
        id = elem.id.split("JUMP_").slice(-1)[0];
    } catch {
        id = elem.split("JUMP_").slice(-1)[0];
    }
    find(id).scrollIntoView();
    var things = find("sect").children;
    for(var thing of things)
        if(thing.className == "lnk sel")
            thing.className = "lnk";
    find("JUMP_"+id).className = "lnk sel";
    var high = find("page_url").href.split("&")[1]
    find("page_url").href = find("page_url").href.split("#")[0] + "#" + elem.slice(5);
    if(high != undefined)
        find("page_url").href += "&" + high;
    check_for_dupes();
}
function docs(elem) {
    var id = "";
    if(elem.id != undefined)
        id = elem.id;
    else
        id = elem;
    var jumps = find("sect").children
    for(var jmp of jumps)
        if(jmp.id.startsWith("JUMP_"))
            jmp.remove();
    find("back-page").innerHTML += `<span>${elem}</span>`;
    find("this-here").innerHTML = elem;
    try {
        find("page").innerHTML = findHtml("DOCS_"+id);
        find("sect").innerHTML = findHtml("SECT_"+id);
    } catch(err) {
        load(id);
    }
    check_for_dupes();
    var things = find("nav").children;
    for(var thing of things)
        if(thing.className == "lnk sel")
            thing.className = "lnk";
    try {
        find(id).className = "lnk sel";
    } catch(err) {
        console.log(err);
    }
    var url = "https://github.com/VoxelPrismatic/prizmatic.docs/edit/master/doc/";
    find("edit_url").href = url + id.split("/").slice(3).join("/");
    var high = find("page_url").href.split("&")[1]
    find("page_url").href = find("page_url").href.split("?")[0] + "?" + id.split("/").slice(3).join("/") + "#top";
    if(high != undefined)
        find("page_url").href += "&" + high;
    highlight(find("highlighter").innerHTML);
    try {
        find("prev-page").innerHTML = "";
        find("next-page").innerHTML = "";
        var found = false;
        for(var dir of dirs) {
            if(dir == id)
                found = true;
            if(found)
                find("next-page").innerHTML += mkElm("span", dir);
            else
                find("prev-page").innerHTML += mkElm("span", dir);
        }
    } catch(err) {
        console.log(err);
    }
    jump("JUMP_top");
}
function finder(thing) {
    var ls = [];
    for(var file of dirs) {
        try {
            if(find("RAW_"+file).innerHTML.includes(thing))
                ls.push(file);
        } catch(err) {
            var txt = mayberead(file);
            find("cached-pages").innerHTML += `<div id="RAW_${file}" class="invis">${txt}</div>`
            if(txt.includes(thing))
                ls.push(file);
        }
    }
    st = "";
    for(var file of ls)
        st += `<div onclick="maybeload('${file}&${thing}')" class="exc">${file}</div>`;
    find("page").innerHTML = st;
}
