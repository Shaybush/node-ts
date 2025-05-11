import { showLoginSpinner } from '@src/store/slices/user/slice';
import { useDispatch } from 'react-redux';

export default function HomePage() {
  const dispatch = useDispatch();

  return (
    <div className='size-full p-6'>
      <div>Main</div>
      <div>window</div>
      <button
        onClick={() => {
          dispatch(showLoginSpinner());
        }}
      >
        Click me
      </button>
    </div>
  );
}
