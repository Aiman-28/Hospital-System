import { useCountUp } from '../hooks/useCountUp';
export default function Counter({ n, dur = 1000 }) { return <>{useCountUp(n, dur).toLocaleString()}</>; }
