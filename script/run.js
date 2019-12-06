dirs = grab_dirs("/prizmatic.docs/doc"); // ../doc doesn't actually work for some reason
url = document.URL;
if(url.includes("?")) {
    maybeload(url.split("?")[1].split("#")[0].split("&")[0]);
} else {
    load("/prizmatic.docs/doc/index.txt");
}
if(url.includes("#")) {
    url = url.replace("##", "#")
    var sec = url.split("#")[1].split("?")[0].split("&")[0];
    if(!(sec.startsWith("JUMP_"))) {
        sec = "JUMP_"+sec;
    }
    jump(sec);
} else {
    jump("JUMP_top");
}
if(url.includes("&")) {
    highlight(url.split("#")[1].split("&")[1].split("?")[0].split("#")[0]);
}
