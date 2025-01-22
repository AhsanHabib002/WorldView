import { useState } from "react";
import useArticles from "../../Hooks/useArticles";
import usePublishers from "../../Hooks/usePublishers";
import Select from "react-select";
import ArticleCard from "./ArticleCard";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllArticles = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    publisher: "",
    tags: [],
    search: "",
  });
  const [articles, refetch, isLoading, isError]  = useArticles(filters);

  const { publishers } = usePublishers();
  const handlePublishChnage = (selectedOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      publisher: selectedOption ? selectedOption.value : "",
    }));
  };

  const axiosSecure = useAxiosSecure();
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleTagChange = (selectedTags) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: selectedTags.map((tag) => tag.value),
    }));
  };
  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };
  const resetFilters = () => {
    setFilters({
      publisher: "",
      tags: [],
      search: "",
    });
  };
  const publisherOptions = publishers.map((publisher) => ({
    value: publisher.publisher_name,
    label: publisher.publisher_name,
  }));
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
  return (
    <div>
      <div className="mt-10">
        <h2 className="text-xl md:text-3xl  font-bold text-center">
          All News Around the World:
        </h2>
      </div>
      {/* Filter */}
      <div className="my-6">
        <h3 className="text-xl font-medium">Filter Articles</h3>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-1/3">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={filters.search}
                onChange={handleSearchChange}
                className="grow"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          <div className="md:w-1/3">
            <Select
              options={publisherOptions}
              onChange={handlePublishChnage}
              placeholder="Select Publisher"
              isClearable
            />
          </div>

          <div className="md:w-1/3">
            <Select
              isMulti
              options={tagOptions}
              onChange={handleTagChange}
              placeholder="Select Tags"
            />
          </div>
          <button onClick={resetFilters} className="btn bg-black text-white">
            Reset
          </button>
        </div>
      </div>
      {/* Article */}

      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              user={users}
            ></ArticleCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
