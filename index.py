import os
global dirs
dirs = []
def grab_dirs(lvl = "."):
    global dirs
    for filename in os.listdir():
        if filename.endswith(".md"):
            dirs.append(lvl+"/"+filename)
        elif "." not in filename:
            try:
                os.listdir(lvl+"/"+filename)
                grab_dirs(lvl+"/"+filename)
            except NotADirectoryError:
                pass
print(dirs)
