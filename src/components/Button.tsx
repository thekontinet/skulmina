import { ButtonHTMLAttributes } from "react"

type ButtonProps = {
    loading?: boolean
}

function Button({children, loading, ...rest}:  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <button 
        {...rest}
        className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-secondary focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-80"
        disabled={loading}
    >
        {loading ? 'Please Wait...' : children}
    </button>
  )
}

export default Button