import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './List.css';
var classNames = require('classnames');


const numPerPage = 4;

class Articlelist extends Component {
    constructor(props) {
        super(props);
        this.state={
            count:Number,
            pages:Number,
            pageIndex:Number,
        }
        console.log('Articlelist constructor');
    };

    componentDidMount() {
        this.pageOnClick(0);

        // fetch(`http://127.0.0.1:8888/list/?page=1`)
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then((myJson) => {
        //         if (myJson.status === 0) {
        //             console.log('componentDidMount', this.props);
        //             this.props.success(myJson);
        //         }

        //     });
    }
    pageOnClick(page) {
        fetch(`http://127.0.0.1:8888/list/?page=${page}`,{
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify(idx),
        }).then(function (response) {
            return response.json();
          })
          .then((myJson) => {
            // if(myJson.status === 9){
            //   this.props.history.push({pathname:"/login/"});
            //   return;
            // }
            if (myJson.status === 0) {
              // console.log("list props", this.props);
              this.props.success(myJson);
              this.setState({
                count: myJson.count,  //文章总数量
                pages: Math.ceil(myJson.count / numPerPage),   //文章总页数
                pageIndex: page,         //第几页            
              })
            }
          });
      }
    render() {
        let pageArray = [];
        pageArray.push(<a className="page-link" key='first' onClick={this.pageOnClick.bind(this, 0)}>首页</a>);

        for (let i = 0; i < this.state.pages; i++) {
            if (this.state.pageIndex - i > -3 && this.state.pageIndex - i < 3 || i == 0 || i == this.state.pages - 1) {
                let className = classNames({ 'page-link': true }, { 'page-link-active': i == this.state.pageIndex });

                // let className = i == this.state.pageIndex? "page-link page-link-active":"page-link";
                pageArray.push(<a className={className} key={i} onClick={this.pageOnClick.bind(this, i)}>{i + 1}</a>);
            } else {
                if (this.state.pageIndex - i == -3 || this.state.pageIndex - i == 3) {
                    pageArray.push(<span className="page-ignore" key={i} >...</span>);
                }
            }
        }
        pageArray.push(<a className="page-link" key='last' onClick={this.pageOnClick.bind(this, this.state.pages - 1)}>末页</a>);
        return (
            <div>
                <ul class="articleList">
                    {
                        this.props.articles.map(p => (
                            <li key={p.number}>
                                <Link to={`/detail/${p.number}`}><h2>{p.title}</h2></Link>
                                {console.log({__html: p.content})}
                                <div dangerouslySetInnerHTML={{ __html: p.content }}></div>
                            </li>
                        ))
                    }
                </ul>
                <div className="page">{pageArray}</div>
            </div>
        )
    }
}


class List extends Component {
    constructor(props) {
        super(props);
        console.log('list constructor');
    }
    render() {
        console.log(this.props);
        return (
            <div className = 'list-wrap abc'>
                <Switch>
                    <Route exact path='/list' render={() => {
                        return <Articlelist {...this.props} />
                    }} />
                    {/* <Route path='/detail/:number' component={Detail} /> */}
                </Switch>
            </div>
        )
    }
}

const saveListData = (payload) => {
    return {
        type: 'SUCCESS',
        payload,
    }
}

const mapStateToProps = (state) => {
    return { articles: state.listReducer.articles };
};

const mapDispatchToProps = (dispatch) => {
    return {
        success: (data) => {
            dispatch(saveListData(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

