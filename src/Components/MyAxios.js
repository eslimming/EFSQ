import React from "react";
import axios from "axios";
import { Input } from "@scuf/common";
import { DataTable } from "@scuf/datatable";
import { Fragment } from "react";
import "@scuf/datatable/honeywell-dark/theme.css";

const config = require("../config.json");
const Pagina = config.Pagina;
const headers = { 'Authorization': config.APIHeader }

export default class itemList extends React.Component {
    state = {
        items: [],
        N: 5,
    };

    componentDidMount() {
        try {
            setInterval(async () => {
                axios
                    .get(`${Pagina}/API/api/SQL?N=${this.state.N}`, { headers: headers })
                    .then((res) => {
                        const items = res.data;
                        this.setState({
                            items: items,
                        });
                    });
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Fragment>
                <Input
                    placeholder="N° de Filas:"
                    type="number"
                    max="50"
                    min="0"
                    onChange={(data) => {
                        this.setState({
                            N: data ? data : 1,
                        });
                    }}
                    label="Datos desde SQL"
                />

                <DataTable data={this.state.items}>
                    <DataTable.Column field="Entero" header="Entero" />
                    <DataTable.Column field="Fecha" header="Fecha" />
                    <DataTable.Column field="Palabra" header="Palabra" />
                    <DataTable.Column field="Numero" header="Numero" />
                </DataTable>

                {/* <ul>
          {this.state.items.map((item) => (
            <li>
              {item.Entero} | {item.Fecha} | {item.Palabra} | {item.Numero}
            </li>
          ))}
        </ul> */}
            </Fragment>
        );
    }
}
