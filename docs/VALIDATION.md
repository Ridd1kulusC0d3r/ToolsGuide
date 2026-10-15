# Validação da primeira versão

Data: 2026-10-15. Esta página diferencia teste real de expectativa documental.

| Componente | Verificação | Resultado |
|---|---|---|
| jq 1.7 | Filtro do guia sobre a fixture | Retornou login.aurora.example |
| curl 8.5.0 | Servidor HTTP em loopback, JSON e cabeçalhos | HTTP 200 e três indicadores |
| curl 8.5.0 | Caminho inexistente | Exit code 22 em HTTP 404 |
| curl 8.5.0 | Servidor encerrado | Exit code 7, conexão recusada |
| JavaScript | node --check assets/app.js | Sintaxe válida |
| Catálogo e links | scripts/validate.py | Seis guias, comandos sincronizados, referências locais e fixtures |
| PCAP | Geração sem rede, cabeçalho e nome DNS | Validação estrutural; ainda sem leitura por TShark neste ambiente |
| ExifTool, TShark, YARA e Nmap | Revisão das referências oficiais e comandos | Binários ausentes; execução não validada neste ambiente |
| Interface em navegador | Tentativa de teste Playwright | Bloqueada: Chromium não instalado. Sem validação visual ou funcional completa em navegador |

O painel implementa filtros, modal, notas, progresso local e exportação JSON. A sintaxe foi conferida, mas isso não comprova o comportamento em todos os navegadores. Não há backend, sincronização ou execução de comandos no painel.

Para validar localmente: gere a captura, rode scripts/validate.py e execute cada guia com sua versão instalada. No navegador, confira busca, filtros, abertura/fechamento por teclado, persistência após recarregar, exportação e ausência de rolagem horizontal em celular. Não marque testes ausentes como aprovados.
