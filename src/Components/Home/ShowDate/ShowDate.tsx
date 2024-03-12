import React from 'react'

const ShowDate = ({ date, className }: { date: string, className?: string }) => {
    return (
        <p className={className ? className : ''}>
            {
                new Date(date).getHours() + ":" +
                (new Date(date).getMinutes().toString().padStart(2, '0'))
            }
        </p>
    )
}

export default ShowDate