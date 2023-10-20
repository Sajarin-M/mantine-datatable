import { Box, Center, Text, rgba } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { WithOptionalProperty, WithRequiredProperty } from '__PACKAGE__';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler } from 'react';
import { RouteInfo } from '~/app/config';
import classes from './NavbarButton.module.css';

export type NavbarButtonProps = WithRequiredProperty<WithOptionalProperty<RouteInfo, 'href'>, 'color'> & {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  expanded?: boolean;
};

export function NavbarButton({ color, icon, title, description, href, onClick, expanded }: NavbarButtonProps) {
  const isExternal = !!href?.startsWith('http');
  const Icon = onClick ? IconChevronRight : icon;
  const pathname = usePathname();
  // this is to make sure for works for trailing slashes
  const isCurrent = pathname === `${href}/` || pathname === href;

  const content = (
    <Box
      style={({ colors }) => ({
        '--navbar-button-bg-color-light': isCurrent ? rgba(colors[color][6], 0.1) : 'transparent',
        '--navbar-button-bg-color-dark': isCurrent ? rgba(colors[color][6], 0.2) : 'transparent',
        '--navbar-button-hover-bg-color-light': isCurrent ? rgba(colors[color][6], 0.2) : rgba(colors.gray[6], 0.1),
        '--navbar-button-hover-bg-color-dark': isCurrent ? rgba(colors[color][6], 0.3) : rgba(colors.gray[6], 0.2),
      })}
      className={classes.root}
      component="a"
      aria-label={description}
      href={isExternal ? href : undefined}
      target={isExternal ? '_blank' : undefined}
      onClick={onClick}
    >
      {Icon ? (
        <Center className={classes.iconWrapper} c="white" bg={color}>
          <Icon size={16} className={clsx(classes.icon, { [classes.expanded]: expanded })} />
        </Center>
      ) : (
        <Box style={({ colors }) => ({ borderColor: colors[color][6] })} className={classes.dotWrapper}>
          <Box className={classes.dot} bg={isCurrent ? color : 'transparent'} />
        </Box>
      )}
      <Text className={classes.text} fz={Icon ? undefined : 'sm'}>
        {title}
      </Text>
    </Box>
  );

  return isExternal || onClick ? (
    content
  ) : (
    <Link href={href!} passHref legacyBehavior>
      {content}
    </Link>
  );
}
