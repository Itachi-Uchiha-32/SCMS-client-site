import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../component/Loading';

const AdminAnnouncements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Fetch all announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  // Add announcement
  const addMutation = useMutation({
    mutationFn: (announcement) => axiosSecure.post('/announcements', announcement),
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      Swal.fire('Success', 'Announcement added!', 'success');
      setShowModal(false);
      reset();
    },
    onError: () => Swal.fire('Error', 'Failed to add announcement', 'error')
  });

  // Update announcement
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/announcements/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      Swal.fire('Success', 'Announcement updated!', 'success');
      setShowModal(false);
      setEditingAnnouncement(null);
      reset();
    },
    onError: () => Swal.fire('Error', 'Failed to update announcement', 'error')
  });

  // Delete announcement
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/announcements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      Swal.fire('Deleted!', 'Announcement deleted.', 'success');
    },
    onError: () => Swal.fire('Error', 'Failed to delete', 'error')
  });

  const onSubmit = (data) => {
    if (editingAnnouncement) {
      updateMutation.mutate({ id: editingAnnouncement._id, data });
    } else {
      addMutation.mutate(data);
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    reset(announcement);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Announcements</h2>

      <button onClick={() => { setShowModal(true); reset(); setEditingAnnouncement(null); }} className="btn btn-primary mb-4">
        + Add Announcement
      </button>

      {isLoading ? (
        <Loading/>
      ) : (
        <ul data-aos="fade-up" className="space-y-3">
          {announcements.map(a => (
            <li key={a._id} className="shadow-xl p-7 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p>{a.description}</p>
                <small className="text-gray-500">{new Date(a.date).toLocaleDateString()}</small>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <button className="btn btn-sm btn-info text-white rounded-full" onClick={() => handleEdit(a)}>Edit</button>
                <button className="btn btn-sm btn-error text-white rounded-full" onClick={() => handleDelete(a._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div data-aos="fade-up" className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 shadow-xl">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-lg font-bold cursor-pointer">×</button>
            <h3 className="text-xl font-semibold mb-4">{editingAnnouncement ? 'Edit' : 'Add'} Announcement</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">Title</label>
                <input type="text" {...register('title', { required: true })} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea {...register('description', { required: true })} className="textarea textarea-bordered w-full"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">{editingAnnouncement ? 'Update' : 'Add'} Announcement</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
