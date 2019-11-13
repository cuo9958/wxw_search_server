import React from 'react';
import './index.less';
import { Table, Button, Pagination } from 'element-react';
import request from '../../services/request';

interface iState {
    list: any[];
    count: number;
}

export default class extends React.Component<iReactRoute, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: [],
            count: 0
        };
    }

    columns = [
        {
            label: 'id',
            prop: 'id',
            width: 90
        },
        {
            label: '头像',
            prop: 'headimg',
            width: 140
        },
        {
            label: '昵称',
            prop: 'nickname',
            width: 140
        },
        {
            label: '电话',
            prop: 'tell',
            width: 90
        },
        {
            label: '指纹',
            prop: 'finger'
        },
        {
            label: '操作',
            width: 180,
            render: (row: any) => {
                return (
                    <Button.Group>
                        <Button onClick={()=>this.goDetail(row.id)} type="primary" size="small">
                            编辑
                        </Button>
                        <Button type="danger" size="small">
                            删除
                        </Button>
                    </Button.Group>
                );
            }
        }
    ];

    render() {
        return (
            <div id="users">
                <Table style={{ width: '100%' }} columns={this.columns} data={this.state.list} border={true} />
                <div className="foot">
                    <Pagination
                        onCurrentChange={this.onCurrentChange}
                        pageSize={20}
                        layout="prev, pager, next"
                        total={this.state.count}
                        small={true}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getList();
    }
    async getList() {
        try {
            const data = await request.get('/users');
            this.setState({
                list: data.rows,
                count: data.count
            });
        } catch (error) {
            console.log(error);
        }
    }

    onCurrentChange = (pageIndex: number) => {
        console.log(pageIndex);
    };

    goDetail(id:number){
        this.props.history.push('/users/detail?id=' + id);
    }
}
