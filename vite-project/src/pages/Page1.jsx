import React from 'react'
import useSWR from "swr";
import { expressService } from "../../axiosConfig";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    name: "",
    amount: "",
    price: "",
    totalPrice: "",
  }

export default function Page1() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(initialState)
    
    const { data, error } = useSWR(
      "api/productsf",
        () =>
        expressService.get("/api/productsf").then((res) => res.data),
        { fallbackData: [] }
     );

    const handlerSubmit = async (e) => {
        e.preventDefault()
        const newProduct = {
          name: product.name,
          amount: parseInt(product.amount),
          price: parseInt(product.price),
          totalPrice: parseInt(product.amount * product.price),
        }
        const res = await expressService.post("api/products", newProduct)
        navigate(`/posts/${res.data.id}`)
      }
    
      function handleChange(e) {
        setProduct((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
     
    return (
    <>
        <h1>Page 1</h1>
        <div>
            <form onSubmit={handlerSubmit}>
                <h4>Наименование товара</h4><input  onChange={handleChange} maxLength={50} type="text" name="name" value={product.name} placeholder="Наименование товара"/><br />
                <h4>Количество товара</h4><input  onChange={handleChange} type="number" name="amount" value={product.amount} placeholder="Количество товара" /><br />
                <h4>Цена товара</h4><input  onChange={handleChange} type="number" name="price" value={product.price} placeholder="Цена товара" /><br /> <br /> 
                <button type="submit">Отправить</button>
            </form>
        </div>
        <div>
        
        </div>
    </>
    )
}
