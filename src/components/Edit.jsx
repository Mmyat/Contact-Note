import {useState,useEffect} from 'react'
import {Link,useNavigate, useParams} from 'react-router-dom';
import {BsTelephoneFill} from 'react-icons/bs';
import Swal from "sweetalert2";
import axios from 'axios';
const Edit= () => {
  const[name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]= useState("");
  const navigate=useNavigate();
  const {id}=useParams();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const getSingleContact=async()=>{
    const {data}=await axios.get(`https://product-shop-43203-default-rtdb.firebaseio.com/contact-list/${id}.json`)
    setName(data.name);
    setEmail(data.email);
    setPhone(data.phone);
  }
  useEffect(() => {
    getSingleContact()
  }, [])
  const apiUpdateContact=async(editContact)=>{
    try{
      if (editContact.name !== "" && editContact.email !== "" && editContact.phone !== "") { 
        await axios.patch(`https://product-shop-43203-default-rtdb.firebaseio.com/contact-list/${id}.json`,editContact)
        Toast.fire({
          icon: "success",
          title: "Contact Updated successfully",
        });
        navigate('/')
      }else{
        Toast.fire({
          icon: "error",
          title: "Fill Required Fieldsl",
        });
      }   
    }catch(error){
      throw new Error();
    }
  }
  const onSubmitHandle=(e)=>{
    e.preventDefault();
    const editContact={name,email,phone}
    apiUpdateContact(editContact);
  }
  return (
    <form onSubmit={onSubmitHandle} className='items-center mx-auto mt-5 p-5 rounded border-2 shadow-lg w-96'>
      <h1 className='text-gray-800 text-2xl font-bold'>Edit Contact-{id}</h1>
      <div>
        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input type="text" id="website-admin" value={name} onChange={(e)=>setName(e.target.value)}className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={name}/>
        </div>
      </div>
      <div>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
          </div>
          <input type="email" id="input-group-1" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={email}/>
        </div>
      </div>
      <div>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BsTelephoneFill/>
          </div>
          <input type="number" id="input-group-1" value={phone} onChange={(e)=>setPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={phone}/>
        </div>
      </div>
      <div>
        <button type="submit" className='text-white bg-cyan-700 px-4 py-2 rounded m-auto shadow-lg text-sm'>Update</button>
        <Link to="/">
          <button className='text-white bg-red-500 ml-3 px-4 py-2 rounded m-auto shadow-lg text-sm'>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default Edit;