#!/usr/bin/env node

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const EXPORT_NAME = 'all-stars.json';

Array.prototype.lastItem = function() {
  return this.length > 0 ? this[this.length - 1] : this[0];
};

const url = 'http://usashoya.web.fc2.com/aigis/checklist/aigis_checklist.html';

fetch(url).then(async(resp) => {
  if (!resp.ok) { console.error(resp); return; }
  const html = await resp.text();
  const $ = cheerio.load(html);
  const groups = $('.group').toArray().map((g) => [
    $(g).children().first().text(),
    $(g).find('span, input').toArray()
      .map((e) => $(e).val() ? $(e).val() : $(e).text().trim())
      .map((e) => Number(e) ? Number(e) - 1000 : e)
      .filter(Boolean),
  ]);

  const root = [];
  for (const group of groups) {
    const subgroups = [];
    let current = subgroups;
    console.log('group', group);
    for (const e of group[1]) {
      if (typeof e === 'number') {
        current.push(e);
      } else {
        const curr = [e];
        if (e.startsWith('▇ ') || e === 'N/A') {
          subgroups.push(curr);
        } else {
          subgroups.lastItem().push(curr);
        }
        current = curr;
      }
    }
    root.push([group[0], subgroups]);
  }

  const ordNameEntries = $('.monsImg').toArray().map((img) => {
    const data = $(img).data();
    const no = data.original.replace(/.*\/u(\d+)_0.*/, '$1');
    return [no, data.tipso];
  });

  const result = {
    lastUpdateTimestamp: Date.now(),
    allStars: root,
    allStarsNameMap: Object.fromEntries(ordNameEntries),
  };
  fs.writeFileSync(EXPORT_NAME, JSON.stringify(result, null, 2));
});
