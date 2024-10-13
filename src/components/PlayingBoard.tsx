import { ReactNode } from 'react';

type PlayingBoardProps = {
    children: ReactNode;
  };


export default function PlayingBoard ({children} : PlayingBoardProps) {
    return(
        <div className="bg-[url('/img/speed-solitaire-bg.jpg')] bg-cover bg-center h-screen flex-col flex overflow-clip">
            {children}
        </div>
    )
}