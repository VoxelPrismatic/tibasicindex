var unitxt = read("/prizmatic.docs/script/uni.txt");
var unimap = {};
for(var line of unitxt.split("\n"))
    unimap[line.split("|")[0]] = line.split("|")[1];
console.log(unimap);
