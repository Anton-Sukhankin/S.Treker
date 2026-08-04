import { Theme } from './settings/types';
import { STrackerTaskCardProcess } from './components/generated/STrackerTaskCardProcess';

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
      <STrackerTaskCardProcess />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
