import Head from 'next/head'
import React from 'react'

interface CustomHeadProps {
    title: string
}

const CustomHead = ({
    title
}: CustomHeadProps) => {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/Logo.svg" />
        </Head>
    )
}

export default CustomHead