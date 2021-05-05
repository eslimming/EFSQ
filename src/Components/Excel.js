import React from "react";
import ReactExport from "react-export-excel";
import { Button, Card, Loader } from "@scuf/common";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// const dataSet1 = [
//   {
//     name: "Johson",
//     amount: 30000,
//     sex: "M",
//     is_married: true,
//   },
//   {
//     name: "Monika",
//     amount: 355000,
//     sex: "F",
//     is_married: false,
//   },
//   {
//     name: "John",
//     amount: 250000,
//     sex: "M",
//     is_married: false,
//   },
//   {
//     name: "Josef",
//     amount: 450500,
//     sex: "M",
//     is_married: true,
//   },
// ];

// const dataSet2 = [
//   {
//     name: "Johnson",
//     total: 25,
//     remainig: 16,
//   },
//   {
//     name: "Josef",
//     total: 25,
//     remainig: 7,
//   },
// ];

export default class Download extends React.Component {
  state = {
    disabled: false,
  };

  handleClick = (event) => {
    if (this.state.disabled) {
      return;
    }
    this.setState({ disabled: true });
    // Send
  };

  render() {
    return (
      <React.Fragment>
        {/* <ExcelFile element={<Button content="Excel" icon="file-download" />}>
          <ExcelSheet data={dataSet1} name="Employees">
            <ExcelColumn label="Name" value="name" />
            <ExcelColumn label="Wallet Money" value="amount" />
            <ExcelColumn label="Gender" value="sex" />
            <ExcelColumn
              label="Marital Status"
              value={(col) => (col.is_married ? "Married" : "Single")}
            />
          </ExcelSheet>
          <ExcelSheet data={dataSet2} name="Leaves">
            <ExcelColumn label="Name" value="name" />
            <ExcelColumn label="Total Leaves" value="total" />
            <ExcelColumn label="Remaining Leaves" value="remaining" />
          </ExcelSheet>
        </ExcelFile> */}
        {this.props.children}
        <ExcelFile
          element={
            <Button
              onClick={this.handleClick}
              disabled={this.state.disabled}
              hidden={this.state.disabled}
              //hidden={this.props.estado}
              content={this.props.label}
              icon="file-download"
            />
          }
        >
          <ExcelSheet data={this.props.dataset} name="EFSQ">
            <ExcelColumn label="Entero" value="Entero" />
            <ExcelColumn label="FechaSTR" value="Fecha" />
            <ExcelColumn label="FechaDT" value={(col) => new Date(col.Fecha)} />
            <ExcelColumn label="Palabra" value="Palabra" />
            <ExcelColumn label="Numero" value="Numero" />
          </ExcelSheet>
        </ExcelFile>
        {/* 
        <Card>
          <Card.Header />
          <Card.Content>
            <Loader hidden={true}>
              <div className="placeholder" />
            </Loader>
          </Card.Content>
        </Card> */}
      </React.Fragment>
    );
  }
}
