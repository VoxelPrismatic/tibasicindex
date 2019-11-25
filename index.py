from browser import document as doc, html, window as win
import re
global dirs
dirs = []
def grab_dirs(lvl = "./doc"):
    global dirs
    with open(lvl+"/dir.txt") as f:
        for l in f.read().splitlines():
            if l.endswith(".txt"):
                dirs.append(lvl+"/"+l)
            elif l != "":
                try:
                    grab_dirs(lvl+"/"+l)
                except:
                    pass
    return dirs

def dict2list(dic):
    ls = []
    for key in dic:
        if type(dic[key]) == dic:
            dic[key] = dict2list(dic[key])
        ls.append([key, dic[key]])
    return ls
grab_dirs()
url = doc.URL
if "#" in url:
    fil = "./doc/"+url.split("#")[-1].replace(".txt", "&").replace(".", "/").replace("&", ".txt")
else:
    fil = "./doc/index.txt"
if not fil.endswith(".txt"):
    fil += ".txt"
if fil not in dirs:
    fil += "index.txt"
if fil not in dirs:
    doc["page"].innerHTML = '<div class="warn">404 ] File not found</div>'
else:
    txt = open(fil).read()
    chars = {
        "\\\n": "",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }
    for k, v in dict2list(chars):
        txt = txt.replace(k, v)
    txt = re.sub(r"\\U([A-Fa-f0-9]{16})", r"\\u{\1}", txt)
    md = ""
    for line in txt.split("\n"):
        line = eval(f'"{line}"') #Fixes unicode
        rep = {
            r"^(\#+)(.+)$": r'<div class="head">\1\2</div>', # @Header
            r"\[(.+)\]<(.+)>": r'<a href="\2">\1</a>', # [alt]<link>
            r"\[\[(.+)\]\]<(.+)>": r'<a href="\2"><div class="lnk">\1</div></a>', # [[btn]]<link>
            r"\%(.+)\%": r"<b>\1</b>", # #bold#
            r"\*(.+)\*": r"<i>\1</i>", # *ital*
            r"\~(.+)\~": r"<s>\1</s>", # ~strike~
            r"\_(.+)\_": r"<u>\1</s>", # _under_
            r"\n:::\n": r'<div class="code">',
            r"\n;;;\n": r'</div>'
        }
        for k, v in dict2list(rep):
            line = re.sub(k, v, line)
        md += line+"\n"
    doc["page"].innerHTML = md
    for lnk in dirs:
        if lnk != fil:
            doc["nav"].innerHTML += f'<br><div><a href="/prizmatic.docs#{lnk[6:]}"><div class="lnk" id="{lnk}">{lnk[5:]}</div></a></div>'
        else:
            doc["nav"].innerHTML += f'<br><div><a href="/prizmatic.docs#{lnk[6:]}"><div class="alnk" id="{lnk}">{lnk[5:]}</div></a></div>'
        
print(dirs)
