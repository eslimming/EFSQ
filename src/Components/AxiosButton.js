import React from "react";
import { Button } from "@scuf/common";
import axios from "axios";
import Excel from "./Excel";

const config = require("../config.json");
const headers = { 'Authorization': config.APIHeader }
const Pagina = config.Pagina;
export default class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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

    render() {
        return (
            <div>
                <Button onClick={this.click} disabled={this.state.isLoading}>
                    {" "}Botón Axios{" "}
                </Button>
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
