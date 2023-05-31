import Cookie from "universal-cookie";
const cookie = new Cookie();

class cookieService{
    get(key){
        return cookie.get(key);
    }
    set(key, value){
        cookie.set(key, value);
    }
    remove(key){
        cookie.remove(key);
    }
}
let cs = new cookieService();
export default cs
