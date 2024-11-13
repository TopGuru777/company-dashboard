export interface Company {
    id: number;
    name: string;
}

export interface DeleteResponse {
    message: string;
    data: Set<number>;
}