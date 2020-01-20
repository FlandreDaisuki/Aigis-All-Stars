#!/usr/bin/env node

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const EXPORT_NAME = 'all-stars.json';

const transformAllStars = (flattened) => {
  const first = flattened.flat(Infinity).reduce((arr, val) => {
    if (typeof val === 'string') {
      arr.push(val);
    } else {
      const last = arr[arr.length - 1];
      if (Array.isArray(last)) {
        last.push(val);
      } else {
        arr.push([arr.pop(), val]);
      }
    }
    return arr;
  }, []);
  // console.log('first', first)

  const second = first.reduce((arr, val) => {
    if (typeof val === 'string' && val.startsWith('▇')) {
      arr.push([val]);
    } else if (Array.isArray(val) && typeof val[0] === 'string' && val[0].startsWith('▼') || val[0].startsWith('◆')) {
      const last = arr[arr.length - 1];
      if (Array.isArray(last)) {
        last.push(val);
      } else {
        arr.push([arr.pop(), val]);
      }
    } else {
      arr.push(val);
    }
    return arr;
  }, []);
    // console.log('second', second)

  const third = second.reduce((arr, val) => {
    if (typeof val === 'string') {
      arr.push([val]);
    } else if (Array.isArray(val) && val[0].startsWith('▇')) {
      const last = arr[arr.length - 1];
      if (Array.isArray(last)) {
        last.push(val);
      } else {
        arr.push([arr.pop(), val]);
      }
    } else {
      arr.push(val);
    }
    return arr;
  }, []);
    // console.log('third', third)
  return third;
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

  const flattened = [];
  for (const group of groups) {
    flattened.push(group[0], ...group[1]);
  }

  const ordNameEntries = $('.monsImg').toArray().map((img) => {
    const data = $(img).data();
    const no = Number($(img).prev().attr('id')) - 1000;
    const title = data.tipso && data.tipso.replace('<br>', '\n');
    return [no, title];
  });

  const result = {
    lastUpdateTimestamp: Date.now(),
    allStars: transformAllStars(flattened),
    allStarsNameMap: Object.fromEntries(ordNameEntries),
  };
  fs.writeFileSync(EXPORT_NAME, JSON.stringify(result, null, 2));
});
