# RURALlink

> Conectando o campo com o futuro.

Site da **RURALlink**, um projeto de inclusão digital que propõe levar internet 4G/5G estável, acessível e simples de instalar para comunidades rurais. A página apresenta o problema da conectividade no campo, explica a solução, permite comparar planos e simula o processo de contratação.

![Página inicial da RURALlink](assets/screenshot.png)

## O problema

A falta de conectividade em áreas rurais limita oportunidades de estudo, trabalho, comercialização e comunicação. O projeto apresenta dados atribuídos ao IBGE/PNAD Contínua TIC 2024 para contextualizar esse desafio.

## Funcionalidades

- Página institucional com apresentação do projeto.
- Seção sobre os desafios de conectividade no meio rural.
- Abas interativas para ilustrar impactos na rotina.
- Comparador de planos com recomendação conforme distância da torre e quantidade de usuários.
- Três opções de planos: Normal, Plus e Premium.
- Guia visual de instalação em cinco etapas.
- Lista dos itens que acompanham o roteador.
- Perguntas frequentes (FAQ).
- Formulário de contratação com dados do cliente e endereço de instalação.
- Consulta de CEP por meio da API ViaCEP.
- Opções de pagamento apresentadas como Pix ou cartão.
- Atalhos de contato por WhatsApp e e-mail.
- Layout responsivo para diferentes tamanhos de tela.

## Planos apresentados

| Plano | Preço mensal | Alcance informado | Franquia |
|---|---:|---:|---:|
| Normal | R$ 99,00 | Até 50 km | 100 GB |
| Plus | R$ 119,00 | Até 75 km | 200 GB |
| Premium | R$ 149,00 | Até 100 km | 400 GB |

*Os valores, alcance e franquias acima são os apresentados nas telas do projeto.*

## Tecnologias e recursos

- **HTML5** — estrutura das páginas.
- **CSS3** — identidade visual, componentes e responsividade.
- **JavaScript** — interações, cálculo/recomendação de planos e validações.
- **ViaCEP** — consulta de endereço a partir do CEP.
- **QRCode.js** — geração visual de QR Code, caso esteja habilitada no código.
- **Google Fonts** — tipografia Source Serif 4 e Source Sans 3, conforme configuração do projeto.

## Capturas de tela

As imagens da interface estão na pasta `assets/`.

| Seção | Captura |
|---|---|
| Página inicial | `assets/01-inicio.png` |
| O problema | `assets/02-problema.png` |
| A solução | `assets/03-solucao.png` |
| Planos | `assets/04-planos.png` |
| Instalação e itens da caixa | `assets/05-instalacao-caixa.png` |
| Passo a passo | `assets/06-instalacao-passos.png` |
| Perguntas frequentes | `assets/07-perguntas-frequentes.png` |
| Formulário de contratação | `assets/08-contratacao-dados.png` |
| Endereço e pagamento | `assets/09-endereco-pagamento.png` |
| Contato e rodapé | `assets/10-contato-rodape.png` |

## Estrutura sugerida

```text
rurallink/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── screenshot.png
    ├── 01-inicio.png
    ├── 02-problema.png
    ├── 03-solucao.png
    ├── 04-planos.png
    ├── 05-instalacao-caixa.png
    ├── 06-instalacao-passos.png
    ├── 07-perguntas-frequentes.png
    ├── 08-contratacao-dados.png
    ├── 09-endereco-pagamento.png
    └── 10-contato-rodape.png
```

## Como executar

1. Faça o download ou clone este repositório.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` em um navegador.

Se o projeto utilizar APIs ou bibliotecas externas, será necessária conexão com a internet para carregar esses recursos. Para testar o formulário e integrações externas, confira as configurações descritas no código.

## Configurações importantes

Antes de publicar, confira no `script.js` (ou no arquivo em que estiverem definidas) as configurações de contato, e-mail, chave Pix e demais dados de recebimento. Evite colocar informações pessoais ou credenciais em um repositório público. Para um projeto real, prefira manter dados sensíveis fora do código-fonte.

Também confirme se os meios de pagamento estão integrados a um serviço de pagamento real. A geração de um QR Code ou a exibição de uma opção de pagamento, por si só, não confirma que uma transação foi processada.

## Publicação no GitHub Pages

Se o projeto for composto apenas por arquivos estáticos:

1. Envie `index.html`, `style.css`, `script.js`, `README.md` e a pasta `assets/` para o repositório.
2. Acesse **Settings > Pages** no GitHub.
3. Em **Build and deployment**, selecione a opção de publicação pela branch.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Salve e aguarde a publicação.

O GitHub exibirá o endereço público do site na própria página de configurações do Pages.

## Contato

Os canais de contato exibidos na versão de demonstração do site devem ser revisados antes da publicação pública, para garantir que pertencem ao responsável pelo projeto e estão autorizados para divulgação.

## Autor

Projeto desenvolvido por **João Paulo**.

## Licença

Defina uma licença antes de permitir reutilização do código. Se não houver uma licença explícita, os direitos autorais permanecem reservados ao autor.
