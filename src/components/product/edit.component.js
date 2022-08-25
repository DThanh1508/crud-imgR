import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "../Header";

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [product_name, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [version_id, setVersionId] = useState("")
  const [service_id, setServiceId] = useState("")
  const [image, setImage] = useState()
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchProduct()
  },[]);

  const fetchProduct = async () => {
    await axios.get(`http://localhost:8000/api/products/${id}`).then(({data})=>{
      const { product_name, description, price, version_id, service_id} = data
      setProductName(product_name)
      setDescription(description)
      setPrice(price)
      setVersionId(version_id)
      setServiceId(service_id)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('product_name', product_name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('version_id', version_id)
    formData.append('service_id', service_id)
    formData.append('file', image)
    formData.append("upload_preset","esofqqnh");
    await axios.post("https://api.cloudinary.com/v1_1/datpnv23apasserellnumeriques/image/upload", formData)
    .then((response)=>{
      console.log(response);
      var data = {
        product_name: product_name,
        img: response.data.secure_url,
        description:description,
        price: price,
        version_id: version_id,
        service_id: service_id
      }

    axios.put(`http://localhost:8000/api/products/${id}`, data)
    .then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/products")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  })
}

  return (
    <>
      <Header></Header>
      <section className="edit-product">
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Product</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" value={product_name} onChange={(event)=>{
                              setProductName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label></Form.Label>
                            <Form.Control type="text" value={price} onChange={(event)=>{
                              setPrice(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Version id</Form.Label>
                            <Form.Control as="textarea" rows={3} value={version_id} onChange={(event)=>{
                              setVersionId(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Service id</Form.Label>
                            <Form.Control type="text" value={service_id} onChange={(event)=>{
                              setServiceId(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>
    </>
  )
}