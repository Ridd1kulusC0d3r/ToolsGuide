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

## Refatoração visual — 2026-10-15

Identidade visual aplicada ao painel e ao README, com banner SVG acessível, favicon, jornada de três atos, cartões por área, estado de busca vazia, retomada de estudo, botão para copiar comandos e navegação entre missões. Os IDs do catálogo e a chave de armazenamento foram preservados para manter o progresso existente.

Verificações: sintaxe JavaScript, catálogo, links Markdown, IDs referenciados pelo JavaScript e recursos locais do HTML. A nova tentativa de instalar Chromium falhou por download inválido; não houve inspeção visual renderizada nem teste completo das interações. Copiar usa a API de clipboard; quando indisponível, a interface orienta a seleção manual. CSS inclui adaptações para telas estreitas, foco visível e preferência de movimento reduzido, ainda sem verificação visual no navegador.
