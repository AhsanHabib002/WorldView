import Trending from "./Trending";


const Home = () => {
    return (
        <div>
            {/* Hero */}
            <div className="text-black my-8">
                <h1 className="font-cinzel font-extrabold text-[7vw] lg:text-[6vw] text-center">All Trending News</h1>
            </div>
            {/* trending Articles */}
            <div>
                <Trending></Trending>
            </div>
        </div>
    );
};

export default Home;