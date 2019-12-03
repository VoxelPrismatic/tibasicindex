function jump(elem) {
    try {
        id = elem.id.split("SECT_")[-1];
    } catch {
        id = elem.split("SECT_")[-1];
    }
    find(id).scrollIntoView();
    var things = find("sect").children;
    for(var thing of things)
        if(thing.className == "alnk")
            thing.className = "lnk";
    try {
        elem.className = "alnk";
    } catch(err) {
        find(elem).className = "alnk";
    }
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
        if(thing.className == "alnk")
            thing.className = "lnk";
    find(id).className = "alnk";
    find("edit_page").href = `https://github.com/VoxelPrismatic/prizmatic.docs/edit/master/doc/${id.split("doc/")[-1]}`;
    find("edit_page").innerHTML = "/"+id.split("doc/")[-1].replace("index.txt", "").toUpper();
    jump("SECT_top");
}
