import Todos from './components/Todos';
import TestForm from './components/TestForm';
import ChoosePlan from './components/ChoosePlan';
import LibraryListing from './components/LibraryListing';

const routes = [
  {path: '/todo-list', component: Todos},
  {path: '/form', component: TestForm},
  {path: '/choose-plan', component: ChoosePlan},
  {path: '/lib-listing', component: LibraryListing},
];

export default routes;
