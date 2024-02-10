import deepmerge from 'deepmerge';
import { HttpMethod } from '@/types';

const defaultOptions = {
  method: HttpMethod.GET,
  // TODO: Response to preflight request doesn't pass access control check:
  // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'
  // when the request's credentials mode is 'include'.
  // credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  options?: RequestInit
): Promise<JSON> {
  const finalOptions = deepmerge(defaultOptions, options ?? {});
  const response = await fetch(input, finalOptions);

  const resolved = response.json();
  return resolved;
}
