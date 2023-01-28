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

export default new cookieService();
