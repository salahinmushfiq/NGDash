import React from 'react'
// import {ScheduleComponent,ViewsDirective,ViewDirective, Day, Week, WorkWeek,Month,Agenda,Inject,Resize, DragAndDrop} from '@syncfusion/ej2-react-schedule';
import {ScheduleData} from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import {Header} from "../components";
const Calendar = () => {
  const{currentColor,currentMode}=useStateContext();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      <Header category="Page" title="Calendar" />
    </div>
  );
}

export default Calendar