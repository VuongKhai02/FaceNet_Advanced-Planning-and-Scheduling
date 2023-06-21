import { Condition } from '@haulmont/jmix-rest';
import _ from 'lodash'
import React from "react";

export const print = (str) => {
  console.log(str)
}


export const str = (s) => JSON.stringify(s, null, 4);

export const copy = (s) => JSON.parse(JSON.stringify(s))

export const NUMBER_PATTERN: string = '^[0-9]*$';

export const arrayUnion = (arr1, arr2, identifier) => {
  const array = [...arr1, ...arr2]

  return _.uniqBy(array, identifier)
}

export const addIfNotExist = (arr1, value1, identity) => {

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i][identity] === value1[identity]) return arr1;
  }
  arr1.push(value1)
  return arr1;
}

export const removeIfExist = (arr1, value1, identity) => {

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i][identity] === value1[identity]) {
      arr1.splice(i, 1)
      return arr1;
    }
  }
  return arr1;
}

export const currentDateTime = () => new Date(new Date().toLocaleString("en-US",{timeZone: "Etc/GMT-14"}));



const mappingOperator = {
  "=": "=",
  "<>": "<>",
  ">": ">",
  ">=": ">=",
  "<": "<",
  "<=": "<=",
  "startswith": "startsWith",
  "endswith": "endsWith",
  "contains": "contains",
  "notcontains": "doesNotContain",
}

export function mappingFilterDevextreme(filterDevextreme): Condition {
  const property = filterDevextreme[0];
  const operator = mappingOperator[filterDevextreme[1]];
  const value = filterDevextreme[2];

  return { property, operator, value }
}
