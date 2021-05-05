import React from "react";
import "@scuf/common/honeywell-dark/theme.css";
import {
    Grid,
    SidebarLayout,
    Footer,
    Header,
    Input,
    Icon,
    Button,
    BadgedIcon,
} from "@scuf/common";
import SideBar from "./Components/SideBar";

export default class App extends React.Component {
    render() {
        return (
            <section className="page-example-wrap new-test">
                {/* <Header title="Forge "  onMenuToggle={(open) => this.setState({ sidebarCollapsed: !open })}>
                    <Header.Item href="#">
                        <Icon size="large" root="building" name="user"/>
                    </Header.Item>
                </Header> */}

                <SideBar />

                <Footer copyrightText={"© " + new Date().getFullYear() + " Honeywell Chile"}>
                    <Footer.Item href="#">Terms & Conditions</Footer.Item>
                    <Footer.Item href="#">Privacy Policy</Footer.Item>
                </Footer>
            </section>
        );
    }
}
