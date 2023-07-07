import { Propertiesprivate } from './Properties.private';
import { Propertiespublic } from './Properties.public';

export function Properties({ type = '' }) {
  if (type === 'public') return <Propertiespublic />;
  else return <Propertiesprivate />;
}
