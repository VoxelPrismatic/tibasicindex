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
    uri("#"+id);
    check_for_dupes();
}
function docs(elem) {
    if(elem.id != undefined)
        id = elem.id;
    else
        id = elem;
    var jumps = find("sect").children
    for(var jmp of jumps)
        if(jmp.id.startsWith("JUMP_"))
            jmp.remove();
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
    find(id).className = "lnk sel";
    uri("?"+id.slice(20));
    jump("JUMP_top");
    var url = "https://github.com/VoxelPrismatic/prizmatic.docs/edit/master/doc/";
    find("edit_url").href = url + fil.split("/").slice(3).join("/");
    highlight(find("highlighter").innerHTML);
    
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
