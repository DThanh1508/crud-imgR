import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (username === "admin" && password === "12345") {
            sessionStorage.setItem("isLogin", true)
            navigate("/products")
        }
    }
  return (
    <div className="flex-center">
        <section className="login">
           <h1 className="login__title">Đăng nhập</h1>
           <form onSubmit={submitHandler} method="POST
           " className="login__form">
                <div>
                    <label class="login__form__label">Username Or Email</label>
                    <input className="login__form__input" type="text" name="title" placeholder="Name" value={username} onChange={event => setUsername(event.target.value)}/>
                </div>
                <div>
                    <label class="login__form__label">Password</label>
                    <input className="login__form__input" type="password" name="title" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                </div>
                <div>
                    <button type="submit" name="submit" id="submit" class="login__btn">
                        Đăng nhập
                    </button>
                </div>
           </form>
        </section>
    </div>
  );
}