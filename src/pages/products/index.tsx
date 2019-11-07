import React from 'react';
import { Table, Pagination, Button } from 'element-react';
import './index.less';
import request from '../../services/request';

interface iState {
    list: any[];
    count: number;
}

export default class extends React.Component<any, iState> {
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
            // width: 180,
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
            label: '价格',
            prop: 'price',
            width: 100,
            render: (row: any) => {
                return (
                    <div>
                        {row.price}
                        <span>{row.unit}</span>
                    </div>
                );
            }
        },
        {
            label: '状态',
            prop: 'status',
            width: 90,
            render: (row: any) => {
                if (row.status === 0) return '可编辑';
                if (row.status === 1) return '上架中';
                return '';
            }
        },
        {
            label: '操作',
            width: 150,
            render: (row: any) => {
                return (
                    <Button.Group>
                        <Button onClick={() => this.edit(row.id)} type="primary" size="small">
                            编辑
                        </Button>
                        {row.status === 0 && (
                            <Button onClick={() => this.updown(row.id, row.status)} type="primary" size="small">
                                上架
                            </Button>
                        )}
                        {row.status === 1 && (
                            <Button onClick={() => this.updown(row.id, row.status)} type="primary" size="small">
                                下架
                            </Button>
                        )}
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
        this.getList();
    }

    async getList() {
        try {
            const data = await request.get('/goods', { pageindex: 1 });
            this.setState({
                list: data.rows,
                count: data.count
            });
        } catch (error) {
            console.log(error);
        }
    }

    edit(id: number) {
        console.log(id);
        // this.props.history.push('/');
    }
    /**
     * 上下架操作
     * @param id
     * @param status
     */
    async updown(id: number, status: number) {
        try {
            await request.post('/goods/updown/' + id + '/' + status);
            this.getList();
        } catch (error) {
            console.log(error);
        }
    }
}
