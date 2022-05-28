import Navbar from "./components/Navbar/Navbar";
import RegistrationSteps from "./components/RegistrationSteps/RegistrationSteps";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { BrowserRouter , Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import Messenger from "./components/Messenger/Messenger";





const App = () => {

    
    return (
        <BrowserRouter>
            <div style={{backgroundColor:"#efefef" ,overflow:'hidden',height:'100%',display:'flex',alignItems:'flex-start',justifyContent:'center'}}>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/finishingsignup" exact component={RegistrationSteps}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/post/:id" component={PostDetails} />
                    <Route path="/users/:id" component={UserProfile} />
                    <Route path="/messenger" component={Messenger} />
                </Switch>
            </div>
        </BrowserRouter>
        );
}

export default App;