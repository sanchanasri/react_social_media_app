import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

const EditPost= () =>{
    const {posts, handleEdit, editBody, editTitle, setEditTitle, setEditBody}= useContext(DataContext)
    const {id}= useParams();
    const post=posts.find(post => (post.id).toString()===id)
    useEffect(() =>{
        if(post){
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    }, [posts, setEditBody, setEditTitle])
    return(
        <main className="NewPost">
            {editTitle&&
            <>
                <h2>Edit post</h2>
                <form className="newPostForm"
                onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle" 
                    >Title:</label>
                    <input
                    id="postTitle"
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody" 
                    >Body:</label>
                    <input
                    id="postBody"
                    type="text"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    />
                    <button type="submit" onClick={() =>handleEdit(post.id)}>Submit</button>

                </form>
            </>}
        </main>
    )
}
export default EditPost