import React from 'react';
import { Form, Input, Upload, Radio, Button } from 'element-react';
import './index.less';
import request from '../../services/request';
import Utils from '../../services/utils';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

interface iModel {
    [index: string]: any;
}
interface iState {
    model: iModel;
    EditorState: any;
}
interface iParams {
    id?: number;
}
export default class extends React.Component<iReactRoute, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            model: {},
            EditorState: BraftEditor.createEditorState('')
        };
        this.params = Utils.parseParams(this.props.location.search).query;
    }
    params: iParams = {};
    render() {
        return (
            <div id="product_detail">
                <Form className="box" model={this.state.model} labelWidth="80">
                    <Form.Item label="sku">
                        <Input className="input_s" disabled value={this.state.model.sku} onChange={this.onChange.bind(this, 'sku')}></Input>
                    </Form.Item>
                    <Form.Item label="前缀">
                        <Input className="input_s" value={this.state.model.pre} onChange={this.onChange.bind(this, 'pre')}></Input>
                        <span className="tips">2-4个字,地区、包邮、特色</span>
                    </Form.Item>
                    <Form.Item label="卖点">
                        <Input className="input_s2" value={this.state.model.name} onChange={this.onChange.bind(this, 'name')}></Input>
                        <span className="tips">5-10个字，吸引力的描述</span>
                    </Form.Item>
                    <Form.Item label="标题">
                        <Input value={this.state.model.title} onChange={this.onChange.bind(this, 'title')}></Input>
                    </Form.Item>
                    <Form.Item label="简介">
                        <Input
                            type="textarea"
                            autosize={{ minRows: 2, maxRows: 4 }}
                            value={this.state.model.des}
                            onChange={this.onChange.bind(this, 'des')}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="主图">
                        <Upload className="willupload" action="//jsonplaceholder.typicode.com/posts/" showFileList={false}>
                            {this.state.model.image ? (
                                <img src={this.state.model.image} alt="" />
                            ) : (
                                <i className="el-icon-plus avatar-uploader-icon"></i>
                            )}
                        </Upload>
                        {/* <Input value={this.state.model.image} onChange={this.onChange.bind(this, 'name')}></Input> */}
                    </Form.Item>
                    <Form.Item label="售价">
                        <Input className="input_s" value={this.state.model.price} onChange={this.onChange.bind(this, 'price')}></Input>
                    </Form.Item>
                    <Form.Item label="单位">
                        <Input className="input_s" value={this.state.model.unit} onChange={this.onChange.bind(this, 'unit')}></Input>
                    </Form.Item>
                    <Form.Item label="状态">
                        <Radio.Group value={this.state.model.status} onChange={this.onChange.bind(this, 'status')}>
                            <Radio value="0">可编辑</Radio>
                            <Radio value="1">已上架</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="规格">
                        <Input className="input_s" value={this.state.model.spec} onChange={this.onChange.bind(this, 'spec')}></Input>
                    </Form.Item>
                    <Form.Item label="产地">
                        <Input className="input_s2" value={this.state.model.place} onChange={this.onChange.bind(this, 'place')}></Input>
                    </Form.Item>
                    <Form.Item label="快递信息">
                        <Input className="input_s2" value={this.state.model.express} onChange={this.onChange.bind(this, 'express')}></Input>
                    </Form.Item>
                    <Form.Item label="发货区域">
                        <Input className="input_s2" value={this.state.model.ship_area} onChange={this.onChange.bind(this, 'ship_area')}></Input>
                    </Form.Item>
                    <Form.Item label="售后说明">
                        <Input
                            type="textarea"
                            autosize={{ minRows: 2, maxRows: 4 }}
                            value={this.state.model.after_sale}
                            onChange={this.onChange.bind(this, 'after_sale')}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="包装">
                        <Input className="input_s" value={this.state.model.pack} onChange={this.onChange.bind(this, 'pack')}></Input>
                    </Form.Item>
                    <Form.Item label="详情简介">
                        <BraftEditor onChange={this.saveEditor} value={this.state.EditorState}></BraftEditor>
                    </Form.Item>
                    <Form.Item label="">
                        <Button onClick={this.save}>保存</Button>
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
            const data = await request.get('/goods/' + this.params.id);
            const model = this.state.model;
            model.id = data.id;
            model.sku = data.sku;
            model.pre = data.pre;
            model.name = data.name;
            model.title = data.title;
            model.des = data.des;
            model.image = data.image;
            model.price = data.price;
            model.unit = data.unit;
            model.status = data.status;

            model.spec = data.spec;
            model.place = data.place;
            model.express = data.express;
            model.ship_area = data.ship_area;
            model.after_sale = data.after_sale;
            model.pack = data.pack;
            model.txts = data.txts;

            model.imgs = data.imgs;
            this.forceUpdate();
            this.setState({
                model,
                EditorState: BraftEditor.createEditorState(data.txts)
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
    saveEditor = (editorState: any) => {
        this.setState({
            EditorState: editorState
        });
    };
    save = async () => {
        const model = this.state.model;
        model.txts = this.state.EditorState.toHTML();

        console.log(this.state.model);
        try {
            await request.post('/goods', model);
        } catch (error) {
            console.log(error);
        }
    };
}
