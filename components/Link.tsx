import { useRouter } from 'next/router'
import * as LinkType from 'next/dist/client/link'
import Link from 'next/link'
import React from 'react'
import classNames from 'classnames';

interface LinkProps extends LinkType.LinkProps {
    activeClassName?: string,
    className?: string,
}

const ActiveLink: React.FC<LinkProps> = ({
    children,
    activeClassName = "active",
    className: classNameProp = "",
    ...props
}) => {
    const { asPath } = useRouter()

    const className =
        asPath === props.href || asPath === props.as
            ? classNames(classNameProp, activeClassName)
            : classNameProp

    return (
        <Link {...props}>
            <a className={className}>{children}</a>
        </Link>
    )
}

export default ActiveLink