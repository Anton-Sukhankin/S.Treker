import { Theme } from './settings/types';
import { STrackerDocumentsPackageSidebar } from './components/generated/STrackerDocumentsPackageSidebar';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <>
      <STrackerDocumentsPackageSidebar />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;