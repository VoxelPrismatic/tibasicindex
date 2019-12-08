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
            jmp.delete();
    try {
        find("page").innerHTML = find("DOCS_"+id).innerHTML;
        find("sect").innerHTML = find("SECT_"+id).innerHTML;
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
    name = fil.slice(19).replace("index.txt", "").toUpperCase();
    url = "https://github.com/VoxelPrismatic/prizmatic.docs/edit/master/doc/";
    find("src").innerHTML = 
        `EDIT THIS PAGE - <a href="${url}${name.toLowerCase()}">${name}</a>`;
    highlight(find("highlighter").innerHTML);
}
function finder(thing) {
    var ls = [];
    for(var file of dirs) {
        try {
            if(find("RAW_"+file).innerHTML.includes(thing))
                ls.push(file);
        } catch(err) {
            txt = mayberead(file)
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
