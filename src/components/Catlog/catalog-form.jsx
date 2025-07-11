import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Trash2, X } from 'lucide-react';

const CatalogForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEdit = false,
  categories = [],
  isCategoryEditable = true,
}) => {
  const [selectedExisting, setSelectedExisting] = useState('New');
  const [tempParentNames, setTempParentNames] = useState({});
  const [tempChildNames, setTempChildNames] = useState({});

  const capitaliseFirst = str => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

  const handleExistingChange = (value) => {
    setSelectedExisting(value);
    setFormData((prev) =>
      value === 'New' ? { ...prev, category: '' } : { ...prev, category: value }
    );
  };

  const renameParent = (oldKey, newKey) => {
    if (!newKey || newKey === oldKey || formData.details[newKey]) return;
    const updated = { ...formData.details };
    updated[newKey] = { ...updated[oldKey] };
    delete updated[oldKey];
    setFormData({ ...formData, details: updated });
    const updatedNames = { ...tempParentNames };
    delete updatedNames[oldKey];
    setTempParentNames(updatedNames);
  };

  const deleteParent = (parentKey) => {
    const updated = { ...formData.details };
    delete updated[parentKey];
    setFormData({ ...formData, details: updated });
  };

  const addNewParent = () => {
    let newKey = '';
    while (formData.details.hasOwnProperty(newKey)) newKey += '_';
    setFormData({
      ...formData,
      details: { ...formData.details, [newKey]: {} },
    });
  };

  const renameChild = (parentKey, oldKey, newKey) => {
    if (!newKey || newKey === oldKey || formData.details[parentKey][newKey]) return;
    const updatedParent = { ...formData.details[parentKey] };
    updatedParent[newKey] = updatedParent[oldKey];
    delete updatedParent[oldKey];
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [parentKey]: updatedParent,
      },
    });
    const updatedNames = { ...tempChildNames };
    delete updatedNames[`${parentKey}__${oldKey}`];
    setTempChildNames(updatedNames);
  };

  const addNewChild = (parentKey) => {
    const updatedParent = { ...formData.details[parentKey] };
    let newChildKey = '';
    while (updatedParent.hasOwnProperty(newChildKey)) newChildKey += '_';
    updatedParent[newChildKey] = [''];
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [parentKey]: updatedParent,
      },
    });
  };

  const updateValue = (parentKey, childKey, index, value) => {
    const updatedChild = [...formData.details[parentKey][childKey]];
    updatedChild[index] = value;
    const updatedParent = {
      ...formData.details[parentKey],
      [childKey]: updatedChild,
    };
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [parentKey]: updatedParent,
      },
    });
  };

  const removeValue = (parentKey, childKey, index) => {
    const updatedChild = [...formData.details[parentKey][childKey]];
    updatedChild.splice(index, 1);
    const updatedParent = {
      ...formData.details[parentKey],
      [childKey]: updatedChild.length > 0 ? updatedChild : [''],
    };
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [parentKey]: updatedParent,
      },
    });
  };

  const addNewValue = (parentKey, childKey) => {
    const updatedChild = [...formData.details[parentKey][childKey], ''];
    const updatedParent = {
      ...formData.details[parentKey],
      [childKey]: updatedChild,
    };
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [parentKey]: updatedParent,
      },
    });
  };

  const deleteChild = (parentKey, childKey) => {
    const updatedParent = { ...formData.details[parentKey] };
    delete updatedParent[childKey];
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [parentKey]: updatedParent,
      },
    });
    const updatedNames = { ...tempChildNames };
    delete updatedNames[`${parentKey}__${childKey}`];
    setTempChildNames(updatedNames);
  };

  return (
    <div className="space-y-4">
      {isCategoryEditable && (
        <div>
          <Label htmlFor="existing-category">Existing Categories</Label>
          <select
            id="existing-category"
            className="border rounded p-2 mt-2 w-full"
            value={selectedExisting}
            onChange={(e) => handleExistingChange(e.target.value)}
          >
            <option value="New">— New —</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {(selectedExisting === 'New' || !isCategoryEditable) && (
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: capitaliseFirst(e.target.value) })
            }
            className="mt-2"
            required
          />
        </div>
      )}

      <div>
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          className="mt-2"
          required
        />
      </div>

      <div>
        <Label className="mb-2">Details</Label>
        {Object.entries(formData.details).map(([parentKey, parentValue]) => (
          <div key={parentKey} className="border rounded p-4 mb-4 relative">
            <div className="flex justify-between items-center mb-4">
              <Input
                value={tempParentNames[parentKey] ?? parentKey}
                onChange={(e) =>
                  setTempParentNames({
                    ...tempParentNames,
                    [parentKey]: e.target.value,
                  })
                }
                onBlur={() => renameParent(parentKey, tempParentNames[parentKey])}
                placeholder="e.g.. Parent name"
                className="w-auto min-w-[150px] max-w-full"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteParent(parentKey)}
                className="absolute right-2 top-3   hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {Object.entries(parentValue).map(([childKey, childValues]) => {
                const childId = `${parentKey}__${childKey}`;
                return (
                  <div key={childId} className="flex items-start gap-2">
                    <div className="relative">
                      <Input
                        value={tempChildNames[childId] ?? childKey}
                        onChange={(e) =>
                          setTempChildNames({
                            ...tempChildNames,
                            [childId]: e.target.value,
                          })
                        }
                        onBlur={() => renameChild(parentKey, childKey, tempChildNames[childId])}
                        placeholder="e.g.. Child name"
                        className="w-auto min-w-[120px] max-w-full pr-8"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteChild(parentKey, childKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-black"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-2">
                        {childValues.map((val, index) => (
                          <div key={index} className="flex items-center relative">
                            <Input
                              value={val}
                              onChange={(e) =>
                                updateValue(parentKey, childKey, index, e.target.value)
                              }
                              className="w-auto min-w-[120px] max-w-full pr-8"
                              placeholder="e.g.. Value"
                              
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeValue(parentKey, childKey, index)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-black"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addNewValue(parentKey, childKey)}
                          className="hover:text-black"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add New
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Button size="sm" onClick={() => addNewChild(parentKey)}>
                <Plus className="h-4 w-4" /> Add Child
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={addNewParent}>
          <Plus className="h-4 w-4 " /> Add Parent
        </Button>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button className="bg-red-400 hover:bg-red-600 " onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>{isEdit ? 'Update' : 'Create'} Catalog</Button>
      </div>
    </div>
  );
};

export default CatalogForm;
