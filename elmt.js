var attrib = ["accesskey", "class", "contenteditable", "dir", "draggable",
              "dropzone", "hidden", "id", "lang", "spellcheck", "tabindex",
              "title", "translate"];

var others = {"input": ["

function create(name, text, attr, ls) {
    s = "<"+name;
    for(var a of attr.keys()) {
        if(ls.includes(a.toLower())) {
            s += ` ${a}="${attr.get(a)}"`;
        }
    }
    s += ">"+text+"</"+name+">";
    return s;

function INPUT(text, attr) {
    ls = attrib + ["accept"];
    return create("input", text, attr, ls);
