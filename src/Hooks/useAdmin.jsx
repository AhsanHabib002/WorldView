import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isAdmin,isLoading,isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        },
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
    });
    return [isAdmin, isLoading,isAdminLoading]
};

export default useAdmin;