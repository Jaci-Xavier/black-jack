import 'tailwindcss/tailwind.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
