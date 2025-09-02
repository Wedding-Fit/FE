import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className="w-full pt-20 pb-20 px-5">
      {children}
    </main>
  )
}

export default Layout