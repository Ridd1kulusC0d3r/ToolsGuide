"""Valida catálogo, referências locais e fixtures, sem executar ferramentas externas."""
from pathlib import Path
import json,re,struct
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'catalog.json').read_text())
assert data['schema_version']=='1.0'
ids=set()
for t in data['tools']:
 for key in ('id','name','area','command','expected','limit','source','path','prerequisites'):
  assert t.get(key), (t.get('id'),key)
 assert t['id'] not in ids
 ids.add(t['id'])
 assert (root/t['path']).is_file()
 assert t['command'] in (root/t['path']).read_text()
 assert t['source'].startswith('https://')
for t in data['tools']: assert t['next'] in ids
for f in root.rglob('*.md'):
 for link in re.findall(r'\]\(([^)]+)\)',f.read_text()):
  if '://' in link or link.startswith('#'):continue
  assert (f.parent/link.split('#')[0]).exists(),(str(f),link)
fixture=json.loads((root/'labs/aurora/indicators.json').read_text())
assert fixture['synthetic'] is True
assert [x['value'] for x in fixture['indicators'] if x['type']=='domain' and x['score']>=70]==['login.aurora.example']
pcap=(root/'labs/aurora/dns.pcap').read_bytes()
assert struct.unpack('<I',pcap[:4])[0]==0xa1b2c3d4
assert struct.unpack('<I',pcap[32:36])[0]==len(pcap)-40
assert b'\x05login\x06aurora\x07example\x00' in pcap
print(f'OK: {len(ids)} guias, catálogo, links Markdown locais e fixtures. Não substitui teste de cada ferramenta.')
