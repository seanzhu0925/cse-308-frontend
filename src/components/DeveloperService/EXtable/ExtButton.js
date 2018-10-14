import React, { Component } from 'react';
import { Button } from 'antd';

export default class ExtButton extends Component {
    state = {
        disabled: false || this.props.disabled,
    };

    handleClick = () => {
        this.setState({
            disabled: true
        }, () => {
            this.props.onClick();
        })
    }

    render() {

        return (
            <Button
                onClick={this.handleClick}
                disabled={this.state.disabled}
                type={this.props.type}
                htmlType={this.props.htmlType}
                style={this.props.style}
            >
                {this.props.children}
            </Button>
        );
    }
}
