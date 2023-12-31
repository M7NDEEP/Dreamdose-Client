import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

const AllBlogs = ({ textEnter, textLeave }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dreamdose-backend.onrender.com/getblogs')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.allblogmaincont}>
        <h1>All Blogs</h1>
        {loading ? (
          <span className={styles.loader}></span>
        ) : (
          <div>
            {blogs.map((blog) => (
              <div key={blog._id} className={styles.allblogcont}>
                <div className={styles.allblogcontdiv}>
                  <h2>{blog.title}</h2>
                  <h3>{blog.description.slice(0, 150)}...</h3>
                  <p>{`Author: ${blog.author} | Date: ${blog.Date}`}</p>
                  <Link href={`/singleblog?id=${blog._id}`}>
                    <button onMouseEnter={textEnter} onMouseLeave={textLeave}>
                      Read More
                    </button>
                  </Link>
                </div>
                <img
                  className={styles.allblogcardimg}
                  src={blog.imageurl}
                  alt="No Image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllBlogs;
