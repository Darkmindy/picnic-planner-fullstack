import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Button, ButtonProps } from 'react-bootstrap';

type LinkButtonProps = ButtonProps & LinkProps;

const LinkButton: React.FC<LinkButtonProps> = ({ to, children, ...props }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default LinkButton;
