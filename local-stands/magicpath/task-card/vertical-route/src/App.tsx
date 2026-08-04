import { Theme } from './settings/types';
import { STrackerTaskCardVerticalRoute } from './components/generated/STrackerTaskCardVerticalRoute';

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
      <STrackerTaskCardVerticalRoute />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
