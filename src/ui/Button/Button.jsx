import s from './button.module.scss'

const Button = ({children, onClick, style, type}) => {
    const className = type === 'light'? s.lightBtn : s.btn
    return (
        <button className={className} onClick={onClick} style={{...style}}>
            {children}
        </button>
    )
}

export default Button