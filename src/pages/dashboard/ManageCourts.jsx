import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../component/Loading';

const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCourt, setSelectedCourt] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['courts', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`courts?page=${page}&size=6`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const addCourtMutation = useMutation({
    mutationFn: (newCourt) => axiosSecure.post('courts', {
      ...newCourt,
      slots: newCourt.slots.split(',').map(s => s.trim()),
    }),
    onSuccess: () => {
      Swal.fire('Success', 'Court added successfully', 'success');
      queryClient.invalidateQueries(['courts']);
      setShowModal(false);
    },
    onError: () => Swal.fire('Error', 'Failed to add court', 'error')
  });

  const updateCourtMutation = useMutation({
        mutationFn: ({ id, data }) => {
            let updatedSlots;

            if (typeof data.slots === 'string') {
            updatedSlots = data.slots.split(',').map(s => s.trim());
            } else if (Array.isArray(data.slots)) {
            updatedSlots = data.slots;
            } else {
            updatedSlots = [];
            }

            return axiosSecure.patch(`courts/${id}`, {
            ...data,
            slots: updatedSlots,
            price: Number(data.price), // ensure price is a number
            });
        },
        onSuccess: () => {
            Swal.fire('Success', 'Court updated successfully', 'success');
            queryClient.invalidateQueries(['courts']);
            setShowModal(false);
        },
        onError: () => Swal.fire('Error', 'Failed to update court', 'error')
    });


  const deleteCourtMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`courts/${id}`),
    onSuccess: () => {
      Swal.fire('Deleted!', 'Court has been deleted.', 'success');
      queryClient.invalidateQueries(['courts']);
    },
    onError: () => Swal.fire('Error', 'Failed to delete court', 'error')
  });

  const openAddModal = () => {
    setModalMode('add');
    reset();
    setShowModal(true);
  };

  const openEditModal = (court) => {
    setModalMode('edit');
    setSelectedCourt(court);
    reset({
      ...court,
      slots: court.slots.join(', '),
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourtMutation.mutate(id);
      }
    });
  };

  const onSubmit = (data) => {
    if (modalMode === 'add') {
      addCourtMutation.mutate(data);
    } else if (modalMode === 'edit' && selectedCourt) {
      updateCourtMutation.mutate({ id: selectedCourt._id, data });
    }
  };

  return (
    <div className="p-4 w-11/12 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Courts</h2>

      <button onClick={openAddModal} className="btn btn-primary mb-4">
        + Add New Court
      </button>

      {isLoading ? (
        <Loading/>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <div data-aos="fade-up" className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Court</th>
                <th>Image</th>
                <th>Slots</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.courts.map((court) => (
                <tr key={court._id} className="hover">
                  <td>{court.courtType}</td>
                  <td>
                    <img
                      src={court.image}
                      alt={court.courtType}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>
                    <details className="dropdown">
                      <summary className="btn btn-sm">View Slots</summary>
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        {court.slots.map((slot, idx) => (
                          <li key={idx}>{slot}</li>
                        ))}
                      </ul>
                    </details>
                  </td>
                  <td>৳{court.price}</td>
                  <td className="flex flex-col lg:flex-row items-center gap-2">
                    <button onClick={() => openEditModal(court)} className="btn btn-sm bg-blue-400 rounded-full text-white">Edit</button>
                    <button onClick={() => handleDelete(court._id)} className="btn btn-sm btn-error rounded-full text-white">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-6 gap-2">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="btn btn-outline btn-sm">Prev</button>
        <span className="btn btn-disabled btn-sm">{page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={data && page >= data.totalPages} className="btn btn-outline btn-sm">Next</button>
      </div>

      {showModal && (
        <div data-aos="fade-up" className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-red-600 cursor-pointer"
              onClick={() => setShowModal(false)}
            >×</button>

            <h3 className="text-xl font-semibold mb-4">
              {modalMode === 'add' ? 'Add New Court' : 'Edit Court'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">Court Type</label>
                <input type="text" {...register('courtType', { required: true })} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Image URL</label>
                <input type="url" {...register('image', { required: true })} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Slots (comma-separated)</label>
                <input type="text" {...register('slots', { required: true })} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Price (৳)</label>
                <input type="number" {...register('price', { required: true })} className="input input-bordered w-full" />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                {modalMode === 'add' ? 'Add Court' : 'Update Court'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourts;
