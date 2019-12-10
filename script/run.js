dirs = grab_dirs("/prizmatic.docs/doc"); // ../doc doesn't actually work for some reason
url = document.URL;
if(url.includes("?")) {
    maybeload(url.split("?")[1]);
} else {
    load("/prizmatic.docs/doc/index.txt");
}
