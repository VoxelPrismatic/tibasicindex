var events = ["onabort", "onafterprint", "onanimationend", "onanimationiteration",
              "onanimationstart", "onbeforeprint", "onbeforeunload", "onblur", 
              "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncopy",
              "oncontextmenu", "oncut", "ondblclick", "ondrag", "ondragend", 
              "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop",
              "ondurationchange", "onended", "onerror", "onfocus", "onfocusin",
              "onfocusout", "onfullscreenchange", "onfullscreenerror", "oninput",
              "onhashchange", "onkeydown", "oninvalid", "onkeypress", "onkeyup",
              "onload", "onloadeddata", "onloadedmetadata", "onloadstart",
              "onmessage", "onmousedown", "onmouseenter", "onmouseleave", "onpause",
              "onmousemove", "onmouseover", "onmouseout", "onmouseup", "onopen",
              "onoffline", "ononline", "onpagehide", "onpageshow", "onpaste",
              "onplay", "onplaying", "onpopstate", "onratechange", "onresize",
              "onreset", "onscroll", "onsearch", "onseeked", "onseeking", "onshow",
              "onselect", "onstalled", "onstorage", "onsubmit", "onsuspend",
              "ontimeupdate", "ontoggle", "ontouchcancel", "ontouchend", 
              "ontouchmove", "ontouchstart", "ontransitionend", "onunload",
              "onvolumechange", "onwaiting", "onwheel"];
              
              
class Tag {
    constructor(name, text, attr) {
        this.name = name;
        this.text = text;
        this.attr = attr;
    }
    str() {
        s = "<"+this.name;
        for(var a of this.attr.keys())
            s += ` ${a}="${this.attr.get(a)}"`;
        s += ">"+this.text+"</"+this.name+">";
        return s;
    }
    get head() {
        s = "<"+this.name;
        for(var a of this.attr.keys())
            s += ` ${a}="${this.attr.get(a)}"`;
        return s+">";
    }
    set editText(s) {
        this.text = s;
    }
    set editName(s) {
        this.name = s;
    }
    set editAttr(k, v) {
        this.attr[k] = v;
    }
    elmt() {
        e = document.createElement(this.name.toUpper());
        e.appendChild(document.createTextNode(this.text));
        for(var a of this.attr.keys())
            if(events.include(a))
                e.setAttribute(a, eval(this.attr.get(a)));
            else
                e.setAttribute(a, this.attr.get(a));
        return e;
    }
}
function A(text, attr){
    return Tag("a", text, attr);
}
function ABBR(text, attr){
    return Tag("abbr", text, attr);
}
function ACRONYM(text, attr){
    return Tag("acronym", text, attr);
}
function ADDRESS(text, attr){
    return Tag("address", text, attr);
}
function APPLET(text, attr){
    return Tag("applet", text, attr);
}
function AREA(text, attr){
    return Tag("area", text, attr);
}
function ARTICLE(text, attr){
    return Tag("article", text, attr);
}
function ASIDE(text, attr){
    return Tag("aside", text, attr);
}
function AUDIO(text, attr){
    return Tag("audio", text, attr);
}
function B(text, attr){
    return Tag("b", text, attr);
}
function BASE(text, attr){
    return Tag("base", text, attr);
}
function BASEFONT(text, attr){
    return Tag("basefont", text, attr);
}
function BDI(text, attr){
    return Tag("bdi", text, attr);
}
function BDO(text, attr){
    return Tag("bdo", text, attr);
}
function BIG(text, attr){
    return Tag("big", text, attr);
}
function BLOCKQUOTE(text, attr){
    return Tag("blockquote", text, attr);
}
function BODY(text, attr){
    return Tag("body", text, attr);
}
function BR(text, attr){
    return Tag("br", text, attr);
}
function BUTTON(text, attr){
    return Tag("button", text, attr);
}
function CANVAS(text, attr){
    return Tag("canvas", text, attr);
}
function CAPTION(text, attr){
    return Tag("caption", text, attr);
}
function CENTER(text, attr){
    return Tag("center", text, attr);
}
function CITE(text, attr){
    return Tag("cite", text, attr);
}
function CODE(text, attr){
    return Tag("code", text, attr);
}
function COL(text, attr){
    return Tag("col", text, attr);
}
function COLGROUP(text, attr){
    return Tag("colgroup", text, attr);
}
function DATA(text, attr){
    return Tag("data", text, attr);
}
function DATALIST(text, attr){
    return Tag("datalist", text, attr);
}
function DD(text, attr){
    return Tag("dd", text, attr);
}
function DEL(text, attr){
    return Tag("del", text, attr);
}
function DETAILS(text, attr){
    return Tag("details", text, attr);
}
function DFN(text, attr){
    return Tag("dfn", text, attr);
}
function DIALOG(text, attr){
    return Tag("dialog", text, attr);
}
function DIR(text, attr){
    return Tag("dir", text, attr);
}
function DIV(text, attr){
    return Tag("div", text, attr);
}
function DL(text, attr){
    return Tag("dl", text, attr);
}
function DT(text, attr){
    return Tag("dt", text, attr);
}
function EM(text, attr){
    return Tag("em", text, attr);
}
function EMBED(text, attr){
    return Tag("embed", text, attr);
}
function FIELDSET(text, attr){
    return Tag("fieldset", text, attr);
}
function FIGCAPTION(text, attr){
    return Tag("figcaption", text, attr);
}
function FIGURE(text, attr){
    return Tag("figure", text, attr);
}
function FONT(text, attr){
    return Tag("font", text, attr);
}
function FOOTER(text, attr){
    return Tag("footer", text, attr);
}
function FORM(text, attr){
    return Tag("form", text, attr);
}
function FRAME(text, attr){
    return Tag("frame", text, attr);
}
function FRAMESET(text, attr){
    return Tag("frameset", text, attr);
}
function H1 - H6(text, attr){
    return Tag("h1 - h6", text, attr);
}
function HEAD(text, attr){
    return Tag("head", text, attr);
}
function HEADER(text, attr){
    return Tag("header", text, attr);
}
function HR(text, attr){
    return Tag("hr", text, attr);
}
function HTML(text, attr){
    return Tag("html", text, attr);
}
function I(text, attr){
    return Tag("i", text, attr);
}
function IFRAME(text, attr){
    return Tag("iframe", text, attr);
}
function IMG(text, attr){
    return Tag("img", text, attr);
}
function INPUT(text, attr){
    return Tag("input", text, attr);
}
function INS(text, attr){
    return Tag("ins", text, attr);
}
function KBD(text, attr){
    return Tag("kbd", text, attr);
}
function LABEL(text, attr){
    return Tag("label", text, attr);
}
function LEGEND(text, attr){
    return Tag("legend", text, attr);
}
function LI(text, attr){
    return Tag("li", text, attr);
}
function LINK(text, attr){
    return Tag("link", text, attr);
}
function MAIN(text, attr){
    return Tag("main", text, attr);
}
function MAP(text, attr){
    return Tag("map", text, attr);
}
function MARK(text, attr){
    return Tag("mark", text, attr);
}
function META(text, attr){
    return Tag("meta", text, attr);
}
function METER(text, attr){
    return Tag("meter", text, attr);
}
function NAV(text, attr){
    return Tag("nav", text, attr);
}
function NOFRAMES(text, attr){
    return Tag("noframes", text, attr);
}
function NOSCRIPT(text, attr){
    return Tag("noscript", text, attr);
}
function OBJECT(text, attr){
    return Tag("object", text, attr);
}
function OL(text, attr){
    return Tag("ol", text, attr);
}
function OPTGROUP(text, attr){
    return Tag("optgroup", text, attr);
}
function OPTION(text, attr){
    return Tag("option", text, attr);
}
function OUTPUT(text, attr){
    return Tag("output", text, attr);
}
function P(text, attr){
    return Tag("p", text, attr);
}
function PARAM(text, attr){
    return Tag("param", text, attr);
}
function PICTURE(text, attr){
    return Tag("picture", text, attr);
}
function PRE(text, attr){
    return Tag("pre", text, attr);
}
function PROGRESS(text, attr){
    return Tag("progress", text, attr);
}
function Q(text, attr){
    return Tag("q", text, attr);
}
function RP(text, attr){
    return Tag("rp", text, attr);
}
function RT(text, attr){
    return Tag("rt", text, attr);
}
function RUBY(text, attr){
    return Tag("ruby", text, attr);
}
function S(text, attr){
    return Tag("s", text, attr);
}
function SAMP(text, attr){
    return Tag("samp", text, attr);
}
function SCRIPT(text, attr){
    return Tag("script", text, attr);
}
function SECTION(text, attr){
    return Tag("section", text, attr);
}
function SELECT(text, attr){
    return Tag("select", text, attr);
}
function SMALL(text, attr){
    return Tag("small", text, attr);
}
function SOURCE(text, attr){
    return Tag("source", text, attr);
}
function SPAN(text, attr){
    return Tag("span", text, attr);
}
function STRIKE(text, attr){
    return Tag("strike", text, attr);
}
function STRONG(text, attr){
    return Tag("strong", text, attr);
}
function STYLE(text, attr){
    return Tag("style", text, attr);
}
function SUB(text, attr){
    return Tag("sub", text, attr);
}
function SUMMARY(text, attr){
    return Tag("summary", text, attr);
}
function SUP(text, attr){
    return Tag("sup", text, attr);
}
function SVG(text, attr){
    return Tag("svg", text, attr);
}
function TABLE(text, attr){
    return Tag("table", text, attr);
}
function TBODY(text, attr){
    return Tag("tbody", text, attr);
}
function TD(text, attr){
    return Tag("td", text, attr);
}
function TEMPLATE(text, attr){
    return Tag("template", text, attr);
}
function TEXTAREA(text, attr){
    return Tag("textarea", text, attr);
}
function TFOOT(text, attr){
    return Tag("tfoot", text, attr);
}
function TH(text, attr){
    return Tag("th", text, attr);
}
function THEAD(text, attr){
    return Tag("thead", text, attr);
}
function TIME(text, attr){
    return Tag("time", text, attr);
}
function TITLE(text, attr){
    return Tag("title", text, attr);
}
function TR(text, attr){
    return Tag("tr", text, attr);
}
function TRACK(text, attr){
    return Tag("track", text, attr);
}
function TT(text, attr){
    return Tag("tt", text, attr);
}
function U(text, attr){
    return Tag("u", text, attr);
}
function UL(text, attr){
    return Tag("ul", text, attr);
}
function VAR(text, attr){
    return Tag("var", text, attr);
}
function VIDEO(text, attr){
    return Tag("video", text, attr);
}
function WBR(text, attr){
    return Tag("wbr", text, attr);
}
