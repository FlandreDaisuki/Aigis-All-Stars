#!/usr/bin/env python3

import re
import base64
import shutil
from pathlib import Path, PurePath

from lxml import html
import requests


DEST_FOLDER = PurePath('icons')
Path(DEST_FOLDER).mkdir(exist_ok=True)

def dest(p):
  return DEST_FOLDER.joinpath(p)

resp = requests.get('https://usashoya.web.fc2.com/aigis/checklist/aigis_checklist.html')
if resp.ok:
  doc = html.document_fromstring(resp.text)
  inputEls = filter(lambda el: el.tag == 'input', doc.find_class('cfx'))
  for inputEl in inputEls:
    iconEl = inputEl.getnext()
    encoded_src = iconEl.attrib['data-original']
    encoded_src_result = re.search('data:image/(?P<ext>.*?);base64,(?P<data>.*)', encoded_src, re.DOTALL)
    
    if encoded_src_result:
      gd = encoded_src_result.groupdict()
    
    ext = gd.get("ext")
    img = base64.urlsafe_b64decode(gd.get("data"))

    no = int(inputEl.attrib['id']) - 1000
    with open(dest(f'u{no}_0.{ext}'), 'wb') as f:
      f.write(img)