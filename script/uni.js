var unitxt = read("/prizmatic.docs/script/uni.txt");
var unimap = {};
for(var line of unitxt.split("\n"))
    unimap[line.split("\u0009")[1]] = line.split("\u0009")[0];
console.log(unimap);
