import React from 'react'
import useSWR from "swr";
import { expressService } from "../../axiosConfig"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'

export default function EditPage() {
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

const handlerSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
        name: product.name,
        amount: parseInt(product.amount),
        price: parseInt(product.price),
        totalPrice: parseInt(product.amount * product.price),
    };
    const res = await expressService.patch(`api/products/${id}`, newProduct);
    navigate(`/posts/${res.data.id}`)
}

function handleChange(e) {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

    return (
    <>
        <h1>Edit Page {id}</h1>
        <div>
            <form onSubmit={handlerSubmit}>
                <h4>Наименование товара</h4><input onChange={handleChange} maxLength={50} type="text" name="name" value={product.name} /><br />
                <h4>Количество товара</h4><input onChange={handleChange} type="number" name="amount" value={product.amount} /><br />
                <h4>Цена товара</h4><input onChange={handleChange} type="number" name="price" value={product.price} /><br /><br />
                <button type="submit">Сохранить</button>
            </form>
        </div>
    </>
    )
}
