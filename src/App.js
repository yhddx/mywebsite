import React, { Component } from 'react';
import './index.less';
import listIcon from './image/list.png';
import homeIcon from './image/home.png';
import pictureIcon from './image/picture.png';
import { Switch, Route, Link } from 'react-router-dom';
import List from './List';
import Detail from './Detail';
import Picture from './Picture';

const Home = () => (
    <div class="introduction">
        <blockquote>
            洋槐朵朵笑的博客
                <p class="line1">人生就像峡谷里的一粒种子。</p>
            <p class="line2">只有顽强拼搏，努力生长，才能长出峡谷，看见阳光，</p>
            <p class="line3">如果放弃，那么就会永远看不见阳光。</p>
        </blockquote>
    </div >
)
function NoMatch({ location }) {
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/list' component={List} />
            <Route path='/detail/:number' component={Detail} />
            <Route path='/picture' component={Picture} />
        </Switch>
    </main>
)
const Header = () => (
    <header>
        <nav>
            <ul class="icon">
                <li><Link to='/'><img class="home" src={homeIcon} alt="homeIcon" /></Link></li>
                <li><Link to='/list'><img class="list" src={listIcon} alt="listIcon" /></Link></li>
                <li><Link to='/picture'><img class="list" src={pictureIcon} alt="pictureIcon" /></Link></li>
            </ul>
        </nav>
    </header>
)



export class App extends Component {

    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}