# OpenOSINT — o agente que investiga, mas não inventa

> **Missão:** entregar um alvo (e-mail, username, domínio, IP ou nome) a um agente de IA que decide, encadeia e pivota entre 20 ferramentas reais de reconhecimento passivo — e entender *por que* cada achado é rastreável.

**Guia rico (recomendado):** abra **[o manual interativo pelo método Feynman](openosint/index.html)** — figura isométrica animada da "Central Pneumática de Investigação", painel filtrável das 20 ferramentas, investigação quadro a quadro, matriz de chaves de API, segurança do Web UI e quiz. Em pt-BR, arquivo único, funciona offline.

- Área: **OSINT · CTI**
- Tempo estimado: 40 min (guia completo) · 2 min (primeiro comando)
- Pré-requisitos: terminal; Python 3.10+ ou `uv`; nenhuma chave de API para começar
- Fonte primária: <https://github.com/OpenOSINT/OpenOSINT> (MIT, v2.30.0) · <https://openosint.tech>

## Analogia

Uma **central de correio pneumático**: você escreve o alvo num cartão; a torre roteadora (o agente de IA) escolhe o tubo certo (uma das 20 ferramentas); a cápsula volta com o que a estação do outro lado — holehe, sherlock, HIBP, Shodan, DNS… — **de fato respondeu**. A IA emite a chamada; quem executa o binário ou a API real é o código. Por isso, achado alucinado é estruturalmente impossível — embora a *escolha* dos tubos ainda possa ser incompleta.

## Primeiro comando (sem IA, sem chave)

```sh
pip install openosint
openosint dns example.com
```

**Esperado:** registros A/MX/NS e análise de SPF, DMARC e DKIM do domínio, direto do resolvedor — nenhuma API externa envolvida.

## Limite que você precisa dizer em voz alta

Resultado negativo ("nenhum vazamento", "nenhuma conta") significa que **aquela fonte não reportou correspondência** — não que a exposição não exista. Nove das vinte ferramentas dependem de chaves e limites de provedores terceiros; quatro dependem de binários externos (`holehe`, `sherlock`, `sublist3r`, `phoneinfoga`) que você mesmo mantém atualizados.

## Desafio

No REPL (`openosint`), investigue **o seu próprio e-mail** — alvo 100% autorizado. No relatório gerado em `reports/`, identifique: (1) qual achado disparou um pivô; (2) uma afirmação que você consegue rastrear até a ferramenta de origem; (3) uma ausência que o relatório **não** tem o direito de interpretar como segurança.

## Ética e escopo

Uso legal e autorizado apenas. A ferramenta consulta fontes públicas e semipúblicas; não burla autenticação. Responsabilidade legal (LGPD inclusive) é de quem opera. Leia o DISCLAIMER do projeto antes de qualquer alvo que não seja seu.
