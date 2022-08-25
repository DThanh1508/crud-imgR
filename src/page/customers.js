import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import Header from '../components/Header';

export default function Customers() {

    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetchProducts() 
    },[]);

    const fetchProducts = async () => {
        await axios.get(`http://127.0.0.1:8000/api/customers`).then(({data})=>{
            setProducts(data)
        })
    }

    // const deleteProduct = async (id) => {
    //     const isConfirm = await Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         return result.isConfirmed
    //       });

    //       if(!isConfirm){
    //         return;
    //       }

    //     //   await axios.delete(`http://127.0.0.1:8000/api/products/${id}`).then(({data})=>{
    //     //     Swal.fire({
    //     //         icon:"success",
    //     //         text:data.message
    //     //     })
    //     //     fetchProducts()
    //     //   }).catch(({response:{data}})=>{
    //     //     Swal.fire({
    //     //         text:data.message,
    //     //         icon:"error"
    //     //     })
    //     //   })
    // }

    return (
        <>
            <Header></Header>
            <section className=' product-list customer-list'>
                <div>
                    <div className="row">
                        {/* <div className='col-12'>
                            <Link className='btn btn-primary mb-2 float-end' to={"/product/create"}>
                                Create Product
                            </Link>
                        </div> */}
                        <div className="col-12">
                            <div className="card card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Tên Khách Hàng</th>
                                                <th>Số điện thoại</th>
                                                <th>Ngày sửa giao</th>
                                                <th>Ngày nhận</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Số IEMEI</th>
                                                <th>model</th>
                                                <th>Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.length > 0 && (
                                                    products.map((row, key)=>(
                                                        <tr key={key}>
                                                            <td>{row.cus_name}</td>
                                                            <td>{row.cusphone_number}</td>
                                                            <td>{row.repair_day}</td>
                                                            <td>{row.received_day}</td>
                                                            <td>{row.product_name}</td>
                                                            <td>{row.phone_emei}</td>
                                                            <td>{row.model}</td>
                                                            <td>{row.note}</td>
                                                            {/* <td>
                                                                <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                                                                    Edit
                                                                </Link>
                                                                <Button variant="danger" onClick={()=>deleteProduct(row.id)}>
                                                                    Delete
                                                                </Button>
                                                            </td> */}
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