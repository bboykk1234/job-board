import NextLink from 'next/link'
import { withRouter } from "next/router";
import React, { Children, cloneElement } from 'react'
import classNames from 'classnames';
import { WithRouterProps } from 'next/dist/client/with-router';

interface LinkProps extends WithRouterProps {
    href: string
    activeClassName?: string,
    className?: string,
    passHref?: boolean
}

const NavLink: React.FC<LinkProps> = ({
    router,
    children,
    href,
    activeClassName = "active",
    ...otherProps
}) => {
    const child = Children.only(children) as React.ReactElement
    const active = router.pathname === href && activeClassName;
    const className = classNames(
        child.props.className,
        { [activeClassName]: active }
    );

    return (
        <NextLink href={href} {...otherProps}>
            {cloneElement(child, { className })}
        </NextLink>
    )
}

export default withRouter(NavLink)