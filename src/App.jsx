import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stanze from './pages/Stanze';
import StrutturaServizi from './pages/StrutturaServizi';
import Regolamento from './pages/Regolamento';
import Territorio from './pages/Territorio';
import Contatti from './pages/Contatti';
import DettaglioStanza from './pages/DettaglioStanza';
import { AuthProvider } from './admin/context/AuthContext';
import { EditModeProvider } from './context/EditModeContext';
import { EditToolbar } from './components/editable';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import './index.css';

// Layout per le pagine pubbliche (con Header e Footer)
function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <EditModeProvider>
        <Routes>
          {/* Route Admin - senza Header/Footer */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />

          {/* Route Pubbliche - con Header/Footer */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/stanze" element={<PublicLayout><Stanze /></PublicLayout>} />
          <Route path="/stanze/:slug" element={<PublicLayout><DettaglioStanza /></PublicLayout>} />
          <Route path="/struttura-servizi" element={<PublicLayout><StrutturaServizi /></PublicLayout>} />
          <Route path="/regolamento" element={<PublicLayout><Regolamento /></PublicLayout>} />
          <Route path="/territorio" element={<PublicLayout><Territorio /></PublicLayout>} />
          <Route path="/contatti" element={<PublicLayout><Contatti /></PublicLayout>} />
        </Routes>
        <EditToolbar />
      </EditModeProvider>
    </AuthProvider>
  );
}

export default App;
