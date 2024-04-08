import { useQuery } from "react-query";
import AXIOS from "./axios";

export const useGetAllProduct = (filter) => {
  return useQuery({
    queryKey: [filter],
    queryFn: async () => {
      const { data } = await AXIOS.get(
        `/api/products/product-filter/?${filter ? filter : ""}`
      );
      return data;
    },
  });
};
export const useGetProductDetails = (id) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await AXIOS.get(`/api/products/${id}`);
      return data;
    },
  });
};
export const useGetRelatedProducts = (id) => {
  return useQuery({
    queryKey: [id, "related-products"],
    queryFn: async () => {
      const { data } = await AXIOS.get(`/api/products/${id}/related-products/`);
      return data;
    },
  });
};
export const useGetAllBrands = (filter) => {
  return useQuery({
    queryKey: ["brand-list"],
    queryFn: async () => {
      const { data } = await AXIOS.get(`/api/brand-list/`);
      return data;
    },
  });
};
export const useGetTopSellingProducts = (filter) => {
  return useQuery({
    queryKey: ["top-selling-products"],
    queryFn: async () => {
      const { data } = await AXIOS.get(`/api/products/top-selling-products/`);
      return data;
    },
  });
};
export const useGetPopularProducts = (filter) => {
  return useQuery({
    queryKey: ["popular-products"],
    queryFn: async () => {
      const { data } = await AXIOS.get(`api/products/popular-products/`);
      return data;
    },
  });
};
export const useGetNewProducts = (filter) => {
  return useQuery({
    queryKey: ["new-products"],
    queryFn: async () => {
      const { data } = await AXIOS.get(`/api/products/new-products/`);
      return data;
    },
  });
};
export const useGetSearchProducts = (categoryName, search) => {
  return useQuery({
    queryKey: [categoryName, search],
    queryFn: async () => {
      let url = `/api/products/search-products/?${
        search ? `search=${search}` : "search=HP"
      }${categoryName ? `&category=${categoryName}` : ""}  `;

      const { data } = await AXIOS.get(url);
      return data;
    },
  });
};
