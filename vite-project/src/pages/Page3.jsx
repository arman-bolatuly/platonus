import React from 'react'
import useSWR from "swr";
import { expressService } from "../../axiosConfig";

export default function Page3() {
    const { data, error } = useSWR(
        "api/products",
        () => expressService.get("/api/products").then((res) => res.data),
        { fallbackData: [] }
      );

    return (
    <>
        <h1>Page 3</h1>
        <div>
      Products:
      <ul>
        {data.map((product) => {
          return (
            <li key={product.id}>
              Название товара: {product.name}, Количество: {product.amount}, Cтоимость: {product.price},{" "}
              К оплаате: {product.totalPrice}.
            </li>
          );
        })}
      </ul>
    </div>
    </>
    )
}
