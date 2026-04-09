import React from 'react'
import "../style/feed.scss"
import Post from "../components/Post"
import { usePost } from '../hook/usePost'
import { useEffect } from 'react'
import Nav from '../../shared/components/Nav'









const Feed = (user , post) => {


const {feed , handleGetFeed , loading , handleLike , handleUnLike} = usePost()

useEffect(()=>{
    handleGetFeed()
},[])

if(loading || !feed){
    return ( <main>
        <h1>Feed is loading.....</h1>
    </main> )
}






  return (
    <>
    <main className='feed-page'>
        <Nav/>
        <div className="feed">
            <div className="posts">
               {feed.map(post =>{
                return <Post key={post._id} user={post.user} post={post} handleLike={handleLike} handleUnLike={handleUnLike}/>
               })}
            </div>
        </div>
    </main>
    </>
  )
}

export default Feed