/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { Box, useStyleConfig } from '@chakra-ui/react';

import { SystemProps } from '@chakra-ui/react';
import { ThemingProps } from '@chakra-ui/system';

interface CardBodyProps extends ThemingProps<'CardBody'>, SystemProps {
  children?: React.ReactNode;
}

function CardBody(props: CardBodyProps) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('CardBody', { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
