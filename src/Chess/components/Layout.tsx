import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  image: string
}

const Layout: React.FC<LayoutProps> = ({ children, image }) => {
  return (
    <div className="container">
      <Header image = {image} />
      <div className="main">
        {children}
      </div>
    </div>
  );
};

export default Layout;
