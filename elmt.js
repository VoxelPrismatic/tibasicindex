var attrib = new Map();
globalAttrib = ["accesskey", "class", "contenteditable", "dir", "draggable",
                "dropzone", "hidden", "id", "lang", "spellcheck", "tabindex",
                "title", "translate"];

attrib["a"] = ["download", "href", "hreflang", "media", "ping", "referrerpolicy",
               "rel", "target", "type"] + globalAttrib;
attrib["abbr"] = [] + globalAttrib;

//attrib["

function create(name, text, attr) {
    s = "<"+name;
    ls = attrib[name]
    for(var a of attr.keys()) {
        if(ls.includes(a.toLower())) {
            s += ` ${a}="${attr.get(a)}"`;
        } //Ignore bad attributes, 
    }
    s += ">"+text+"</"+name+">";
    return s;

function INPUT(text, attr) {
    return create("input", text, attr);
}
