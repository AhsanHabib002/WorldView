import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticle = () => {
  const { register, handleSubmit, reset } = useForm();
  const [publishers, setPublishers] = useState([]);
  const [tags, setTags] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Publisher Data
  const { data: publisher = [], refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  //   tags
  const tagOptions = [
    { value: "AI", label: "AI" },
    { value: "Adventure", label: "Adventure" },
    { value: "Climate", label: "Climate" },
    { value: "Economy", label: "Economy" },
    { value: "Energy", label: "Energy" },
    { value: "Environment", label: "Environment" },
    { value: "Exploration", label: "Exploration" },
    { value: "Finance", label: "Finance" },
    { value: "Fitness", label: "Fitness" },
    { value: "Global", label: "Global" },
    { value: "Innovation", label: "Innovation" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Nature", label: "Nature" },
    { value: "Technology", label: "Technology" },
    { value: "Science", label: "Science" },
    { value: "Space", label: "Space" },
    { value: "Programming", label: "Programming" },
    { value: "Remote", label: "Remote" },
  ];
  const handleTagChange = (selectedOptions) => {
    setTags(selectedOptions.map((option) => option.value));
  };
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const newArticle = {
        title: data.title,
        image: res.data.data.display_url,
        publisher: data.publisher,
        tags,
        short_description: data.short_description,
        description: data.description,
        status: 'pending',
        views: 0,
      };
      const addarticles = await axiosSecure.post("/articles", newArticle);
      if (addarticles.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Article added",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    }
  };
  return (
    <div>
      <div className="mt-10">
        <h2 className="text-xl md:text-3xl  font-bold text-center">
          Add New Article
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Daisy */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Article Title</span>
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
          {/* Publosher & Tags */}
          <div className="form-control flex flex-col gap-4 md:flex-row ">
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Publisher</span>
              </label>
              <select
                {...register("publisher", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select a Publisher</option>
                {publisher.map((publisher) => (
                  <option key={publisher._id} value={publisher.publisher_name}>
                    {publisher.publisher_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              <Select
                options={tagOptions}
                isMulti
                onChange={handleTagChange}
                placeholder="Select tags"
              />
            </div>
          </div>
          {/* short descrp */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Short Description</span>
            </label>
            <textarea
              {...register("short_description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Write a short description"
            ></textarea>
          </div>
          {/* Full descrp */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Brief Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Write a detailed description"
            ></textarea>
          </div>
          {/* Image */}
          <div className="form-control mt-4 flex flex-col gap-4">
            <label>Upload Image</label>
            <input
              {...register("image", { required: true })}
              required
              type="file"
              className=" form-control file-input w-full max-w-xs"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-black text-white">
              Add Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
