import React from "react";
import { Button, Notification } from "@scuf/common";
import axios from "axios";
import Excel from "./Excel";

const config = require("../config.json");
const Pagina = config.Pagina;
const headers = { 'Authorization': config.APIHeader }
export default class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            Version: [{
                "VersionInstalada": "...",
                "VersionUltima": ""
            }],
            isLoading: false,
        };
        this.click = this.click.bind(this);
    }

    click() {
        this.setState({ isLoading: true });
        axios
            .get(`${Pagina}/API/api/SQL?N=10`, { headers: headers })
            .then((response) => {
                this.setState({ data: response.data, isLoading: false });
            })
            .catch((err) => {
                this.setState({ data: err, isLoading: false });
            });



    }


    componentWillMount() {
        try {

            axios.get(`${Pagina}/API/api/WhatsAppVersion`, { headers: headers })
                .then((res) => {
                    const items = res.data;
                    this.setState({
                        Version: items
                    });
                });
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        try {
            setInterval(async () => {
                axios.get(`${Pagina}/API/api/WhatsAppVersion`, { headers: headers })
                    .then((res) => {
                        const items = res.data;
                        this.setState({
                            Version: items
                        });
                    });
            }, 3600000);
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        var vInstalada;
        var vUltima;
        this.state.Version.map(
            (item) => (vInstalada = item.VersionInstalada.toString(),
                vUltima = item.VersionUltima.toString())
        );

        return (
            <div>

                <div>
                    {/*<Notification*/}
                    {/*    hasIcon={true}*/}
                    {/*    title="Critical Pump Failure"*/}
                    {/*    tags={['Refinery', 'Pump']}*/}
                    {/*    severity="critical"*/}
                    {/*    onDetailsClick={() => alert('Details')}*/}
                    {/*    onCloseClick={() => alert('Close Clicked')}>*/}
                    {/*    Excessive pump vibration caused by a failing metal frame.*/}
                    {/*</Notification>*/}
                    {/*<Notification*/}
                    {/*    hasIcon={true}*/}
                    {/*    title={'Freight XYZ-123, last updated ' + new Date().toLocaleString()}*/}
                    {/*    severity="important">*/}
                    {/*    Freight reached its destination (Atlanta Midtown).*/}
                    {/*</Notification>*/}
                    {/*<Notification*/}
                    {/*    hasIcon={true}*/}
                    {/*    tags={['Bombadier', 'Challenger 300', 'ATA 49', 'Auxiliary Power Unit']}*/}
                    {/*    severity="information">*/}
                    {/*    Auxiliary Power Unit replacement is due in next 30 days.*/}
                    {/*</Notification>*/}
                    <Notification
                        hasIcon={true}
                        title="Version de WhatsApp"
                        severity={vInstalada == vUltima ? "success" : "critical"}>
                        Instalada: {vInstalada}
                        <br />
                        Disponible: {vUltima}
                    </Notification>
                    <div style={{ visibility: vInstalada == vUltima ? "hidden" : "" }}>
                        {<Button loading={vInstalada == "..." ? true : false} onClick={this.click} disabled={this.state.isLoading || vInstalada == "..." ? true : false}>
                            {" "}Actualizar WhatsApp{" "}
                        </Button>}
                    </div>
                </div>



                {/* <Excel dataset={this.state.data} /> */}
                {/* {this.state.data.toString()} */}
                <ul>
                    {this.state.data.map((item) => (
                        <li>
                            {item.Entero} | {item.Fecha} | {item.Palabra} | {item.Numero}
                        </li>
                    ))}
                </ul>
                {/* {JSON.stringify(this.state.data)} */}
            </div>
        );
    }
}
