import './App.css';
import { ReactSession } from 'react-client-session';
import { Post } from './components/post';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import env from "react-dotenv";
import { EntryPage } from './components/entryPage';
import { Header } from './components/header';
import { CreateModal } from './components/createModal';
import cookieService from './services/cookieService';

function App() {
  let [errM, setErrM] = useState("")
  let [auth, setAuth] = useState(ReactSession.get("authType"))
  let [pass, setPass] = useState("")
  let [posts, setPosts] = useState([])
  let [count, setCount] = useState(0)
  let [previews, setPreviews] = useState([])

  let url = env.API_URL

  let getPreviewPosts = () => {
    axios.get(url + "/api/post/prev", { withCredentials: true })
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
    axios.get(url + "/api/post", { withCredentials: true })
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
    axios.get(url + "/api/post/ac", { withCredentials: true })
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
    axios.post(url + '/api/auth', {
      pass: pass
    })
      .then((res) => {
        let servAuthType = res.data.authType;
        let token = res.data.token
        console.log("token: ", token, "Auth type: ", servAuthType)
        // console.log(servAuthType)
        ReactSession.set("authType", servAuthType);
        cookieService.set("token", token)
        setAuth(servAuthType);
        // setAuth("auth")
        console.log("res.data :", res.data);
        setPass("")
      })
      .catch((err) => console.log(err))
  }

  let logoutFun = () => {
    ReactSession.set('authType', "noauth");
    cookieService.remove("token")
    setAuth("noauth")
  }

  let updateFun = (id) => {
    let putUrl = url + "/api/post/" + id
    console.log(putUrl)
    axios.put(putUrl, {}, { withCredentials: true })
      .then(() => {
        console.log("Updated status of " + id)
        let newC = count + 1;
        setCount(newC)
      })
      .catch((err) => {
        console.log(err);
      })

  }

  let deleteFun = (id) => {
    let deleteUrl = url + "/api/post/" + id
    console.log(deleteUrl)
    axios.delete(deleteUrl, { withCredentials: true })
      .then(() => {
        console.log("Deleted status of " + id)
        setCount(count - 1)
      })
      .catch((err) => {
        console.log(err);
      })
  }


  let AllPosts = "" //might need to improve this
  if (posts.length > 0)
    AllPosts = posts.map((post) => {
      return <Post post={post} key={post._id} deleteFun={deleteFun} updateFun={updateFun} />
    })
  else AllPosts = <>No accepted posts yet :( <br></br> Post one yourself or wait while the admin approves your post :)</>

  useEffect(() => {
    // console.log(auth)
    if (auth === "auth") {
      getAcPosts()
      console.log("posts :" + posts)
    }
    else if (auth === "admin") {
      getAllPosts()
      console.log("posts :" + posts)
    }
    else getPreviewPosts();

    // setPosts(posts.data.data)

  }, [auth, count])



  return (
    <div className="App">

      <CreateModal url={url} count={count} setCount={setCount} />
      <Header auth={auth} logoutFun={logoutFun} />
      {!auth || auth === "noauth" ?
        <EntryPage checkAuth={checkAuth} pass={pass} previews={previews} setPass={setPass} />
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