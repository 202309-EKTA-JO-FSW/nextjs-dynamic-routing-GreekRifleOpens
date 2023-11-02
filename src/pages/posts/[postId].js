import { useRouter } from "next/router";

const Post = ({ post, comments }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-10 my-4 py-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">{post.date}</span>
        <a
          className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href="#"
        >
          {post.category}
        </a>
      </div>
      <div className="mt-2">
        <a
          className="text-2xl text-gray-700 font-bold hover:text-gray-600"
          href="#"
        >
          {post.title}
        </a>
        <p className="mt-2 text-gray-600">{post.body}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <a className="text-blue-600 hover:underline" href="#">
          Read more
        </a>
        <div>
          <a className="flex items-center" href="#">
            <img
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              src={post.authorImage}
              alt="avatar"
            />
            <h1 className="text-gray-700 font-bold">{post.author}</h1>
          </a>
        </div>
      </div>

      {}
      <div className="bg-gray-100 rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <h3 className="text-lg font-semibold">{comment.name}</h3>
            <p className="text-gray-600">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  const paths = posts.map((post) => ({
    params: { postId: `${post.id}` },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { postId } = params;
  const ONE_POST_URL = `https://jsonplaceholder.typicode.com/posts/${postId}`;
  const COMMENTS_URL = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

  try {
    const postResponse = await fetch(ONE_POST_URL);
    const post = await postResponse.json();

    const commentsResponse = await fetch(COMMENTS_URL);
    const comments = await commentsResponse.json();

    return {
      props: {
        post,
        comments,
      },
    };
  } catch (error) {
    return {
      props: {
        post: null,
        comments: [],
      },
    };
  }
}

export default Post;
