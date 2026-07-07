from html import unescape
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / "work"
OUT = ROOT / "outputs"

SOURCES = [
    ("07_aki", "令和7年秋期", "https://www.ap-siken.com/kakomon/07_aki/"),
    ("07_haru", "令和7年春期", "https://www.ap-siken.com/kakomon/07_haru/"),
    ("06_aki", "令和6年秋期", "https://www.ap-siken.com/kakomon/06_aki/"),
    ("06_haru", "令和6年春期", "https://www.ap-siken.com/kakomon/06_haru/"),
    ("05_aki", "令和5年秋期", "https://www.ap-siken.com/kakomon/05_aki/"),
    ("05_haru", "令和5年春期", "https://www.ap-siken.com/kakomon/05_haru/"),
    ("04_aki", "令和4年秋期", "https://www.ap-siken.com/kakomon/04_aki/"),
    ("04_haru", "令和4年春期", "https://www.ap-siken.com/kakomon/04_haru/"),
]


def strip_tags(value: str) -> str:
    return re.sub(r"<[^>]+>", "", value)


def extract_term(topic: str) -> str:
    term = topic
    term = re.sub(r"はどれか|とはどれか|に該当するもの|に関する記述|の説明はどれか|を説明したものはどれか", "", term)
    term = re.sub(r"の特徴|の目的|の手順|の方法|の活動|の考え方|に関する記述", "", term)
    term = re.sub(r"は何秒か|は何%か|は幾つか|は何回か|は何回転か|は何通りあるか", "", term)
    term = re.sub(r"として適切なもの|として使用されるもの|に使用されるもの", "", term)
    term = term.strip(" ・")
    if len(term) > 32 and " " not in term:
        return topic
    return term or topic


def parse_source(key: str, label: str, url: str):
    html = (WORK / f"{key}.html").read_text(encoding="utf-8")
    start = html.index('<div id="tab1"')
    end = html.index('<div id="tab2"')
    chunk = html[start:end]
    current_domain = ""
    rows = []
    for part in re.split(r"(?=<h3|<li>)", chunk):
        if part.startswith("<h3"):
            current_domain = strip_tags(part).strip()
            continue
        m = re.search(r'<li><a href="q(\d+)\.html">問\d+\s*(.*?)<p class="cate">(.*?)</p>', part)
        if not m:
            continue
        qno = int(m.group(1))
        topic = unescape(strip_tags(m.group(2))).strip()
        category = unescape(strip_tags(m.group(3))).strip()
        rows.append(
            {
                "id": f"{key}-{qno:02d}",
                "examKey": key,
                "exam": label,
                "url": f"{url}q{qno}.html",
                "qno": qno,
                "domain": current_domain,
                "category": category,
                "topic": topic,
                "term": extract_term(topic),
            }
        )
    return rows


def main():
    OUT.mkdir(exist_ok=True)
    cards = []
    for key, label, url in SOURCES:
        cards.extend(parse_source(key, label, url))
    data = {
        "generatedFrom": [dict(key=key, label=label, url=url) for key, label, url in SOURCES],
        "cards": cards,
    }
    (OUT / "data.js").write_text(
        "window.AP_SOURCE_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"wrote {len(cards)} cards")


if __name__ == "__main__":
    main()
