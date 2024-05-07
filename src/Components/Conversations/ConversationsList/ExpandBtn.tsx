import React, { useState } from 'react';

import styles from './styles.module.css';

interface ExpandBtnProps {
    showFullSidebar: boolean,
    setShowFullSidebar: Function,
}

const ExpandBtn = ({
    showFullSidebar,
    setShowFullSidebar
 }: ExpandBtnProps) => {

    const [hovered, setHovered] = useState<Boolean>(false)

    const handleShowFullSidebar = () => {
        setShowFullSidebar(!showFullSidebar)
    }

    return (
        <div className={styles.ConversationsBtnArea}
            style={{
                left: showFullSidebar ? "20%" : "5%"
            }}
            onClick={handleShowFullSidebar}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <div
                className={styles.Chevron}
                style={{
                    transform: hovered ? (showFullSidebar ? "rotate(-45deg)" : "rotate(45deg)") : "rotate(0deg)",
                    marginTop: "0.45em"
                }}
            />
            <div
                className={styles.Chevron}
                style={{
                    transform: hovered ? (showFullSidebar ? "rotate(45deg)" : "rotate(-45deg)") : "rotate(0deg)",
                    marginTop: "-0.45em"
                }}
            />
        </div>
    );
};

export default ExpandBtn;
