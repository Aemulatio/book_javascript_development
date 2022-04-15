import './App.css';
import Sparkle from "./Sparkle";

function App() {
    const name = "Stepka";
    const now = String(new Date())
    return (
        <div className="App">
            <p>Hello {name}!</p>
            <p>Current time is {now}</p>
            <p>2 + 2 = {2+2}</p>
            <Sparkle/>
        </div>
    );
}

export default App;
