import React, { Component } from 'react';
import { Upload, Button, Icon, Modal, message } from 'antd';
import { config } from '../../config/globalConfig';
import { deleteFile } from '../../services/file';
import styles from './ImgUpload.less';

const { serverUrl, serverName, upload } = config;

/**
 * 获取图片尺寸
 * return Promise
 * {width, height}
 * @param {*} fileData 
 * 
 */
function getImgSize(fileData) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            var data = e.target.result;
            if (data.indexOf("data:image") != 0) {
                reject("读取图片数据失败！")
            }
            //加载图片获取图片真实宽度和高度
            var image = new Image();
            image.onload = () => {
                var width = image.width;
                var height = image.height;
                resolve({
                    width,
                    height
                });
            };
            image.src = data;
        };
        reader.readAsDataURL(fileData);
    })
}
/**
 * 图片上传组件
 * fileList：已经上传的文件列表
 * onUploadSuccess： 上传成功回调,返回后台返回的data
 * onRemove：删除图片回调
 * disabled: 是否能上传，不传表示可以上传
 * listType： 图片列表展现形式，默认picture,可选picture-card
 * width,height限制图片尺寸，不传不限制
 * 
 */
export default class MultipleImgUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: this.props.fileList,
            isUpload: false,
            previewVisible: false,
            previewImage: '',
        }
    }
    beforeUpload = (file) => {
        return new Promise((resolve, reject) => {
            const { fileList } = this.state;
            const { limit = 5 } = this.props;
            if (fileList && fileList.length == limit) {
                message.warning(`每次最多上传${limit}张图片！`);
                reject();
            }
            if (this.props.width || this.props.height) {
                const data = async function (file) {
                    return await getImgSize(file);
                }(file)
                data.then(res => {
                    const { width, height } = res;
                    if (!width || !height) {
                        reject();
                    } else if (this.props.width != width || this.props.height != height) {
                        message.error(`所选图片尺寸(${width}*${height})不支持`);
                        reject();
                    } else {
                        resolve();
                    }
                }).catch(e => {
                    message.error("获取图片尺寸失败！");
                    reject();
                })
            }
            resolve();
        })
    }
    handleChange = (info) => {
        let fileList = info.fileList;
        // if (fileList.length > 1 && this.state.isUpload) {
        //     const { data } = fileList[fileList.length - 2];
        //     if (data) {
        //         deleteFile(data);
        //     }
        // }
        // fileList = fileList.slice(-1);
        fileList = fileList.map((file) => {
            if (file.response) {
                const { data, status } = file.response;
                if (status == 'success') {
                    this.setState({
                        isUpload: true
                    })
                    const { id, fileSuffix } = data;
                    file.data = data;
                    file.url = `${serverUrl}/${serverName}${upload.previewAction}?id=${data.id}&fileSuffix=${data.fileSuffix}`;
                }
                file.status = (status == 'success' ? 'done' : 'error');
            }
            return file;
        });
        if (fileList.length > 0 && fileList[fileList.length - 1].status == "done") {
            const { url, data } = fileList[fileList.length - 1];
            console.log("success", this.props.fileList);
            this.props.onUploadSuccess({
                data,
                url
            })
        }
        this.setState({ fileList });
    }
    handleCancel = () => this.setState({ previewVisible: false })
    render() {
        const { previewVisible, previewImage } = this.state;
        const { listType = 'picture' } = this.props;
        const props = {
            action: `${serverUrl}/${serverName}${upload.uploadAction}`,
            accept: 'image/*',
            onChange: this.handleChange,
            name: 'uploadFile',
            listType: listType,
            onPreview: (file) => {
                this.setState({
                    previewImage: file.url || file.thumbUrl,
                    previewVisible: true,
                });
            },
            onRemove: (file) => {
                if (this.props.disabled) {
                    return false;
                }
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                }, () => {
                    console.log(file.data)
                    this.props.onRemove(file.data);
                });
                if (this.state.isUpload && file.data) {
                    deleteFile(file.data);
                }
            },
            beforeUpload: this.beforeUpload.bind(this)
        };
        return (
            <div className={this.props.disabled ? styles.container : ''}>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Upload {...props} fileList={this.state.fileList}>
                    {!this.props.disabled ? (<Button >
                        <Icon type="upload" /> 上传附件
                    </Button>) : ''}
                </Upload>
            </div>
        );
    }
}