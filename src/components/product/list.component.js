import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import Header from '../Header';

export default function List() {

    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetchProducts() 
    },[]);

    const fetchProducts = async () => {
        await axios.get(`http://127.0.0.1:8000/api/products`).then(({data})=>{
            setProducts(data)
        })
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://127.0.0.1:8000/api/products/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchProducts()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
        <>
            <Header></Header>
            <section className='product-list'>
                <div className="container">
                    <div className="row">
                        <div className='col-12'>
                            <Link className='btn btn-primary mb-2 float-end' to={"/product/create"}>
                                Create Product
                            </Link>
                        </div>
                        <div className="col-12">
                            <div className="card card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Service name</th>
                                                <th>Product name</th>
                                                <th>Image</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Version id</th>
                                                <th>Service id</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.length > 0 && (
                                                    products.map((row, key)=>(
                                                        <tr key={key}>
                                                            <td>{row.service_name}</td>
                                                            <td>{row.product_name}</td>
                                                            <td>
                                                                <img width="50px" alt='' src={`${row.img}`} />
                                                            </td>
                                                            <td>{row.description}</td>
                                                            <td>{row.price}</td>
                                                            <td>{row.version_id}</td>
                                                            <td>{row.service_id}</td>
                                                            <td>
                                                                <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                                                                    Edit
                                                                </Link>
                                                                <Button variant="danger" onClick={()=>deleteProduct(row.id)}>
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}