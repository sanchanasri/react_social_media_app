import { createContext, useState, useEffect } from "react";
import api from "../api/posts"
import useWindowSize from '../Hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';


const DataContext = createContext({})
 export const DataProvider = ({children}) =>{


  const[search , setSearch] = useState('');
  const[posts, setPosts]= useState([]);
  const [searchResults, setSearchResults]= useState([]);
  const[postTitle, setPostTitle]= useState('');
  const [postBody, setPostBody]= useState('');
  const[editTitle, setEditTitle]= useState('');
  const [editBody, setEditBody]= useState('');
  const navigate= useNavigate()
  const {widht}= useWindowSize()

  useEffect(() =>{
    const fetchPosts =async () =>{
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      }
      catch(err)
      {
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
        else{
          console.log(`error: ${err.message}`)
        }
      }
    }
    fetchPosts();
  }, [])
  useEffect(() =>{
    const filteredResult = posts.filter((post) => (
      (post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()))
  

  setSearchResults(filteredResult.reverse());}, [posts, search]);



  const handleSubmit =async (e) =>{
    e.preventDefault();
    const id = posts.length ? (Number(posts[posts.length - 1].id) + 1).toString() : '1';
    const newPost ={id, title: postTitle, body:postBody};
    try{
        const response= await api.post('/posts', newPost)
        const allPosts =[...posts, response.data]
        setPosts(allPosts)
        setPostTitle('');
        setPostBody('');
        navigate('/');
    }
    catch(err)
      {
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
        else{
          console.log(`error: ${err.message}`)
        }
      }
  }


  const handleEdit = async (id) =>{
    const updatedPost ={id, title: editTitle, body:editBody};
    try{
      const response = await api.put(`/posts/${id}`, updatedPost)
        setPosts(posts.map(post => post.id===id ? {...response.data} :post))
        setEditTitle('');
        setEditBody('');
        navigate('/');
    }
    catch(err){
      if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }
      else{
        console.log(`error: ${err.message}`)
      }
    }
  }



  const handleDelete =async (id) =>{
    try{
      await api.delete(`/posts/${id}`)
    const postsLists = posts.filter(post => post.id!==id);
    setPosts(postsLists)
    navigate('/')
    }
    catch(err)
      {
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
        else{
          console.log(`error: ${err.message}`)
        }
      }

  }
    return(
        <DataContext.Provider value={{
            widht,search, setSearch, searchResults,
                handleSubmit, postTitle, setPostTitle,
                 postBody, setPostBody, posts, handleEdit, 
                 editBody, editTitle, setEditTitle, setEditBody,handleDelete
                
        }
          }>
            {children}
        </DataContext.Provider>
    )
 }
 export default DataContext