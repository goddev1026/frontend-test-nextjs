'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchLeads, updateLeadStatus } from '../../store/features/leadsSlice';
import { logout } from '../../store/features/authSlice';
import { Lead } from '../../types';
import { StyledLeadManagement as S } from './styles';
import Image from 'next/image';

export default function LeadManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items: leads, status, error } = useSelector((state: RootState) => state.leads);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Lead>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <S.MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24"
              height="24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </S.MobileMenuButton>
        </S.Logo>

        <S.NavigationContainer>
          <S.NavItem active={true}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Leads
          </S.NavItem>
          <S.NavItem active={false}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </S.NavItem>
        </S.NavigationContainer>

        <S.UserSection>
          <S.UserButton onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
            <S.UserAvatar>
              {user?.name?.charAt(0) || 'A'}
            </S.UserAvatar>
            <S.UserInfo>
              <S.UserName>{user?.name || 'Admin User'}</S.UserName>
              <S.UserEmail>{user?.email || 'admin@example.com'}</S.UserEmail>
            </S.UserInfo>
          </S.UserButton>

          <S.UserDropdown isOpen={isUserDropdownOpen}>
            <S.LogoutButton onClick={handleLogout}>
              Sign out
            </S.LogoutButton>
          </S.UserDropdown>
        </S.UserSection>
      </S.Sidebar>

      <S.Main>
        <S.Header>
          <S.Title>Leads</S.Title>
        </S.Header>

        <S.Controls>
          <S.Search
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <S.StatusFilter
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="PENDING">Status: Pending</option>
            <option value="REACHED_OUT">Status: Reached Out</option>
          </S.StatusFilter>
        </S.Controls>

        <S.TableContainer>
          <S.Table>
            <thead>
              <tr>
                <S.Th onClick={() => handleSort('firstName')}>
                  Name {sortField === 'firstName' && (sortDirection === 'asc' ? '↑' : '↓')}
                </S.Th>
                <S.Th onClick={() => handleSort('createdAt')}>
                  Submitted {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                </S.Th>
                <S.Th onClick={() => handleSort('status')}>
                  Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                </S.Th>
                <S.Th onClick={() => handleSort('citizenship')}>
                  Country {sortField === 'citizenship' && (sortDirection === 'asc' ? '↑' : '↓')}
                </S.Th>
                <S.Th>Actions</S.Th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map((lead) => (
                <tr key={lead.id}>
                  <S.Td>{lead.firstName} {lead.lastName}</S.Td>
                  <S.Td>{new Date(lead.createdAt).toLocaleString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</S.Td>
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
        </S.TableContainer>

        <S.Pagination>
          <S.PageButton
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ←
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
            →
          </S.PageButton>
        </S.Pagination>
      </S.Main>
    </S.Layout>
  );
} 