import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Card = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`flex flex-col items-left justify-center rounded-2xl p-5 w-full shadow-dark ${className}`}>
      {children}
    </div>
  )
}

export default Card