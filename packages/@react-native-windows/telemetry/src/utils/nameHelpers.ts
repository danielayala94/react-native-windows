/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 */

import _ from 'lodash';

function pascalCase(str: string): string {
  const camelCase = _.camelCase(str);
  return camelCase[0].toUpperCase() + camelCase.substr(1);
}

export function isValidProjectName(name: string): boolean {
  if (name.match(/^[a-z][a-z0-9]*$/gi)) {
    return true;
  }
  return false;
}

export function cleanName(str: string): string {
  str = str.replace('@', ''); // Remove '@' from package scope names
  str = str.slice(str.lastIndexOf('/') + 1); // Remove package scope
  str = pascalCase(str); // Convert to PascalCase
  return str;
}

export function isValidProjectNamespace(namespace: string): boolean {
  if (
    namespace
      .split(/[.]+/)
      .map(isValidProjectName)
      .every(x => x)
  ) {
    // Validate that every part of the namespace is a valid project name
    return true;
  }
  return false;
}

export function cleanNamespace(str: string): string {
  return str.split(/[.:]+/).map(cleanName).join('.');
}

export function isValidTelemetryPackageName(name: string): boolean {
  // Accepted characters: alphanumeric, underscore, dot, starts with letter.
  // Size: 1-100 characters.
  if (name.match(/^[a-zA-Z][a-zA-Z0-9_.]{0,99}$/gi)) {
    return true;
  }
  return false;
}

export function cleanTelemetryPackageName(str: string): string {
  return str.replace(/[^a-zA-Z0-9_.]/g, '_');
}
