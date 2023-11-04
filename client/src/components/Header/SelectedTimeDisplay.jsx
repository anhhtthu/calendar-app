import React from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../../context/GlobalContext';

export default function SelectedTimeDisplay() {
    const { monthIndex } = React.useContext(GlobalContext);
    return (
        <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
    )
}