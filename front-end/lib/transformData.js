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

export function genTrendData(data, outerCategory, innerCategory) {
  return _.map(_.groupBy(data, outerCategory), function (value, key) {
    return {
      id: key,
      data: _.map(_.groupBy(value, innerCategory), function (value, key) {
        return {
          x: key,
          y: value[0].cum_value
        };
      })
    };
  });
}
