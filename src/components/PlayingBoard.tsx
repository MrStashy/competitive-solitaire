import { ReactNode } from 'react';

type PlayingBoardProps = {
    children: ReactNode;
  };


export default function PlayingBoard ({children} : PlayingBoardProps) {
    return(
        <div className="bg-[url('/img/card-table-bg.jpg')] bg-cover bg-center h-screen flex-col flex">
            {children}
        </div>
    )
}