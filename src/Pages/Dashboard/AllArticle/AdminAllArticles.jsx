import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import Swal from "sweetalert2";

const AdminAllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const {
    data: articles = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });

  const approveArticle = (id) => {
    axiosSecure.put(`/articles/${id}/approve`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Approved!", "Article has been approved.", "success");
      }
    });
  };

  const openDeclineModal = (id) => {
    setSelectedArticleId(id);
    setIsModalOpen(true);
  };

  const declineArticle = () => {
    axiosSecure
      .put(`/articles/${selectedArticleId}/decline`, { declineReason })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire("Declined!", "Reason has been saved.", "success");
          setIsModalOpen(false);
        }
      });
  };

  const makePremium = (id) => {
    axiosSecure.put(`/articles/${id}/premium`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Premium!", "Article is now premium.", "success");
      }
    });
  };

  const deleteArticle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This article will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/articles/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Article has been deleted.", "success");
          }
        });
      }
    });
  };
  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div>
      <h2>All Articles</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Author Name</th>
                <th>Title</th>
                <th>Posted Date</th>
                <th>Status</th>
                <th>Publisher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={article.author_photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{article.name}</div>
                        <div className="text-sm opacity-50">
                          {article.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{article.title}</td>
                  <td>{article.posted_date}</td>
                  <td>{article.status}</td>
                  <td>{article.publisher}</td>
                  <th>
                    <div className="flex flex-col gap-2">
                      <button
                        className="btn bg-black text-white btn-sm"
                        onClick={() => approveArticle(article._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => openDeclineModal(article._id)}
                      >
                        Decline
                      </button>
                      <button
                        className="btn bg-purple-500 btn-sm"
                        onClick={() => makePremium(article._id)}
                      >
                        Make Premium
                      </button>
                      <button
                        className="btn bg-red-500 btn-sm"
                        onClick={() => deleteArticle(article._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* decline */}
      {/* Decline Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Decline Reason"
      >
        <h2 className="text-lg font-bold">Provide Decline Reason</h2>
        <textarea
          className="textarea textarea-bordered w-full my-4"
          placeholder="Enter reason for decline"
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-4">
          <button className="btn bg-black text-white" onClick={declineArticle}>
            Submit
          </button>
          <button className="btn bg-red-500" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAllArticles;
