import { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import DataFormDialog from './DataFormDialog';
import { DataItem } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateItemThunk } from '../store/dataSlice';
import React from 'react';

interface EditDialogProps {
  item: DataItem;
}

const EditDialog = ({ item }: EditDialogProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.data);

  const handleSubmit = (values: Omit<DataItem, 'id'>) => {
    console.log(item)
    dispatch(updateItemThunk({ id: item.id, ...values }));
  };

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Edit
      </Button>

      <DataFormDialog
        open={open}
        onClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
        initialValues={item}
        isSaving={isLoading}
      />
    </>
  );
};

export default EditDialog;