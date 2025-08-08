import "@/app/globals.css"

const layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <html>
        <body>{children}</body>
      </html>
    </>
  );
};

export default layout;
