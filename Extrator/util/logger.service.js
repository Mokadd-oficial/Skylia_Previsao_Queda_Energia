/**
 * Módulo de Logger utilizando Winston
 *
 * Configura um logger para capturar e armazenar logs de diferentes níveis
 * em arquivos e, se não estiver em produção, também no console.
 */

const winston = require('winston');
const moment = require('moment');

/**
 * Criação do logger utilizando o Winston
 * 
 * O logger é configurado com os seguintes formatos e transportes:
 * 
 * - Formato:
 *   - `winston.format.errors({ stack: true })`: Inclui o stack trace em caso de erro.
 *   - `winston.format.json()`: Formata a saída em JSON para melhor legibilidade e integração.
 *
 * - Transportes:
 *   - `File` (arquivo): Os logs são gravados em arquivos separados para os níveis de erro (error.log) e informação (info.log).
 *   - `Console`: Em ambientes de desenvolvimento (não produção), os logs são também exibidos no console com um formato simples.
 *
 * @returns {winston.Logger} - O logger configurado.
 */
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        // Transporte para salvar logs de nível 'error' no arquivo 'error.log'
        new winston.transports.File({ filename: `logs/error-${moment().format('YYYY-MM-DD')}.log`, level: 'error' }),

        // Transporte para salvar logs de nível 'info' no arquivo 'info.log'
        new winston.transports.File({ filename: `logs/info-${moment().format('YYYY-MM-DD')}.log`, level: 'info' }),
    ],
});

/**
 * Adiciona transporte de Console
 * 
 * Se o ambiente não for produção, os logs também serão enviados para o console com um formato simples.
 */
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Exporta o logger para ser utilizado em outros módulos da aplicação.
module.exports = logger;
