# Contribua com uma explicação reproduzível

Use templates/guide.md. Um guia deve responder a uma pergunta concreta e incluir comando mínimo, fixture sintética, resultado esperado, limite da analogia, controle negativo, troubleshooting e fonte oficial.

Atualize catalog.json e crie guides/<id>.md. Confira o painel em tela estreita e com teclado. Não inclua tokens, dados de clientes ou IOCs fictícios apresentados como reais. Não copie documentação integral: explique com palavras próprias e cite a fonte.

Execute python3 scripts/validate.py e descreva quais comandos realmente foram testados, incluindo versões. Guias sem execução completa podem entrar com limitações explícitas; não podem afirmar validação que não ocorreu.
