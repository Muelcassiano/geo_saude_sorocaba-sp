# Geo Saúde Sorocaba (SP) — Busca de Endereço, Abrangência Territorial e Delimitação de UBSs

> **Sistema Geográfico de Territorialização, Georreferenciamento de Endereços e Apoio à Rede de Atenção Básica e Vigilância em Saúde de Sorocaba (SP)**

[![Sorocaba](https://img.shields.io/badge/Munic%C3%ADpio-Sorocaba%20(SP)-034ea2.svg)](https://www.sorocaba.sp.gov.br/)
[![Secretaria da Saúde](https://img.shields.io/badge/Secretaria%20da%20Sa%C3%BAde-SES%20Sorocaba-059669.svg)](https://saude.sorocaba.sp.gov.br/)
[![Vigilância em Saúde](https://img.shields.io/badge/%C3%81rea-Vigil%C3%A2ncia%20em%20Sa%C3%BAde-2563eb.svg)](https://sites.google.com/view/vigilancia-sanitaria?pli=1&authuser=0)
[![Natureza do Projeto](https://img.shields.io/badge/Projeto-N%C3%A3o%20Oficial%20%2F%20Iniciativa%20de%20Servidor-amber.svg)]()
[![Geoprocessamento](https://img.shields.io/badge/SIG-QGIS%20%7C%20Leaflet%20%7C%20Turf.js-7c3aed.svg)]()
[![Status](https://img.shields.io/badge/Status-Produ%C3%A7%C3%A3o%20%2F%20Ativo-success.svg)](https://ruas-ubs-sorocaba.vercel.app/)

---

## 🏛️ Contexto e Origem do Projeto

O **Geo Saúde Sorocaba** nasceu de uma demanda estratégica real vivenciada nas rotinas do setor de **Vigilância em Saúde** da **Secretaria da Saúde do Município de Sorocaba (SP)**.

Nas operações diárias dos serviços públicos de saúde, a localização ágil e exata da Unidade Básica de Saúde (UBS) de referência e da respectiva microrregião sanitária do munícipe é etapa determinante para múltiplos fluxos essenciais do Sistema Único de Saúde (SUS), tais como:

1. **Vigilância Epidemiológica e Sistemas Oficiais do DataSUS**:
   - Qualificação, validação territorial e alimentação de fichas de notificação compulsória no **SINAN** (Sistema de Informação de Agravos de Notificação).
   - Inserção territorial correta em declarações e certidões no **SIM** (Sistema de Informações sobre Mortalidade) e **SINASC** (Sistema de Informações sobre Nascidos Vivos).
   - Rastreamento geoespacial de casos, investigações de surtos, bloqueios vacinais de emergência e busca ativa no território.

2. **Divisão de Zoonoses e Controle Vetorial**:
   - Orientação cartográfica e padronização territorial para cadastro e preenchimento de **Boletins de Atividades de Campo** (visitas zoossanitárias, monitoramento de escorpiões, leishmaniose e vistorias de arboviroses — Dengue, Chikungunya e Zika vírus).
   - Definição precisa das áreas de abrangência para ações de nebulização veicular/costal, controle químico e direcionamento estratégico dos Agentes de Combate às Endemias (ACE).

3. **Rede de Atenção Primária à Saúde (APS)**:
   - Encaminhamentos assertivos de munícipes para a sua unidade de saúde de vínculo territorial (Estratégia Saúde da Família e Atenção Básica).
   - Apoio a médicos, enfermeiros, recepcionistas e assistentes sociais no direcionamento territorial correto de pacientes.
   - Planejamento logístico, alocação de equipes multiprofissionais e dimensionamento de insumos com base em divisas sanitárias reais.

4. **Acesso Cidadão e Transparência Pública**:
   - Disponibilização de uma ferramenta rápida, moderna, responsiva e acessível para que qualquer cidadão de Sorocaba consulte facilmente qual é a sua UBS de referência, o endereço oficial da unidade, o código da microrregião sanitária e os horários de atendimento (incluindo unidades com Pronto Atendimento 24 horas), necessitando apenas digitar o nome da rua, número predial ou CEP.

---

## 🗺️ Engenharia Geoespacial e Geoprocessamento com QGIS

A estrutura cartográfica do projeto foi construída através de um rigoroso fluxo de **Geoprocessamento com QGIS** (software livre de Sistema de Informação Geográfica), combinando bases vetoriais oficiais, demografia censitária e malha viária urbana:

1. **Integração com a Malha Censitária do IBGE (Censo Demográfico)**:
   - Importação das camadas de setores censitários do IBGE referentes a todo o município de Sorocaba.
   - Harmonização e reprojeção cartográfica entre o referencial SIRGAS 2000 / UTM Zone 23S (EPSG:31983) e o sistema geográfico WGS 84 (EPSG:4326), adotado em cartografia web.
   - Análise demográfica espacial, densidade de moradias e consideração de barreiras físicas e urbanísticas (rodovias, ferrovias, rios, córregos e relevo topográfico) para fundamentar as divisas entre microrregiões sanitárias.

2. **Vetorização e Validação Topológica das 33 Microrregiões de UBSs**:
   - Construção dos polígonos correspondentes às áreas de abrangência das **33 Unidades Básicas de Saúde** municipais de Sorocaba.
   - Execução de testes de consistência topológica no QGIS: eliminação de lacunas (*gaps*), saneamento de sobreposições indevidas (*overlaps*) e dissolução controlada (*dissolve*) por código de microrregião de saúde.
   - Simplificação geométrica controlada (Douglas-Peucker) sem perda de precisão nas divisas, garantindo carregamento ultrarrápido em navegadores web e smartphones.

3. **Cálculo de Centróides e Posicionamento Cartográfico Inteligente**:
   - Extração algorítmica de centróides de superfície (*point on surface*) e centróides geométricos verdadeiros para cada uma das 33 áreas de UBS.
   - Esses baricentros alimentam o motor da aplicação no Leaflet para fixação de marcadores e rótulos flutuantes com o nome da UBS, além de guiar a animação de câmera e os cálculos de enquadramento (*fitBounds*).

4. **Tratamento da Base Cadastral de Lotes Urbanos**:
   - Georreferenciamento e conversão de mais de **240.000 pontos cadastrais de lotes urbanos** de Sorocaba com vínculo direto à respectiva UBS municipal atribuída.
   - Segmentação e compactação da base de lotes em arquivos JSON modulares carregados em paralelo e indexados diretamente na memória RAM do navegador (`Map` hash O(1)).

5. **Acervo de Logradouros Arteriais e Múltiplos Bairros**:
   - Estruturação de dicionário cartográfico oficial de logradouros extensos de Sorocaba que atravessam múltiplos bairros e microrregiões (ex: *Avenida Ipanema* com 27 bairros, *Avenida Itavuvu* com 14 bairros, *Rodovia Raposo Tavares* com 8 bairros, *Avenida Dom Aguirre*, *Avenida São Paulo*, entre outras).

---

## 🌟 Principais Funcionalidades da Aplicação

### 1. Mecanismo de Busca Inteligente e Multifacetado
A aplicação aceita diversos formatos de entrada em uma única caixa de busca:
- **Por Logradouro** (ex: `Avenida Itavuvu`, `Rua Paraná`, `Rua João Roman Lopes`).
- **Por Logradouro com Número do Imóvel** (ex: `Avenida Brasil 60`, `Rua João Roman Lopes 19`), localizando o lote exato ou realizando interpolação numérica municipal imediata.
- **Por CEP** com ou sem hífen (ex: `18055-023` ou `18072805`), identificando a via, o bairro e a UBS de cobertura.
- **Por CEP com Número Residencial** (ex: `18055-023 100`), direcionando para o trecho exato do imóvel.

### 2. Desambiguação Limpa de Logradouros com Nomes Similares
- Quando o usuário digita termos com múltiplas ocorrências na malha urbana (ex: digitando `"paraná"`, onde coexistem a *Rua Paraná* e a *Avenida Paraná*, ou nomes com patronímicos semelhantes), a aplicação abre uma janela de escolha clara e limpa.
- **Supressão de Bairros Prematuros**: os botões de seleção de logradouros similares exibem estritamente o tipo e o nome oficial da via (`RUA PARANÁ`, `AVENIDA PARANÁ`), suprimindo associações prematuras ou contraditórias de bairros nessa fase inicial.
- Ao clicar em uma das opções, o campo de busca é imediatamente preenchido com o nome oficial da via escolhida e a pesquisa avança com precisão cirúrgica.

### 3. Inteligência de Segmentação Territorial de Vias
A aplicação classifica dinamicamente o comportamento territorial do logradouro pesquisado:
- **Vias de Bairro e CEP Únicos** (ex: *Rua Paraná*, no Centro, ou *Rua João Roman Lopes*, no Wanel Ville):
  - Identifica que todos os lotes pertencem à mesma UBS e que há um CEP único oficial no ViaCEP.
  - Exibe diretamente o endereço completo, o bairro, o CEP oficial formatado e a UBS correspondente, sem abrir modais desnecessários.
- **Vias de Dois Bairros** (ex: *Rua Aparecida*, *Rua São Bento*, *Avenida Paraná*):
  - Exibe no painel principal os dois bairros atendidos com tags interativas e clicáveis separadas por divisor (`Vila Santana • Jardim Santa Rosália`).
  - Um clique em qualquer uma das tags do bairro seleciona aquele trecho instantaneamente.
  - Oferece também o botão `[🏘️ Ver bairros]` para abertura da lista.
- **Vias Arteriais Extensas (3 ou mais bairros)** (ex: *Avenida Ipanema*, *Avenida Itavuvu*, *Rodovia Raposo Tavares*):
  - Informa no painel que a via abrange múltiplos bairros ao longo de sua extensão.
  - Abre automaticamente (ou através do botão `[🏘️ Ver relação de todos os bairros]`) uma janela suspensa moderna e responsiva com a lista alfabética completa de todos os bairros interceptados pela via.

### 4. Seleção Direta de Bairros com Sincronização Total em Tempo Real
- Ao clicar em qualquer bairro da lista suspensa (ou nas tags de bairros da via):
  - O modal é fechado e o campo de texto é atualizado (ex: `Avenida Paraná - Cajuru do Sul`).
  - O painel de endereço da aplicação é atualizado no mesmo instante com o logradouro e o bairro escolhido.
  - É exibido o botão prático `[🔄 Trocar Bairro]`, permitindo ao usuário alterar o bairro selecionado a qualquer momento sem precisar redigitar.
  - O sistema busca o CEP correspondente àquele bairro no logradouro.
  - A UBS de referência daquele trecho específico é identificada e destacada no mapa com preenchimento em verde esmeralda e rótulo centralizado.
  - A câmera do mapa é centrada e ajustada com zoom detalhado diretamente no trecho do bairro selecionado.

### 5. Georreferenciamento Exato e Interpolação Numérica Municipal
- Ao informar o número predial da residência, o motor verifica a presença do número no banco cadastral de lotes.
- Se o número exato existir, o marcador é posicionado exatamente sobre a coordenada do lote municipal.
- Se a numeração não constar expressamente no cadastro, a aplicação realiza interpolação espacial proporcional entre os lotes numerados anterior e posterior da mesma via, posicionando o usuário de maneira fidedigna e informando a aproximação inteligente.

### 6. Popups Cartográficos e Modal Completo das UBSs
- Destaque vetorial das divisas com estilo translúcido moderno em verde esmeralda (`#10b981`).
- Marcador no centróide com rótulo permanente indicando o nome da UBS.
- Clique sobre o link da UBS no painel de resultados ou no mapa abre o modal informativo contendo:
  - Nome completo da Unidade Básica de Saúde.
  - Código oficial da microrregião sanitária municipal.
  - Endereço físico completo da unidade.
  - Horários detalhados de funcionamento durante a semana e horários de urgência/emergência em fins de semana e feriados para unidades com Pronto Atendimento (PA 24 horas).

### 7. Acessibilidade, Responsividade e Dark Mode
- Layout adaptativo concebido tanto para computadores de mesa quanto para celulares e tablets em campo.
- Alternância nativa de **Tema Claro / Tema Escuro (Dark Mode)** com persistência da preferência do usuário no `localStorage`.
- Tratamento cuidadoso de contraste, tipografia legível e padrões de usabilidade que dispensam treinamentos complexos.

---

## 🏗️ Arquitetura Técnica e Fluxo de Dados

```
                      [ Entrada do Usuário ]
                 (Logradouro / Número / CEP)
                             |
                [ Sanitização e Normalização ]
                             |
             +---------------+---------------+
             |                               |
    [ Formato CEP? ]                [ Nome de Via ]
             |                               |
      ViaCEP API (JSON)            Índice de Lotes em Memória
             |                     (240 mil lotes cadastrais)
             |                               |
             +---------------+---------------+
                             |
             [ Verificação de Ambiguidade ]
             - Múltiplas vias similares? -> Modal de Desambiguação
             - Via com 3+ bairros? -> Modal de Relação de Bairros
             - Via com 2 bairros? -> Tags Clicáveis no Painel
             - Via de bairro único? -> Resolução Direta
                             |
             [ Seleção de Bairro / Trecho ]
             - Filtra lotes e UBSs daquele trecho
             - Consulta CEP do trecho (ViaCEP)
             - Localiza coordenada de referência
                             |
             [ Renderização Geoespacial ]
             - Leaflet: Marcador + Popup no Trecho
             - Turf.js: Interseção e Polígono da UBS
             - Destaque em Verde Esmeralda (#10b981)
             - Painel Dinâmico + Botão [Trocar Bairro]
```

### Tecnologias e Bibliotecas Utilizadas

- **Geoprocessamento e SIG**:
  - [QGIS Desktop](https://qgis.org/) — Edição topológica, reprojeção SIRGAS 2000 / WGS 84, cálculo de centróides e espacialização de setores censitários do IBGE.
- **Frontend Core**:
  - HTML5 semântico, CSS3 com variáveis nativas e JavaScript ES6+ Vanilla (zero dependência de frameworks pesados, garantindo carregamento instantâneo em conexões móveis de campo).
- **Cartografia Web e Geometria Computacional**:
  - [Leaflet.js](https://leafletjs.com/) v1.9.4 — Visualização cartográfica, gerenciamento de camadas vetoriais e controles interativos.
  - [Turf.js](https://turfjs.org/) v6.5.0 — Análise espacial vetorial no navegador (`booleanPointInPolygon`, cálculo de centróides, comprimentos e interpolação de pontos).
  - OpenStreetMap & Nominatim — Geocodificação reversa de apoio e complementação de subdivisões viárias.
  - ViaCEP API — Validação postal oficial e sincronização de CEPs por logradouro e bairro.
- **Servidor e Hospedagem**:
  - Node.js com Express e compressão Gzip (`compression`), servido em contêiner de alta disponibilidade.

---

## 📖 Instruções de Uso

### 1. Pesquisa por Nome de Rua ou Avenida
- Digite o nome da via no campo de busca (ex: `Avenida General Carneiro` ou `Rua João Roman Lopes`) e clique em **Buscar** (ou pressione a tecla `Enter`).
- Se a via for extensa e abranger 3 ou mais bairros (ex: *Avenida Ipanema*), a relação de bairros atendidos será exibida imediatamente na tela.
- Se a via abranger dois bairros (ex: *Avenida Paraná*), os dois bairros aparecerão destacados como botões interativos no painel.
- Se a via for de bairro único, o sistema já apresenta o bairro, o CEP oficial e a UBS responsável.

### 2. Pesquisa de Nomes com Variações Similares
- Digite apenas o nome base (ex: `parana`).
- Uma janela suspensa apresentará as opções existentes (ex: `RUA PARANÁ`, `AVENIDA PARANÁ`).
- Clique sobre a opção desejada. A aplicação atualizará o campo com a via selecionada e prosseguirá diretamente para a identificação do território e da UBS.

### 3. Seleção de Bairro em Vias Extensas
- Ao abrir a lista de bairros de uma avenida (ex: *Avenida Ipanema*):
  - Localize o seu bairro na relação em ordem alfabética.
  - Clique sobre o bairro desejado.
  - A janela fechará instantaneamente e o painel de endereço será atualizado com o seu bairro, o CEP do trecho e a UBS exata que cobre aquela localidade.
  - O mapa se deslocará para o trecho correto e contornará o polígono da sua UBS em verde esmeralda.
  - Caso queira consultar outro bairro da mesma via, basta clicar no botão **[🔄 Trocar Bairro]** no painel de resultados.

### 4. Pesquisa por Logradouro com Número Residencial
- Digite a via e o número do imóvel (ex: `Avenida Brasil 60` ou `Rua João Roman Lopes 19`).
- O sistema cruzará a numeração com a base cadastral municipal, posicionando o marcador no imóvel e confirmando a UBS de referência da residência.

### 5. Pesquisa por CEP
- Digite o CEP no formato `18055-023` ou apenas os números `18055023`.
- A aplicação localiza a via associada e determina a abrangência da UBS correspondente.
- Também é possível digitar o CEP seguido do número do imóvel (ex: `18055-023 100`).

### 6. Consulta de Detalhes da UBS
- No painel de resultados ou no marcador do mapa, clique no link em verde da UBS (ex: `📍 UBS Wanel Ville - Cod. Microrregião (47)`).
- Uma janela suspensa apresentará o endereço completo da unidade, horários de funcionamento em dias úteis e funcionamento de urgência/emergência em finais de semana (para unidades com PA 24h).

### 7. Alternância de Modo Claro e Modo Escuro
- Clique no ícone de sol (`☀️`) ou lua (`🌙`) localizado no canto superior direito da página para alternar entre os temas claro e escuro a qualquer instante.

---

## 👤 Autores

**Samuel Abreu:**  
*Servidor Público Municipal na Secretaria da Saúde de Sorocaba (SP)*  
*Desenvolvedor de Software & Cientista de Dados*  
- **Email:** [samuel.abreux@gmail.com](mailto:samuel.abreux@gmail.com)  
- **Especialidades:** Geoprocessamento e Engenharia Geoespacial (QGIS/GIS), Modelagem de Dados Territoriais em Saúde Pública, Arquitetura de Aplicações Web de Alta Performance e Modernização Tecnológica no Setor Público.

##
**João Enser:**  
_Biologo, Mestre pela Universidade de São Paulo - USP, entusiasta de Inteligência Artificial e Ciencia de Dados / Servidor Púiblico da Divisão de Zoonoses no Setor de Vigilância e Saúde de Sorocaba - SP_

---

## 👥 Créditos Institucionais

- **Desenvolvimento e Geoprocessamento**: Samuel Abreu (Vigilância em Saúde / Secretaria da Saúde de Sorocaba).
- **Apoio e Contexto Institucional**:
  - Prefeitura Municipal de Sorocaba (SP).
  - Secretaria da Saúde de Sorocaba (SES).
  - Setor de Vigilância em Saúde: Vigilância Epidemiológica (SINAN, SIM, SINASC) e Divisão de Zoonoses (Controle de Arboviroses e Boletins de Campo).
- **Fontes de Dados e Bases Cartográficas**:
  - Instituto Brasileiro de Geografia e Estatística (IBGE) — Malha Censitária e Censo Demográfico.
  - Cadastro Técnico Municipal e Malha de Lotes Urbanos de Sorocaba.
  - Delimitação Territorial das 33 Unidades Básicas de Saúde (SES Sorocaba).
  - OpenStreetMap & Contribuidores.
  - Empresa Brasileira de Correios e Telégrafos (ViaCEP).

---

## 📄 Licença e Declaração de Uso

Este projeto é **NÃO oficial**. Embora tenha sido idealizado e desenvolvido por servidores públicos lotados na **Secretaria da Saúde do Município de Sorocaba (SP)**, destina-se a fins de **uso institucional público, acadêmico e educacional**, concebido com o propósito de aprimorar os serviços públicos de saúde municipal prestados à população de Sorocaba (SP), facilitar o trabalho de equipes de saúde e vigilância sanitária/epidemiológica e promover a cidadania e a transparência pública no Sistema Único de Saúde (SUS).
