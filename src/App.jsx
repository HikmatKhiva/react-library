import { Toaster } from 'react-hot-toast';
import useRoutes from './routes';
import './style.css';
function App() {
  const routes = useRoutes();
  return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          success: {
            theme: {
              primary: '#0074b1'
            }
          }
        }}
      />
      <div className="App ">
        {routes}
      </div>
    </>
  )
}

export default App;
