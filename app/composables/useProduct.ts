import { products } from '../../seed/products.seed';
export const useProduct = async (slug: string) => {
  const { data, error, status, clear, execute } = await useFetch(`/api/product/${slug}`)

  return {
    data,
    product: data,

    error,
    status,
    clear,
    execute
  }
}