import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
var classNames = require('classnames');
import './picture.less';


class Picture extends Component{
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
        }
    }
    componentDidMount() {
        console.log('picture');
        fetch(`http://127.0.0.1:8888/picture/`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            //     // body: JSON.stringify(idx),
        }).then(function (response) {
            return response.json();
        }).then((myJson) => {
            this.setState({
                fileList: myJson,
            });
        });
    }
    render(){
        const previewImage = this.state;
        const imgList = this.state.fileList.map((element, index) => {
            return <li key={element.uid}>
                <a href="#" target="_blank">
                    <img src={element.url} />
                    <span>{element.name}</span>
                </a>
            </li>
        });

        return (
            <div>
                <ul className='imglist'>
                     {imgList}
                </ul> 
            </div>
        )
    }
}


export default Picture;