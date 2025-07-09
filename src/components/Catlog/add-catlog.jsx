import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Trash2, X } from 'lucide-react';

const AddCatalogModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  categories,
  initialFormData = { category: '', value: '', details: {} }
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedExisting, setSelectedExisting] = useState('New');

  const [tempParentNames, setTempParentNames] = useState({});
  const [tempChildNames, setTempChildNames] = useState({});

  const capitaliseFirst = str => 
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  const handleExistingChange = (value) => {
    setSelectedExisting(value);
    setFormData((prev) =>
      value === 'New'
        ? { ...prev, category: '' }
        : { ...prev, category: value }
    );
  };

  const renameParent = (oldKey, newKey) => {
    if (!newKey || newKey === oldKey || formData.details[newKey]) return;
    setFormData((prev) => {
      const updated = { ...prev.details };
      updated[newKey] = { ...updated[oldKey] };
      delete updated[oldKey];
      return { ...prev, details: updated };
    });
    setTempParentNames((prev) => {
      const updated = { ...prev };
      delete updated[oldKey];
      return updated;
    });
  };

  const deleteParent = (parentKey) => {
    setFormData((prev) => {
      const updated = { ...prev.details };
      delete updated[parentKey];
      return { ...prev, details: updated };
    });
  };

const addNewParent = () => {
  setFormData((prev) => {
    let newKey = '';
    while (prev.details.hasOwnProperty(newKey)) newKey += '_';
    return {
      ...prev,
      details: {
        ...prev.details,
        [newKey]: {},
      },
    };
  });
};

  const renameChild = (parentKey, oldKey, newKey) => {
    if (!newKey || newKey === oldKey || formData.details[parentKey][newKey]) return;
    setFormData((prev) => {
      const updatedParent = { ...prev.details[parentKey] };
      updatedParent[newKey] = updatedParent[oldKey];
      delete updatedParent[oldKey];
      return {
        ...prev,
        details: {
          ...prev.details,
          [parentKey]: updatedParent,
        },
      };
    });
    setTempChildNames((prev) => {
      const updated = { ...prev };
      delete updated[`${parentKey}__${oldKey}`];
      return updated;
    });
  };

const addNewChild = (parentKey) => {
  setFormData((prev) => {
    const updatedParent = { ...prev.details[parentKey] };
    let newChildKey = '';
    while (updatedParent.hasOwnProperty(newChildKey)) newChildKey += '_';
    updatedParent[newChildKey] = [''];
    return {
      ...prev,
      details: {
        ...prev.details,
        [parentKey]: updatedParent,
      },
    };
  });
};

  const updateValue = (parentKey, childKey, index, value) => {
    setFormData((prev) => {
      const updatedParent = { ...prev.details[parentKey] };
      const updatedChild = [...updatedParent[childKey]];
      updatedChild[index] = value;
      updatedParent[childKey] = updatedChild;
      return {
        ...prev,
        details: {
          ...prev.details,
          [parentKey]: updatedParent,
        },
      };
    });
  };

  const removeValue = (parentKey, childKey, index) => {
    setFormData((prev) => {
      const updatedParent = { ...prev.details[parentKey] };
      const updatedChild = [...updatedParent[childKey]];
      updatedChild.splice(index, 1);
      updatedParent[childKey] = updatedChild.length > 0 ? updatedChild : [''];
      return {
        ...prev,
        details: {
          ...prev.details,
          [parentKey]: updatedParent,
        },
      };
    });
  };

  const addNewValue = (parentKey, childKey) => {
    setFormData((prev) => {
      const updatedParent = { ...prev.details[parentKey] };
      const updatedChild = [...updatedParent[childKey], ''];
      updatedParent[childKey] = updatedChild;
      return {
        ...prev,
        details: {
          ...prev.details,
          [parentKey]: updatedParent,
        },
      };
    });
  };

const deleteChild = (parentKey, childKey) => {
  setFormData((prev) => {
    const updatedParent = { ...prev.details[parentKey] };
    delete updatedParent[childKey];
    return {
      ...prev,
      details: {
        ...prev.details,
        [parentKey]: updatedParent,
      },
    };
  });

  setTempChildNames((prev) => {
    const newState = { ...prev };
    delete newState[`${parentKey}__${childKey}`];
    return newState;
  });
};
  // const handleSubmit = () => {
  //   onSubmit({
  //     ...formData,
  //     details: JSON.stringify(formData.details)
  //   });
  //   setFormData({ category: '', value: '', details: {} });
  //   setSelectedExisting('New');
  // };

  // const handleClose = () => {
  //   setFormData(initialFormData);
  //   setSelectedExisting('New');
  //   setTempParentNames({});
  //   setTempChildNames({});
  //   onClose();
  // };

// 🔁 Keep the rest of your imports and useState hooks as-is above
const isFormValid = () => {
  if (!formData.category.trim() || !formData.value.trim()) return false;

  for (const parent in formData.details) {
    if (!parent.trim()) return false;
    const children = formData.details[parent];
    for (const child in children) {
      if (!child.trim()) return false;
    }
  }

  return true;
};

const handleSubmit = () => {
  if (!isFormValid()) return;

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

  setFormData({ category: '', value: '', details: {} });
  setSelectedExisting('New');
  setTempParentNames({});
  setTempChildNames({});
};

const handleClose = () => {
  setFormData(initialFormData);
  setSelectedExisting('New');
  setTempParentNames({});
  setTempChildNames({});
  onClose();
};

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Catalog</DialogTitle>
          <DialogDescription>
            Create a new catalog entry with category, value, and details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="existing-category">Existing Categories</Label>
            <Select id="existing-category" value={selectedExisting} onValueChange={handleExistingChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select or choose New" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">— New —</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedExisting === 'New' && (
            <div>
              <Label htmlFor="add-category">Category</Label>
              <Input
                id="add-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: capitaliseFirst(e.target.value) }))
                }
                placeholder="e.g., Fertilizers"
                className="mt-2"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="add-value">Value</Label>
            <Input
              id="add-value"
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
              placeholder="e.g., Urea"
              className="mt-2"
              required
            />
          </div>

            <div>
            <Label className="mb-2">Details</Label>
            {Object.entries(formData.details || {}).map(([parentKey, parentValue], parentIndex) => (
                <div key={parentKey} className="border rounded p-4 mb-4 relative">
                <div className="flex justify-between items-center mb-4">
                    <Input
                    value={tempParentNames[parentKey] ?? parentKey}
                    onChange={(e) =>
                        setTempParentNames((prev) => ({
                        ...prev,
                        [parentKey]: e.target.value,
                        }))
                    }
                    onBlur={() => renameParent(parentKey, tempParentNames[parentKey])}
                    placeholder="Parent name"
                    className="font-bold w-auto min-w-[150px] max-w-full"
                    />
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteParent(parentKey)}
                    className="absolute right-2 top-2"
                    >
                    <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                {/* <div className="space-y-4 overflow-x-auto"> */}
                <div className="space-y-4 max-h-64 overflow-y-auto overflow-x-hidden pr-2">
                    {Object.entries(parentValue).map(([childKey, childValues], childIndex) => {
                    const childId = `${parentKey}__${childKey}`;
                    return (
                        <div key={childId} className="flex items-start gap-2">
                        <div className="relative">
                            <Input
                            value={tempChildNames[childId] ?? childKey}
                            onChange={(e) =>
                                setTempChildNames((prev) => ({
                                ...prev,
                                [childId]: e.target.value,
                                }))
                            }
                            onBlur={() => {
                                const newKey = tempChildNames[childId];
                                if (newKey && newKey !== childKey) {
                                renameChild(parentKey, childKey, newKey);
                                }
                            }}
                            placeholder="Child name"
                            className="w-auto min-w-[120px] max-w-full pr-8"
                            />
                            <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteChild(parentKey, childKey)}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-x-hidden">
                            <div className="flex flex-col gap-2 min-w-max">
                            {childValues.map((val, i) => (
                                <div key={`${childKey}-${i}`} className="flex items-center relative">
                                <Input
                                    value={val}
                                    onChange={(e) => updateValue(parentKey, childKey, i, e.target.value)}
                                    className="w-auto min-w-[120px] max-w-full pr-8"
                                    placeholder="Value"
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeValue(parentKey, childKey, i)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                >
                                    <X className="h-4 w-4 " />
                                </Button>
                                </div>
                            ))}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => addNewValue(parentKey, childKey)}
                                className="flex items-center w-32"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add New
                            </Button>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addNewChild(parentKey)}
                    className="flex items-center gap-1 mt-2"
                    >
                    <Plus className="h-4 w-4" /> Add Child
                    </Button>
                </div>
                </div>
            ))}

            <Button
                variant="outline"
                onClick={addNewParent}
                className="flex items-center gap-1"
            >
                <Plus className="h-4 w-4" /> Add Parent
            </Button>
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid()}>
            Create Catalog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCatalogModal;
