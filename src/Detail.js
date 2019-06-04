import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Detail.less';


class Detail extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let path=parseInt(this.props.match.params.number, 10);
        console.log(path);
        fetch(`http://127.0.0.1:8888/detail/${path}`)
            .then(function (response) {
                return response.json();
            })
            .then( (myJson) => {               
                this.props.success(myJson.article);
            });
    }

    render() {
        return (
            <div class="articlDetail">
                <h1 >{this.props.article.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: this.props.article.content }}></p>
                <Link to='/list'>Back</Link>
            </div>
        )
    }
}

const saveListData = (payload) => {
    return {
        type: 'DETAIL',
        payload,
    }
}

const mapStateToProps = (state) => {
    return {
        article: state.detailReducer.article,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        success: (data) => {
            dispatch(saveListData(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);