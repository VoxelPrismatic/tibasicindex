import os
from browser import document as doc, html, window as win
global dirs
dirs = []
def grab_dirs(lvl = "."):
    global dirs
    for filename in os.listdir():
        if filename.endswith(".txt"):
            dirs.append(lvl+"/"+filename)
        elif "." not in filename:
            try:
                os.listdir(lvl+"/"+filename)
                grab_dirs(lvl+"/"+filename)
            except NotADirectoryError:
                pass
url = doc.URL
fil = "./"+url.split("#")[-1].replace(".", "/")
if not fil.endswith(".txt"):
    fil += ".txt"
if fil not in dirs:
    fil += "index.txt"
if fil not in dirs:
    doc["page"] <= html.DIV("File not found", Class = "warn")
print(dirs)
