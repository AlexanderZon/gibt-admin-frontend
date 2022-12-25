declare type FilterMatch = boolean | number | [number, number] | [number, number][];
export declare type FilterFunction = (value: string, query: string, item?: any) => FilterMatch;