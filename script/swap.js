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
        find("page").innerHTML = find("DOCS_"+elem.id).innerHTML;
    } catch(err) {
        load(elem.id);
        find("loaded-pages").innerHTML += `<div id="DOCS_${elem}" class="invis">${find("page").innerHTML}</div>`;
    }
    var things = find("nav").children;
    for(var thing of things)
        if(thing.className == "alnk")
            thing.className = "lnk";
    try {
        elem.className = "alnk";
    } catch(err) {
        find(elem).className = "alnk";
    }
    jump("SECT_top");
}
