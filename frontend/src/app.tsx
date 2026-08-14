import {Header} from "./components/header";
import {Main} from "./components/main";
import {Services} from "./components/service";
import {Contacts} from "./components/contacts";
import {Footer} from "./components/footer";

export function App() {
  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', color: '#0f172a' }}>
      <div style={{ padding: '10px', background: '#0284c7', color: '#fff', textAlign: 'center' }}>
      </div>
      <Header />
      <Main />
      <Services />
      <Contacts />
      <Footer />
    </div>
  );
}

export default App;