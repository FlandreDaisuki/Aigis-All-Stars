#!/usr/bin/env python3

import os
import re
from functools import reduce
from pathlib import Path, PurePath

import numpy as np
from PIL import Image

ICON_FOLDER = 'icons'
DEST_FOLDER = PurePath('icon_groups')
Path(DEST_FOLDER).mkdir(exist_ok=True)

icon_names = os.listdir(ICON_FOLDER)
get_icon_ord = lambda path: int(re.sub(r'u(\d+)_.*', r'\1', path))
sorted_icon_names = sorted(icon_names, key=get_icon_ord)
last_ord = get_icon_ord(sorted_icon_names[-1])


def group_icon_by_ord(prev, curr):
  i = get_icon_ord(curr) // 100
  prev[i].append(curr)
  return prev


group_sorted_icon_names = reduce(group_icon_by_ord, sorted_icon_names,
                                 [[] for _ in range(last_ord // 100 + 1)])

group_count = 0
IMG_HEIGHT = 50
IMG_WIDTH = 50
for group in group_sorted_icon_names:
  canvas = None

  for i in range(group_count * 100, (group_count + 1) * 100):
    icon_name = f'u{i}_0.png'
    icon_canvas = np.zeros((IMG_WIDTH, IMG_HEIGHT, 4), 'uint8')

    if icon_name in group:
      img = Image.open(f'{ICON_FOLDER}/{icon_name}')
      if img.mode != 'RGBA':
        img = img.convert('RGBA')
      icon_canvas = np.asarray(img.resize((IMG_WIDTH, IMG_HEIGHT)))

    if canvas is not None:
      canvas = np.hstack((canvas, icon_canvas))
    else:
      canvas = icon_canvas

  out = Image.fromarray(np.vstack(tuple(np.hsplit(canvas, 10))))
  out.save(str(DEST_FOLDER.joinpath(f'g{group_count}.png')))
  group_count += 1
