import React, { useEffect, useState } from 'react';
import {


  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined, MailOutlined, SettingOutlined,

  ContainerOutlined,
  DesktopOutlined,

  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,

} from '@ant-design/icons';
import './index.css'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, theme } from 'antd';
import axios from 'axios'
const { Header, Sider, Content } = Layout;

function SideMenu(props) {
  const [menu, setMenu] = useState([])

  //第一次渲染画面
  useEffect(() => {
    axios.get("http://localhost:3000/rights?_embed=children").then(res => {
      setMenu(dfs1(res.data))
    })
  }, [])

  //生成渲染数组的对象
  const obj = (key, icon, label, children) => {
    return {
      key,
      icon,
      label,
      children,
    }
  }

  //图标映射对象
  var iconList = {
    "/home":<UserOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage": <UserOutlined />,
    "/right-manage/role/list": <UserOutlined />,
    "/right-manage/right/list": <UserOutlined />
    //.......
  }

  //渲染符合条件的数组对象
  const dfs1 = (list) => {
    const arr = []
    list.map((item) => {
      if (item.children && item.children.length !== 0) {
        arr.push(obj(item.key, iconList[item.key], item.label, dfs1(item.children)))
      } else {
        if (item.pagepermisson) {
          arr.push(obj(item.key, iconList[item.key], item.label))
        }
      }
    })
    return arr
  }


  //点击跳转对应组件
  const onClick = (e) => {
    props.history.push(e.key)
  };

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo" >全球新闻发布管理系统</div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        onClick={onClick}
        items={menu}
      />
    </Sider>
  )
}

export default withRouter(SideMenu)