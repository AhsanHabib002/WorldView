import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useArticles from "../../../Hooks/useArticles";
import Modal from "react-modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePublishers from "../../../Hooks/usePublishers";
import Select from "react-select";
import { FaEye } from "react-icons/fa";

const MyArticle = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [articles] = useArticles();
  const { publishers } = usePublishers();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [updated, setUpdated] = useState({
    title: "",
    description: "",
    publisher: "",
  });
  const { data: myArticles = [], refetch } = useQuery({
    queryKey: ["myArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myarticles?email=${user.email}`);
      return res.data;
    },
  });

  const deleteArticle = (article) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/articles/${article._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "This Article has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const openUpdateModal = (article) => {
    setSelectedArticle(article);
    setUpdated({
      title: article.title,
      description: article.description,
      publisher: article.publisher,
    });
    setIsModalOpen(true);
  };
  // decline modal
  const openDeclineModal = (article) => {
    setDeclineReason(article.declineReason);
    setIsDeclineModalOpen(true);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUpdated((prev) => ({ ...prev, [name]: value }));
  };
  const handlePublisher = (selectedOption) => {
    setUpdated((prev) => ({
      ...prev,
      publisher: selectedOption ? selectedOption.label : "",
    }));
  };
  const handleUpdate = () => {
    axiosSecure.put(`/articles/${selectedArticle._id}`, updated).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();

        setIsModalOpen(false);

        Swal.fire({
          title: "Updated!",
          text: "Article has been updated successfully.",
          icon: "success",
        });
      }
    });
  };

  const hadnleDecline = () => {};

  return (
    <div className="my-[120px] md:my-[160px]">
      <h2 className="text-2xl my-4 font-bold">My article: {myArticles.length}</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full table-zebra hover text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Detail</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Is Premium</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myArticles.map((article, index) => (
              <tr key={article._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{article.title}</td>
                <td className="px-4 py-2">
                  <Link to={`/articles/${article._id}`}>
                    <button className="btn btn-info">Details</button>
                  </Link>
                </td>
                <td className="px-4 py-2">
                  {article.status === "approved" && <span>Approved</span>}
                  {article.status === "declined" && (
                    <div>
                      Declined{" "}
                      <button
                        className="btn bg-yellow-200"
                        onClick={() => openDeclineModal(article)}
                      >
                        <FaEye></FaEye>
                      </button>
                    </div>
                  )}
                  {article.status === "pending" && <span>Pending</span>}
                </td>
                <td className="px-4 py-2">
                  {article.isPremium ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="btn bg-black text-white"
                      onClick={() => openUpdateModal(article)}
                    >
                      Update
                    </button>
                    <button
                      className="btn bg-red-500"
                      onClick={() => deleteArticle(article)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Udpate */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Update Article"
        >
          <h3 className="text-lg font-bold">Update Article</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={updated.title}
              onChange={handleInput}
              className="input input-bordered w-full"
              placeholder="Title"
            />
            <textarea
              name="description"
              value={updated.description}
              onChange={handleInput}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            />
            <Select
              name="publisher"
              value={
                updated.publisher
                  ? { value: updated.publisher, label: updated.publisher }
                  : null
              }
              onChange={handlePublisher}
              options={publishers.map((publisher) => ({
                value: publisher.publisher_name,
                label: publisher.publisher_name,
              }))}
              placeholder="Select Publisher"
              className="basic-single"
              classNamePrefix="select"
            />
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </Modal>

        {/* decline */}
        <Modal
          isOpen={isDeclineModalOpen}
          onRequestClose={() => setIsDeclineModalOpen(false)}
          contentLabel="Decline Reason"
        >
          <h3 className="text-lg font-bold">Decline Reason</h3>
          <div className="flex flex-col gap-4">
            <p>{declineReason || "No reason My Mood"}</p>
            <button
              className="btn bg-red-500"
              onClick={() => setIsDeclineModalOpen(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyArticle;
