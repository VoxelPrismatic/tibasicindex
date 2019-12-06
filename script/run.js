dirs = grab_dirs("/prizmatic.docs/doc"); // ../doc doesn't actually work for some reason
url = document.URL;
if(url.includes("?")) {
    var thing = url.split("?")[1].split("#")[0];
    if(thing.startsWith("./doc"))
        thing = thing.slice(5);
    if(thing.startsWith("/"))
        thing = thing.slice(1);
    if(thing.endsWith(".txt")) {
        thing = thing.slice(0, -3);
        thing = thing.replace(/\./g, "/");
        thing += ".txt";
    } else {
        thing = thing.replace(/\./g, "/");
        thing += ".txt";
    }
    var fil = "/prizmatic.docs/doc/"+thing;
} else {
    var fil = "/prizmatic.docs/doc/index.txt";
} if (!(dirs.includes(fil))) {
    fil += "index.txt";
} try {
    load(fil);
} catch(err) {
    find("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
}
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
