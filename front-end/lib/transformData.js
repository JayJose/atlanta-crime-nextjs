import _ from 'underscore';

export function CountValuesInList(arr, prop, data) {
  var results = [];
  arr.forEach((e) => {
    results.push({
      id: e,
      label: e,
      value: data.filter((obj) => obj[prop] === e).length
    });
  });

  return results;
}

export function countByCategory(data, category) {
  return _.map(_.countBy(data, category), function (value, key) {
    return {
      id: key,
      name: key,
      value: value
    };
  });
}

export function getValuesFromField(obj, field) {
  var arr = [];
  obj.forEach((e) => {
    arr.push(e[field]);
  });
  return arr;
}
