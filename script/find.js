function find_in(thing, ids) {
    var ls = [];
    for(var id of ids.split(" ")) {
        if(id.startsWith("."))
            ls.push(...thing.getElementsByClassName(id.slice(1)));
        else if(id.startsWith(">"))
            ls.push(...thing.getElementsByTagName(id.slice(1)));
        else if(id.startsWith(":"))
            ls.push(...thing.getElementsByName(id.slice(1)));
        else
            return thing.getElementById(id);
    }
    return ls;
} 
function find(ids) {
    return find_in(document, ids);
}
function findHtml_in(thing, ids) {
    var ls = [];
    var elm = find_in(thing, ids);
    for(var e of elm)
        ls.push(e.innerHTML);
    if(ls.length == 1)
        return ls[0]
    return ls;
}
function findHtml(ids) {
    return findHtml_in(document, ids);
}
function findVal_in(thing, ids) {
    var ls = [];
    var elm = find_in(thing, ids);
    for(var e of elm)
        ls.push(e.value);
    if(ls.length == 1)
        return ls[0]
    return ls;
}
function findVal(ids) {
    return findVal_in(document, ids);
}
function mkElm(typ, txt, params) {
    var str = "<"+typ;
    for(var param of params)
        str += ` ${param}="${params[param]}"`;
    str += `>${txt}</${typ}>`;
    return str;
}
