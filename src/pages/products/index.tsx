import React from 'react';
import { Table, Pagination, Button } from 'element-react';
import './index.less';

interface iState {
    list: any[];
}

export default class extends React.Component<any, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: []
        };
    }
    columns = [
        {
            label: 'id',
            prop: 'id',
            width: 90
        },
        {
            label: '商品图',
            prop: 'image',
            width: 140,
            render: (row: any) => {
                return <img src={row.image} alt="" />;
            }
        },
        {
            label: '标题',
            prop: 'title',
            width: 180,
            render: (row: any) => {
                return (
                    <div>
                        <div>{row.name}</div>
                        <div>{row.title}</div>
                    </div>
                );
            }
        },
        {
            label: '产地',
            prop: 'address'
        },
        {
            label: '联系人',
            prop: 'concat',
            width: 90
        },
        {
            label: '操作',
            width: 180,
            render: (row: any) => {
                return (
                    <Button.Group>
                        <Button type="primary" size="small">
                            上一页
                        </Button>
                        <Button type="primary" size="small">
                            下一页
                        </Button>
                    </Button.Group>
                );
            }
        }
    ];
    render() {
        return (
            <div id="products">
                <Table style={{ width: '100%' }} columns={this.columns} data={this.state.list} border={true} />
                <div className="foot">
                    <Pagination layout="prev, pager, next" total={50} small={true} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        const list: any[] = [];
        for (let index = 0; index < 20; index++) {
            list.push({
                id: index,
                title: 'title' + index,
                name: 'name' + index,
                concat: '郭方超',
                address: '北京市',
                image: 'http://img5.daling.com/data/files/zin/public/common/2019/10/17/14/31/45/AIKGUER000002239101.JPG_375x375.jpg'
            });
        }
        this.setState({ list });
    }
}
