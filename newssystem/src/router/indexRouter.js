import { Redirect, Route,Switch } from 'react-router-dom'
import React from 'react'
import {HashRouter} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
export default function indexRouter() {
  return (
      <HashRouter>
          {/* 模糊匹配 */}
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' component={NewsSandBox}/>
            {/* <Route path='/' render={()=>{
            
            <NewsSandBox></NewsSandBox>
            
            }}/> */}
            
          </Switch>
      </HashRouter>
  )
}
