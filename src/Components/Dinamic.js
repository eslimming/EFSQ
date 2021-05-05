import React from "react";
import { Table, Button } from '@scuf/common';
import { DataTable } from "@scuf/datatable";
import axios from "axios";
import RadioGroup from "./RadioGroup";
import Notification from "./Notification";
import AxiosButton from "./AxiosButton";
import { Router, Switch, Route } from "react-router-dom";

const config = require("../config.json");
const Pagina = config.Pagina;
export default class RadioGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            activeName: ""
        };
        this.click = this.click.bind(this);
    }

    //componentWillMount() {
    //    const headers = { 'Authorization': 'dalealbo' }
    //    axios
    //        .get(`${Pagina}/API/api/MySQL?N=10`, { headers: headers })
    //        .then((response) => {
    //            this.setState({ items: response.data });
    //        })
    //        .catch((err) => {
    //            this.setState({ data: err });
    //        });
    //}

    click() {
        if (this.state.activeName == "Notification")
            this.setState({ activeName: "AxiosButton" });
        else
            this.setState({ activeName: "Notification" });
    }

    render() {
        return (
            <React.Fragment>

                <Table>
                    <Table.Header>
                        <Table.HeaderCell content="General" textAlign="left" />
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>3.1 Filtraciones Visibles</Table.Cell>
                            <Table.Cell textAlign="right"> <RadioGroup label="Bueno" /> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3.2 Estado de la Cabina</Table.Cell>
                            <Table.Cell textAlign="right"> <RadioGroup label="Bueno" /> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3.3 Espejo Retrovisor</Table.Cell>
                            <Table.Cell textAlign="right"> <RadioGroup label="Bueno" /> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3.4 Vidrios Laterales / Parabrisas</Table.Cell>
                            <Table.Cell textAlign="right"> <RadioGroup label="Bueno" /> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3.5 Estado de Asientos</Table.Cell>
                            <Table.Cell textAlign="right"> <RadioGroup label="Bueno" /> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3.6 Estado Cinturon de Seguridad </Table.Cell>
                            <Table.Cell textAlign="right"> <RadioGroup label="B" /> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3.7 Estado Cinturon de Seguridad </Table.Cell>
                            <Table.Cell textAlign="right"> <RadioGroup label="B" /> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3.8 Estado Neumatico de Repuesto </Table.Cell>
                            <Table.Cell textAlign="right"> <RadioGroup label="B" /> </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row align="center">
                            <Table.HeaderCell colSpan={2}>
                                {/*<Button onClick={this.click} disabled={this.state.isLoading}>*/}
                                {/*    Siguiente*/}
                                {/*</Button>*/}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>


                {(() => {
                    switch (this.state.activeName) {
                        case "Notification":
                            return <Notification />;
                        default:
                            return <AxiosButton />;
                    }
                })()}

                <Button onClick={this.click} disabled={this.state.isLoading}>
                    Siguiente
               </Button>


            </React.Fragment>
        );
    }
}