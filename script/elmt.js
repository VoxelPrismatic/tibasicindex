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
              
              
class htmlTag {
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
function htmlA(text, attr){
    return htmlTag("a", text, attr);
}
function htmlABBR(text, attr){
    return htmlTag("abbr", text, attr);
}
function htmlACRONYM(text, attr){
    return htmlTag("acronym", text, attr);
}
function htmlADDRESS(text, attr){
    return htmlTag("address", text, attr);
}
function htmlAPPLET(text, attr){
    return htmlTag("applet", text, attr);
}
function htmlAREA(text, attr){
    return htmlTag("area", text, attr);
}
function htmlARTICLE(text, attr){
    return htmlTag("article", text, attr);
}
function htmlASIDE(text, attr){
    return htmlTag("aside", text, attr);
}
function htmlAUDIO(text, attr){
    return htmlTag("audio", text, attr);
}
function htmlB(text, attr){
    return htmlTag("b", text, attr);
}
function htmlBASE(text, attr){
    return htmlTag("base", text, attr);
}
function htmlBASEFONT(text, attr){
    return htmlTag("basefont", text, attr);
}
function htmlBDI(text, attr){
    return htmlTag("bdi", text, attr);
}
function htmlBDO(text, attr){
    return htmlTag("bdo", text, attr);
}
function htmlBIG(text, attr){
    return htmlTag("big", text, attr);
}
function htmlBLOCKQUOTE(text, attr){
    return htmlTag("blockquote", text, attr);
}
function htmlBODY(text, attr){
    return htmlTag("body", text, attr);
}
function htmlBR(text, attr){
    return htmlTag("br", text, attr);
}
function htmlBUTTON(text, attr){
    return htmlTag("button", text, attr);
}
function htmlCANVAS(text, attr){
    return htmlTag("canvas", text, attr);
}
function htmlCAPTION(text, attr){
    return htmlTag("caption", text, attr);
}
function htmlCENTER(text, attr){
    return htmlTag("center", text, attr);
}
function htmlCITE(text, attr){
    return htmlTag("cite", text, attr);
}
function htmlCODE(text, attr){
    return htmlTag("code", text, attr);
}
function htmlCOL(text, attr){
    return htmlTag("col", text, attr);
}
function htmlCOLGROUP(text, attr){
    return htmlTag("colgroup", text, attr);
}
function htmlDATA(text, attr){
    return htmlTag("data", text, attr);
}
function htmlDATALIST(text, attr){
    return htmlTag("datalist", text, attr);
}
function htmlDD(text, attr){
    return htmlTag("dd", text, attr);
}
function htmlDEL(text, attr){
    return htmlTag("del", text, attr);
}
function htmlDETAILS(text, attr){
    return htmlTag("details", text, attr);
}
function htmlDFN(text, attr){
    return htmlTag("dfn", text, attr);
}
function htmlDIALOG(text, attr){
    return htmlTag("dialog", text, attr);
}
function htmlDIR(text, attr){
    return htmlTag("dir", text, attr);
}
function htmlDIV(text, attr){
    return htmlTag("div", text, attr);
}
function htmlDL(text, attr){
    return htmlTag("dl", text, attr);
}
function htmlDT(text, attr){
    return htmlTag("dt", text, attr);
}
function htmlEM(text, attr){
    return htmlTag("em", text, attr);
}
function htmlEMBED(text, attr){
    return htmlTag("embed", text, attr);
}
function htmlFIELDSET(text, attr){
    return htmlTag("fieldset", text, attr);
}
function htmlFIGCAPTION(text, attr){
    return htmlTag("figcaption", text, attr);
}
function htmlFIGURE(text, attr){
    return htmlTag("figure", text, attr);
}
function htmlFONT(text, attr){
    return htmlTag("font", text, attr);
}
function htmlFOOTER(text, attr){
    return htmlTag("footer", text, attr);
}
function htmlFORM(text, attr){
    return htmlTag("form", text, attr);
}
function htmlFRAME(text, attr){
    return htmlTag("frame", text, attr);
}
function htmlFRAMESET(text, attr){
    return htmlTag("frameset", text, attr);
}
function H1 - H6(text, attr){
    return htmlTag("h1 - h6", text, attr);
}
function htmlHEAD(text, attr){
    return htmlTag("head", text, attr);
}
function htmlHEADER(text, attr){
    return htmlTag("header", text, attr);
}
function htmlHR(text, attr){
    return htmlTag("hr", text, attr);
}
function htmlHTML(text, attr){
    return htmlTag("html", text, attr);
}
function htmlI(text, attr){
    return htmlTag("i", text, attr);
}
function htmlIFRAME(text, attr){
    return htmlTag("iframe", text, attr);
}
function htmlIMG(text, attr){
    return htmlTag("img", text, attr);
}
function htmlINPUT(text, attr){
    return htmlTag("input", text, attr);
}
function htmlINS(text, attr){
    return htmlTag("ins", text, attr);
}
function htmlKBD(text, attr){
    return htmlTag("kbd", text, attr);
}
function htmlLABEL(text, attr){
    return htmlTag("label", text, attr);
}
function htmlLEGEND(text, attr){
    return htmlTag("legend", text, attr);
}
function htmlLI(text, attr){
    return htmlTag("li", text, attr);
}
function htmlLINK(text, attr){
    return htmlTag("link", text, attr);
}
function htmlMAIN(text, attr){
    return htmlTag("main", text, attr);
}
function htmlMAP(text, attr){
    return htmlTag("map", text, attr);
}
function htmlMARK(text, attr){
    return htmlTag("mark", text, attr);
}
function htmlMETA(text, attr){
    return htmlTag("meta", text, attr);
}
function htmlMETER(text, attr){
    return htmlTag("meter", text, attr);
}
function htmlNAV(text, attr){
    return htmlTag("nav", text, attr);
}
function htmlNOFRAMES(text, attr){
    return htmlTag("noframes", text, attr);
}
function htmlNOSCRIPT(text, attr){
    return htmlTag("noscript", text, attr);
}
function htmlOBJECT(text, attr){
    return htmlTag("object", text, attr);
}
function htmlOL(text, attr){
    return htmlTag("ol", text, attr);
}
function htmlOPTGROUP(text, attr){
    return htmlTag("optgroup", text, attr);
}
function htmlOPTION(text, attr){
    return htmlTag("option", text, attr);
}
function htmlOUTPUT(text, attr){
    return htmlTag("output", text, attr);
}
function htmlP(text, attr){
    return htmlTag("p", text, attr);
}
function htmlPARAM(text, attr){
    return htmlTag("param", text, attr);
}
function htmlPICTURE(text, attr){
    return htmlTag("picture", text, attr);
}
function htmlPRE(text, attr){
    return htmlTag("pre", text, attr);
}
function htmlPROGRESS(text, attr){
    return htmlTag("progress", text, attr);
}
function htmlQ(text, attr){
    return htmlTag("q", text, attr);
}
function htmlRP(text, attr){
    return htmlTag("rp", text, attr);
}
function htmlRT(text, attr){
    return htmlTag("rt", text, attr);
}
function htmlRUBY(text, attr){
    return htmlTag("ruby", text, attr);
}
function htmlS(text, attr){
    return htmlTag("s", text, attr);
}
function htmlSAMP(text, attr){
    return htmlTag("samp", text, attr);
}
function htmlSCRIPT(text, attr){
    return htmlTag("script", text, attr);
}
function htmlSECTION(text, attr){
    return htmlTag("section", text, attr);
}
function htmlSELECT(text, attr){
    return htmlTag("select", text, attr);
}
function htmlSMALL(text, attr){
    return htmlTag("small", text, attr);
}
function htmlSOURCE(text, attr){
    return htmlTag("source", text, attr);
}
function htmlSPAN(text, attr){
    return htmlTag("span", text, attr);
}
function htmlSTRIKE(text, attr){
    return htmlTag("strike", text, attr);
}
function htmlSTRONG(text, attr){
    return htmlTag("strong", text, attr);
}
function htmlSTYLE(text, attr){
    return htmlTag("style", text, attr);
}
function htmlSUB(text, attr){
    return htmlTag("sub", text, attr);
}
function htmlSUMMARY(text, attr){
    return htmlTag("summary", text, attr);
}
function htmlSUP(text, attr){
    return htmlTag("sup", text, attr);
}
function htmlSVG(text, attr){
    return htmlTag("svg", text, attr);
}
function htmlTABLE(text, attr){
    return htmlTag("table", text, attr);
}
function htmlTBODY(text, attr){
    return htmlTag("tbody", text, attr);
}
function htmlTD(text, attr){
    return htmlTag("td", text, attr);
}
function htmlTEMPLATE(text, attr){
    return htmlTag("template", text, attr);
}
function htmlTEXTAREA(text, attr){
    return htmlTag("textarea", text, attr);
}
function htmlTFOOT(text, attr){
    return htmlTag("tfoot", text, attr);
}
function htmlTH(text, attr){
    return htmlTag("th", text, attr);
}
function htmlTHEAD(text, attr){
    return htmlTag("thead", text, attr);
}
function htmlTIME(text, attr){
    return htmlTag("time", text, attr);
}
function htmlTITLE(text, attr){
    return htmlTag("title", text, attr);
}
function htmlTR(text, attr){
    return htmlTag("tr", text, attr);
}
function htmlTRACK(text, attr){
    return htmlTag("track", text, attr);
}
function htmlTT(text, attr){
    return htmlTag("tt", text, attr);
}
function htmlU(text, attr){
    return htmlTag("u", text, attr);
}
function htmlUL(text, attr){
    return htmlTag("ul", text, attr);
}
function htmlVAR(text, attr){
    return htmlTag("var", text, attr);
}
function htmlVIDEO(text, attr){
    return htmlTag("video", text, attr);
}
function htmlWBR(text, attr){
    return htmlTag("wbr", text, attr);
}
