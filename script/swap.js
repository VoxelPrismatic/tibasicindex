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
    url("#"+id);
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
    }
    var things = find("nav").children;
    for(var thing of things)
        if(thing.className == "lnk sel")
            thing.className = "lnk";
    find(id).className = "lnk sel";
    console.log(id);
    url("?"+id.slice(20));
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
