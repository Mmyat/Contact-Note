import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {AiFillDelete,AiFillEdit,AiOutlinePlusCircle} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import {IoMdContact} from 'react-icons/io'
const Contact = () => {
  const [contact,setContact]=useState([]);
  const [loading,setLoading]= useState(false)
  const [error,setError] = useState(null)
  const getContact = async()=>{
    setLoading(true);
    try {
      const response = await axios.get('https://product-shop-43203-default-rtdb.firebaseio.com/contact-list.json')
      if(response.statusText !== "OK"){
        throw new Error("Cannot connect to the firebase");
      }
      const {data} = response;
      const contactList =  []
      for (const key in data){
      contactList.push({id:key,name:data[key].name,email:data[key].email,phone:data[key].phone})
      } 
      setContact(contactList);
      setLoading(false);
    }catch(err){
      setError(err.message)
    }
    setLoading(false);  
  }
  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-orange-500 text-white px-5 py-1 rounded shadow-lg',
      cancelButton: 'bg-red-500 text-white px-5 py-1 rounded shadow-lg mr-3'
    },
    buttonsStyling: false
  })
  const apiDeleteContact=async(id)=>{
    swalWithButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        swalWithButtons.fire(
          'Deleted!',
          'Your contact has been deleted.',
          'success'
        );
        await axios.delete(`https://product-shop-43203-default-rtdb.firebaseio.com/contact-list/${id}.json`);
        getContact();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithButtons.fire(
          'Cancelled',
          'Your contact is safe :)',
          'error'
        )
      }
    })
  }
  useEffect(()=>{
    getContact()
  },[])
  return (
    <div>
    {loading ? (
      <div className="text-center">
        <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    ):(
      <>
    <div className='flex flex-col text-center'>
      <IoMdContact className='text-cyan-500 self-center  text-7xl'/>
      <h1 className='text-cyan-500 text-3xl'>Contact App</h1>
    </div>
    <div>
      <div className="flex flex-col w-full md:w-4/5 mx-auto">
        <Link to="/create">
          <button className='flex align-middle items-center text-white bg-emerald-500 overflow-x-auto rounded px-4 py-2 my-3'>
            Create New Contact
            <AiOutlinePlusCircle className='ml-2'/>
          </button>
        </Link>
          <table className="w-full text-sm text-left text-gray-500 dark:text-white-400 shadow-xl rounded-lg">
              <thead className="text-xs md:text-sm lg:text-md text-gray-700 border-1 uppercase dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 bg-gray-400">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3 bg-[#eaddcf]">
                          Email Address
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-400">
                          Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3 bg-[#eaddcf]">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                {contact?.map((contact,key=contact.id)=>(
                  <tr key={contact.id} className="border-b border-1 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 text-xs md:text-sm lg:text-md text-gray-900 bg-gray-500 dark:text-white dark:bg-black-300">
                          {contact.name}
                      </th>
                      <td className="text-xs md:text-sm lg:text-md md:px-6 md:py-4">
                          {contact.email}
                      </td>
                      <td className="text-xs md:text-sm lg:text-md px-6 py-3 text-gray-900 bg-gray-500">
                          {contact.phone}
                      </td>
                      <td className="px-6 py-4 text-xs md:text-sm lg:text-md flex gap-3">
                        <Link to={`/edit/${contact.id}`}>
                          <AiFillEdit className='text-2xl text-orange-500 cursor-pointer'/>
                        </Link>
                        <AiFillDelete onClick={()=>apiDeleteContact(contact.id)}  className='text-2xl text-red-500 cursor-pointer'/>
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>
    </div>
    </>
    )}
    </div>   
  )
}
export default Contact;