import React from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
    width: number,
    height: number
}

const Avatar = ({
    width,
    height
}: AvatarProps) => {

    return (
        <div
        style={{ width: width, height: height }}
         className={styles.avatar}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99121 18.7422C14.9746 18.7422 19.0879 14.6289 19.0879 9.6543C19.0879 4.67969 14.9658 0.566406 9.98242 0.566406C5.00781 0.566406 0.90332 4.67969 0.90332 9.6543C0.90332 14.6289 5.0166 18.7422 9.99121 18.7422ZM9.98242 11.0869C8.25977 11.0781 6.92383 9.63672 6.92383 7.72949C6.90625 5.93652 8.26855 4.44238 9.98242 4.44238C11.6963 4.44238 13.041 5.93652 13.041 7.72949C13.041 9.63672 11.7051 11.1045 9.98242 11.0869ZM9.98242 17.2393C8.01367 17.2393 5.92188 16.4219 4.59473 14.998C5.60547 13.4863 7.60938 12.6074 9.98242 12.6074C12.3291 12.6074 14.3506 13.4688 15.3701 14.998C14.043 16.4219 11.9512 17.2393 9.98242 17.2393Z" fill="#9a9fab" />
            </svg>
        </div>

    );
};

export default Avatar;
