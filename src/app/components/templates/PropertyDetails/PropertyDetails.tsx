import { PropertyDetailsprivate } from './PropertyDetails.private';
import { PropertyDetailspublic } from './PropertyDetails.public';

export function PropertyDetails({ type = '' }) {
  if (type === 'public') return <PropertyDetailspublic />;
  else return <PropertyDetailsprivate />;
}
