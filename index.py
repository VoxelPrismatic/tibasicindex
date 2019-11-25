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
            r"\[(.+)\]\(.+)\)": r'<a href="\2">\1</a>', # [alt]<link>
            r"\[\[(.+)\]\]\((.+)\)": r'<a href="\2"><div class="lnk">\1</div></a>', # [[btn]]<link>
            r"\%(.+)\%": r"<b>\1</b>", # #bold#
            r"\*(.+)\*": r"<i>\1</i>", # *ital*
            r"\~(.+)\~": r"<s>\1</s>", # ~strike~
            r"\_(.+)\_": r"<u>\1</u>", # _under_
            r"^WARN---$": r'<div class="warn"><b>WARNING ---</b><br>',
            r"^NOTE---$": r'<div class="note"><b>NOTICE ---</b><br>',
            r"^NEW---$": r'<div class="new"><b>NEW ---</b><br>',
            r"^INFO---$": r'<div class="info"><b>INFO ---</b><br>',
            r"^EX---$": r'<div class="exc"><b>EXAMPLE ---</b><br>',
            r"^CODE---$": r'<div class="code">',
            r"^COMMENT---$": r'<div class="comblock"><b>OTHER INFO ---</b><br>',
            r"^---$": r'</div>', 
            r"^ *\|(.*)$": r'<div class="com">&gt; \1</div>',
            r"\{(\w+)\}([\w\d]+) ": r'<span class="\1">\2 </span>',
        }
        for k, v in dict2list(rep):
            line = re.sub(k, v, line)
        md += line+"\n"
    doc["page"].innerHTML = md
    fil = fil.replace("index.txt", "").replace(".txt", ".py")
    for lnk in dirs:
        if lnk.endswith("index.txt"):
            continue
        lnk = lnk.replace(".txt", ".py")
        if lnk != fil:
            doc["nav"] <= html.DIV(html.A(html.DIV(lnk[5:], Id=lnk, Class="lnk")))
        else:
            doc["nav"] <= html.DIV(html.A(html.DIV(lnk[5:], Id=lnk, Class="alnk")))
        
print(dirs)
