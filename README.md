# Geo Saúde Sorocaba (SP) — Busca de Endereço, Abrangência Territorial e Delimitação de UBSs

> **Sistema Geográfico Institucional de Territorialização e Apoio à Rede de Atenção Básica e Vigilância em Saúde de Sorocaba (SP)**

[![Prefeitura de Sorocaba](<https://img.shields.io/badge/Prefeitura%20Municipal-Sorocaba%20(SP)-034ea2.svg>)](https://www.sorocaba.sp.gov.br/)
[![Secretaria da Saúde](https://img.shields.io/badge/Secretaria%20da%20Sa%C3%BAde-SES%20Sorocaba-059669.svg)](https://saude.sorocaba.sp.gov.br/)
[![Vigilância em Saúde](https://img.shields.io/badge/%C3%81rea-Vigil%C3%A2ncia%20em%20Sa%C3%BAde-2563eb.svg)](https://sites.google.com/view/vigilancia-sanitaria?pli=1&authuser=0)
[![Status](https://img.shields.io/badge/Status-Produ%C3%A7%C3%A3o%20%2F%20Ativo-success.svg)](ruas-ubs-sorocaba.vercel.app)

---

## 🏛️ Contexto e Origem do Projeto

O **Geo Saúde Sorocaba** nasceu de uma demanda estratégica real no âmbito do setor de **Vigilância em Saúde** da **Secretaria da Saúde da Prefeitura Municipal de Sorocaba**.

Nas rotinas diárias dos serviços públicos de saúde municipal, a identificação ágil e precisa da Unidade Básica de Saúde (UBS) de referência e da respectiva microrregião territorial do munícipe é etapa crucial para múltiplos fluxos essenciais do Sistema Único de Saúde (SUS), incluindo:

1. **Vigilância Epidemiológica e Sistemas Oficiais do DataSUS**:
   - Qualificação, validação e inserção de dados em fichas de notificação de agravos e doenças transmissíveis no **SINAN** (Sistema de Informação de Agravos de Notificação).
   - Localização territorial correta em declarações e registros vitais do **SIM** (Sistema de Informações sobre Mortalidade) e **SINASC** (Sistema de Informações sobre Nascidos Vivos).
   - Rastreamento e investigação epidemiológica de surtos, bloqueios vacinais e busca ativa territorial.

2. **Divisão de Zoonoses**:
   - Orientação e padronização territorial para cadastro e preenchimento de **Boletins de Atividades de Campo** (visitas zoossanitárias, vistorias de controle de arboviroses como Dengue, Chikungunya e Zika, vigilância de escorpiões e leishmaniose).
   - Definição precisa das áreas de abrangência para ações de nebulização, bloqueio de transmissão e visitas de Agentes de Combate às Endemias (ACE).

3. **Rede de Atenção Primária e Secretaria da Saúde**:
   - Encaminhamentos assertivos de pacientes para sua unidade de saúde de vínculo territorial (estratégia de Saúde da Família e Atenção Básica).
   - Padronização de microrregiões para equipes multiprofissionais, regulação ambulatorial e planejamento orçamentário e logístico em saúde.

4. **Acesso Cidadão e Transparência Pública**:
   - Interface pública limpa, responsiva e acessível para que qualquer cidadão sorocabano descubra instantaneamente sua UBS de referência, horário de atendimento, código da microrregião e rota física, utilizando apenas o nome da rua, número residencial ou CEP.

---

## 🗺️ Engenharia Geoespacial e Geoprocessamento com QGIS

Para estruturar a malha territorial com rigor métrico e fidelidade sanitária, foi empregado um fluxo avançado de **Geoprocessamento com QGIS** (software SIG livre e de código aberto):

1. **Camadas Censitárias do IBGE (Censo Demográfico)**:
   - Importação e harmonização das malhas de setores censitários do IBGE do município de Sorocaba em formato shapefile/geopackage.
   - Normalização dos sistemas de coordenadas de referência (reprojeção de SIRGAS 2000 / UTM Zone 23S para WGS 84 / EPSG:4326).
   - Cruzamento demográfico de densidade populacional e barreiras geográficas urbanas (rodovias, ferrovias, bacias hidrográficas e acidentes topográficos) para subsidiar a divisão das áreas sanitárias.

2. **Delimitação e Ordenação das 33 Microrregiões de UBSs**:
   - Construção e vetorização dos polígonos de abrangência das 33 Unidades Básicas de Saúde municipais.
   - Aplicação de rotinas topológicas no QGIS para validação de geometrias: correção de frestas (_gaps_), sobreposições espúrias (_overlaps_) e dissolução (_dissolve_) por código de microrregião sanitária.
   - Ordenação espacial e simplificação de Douglas-Peucker controlada, permitindo altíssima acurácia com geometria leve otimizada para navegadores web e dispositivos móveis.

3. **Extração Cartográfica de Centróides e Rotulagem**:
   - Geração de centróides geométricos verdadeiros (_true centroids_) e de superfície (_point on surface_) para cada polígono de UBS via algoritmos nativos do QGIS.
   - Esses centróides alimentam o motor de renderização da aplicação para posicionamento automático de rótulos visuais flutuantes, centralização dinâmica de câmera e enquadramento de bounds no Leaflet.

4. **Processamento da Base de Lotes Cadastrais**:
   - Georreferenciamento e conversão de mais de 240.000 pontos cadastrais de lotes urbanos de Sorocaba com vínculo direto à UBS atribuída, estruturados em chunks compactados para carregamento instantâneo.

---

## 🌟 Principais Funcionalidades da Aplicação

- **Mecanismo de Busca Híbrido e Unificado**:
  - Consulta por **Nome do Logradouro** (ex: `Avenida Itavuvu`, `Rua João Roman Lopes`).
  - Consulta por **Logradouro com Numeração Predial** (ex: `Avenida Brasil 60`, `Rua Nain 57`), realizando georreferenciamento exato ou interpolação municipal inteligente.
  - Consulta por **CEP** (ex: `18071-650` ou `18072805`), localizando o endereço e a abrangência sanitária com alta velocidade.
- **Detalhamento Máximo e Padronização de Bairros**:
  - Unificação de resultados entre todas as formas de busca (logradouro, CEP ou numeração).
  - Identificação de subdivisões específicas de loteamentos e vilas (ex: `Jardim Wanel Ville I`, `Parque São Bento II`, `Núcleo Habitacional Itanguá II`, `Golden Park II`), superando a limitação de macro-bairros genéricos.
- **Base Municipal de Lotes Integrada**:
  - Indexação espacial em memória de cerca de 240 mil lotes cadastrais do município de Sorocaba com atribuição oficial de UBS, garantindo resposta em frações de segundo.
- **Mapeamento Vetorial Interativo com Leaflet e Turf.js**:
  - Renderização instantânea dos polígonos das 33 microrregiões de UBSs de Sorocaba.
  - Identificação de vias que atravessam múltiplas microrregiões e destaque da unidade exata ao informar o número do imóvel.
  - Rótulos cartográficos automáticos centralizados no baricentro das áreas de abrangência.
- **Popups Informativos e Detalhados da UBS**:
  - Modal com endereço completo da unidade, horário de funcionamento (incluindo unidades com Pronto Atendimento estendido 24h/noturno) e código oficial da microrregião.
- **Acessibilidade e Usabilidade**:
  - Design totalmente responsivo (otimizado para smartphones, tablets e desktops em tela cheia).
  - Modo Escuro (Dark Mode) nativo com persistência de preferência via `localStorage`.
  - Tratamento resiliente de tolerâncias limítrofes entre divisas de bairros e vias arteriais.

---

## 🏗️ Arquitetura Técnica e Fluxo de Dados

```
[ Entrada do Usuário ] -> Logradouro / Número / CEP
         |
         +--> [ Validador e Sanitizador de Termos ]
                    |
      +-------------+-------------+
      |                           |
[ Busca por CEP ]        [ Busca por Logradouro ]
      |                           |
ViaCEP API (JSON)                 |
      |                           |
      +-------------+-------------+
                    |
       [ ROTA A: Base Municipal Local ]
       - 240.000 Lotes Cadastrais Geocodificados
       - Indexação Hash em Memória O(1)
       - Interpolação Numérica Turf.js
                    |
     (Encontrado?) -+-> SIM -> Renderiza UBS Municipal + Enriquecimento OSM
                    |
                    +-> NÃO -> [ ROTA B: Rede Global OSM / Nominatim ]
                                 - Geocodificação Reversa / Direta
                                 - Consulta de Polígonos Turf.js
                                 - Tolerância Espacial Limítrofe (até 800m)
                                 - Renderização no Mapa Leaflet
```

### Tecnologias Utilizadas

- **Sistemas de Informação Geográfica (SIG)**:
  - [QGIS Desktop](https://qgis.org/) — Processamento vetorial avançado, limpeza topológica, cálculo de centróides, espacialização de setores censitários do IBGE e delimitação das microrregiões de saúde.
- **Frontend Core**: HTML5 semântico, CSS3 Moderno com variáveis CSS dinâmicas para temas e JavaScript ES6+ Vanilla (alta performance, zero overhead de frameworks pesados).
- **Cartografia Web e Análise Espacial**:
  - [Leaflet.js](https://leafletjs.com/) v1.9.4 — Visualização cartográfica e manipulação de camadas interativas.
  - [Turf.js](https://turfjs.org/) v6.5.0 — Análise espacial vetorial client-side, cálculo de interseção booleana (`booleanPointInPolygon`, `booleanIntersects`), centróides e interpolação geográfica.
  - OpenStreetMap & Nominatim — Geocodificação detalhada de logradouros, bairros e subdivisões residenciais.
- **Servidor e Deploy**: Node.js com Express e compressão Gzip (`compression`), servido em ambiente cloud conteinerizado de alta disponibilidade.

---

## 📖 Instruções de Uso

1. **Por Nome de Rua ou Avenida**:
   - Digite o nome da via no campo de busca (ex: `Avenida Itavuvu` ou `Rua João Roman Lopes`) e clique em **Buscar** (ou tecle Enter).
   - O sistema destacará a via no mapa, informará a UBS que atende aquele trecho (ou as unidades envolvidas, caso a via perpasse mais de um território) e exibirá o bairro detalhado e CEP.
2. **Por Logradouro com Número**:
   - Digite o logradouro seguido do número residencial (ex: `Rua João Roman Lopes 19` ou `Avenida Brasil 60`).
   - O sistema calculará a posição exata ou aproximada do imóvel e informará a UBS definitiva da residência.
3. **Por CEP**:
   - Digite os 8 dígitos do CEP com ou sem hífen (ex: `18055-023` ou `18072805`).
   - A ferramenta converte a consulta, busca a localização precisa no território e apresenta a UBS com o bairro padronizado em nível máximo de detalhe.
4. **Consulta aos Dados da UBS**:
   - Clique sobre o link da UBS em verde no resultado ou no mapa para abrir o modal com o endereço oficial completo da unidade e o horário de atendimento ao cidadão.

---

## 👤 Autores

**Samuel Abreu:**  
_Desenvolvedor de Software & Cientista de Dados / Servidor Público da Divisão de Zoonoses no Setor de Vigilância e Saúde de Sorocaba - SP_

- **Email:** [samuel.abreux@gmail.com](mailto:samuel.abreux@gmail.com)
- **Foco de Atuação:** Engenharia de Dados, Georreferenciamento, Aplicações Web de Alta Performance, Arquitetura em Nuvem e Soluções para o Setor Público.

##
**João Enser:**  
_Biologo, Mestre pela Universidade de São Paulo - USP, entusiasta de Inteligência Artificial e Ciencia de Dados / Servidor Púiblico da Divisão de Zoonoses no Setor de Vigilância e Saúde de Sorocaba - SP_

---

## 📄 Licença

Este projeto é de uso institucional público e educacional, desenvolvido para aprimorar os serviços públicos de saúde municipal prestados à população de Sorocaba (SP).
