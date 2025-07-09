import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Pencil, Trash2, Plus, Search, Filter } from 'lucide-react';
import { IconBooks, IconCategory, IconFilter } from '@tabler/icons-react';

const CatalogTable = ({ 
  catalogs, 
  categories, 
  onEdit, 
  onDelete, 
  onAdd,
  loading = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter catalogs based on search term and selected category
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
        <Button onClick={onAdd} className="flex items-center gap-2">
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
            <div className="w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-filter" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="w-48">
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
                    {/* <TableCell className="text-muted-foreground">{catalog.details}</TableCell> */}
                    <TableCell className="text-muted-foreground">
                        {
                          (() => {
                            try {
                              const detailsObj = JSON.parse(catalog.details);
                              return Object.keys(detailsObj).length > 0 ? catalog.details : null;
                            } catch (e) {
                              return null; // If not valid JSON
                            }
                          })()
                        }
                      </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(catalog)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(catalog)}
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
    </div>
  );
};

export default CatalogTable;