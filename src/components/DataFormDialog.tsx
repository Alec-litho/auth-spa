import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DataItem } from "../types";
import React, { useState } from "react";

interface DataFormDialogProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: (values: Omit<DataItem, "id"> | DataItem) => void;
  initialValues?: DataItem;
  isSaving: boolean;
}
type FormFields = keyof Omit<DataItem, 'id'>;

const validationSchema = Yup.object({
  documentName: Yup.string().required("Required"),
  documentStatus: Yup.string().required("Required"),
  companySignatureName: Yup.string().required("Required"),
  employeeSignatureName: Yup.string().required("Required"),
  companySigDate: Yup.date().required("Required"),
  employeeSigDate: Yup.date().required("Required"),
});

export const DataFormDialog = ({ open, onClose, handleSubmit, initialValues, isSaving }: DataFormDialogProps) => {
  let [tableInputs] = useState<FormFields[]>(["documentName", "documentStatus", "companySigDate", "documentType", "companySignatureName", "employeeNumber"]);

  const formik = useFormik<Omit<DataItem, 'id'>>({
    initialValues: initialValues || {
      companySigDate: new Date().toISOString(),
      companySignatureName: "testSignature",
      documentName: "testDocument",
      documentStatus: "testDocumentStatus",
      documentType: "testDocumentType",
      employeeNumber: "testEmployeeNumber",
      employeeSigDate: new Date().toISOString(),
      employeeSignatureName: "testEmployeeSignatureName",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialValues ? "Edit Item" : "Create New Item"}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {tableInputs.map((key) => {
            return (
              <TextField
                fullWidth
                margin="normal"
                label={key.split(/(?=[A-Z])/).join(" ")}
                name={key}
                value={formik.values[key]}
                onChange={formik.handleChange}
                error={formik.touched[key] && Boolean(formik.errors[key])}
                helperText={formik.touched[key] && formik.errors[key]}
                key={key}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DataFormDialog;
