import { allStars, lastUpdateTimestamp } from '../all-stars.json';
import {
  compressToEncodedURIComponent, // /^[a-zA-Z0-9+-$]+$/
  decompressFromEncodedURIComponent,
} from 'lz-string';

export const divmod = (x, y) => [Math.floor(x / y), x % y];
export const last = (a) => a.length ? a[a.length - 1] : null;
export const toHex = (n) => n.toString(16);
export const parseHex = (s) => parseInt(s, 16);

export const allStarsConst = {
  totalIds: allStars.flat(Infinity).filter(Number),
  lastUpdateTimestamp,
};
allStarsConst.totalCount = allStarsConst.totalIds.length;

export const encoders = [encode0, encode1, encode2];
export const decoders = [decode0, decode1, decode2];

export function getDiffList(a) {
  return a.slice(1)
    .reduce((prev, curr, idx) => {
      prev.push(curr - a[idx]);
      return prev;
    }, []);
}

export function accDiffList(p, a) {
  return a.reduce((prev, curr) => {
    prev.push(last(prev) + curr);
    return prev;
  }, [p]);
}

export function encode(ownedSet) {
  if (!ownedSet.size) { return ''; }

  return encoders.slice(-1)[0](ownedSet);
}

export function decode(encoded) {
  if (!encoded) { return []; }

  if (/^[a-f\d|.]+$/ig.test(encoded)) {
    console.log('decoder v0');
    return decoders[0](encoded);
  }

  if (/^(\d+)!(.*)$/.test(encoded)) {
    const [v, vEncoded] = encoded.match(/^(\d+)!(.*)$/).slice(1);
    console.log('decoder v', v);
    return decoders[v](vEncoded);
  }

  console.warn('Unknown encoding format…');
  return [];
}

export function encode0(ownedSet) {
  const owned = [...ownedSet].sort((a, b) => a - b);
  let pivot = owned.shift();
  const saved = { [pivot]: [pivot] };

  while (owned.length) {
    const first = owned.shift();
    if (first - last(saved[pivot]) < 16) {
      saved[pivot].push(first);
    } else {
      saved[first] = [first];
      pivot = first;
    }
  }

  return Object.values(saved).map((a) => {
    const diff = getDiffList(a).map(toHex).join('');
    return diff ? `${a[0]}.${diff}` : String(a[0]);
  }).join('|');
}

export function decode0(encoded) {
  return encoded.split('|').map((g) => {
    const t = g.split('.');
    return t[1] ? accDiffList(Number(t[0]), t[1].split('').map(parseHex)) : [Number(t[0])];
  }).reduce((prev, curr) => prev.concat(curr));
}

export function encode1(ownedSet) {
  const prefix = ownedSet.size > (allStarsConst.totalCount / 2) ? '-' : '+';
  if (prefix === '+') {
    return '1!' + compressToEncodedURIComponent(prefix + encode0(ownedSet));
  } else {
    const invOwnedSet = new Set(allStarsConst.totalIds);
    for (const starId of ownedSet) {
      invOwnedSet.delete(starId);
    }
    return '1!' + compressToEncodedURIComponent(prefix + encode0(invOwnedSet));
  }
}

export function decode1(encoded) {
  const e2 = decompressFromEncodedURIComponent(encoded);
  const [prefix, e3] = [e2[0], e2.slice(1)];
  if (prefix === '+') {
    return decode0(e3);
  } else {
    const invOwnedList = decode0(e3);
    const ownedSet = new Set(allStarsConst.totalIds);
    for (const starId of invOwnedList) {
      ownedSet.delete(starId);
    }
    return [...ownedSet].filter((n) => n <= 854);
  }
}

export function encode2(ownedSet) {
  const prefix = ownedSet.size > (allStarsConst.totalCount / 2) ? '-' : '+';
  const suffix = ';' + Math.max(...allStarsConst.totalIds);
  if (prefix === '+') {
    return '2!' + compressToEncodedURIComponent(prefix + encode0(ownedSet) + suffix);
  } else {
    const invOwnedSet = new Set(allStarsConst.totalIds);
    for (const starId of ownedSet) {
      invOwnedSet.delete(starId);
    }
    return '2!' + compressToEncodedURIComponent(prefix + encode0(invOwnedSet) + suffix);
  }
}

export function decode2(encoded) {
  const e2 = decompressFromEncodedURIComponent(encoded);
  const [prefix, e3, suffix] = [e2[0], ...e2.slice(1).split(';')];
  if (prefix === '+') {
    return decode0(e3);
  } else {
    const invOwnedList = decode0(e3);
    const ownedSet = new Set(allStarsConst.totalIds.filter((n) => n <= Number(suffix)));
    for (const starId of invOwnedList) {
      ownedSet.delete(starId);
    }
    return [...ownedSet];
  }
}
