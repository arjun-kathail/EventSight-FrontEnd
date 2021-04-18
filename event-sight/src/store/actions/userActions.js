import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const signupInit = (user)=>{
    return (dispatch)=>{
        const requestURl = "register/";
        const data = {
          "password": user.password,
          "student_id": user.sid,
          "first_name": user.firstName,
          "last_name": user.lastName,
          "email": user.email,
          "branch": user.branch
        };
        axios.post(requestURl, data).then((res)=>{
          console.log(res)
        localStorage.setItem("firstName", user.firstName)
        localStorage.setItem("lastName", user.lastName)
        localStorage.setItem("sid", user.sid)
        localStorage.setItem("branch", user.branch)
        localStorage.setItem("password", user.password)
        localStorage.setItem("email", user.email)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("role", "Student")
        localStorage.setItem("OCName", "")
          dispatch({
              type : actionTypes.SIGNUP_SUCCESS,
              userInfo : {
                  ...user,
                  token : res.data.token,
                  role : "Student",
              }
          })
        }).catch((err)=>{
          console.log(err)
          dispatch({
              type : actionTypes.SIGNUP_FAILED
          })
        });
    }
}

export const loginInit = (user)=>{
    return (dispatch)=>{
        const requestURL = "login/";
        const data = {
            "password" : user.password,
            "student_id" : user.sid,
            "role" : user.role,
            "club" : user.OC
        }
        console.log(data)
        axios.post(requestURL, data)
        .then((res)=>{
            console.log(res)
            const userData = {
                firstName :  res.data.credentials.first_name,
                lastName :  res.data.credentials.last_name,
                sid :  res.data.credentials.student_id,
                branch : res.data.credentials.branch,
                email : res.data.credentials.email,
                password :  res.data.credentials.password,
                token : res.data.token,
                role : user.role,
                OCName : user.OC 
            }
            dispatch({
                type : actionTypes.LOGIN_SUCCESS,
                userInfo : userData
            })
        })
        .catch((err)=>{
            console.log(err)
            dispatch({
                type : actionTypes.LOGIN_FAILED
            })
        })
    }
}

export const logout = (sid, token)=>{
    return (dispatch)=>{
        const requestURL = "logout/";
        const data = {
            "student_id" : sid,
            "token" : token
        }
        axios.post(requestURL, data)
        .then((res)=>{
            localStorage.removeItem("firstName")
            localStorage.removeItem("lastName")
            localStorage.removeItem("sid")
            localStorage.removeItem("branch")
            localStorage.removeItem("password")
            localStorage.removeItem("email")
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("OCName")
            console.log(res)
            dispatch({
                type : actionTypes.LOGOUT
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}