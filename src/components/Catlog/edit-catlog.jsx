import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import CatalogForm from './catalog-form';

const EditCatalogModal = ({ isOpen, onClose, onSubmit, catalog }) => {
  const [formData, setFormData] = useState({
    category: '',
    value: '',
    details: {},
  });

  useEffect(() => {
    if (catalog) {
      setFormData({
        category: catalog.category || '',
        value: catalog.value || '',
        details: typeof catalog.details === 'string'
          ? JSON.parse(catalog.details)
          : catalog.details || {},
      });
    }
  }, [catalog]);

  const handleUpdate = () => {
    const cleanedDetails = Object.fromEntries(
      Object.entries(formData.details).map(([parent, children]) => [
        parent.trim(),
        Object.fromEntries(
          Object.entries(children).map(([child, values]) => [child.trim(), values])
        ),
      ])
    );

    onSubmit({
      ...formData,
      details: JSON.stringify(cleanedDetails),
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Catalog</DialogTitle>
          <DialogDescription>
            Modify the catalog details below.
          </DialogDescription>
        </DialogHeader>

        <CatalogForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
          isEdit={true}
          isCategoryEditable={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCatalogModal;
