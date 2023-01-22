import './App.css';
import { ReactSession }  from 'react-client-session';
import {Post} from './components/post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EntryPage } from './components/entryPage';
import { LogoutBtn } from './components/logoutBtn';


function App() {
  let message;
  if(!ReactSession.get("authType") || ReactSession.get("authType")=="noauth"){
    message = "please login"
  }
  else{
    message="logged in"
  }

  // ReactSession.set("authType", "noauth");

  let [posts, setPosts] = useState([])
  let getAllPosts = () => {
    // axios.get("http://conf-api.onrender.com/api/post/")
    axios.get("http://localhost:4000/api/post/")
      .then((data) => {
        setPosts(data.data) 
        console.log(posts)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  // getAllPosts()
  useEffect(() => {
    getAllPosts()
    console.log("posts :" + posts)
    
    // setPosts(posts.data.data)
    
  }, [])
  // let posts = data.data

  // function getPosts() that returns a list of posts from api

  let [auth, setAuth] = useState(ReactSession.get("authType"))
  let [pass, setPass] = useState("")

  let checkAuth = () => {
      let url = "http://localhost:4000"
      axios.post(url+'/api/auth', {
          pass: pass
      })
      .then((res) => {
          ReactSession.set("authType", res.data);
          setAuth(res.data);
          console.log("res.data :", res.data);
      })
      .catch((err) => console.log(err))
  }
  let logoutFun = () => {
    ReactSession.set('authType',"noauth");
    setAuth("noauth")
  }


  let dummyP = {
    _id:"63cc469023e6c93e2af94f49",
    bodyText:"HEllo this is post 5",
    status:"pending",
    createdAt:"Wed Jul 28 1993",
    __v:0
  }

  // let AllPosts = posts.map((post) => {
  //   return <Post post={post}/>
  // })

  return (
    <div className="App">
      {message}
      {!auth || auth=="noauth" ? 
        <EntryPage checkAuth={checkAuth} pass={pass} setPass={setPass}/>
        : 
        (
          <div className='posts-container'>
            {/* {AllPosts} */}
            <LogoutBtn logoutFun = {logoutFun}  />
          </div>
        )
      }
    </div>
  );
}

export default App;
// /* {!ReactSession.get("authType") || ReactSession.get("authType")=="noauth" ?  */