//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReportFilter from './ReportFilter';
// import ReportTable from './ReportTable';
// import ReportPagination from './ReportPagination';
// // import DownloadButton from './DownloadButton';
// export default function Report() {
//   const [filters, setFilters] = useState({
//     assignedTo: '',
//     createdBy: '',
//     taskType: '',
//     status: '',
//     createdAfter: '',
//     createdBefore: '',
//     sortBy: 'status',
//     sortDirection: 'DESC',
//     page: 0,
//     size: 10,
//   });
//   const [shouldFetch, setShouldFetch] = useState(false);
//   const [totalCount, setTotalCount] = useState(0);
//   const [allEmployees, setAllEmployees] = useState([]);
//   const [supervisors, setSupervisors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const accessToken = localStorage.getItem('accessToken');
//   const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
//
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}/api/admin/users`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//       .then((res) => {
//         setAllEmployees(res.data.employees || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('Failed to load employees');
//         setLoading(false);
//       });
//   }, []);
//
//   useEffect(() => {
//     const selected = allEmployees.find((e) => e.id === Number(filters.createdBy));
//     if (selected?.role === 'MANAGER') {
//       axios
//         .get(`${BASE_URL}/api/admin/users/manager/${selected.id}`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         })
//         .then((res) => setSupervisors(res.data.employees || []))
//         .catch((err) => console.error(err));
//     } else {
//       setSupervisors([]);
//       setFilters((prev) => ({ ...prev, assignedTo: '' }));
//     }
//   }, [filters.createdBy, allEmployees]);
//
//   const handleApply = () => {
//     setFilters((prev) => ({ ...prev, page: 0 }));
//     setShouldFetch(true);
//   };
//
//   const handleReset = () => {
//     setFilters({
//       assignedTo: '',
//       createdBy: '',
//       taskType: '',
//       status: '',
//       createdAfter: '',
//       createdBefore: '',
//       sortBy: 'status',
//       sortDirection: 'DESC',
//       page: 0,
//       size: 10,
//     });
//     setShouldFetch(true);
//   };
//
//
//
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//
//   return (
//     <div className="space-y-4 p-6">
//       <ReportFilter
//         filters={filters}
//         setFilters={setFilters}
//         onApply={handleApply}
//         onReset={handleReset}
//         employees={allEmployees}
//         supervisors={supervisors}
//       />
//       <ReportTable
//         filters={filters}
//         shouldFetch={shouldFetch}
//         setShouldFetch={setShouldFetch}
//         setTotalCount={setTotalCount}
//       />
//
//       <ReportPagination
//         filters={filters}
//         setFilters={setFilters}
//         totalCount={totalCount}
//         setShouldFetch={setShouldFetch}
//       />
//       <div className="text-right text-sm text-muted-foreground  text-bold">
//         Total Records: {totalCount}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportFilter from './ReportFilter';
import ReportTable from './ReportTable';
import ReportPagination from './ReportPagination';
import DownloadButton from './DownloadButton';

export default function Report() {
  const [filters, setFilters] = useState({
    assignedTo: '',
    createdBy: '',
    taskType: '',
    status: '',
    createdAfter: '',
    createdBefore: '',
    sortBy: 'status',
    sortDirection: 'DESC',
    page: 0,
    size: 10,
  });
  const [shouldFetch, setShouldFetch] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [allEmployees, setAllEmployees] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]); // New state for tasks
  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

  useEffect(() => {
    setLoading(true);
    axios
        .get(`${BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setAllEmployees(res.data.employees || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load employees');
          setLoading(false);
        });
  }, []);

  useEffect(() => {
    const selected = allEmployees.find((e) => e.id === Number(filters.createdBy));
    if (selected?.role === 'MANAGER') {
      axios
          .get(`${BASE_URL}/api/admin/users/manager/${selected.id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((res) => setSupervisors(res.data.employees || []))
          .catch((err) => console.error(err));
    } else {
      setSupervisors([]);
      setFilters((prev) => ({ ...prev, assignedTo: '' }));
    }
  }, [filters.createdBy, allEmployees]);

  const handleApply = () => {
    setFilters((prev) => ({ ...prev, page: 0 }));
    setShouldFetch(true);
  };

  const handleReset = () => {
    setFilters({
      assignedTo: '',
      createdBy: '',
      taskType: '',
      status: '',
      createdAfter: '',
      createdBefore: '',
      sortBy: 'status',
      sortDirection: 'DESC',
      page: 0,
      size: 10,
    });
    setShouldFetch(true);
    setTasks([]); // Clear tasks on reset
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="space-y-4 p-6">
        <ReportFilter
            filters={filters}
            setFilters={setFilters}
            onApply={handleApply}
            onReset={handleReset}
            employees={allEmployees}
            supervisors={supervisors}
        />
        <ReportTable
            filters={filters}
            shouldFetch={shouldFetch}
            setShouldFetch={setShouldFetch}
            setTotalCount={setTotalCount}
            setTasks={setTasks} // Pass setTasks to update tasks state
        />
          <div className="flex justify-between">
              <DownloadButton data={tasks} filters={filters} />
              {/* Add DownloadButton with tasks data */}
        <ReportPagination
            filters={filters}
            setFilters={setFilters}
            totalCount={totalCount}
            setShouldFetch={setShouldFetch}
        />
          </div>
        <div className="text-right text-sm text-muted-foreground font-bold">
          Total Records: {totalCount}
        </div>
      </div>
  );
}