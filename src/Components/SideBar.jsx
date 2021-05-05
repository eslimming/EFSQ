import React from "react";
import "@scuf/common/honeywell-dark/theme.css";
import { SidebarLayout, Header, Icon, BadgedIcon } from "@scuf/common";
import Content from "../Content";
import Counters from "./counters";
import MyGoogleMaps from "./MyGoogleMaps";
import MyIFrame from "./MyIFrame";
import MyAxios from "./MyAxios";
import AxiosButton from "./AxiosButton";
import Notification from "./Notification";
import Dinamic from "./Dinamic";
import DatePicker from "./DatePicker";
import axios from "axios";
import MyFetchTimer from "./MyFetch";

const config = require("../config.json");
const Pagina = config.Pagina;
const headers = { 'Authorization': config.APIHeader }
class ExampleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            activeName: "",
            expand: [],
            items: [],
            Ciclo: 1,
            CountersClicks: 0,
        };
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
        this.handleOnHeaderTransition = this.handleOnHeaderTransition.bind(this);
    }

    handleCountersClicks = () => {
        this.setState({ CountersClicks: this.state.CountersClicks + 1 });
    };

    handleCollapse() {
        const { collapsed } = this.state;
        this.setState({ collapsed: !collapsed });
    }

    handleItemClick(event, itemProps) {
        const { name } = itemProps;
        this.setState({ activeName: name });
        console.log("handleItemClick: ", itemProps);
    }

    handleSubmenuClick(event, itemProps) {
        const expand = [...this.state.expand];
        const { name } = itemProps;
        const expanderIndex = expand.findIndex((element) => element === name);
        if (expanderIndex >= 0) {
            expand.splice(expanderIndex, 1);
        } else {
            expand.push(name);
        }
        this.setState({ expand });
    }

    handleOnHeaderTransition(data) {
        if (data.collapsed || data.compressed) {
            this.setState({ collapsed: true });
        }
    }



    componentDidMount() {
        try {
            setInterval(async () => {
                axios.get(`${Pagina}/API/api/SQL?N=1`, { headers: headers })
                    .then((res) => {
                        const items = res.data;
                        this.setState({
                            items,
                            Ciclo: this.state.Ciclo > 9 ? 1 : this.state.Ciclo + 1,
                        });
                    });
            }, 1000);
        } catch (e) {
            console.log(e);

        }
    }

    render() {
        const { collapsed, activeName, expand } = this.state;

        //const DT = this.state.items.Item;
        // const Fecha = DT ? DT.substring(0, 10) : '';
        //const Hora = DT ? DT.substring(11, 19) : "";
        var Sec = this.state.Ciclo; //Hora ? Hora.substring(6, 8) : "";

        this.state.items.map(
            (item) => (Sec = item.Fecha.toString().substring(17, 19))
        );

        var Color = "grey";

        if (Sec < 10) {
            Color = "yellow";
        } else if (Sec >= 10 && Sec < 20) {
            Color = "red";
        } else if (Sec >= 20 && Sec < 30) {
            Color = "blue";
        } else if (Sec >= 30 && Sec < 40) {
            Color = "orange";
        } else if (Sec >= 40 && Sec < 50) {
            Color = "grey";
        } else {
            Color = "green";
        }

        // if (Sec.startsWith("0")) {
        //   Sec = Sec.substring(2, 1);
        // }

        return (
            <div>
                <Header
                    title="ForgeUI"
                    //logoUrl="./logo.png"
                    onMenuToggle={this.handleCollapse}
                    onHeaderTransition={this.handleOnHeaderTransition}
                />

                <SidebarLayout collapsed={collapsed}>
                    <SidebarLayout.Sidebar>
                        <SidebarLayout.Sidebar.Item
                            content="Content"
                            activeName={activeName}
                            name="Content"
                            icon={
                                <BadgedIcon
                                    root="common"
                                    name="user"
                                    badge={this.state.CountersClicks.toString()}
                                    color="yellow"
                                />
                            }
                            onClick={this.handleItemClick}
                        />
                        <SidebarLayout.Sidebar.Item
                            content="Friends"
                            activeName={activeName}
                            name="Friends"
                            iconRoot="common"
                            icon="user-group"
                            badge={Sec}
                            badgeColor={Color}
                            onClick={this.handleItemClick}
                        />
                        <SidebarLayout.Sidebar.Submenu
                            content="Music"
                            activeName={activeName}
                            name="MusicExpander"
                            icon={<Icon root="common" name="music" />}
                            onClick={this.handleSubmenuClick}
                            open={expand.includes("MusicExpander")}
                        >
                            <SidebarLayout.Sidebar.Item
                                content="List"
                                activeName={activeName}
                                name="MusicList"
                                icon={<Icon root="common" name="menu" />}
                                onClick={this.handleItemClick}
                            />
                            <SidebarLayout.Sidebar.Item
                                content="Create"
                                activeName={activeName}
                                name="MusicCreate"
                                icon={<Icon root="common" name="slidercontrols-plus" />}
                                onClick={this.handleItemClick}
                            />
                            <SidebarLayout.Sidebar.Item
                                content="Share"
                                activeName={activeName}
                                name="MusicShare"
                                icon={<Icon root="common" name="share" />}
                                onClick={this.handleItemClick}
                            />
                        </SidebarLayout.Sidebar.Submenu>
                        <SidebarLayout.Sidebar.Submenu
                            content="Movies"
                            activeName={activeName}
                            name="MoviesExpander"
                            icon={<Icon root="common" name="youtube" />}
                            onClick={this.handleSubmenuClick}
                            open={expand.includes("MoviesExpander")}
                        >
                            <SidebarLayout.Sidebar.Item
                                content="List"
                                activeName={activeName}
                                name="MoviesList"
                                icon={<Icon root="common" name="menu" />}
                                onClick={this.handleItemClick}
                            />
                            <SidebarLayout.Sidebar.Item
                                content="Create"
                                activeName={activeName}
                                name="MoviesCreate"
                                icon={<Icon root="common" name="slidercontrols-plus" />}
                                onClick={this.handleItemClick}
                            />
                            <SidebarLayout.Sidebar.Item
                                content="Share"
                                activeName={activeName}
                                name="MoviesShare"
                                icon={<Icon root="common" name="share" />}
                                onClick={this.handleItemClick}
                            />
                        </SidebarLayout.Sidebar.Submenu>
                    </SidebarLayout.Sidebar>
                    <SidebarLayout.Content>
                        {(() => {
                            switch (this.state.activeName) {
                                case "Content":
                                    return (
                                        <Counters onCountersClick={this.handleCountersClicks} />
                                    );
                                case "Friends":
                                    return <MyGoogleMaps />;
                                case "MoviesList":
                                    return <MyIFrame />;
                                case "MusicList":
                                    return <MyAxios />;
                                case "MusicCreate":
                                    return <AxiosButton />;
                                case "MusicShare":
                                    return <DatePicker />;
                                case "MoviesCreate":
                                    return <Notification />;
                                case "MoviesShare":
                                    return <Dinamic />;
                                default:
                                    return <Content name={this.state.activeName} />;
                            }
                        })()}
                    </SidebarLayout.Content>
                </SidebarLayout>
            </div>
        );
    }
}

export default ExampleContainer;
