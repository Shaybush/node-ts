import UserCard from '@src/components/UserCard';
import { isUserLoadingSelector } from '@src/store/slices/user/selectors';
import { API_URLS } from '@src/utils/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export type User = {
  name: string;
  age: number;
  hobbies: string[];
  email: string;
  isActive: boolean;
  joinedAt: Date;
};

export default function User() {
  const loading = useSelector(isUserLoadingSelector);
  const [users, setUsers] = useState<User[]>([] as User[]);
  const [active, setActive] = useState<boolean>(false);
  const [id1, setId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    timer();
    return () => clearInterval(id1);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [active]);

  function timer() {
    const id = setInterval(() => {
      setActive((prev) => !prev);
    }, 2000);

    setId(id);
  }

  async function fetchUsers() {
    try {
      const { data } = await axios.get<User[]>(API_URLS.users_service.get);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 p-3'>
      {users.map((user) => (
        <UserCard key={user.email} {...user} />
      ))}
      {loading ? <div>loading...</div> : null}
    </div>
  );
}
