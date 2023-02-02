import { Redirect, Route,Switch } from 'react-router-dom'
import React from 'react'
import {HashRouter} from 'react-router-dom'
import Login from '../views/login/Login'
import Detail from '../views/news/Detail'
import News from '../views/news/News'
import NewsSandBox from '../views/sandbox/NewsSandBox'
export default function indexRouter() {
  return (
      <HashRouter>
          {/* 模糊匹配 */}
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/news' component={News}/>
            <Route path='/details/:id' component={Detail}/>
            {/* <Route path='/' component={NewsSandBox}/> */}
            <Route path='/' render={()=>{
              return localStorage.getItem('ss')?
              <NewsSandBox></NewsSandBox>:
              <Redirect to="/login"/>
            }}/>
            
          </Switch>
      </HashRouter>
  )
}
