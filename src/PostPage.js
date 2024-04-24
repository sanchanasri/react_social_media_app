import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";

const PostPage = () =>{
  const {posts, handleDelete}= useContext(DataContext)
  const {id}= useParams();
  const post = posts.find(post => (post.id).toString() === id );
  return(
    <main className="PostPage">
      <article className="post">
        {post &&
        <>
          <h2>{post.title}</h2>
          <p className="postBody">{post.body}</p>
          <Link to={`/edit/${post.id}`}> <button style={{color: "black"} }>Edit post</button></Link>
          
          <button style={{color: "red"}}onClick={() => handleDelete(post.id)}>Delete post</button>
        </>}
        {!post &&
          <>
          <h2>Post not found</h2>
          <p><Link to="/">Visit our home page</Link></p></>
        }
      </article>
    </main>
  )
}
export default PostPage