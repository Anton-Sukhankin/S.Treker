import { Theme } from './settings/types';
import { STrackerTaskCardStageCards } from './components/generated/STrackerTaskCardStageCards';

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
      <STrackerTaskCardStageCards />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
