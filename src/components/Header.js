import React,{ Component} from "react";

import { Link } from 'react-router-dom';
// import Slide from "./Slide";

export default class Header extends Component {
  
    render() {
      return (
        <header class="header">
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><img src="https://res.cloudinary.com/datpnv23apasserellnumeriques/image/upload/v1660976175/d5sjotrnod2xhtvhkeux.png" alt="Logo"/></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link" href="/products">Sản phẩm</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/statistical">Thống kê</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Phiên bản</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/customers">Đơn hàng</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Tin tức</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <a href="/"><button type="button" class="btn btn-primary btn__signUp--style"><i class="fa-solid fa-arrow-right-from-bracket"></i></button></a>
                    </form>
                    </div>
                </div>
                </nav>
        </header>
    );
    }
  }