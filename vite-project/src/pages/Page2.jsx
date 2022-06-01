import React, { useEffect, useState } from 'react'
import useSWR from "swr";
import { expressService } from "../../axiosConfig";
import { useParams, useNavigate } from 'react-router-dom'


export default function Page2() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [product, setProduct ] = useState({
        name: "",
        amount: "",
        price: "",
        totalPrice: "",
        published: false,
})


const { data, error } = useSWR(
    "api/productsf",
      () =>
      expressService.get("/api/productsf").then((res) => res.data),
      { fallbackData: [] }
   );

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name: product.name,
            amount: product.amount,
            price: product.price,
            totalPrice: product.totalPrice,
            published: product.published,
        };
        await expressService.patch(`api/products/published/${id}`, newProduct);
        navigate('/posts')
    }

    useEffect(() => {
        if (id) {
            expressService.get(`api/products/${id}`).then((res) => {
                setProduct({ 
                    name: res.data.name,
                    amount: res.data.amount,
                    price: res.data.price,
                    totalPrice: res.data.totalPrice,
                    published: res.data.published
                })
            })
        }
    }, [id])

    return (
    <>
        <h1>Page 2 </h1>
        <h1>Товар {id}</h1>
        {product && (
            <>
                <form onSubmit={handlerSubmit}>
                <h4>Наименование товара</h4><input readOnly maxLength={50} type="text" name="name" value={product.name}  placeholder="Наименование товара"/><br />
                <h4>Количество товара</h4><input readOnly type="number" name="amount" value={product.amount} placeholder="Количество товара" /><br />
                <h4>Цена товара</h4><input readOnly type="number" name="price" value={product.price} placeholder="Цена товара" /><br />
                <h4>Оплаченная сумма</h4><input readOnly type="number" name="totalPrice" value={product.totalPrice} placeholder="Общая сумма" /><br /><br />
                <button onClick={() => {navigate(`/posts/edit/${id}`)}}>Редактировать товар</button>
                <button type="submit">Подтвердить заказ</button>
                </form>
            </>
        )}
        
    </>
    )
}
