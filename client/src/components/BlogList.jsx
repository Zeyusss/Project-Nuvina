import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/data";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import { Link } from 'react-router-dom'
import Moment from 'moment'

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input, pagination, fetchBlogs } = useAppContext();
  const filteredBlogs = () => {
    if (!input || input === '') {
      return blogs;
    }
    return blogs.filter((blog) => 
      blog.title?.toLowerCase().includes(input.toLowerCase()) || 
      blog.category?.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handlePageChange = (page) => {
    fetchBlogs(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && " text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 ms:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {blog.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Moment(blog.createdAt).format('MMM Do YYYY')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                  {blog.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {blog.description.replace(/<[^>]*>/g, '')}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  {blog.author && (
                    <div className="text-sm text-gray-600">
                      By {blog.author.name}
                    </div>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {blog.commentCount || 0} comments
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {pagination.totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-10'>
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              pagination.currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            Previous
          </button>
          <div className='flex items-center gap-2'>
            {[...Array(pagination.totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-md ${
                  pagination.currentPage === index + 1
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className={`px-4 py-2 rounded-md ${
              pagination.currentPage === pagination.totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            Next
          </button>
        </div>
      )}
      <div className='text-center mt-4 text-gray-600'>
        <p>
          Showing {((pagination.currentPage - 1) * pagination.blogsPerPage) + 1} to{' '}
          {Math.min(pagination.currentPage * pagination.blogsPerPage, pagination.totalBlogs)} of{' '}
          {pagination.totalBlogs} blogs
        </p>
      </div>
    </div>
  );
};

export default BlogList;
