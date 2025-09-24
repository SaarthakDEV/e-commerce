import "@/app/globals.css";
import ClientToaster from "@/components/ClientToaster";

export const metadata = {
  title: "Kartly"
}

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
