import React from 'react';
import { Form, Input, Upload, Button, Notification } from 'element-react';
import './index.less';
import request from '../../services/request';
import Utils from '../../services/utils';

interface iParams {
    id?: number;
}

interface iModel {
    [index: string]: any;

    id: number;
    nickname: string;
    headimg: string;
    pwd: string;
    tell: string;
    finger: string;
    status: number;
    createdAt: string;
}
interface iState {
    model: iModel;
}

export default class extends React.Component<iReactRoute, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            model: {
                id: 0,
                nickname: '',
                headimg: '',
                pwd: '',
                tell: '',
                finger: '',
                status: 0,
                createdAt: ''
            }
        };
        this.params = Utils.parseParams(this.props.location.search).query;
    }

    params: iParams = {};
    render() {
        return (
            <div id="users_detail">
                <Form className="box" model={this.state.model} labelWidth="80">
                    <Form.Item label="id">
                        <Input className="input_s" disabled value={this.state.model.id} onChange={this.onChange.bind(this, 'id')}></Input>
                    </Form.Item>
                    <Form.Item label="昵称">
                        <Input className="input_s" disabled value={this.state.model.nickname} onChange={this.onChange.bind(this, 'nickname')}></Input>
                    </Form.Item>
                    <Form.Item label="头像">
                        <Upload onSuccess={this.uploaded} className="willupload" action="/api/upload" showFileList={false}>
                            {this.state.model.headimg ? <img src={this.state.model.headimg} alt="" /> : <i className="el-icon-plus avatar-uploader-icon"></i>}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="密码">
                        <Input className="input_s" disabled value={this.state.model.pwd} onChange={this.onChange.bind(this, 'pwd')}></Input>
                    </Form.Item>
                    <Form.Item label="电话">
                        <Input className="input_s" disabled value={this.state.model.tell} onChange={this.onChange.bind(this, 'tell')}></Input>
                    </Form.Item>
                    <Form.Item label="指纹">
                        <Input className="input_s2" disabled value={this.state.model.finger} onChange={this.onChange.bind(this, 'finger')}></Input>
                    </Form.Item>
                    <Form.Item label="状态">
                        <Input className="input_s2" disabled value={this.state.model.finger} onChange={this.onChange.bind(this, 'finger')}></Input>
                    </Form.Item>
                    <Form.Item label="创建日期">{this.state.model.createdAt}</Form.Item>
                    <Form.Item label="">
                        <Button onClick={this.save} type="primary">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    componentDidMount() {
        if (this.params.id) {
            this.getDetail();
        }
    }

    async getDetail() {
        try {
            const data = await request.get('/users/' + this.params.id);
            const model = this.state.model;
            model.id = data.id;
            model.nickname = data.nickname;
            model.headimg = data.headimg;
            model.pwd = data.pwd;
            model.tell = data.tell;
            model.finger = data.finger;
            model.status = data.status;
            model.createdAt = data.createdAt;
            this.setState({
                model
            });
        } catch (error) {
            console.log(error);
        }
    }

    onChange(key: string, value: any) {
        const model = this.state.model;
        model[key] = value;
        this.setState({
            model
        });
    }
    uploaded = (e: any) => {
        console.log(e);
    };
    save = () => {
        console.log(this.state.model);
    };
}
