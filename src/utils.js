import _ from 'lodash'


/** --------------------------------- Is Valid Json ---------------------------------------------
 * Check if is an valid json string
 * @param {string} str
 * @returns {boolean}
 * @example isJsonString('{"a":1}') // true
 * @example isJsonString('{"a":1,"b":2]') // false
 * 
*/
export function isJsonString(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      console.error('parse json failed: ', e)
      return false
    }
    return true
}

/** --------------------------------- Object Key Compare ---------------------------------------------
 * Compare two objects by their keys and structure.
 * e.g. { a: 1, b: 2 } === { b: 2, a: 4 } // true
 * e.g. { a: 1, b: 2 } === { a: 1, b: 2, c: 3 } // false
 */

export function objKeyCompare(a, b) {
    const keyA = Object.keys(a)
    const keyB = Object.keys(b)
    if (keyA.length !== keyB.length) {
      return false
    }
  
    if (!keyA.every((key) => b.hasOwnProperty(key))) {
      return false
    }
  
    if (Array.isArray(a)) {
      return compareArray(a, b)
    }
  
    for (const key of keyB) {
      if (Array.isArray(a[key])) {
        const compareArrayResult = compareArray(a[key], b[key])
        if (!compareArrayResult) {
          return false
        }
      } else if (!Array.isArray(a[key]) && typeof a[key] === 'object') {
        const isObjEq = objKeyCompare(a[key], b[key])
        if (!isObjEq) {
          return false
        }
      } else if (typeof a[key] === 'string') {
        if ((a[key] === '' || b[key] === '') && a[key] !== b[key]) {
          return false
        }
      }
    }
  
    return true
  }
  
  function compareArray(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      return false
    }
    if (a.length !== b.length) {
      return false
    }
    for (let i = 0; i < a.length; i++) {
      if (typeof a[i] === 'object') {
        const arryObjResult = objKeyCompare(a[i], b[i])
        if (!arryObjResult) {
          return false
        }
      } else if (typeof a[i] === 'string') {
        if ((a[i] === '' || b[i] === '') && a[i] !== b[i]) {
          return false
        }
      }
    }
    return true
  }

/** --------------------------------- Flatten Object ---------------------------------------------
    * Flatten an object into a single-depth object.
    * Example input: { a: { b: 1, c: 2 }, d: 3 }
    * Example output: { 'a.b': 1, 'a.c': 2, d: 3 }
*/
export function flattenObject(obj, parentKey = '', result = {}) {
    if (Array.isArray(obj)) {
      return flattenArray(obj)
    }
  
    for (let key in obj) {
      let newKey = parentKey ? `${parentKey}.${key}` : key
      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObject(obj[key], newKey, result)
      }
      else if (Array.isArray(obj[key])) {
        flattenArray(obj[key], newKey, result)
      }
      else {
        result[newKey] = obj[key]
      }
    }
  
    return result
  }
  
  /** --------------------------------- Flatten Array ---------------------------------------------
    * Flatten an array into a single-depth object.
    * Example input: [1, [2, 3], { a: 4 }]
    * Example output: { '[0]': 1, '[1][0]': 2, '[1][1]': 3, '[2].a': 4 }
  */
function flattenArray(arr, parentKey = '', result = {}) {
    for (let i = 0; i < arr.length; i++) {
      let newKey = `${parentKey}[${i}]`
  
      if (Array.isArray(arr[i])) {
        flattenArray(arr[i], newKey, result)
      }
      else if (typeof arr[i] === 'object' && arr[i] !== null) {
        flattenObject(arr[i], newKey, result)
      }
      else {
        result[newKey] = arr[i]
      }
    }
  
    return result
  }

/** --------------------------------- Unflatten Object ---------------------------------------------
 * Unflatten a single-depth object into a multi-depth object with lodash set function.
 * Example input: { 'a.b': 1, 'a.c': 2, d: 3 }
 * Example output: { a: { b: 1, c: 2 }, d: 3 }
 * @param {Object} flattenObject
 * @returns {Object}
 */

export function unflattenObject(flattenObject) {
    const obj = {}
  
    Object.entries(flattenObject).forEach(([key, value]) => {
      _.set(obj, key, value)
    })
  
    return obj
}
  