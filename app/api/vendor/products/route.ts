/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const products = await ProductModel.find();
  return Response.json(products);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const product = new ProductModel({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image:
      'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  });
  try {
    await product.save();
    return Response.json(
      { message: 'Product created successfully', product },
      {
        status: 201,
      },
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;
*/

// C:\Users\Admin\Desktop\Fashion-Corner-Next.js-Ecommerce\app\api\vendor\products\route.ts
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';
import UserModel from '@/lib/models/UserModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !['vendor', 'admin'].includes(req.auth.user?.role)) {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  
  await dbConnect();
  
  // For vendors, only get their own products
  // Admins can see all products (if needed)
  const filter = req.auth.user?.role === 'vendor' 
    ? { vendor: req.auth.user._id }
    : {};
    
  const products = await ProductModel.find(filter).populate('vendor', 'name email');
  return new Response(
    JSON.stringify(products),
    {
      status: 200,
    },
  );
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !['vendor', 'admin'].includes(req.auth.user?.role)) {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  
  await dbConnect();
  
  const product = new ProductModel({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image: 'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
    vendor: req.auth.user._id, 
  });
  
  try {
    await product.save();
    return new Response(
      JSON.stringify({
        message: 'Product created successfully',
        product,
      }),
      {
        status: 201,
      },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ message: err.message }),
      {
        status: 500,
      },
    );
  }
}) as any;

export const DELETE = auth(async (req: any, { params }: { params: { id: string } }) => {
  if (!req.auth || !['vendor', 'admin'].includes(req.auth.user?.role)) {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  
  await dbConnect();
  
  const productId = params.id;
  const product = await ProductModel.findById(productId);
  
  if (!product) {
    return new Response(
      JSON.stringify({ message: 'Product not found' }),
      {
        status: 404,
      },
    );
  }
  
  // Check if the vendor owns this product (unless admin)
  if (req.auth.user?.role === 'vendor' && product.vendor.toString() !== req.auth.user._id) {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  
  try {
    await ProductModel.deleteOne({ _id: productId });
    return new Response(
      JSON.stringify({ message: 'Product deleted successfully' }),
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ message: err.message }),
      {
        status: 500,
      },
    );
  }
}

) as any;