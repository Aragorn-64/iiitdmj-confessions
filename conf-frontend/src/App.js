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
  let [count, setCount] = useState(0)
  let [previews, setPreviews] = useState([])


  let url = "http://localhost:4000"
  // let url = "https://conf-api.onrender.com"

  let getPreviewPosts = () => {
    axios.get(url+"/api/post/prev")
      .then((res) => {
        // console.log(res)
        let arr = res.data.data;
        // console.log("preview arr: " + arr)
        setPreviews(arr)
      })
      .catch((err) => {
        console.log(err);
      })
  }


  let getAllPosts = () => {
    axios.get(url+"/api/post")
      .then((res) => {
        // console.log(res)
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
        // console.log(res)
        let arr = res.data.data;
        // console.log(arr)
        setPosts(arr) 
        // console.log(posts)
      })
      .catch((err) => {
        console.log(err);
      })
  }

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

  let updateFun = (id) => {
    let putUrl =  url + "/api/post/"+String(id)
    axios.put(putUrl)
      .then(() => {
        console.log("Updated status of "+id) 
        // window.location.reload()
        // this.forceUpdate();
        let newC = count+1;
        setCount(newC)
      })
      .catch((err) => {
        console.log(err);
      })
      
  }

  
  let deleteFun = (id) => {
    let deleteUrl = url + "/api/post/"+ +String(id)
    axios.delete(deleteUrl)
      .then(() => {
        console.log("Deleted status of "+id) 
        let newC = count+1;
        setCount(newC)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let AllPosts = posts.map((post) => {
    return <Post post={post} key={post._id} deleteFun={deleteFun} updateFun={updateFun}  />
  })

  useEffect(() => {
    // console.log(auth)
    if(auth == "auth"){
      getAcPosts()
      console.log("posts :" + posts)
    }
    else if(auth == "admin"){
      getAllPosts()
      console.log("posts :" + posts)
    }

    getPreviewPosts();
    
    // setPosts(posts.data.data)
    
  }, [auth, count])



  return (
    <div className="App">

      <CreateModal url={url}/>
      <Header auth={auth} logoutFun={logoutFun} />
      {!auth || auth=="noauth" ? 
        <EntryPage checkAuth={checkAuth} pass={pass} previews={previews} setPass={setPass}/>
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