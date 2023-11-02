import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href="#" onClick={() => handlePostClick(post.id)}>
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
