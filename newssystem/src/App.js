import IndexRouter from './router/indexRouter'
import {Provider} from 'react-redux'
import './App.css'
import store from './redux/store'
function App(){
  return <Provider store={store}> 
    <IndexRouter></IndexRouter>
  </Provider>
}
export default App