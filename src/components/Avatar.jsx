import { face } from '../utils/face';
// face() only hashes the name into numbers/colours, so the generated SVG markup is safe.
export default function Avatar({ name, className = 'av', style }) {
  return <span className={className} style={style} dangerouslySetInnerHTML={{ __html: face(name) }} />;
}
