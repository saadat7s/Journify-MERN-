import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';
import './App.css';
import { ToastContainer } from 'react-toastify';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EditEntryModal from './components/EditEntryModal';
import AddEntryModal from './components/AddEntryModal';





function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path='/home' element={<Body />}/>
              <Route path="/edit/:id" element={<EditEntryModal />} />
              <Route path="/add" element={<AddEntryModal />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            <Footer />
            <ToastContainer/>
          </div>
    </Router>
  );
}

export default App;
