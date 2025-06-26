import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Search, Filter } from 'lucide-react';
import { IconBooks, IconCategory, IconFilter } from '@tabler/icons-react';
// import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = `${import.meta.env.VITE_REST_API_BASE_URL}/api/admin/catalog`;

// Get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export default function CreateCatlog() {
  const [catalogs, setCatalogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // Track deletion in progress
  const [lastDeletedId, setLastDeletedId] = useState(null); // Track last deleted item
  const [selectedExisting, setSelectedExisting] = useState('New');

  /* helper for selector change */
  const handleExistingChange = (value) => {
    setSelectedExisting(value);
    setFormData((prev) =>
      value === 'New'
        ? { ...prev, category: '' }
        : { ...prev, category: value }
    );
  };


    /* when user hits the “Add New Catalog” button, reset everything */
  const openAddModal = () => {
    setSelectedExisting('New');                     // reset selector
    setFormData({ category: '', value: '', details: '' });
    setIsAddModalOpen(true);
  };


  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    category: '',
    value: '',
    details: '',
  });

  const capitaliseFirst = str =>
                    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [deletingCatalog, setDeletingCatalog] = useState(null);

  // API helper function
  const apiCall = useCallback(async (url, options = {}) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    console.log(`API call: ${options.method || 'GET'} ${url}`);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }, []);

  // Fetch all catalogs with deletion guard
  const fetchCatalogs = useCallback(async () => {
    if (isDeleting) {
      console.log('Fetch catalogs skipped due to ongoing deletion');
      return;
    }
    console.log('Fetching catalogs...');
    try {
      const data = await apiCall(API_BASE_URL);
      console.log('Fetched catalogs:', data);
      // Filter out recently deleted item if server hasn't updated yet
      const filteredData = lastDeletedId
        ? (data || []).filter((cat) => cat.id !== lastDeletedId)
        : data || [];
      setCatalogs(filteredData);
    } catch (error) {
      console.error('Error fetching catalogs:', error);
      toast.error('Failed to fetch catalogs');
    }
  }, [apiCall, isDeleting, lastDeletedId]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    console.log('Fetching categories...');
    try {
      const data = await apiCall(`${API_BASE_URL}/categories`);
      console.log('Fetched categories:', data);
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  }, [apiCall]);

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchCatalogs(), fetchCategories()]);
      } finally {
        setLoading(false);
      }
    };
    console.log('Initial data load triggered');
    loadData();
  }, [fetchCatalogs, fetchCategories]);

  // Sync categories with catalogs
  useEffect(() => {
    if (isDeleting) {
      console.log('Category sync skipped due to ongoing deletion');
      return;
    }
    console.log('Syncing categories with catalogs:', catalogs);
    const unique = Array.from(new Set(catalogs.map((c) => c.category)));
    setCategories((prev) => {
      const same = prev.length === unique.length && prev.every((c) => unique.includes(c));
      return same ? prev : unique;
    });
  }, [catalogs, isDeleting]);

  // Debug catalogs state changes
  useEffect(() => {
    console.log('Catalogs state updated:', catalogs);
  }, [catalogs]);

  // Clear lastDeletedId after a delay to allow server sync
  useEffect(() => {
    if (lastDeletedId) {
      const timer = setTimeout(() => {
        console.log(`Clearing lastDeletedId: ${lastDeletedId}`);
        setLastDeletedId(null);
        fetchCatalogs(); // Re-fetch after delay to sync with server
      }, 5000); // 5-second delay
      return () => clearTimeout(timer);
    }
  }, [lastDeletedId, fetchCatalogs]);

  // Create catalog
  const handleCreate = async () => {
    try {
      const newCatalog = await apiCall(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setCatalogs((prev) => [...prev, newCatalog]);
      setIsAddModalOpen(false);
      setFormData({ category: '', value: '', details: '' });
      toast.success('Catalog created successfully');
    } catch (error) {
      console.error('Error creating catalog:', error);
      toast.error('Failed to create catalog');
    }
  };

  // Update catalog
  const handleUpdate = async () => {
    try {
      const updatedCatalog = await apiCall(`${API_BASE_URL}/${editingCatalog.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      });
      setCatalogs((prev) => prev.map((cat) => (cat.id === editingCatalog.id ? updatedCatalog : cat)));
      setIsEditModalOpen(false);
      setEditingCatalog(null);
      setFormData({ category: '', value: '', details: '' });
      toast.success('Catalog updated successfully');
    } catch (error) {
      console.error('Error updating catalog:', error);
      toast.error('Failed to update catalog');
    }
  };

  // Delete catalog with optimistic update
  const handleDelete = async () => {
    if (!deletingCatalog || isDeleting) return;

    const idToDelete = deletingCatalog.id;
    const deletedCatalog = { ...deletingCatalog }; // Deep copy for rollback
    console.log('Attempting to delete catalog:', deletedCatalog);

    setIsDeleting(true);
    setLastDeletedId(idToDelete);
    setCatalogs((prev) => {
      const updated = prev.filter((cat) => cat.id !== idToDelete);
      console.log('Optimistically updated catalogs:', updated);
      return updated;
    });
    setIsDeleteModalOpen(false);
    setDeletingCatalog(null);

    try {
      console.log(`Sending DELETE request to ${API_BASE_URL}/${idToDelete}`);
      await apiCall(`${API_BASE_URL}/${idToDelete}`, { method: 'DELETE' });
      console.log('DELETE request successful');
      toast.success('Catalog deleted successfully');
    } catch (error) {
      console.error('Error deleting catalog:', error);
      toast.error('Failed to delete catalog');
      setCatalogs((prev) => [...prev, deletedCatalog].sort((a, b) => a.id - b.id));
      setLastDeletedId(null); // Clear on failure
    } finally {
      setIsDeleting(false);
    }
  };

  // Open edit modal
  const openEditModal = (catalog) => {
    setEditingCatalog(catalog);
    setFormData({
      category: catalog.category,
      value: catalog.value,
      details: catalog.details,
    });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (catalog) => {
    setDeletingCatalog(catalog);
    setIsDeleteModalOpen(true);
  };

  // Filter catalogs
  const filteredCatalogs = catalogs.filter((catalog) => {
    const matchesCategory = selectedCategory === 'all' || catalog.category === selectedCategory;
    const matchesSearch =
      catalog.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      catalog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      catalog.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Catalog Management</h1>
          <p className="text-muted-foreground">Manage your product catalog with categories, values, and details</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add New Catalog
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Total Catalogs",
            value: catalogs.length,
            icon: IconBooks,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100/50",
          },
          {
            title: "Categories",
            value: categories.length,
            icon: IconCategory,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100/50",
          },
          {
            title: "Filtered Results",
            value: filteredCatalogs.length,
            icon: IconFilter,
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100/50",
          },
        ].map((card, index) => (
          <Card
            key={card.title}
            className={`group relative overflow-hidden border-0 bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <CardHeader className="relative z-10 p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardDescription className="text-sm font-medium text-gray-600 mb-1">
                        {card.title}
                      </CardDescription>
                      <CardTitle className="text-3xl font-bold text-gray-900 tabular-nums">
                        {card.value.toLocaleString()}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <div className="absolute inset-0 rounded-lg ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300"></div>
          </Card>
        ))}
      </div>
      {/* Catalogs Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Catalog Items</CardTitle>
            <CardDescription>
              {filteredCatalogs.length} of {catalogs.length} catalog items
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
            {/* <div className="sm:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <div className="w-48"> {/* Set fixed width (e.g., w-48 = 12rem = 192px) */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category-filter" className="w-full"> {/* Match parent width */}
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="w-48"> {/* Ensure dropdown matches trigger */}
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                        {category}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCatalogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No catalogs found matching your criteria.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right px-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCatalogs.map((catalog) => (
                  <TableRow key={catalog.id}>
                    <TableCell>
                      <Badge variant="secondary">{catalog.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{catalog.value}</TableCell>
                    <TableCell className="text-muted-foreground">{catalog.details}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(catalog)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteModal(catalog)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {/* Add Catalog Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Catalog</DialogTitle>
            <DialogDescription>
              Create a new catalog entry with category, value, and details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">

            {/* Existing-category selector */}
            <div>
              <Label htmlFor="existing-category">Existing Categories</Label>
              <Select
                id="existing-category"
                value={selectedExisting}
                onValueChange={handleExistingChange}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select or choose New" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">— New —</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Free-text Category input – only visible when “New” */}
            {selectedExisting === 'New' && (
              <div>
                <Label htmlFor="add-category">Category</Label>
                <Input
                  id="add-category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: capitaliseFirst(e.target.value),
                    }))
                  }
                  placeholder="e.g., Fertilizers"
                  className="mt-2"
                  required
                />
              </div>
            )}

            {/* Value */}
            <div>
              <Label htmlFor="add-value">Value</Label>
              <Input
                id="add-value"
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, value: e.target.value }))
                }
                placeholder="e.g., Urea"
                className="mt-2"
                required
              />
            </div>

            {/* Details */}
            <div>
              <Label htmlFor="add-details">Details</Label>
              <Input
                id="add-details"
                value={formData.details}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, details: e.target.value }))
                }
                placeholder="e.g., 46% Nitrogen"
                className="mt-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Catalog</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Catalog Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
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
                        category: capitaliseFirst(e.target.value) // ⬅ first letter upper-cased
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
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update Catalog</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Catalog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this catalog item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deletingCatalog && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
                <p>
                  <strong>Category:</strong> {deletingCatalog.category}
                </p>
                <p>
                  <strong>Value:</strong> {deletingCatalog.value}
                </p>
                <p>
                  <strong>Details:</strong> {deletingCatalog.details}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting…' : 'Delete Catalog'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}