import { Truck, Wallet, LockKeyhole, Phone } from 'lucide-react';

const Icons = () => {
  const features = [
    {
      icon: <Truck className="w-12 h-12" strokeWidth={1.5} />,
      title: "Fast Delivery",
      description: "Reliable and timely shipping"
    },
    {
      icon: <Wallet className="w-12 h-12" strokeWidth={1.5} />,
      title: "Easy Returns",
      description: "Hassle-free return process"
    },
    {
      icon: <LockKeyhole className="w-12 h-12" strokeWidth={1.5} />,
      title: "Secure Payments",
      description: "Your transactions are protected"
    },
    {
      icon: <Phone className="w-12 h-12" strokeWidth={1.5} />,
      title: "Support Anytime",
      description: "We're here whenever you need us"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full text-primary-600 dark:text-primary-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Icons;