dirs = grab_dirs("/prizmatic.docs/doc"); // ../doc doesn't actually work for some reason
url = document.URL;
if(url.includes("?")) {
    var thing = url.split("?")[1].split("#")[0];
    maybeload(thing);
if(url.includes("#")) {
    url = url.replace("##", "#")
    var sec = url.split("#")[1].split("?")[0];
    if(!(sec.startsWith("JUMP_"))) {
        sec = "JUMP_"+sec;
    }
    jump(sec);
} else {
    jump("JUMP_top");
}
if(url.includes("&")) {
    var sec = url.split("#")[1].split("?")[0].split("&")[0];
    find("page").innerHTML = find("page").innerHTML.replace(RegExp(sec, "gm"), `<div class="find">${sec}</div>`);
}
