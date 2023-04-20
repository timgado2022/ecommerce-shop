export const PRODUCTS = 'products'

export type TypeDataProducts = {
    name: string
    price: number
    description?: string
    images: string[]
    categoryId: number
}

export type TypeDataFilters = {
    sort?: EnumProductSort
    searchTerm?: string
    page?: string | number
    perPage?: string | number
}

export enum EnumProductSort {
    HIGH_PRICE = 'high_price',
    LOW_PRICE = 'low-price',
    NEWEST = 'newest',
    OLDEST = 'oldest'
}