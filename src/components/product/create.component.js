import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Header from "../Header";
import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {
  // const navigate = useNavigate();

  const [serviceName, setServiceName] = useState("")
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [versionId, setVersionId] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [image, setImage] = useState()
  const navigate = useNavigate()
  // const [validationError,setValidationError] = useState({})

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('service_name', serviceName)
    formData.append('product_name', productName)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('version_id', versionId)
    formData.append('service_id', serviceId)
    formData.append('file', image)
    formData.append("upload_preset","esofqqnh");
    await axios.post("https://api.cloudinary.com/v1_1/datpnv23apasserellnumeriques/image/upload", formData)
    .then((response)=>{
      console.log(response);
      var data = {
        service_name: serviceName,
        product_name: productName,
        img: response.data.secure_url,
        description:description,
        price: price,
        version_id: versionId,
        service_id: serviceId
      }
      axios.post("http://127.0.0.1:8000/api/products", data)
      .then((response)=>{
        console.log(response.data);
        alert('thành công');
        return navigate("/products");
      });
    });

    // .then(({data})=>{
    //   Swal.fire({
    //     icon:"success",
    //     text:data.message
    //   })
    //   navigate("/")
    // }).catch(({response})=>{
    //   if(response.status===422){
    //     setValidationError(response.data.errors)
    //   }else{
    //     Swal.fire({
    //       text:response.data.message,
    //       icon:"error"
    //     })
    //   }
    // })
  }

  return (
    <>
      <Header/>
      <section className="create-product">
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Product</h4>
              <hr />
              <div className="form-wrapper">
                {/*{*/}
                {/*  Object.keys(validationError).length > 0 && (*/}
                {/*    <div className="row">*/}
                {/*      <div className="col-12">*/}
                {/*        <div className="alert alert-danger">*/}
                {/*          <ul className="mb-0">*/}
                {/*            {*/}
                {/*              Object.entries(validationError).map(([key, value])=>(*/}
                {/*                <li key={key}>{value}</li>   */}
                {/*              ))*/}
                {/*            }*/}
                {/*          </ul>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  )*/}
                {/*}*/}
                <Form onSubmit={createProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Service name</Form.Label>
                            <Form.Control type="text" onChange={(event)=>{
                              setServiceName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" onChange={(event)=>{
                              setProductName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" onChange={(event)=>{
                              setPrice(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Version id</Form.Label>
                            <Form.Control type="text" onChange={(event)=>{
                              setVersionId(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Service id</Form.Label>
                            <Form.Control type="text" onChange={(event)=>{
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
                    Save
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