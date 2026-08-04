import { Theme } from './settings/types';
import { STrackerTaskCardExact } from './components/generated/STrackerTaskCardExact';

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
      <STrackerTaskCardExact />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;