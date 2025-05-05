import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticle = () => {
  const { user } = useAuth();
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

  // Tag Options
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
        email: user.email,
        name: user.displayName,
        author_photo: user.photoURL || "default-photo-url",
        posted_date: new Date().toISOString(),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Add New Article
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Article Title */}
            <div className="form-control">
              <label className="block text-lg text-gray-700 mb-2">Article Title</label>
              <input
                {...register("title")}
                type="text"
                placeholder="Enter article title"
                className="input input-bordered w-full p-4 rounded-md bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Publisher & Tags */}
            <div className="flex gap-6 md:flex-row flex-col">
              <div className="flex-1">
                <label className="block text-lg text-gray-700 mb-2">Publisher</label>
                <select
                  {...register("publisher", { required: true })}
                  className="select select-bordered w-full p-4 rounded-md bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Publisher</option>
                  {publisher.map((pub) => (
                    <option key={pub._id} value={pub.publisher_name}>
                      {pub.publisher_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-lg text-gray-700 mb-2">Tags</label>
                <Select
                  options={tagOptions}
                  isMulti
                  onChange={handleTagChange}
                  placeholder="Select tags"
                  className="w-full"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="form-control">
              <label className="block text-lg text-gray-700 mb-2">Short Description</label>
              <textarea
                {...register("short_description", { required: true })}
                className="textarea textarea-bordered w-full p-4 rounded-md bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write a short description"
                rows="4"
              ></textarea>
            </div>

            {/* Full Description */}
            <div className="form-control">
              <label className="block text-lg text-gray-700 mb-2">Full Description</label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full p-4 rounded-md bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write a detailed description"
                rows="6"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="block text-lg text-gray-700 mb-2">Upload Image</label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full p-4 rounded-md bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-8">
              <button type="submit" className="btn bg-indigo-600 text-white w-full py-4 rounded-md">
                Add Article
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
