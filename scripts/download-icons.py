#!/usr/bin/env python3

import shutil
from pathlib import Path, PurePath

import requests

DEST_FOLDER = PurePath('icons')
Path(DEST_FOLDER).mkdir(exist_ok=True)


def url(i):
  return f'http://usashoya.web.fc2.com/aigis/checklist/image/chara/u{i}_0.png'


def dest(p):
  return DEST_FOLDER.joinpath(p)


MAX_FAIL = 10
inc_index = 0
continuous_fail_count = 0

while continuous_fail_count < MAX_FAIL:
  u = url(inc_index)
  basename = PurePath(u).name
  destpath = dest(basename)

  if not Path(destpath).exists():
    resp = requests.get(u, stream=True)
    resp.raw.decode_content = True
    if resp.ok:
      shutil.copyfileobj(resp.raw, open(destpath, 'wb'))
      continuous_fail_count = 0
    else:
      continuous_fail_count += 1
  else:
    continuous_fail_count = 0

  inc_index += 1
