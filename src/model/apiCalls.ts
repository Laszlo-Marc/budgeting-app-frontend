export interface ApiCall {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}
