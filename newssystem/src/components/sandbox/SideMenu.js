import React, { useState } from 'react';
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
import {withRouter} from 'react-router-dom'
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    label, key, icon, children, type
  };
}

//模拟数组结构
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

//模拟数组结构
const  menuList = [
  {
    key:"/home",
    label:"首页",
    icon:<UserOutlined />
  },
  {
    key:"/user-manage",
    label:"用户管理",
    icon:<UserOutlined />,
    children:[
      {
        key:"/user-manage/list",
        label:"用户列表",
        icon:<UserOutlined />
      }
    ]
  },
  {
    key:"/right-manage",
    label:"权限管理",
    icon:<UserOutlined />,
    children:[
      {
        key:"/right-manage/role/list",
        label:"角色列表",
        icon:<UserOutlined />
      },
      {
        key:"/right-manage/right/list",
        label:"权限列表",
        icon:<UserOutlined />
      }
    ]
  }
]

function SideMenu(props) {

  const renderMenu = ()=>{
    console.log(items);
    return menuList
      
  }

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
        items={renderMenu()
          /* [
          {
            key: '1',
            icon: <UserOutlined />,
            label: '首页',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: '用户管理',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: '',
          },
        ] */
        }
      />
    </Sider>
  )
}

export default withRouter(SideMenu)