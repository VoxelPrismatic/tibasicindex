url = document.URL;
if(url.includes("?")) {
    maybeload(url.split("?")[1]);
} else {
    load("/prizmatic.docs/doc/index.txt");
}
