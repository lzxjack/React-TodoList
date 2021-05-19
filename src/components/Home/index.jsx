import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Outline from './Outline';
import Content from './Content';
import Nav from './Nav';
import CenterBox from './CenterBox';
import { db, auth } from '../../utils/cloudBase';
import { initFromDB, initID } from '../../redux/actions/doneSum';
import { initTask } from '../../redux/actions/tasks';
import {
    updateAvatarUrl,
    updateNickName,
    updateAvatarTempUrl,
    updateUserName,
} from '../../redux/actions/userInform';

class Home extends Component {
    async componentDidMount() {
        // 判断用户是否第一次登陆
        let isFirst = false;
        // 查询集合doneSum中有无文档
        await db
            .collection('doneSum')
            .get()
            .then(res => {
                // 如果没文档，则是第一次登陆
                // 否则isFirst依然是false，不是第一次登陆
                // 不是第一次登陆，就将数据库中的count放入redux
                if (res.data.length === 0) {
                    isFirst = true;
                } else {
                    // 从数据库中得到用户的count值，放入redux
                    this.props.initFromDB(res.data[0].count);
                    // 将返回的id存入redux
                    this.props.initID(res.data[0]._id);
                }
            });
        // 如果是第一次登陆，在集合doneSum中创建一个用于计数的文档
        if (isFirst) {
            await db
                .collection('doneSum')
                .add({
                    count: 0,
                })
                .then(res => {
                    // 第一次登陆初始count肯定是0，直接写0即可
                    this.props.initFromDB(0);
                    // 将返回的id存入redux
                    this.props.initID(res.id);
                });
        }

        // 将数据库中的任务放入redux
        db.collection('tasks')
            .get()
            .then(res => {
                this.props.initTask(res.data);
            });

        // 刷新用户信息，获取最新的用户信息
        auth.currentUser.refresh().then(() => {
            // 将用户上的信息添加到redux状态中
            this.props.updateNickName(auth.currentUser.nickName);
            this.props.updateAvatarUrl(auth.currentUser.avatarUrl);
            this.props.updateAvatarTempUrl(auth.currentUser.avatarUrl);
            this.props.updateUserName(
                JSON.parse(localStorage.getItem('user_info_todolist-3gayiz0cb9b8b263')).content
                    .username
            );
        });
    }
    render() {
        return (
            <Fragment>
                <Nav />
                <CenterBox />
                <Outline />
                <Content />
            </Fragment>
        );
    }
}

export default withRouter(
    connect(
        state => ({
            avatarUrl: state.userInform.avatarUrl,
            avatarTempUrl: state.userInform.avatarTempUrl,
            nickName: state.userInform.nickName,
            userName: state.userInform.userName,
        }),
        {
            initFromDB,
            initID,
            initTask,
            updateAvatarUrl,
            updateAvatarTempUrl,
            updateNickName,
            updateUserName,
        }
    )(Home)
);
