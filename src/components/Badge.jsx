import './Badge.css';

export default function Badge({ label, type = 'info' }) {
  return <span className={`badge badge-${type}`}>{label}</span>;
}
