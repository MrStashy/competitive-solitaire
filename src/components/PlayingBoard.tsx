import { ReactNode } from 'react';

type PlayingBoardProps = {
    children: ReactNode;
  };


export default function PlayingBoard ({children} : PlayingBoardProps) {
    return(
        <div className="bg-green-400 h-screen">
            {children}
        </div>
    )
}