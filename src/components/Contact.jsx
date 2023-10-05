import {useContext} from 'react';
import {AiFillDelete,AiFillEdit,AiOutlinePlusCircle} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import {IoMdContact} from 'react-icons/io';
import {UserContext} from '../context/contactProvider';
const Contact = () => {
  const {contact,setContact} = useContext(UserContext)
  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-orange-500 text-white px-5 py-1 rounded shadow-lg',
      cancelButton: 'bg-red-500 text-white px-5 py-1 rounded shadow-lg mr-3'
    },
    buttonsStyling: false
  })
  const DeleteContact=async(deletedID)=>{
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
        const deleteData=contact.filter((contact) => contact.id !== deletedID);
        setContact(deleteData);
        // console.log(deleteData);
        swalWithButtons.fire(
          'Deleted!',
          'Your contact has been deleted.',
          'success'
        );
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
  return (
    <>
    <div className='flex flex-col text-center'>
      <IoMdContact className='text-cyan-500 self-center  text-7xl'/>
      <h1 className='text-cyan-500 text-3xl'>Contact App</h1>
    </div>
    <Link to="/create">
        <button className='flex align-middle items-center text-white bg-emerald-500 rounded px-4 py-2 my-3'>
          Create New Contact
          <AiOutlinePlusCircle className='ml-2'/>
        </button>
    </Link>
    <div>
      <div className="flex overflow-x-auto shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-white-400">
              <thead className="text-xs md:text-sm lg:text-md text-gray-700 border-1 uppercase dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-auto py-3 bg-gray-400">
                          Name
                      </th>
                      <th scope="col" className="px-auto py-3">
                          Email Address
                      </th>
                      <th scope="col" className="px-auto py-3 bg-gray-400">
                          Phone Number
                      </th>
                      <th scope="col" className="px-auto py-3">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                {contact?.map((contact,key=contact.id)=>{
                  return(
                    <tr key={contact.id} className="border-b border-1 dark:border-gray-700">
                      <th scope="row" className="p-3 text-xs md:text-sm lg:text-md text-gray-900 bg-gray-500">
                          {contact.name}
                      </th>
                      <td className="p-3 text-xs md:text-sm lg:text-md">
                          {contact.email}
                      </td>
                      <td className="text-xs md:text-sm lg:text-md xl:text-lg p-3 text-gray-900 bg-gray-500">
                          {contact.phone}
                      </td>
                      <td className="flex text-xs md:text-sm lg:text-md xl:text-lg p-3 gap-3">
                        <Link to={`/edit/${contact.id}`}>
                          <AiFillEdit className='text-2xl text-orange-500 cursor-pointer'/>
                        </Link>
                        <AiFillDelete onClick={()=>DeleteContact(contact.id)} className='text-2xl text-red-500 cursor-pointer'/>
                      </td>
                  </tr>
                  )
                }                 
                )}
              </tbody>
          </table>
      </div>
    </div>
    </>
  )
}

export default Contact;