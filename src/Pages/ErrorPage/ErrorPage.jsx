import { Link } from "react-router-dom";
import error from "../../assets/error.jpg"

const ErrorPage = () => {
    return (
        <div>
            <div className="h-[100vh] flex flex-col items-center justify-center gap-[30px]">
            <img className="w-[450px] h-[350px] object-cover" src={error} alt="" />
            <h2 className='text-2xl md:text-6xl font-bold text-center'>404 Route not Found</h2>
            <Link to="/">
                <a className="btn bg-black text-white">Back to Home</a>
              </Link>
        </div>
        </div>
    );
};

export default ErrorPage;