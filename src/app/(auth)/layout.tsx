
import "@/app/globals.css";
import ClientToaster from "@/components/ClientToaster";

const layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <html>
        <body>
            <ClientToaster />
          {children}
        </body>
      </html>
    </>
  );
};

export default layout;
