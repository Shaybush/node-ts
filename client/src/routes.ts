import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/Home'));
const PokemonPage = lazy(() => import('./pages/Pokemon/Pokemon'));
const User = lazy(() => {
  console.log("user page loaded");
  return import('./pages/User')
});
const Test = lazy(() => {
  return import('./pages/Test')
})
const TodoPage = lazy(() => import('./pages/Todo/Todo'));

export const routes = [
  {
    to: '/',
    text: 'Home',
    activeNames: ['/home', '/'],
    Component: HomePage,
  },
  {
    to: '/users',
    text: 'Users',
    activeNames: ['/users'],
    Component: User,
  },
  {
    to: '/test',
    text: 'test',
    activeNames: ['/test'],
    Component: Test,
  },
  {
    to: '/pokemon',
    text: 'pokemon',
    activeNames: ['/pokemon'],
    Component: PokemonPage,
  },
  {
    to: '/todo',
    text: 'Todo',
    activeNames: ['/todo'],
    Component: TodoPage,
  },
];
