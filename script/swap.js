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
}
function docs(elem) {
    try {
        id = elem.id;
    } catch(err) {
        id = elem;
    } try {
        find("page").innerHTML = find("DOCS_"+id).innerHTML;
        find("sect").innerHTML = find("SECT_"+id).innerHTML;
    } catch(err) {
        load(id);
        find("loaded-pages").innerHTML += `<div id="DOCS_${id}" class="invis">${find("page").innerHTML}</div>`;
        find("loaded-sects").innerHTML += `<div id="SECT_${id}" class="invis">${find("sect").innerHTML}</div>`;
    }
    var things = find("nav").children;
    for(var thing of things)
        if(thing.className == "lnk sel")
            thing.className = "lnk";
    find(id).className = "lnk sel";
    url = "https://github.com/VoxelPrismatic/prizmatic.docs/edit/master/doc/"
    console.log(id);
    name = "/"+id.slice(19).replace("index.txt", "").toUpper()
    find("src").innerHTML = 
        `EDIT THIS PAGE - <a href="${url}${id.split("doc/").slice(-1)[0]}">${id}</a>`;
    jump("JUMP_top");
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
