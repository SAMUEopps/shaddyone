// app/admin/seller-requests/page.tsx
import SuperAdminLayout from '@/components/superadmin/SuperAdminLayout';
import SellerRequestsTable from './requests';


export const metadata = {
  title: 'Super Admin Dashboard',
};

const SuperAdminDashboardPage = () => {
  return (
    <SuperAdminLayout activeItem='requests'>
      <SellerRequestsTable />
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboardPage;