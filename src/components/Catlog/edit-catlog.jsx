import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const EditCatalogModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  catalog
}) => {
  const [formData, setFormData] = useState({
    category: '',
    value: '',
    details: '',
  });

  const capitaliseFirst = str => 
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  useEffect(() => {
    if (catalog) {
      setFormData({
        category: catalog.category || '',
        value: catalog.value || '',
        details: catalog.details || '',
      });
    }
  }, [catalog]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      category: '',
      value: '',
      details: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Catalog</DialogTitle>
          <DialogDescription>
            Update the catalog entry details.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-category">Category</Label>
            <Input
              className="mt-2"
              id="edit-category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                category: capitaliseFirst(e.target.value)
              }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-value">Value</Label>
            <Input
              className="mt-2"
              id="edit-value"
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-details">Details</Label>
            <Input
              className="mt-2"
              id="edit-details"
              value={formData.details}
              onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update Catalog</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCatalogModal;