// // import React from 'react';
// // import * as XLSX from 'xlsx';
// // import jsPDF from 'jspdf';
// // import autoTable from 'jspdf-autotable';
// // import { Button } from '@/components/ui/button';
// //
// // export default function DownloadButton({ data }) {
// //   // Return null if no data is available to disable the button
// //   if (!data || data.length === 0) return null;
// //
// //   const exportToExcel = () => {
// //     // Prepare data for Excel, ensuring all relevant fields are included
// //     const exportData = data.map(task => ({
// //       ID: task.id,
// //       Type: task.taskType,
// //       Description: task.description,
// //       Status: task.status,
// //       'Created By': task.createdBy,
// //       'Assigned To': task.assignedTo || '-',
// //       'Created At': task.createdAt ? new Date(task.createdAt).toISOString().split('T')[0] : '-',
// //       'Updated At': task.updatedAt ? new Date(task.updatedAt).toISOString().split('T')[0] : '-',
// //     }));
// //
// //     const worksheet = XLSX.utils.json_to_sheet(exportData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
// //     XLSX.writeFile(workbook, 'tasks_report.xlsx');
// //   };
// //
// //   const exportToPDF = () => {
// //     const doc = new jsPDF();
// //     doc.setFontSize(14);
// //     doc.text('Tasks Report', 14, 16);
// //
// //     autoTable(doc, {
// //       startY: 20,
// //       head: [['ID', 'Type', 'Description', 'Status', 'Created By', 'Assigned To', 'Created At', 'Updated At']],
// //       body: data.map(task => [
// //         task.id,
// //         task.taskType,
// //         task.description,
// //         task.status,
// //         task.createdBy,
// //         task.assignedTo || '-',
// //         task.createdAt ? new Date(task.createdAt).toISOString().split('T')[0] : '-',
// //         task.updatedAt ? new Date(task.updatedAt).toISOString().split('T')[0] : '-',
// //       ]),
// //       theme: 'striped',
// //       headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
// //       styles: { fontSize: 10, cellPadding: 2 },
// //       columnStyles: {
// //         2: { cellWidth: 50 }, // Wider column for Description
// //       },
// //     });
// //
// //     doc.save('tasks_report.pdf');
// //   };
// //
// //   return (
// //       <div className="flex justify-end gap-2 mt-4">
// //         <Button onClick={exportToExcel} variant="outline" disabled={!data || data.length === 0}>
// //           Export to Excel
// //         </Button>
// //         <Button onClick={exportToPDF} disabled={!data || data.length === 0}>
// //           Export to PDF
// //         </Button>
// //       </div>
// //   );
// // }
//
// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import axios from 'axios';
//
// export default function DownloadButton({ data, filters }) {
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [downloadType, setDownloadType] = useState(null); // 'excel' or 'pdf'
//   const accessToken = localStorage.getItem('accessToken');
//   const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
//
//   // Return null if no data is available
//   if (!data || data.length === 0) return null;
//
//   const exportToExcel = (tasks) => {
//     const exportData = tasks.map(task => ({
//       ID: task.id,
//       Type: task.taskType,
//       Description: task.description,
//       Status: task.status,
//       'Created By': task.createdBy,
//       'Assigned To': task.assignedTo || '-',
//       'Created At': task.createdAt ? new Date(task.createdAt).toISOString().split('T')[0] : '-',
//       'Updated At': task.updatedAt ? new Date(task.updatedAt).toISOString().split('T')[0] : '-',
//     }));
//
//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
//     XLSX.writeFile(workbook, 'tasks_report.xlsx');
//   };
//
//   const exportToPDF = (tasks) => {
//     const doc = new jsPDF();
//     doc.setFontSize(14);
//     doc.text('Tasks Report', 14, 16);
//
//     autoTable(doc, {
//       startY: 20,
//       head: [['ID', 'Type', 'Description', 'Status', 'Created By', 'Assigned To', 'Created At', 'Updated At']],
//       body: tasks.map(task => [
//         task.id,
//         task.taskType,
//         task.description,
//         task.status,
//         task.createdBy,
//         task.assignedTo || '-',
//         task.createdAt ? new Date(task.createdAt).toISOString().split('T')[0] : '-',
//         task.updatedAt ? new Date(task.updatedAt).toISOString().split('T')[0] : '-',
//       ]),
//       theme: 'striped',
//       headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
//       styles: { fontSize: 10, cellPadding: 2 },
//       columnStyles: {
//         2: { cellWidth: 50 }, // Wider column for Description
//       },
//     });
//
//     doc.save('tasks_report.pdf');
//   };
//
//   // const fetchAllTasks = async () => {
//   //   try {
//   //     const payload = {
//   //       sortBy: filters.sortBy,
//   //       sortDirection: filters.sortDirection,
//   //       taskType: filters.taskType || undefined,
//   //       status: filters.status || undefined,
//   //       createdAfter: filters.createdAfter || undefined,
//   //       createdBefore: filters.createdBefore || undefined,
//   //     };
//   //
//   //     if (filters.createdBy) {
//   //       payload.createdBy = Number(filters.createdBy);
//   //       if (filters.assignedTo) {
//   //         payload.assignedTo = Number(filters.assignedTo);
//   //       }
//   //     }
//   //
//   //     const response = await axios.post(`${BASE_URL}/api/tasks/filter`, payload, {
//   //       headers: {
//   //         Authorization: `Bearer ${accessToken}`,
//   //         'Content-Type': 'application/json',
//   //       },
//   //     });
//   //
//   //     return response.data.tasks || [];
//   //   } catch (error) {
//   //     console.error('Error fetching all tasks:', error);
//   //     return [];
//   //   }
//   // };
//   // const fetchAllTasks = async () => {
//   //   try {
//   //     const payload = {
//   //       sortBy: filters.sortBy,
//   //       sortDirection: filters.sortDirection,
//   //       page: 0, // make sure pagination starts from first page
//   //       size: 1000, // or a large enough number to get all results
//   //     };
//   //
//   //     if (filters.taskType) payload.taskType = filters.taskType;
//   //     if (filters.status) payload.status = filters.status;
//   //     if (filters.createdAfter) payload.createdAfter = filters.createdAfter;
//   //     if (filters.createdBefore) payload.createdBefore = filters.createdBefore;
//   //     if (filters.createdBy) payload.createdBy = Number(filters.createdBy);
//   //     if (filters.assignedTo) payload.assignedTo = Number(filters.assignedTo);
//   //
//   //     const response = await axios.post(`${BASE_URL}/api/tasks/filter`, payload, {
//   //       headers: {
//   //         Authorization: `Bearer ${accessToken}`,
//   //         'Content-Type': 'application/json',
//   //       },
//   //     });
//   //
//   //     return response.data.tasks || [];
//   //   } catch (error) {
//   //     console.error('Error fetching all tasks:', error);
//   //     return [];
//   //   }
//   // };
//
//   const fetchAllTasks = async () => {
//     const allTasks = [];
//     let page = 0;
//     const size = 100; // Increase if your backend supports larger pages
//     let totalFetched = 0;
//     let totalAvailable = 0;
//
//     try {
//       do {
//         const payload = {
//           page,
//           size,
//           sortBy: filters.sortBy,
//           sortDirection: filters.sortDirection,
//           taskType: filters.taskType || undefined,
//           status: filters.status || undefined,
//           createdAfter: filters.createdAfter || undefined,
//           createdBefore: filters.createdBefore || undefined,
//           updatedAfter: filters.updatedAfter || undefined,
//           updatedBefore: filters.updatedBefore || undefined,
//         };
//
//         if (filters.createdBy) {
//           payload.createdBy = Number(filters.createdBy);
//           if (filters.assignedTo) {
//             payload.assignedTo = Number(filters.assignedTo);
//           }
//         }
//
//         const response = await axios.post(`${BASE_URL}/api/tasks/filter`, payload, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         });
//
//         const tasks = response.data.tasks || [];
//         totalAvailable = response.data.totalCount || 0;
//
//         allTasks.push(...tasks);
//         totalFetched += tasks.length;
//         page += 1;
//
//       } while (totalFetched < totalAvailable);
//
//       return allTasks;
//     } catch (error) {
//       console.error('Error fetching all filtered tasks:', error);
//       return [];
//     }
//   };
//
//
//   const handleDownload = async (scope) => {
//     setDialogOpen(false);
//     const tasks = scope === 'current' ? data : await fetchAllTasks();
//     if (downloadType === 'excel') {
//       exportToExcel(tasks);
//     } else if (downloadType === 'pdf') {
//       exportToPDF(tasks);
//     }
//   };
//
//   const openDialog = (type) => {
//     setDownloadType(type);
//     setDialogOpen(true);
//   };
//
//   return (
//       <>
//         <div className="flex justify-end gap-2 mt-4">
//           <Button
//               onClick={() => openDialog('excel')}
//               variant="outline"
//               disabled={!data || data.length === 0}
//           >
//             Export to Excel
//           </Button>
//           <Button
//               onClick={() => openDialog('pdf')}
//               disabled={!data || data.length === 0}
//           >
//             Export to PDF
//           </Button>
//         </div>
//
//         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//           <DialogContent className="max-w-md">
//             <DialogHeader>
//               <DialogTitle>Download Options</DialogTitle>
//             </DialogHeader>
//             <div className="py-4">
//               <p className="text-sm text-muted-foreground mb-4">
//                 Choose whether to download the current page or all filtered tasks.
//               </p>
//               <div className="flex flex-col gap-2">
//                 <Button onClick={() => handleDownload('current')}>
//                   Download Current Page ({data.length} tasks)
//                 </Button>
//                 <Button
//                     onClick={() => handleDownload('all')}
//                     variant="outline"
//                 >
//                   Download All Filtered Tasks
//                 </Button>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                   variant="outline"
//                   onClick={() => setDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </>
//   );
// }


import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

export default function DownloadButton({ data, filters }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [downloadType, setDownloadType] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loading state
  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

  const getFileName = (prefix, ext) => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    return `${prefix}_${dateStr}.${ext}`;
  };

  const exportToExcel = (tasks) => {
    const exportData = tasks.map(task => ({
      ID: task.id,
      Type: task.taskType,
      Description: task.description,
      Status: task.status,
      'Created By': task.createdBy,
      'Assigned To': task.assignedTo || '-',
      'Created At': task.createdAt?.split(' ')[0] || '-',
      'Updated At': task.updatedAt?.split(' ')[0] || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    XLSX.writeFile(workbook, getFileName('tasks', 'xlsx'));
  };

  const exportToPDF = (tasks) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Tasks Report', 14, 16);

    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Type', 'Description', 'Status', 'Created By', 'Assigned To', 'Created At', 'Updated At']],
      body: tasks.map(task => [
        task.id,
        task.taskType,
        task.description,
        task.status,
        task.createdBy,
        task.assignedTo || '-',
        task.createdAt?.split(' ')[0] || '-',
        task.updatedAt?.split(' ')[0] || '-',
      ]),
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: {
        2: { cellWidth: 50 },
      },
    });

    doc.save(getFileName('tasks', 'pdf'));
  };

  const fetchAllTasks = async () => {
    const allTasks = [];
    let page = 0;
    const size = 500; // ✅ Increase this if backend supports it
    let totalFetched = 0;
    let totalAvailable = 0;

    try {
      do {
        const payload = {
          page,
          size,
          sortBy: filters.sortBy,
          sortDirection: filters.sortDirection,
          taskType: filters.taskType || undefined,
          status: filters.status || undefined,
          createdAfter: filters.createdAfter || undefined,
          createdBefore: filters.createdBefore || undefined,
          updatedAfter: filters.updatedAfter || undefined,
          updatedBefore: filters.updatedBefore || undefined,
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

        const tasks = response.data.tasks || [];
        totalAvailable = response.data.totalCount || 0;

        allTasks.push(...tasks);
        totalFetched += tasks.length;
        page += 1;

      } while (totalFetched < totalAvailable);

      return allTasks;
    } catch (error) {
      console.error('Error fetching all filtered tasks:', error);
      return [];
    }
  };

  const handleDownload = async (scope) => {
    setDialogOpen(false);
    setLoading(true); // ✅ start loading

    const tasks = scope === 'current' ? data : await fetchAllTasks();

    if (downloadType === 'excel') {
      exportToExcel(tasks);
    } else if (downloadType === 'pdf') {
      exportToPDF(tasks);
    }

    setLoading(false); // ✅ end loading
  };

  const openDialog = (type) => {
    setDownloadType(type);
    setDialogOpen(true);
  };

  return (
      <>

        <div className="flex justify-end gap-2 mt-4">
          <Button
              onClick={() => openDialog('excel')}
              // className="bg-green-600 text-white hover:bg-green-700"
              disabled={!data || data.length === 0 || loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Export to Excel
          </Button>
          {/*<Button*/}
          {/*    onClick={() => openDialog('pdf')}*/}
          {/*    className="bg-red-600 text-white hover:bg-blue-700"*/}
          {/*    disabled={!data || data.length === 0 || loading}*/}
          {/*>*/}
          {/*  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}*/}
          {/*  Export to PDF*/}
          {/*</Button>*/}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Download Options</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Choose whether to download the current page or all filtered tasks.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={() => handleDownload('current')}>
                  Download Current Page
                </Button>
                <Button
                    onClick={() => handleDownload('all')}
                    // variant="outline"

                >
                  Download All Filtered Tasks
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button
                  // variant="outline"
                  className="bg-red-400 text-white hover:bg-red-600"
                  onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
  );
}
