import Head  from "next/head"
import { useRouter } from "next/router"
import { FC, PropsWithChildren } from "react"

interface ISeo {
    title: string
    description?: string
    image?: string
}

export const titleMerge =(title:string) => `${title} | Armenian Home`

const Meta: FC<PropsWithChildren<ISeo>> = ({
    title,
    description,
    image,
    children
    
}) => {
    const {asPath} = useRouter()
    const currentUrl = `${process.env.APP_URL}${asPath}`

    return (
        <>
            <Head>
                
            </Head>
        </>
    )
}