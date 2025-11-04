declare module 'papaparse' {
  import type { ParseResult, ParseError, ParseMeta } from 'papaparse';

  export interface ParseConfig<T = any> {
    delimiter?: string;
    newline?: string;
    quoteChar?: string;
    escapeChar?: string;
    header?: boolean;
    dynamicTyping?: boolean;
    preview?: number;
    step?: (results: ParseResult<T>, parser: Parser) => void;
    chunk?: (results: ParseResult<T>, parser: Parser) => void;
    worker?: boolean;
    comments?: string | boolean;
    complete?: (results: ParseResult<T>) => void;
    error?: (error: ParseError, file?: File) => void;
    download?: boolean;
    downloadRequestHeaders?: Record<string, string>;
    downloadRequestBody?: Record<string, string>;
    skipEmptyLines?: boolean | 'greedy';
    delimitersToGuess?: string[];
  }

  export interface Parser {
    abort(): void;
  }

  export interface UnparseConfig {
    quotes?: boolean | boolean[];
    quoteChar?: string;
    escapeChar?: string;
    delimiter?: string;
    header?: boolean;
    newline?: string;
    skipEmptyLines?: boolean;
    columns?: string[] | { [key: string]: string };
  }

  export interface ParseResult<T> {
    data: T[];
    errors: ParseError[];
    meta: ParseMeta;
  }

  export interface ParseError {
    type: string;
    code: string;
    message: string;
    row: number;
  }

  export interface ParseMeta {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  }

  export function parse<T = any>(input: string, config?: ParseConfig<T>): ParseResult<T>;
  export function unparse(data: unknown, config?: UnparseConfig): string;

  const Papa: {
    parse: typeof parse;
    unparse: typeof unparse;
  };

  export default Papa;
}
