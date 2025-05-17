import { User } from '@src/pages/User/User';

export default function UserCard(props: User) {
  const { name, age, email, hobbies, isActive, joinedAt } = props;

  return (
    <div className='rounded-xl bg-white shadow-md p-4 flex flex-col gap-4'>
      <h3>{name}</h3>
      <p>
        <strong>Age: </strong> {age}
      </p>
      <p>
        <strong>email: </strong> {email}
      </p>
      <div className='flex gap-2'>
        {hobbies.map((hobby, index) => (
          <div key={index} className='rounded-full bg-green-500 text-black border-black border-2 py-2 px-4'>
            {hobby}
          </div>
        ))}
      </div>
    </div>
  );
}
