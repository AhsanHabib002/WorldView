import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUserProfile, setUser } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile({ displayName: name, photoURL });

      const res = await axiosSecure.put(
        `/users/update/${encodeURIComponent(user.email)}`,
        {
          displayName: name,
          photoURL,
        }
      );

      if (res.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          displayName: name,
          photoURL,
        }));

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("Failed to update profile in the database.");
      }
    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "An error occurred while updating your profile.",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-2xl my-10">My Profile</h2>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="btn bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
