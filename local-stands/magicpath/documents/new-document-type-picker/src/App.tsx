import { Theme } from './settings/types';
import { STrackerNewDocumentPickerManagedCatalog } from './components/generated/STrackerNewDocumentPickerManagedCatalog';

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
      <STrackerNewDocumentPickerManagedCatalog />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;