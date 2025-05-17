import type { PropsWithChildren } from 'react';

export default function Main(props: PropsWithChildren) {
  const { children } = props;

  return <main className='size-full bg-white max-h-[95vh] overflow-y-scroll dark:bg-[#383838]'>{children}</main>;
}
