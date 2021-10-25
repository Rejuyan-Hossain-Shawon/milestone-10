import logo from './logo.svg';
import './App.css';
import Map from './components/Map/Map';
import Direction from './components/Direction/Direction';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Form></Form>
      <Map></Map>
      <Direction></Direction>
    </div>
  );
}

export default App;
