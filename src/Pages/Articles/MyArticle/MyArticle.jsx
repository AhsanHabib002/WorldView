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

const MyArticle = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div>
      My article: {myArticles.length}
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Title</th>
              <th>Status</th>
              <th>Is Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myArticles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>
                  {article.status === "approved" && <span>Approved</span>}
                  {article.status === "declined" && (
                    <div>
                      Declined{" "}
                      <button
                        className="text-blue-500"
                        onClick={() => hadnleDecline}
                      >
                        Show Reason
                      </button>
                    </div>
                  )}
                  {article.status === "pending" && <span>Pending</span>}
                </td>
                <td>{article.isPremium ? "Yes" : "No"}</td>
                <td>
                  <Link>
                    <button className="btn btn-info">Details</button>
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => openUpdateModal(article)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteArticle(article)}
                  >
                    Delete
                  </button>
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
      </div>
    </div>
  );
};

export default MyArticle;
