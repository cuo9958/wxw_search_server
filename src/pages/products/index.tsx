import React from 'react';
import { Table, Pagination } from 'element-react';
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
            width: 180
        },
        {
            label: '标题',
            prop: 'title',
            width: 180
        },
        {
            label: '地址',
            prop: 'address'
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
                title: 'title' + index
            });
        }
        this.setState({ list });
    }
}
