'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/store';
import { fetchLeads, updateLeadStatus } from '@/app/store/features/leadsSlice';
import { logout } from '@/app/store/features/authSlice';
import { Lead } from '@/app/types';
import { StyledLeadManagement as S } from '@/app/components/LeadManagement/styles';
import Image from 'next/image';

export default function LeadManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items: leads, status, error } = useSelector((state: RootState) => state.leads);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Lead>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    if (status === 'idle') {
      dispatch(fetchLeads());
    }
  }, [status, dispatch, isAuthenticated, router]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/admin/login');
  };

  const handleStatusUpdate = async (id: string, newStatus: Lead['status']) => {
    try {
      await dispatch(updateLeadStatus({ id, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredLeads = leads
    .filter(lead => {
      const matchesSearch = (
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField] as string | number;
      const bValue = b[sortField] as string | number;
      const direction = sortDirection === 'asc' ? 1 : -1;
      return aValue < bValue ? -1 * direction : 1 * direction;
    });

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (status === 'loading') {
    return <div className="p-6">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="p-6">Error: {error}</div>;
  }

  return (
    <S.Layout>
      <S.Sidebar>
        <S.Logo>
          <Image src="/alma-logo.png" alt="Alma" width={80} height={90} />
        </S.Logo>
        <S.NavItem active={true}>Leads</S.NavItem>
        <S.NavItem active={false}>Settings</S.NavItem>
      </S.Sidebar>

      <S.Main>
        <S.Header>
          <S.Title>Leads</S.Title>
        </S.Header>

        <S.Controls>
          <S.Search
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <S.StatusFilter
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="REACHED_OUT">Reached Out</option>
          </S.StatusFilter>
        </S.Controls>

        <S.Table>
          <thead>
            <tr>
              <S.Th onClick={() => handleSort('firstName')}>Name</S.Th>
              <S.Th onClick={() => handleSort('createdAt')}>Submitted</S.Th>
              <S.Th onClick={() => handleSort('status')}>Status</S.Th>
              <S.Th onClick={() => handleSort('citizenship')}>Country</S.Th>
              <S.Th>Actions</S.Th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.map((lead) => (
              <tr key={lead.id}>
                <S.Td>{lead.firstName} {lead.lastName}</S.Td>
                <S.Td>{new Date(lead.createdAt).toLocaleString()}</S.Td>
                <S.Td>
                  <S.Status status={lead.status}>
                    {lead.status}
                  </S.Status>
                </S.Td>
                <S.Td>{lead.citizenship}</S.Td>
                <S.Td>
                  {lead.status === 'PENDING' && (
                    <button
                      onClick={() => handleStatusUpdate(lead.id, 'REACHED_OUT')}
                      className="text-green-600 hover:text-green-700"
                    >
                      Mark as Reached Out
                    </button>
                  )}
                </S.Td>
              </tr>
            ))}
          </tbody>
        </S.Table>

        <S.Pagination>
          <S.PageButton
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </S.PageButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <S.PageButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </S.PageButton>
          ))}
          <S.PageButton
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </S.PageButton>
        </S.Pagination>
      </S.Main>
    </S.Layout>
  );
} 