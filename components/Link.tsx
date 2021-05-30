import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

interface LinkProps extends NextLinkProps {
    className?: string,
}

const Link: React.FC<LinkProps> = ({
    children,
    className,
    ...otherProps
}) => {
    return (
        <NextLink {...otherProps}>
            <a className={className}>{children}</a>
        </NextLink>
    )
}

export default Link