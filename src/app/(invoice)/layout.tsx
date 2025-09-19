import React, { PropsWithChildren } from 'react'

const layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <html>
        <body className="m-0">
            {children}
        </body>
    </html>
  )
}

export default layout