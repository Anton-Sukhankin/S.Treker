import { Theme } from './settings/types';
import { STrackerNewDocumentPickerCompactRegistry } from './components/generated/STrackerNewDocumentPickerCompactRegistry';

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
      <STrackerNewDocumentPickerCompactRegistry />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;