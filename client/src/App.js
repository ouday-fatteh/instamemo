import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { BrowserRouter , Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";





const App = () => {

    
    return (
        <BrowserRouter>
            <div style={{backgroundColor:"#efefef" ,overflow:'hidden',height:'100%',display:'flex',alignItems:'flex-start',justifyContent:'center'}}>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/post/:id" component={PostDetails} />
                    <Route path="/users/:id" component={UserProfile} />
                </Switch>
            </div>
        </BrowserRouter>
        );
}

export default App;