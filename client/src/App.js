import React from 'react';
import { AppLayout, MenuItem, AppContent, AppMenu } from './components/appLayout'

import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Map, startPathFetch, clearAll } from './components/Map';
import { Settings } from './components/settings';
import { Notifications } from './components/notifications';
import { ConditionalSection } from './components/jsxHelpers';

import { faMapMarkerAlt, faSlidersH, faTrashAlt, faMap } from '@fortawesome/free-solid-svg-icons'
import './app.scss';

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const buildPath = () => dispatch(startPathFetch());
  const clearPath = () => dispatch(clearAll());

  return (
    <AppLayout>
      <AppMenu>
        <MenuItem text="Карта" linkTo="/map" icon={faMap} />
        <MenuItem text="Настройки" linkTo="/settings" icon={faSlidersH} />
        <ConditionalSection condition={pathname === '/map'}>
          <hr />
          <MenuItem text="Рассчитать" onClick={buildPath} icon={faMapMarkerAlt} />
          <MenuItem text="Удалить" onClick={clearPath} icon={faTrashAlt} />
          <hr />
        </ConditionalSection>
      </AppMenu>
      <AppContent>
        <Switch>
          <Route path='/map' component={Map} />
          <Route path='/settings' component={Settings} />
          <Redirect to='/map' />
        </Switch>
      </AppContent>
      <Notifications />
    </AppLayout>
  );
}

export default App;
