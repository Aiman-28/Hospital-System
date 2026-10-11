import { useInView } from '../hooks/useCountUp';
export default function Reveal({ i = 0, className = '', style, children }) {
  const [ref, on] = useInView();
  return <div ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} style={{ '--i': i, ...style }}>{children}</div>;
}
