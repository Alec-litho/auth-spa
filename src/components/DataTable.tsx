import React, { useEffect, useState } from "react";

import { RootState } from "../store";
import { Button, Fab, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditDialog from "./EditDialog";
import DataFormDialog from "./DataFormDialog";
import { DataItem } from "../types";
import { createItemThunk, deleteItemThunk, fetchDataThunk } from "../store/dataSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { formatIsoToCustomDate } from "../helpers/isoTranslate";

export const DataTable = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state: RootState) => state.data);
  let [open, setOpen] = useState(false);
  let [isSaving] = useState(false);
  let [tableHeaders] = useState(["Document Name", "Status", "companySigDate", "documentType", "companySignatureName", "employeeNumber", "Actions"]);

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, []);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (data: Omit<DataItem, "id">) => {
    dispatch(createItemThunk(data));
  };
  const handleDelete = (id: string) => {
    dispatch(deleteItemThunk(id));
  };

  return (
    <TableContainer component={Paper}>
      {isLoading && <LinearProgress />}

      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header: string) => (
              <TableCell sx={{ color: "#616161" }} key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.documentName}</TableCell>
              <TableCell>{item.documentStatus}</TableCell>
              <TableCell>{formatIsoToCustomDate(item.companySigDate)}</TableCell>
              <TableCell>{item.documentType}</TableCell>
              <TableCell>{item.companySignatureName}</TableCell>
              <TableCell>{item.employeeNumber}</TableCell>

              <TableCell>
                <Button color="error" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
                <EditDialog item={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Fab color="primary" onClick={() => setOpen(true)} >
        <div className="add">Add</div>
      </Fab>
      <DataFormDialog open={open} onClose={handleClose} handleSubmit={handleSubmit} isSaving={isSaving} />
    </TableContainer>
  );
};
