import {find, find_in} from "./find.js";
import {docs, jump} from "./swap.js";
import {grab_dirs} from "./grab.js";
import {read} from "./read.js";
import {load} from "./load.js";

dirs = grab_dirs("./doc");
url = document.URL;
if(url.includes("?")) {
    var thing = url.split("?")[1].split("#")[0];
    if(thing.startsWith("./doc"))
        thing = thing.slice(5);
    if(thing.startsWith("/"))
        thing = thing.slice(1)
    var fil = "./doc/"+thing.replace(/\.txt/g, "&").
    replace(/\./g, "/").replace(/\&/g, ".txt");
} else {
    var fil = "./doc/index.txt";
} if (!(fil.endsWith(".txt"))) {
    fil += ".txt";
} if (!(dirs.includes(fil))) {
    fil += "index.txt";
} if (!(dirs.includes(fil))) {
    find("page").innerHTML = `<div class="warn">404 ] File not found</div>`;
} else {
    load(fil);
}
if(url.includes("#")) {
    url = url.replace("##", "#")
    var sec = url.split("#")[1].split("?")[0];
    if(!(sec.startsWith("SECT_"))) {
        sec = "SECT_"+sec;
    }
    jump(sec);
} else {
    jump("SECT_top");
}
