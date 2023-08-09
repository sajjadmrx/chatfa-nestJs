import { useFormik } from "formik"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"

import React from "react"
import { signupService } from "../../services/auth.service"
import { errorHandling } from "../../shared/lib/error-handling"
import { ButtonComponent, IconComponent, InputComponent } from "../Shared"

let timer: any

const initialValues = {
  username: "",
  email: "",
  password: "",
}

const validationSchema = Yup.object({
  username: Yup.string().required("Please enter username"),
  email: Yup.string().email("Invalid email address").required("Please enter email"),
  password: Yup.string()
    .required("Please enter password")
    .min(8, "Password must be at least 8 characters long"),
})

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const res = await signupService(values)
      localStorage.setItem("token", res.data)
      toast.success("Signup was successful!")
      timer = setInterval(() => navigate("/rooms"), 2000)
    } catch (e) {
      toast.error(errorHandling(e))
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  useEffect(() => {
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div className="z-10 grid w-full p-16 pb-32 text-center bg-white lg:w-1/3 rounded-l-2xl lg:max-w-xl place-items-center">
        <div className="w-full text-center">
          <h1 className="mb-2 text-2xl font-bold text-center">
            Sigup in <span className="text-center text-primaryHover">Cinema Chat</span>
          </h1>
          <p className="mb-8 text-sm text-gray-500">
            Welcome back! Please enter your details
          </p>
          <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
            <InputComponent
              name="username"
              type="text"
              formik={formik}
              placeholder="Fullname"
              icon={
                <IconComponent
                  name="user"
                  size={20}
                  className="absolute transform -translate-y-1/2 left-3 top-1/2"
                />
              }
            />
            <InputComponent
              name="email"
              type="email"
              formik={formik}
              placeholder="Email"
              icon={
                <IconComponent
                  name="mail"
                  size={20}
                  className="absolute transform -translate-y-1/2 left-3 top-1/2"
                />
              }
            />
            <InputComponent
              name="password"
              type="password"
              formik={formik}
              placeholder="Password"
              icon={
                <IconComponent
                  name="lock"
                  size={20}
                  className="absolute transform -translate-y-1/2 left-3 top-1/2"
                />
              }
            />

            <ButtonComponent
              type="submit"
              variant="primary"
              loading={isLoading}
              className="mt-5 text-center"
            >
              Signup
            </ButtonComponent>

            <p className="mt-4 mb-2 text-sm text-left">
              Do you have an account before?{" "}
              <Link to="/login" className="text-primary hover:text-primaryActive">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  )
}

export default SignUp
