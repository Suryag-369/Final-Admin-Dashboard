
// // import React from 'react';
// // import { Button } from '@/components/ui/button';

// // export default function ReportPagination({ filters, setFilters, totalCount }) {
// //   const totalPages = Math.ceil(totalCount / filters.size);

// //   const handlePrevious = () => {
// //     if (filters.page > 0) {
// //       setFilters({ ...filters, page: filters.page - 1 });
// //     }
// //   };

// //   const handleNext = () => {
// //     if (filters.page + 1 < totalPages) {
// //       setFilters({ ...filters, page: filters.page + 1 });
// //     }
// //   };

// //   return (
// //     <div className="floats-right items-center justify-end gap-4 mt-2">
// //       <span className="text-sm text-muted-foreground">
// //         Page {filters.page + 1} of {totalPages || 1}
// //       </span>
// //       <Button variant="outline" onClick={handlePrevious} disabled={filters.page === 0}>
// //         Previous
// //       </Button>
// //       <Button variant="outline" onClick={handleNext} disabled={filters.page + 1 >= totalPages}>
// //         Next
// //       </Button>
// //     </div>
// //   );
// // }

// import React from 'react';
// import { Button } from '@/components/ui/button';

// export default function ReportPagination({ filters, setFilters, totalCount, setShouldFetch }) {
//   const totalPages = Math.ceil(totalCount / filters.size);

//   const handlePrevious = () => {
//     if (filters.page > 0) {
//       setFilters({ ...filters, page: filters.page - 1 });
//       setShouldFetch(true); // ✅ trigger fetch
//     }
//   };

//   const handleNext = () => {
//     if (filters.page + 1 < totalPages) {
//       setFilters({ ...filters, page: filters.page + 1 });
//       setShouldFetch(true); // ✅ trigger fetch
//     }
//   };

//   return (
//     <div className="floats-right items-center justify-end gap-4 mt-2">
//       <span className="text-sm text-muted-foreground">
//         Page {filters.page + 1} of {totalPages || 1}
//       </span>
//       <Button variant="outline" onClick={handlePrevious} disabled={filters.page === 0}>
//         Previous
//       </Button>
//       <Button variant="outline" onClick={handleNext} disabled={filters.page + 1 >= totalPages}>
//         Next
//       </Button>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ReportPagination({ filters, setFilters, totalCount, setShouldFetch }) {
  const totalPages = Math.ceil(totalCount / filters.size);
  const [inputPage, setInputPage] = useState(filters.page + 1); // page shown to user (1-indexed)

  // Keep input in sync with filter
  useEffect(() => {
    setInputPage(filters.page + 1);
  }, [filters.page]);

  const updatePage = (pageNumber) => {
    const validPage = Math.min(Math.max(1, pageNumber), totalPages);
    if (validPage !== filters.page + 1) {
      setFilters({ ...filters, page: validPage - 1 }); // convert to 0-indexed
      setShouldFetch(true);
    }
  };

  const handlePrevious = () => {
    if (filters.page > 0) {
      updatePage(filters.page); // page - 1 (0-indexed), so pass current
    }
  };

  const handleNext = () => {
    if (filters.page + 1 < totalPages) {
      updatePage(filters.page + 2); // page + 2 (since we show +1)
    }
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(inputPage);
    if (!isNaN(num)) updatePage(num);
  };

  return (
    <form
      onSubmit={handleInputSubmit}
      className="flex justify-end items-center gap-2 mt-4 flex-wrap"
    >
      <Button
        // variant="outline"
        onClick={handlePrevious}
        disabled={filters.page === 0}
        type="button"
      >
        ← Previous
      </Button>

      <div className="flex items-center gap-2">
        {/* <span className="text-sm text-muted-foreground"></span> */}
        <Input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={handleInputChange}
          className="w-20 text-center"
        />
        <span className="text-sm text-muted-foreground">of {totalPages || 1}</span>
      </div>

      <Button
        // variant="outline"
        onClick={handleNext}
        disabled={filters.page + 1 >= totalPages}
        type="button"
      >
        Next →
      </Button>
    </form>
  );
}
