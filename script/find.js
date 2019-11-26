function find_in(thing, ids) {
    ls = [];
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
