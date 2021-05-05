import React from "react";
import Excel from "./Excel";
import axios from "axios";
import { DatePicker, Table } from "@scuf/common";

const config = require("../config.json");
const Pagina = config.Pagina;
const headers = { 'Authorization': config.APIHeader }
var dias = 0;


class RangePickerExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeValue: { to: "", from: "" },
            to: "",
            from: "",
            closeOnSelection: false,
            error: "",
            closeOnDocumentClick: true,
            xlsDataset: [],
            xlsDisabled: true,
        };
    }

    render() {
        const {
            rangeValue,
            closeOnSelection,
            error,
            closeOnDocumentClick,
        } = this.state;
        return (
            <React.Fragment>
                <Table>
                    <Table.Header>
                        <Table.HeaderCell content="Reporte Excel" colSpan={2} />
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <DatePicker
                                    key={closeOnSelection.toString()}
                                    type="daterange"
                                    format="es"
                                    label="Rango de Fecha"
                                    displayFormat="DD/MM/YY"
                                    disablePast={false}
                                    disableWeekends={false}
                                    showYearSelector={true}
                                    error={error}
                                    rangeValue={rangeValue}
                                    closeOnSelection={closeOnSelection}
                                    closeOnDocumentClick={closeOnDocumentClick}
                                    onTextChange={(value, error) => this.setState({ error })}
                                    onRangeSelect={({ to, from }) => {
                                        this.setState({
                                            xlsDisabled: true,
                                            to:
                                                typeof to === "object"
                                                    ? to.toISOString().substring(0, 10)
                                                    : "",
                                            from:
                                                typeof from === "object"
                                                    ? from.toISOString().substring(0, 10)
                                                    : "",
                                            ...(to && from && { rangeValue: { to, from } }),
                                        });
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <div className="padded">
                                    <p>Rango seleccionado:</p>
                                    <p>Desde: {this.state.from}</p>
                                    <p>Hasta: {this.state.to}</p>
                                    <p>
                                        {this.state.to && this.state.from
                                            ? "(" +
                                            Math.floor(
                                                (Date.parse(this.state.to) -
                                                    Date.parse(this.state.from)) /
                                                86400000
                                            ).toString() +
                                            " días)"
                                            : ""}
                                    </p>
                                </div>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan={2}>
                                {(() => {
                                    switch (
                                    this.state.from.indexOf("-") + this.state.to.indexOf("-")
                                    ) {
                                        case 8:

                                            dias = Math.floor(
                                                (Date.parse(this.state.to) -
                                                    Date.parse(this.state.from)) /
                                                86400000
                                            );
                                            if (dias < 32) {
                                                axios.get(`${Pagina}/API/api/SQL?N=${dias}`, { headers: headers })
                                                    .then((res) => {
                                                        this.setState({
                                                            xlsDataset: res.data,
                                                            xlsDisabled: false,
                                                        });
                                                    })
                                                    .catch((err) => {
                                                        this.setState({
                                                            xlsDataset: [],
                                                            xlsDisabled: true,
                                                            error: err.message,
                                                        });
                                                    });
                                            }
                                            if (error.length > 5) return "Error en API";
                                            else if (dias < 32) {
                                                return (
                                                    <React.Fragment>
                                                        <Excel
                                                            dataset={this.state.xlsDataset}
                                                            label={this.state.xlsDataset.length + " Registros"}
                                                            estado={this.state.xlsDisabled}
                                                        />
                                                    </React.Fragment>
                                                );
                                            } else {
                                                return "El Intervalo no puede superar los 31 días";
                                            }
                                        default:
                                            return "Seleccione el intervalo";
                                    }
                                })()}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

                {/* <div>
          <div>
            <Checkbox
              label="Close on document click"
              checked={closeOnDocumentClick}
              onChange={(checked) =>
                this.setState({ closeOnDocumentClick: checked })
              }
            />
            <Checkbox
              label="Close on selection"
              checked={closeOnSelection}
              onChange={(checked) =>
                this.setState({ closeOnSelection: checked })
              }
            />
          </div>

          <div>
            <Button
              onClick={() =>
                this.setState({
                  rangeValue: { to: "", from: "" },
                  to: "",
                  from: "",
                })
              }
              content="Reset DatePicker"
            />
          </div>
        </div> */}
            </React.Fragment>
        );
    }
}

export default RangePickerExample;
