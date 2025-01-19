import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key =import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api= `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Addpublisher = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic=useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const imageFile = {image: data.publisher_logo[0]};
    const res = await axiosPublic.post(image_hosting_api, imageFile,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    if(res.data.success){
        const publisher = {
            publisher_name: data.publisher_name,
            publisher_logo: res.data.data.display_url,
        }
        const publish= await axiosSecure.post('/publishers', publisher);
        if(publish.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "New Publisher added",
                showConfirmButton: false,
                timer: 1500
              });
              
        }
    }
    
  };
  return (
    <div>
      <div>
        <h2 className="text-xl md:text-3xl  font-bold text-center">
          Add New Publisher
        </h2>
      </div>
      <div >
        <form className="flex gap-4 items-end" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control flex flex-col gap-4">
            <label>Type the publisher name</label>
            <input
              {...register("publisher_name",{required:true})}
              required
              type="text"
              placeholder="Publisher Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control flex flex-col gap-4">
          <label>Upload logo</label>
          <input
           {...register("publisher_logo",{required:true})}
           required
           type="file" className=" form-control file-input w-full max-w-xs" />
          </div>
          <button className="btn bg-black text-white ">Add Publisher</button>
        </form>
      </div>
    </div>
  );
};

export default Addpublisher;
