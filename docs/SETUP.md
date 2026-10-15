# Ambiente de estudo

Use Linux, macOS ou WSL com terminal POSIX. Os comandos dos guias assumem a raiz do repositório. Windows nativo pode exigir adaptação de aspas e caminhos.

1. Instale Python 3 para servir o painel e gerar a captura sintética.
2. Instale somente a ferramenta do guia que deseja estudar, conforme seu projeto oficial. Não precisa instalar todas.
3. Registre a versão e confirme os arquivos antes de executar.

| Ferramenta | Projeto oficial / instalação | Verificação |
|---|---|---|
| jq | https://jqlang.org/download/ | `jq --version` |
| curl | https://curl.se/download.html | `curl --version` |
| ExifTool | https://exiftool.org/install.html | `exiftool -ver` |
| TShark | https://www.wireshark.org/download.html | `tshark --version` |
| YARA | https://yara.readthedocs.io/en/stable/gettingstarted.html | `yara --version` |
| Nmap | https://nmap.org/download.html | `nmap --version` |

O laboratório TShark lê um arquivo existente: não precisa habilitar captura privilegiada. O Nmap usa conexão TCP em loopback, sem exigir raw sockets. curl e Nmap dependem do servidor local; os outros exercícios são leitura de fixtures.

```sh
python3 scripts/make_pcap.py
python3 scripts/validate.py
python3 -m http.server 8765 --bind 127.0.0.1
```

Abra http://127.0.0.1:8765/. Não abra index.html diretamente: o navegador precisa obter catalog.json por HTTP. Porta ocupada? Use outra porta no servidor e adapte os exercícios de curl/Nmap. Ao terminar, Ctrl+C encerra o servidor.
