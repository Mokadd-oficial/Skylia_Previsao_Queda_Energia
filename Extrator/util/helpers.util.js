/**
 * Função sleep
 *
 * Pausa a execução por um determinado número de milissegundos.
 *
 * @param {number} ms - O número de milissegundos para aguardar.
 * @returns {Promise} - Uma promessa que resolve após o tempo especificado.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Função arrayTableToObject
 *
 * Converte duas arrays em um array de objetos. A primeira array representa os nomes das colunas
 * e a segunda array contém os valores correspondentes às colunas.
 *
 * @param {Array<string>} columns - Array de strings representando os nomes das colunas.
 * @param {Array<Array<any>>} values - Array de arrays contendo os valores de cada linha.
 * @returns {Array<Object>} - Array de objetos onde cada objeto mapeia os nomes das colunas aos seus respectivos valores.
 *
 * @example
 * const columns = ['name', 'age'];
 * const values = [['Alice', 30], ['Bob', 25]];
 * const result = arrayTableToObject(columns, values);
 * // Resultado: [{name: 'Alice', age: 30}, {name: 'Bob', age: 25}]
 */
const arrayTableToObject = (columns, values) => {
  return values.map((line) => {
    let obj = {};
    columns.forEach((column, i) => {
      obj[column] = line[i];
    });
    return obj;
  });
};

/**
 * Função generateDateRange
 *
 * Gera uma lista de datas no formato 'YYYY-MM-DD' entre duas datas, inclusivo.
 *
 * @param {string|Date} startDate - A data inicial no formato 'YYYY-MM-DD' ou um objeto Date.
 * @param {string|Date} endDate - A data final no formato 'YYYY-MM-DD' ou um objeto Date.
 * @returns {Array<string>} - Array de strings representando as datas no formato 'YYYY-MM-DD' dentro do intervalo especificado.
 *
 * @example
 * const startDate = '2023-09-01';
 * const endDate = '2023-09-03';
 * const result = generateDateRange(startDate, endDate);
 * // Resultado: ['2023-09-01', '2023-09-02', '2023-09-03']
 */
const generateDateRange = (startDate, endDate) => {
  const result = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1);

  while (currentDate < end) {
    result.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};

module.exports = { sleep, arrayTableToObject, generateDateRange };
