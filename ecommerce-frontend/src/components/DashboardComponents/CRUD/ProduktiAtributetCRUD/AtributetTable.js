import React from "react";
import { Table, TableBody, TableCell, TableContainer,TableRow, Button } from "@mui/material";
import "./Styles/AtributetTable.css";

const AttributeTable = (props) => {
  return (
      <TableContainer className="attributes-table">
        <Table>
          <TableBody className="atributes-table-tb">
            {props.atributet.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.atributiValue}</TableCell>
                {
                    props.kaFunksione && 
                    <TableCell>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <Button

                                onClick={() => props.handleEdit(a.id)}
                            >
                                <i className="fa-solid fa-pen-to-square" style={{color:"#665DDB"}}></i>
                            </Button>
                            <Button
                                onClick={() => props.handleDelete(a.id)}
                            >
                                <i className="fa-solid fa-trash" style={{color:"darkred"}}></i>
                            </Button>
                        </div>
                    </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default AttributeTable;
