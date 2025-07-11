import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import axios from '@/api/axios'

import CatalogTable from './catlog-table'
import AddCatalogModal from './add-catlog'
import EditCatalogModal from './edit-catlog'
import DeleteCatalogModal from './delete-catlog'

const API_BASE_URL = '/api/catalog'

export default function CreateCatlog() {
  const [catalogs, setCatalogs] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [lastDeletedId, setLastDeletedId] = useState(null)

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingCatalog, setEditingCatalog] = useState(null)
  const [deletingCatalog, setDeletingCatalog] = useState(null)

  const fetchCatalogs = useCallback(async () => {
    if (isDeleting) return

    try {
      const { data } = await axios.get(API_BASE_URL)
      const filtered = lastDeletedId
          ? (data || []).filter((item) => item.id !== lastDeletedId)
          : data || []
      setCatalogs(filtered)
    } catch {
      toast.error('Failed to fetch catalogs')
    }
  }, [isDeleting, lastDeletedId])

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/categories`)
      setCategories(data || [])
    } catch {
      toast.error('Failed to fetch categories')
    }
  }, [])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        await Promise.all([fetchCatalogs(), fetchCategories()])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [fetchCatalogs, fetchCategories])

  useEffect(() => {
    if (isDeleting) return
    const unique = [...new Set(catalogs.map((c) => c.category))]
    setCategories((prev) =>
        prev.length === unique.length && prev.every((c) => unique.includes(c)) ? prev : unique
    )
  }, [catalogs, isDeleting])

  useEffect(() => {
    if (!lastDeletedId) return
    const timer = setTimeout(() => {
      setLastDeletedId(null)
      setIsDeleting(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [lastDeletedId])

  const handleAddCatalog = useCallback(
      async (formData) => {
        try {
          await axios.post(API_BASE_URL, formData)
          toast.success('Catalog added successfully')
          setIsAddModalOpen(false)
          await fetchCatalogs()
        } catch {
          toast.error('Failed to add catalog')
        }
      },
      [fetchCatalogs]
  )

  const handleEditCatalog = useCallback(
      async (formData) => {
        if (!editingCatalog?.id) return
        try {
          await axios.put(`${API_BASE_URL}/${editingCatalog.id}`, formData)
          toast.success('Catalog updated successfully')
          setIsEditModalOpen(false)
          setEditingCatalog(null)
          await fetchCatalogs()
        } catch {
          toast.error('Failed to update catalog')
        }
      },
      [editingCatalog, fetchCatalogs]
  )

  const handleDeleteCatalog = useCallback(async () => {
    if (!deletingCatalog?.id) return
    try {
      setIsDeleting(true)
      await axios.delete(`${API_BASE_URL}/${deletingCatalog.id}`)
      toast.success('Catalog deleted successfully')
      setLastDeletedId(deletingCatalog.id)
      setIsDeleteModalOpen(false)
      setDeletingCatalog(null)
      await fetchCatalogs()
    } catch {
      toast.error('Failed to delete catalog')
      setIsDeleting(false)
    }
  }, [deletingCatalog, fetchCatalogs])

  return (
      <div className="p-6">
        <CatalogTable
            catalogs={catalogs}
            categories={categories}
            loading={loading}
            onEdit={(catalog) => {
              setEditingCatalog(catalog)
              setIsEditModalOpen(true)
            }}
            onDelete={(catalog) => {
              setDeletingCatalog(catalog)
              setIsDeleteModalOpen(true)
            }}
            onAdd={() => setIsAddModalOpen(true)}
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
              setIsEditModalOpen(false)
              setEditingCatalog(null)
            }}
            onSubmit={handleEditCatalog}
            catalog={editingCatalog}
        />
        <DeleteCatalogModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false)
              setDeletingCatalog(null)
            }}
            onConfirm={handleDeleteCatalog}
            catalog={deletingCatalog}
            isDeleting={isDeleting}
        />
      </div>
  )
}
