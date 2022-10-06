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

// export function sumByCategory(data, category) {
//   return _.map(_.groupBy(data, category), function (value, key) {
//     return {
//       id: key,
//       name: key,
//       value: value
//     };
//   });
// }

// // group by, sum, map

// for (let i = 0; i < years.length; i++) {
//   totalCrimes[years[i]] = _.chain(props.crimes)
//     .filter(function (row) {
//       return row.year == years[i];
//     })
//     .reduce((s, f) => s + parseInt(f.value), 0)
//     .value();
// }

export function getValuesFromField(obj, field) {
  var arr = [];
  obj.forEach((e) => {
    arr.push(e[field]);
  });
  return arr;
}

export function genHeatmapData(data, outerCategory, innerCategory) {
  return _.map(_.groupBy(data, outerCategory), function (value, key) {
    return {
      id: key,
      data: _.map(_.countBy(value, innerCategory), function (value, key) {
        return {
          x: key,
          y: value
        };
      })
    };
  });
}
