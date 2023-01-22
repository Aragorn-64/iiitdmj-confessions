import './App.css';
import { ReactSession }  from 'react-client-session';
import {Post} from './components/post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EntryPage } from './components/entryPage';
import { LogoutBtn } from './components/logoutBtn';
import { Header } from './components/header';
import { CreateModal } from './components/createModal';


function App() {
  let [auth, setAuth] = useState(ReactSession.get("authType"))
  let [pass, setPass] = useState("")
  let [posts, setPosts] = useState([])


  let url = "http://localhost:4000"
  // let url = "https://conf-api.onrender.com"

  
  let getAllPosts = () => {
    axios.get(url+"/api/post/")
      .then((res) => {
        console.log(res)
        let arr = res.data.data;
        // console.log(arr)
        setPosts(arr) 
        // console.log(posts)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let getAcPosts = () => {
    axios.get(url+"/api/post/ac")
      .then((res) => {
        console.log(res)
        let arr = res.data.data;
        // console.log(arr)
        setPosts(arr) 
        // console.log(posts)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  // getAllPosts()
  useEffect(() => {
    // console.log(auth)
    if(auth == "auth"){
      getAcPosts()
      console.log("posts :" + posts)
      // let filtered = posts.filter((post) => {
      //   console.log(post.status)
      //   if(post.status == "accepted") return true;
      //   else return false;
      // });
      // let filtered = posts.filter(post => post.status == "accepted")
      // // setPosts(filtered)
      // console.log(filtered)
      // console.log('filtered being set')
    // getAllPosts()
    }
    else if(auth == "admin"){
      getAllPosts()
      console.log("posts :" + posts)
    }

    
    // setPosts(posts.data.data)
    
  }, [auth])
  // let posts = data.data

  // function getPosts() that returns a list of posts from api

  

  let checkAuth = () => {
      axios.post(url+'/api/auth', {
          pass: pass
      })
      .then((res) => {
          ReactSession.set("authType", res.data);
          setAuth(res.data);
          console.log("res.data :", res.data);
          setPass("")
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

  let AllPosts = posts.map((post) => {
    return <Post post={post} key={post._id}/>
  })

  return (
    <div className="App">

      <CreateModal url={url}/>
      <Header auth={auth} logoutFun={logoutFun} />
      {!auth || auth=="noauth" ? 
        <EntryPage checkAuth={checkAuth} pass={pass} setPass={setPass}/>
        : 
        (
          <>
            <div className='posts-container'>
              {AllPosts}
            </div>
          </>
          
        )
      }
    </div>
  );
}

export default App;
// /* {!ReactSession.get("authType") || ReactSession.get("authType")=="noauth" ?  */