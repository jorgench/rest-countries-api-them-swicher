/**
 * @module
 */

/**
 * Ingresar 'San Silvestre' y retorna 'san_silvestre'
 * @param {string} name
 * @returns {string}
 */
const nameToKey = name => {
  return name
    .split(' ')
    .map(x => x.toLowerCase())
    .join('_');
};

/**
 * Ingresa 'san_silvestre' y retorna 'San Silvestre'
 * @param {string} key
 * @returns {String}
 */
const keyToName = key => {
  return key
    .split('_')
    .map(x => x[0].toUpperCase() + x.slice(1, x.length))
    .join(' ');
};

export default {
  nameToKey,
  keyToName,
};
