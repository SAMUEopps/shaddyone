import VendorLayout from '@/components/vendor/VendorLayout';
import VendorProducts from './VendorProducts';

export const metadata = {
  title: 'Vendor Products',
};

const VendorProductsPage = ({ params }: { params: { vendorId: string } }) => {
  return (
    <VendorLayout activeItem='products' vendorId={params.vendorId}>
      <VendorProducts />
    </VendorLayout>
  );
};

export default VendorProductsPage;