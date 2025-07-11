// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from '../ui/dialog';
// import { Button } from '../ui/button';

// const DeleteCatalogModal = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   catalog,
//   isDeleting = false
// }) => {
//   const handleConfirm = () => {
//     onConfirm();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Delete Catalog</DialogTitle>
//           <DialogDescription>
//             Are you sure you want to delete this catalog item? This action cannot be undone.
//           </DialogDescription>
//         </DialogHeader>
//         {catalog && (
//           <div className="py-4">
//             <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
//               <p>
//                 <strong>Category:</strong> {catalog.category}
//               </p>
//               <p>
//                 <strong>Value:</strong> {catalog.value}
//               </p>
//               <p>
//                 <strong>Details:</strong> {catalog.details}
//               </p>
//             </div>
//           </div>
//         )}
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogClose>
//           <Button 
//             variant="destructive" 
//             onClick={handleConfirm} 
//             disabled={isDeleting}
//           >
//             {isDeleting ? 'Deleting…' : 'Delete Catalog'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default DeleteCatalogModal;
// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from '../ui/dialog';
// import { Button } from '../ui/button';

// const DeleteCatalogModal = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   catalog,
//   isDeleting = false
// }) => {
//   const handleConfirm = async () => {
//     await onConfirm(); // Wait for deletion to complete if asynchronous
//     onClose(); // Close the dialog
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Delete Catalog</DialogTitle>
//           <DialogDescription>
//             Are you sure you want to delete this catalog item? This action cannot be undone.
//           </DialogDescription>
//         </DialogHeader>
//         {catalog && (
//           <div className="py-4">
//             <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
//               <p>
//                 <strong>Category:</strong> {catalog.category}
//               </p>
//               <p>
//                 <strong>Value:</strong> {catalog.value}
//               </p>
//               <p>
//                 <strong>Details:</strong> {catalog.details}
//               </p>
//             </div>
//           </div>
//         )}
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogClose>
//           <Button 
//             variant="destructive" 
//             onClick={handleConfirm} 
//             disabled={isDeleting}
//           >
//             {isDeleting ? 'Deleting…' : 'Delete Catalog'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default DeleteCatalogModal;

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../ui/dialog';
import { Button } from '../ui/button';

const DeleteCatalogModal = ({
  isOpen,
  onClose,
  onConfirm,
  catalog,
  isDeleting = false,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Catalog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this catalog item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {catalog && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-lg space-y-1 text-sm max-h-64 overflow-auto">
                <p>
                  <strong>Category:</strong> {catalog.category}
                </p>
                <p>
                  <strong>Value:</strong> {catalog.value}
                </p>
                <p>
                  <strong>Details:</strong>
                </p>
                <pre className="whitespace-pre-wrap break-words break-all text-xs max-w-full">
                  {catalog.details}
                </pre>
              </div>
            </div>
          )}
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-secondary hover:bg-primary text-black hover:text-white">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting…' : 'Delete Catalog'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCatalogModal;
