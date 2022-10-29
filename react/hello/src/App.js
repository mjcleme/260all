import logo from './logo.svg';
import './App.css';
import Junk from "./Junk.js";

function Foo() {
  return (
    <div>
    <h1> Hello World </h1>
    </div>
    );
}
function App() {
  return (
    <div>
    <Foo bum="gee" />
    <Junk />
    <Foo />
    </div>
  );
}

export default App;
