'use client';

import { useEffect, useState } from 'react';
import { Lead } from '../types';
import { leadService } from '../services/leadService';
import { useAuth } from '../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchLeads, updateLeadStatus } from '../store/features/leadsSlice';

export default function LeadManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: leads, status, error } = useSelector((state: RootState) => state.leads);
  const { logout } = useAuth();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLeads());
    }
  }, [status, dispatch]);

  const handleStatusUpdate = async (id: string, newStatus: Lead['status']) => {
    try {
      await dispatch(updateLeadStatus({ id, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  if (status === 'loading') {
    return <div className="p-6">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="p-6">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lead Management</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">LinkedIn</th>
              <th className="px-6 py-3 text-left">Visas</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t">
                <td className="px-6 py-4">
                  {lead.firstName} {lead.lastName}
                </td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">
                  <a
                    href={lead.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </td>
                <td className="px-6 py-4">
                  {lead.visasOfInterest.join(', ')}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${lead.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                      }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {lead.status === 'PENDING' && (
                    <button
                      onClick={() => handleStatusUpdate(lead.id, 'REACHED_OUT')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark as Reached Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 