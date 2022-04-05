import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { BrowserRouter , Route, Switch } from "react-router-dom";

const App = () => {

    return (
        <BrowserRouter>
            <div style={{backgroundColor:"#efefef"}}>
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/auth" component={Auth}/>
                </Switch>
            </div>
        </BrowserRouter>
        );
}

export default App;