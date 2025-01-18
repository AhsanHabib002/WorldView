import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleDeletUser = user =>{

  };

  return (
    <div>
      <div>
        <h2 className="text-xl md:text-3xl  font-bold text-center">
          Manage All Users: {users.length}
        </h2>
      </div>
      <div className="mt-20">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <p className="text-[16px] font-medium">#</p>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>User Role</th>
                <th>Action</th>  
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((users, index) => (
                <>
                  <tr key={users._id}>
                    <th>
                      <p>{index + 1}</p>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={users.photo}
                              alt="User Image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{users.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {users.email}
                    </td>
                    <td>Purple</td>
                    <th>
                      <button onClick={()=> handleDeletUser(user)} className="btn bg-red-500 btn-md text-white">
                        <FaTrash></FaTrash>
                      </button>
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
