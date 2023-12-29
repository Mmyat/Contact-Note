import {Routes,Route} from 'react-router-dom';
import Contact from "./components/Contact";
import Create from "./components/Create";
import Edit from "./components/Edit";
// import "./index.css";
const App = () => {
  return (
    <div className='container mx-auto'>
      <Routes>
        <Route path="/" element={<Contact/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </div>
  )
}
export default App;