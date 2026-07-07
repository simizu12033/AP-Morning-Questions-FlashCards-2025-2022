const fs = require("fs");
const vm = require("vm");

function makeElement() {
  return {
    value: "",
    checked: false,
    textContent: "",
    innerHTML: "",
    style: {},
    dataset: {},
    classList: { toggle() {}, contains() { return false; } },
    addEventListener() {},
    querySelector() { return makeElement(); },
  };
}

const context = {
  console,
  window: {},
  localStorage: { getItem() { return "{}"; }, setItem() {} },
  document: {
    getElementById() { return makeElement(); },
    querySelectorAll() { return []; },
  },
  confirm() { return false; },
};
context.globalThis = context;

const data = fs.readFileSync("outputs/data.js", "utf8");
const app = fs.readFileSync("outputs/app.js", "utf8");
const appWithExports = `${app}\nglobalThis.__verify = { cards, diagramV2 };`;

vm.createContext(context);
vm.runInContext(data, context, { filename: "data.js" });
vm.runInContext(appWithExports, context, { filename: "app.js" });

function strip(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

const rows = context.__verify.cards.map((card, index) => {
  const html = context.__verify.diagramV2(card, false);
  const visualClass = (html.match(/<div class="memory-visual ([^"]+)/) || [])[1] || "";
  const sceneClass = (html.match(/<div class="(concept-scene[^"]+|crc-board|device-scene|switch-net|fish|trust-scene|security-scene|data-scene|system-scene|strategy-scene|cycle-scene|mechanism-scene)/) || [])[1] || "";
  const head = (html.match(/<strong>(.*?)<\/strong>/) || ["", ""])[1];
  const text = strip(html);
  return {
    index,
    id: card.id,
    answer: card.answer,
    visual: card.visual,
    visualClass,
    sceneClass,
    hasUnknown: text.includes("？？？"),
    headIsAnswer: head === card.answer,
    textHasAnswer: text.includes(card.answer),
  };
});

const generic = rows.filter((row) => /data-visual|system-visual|strategy-visual|cycle-visual|security-visual|trust-visual|mechanism-visual/.test(row.visualClass));
const byScene = new Map();
for (const row of rows) {
  if (!byScene.has(row.sceneClass)) byScene.set(row.sceneClass, []);
  byScene.get(row.sceneClass).push(row);
}
const duplicateScenes = [...byScene.entries()]
  .filter(([, values]) => values.length > 1)
  .sort((a, b) => b[1].length - a[1].length)
  .map(([sceneClass, values]) => ({
    sceneClass,
    count: values.length,
    cards: values.map((value) => `${value.id}:${value.answer}`),
  }));

console.log(JSON.stringify({
  count: rows.length,
  unknown: rows.filter((row) => row.hasUnknown),
  headLeaks: rows.filter((row) => row.headIsAnswer),
  textLeaks: rows.filter((row) => row.textHasAnswer),
  genericCount: generic.length,
  generic,
  duplicateScenes: duplicateScenes.slice(0, 25),
}, null, 2));
