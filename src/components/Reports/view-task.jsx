import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, ChevronDown, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ViewTask({ task, open, onClose }) {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [showMore, setShowMore] = useState(false);
  // const [selectedTask, setSelectedTask] = useState(null);

  if (!task) return null;

  let images = [];
  let details = {};
  let implementations = [];

  try {
    images = task.imagesJson ? JSON.parse(task.imagesJson) : [];
  } catch (e) {
    console.error('Failed to parse imagesJson:', e);
  }

  try {
    details = task.detailsJson ? JSON.parse(task.detailsJson) : {};
  } catch (e) {
    console.error('Failed to parse detailsJson:', e);
  }

  try {
    implementations = task.implementationJson ? JSON.parse(task.implementationJson) : [];
  } catch (e) {
    console.error('Failed to parse implementationJson:', e);
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatKey = (key) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());

  return (
    <>
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 bg-gray-50">
          {/* Header */}
          <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
            <button onClick={onClose} className="lg:hidden">
              <ArrowLeft className="w-6 h-6 text-gray-600 mr-3" />
            </button>
            <DialogTitle className="text-lg font-semibold text-gray-800">Task Details</DialogTitle>
            <button onClick={onClose} className="hidden lg:block ml-auto">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Main Image */}
            {images.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img
                    src={images[0]}
                    alt="Main task image"
                    className="w-full h-48 lg:h-64 object-cover cursor-pointer"
                    onClick={() => setFullscreenImage(images[0])}
                  />
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                      {images.slice(0, 4).map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Additional Images */}
                {images.length > 1 && (
                  <div className="p-4">
                    <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
                      {images.slice(1).map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`task-image-${idx + 1}`}
                          className="w-full h-16 lg:h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                          onClick={() => setFullscreenImage(url)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {task.description && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {showMore ? task.description : (task.description.length > 150 ? task.description.substring(0, 150) + '...' : task.description)}
                </p>
                {task.description.length > 150 && (
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-green-600 text-sm font-medium mt-2 flex items-center"
                  >
                    {showMore ? 'Show Less' : 'Show More'}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            )}

            {/* Basic Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Type:</span>
                  <span className="font-medium text-gray-900">{task.taskType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Status:</span>
                  <span
                    className={`font-medium px-2 py-1 rounded-full text-xs ${
                      task.status === 'approved'
                        ? 'bg-yellow-100 text-yellow-800'
                        : task.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : task.status === 'implemented'
                        ? 'bg-blue-100 text-blue-800'
                        : task.status === 'submitted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {task.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Created At:</span>
                  <span className="font-medium text-gray-900">{task.createdAt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Updated At:</span>
                  <span className="font-medium text-gray-900">{task.updatedAt}</span>
                </div>
              </div>
            </div>

            {/* Created/Assigned Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Created by: <span className="font-medium">{task.createdBy}</span>
                </span>
              </div>
              {task.assignedTo && (
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    Assigned to: <span className="font-medium">{task.assignedTo}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Task Details */}
            {Object.keys(details).length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">{task.taskType} Details</h3>
                <div className="space-y-3">
                  {Object.entries(details).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">{formatKey(key)}:</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Implementation */}
            {implementations.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Implementation</h3>
                {implementations.map((impl, idx) => (
                  <div key={idx} className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-green-800">{task.assignedTo || 'Implementation'}</span>
                      <span className="text-xs text-green-600">{formatDate(impl.timestamp)}</span>
                    </div>
                    <p className="text-sm text-green-700 mb-3">{impl.text}</p>

                    {impl.imageUrls?.length > 0 && (
                      <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
                        {impl.imageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Implementation ${index + 1}`}
                            className="w-full h-16 lg:h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                            onClick={() => setFullscreenImage(url)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Preview */}
      {fullscreenImage && (
        <Dialog open={true} onOpenChange={() => setFullscreenImage(null)}>
          <DialogContent className="max-w-6xl bg-black p-0 flex items-center justify-center">
            <img
              src={fullscreenImage}
              alt="Fullscreen"
              className="max-w-full max-h-[90vh] rounded cursor-pointer"
              onClick={() => setFullscreenImage(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
