import Story from "./Story/Story";
import "./Stories.css";

const Stories = () => {
    return (
        <div className="Stories__main-container">
            <div className="Stories__wrapper">
                <Story key={3} />
                <Story key={39} /> <Story key={30} />
                <Story key={32} />
                <Story key={35} />
                <Story key={38} />
            </div>
        </div>
    )
}


export default Stories;