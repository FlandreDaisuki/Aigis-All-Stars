export const divmod = (x, y) => [Math.floor(x / y), x % y];
export const last = (a) => a.length ? a[a.length - 1] : null;
export const toHex = (n) => n.toString(16);
export const parseHex = (s) => parseInt(s, 16);


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

export function decode(decoded) {
  if (!decoded) { return []; }

  return decoded.split('|').map((g) => {
    const t = g.split('.');
    return t[1] ? accDiffList(Number(t[0]), t[1].split('').map(parseHex)) : [Number(t[0])];
  }).reduce((prev, curr) => prev.concat(curr));
}
