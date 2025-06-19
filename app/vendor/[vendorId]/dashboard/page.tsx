import VendorLayout from '@/components/vendor/VendorLayout';
import VendorDashboard from './VendorDasboard';

export const metadata = {
  title: 'Vendor Dashboard',
};

const VendorDashboardPage = ({ params }: { params: { vendorId: string } }) => {
  return (
    <VendorLayout activeItem='dashboard' vendorId={params.vendorId}>
      <VendorDashboard vendorId={params.vendorId} />
    </VendorLayout>
  );
};

export default VendorDashboardPage;