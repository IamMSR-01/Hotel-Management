const Footer = () => {
  return (
    <footer className="bg-white py-6 shadow-inner mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} StayEase. All rights reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Terms</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
