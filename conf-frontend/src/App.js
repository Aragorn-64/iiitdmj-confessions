import './App.css';
import { ReactSession }  from 'react-client-session';
import {Post} from './components/post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EntryPage } from './components/entryPage';


function App() {
  let message;
  if(!ReactSession.get("authType") || ReactSession.get("authType")=="noauth"){
    message = "please login"
  }
  else{
    message="logged in"
  }

  // ReactSession.set("authType", "noauth");

  // let [posts, setPosts] = useState([])
  // let getAllPosts = async () => {
  //   // axios.get("http://conf-api.onrender.com/api/post/")
  //   axios.get("http://localhost:4000/api/post/")
  //     .then((data) => {
  //       console.log(data)
  //       setPosts(data) 
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }
  // useEffect(() => {
  //   getAllPosts()
  //   console.log("posts :" + posts)
  // }, [])
  // let posts = data.data
  // console.log(posts)

  // function getPosts() that returns a list of posts from api
  






  let dummyP = {
    _id:"63cc469023e6c93e2af94f49",
    bodyText:"HEllo this is post 5",
    status:"pending",
    createdAt:"Wed Jul 28 1993",
    __v:0
  }
  return (
    <div className="App">
      {message}
      {!ReactSession.get("authType") || ReactSession.get("authType")=="noauth" ? 
        <EntryPage/> : 
        (
          <div className='posts-container'>
            <Post post={dummyP}/>
          </div>
        )
      }
    </div>
  );
}

export default App;
