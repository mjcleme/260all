import logo from './logo.svg';
import './App.css';
import BasicExample from './BasicExample.js';

function Bar() {
  return (
    <h1> This is Bar</h1>
  );
}

function Foo() {
  return (
    <div>
      <h1>THIS IS FOO</h1>
      <Bar />
    </div>
  );
}


function App() {
  return (
    
    <div className="App">
    <BasicExample />
      Hello World!
      <Foo />
    </div>
  );
}

export default App;
