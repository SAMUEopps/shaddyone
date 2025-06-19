
import SuperAdminDashboard from './SuperAdminDasboard';
import SuperAdminLayout from '@/components/superadmin/SuperAdminLayout';

export const metadata = {
  title: 'Super Admin Dashboard',
};

const SuperAdminDashboardPage = () => {
  return (
    <SuperAdminLayout activeItem='dashboard'>
      <SuperAdminDashboard />
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboardPage;