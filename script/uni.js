function getuni() {
    var unitxt = read("/prizmatic.docs/script/uni.txt");
    var uni = {};
    for(var line of unitxt.split("\n"))
        uni[line.split("\u0009")[1]] = line.split("\u0009")[0];
    return uni;
}
var unimap = getuni();
