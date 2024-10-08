export interface UserInfo {
    name: string;
    lastName: string;
    events: Event[];
}

export interface Event {
    id: string;
    date: string;
    time: string;
    name: string;
    amount: number;
    addres: string;
    photos: string[];
  }
export interface SliderEventContainerProps {
    events: Event[];
}

export interface PreviousEventContainerProps {
    events: Event[];
}
