import React from 'react';

import styles from './style.module.scss';
import Image from 'next/image';
import Avatar from './Avatar';

interface DisplayAvatarProps {
    pic: string | null;
    size: number;
}

const DisplayAvatar = ({
    pic,
    size
}: DisplayAvatarProps) => {
    return (
        <>
            {pic ?
                <Image
                    src={`data:image/jpeg;base64,${pic}`}
                    alt="avatar"
                    className={styles.image}
                    width={size}
                    height={size}
                />
                :
                <Avatar
                    width={size}
                    height={size}
                />
            }
        </>
    );
};

export default DisplayAvatar;
