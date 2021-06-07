import React, {Component} from 'react';
import { Menu } from 'antd';
import {
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    AppstoreAddOutlined,
    UserOutlined, UserAddOutlined
} from '@ant-design/icons';
import {strings} from "../constant/strings";
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import {LocalStorage} from "../localstorage/LocalStorage";
// const { pathname } = location;
import {Routes} from "../constant/Routes";

class Header extends Component {
    constructor(props) {
        super(props);
    }
    

    render() {

        return (
            <Menu mode="horizontal" selectedKeys={[this.props.location.pathname]}>
                <Menu.Item key={Routes.home} icon={<HomeOutlined />}>
                    <Link to={'/'}>
                    {strings.home}
                    </Link>
                </Menu.Item>
                {
                    LocalStorage.getItem(strings.jwttoken) ? null :
<>
                        <Menu.Item key={Routes.signUp} icon={<LoginOutlined/>}>
                            <Link to={'/signup'}>
                                {strings.signup}
                            </Link>
                        </Menu.Item>
                    <Menu.Item key={Routes.login} icon={<LoginOutlined/>}>
                    <Link to={'/login'}>
                    {strings.login}
                    </Link>
                    </Menu.Item>
                        </>
                }
                {
                    LocalStorage.getItem(strings.jwttoken)?(
                        <>
                        <Menu.Item key={strings.logout} icon={<LogoutOutlined/>}>
                            <Link to={'/login'} onClick={()=>{
                                LocalStorage.clear();
                            }}>
                                {strings.logout}
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={Routes.addTrip} icon={<AppstoreAddOutlined />}>
                            <Link to={'/trip/add'}>
                                {strings.addTrips}
                            </Link>
                        </Menu.Item>
                        </>
                    ):null
                }
                {
                    (LocalStorage.getItem(strings.jwttoken)?(LocalStorage.getItem(strings.role)==='regular')?null:
                        (<><Menu.Item key={Routes.users} icon={<UserOutlined/>}>
                        <Link to={'/users/'}>
                            {strings.findUsers}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={Routes.createUser} icon={<UserAddOutlined/>}>
                         <Link to={'/create/user'}>
                              {strings.createUser}
                         </Link>
                    </Menu.Item></>):null)
                }
                {
                    LocalStorage.getItem(strings.jwttoken)?                <Menu.Item key={'status'} disabled>{`Currently loggenIn as: ${LocalStorage.getItem(strings.role).toUpperCase()}`}</Menu.Item>:null}

            </Menu>
        );

    }
}

export default withRouter(Header);
