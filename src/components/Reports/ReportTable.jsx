import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ViewTask from './view-task';

export default function ReportTable({ filters, shouldFetch, setShouldFetch, setTotalCount, setTasks }) {
  const [tasks, setLocalTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  // const [selectedTask, setSelectedTask] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const payload = {
        page: Number(filters.page),
        size: Number(filters.size),
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
        taskType: filters.taskType || undefined,
        status: filters.status || undefined,
        createdAfter: filters.createdAfter || undefined,
        createdBefore: filters.createdBefore || undefined,
      };

      if (filters.createdBy) {
        payload.createdBy = Number(filters.createdBy);
        if (filters.assignedTo) {
          payload.assignedTo = Number(filters.assignedTo);
        }
      }

      const response = await axios.post(`${BASE_URL}/api/tasks/filter`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const fetchedTasks = response.data.tasks || [];
      setLocalTasks(fetchedTasks);
      setTasks(fetchedTasks); // Update parent tasks state
      setTotalCount(response.data.totalCount || 0);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
      setShouldFetch(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchTasks();
    }
  }, [shouldFetch]);

  const toggleExpand = (id) => {
    console.log(`Toggling description for task ID: ${id}`);
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleViewTask = (task) => {
    console.log(`View Task clicked for ID: ${task.id}`);
    setSelectedTask(task);
    setDialogOpen(true);
  };

  return (
      <>
        <Card>
          <CardContent className="overflow-x-auto p-4">
            {loading ? (
                <p className="text-center text-sm">Loading...</p>
            ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>View</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Updated At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center">
                            No tasks found.
                          </TableCell>
                        </TableRow>
                    ) : (
                        tasks.map((task) => {
                          const isExpanded = expandedRows[task.id];
                          const shouldTruncate = task.description.length > 100;

                          return (
                              <TableRow key={task.id}>
                                <TableCell>
                                  <button
                                      onClick={() => handleViewTask(task)}
                                      className="inline-flex items-center gap-1 text-blue-400 hover:text-green-800 text-sm font-medium"
                                      title="View Task Details"
                                  >
                                    <Search className="w-4 h-4" />
                                    View
                                  </button>
                                </TableCell>
                                <TableCell>{task.taskType}</TableCell>
                                <TableCell>
                                  {shouldTruncate && !isExpanded
                                      ? `${task.description.slice(0, 100)}...`
                                      : task.description}
                                  {shouldTruncate && (
                                      <button
                                          onClick={() => toggleExpand(task.id)}
                                          className="text-blue-500 ml-2 text-sm"
                                      >
                                        {isExpanded ? 'View Less' : 'More'}
                                      </button>
                                  )}
                                </TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{task.createdBy}</TableCell>
                                <TableCell>{task.assignedTo}</TableCell>
                                <TableCell>{format(new Date(task.createdAt), 'yyyy-MM-dd')}</TableCell>
                                <TableCell>{format(new Date(task.updatedAt), 'yyyy-MM-dd')}</TableCell>
                              </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>
        {/* <ViewTask task={selectedTask} open={dialogOpen} onClose={setDialogOpen} /> */}
        <ViewTask
      task={selectedTask}
      open={dialogOpen}
      onClose={() => setSelectedTask(null)}
    />
      </>
  );
}