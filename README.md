# Skylia_Previsao_Queda_Energia
O projeto **Skyliä** tem como objetivo prever **quedas de energia** com base em eventos climáticos extremos, como chuvas intensas e alagamentos, otimizando a atuação de equipes de manutenção em São Paulo.

## Objetivo

Desenvolver um sistema de análise e previsão de quedas de energia elétrica, integrando dados climáticos históricos, eventos de alagamento e infraestrutura elétrica, com visualização em **dashboards interativos** no Power BI.
---
## Tecnologias utilizadas

- Python (pandas, sklearn, requests)
- MongoDB (armazenamento NoSQL)
- Apache Airflow (orquestração de pipelines)
- Power BI (dashboard e interface)
- Web Scraping (coleta de dados CGE/INMET)
- API Meteomatic
---
## Funcionalidades

- Previsão de risco de queda de energia
- Visualização de alagamentos e zonas críticas
- Integração com previsão meteorológica
- Priorização de regiões com hospitais e escolas
- Mapas interativos e alertas em tempo real
---
## Estrutura dos dados

- `quedas_energia.csv`: histórico de interrupções por bairro
- `clima.csv`: temperatura, chuva, vento por hora e região
- `alagamentos.csv`: datas e locais de enchentes em SP
## Fontes Públicas
- API -> MeteoMatics
- CSV -> INMENT , BPMEP , ANEEL
- WEBSCRAPING -> CGE
---
## Resultados

- Dashboards interativos com histórico e previsão
- Gráficos de tendência e comparação por bairro
- Integração de múltiplas fontes públicas em uma única visão


Veja um exemplo: [Skyliä_Sprint4_architecture (1).pdf](https://github.com/user-attachments/files/21145725/Skylia_Sprint4_architecture.1.pdf)

