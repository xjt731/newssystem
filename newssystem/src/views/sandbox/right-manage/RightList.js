import React, { useState, useEffect } from 'react'
import { Button, Table, Tag, Modal,Popover,Switch } from 'antd'
import { DeleteOutlined, EditOutlined,ExclamationCircleFilled } from '@ant-design/icons'
import axios from 'axios'

const {confirm} = Modal
export default function RightList() {

    const [dataSource, setdataSource] = useState(
        [

        ]
    )

    useEffect(() => {
        axios.get("http://localhost:3000/rights?_embed=children").then(res => {
            setdataSource(res.data)
        })
    }, [])



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => { return <b>{id}</b> }
        },
        {
            title: '权限名称',
            dataIndex: 'label'
        },
        {
            title: "权限路径",
            dataIndex: 'key',
            render: (key) => { return <Tag color='orange'>{key}</Tag> }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                   
                    <Popover content={<div style={{textAlign:"center"}}>
                        <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
                    </div>} title="页面配置项" trigger={item.pagepermisson===undefined?'':'click'}>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}/>
                    </Popover>

                    {/* <Popover content={<div ><Switch></Switch></div>} title="配置项" trigger='click'>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={false}/>
                    </Popover> */}
                </div>
            }
        }
    ];

    const  switchMethod = (item)=>{
        item.pagepermisson = item.pagepermisson===1?0:1
        // console.log(item)
        setdataSource([...dataSource])

        if(item.grade===1){
            axios.patch(`http://localhost:3000/rights/${item.id}`,{
                pagepermisson:item.pagepermisson
            })
        }else{
            axios.patch(`http://localhost:3000/children/${item.id}`,{
                pagepermisson:item.pagepermisson
            })
        }
    }

    const confirmMethod = (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
              console.log('OK');
              deleteMethod(item)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

     //删除
     const deleteMethod = (item) => {

         console.log(item)
        // 当前页面同步状态 + 后端同步
        if (item.grade === 1) {
            setdataSource(dataSource.filter(data => data.id !== item.id))
            axios.delete(`http://localhost:3000/rights/${item.id}`)
        }else{
            let list = dataSource.filter(data=>data.id===item.rightId)
            list[0].children = list[0].children.filter(data=>data.id!==item.id)
            setdataSource([...dataSource])
            axios.delete(`http://localhost:3000/children/${item.id}`)
        }
    }

    return (

        <Table dataSource={dataSource} columns={columns} />
    )
}
