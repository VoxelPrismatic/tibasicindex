function grab_dirs(lvl) {
    var dirs = [];
    var lines = read(lvl+"/dir.txt").split("\n");
    for(var line of lines) {
        if(line.endsWith(".txt")) {
            lnk = lvl+"/"+line;
            var smol = lnk.slice(5);
            dirs.push(lnk);
            if(lnk.endsWith("index.txt")) {
                lnk = lnk.replace("index.txt", "");
                var smol = lnk.slice(5);
            } else {
                nam = smol.slice(1)
                fil = lvl+"/"+line
                find("nav").innerHTML +=
                    `<div class="lnk" id="${fil}" onclick="docs(this);">${smol}</div>`;
            }
        } else if(line != "") {
            try {
                for(var name of grab_dirs(lvl+"/"+line))
                    dirs.push(name);
            } catch(err) {}
        }
    }
    return dirs;
}
