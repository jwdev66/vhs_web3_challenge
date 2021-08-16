import Routes from './routes';
import useEagerConnect from './hooks/useEagerConnect';

const App = () => {
  useEagerConnect()
  return (<Routes />)
}

export default App
