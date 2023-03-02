'use strict';
cy.testapi = {
  schemaValidate: (a, b) => {
    let errors = [];

    const compareValues = (a, b, key) => {
      //if a and b aren't the same type, they can't be equal
      if (typeof a !== typeof b) {
        errors.push('key of schema: ' + key + ' ==> ' + (Array.isArray(a) ? 'Array' : typeof a) + ' != ' + typeof b);
        return errors;
      }

      // Need the truthy guard because
      // typeof null === 'object'
      if (a && typeof a === 'object') {
        var keysA = Object.keys(a).sort(),
          keysB = Object.keys(b).sort();

        //if a and b are objects with different no of keys, unequal
        if (keysA.length !== keysB.length) {
          // return false;
        }

        //if keys aren't all the same, unequal
        if (
          !keysA.every(function (k) {
            return keysB.indexOf(k) != -1;
            //  return k  === keysB[i];
          })
        ) {
          errors.push('key of: ' + keysA + ' not eq to key of: ' + keysB);
          return errors;
        }

        //recurse on the values for each key
        return keysA.every(function (key) {
          //if we made it here, they have identical keys
          // if ((typeof a[key] === 'string' || a[key] instanceof String) && b[key] == null) {
          //   return true;
          // } else {
          return compareValues(a[key], b[key], key);
          //  }
        });

        //for primitives just use a straight up check
      } else {
        return [];
      }
      //else {
      // return a === b;
      //}
    };

    //true if their structure, values, and keys are identical
    compareValues(a, b);
    return errors;
  },
};

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// eslint-disable-next-line no-undef
exports.getParameterByName = getParameterByName;
