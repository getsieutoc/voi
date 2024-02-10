import { format, formatRelative as formatRelativeFn } from 'date-fns';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'qs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(
  timestamp?: string | number | Date | null,
  formatType = 'dd.MM.yyyy'
) {
  if (!timestamp) {
    return '';
  }

  if (timestamp instanceof Date) {
    return format(timestamp, formatType);
  }

  return format(new Date(timestamp), formatType);
}

export function formatRelative(timestamp?: string | number | Date | null) {
  if (!timestamp) {
    return '';
  }

  if (timestamp instanceof Date) {
    return formatRelativeFn(timestamp, new Date());
  }

  return formatRelativeFn(new Date(timestamp), new Date());
}

// From 'foo[bar]=baz' to foo: { bar: 'baz' }
export function queryParser<R extends Record<string, unknown>>(
  input?: string | string[] | number | null
): R {
  // Most of time we do not use array of strings
  if (Array.isArray(input) || typeof input === 'number') {
    throw new Error('We dont do that here');
  }

  if (input) {
    return qs.parse(input) as R;
  }

  return {} as R;
}

// From { a: { b: 'c' } } to a[b]=c
export function queryStringify(input?: Record<string, unknown>) {
  if (typeof input === 'object') {
    return qs.stringify(input, { encode: false });
  }

  if (typeof input === 'string') {
    return input;
  }

  return '';
}
