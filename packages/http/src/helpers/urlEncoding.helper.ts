import * as qs from 'qs';
import merge from 'lodash/merge';

export const urlDestruct = (url: string, options?: qs.IParseOptions): {
  url: string;
  query: any;
} => {
  const [path, query] = url.split('?');
  return {
    url: path,
    query: query ? urlDecode(query, options) : {},
  };
};

export const urlCombine = (sourceUrl: string, sourceQuery?: object, options?: qs.IStringifyOptions) => {
  const { url, query } = urlDestruct(sourceUrl);
  const queryString = urlEncode(merge(sourceQuery, query), {
    ...options,
    addQueryPrefix: false,
  });
  return url + (queryString ? `?${queryString}` : '');
};

export const urlEncode = (value: any, options?: qs.IStringifyOptions) => qs.stringify(value, {
  encodeValuesOnly: true,
  ...options,
});
export const urlDecode = <T = any>(value: string, options?: qs.IParseOptions): T => qs.parse(value, options);
