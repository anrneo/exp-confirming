export type StoreResponse = {
    id: number
    name: string
    products: any
}

export type Product = {
    id: number | null;
    name: string | null;
    description: string | null;
    price: number | null;
    image: string | null;
    store: any | null;

}