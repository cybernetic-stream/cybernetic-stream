import RootPage from '../page.js';
import AlertNotKeylessEnabled from '../_components/alert-not-keyless-enabled.js';

export default function Page({ params }) {
  return (
    <>
      <AlertNotKeylessEnabled />
      <RootPage />
    </>
  );
}
