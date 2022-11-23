import React from "react"
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { userSignUp } from "../../redux/slices/user";
import registerOptions from "./sign-up-validations";
import './sign-up.css'

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    try {
      const response = dispatch(userSignUp(data));
      navigate('/');
    } catch (err) {
      console.log('Error occured in user signup dispatch: ', err)
    }
  }
  return (
    <div className='center-signup d-flex justify-content-center align-items-center'>
      <div className="register">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <h2 className="text-center fw-bold ">Register</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="nameInput">Name</label>
            <input type="text"
              name="name" {...register('name', registerOptions.name)}
              className="form-control"
              id="inputName"
              placeholder="Please Enter Your Name" />
            <small className="text-danger">
              {errors.name?.type === "required" && (
                <span>Name is required</span>
              )}
              {errors.name?.type === "pattern" && (
                <span>Please enter only alphabets</span>
              )}
              {errors.name?.type === "minLength" && (
                <span>Please enter atleast 4 alphabets</span>
              )}
              {errors.name?.type === "maxLength" && (
                <span>Nmae should be less then 15 characters</span>

              )}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput">Email</label>
            <input type="text"
              name="email" {...register('email', registerOptions.email)}
              className="form-control"
              id="inputEmail"
              placeholder="Please Enter Your Email" />
            <small className="text-danger">
              {errors.email?.type === "required" && (
                <span>Eamil is required</span>
              )}
              {errors.email?.type === "pattern" && (
                <span>Please enter valid email address</span>
              )}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Phone no</label>
            <input type="phone"
              name="phone" {...register('phone', registerOptions.phone)}
              className="form-control"
              id="inputPhoneNo"
              placeholder="Please Enter Your Phone" />
            <small className="text-danger">
              {errors.phone?.type === "required" && (
                <span>Phone no is required</span>
              )}
              {errors.phone?.type === "pattern" && (
                <span>Please enter valid phone number</span>
              )}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password"
              name="password" {...register('password', registerOptions.password)}
              className="form-control"
              id="inputPassword"
              placeholder="Please Enter Your Password" />
            <small className="text-danger">
              {errors.password?.type === 'required' && (
                <span>Password is required</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span>Please enter atleast 4 characters </span>
              )}
            </small>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary">Register</button>
          </div>
          <a href="/" className="link-primary d-flex justify-content-end mt-2" ><small>Already have account</small></a>
        </form>
      </div>
    </div>
  )
}

export default Register