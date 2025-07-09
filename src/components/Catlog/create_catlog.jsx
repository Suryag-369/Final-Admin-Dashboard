import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import CatalogTable from './catlog-table';
import AddCatalogModal from './add-catlog';
import EditCatalogModal from './edit-catlog';
import DeleteCatalogModal from './delete-catlog';

const API_BASE_URL = `${import.meta.env.VITE_REST_API_BASE_URL}/api/catalog`;

// Get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export default function CreateCatlog() {
  const [catalogs, setCatalogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [lastDeletedId, setLastDeletedId] = useState(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [deletingCatalog, setDeletingCatalog] = useState(null);

  // API helper function
  const apiCall = useCallback(async (url, options = {}) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }, []);

  // Fetch all catalogs with deletion guard
  const fetchCatalogs = useCallback(async () => {
    if (isDeleting) {
      return;
    }

    try {
      const data = await apiCall(API_BASE_URL);
      // Filter out recently deleted item if server hasn't updated yet
      const filteredData = lastDeletedId
        ? (data || []).filter((cat) => cat.id !== lastDeletedId)
        : data || [];
      setCatalogs(filteredData);
    } catch (error) {
      toast.error('Failed to fetch catalogs');
    }
  }, [apiCall, isDeleting, lastDeletedId]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const data = await apiCall(`${API_BASE_URL}/categories`);
      setCategories(data || []);
    } catch (error) {
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
    loadData();
  }, [fetchCatalogs, fetchCategories]);

  // Sync categories with catalogs
  useEffect(() => {
    if (isDeleting) {
      return;
    }

    const unique = Array.from(new Set(catalogs.map((c) => c.category)));
    setCategories((prev) => {
      const same = prev.length === unique.length && prev.every((c) => unique.includes(c));
      return same ? prev : unique;
    });
  }, [catalogs, isDeleting]);

  // Clear lastDeletedId after a delay to allow server sync
  useEffect(() => {
    if (lastDeletedId) {
      const timer = setTimeout(() => {
        setLastDeletedId(null);
        setIsDeleting(false);
      }, 5000); // 5 seconds delay for server sync
      return () => clearTimeout(timer);
    }
  }, [lastDeletedId]);

  // Handle adding a new catalog
  const handleAddCatalog = useCallback(
    async (formData) => {
      try {
        await apiCall(API_BASE_URL, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        toast.success('Catalog added successfully');
        setIsAddModalOpen(false);
        await fetchCatalogs();
      } catch (error) {
        toast.error('Failed to add catalog');
      }
    },
    [apiCall, fetchCatalogs]
  );

  // Handle editing a catalog
  const handleEditCatalog = useCallback(
    async (formData) => {
      if (!editingCatalog?.id) return;
      try {
        await apiCall(`${API_BASE_URL}/${editingCatalog.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        toast.success('Catalog updated successfully');
        setIsEditModalOpen(false);
        setEditingCatalog(null);
        await fetchCatalogs();
      } catch (error) {
        toast.error('Failed to update catalog');
      }
    },
    [apiCall, editingCatalog, fetchCatalogs]
  );

  // Handle deleting a catalog
  const handleDeleteCatalog = useCallback(
    async () => {
      if (!deletingCatalog?.id) return;
      try {
        setIsDeleting(true);
        await apiCall(`${API_BASE_URL}/${deletingCatalog.id}`, {
          method: 'DELETE',
        });
        toast.success('Catalog deleted successfully');
        setLastDeletedId(deletingCatalog.id);
        setIsDeleteModalOpen(false);
        setDeletingCatalog(null);
        await fetchCatalogs();
      } catch (error) {
        toast.error('Failed to delete catalog');
        setIsDeleting(false);
      }
    },
    [apiCall, deletingCatalog, fetchCatalogs]
  );

  return (
    <div className="p-6">
      <CatalogTable
        catalogs={catalogs}
        categories={categories}
        onEdit={(catalog) => {
          setEditingCatalog(catalog);
          setIsEditModalOpen(true);
        }}
        onDelete={(catalog) => {
          setDeletingCatalog(catalog);
          setIsDeleteModalOpen(true);
        }}
        onAdd={() => setIsAddModalOpen(true)}
        loading={loading}
      />
      <AddCatalogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCatalog}
        categories={categories}
      />
      <EditCatalogModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCatalog(null);
        }}
        onSubmit={handleEditCatalog}
        catalog={editingCatalog}
      />
      <DeleteCatalogModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingCatalog(null);
        }}
        onConfirm={handleDeleteCatalog}
        catalog={deletingCatalog}
        isDeleting={isDeleting}
      />
    </div>
  );
}