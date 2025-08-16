import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../component/Loading';

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    }
  });

  const addCoupon = useMutation({
    mutationFn: (coupon) => axiosSecure.post('/coupons', coupon),
    onSuccess: () => {
      Swal.fire('Success', 'Coupon added', 'success');
      queryClient.invalidateQueries(['coupons']);
      setShowModal(false);
    }
  });

  const updateCoupon = useMutation({
    mutationFn: ({ id, coupon }) => axiosSecure.patch(`/coupons/${id}`, coupon),
    onSuccess: () => {
      Swal.fire('Success', 'Coupon updated', 'success');
      queryClient.invalidateQueries(['coupons']);
      setShowModal(false);
    }
  });

  const deleteCoupon = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/coupons/${id}`),
    onSuccess: () => {
      Swal.fire('Deleted!', 'Coupon has been deleted.', 'success');
      queryClient.invalidateQueries(['coupons']);
    }
  });

  const openAddModal = () => {
    setModalMode('add');
    setSelectedCoupon(null);
    reset();
    setShowModal(true);
  };

  const openEditModal = (coupon) => {
    setModalMode('edit');
    setSelectedCoupon(coupon);
    reset(coupon);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Coupon?',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCoupon.mutate(id);
      }
    });
  };

  const onSubmit = (data) => {
    data.discountPercentage = Number(data.discountPercentage);
    if (modalMode === 'add') addCoupon.mutate(data);
    else if (modalMode === 'edit' && selectedCoupon) {
      updateCoupon.mutate({ id: selectedCoupon._id, coupon: data });
    }
  };

  return (
    <div  className="p-4 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>
      <button className="btn btn-primary mb-4" onClick={openAddModal}>+ Add Coupon</button>

      {isLoading ? <Loading/> : (
        <div data-aos="fade-up" className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount (%)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon._id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.discountPercentage}</td>
                  <td>{coupon.status}</td>
                  <td className="flex flex-col lg:flex-row items-center gap-2">
                    <button onClick={() => openEditModal(coupon)} className="btn btn-sm btn-info text-white rounded-full">Edit</button>
                    <button onClick={() => handleDelete(coupon._id)} className="btn btn-sm btn-error text-white rounded-full">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div data-aos="fade-up" className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 shadow-xl">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-red-600 cursor-pointer" onClick={() => setShowModal(false)}>×</button>
            <h3 className="text-xl font-semibold mb-4">{modalMode === 'add' ? 'Add Coupon' : 'Edit Coupon'}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">Coupon Code</label>
                <input type="text" {...register('code', { required: true })} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Discount (%)</label>
                <input type="number" {...register('discountPercentage', { required: true })} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Status</label>
                <select {...register('status', { required: true })} className="select select-bordered w-full">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button className="btn btn-primary w-full" type="submit">{modalMode === 'add' ? 'Add' : 'Update'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
