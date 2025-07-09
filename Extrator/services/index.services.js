/**
 * Módulo de serviço CGESP
 *
 * Este módulo coleta e processa dados de alagamentos a partir do site da CGESP.
 * Utiliza a biblioteca Axios para realizar requisições HTTP, Cheerio para parsear o HTML,
 * e Moment.js para formatar datas. A coleta ignora certificados HTTPS inválidos.
 */

const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");
const moment = require("moment");
const logger = require("../../utils/logger.service");

const agent = new https.Agent({
  rejectUnauthorized: false, // Ignora erros de certificado SSL
});

/**
 * Classe CgespService
 *
 * Esta classe coleta dados sobre alagamentos no site da CGESP baseado em uma data especificada.
 */
class CgespService {
  /**
   * Construtor da classe CgespService
   *
   * @param {string} date - Data fornecida para realizar a busca de alagamentos no formato "DD/MM/YYYY".
   */
  constructor(date) {
    // URL de busca com a data formatada
    this.url = `https://www.cgesp.org/v3/alagamentos.jsp?dataBusca=${moment(
      date
    ).format("DD/MM/YYYY")}&enviaBusca=Buscar`;

    // Array para armazenar os dados coletados
    this.data = [];
  }

  /**
   * Método assíncrono scrapper
   *
   * Faz a requisição para o site da CGESP, coleta o HTML e processa as informações sobre alagamentos.
   * Os dados são armazenados na variável `data` da instância da classe.
   *
   * O método lida com os seguintes elementos do HTML:
   * - H1: Nome da zona da cidade (ex: Zona Sul, Zona Norte).
   * - Tabela (table): Contém os bairros, pontos de alagamento e detalhes como status, local e horários.
   *
   * @returns {Promise<void>} - Retorna uma Promise que resolve após a conclusão da coleta de dados.
   */
  async scrapper() {
    try {
      // Log de início da coleta
      logger.info(`Coletando o HTML da página: ${this.url}`);

      // Faz a requisição para a URL da CGESP, ignorando certificados SSL inválidos
      const { data, status } = await axios.get(this.url, { httpsAgent: agent });
      if (status != 200) {
        throw new Error(`${status} - ${data}`);
      }
      logger.info(`Axios response status code: ${status}`);

      // Carrega o HTML coletado usando Cheerio
      const $ = cheerio.load(data);

      logger.info("Coletando os dados do HTML da página");

      let zone = "";

      // Percorre os elementos filhos da classe .content
      $("#bd > div.fundo_ponto_escuro > div.yui3-u.col-alagamentos > .content")
        .children()
        .each((i, element) => {
          // Verifica se o elemento é um título de zona (H1)
          if (element.tagName.toUpperCase() === "H1") {
            zone = $(element).text().trim(); // Coleta o nome da zona
          }

          // Verifica se o elemento é uma tabela contendo os dados dos alagamentos
          if (element.tagName.toUpperCase() === "TABLE") {
            let neighborhood = "";
            let point = 0;
            let temp = [];

            // Percorre as células da tabela
            $(element)
              .find("td")
              .each((i, cell) => {
                switch (i) {
                  // Nome do bairro
                  case 0:
                    neighborhood = $(cell).text().trim();
                    break;

                  // Ponto de alagamento
                  case 1:
                    point = $(cell).text().trim().replace(/[^\d]/g, ""); // Remove caracteres não numéricos
                    break;

                  // Informações detalhadas (status, local, sentido, referência e horários)
                  case 2:
                    temp.push({
                      status: $($(cell).find("li")[4]).attr("title"), // Status do alagamento
                      local: $(cell)
                        .find(".col-local")
                        .html()
                        .trim()
                        .split(" a ")[1]
                        .split("<br>")[1], // Local do alagamento
                      way: $($(cell).find("li")[4])
                        .html()
                        .split("<br>")[0]
                        .replace("Sentido: ", ""), // Sentido da via
                      reference: $($(cell).find("li")[4])
                        .html()
                        .split("<br>")[1]
                        .replace("Referência: ", ""), // Referência do local
                      hour: {
                        start: $(cell)
                          .find(".col-local")
                          .text()
                          .trim()
                          .split(" a ")[0]
                          .replace("De ", ""), // Hora de início
                        end: $(cell)
                          .find(".col-local")
                          .html()
                          .trim()
                          .split(" a ")[1]
                          .split("<br>")[0], // Hora de término
                      },
                    });
                    break;
                }
              });

            // Armazena os dados coletados no array `data`
            this.data.push({
              zone,
              neighborhood,
              point,
              alarms: temp,
            });
          }
        });

      // Log de sucesso após a coleta
      logger.info("Dados coletado com sucesso!");
    } catch (e) {
      // Log de erro se ocorrer falha na requisição ou processamento
      logger.error(`Erro ao coletar dados da CGESP: [${this.url}] - `, e);
    }
  }

  /**
   * Método getObject
   *
   * Retorna os dados coletados pela função `scrapper()`.
   *
   * @returns {Array} - Array de objetos com os dados dos alagamentos.
   */
  getObject() {
    return this.data;
  }
}

module.exports = CgespService;
