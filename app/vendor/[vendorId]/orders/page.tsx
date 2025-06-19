import VendorLayout from '@/components/vendor/VendorLayout';
import VendorOrders from './VendorOrder';

export const metadata = {
  title: 'Vendor Orders',
};

const VendorOrdersPage = ({ params }: { params: { vendorId: string } }) => {
  return (
    <VendorLayout activeItem='orders' vendorId={params.vendorId}>
      <VendorOrders vendorId={params.vendorId} />
    </VendorLayout>
  );
};

export default VendorOrdersPage;