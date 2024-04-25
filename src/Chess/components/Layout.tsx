import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <Header/>
      <div className="main">
        {children}
      </div>
    </div>
  );
};

export default Layout;
